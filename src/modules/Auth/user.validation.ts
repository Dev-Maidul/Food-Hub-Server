import { Role } from "@prisma/client";

export type TCreateUser = {
  name?: string;
  email: string;
  password: string;
  role?: Role;

  // If provider
  restaurantName?: string;
  address?: string;
  phone?: string;
};