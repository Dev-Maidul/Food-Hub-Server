import { prisma } from "../../lib/prisma";

const checkout = async (
  userId: string,
  deliveryAddress: string
) => {
  // 1️⃣ Find cart with items
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });

  if (!cart) {
    throw new Error("Cart not found");
  }

  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // 2️⃣ Validate meals
  for (const item of cart.items) {
    if (!item.meal.isAvailable) {
      throw new Error(
        `Meal ${item.meal.name} is no longer available`
      );
    }
  }

  // 3️⃣ Provider consistency
  const providerId = cart.items[0].meal.providerId;

  for (const item of cart.items) {
    if (item.meal.providerId !== providerId) {
      throw new Error(
        "Cart contains meals from multiple providers"
      );
    }
  }

  // 4️⃣ Calculate total amount
  let totalAmount = 0;

  for (const item of cart.items) {
    totalAmount +=
      Number(item.meal.price) * item.quantity;
  }

  // 5️⃣ Transaction
  const order = await prisma.$transaction(
    async (tx) => {
      // Create order
      const newOrder = await tx.order.create({
        data: {
          customerId: userId,
          providerId,
          deliveryAddress,
          totalAmount,
        },
      });

      // Create order items
      for (const item of cart.items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            mealId: item.mealId,
            quantity: item.quantity,
            price: item.meal.price, // snapshot price
          },
        });
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      return newOrder;
    }
  );

  return order;
};
const getMyOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
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
              image: true,
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

const getOrderById = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      provider: {
        select: {
          id: true,
          restaurantName: true,
          address: true,
          phone: true,
        },
      },
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              image: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // 🔒 Ownership check
  if (order.customerId !== userId) {
    throw new Error("Unauthorized access to this order");
  }

  return order;
};
const getProviderOrders = async (userId: string) => {
  // 1️⃣ Find provider profile
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  // 2️⃣ Fetch orders for this provider
  const orders = await prisma.order.findMany({
    where: {
      providerId: providerProfile.id,
    },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              image: true,
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
export const OrderService = {
  checkout,
  getMyOrders,
  getOrderById,
  getProviderOrders,
};