import { prisma } from "../../lib/prisma";

const createCategory = async (payload: {
  name: string;
  slug: string;
}) => {
  const existingCategory = await prisma.category.findFirst({
    where: {
      OR: [{ name: payload.name }, { slug: payload.slug }],
    },
  });

  if (existingCategory) {
    throw new Error("Category with this name or slug already exists.");
  }

  const category = await prisma.category.create({
    data: payload,
  });

  return category;
};

const getAllCategories = async () => {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
};

const updateCategory = async (
  id: string,
  payload: { name?: string; slug?: string; isActive?: boolean }
) => {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: payload,
  });
};

const deleteCategory = async (id: string) => {
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: { isActive: false },
  });
};
export const CategoryService = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};