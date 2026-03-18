import { prisma } from "../../lib/prisma";

const getMyProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      providerProfile: {
        select: {
          restaurantName: true,
          address: true,
          phone: true,
          isApproved: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const updateMyProfile = async (
  userId: string,
  payload: { name?: string }
) => {
  // Only allow safe fields
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      name: payload.name,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return updatedUser;
};

export const UserService = {
  getMyProfile,
  updateMyProfile,
};