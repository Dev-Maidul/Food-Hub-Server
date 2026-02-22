import { OrderStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment: string
) => {
  // 1️⃣ Validate rating
  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // 2️⃣ Meal exists?
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  // 3️⃣ Check delivered order containing this meal
  const deliveredOrder = await prisma.order.findFirst({
    where: {
      customerId: userId,
      status: OrderStatus.DELIVERED,
      items: {
        some: {
          mealId: mealId,
        },
      },
    },
  });

  if (!deliveredOrder) {
    throw new Error(
      "You can only review meals from delivered orders"
    );
  }

  // 4️⃣ Check duplicate review
  const existingReview = await prisma.review.findUnique({
    where: {
      customerId_mealId: {
        customerId: userId,
        mealId: mealId,
      },
    },
  });

  if (existingReview) {
    throw new Error("You have already reviewed this meal");
  }

  // 5️⃣ Create review
  const review = await prisma.review.create({
    data: {
      customerId: userId,
      mealId,
      rating,
      comment,
    },
  });

  return review;
};

const getMealReviews = async (mealId: string) => {
  // 1️⃣ Check meal exists
  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  // 2️⃣ Fetch reviews
  const reviews = await prisma.review.findMany({
    where: { mealId },
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // 3️⃣ Calculate average rating
  const avgResult = await prisma.review.aggregate({
    where: { mealId },
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
  });

  return {
    averageRating: avgResult._avg.rating
      ? Number(avgResult._avg.rating.toFixed(2))
      : 0,
    totalReviews: avgResult._count.rating,
    reviews,
  };
};

export const ReviewService = {
  createReview,
  getMealReviews,
};

