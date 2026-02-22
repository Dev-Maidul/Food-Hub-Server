import { prisma } from "../../lib/prisma";

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      provider: {
        select: {
          id: true,
          restaurantName: true,
        },
      },
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};

export const AdminService = {
  getAllOrders,
};