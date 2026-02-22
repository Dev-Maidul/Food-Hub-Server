import { OrderStatus, Role, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";



const getAllOrders = async (status?: OrderStatus) => {
  // 1️⃣ Validate status if provided
  if (status && !Object.values(OrderStatus).includes(status)) {
    throw new Error("Invalid order status filter");
  }

  const orders = await prisma.order.findMany({
    where: {
      ...(status ? { status } : {}),
    },
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

const getAllUsers = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {
    isDeleted: false,
  };

  // 🔍 Optional role filter
  if (query.role && Object.values(Role).includes(query.role)) {
    where.role = query.role;
  }

  const users = await prisma.user.findMany({
    where,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });

  const total = await prisma.user.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data: users,
  };
};


const updateUserStatus = async (
  userId: string,
  status: UserStatus 
) => {
  // 1️⃣ Validate enum
  if (!Object.values(UserStatus).includes(status)) {
    throw new Error("Invalid user status");
  }

  // 2️⃣ Check user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // 3️⃣ Prevent admin self suspend (important security)
  if (user.role === "ADMIN" && status === UserStatus.SUSPENDED) {
    throw new Error("Admin account cannot be suspended");
  }

  // 4️⃣ Update status
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { status },
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


const getAnalytics = async () => {
  // 1️⃣ Total Orders
  const totalOrders = await prisma.order.count();

  // 2️⃣ Total Revenue (Only DELIVERED orders count)
  const revenueResult = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      status: OrderStatus.DELIVERED,
    },
  });

  const totalRevenue = revenueResult._sum.totalAmount || 0;

  // 3️⃣ Total Customers
  const totalCustomers = await prisma.user.count({
    where: {
      role: Role.CUSTOMER,
    },
  });

  // 4️⃣ Total Providers
  const totalProviders = await prisma.user.count({
    where: {
      role: Role.PROVIDER,
    },
  });

  // 5️⃣ Orders by Status
  const ordersByStatusRaw = await prisma.order.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  // Convert to readable format
  const ordersByStatus = ordersByStatusRaw.reduce(
    (acc, item) => {
      acc[item.status] = item._count.status;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    totalOrders,
    totalRevenue: Number(totalRevenue),
    totalCustomers,
    totalProviders,
    ordersByStatus,
  };
};

export const AdminService = {
  getAllOrders,
  updateUserStatus,
  getAnalytics,
  getAllUsers
};


