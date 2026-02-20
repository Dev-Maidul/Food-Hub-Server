import { prisma } from "../../lib/prisma";


const getAllMeals = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  const where: any = {
    isAvailable: true,
    isDeleted: false,
  };

  // 🔍 Filter by category
  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  // 🔍 Filter by provider
  if (query.providerId) {
    where.providerId = query.providerId;
  }

  // 🔍 Filter by price range
  if (query.minPrice || query.maxPrice) {
    where.price = {};
    if (query.minPrice) {
      where.price.gte = Number(query.minPrice);
    }
    if (query.maxPrice) {
      where.price.lte = Number(query.maxPrice);
    }
  }

  const meals = await prisma.meal.findMany({
  where,
  skip,
  take: limit,
  orderBy: { createdAt: "desc" },
  select: {
    id: true,
    name: true,
    slug: true,
    description: true,
    price: true,
    image: true,
    category: {
      select: {
        name: true,
        slug: true,
      },
    },
    provider: {
      select: {
        restaurantName: true,
        slug: true,
      },
    },
  },
});

  const total = await prisma.meal.count({ where });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: meals,
  };
};

const getMealBySlug = async (slug: string) => {
  const meal = await prisma.meal.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      price: true,
      image: true,
      isAvailable: true,
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
      provider: {
        select: {
          restaurantName: true,
          slug: true,
          address: true,
          phone: true,
        },
      },
    },
  });

  if (!meal || !meal.isAvailable) {
    throw new Error("Meal not found");
  }

  // Convert Decimal to number (important)
  return {
    ...meal,
    price: Number(meal.price),
  };
};


const createMeal = async (providerId: string, payload: any) => {
  // 1️⃣ Check category exists
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  // 2️⃣ Check duplicate slug
  const existingSlug = await prisma.meal.findUnique({
    where: { slug: payload.slug },
  });

  if (existingSlug) {
    throw new Error("Meal slug already exists");
  }

  // 3️⃣ Create meal
  const meal = await prisma.meal.create({
    data: {
      providerId,
      categoryId: payload.categoryId,
      name: payload.name,
      slug: payload.slug,
      description: payload.description,
      price: payload.price,
      image: payload.image,
    },
  });

  return meal;
};

const updateMeal = async (
  providerId: string,
  mealId: string,
  payload: any
) => {
  // 1️⃣ Check meal exists
  const existingMeal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!existingMeal) {
    throw new Error("Meal not found");
  }

  // 2️⃣ Check ownership
  if (existingMeal.providerId !== providerId) {
    throw new Error("You are not authorized to update this meal");
  }

  // 3️⃣ Optional: Check slug uniqueness (if slug updating)
  if (payload.slug) {
    const slugExists = await prisma.meal.findFirst({
      where: {
        slug: payload.slug,
        NOT: { id: mealId },
      },
    });

    if (slugExists) {
      throw new Error("Slug already in use");
    }
  }

  // 4️⃣ Update meal
  const updatedMeal = await prisma.meal.update({
    where: { id: mealId },
    data: payload,
  });

  return updatedMeal;
};
const deleteMeal = async (providerId: string, mealId: string) => {
  // 1️⃣ Check meal exists
  const existingMeal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!existingMeal) {
    throw new Error("Meal not found");
  }

  // 2️⃣ Check ownership
  if (existingMeal.providerId !== providerId) {
    throw new Error("You are not authorized to delete this meal");
  }

  // 3️⃣ Soft delete
  const deletedMeal = await prisma.meal.update({
    where: { id: mealId },
    data: {
      isDeleted: true,
      isAvailable: false,
    },
  });

  return deletedMeal;
};



export const MealService = {
  createMeal,
    updateMeal,
    getAllMeals,
    getMealBySlug,
    deleteMeal
};