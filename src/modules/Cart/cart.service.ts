import { prisma } from "../../lib/prisma";

const createCart = async (userId: string) => {
  // 1️⃣ Check if user already has a cart
  const existingCart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (existingCart) {
    throw new Error("Cart already exists for this user.");
  }

  // 2️⃣ Create new cart
  const cart = await prisma.cart.create({
    data: {
      userId,
    },
  });

  return cart;
};

export const CartService = {
  createCart,
};