import { Role } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TCreateUser } from "./user.validation";

export const secret = "lsdngkdsbfgbkdf";


const createUserIntoDB = async (payload: TCreateUser) => {
  const { name, email, password, role } = payload;

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  // Check existing user
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const userData: any = {
    email,
    password: hashedPassword,
    role: role || "CUSTOMER", // Use string literal to avoid enum issues
  };

  if (name) {
    userData.name = name;
  }

  const result = await prisma.user.create({
    data: userData,
  });

  const { password: _, ...safeUser } = result;

  return safeUser;
};

const loginUserIntoDB = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new Error("User not found!");
  }

  const ispasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!ispasswordMatched) {
    throw new Error("Invalid credentials!!");
  }

  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    status: user.status,
    email: user.email,
  };

  const token = jwt.sign(userData, secret, { expiresIn: "1d" });

  return {
    token,
    user,
  };
};

export const AuthService = {
  // Add service methods here
  createUserIntoDB,
  loginUserIntoDB,
};
