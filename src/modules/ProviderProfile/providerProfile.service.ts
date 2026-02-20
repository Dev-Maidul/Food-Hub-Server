import { prisma } from "../../lib/prisma";

const createProviderProfile = async (userId: string, payload: any) => {
  const existing = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Provider profile already exists");
  }

  const profile = await prisma.providerProfile.create({
    data: {
      userId,
      restaurantName: payload.restaurantName,
      slug: payload.slug,
      address: payload.address,
      phone: payload.phone,
    },
  });

  return profile;
};

const getMyProviderProfile = async (userId: string) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new Error("Provider profile not found");
  }

  return profile;
};

const getProviderBySlug = async (slug: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { slug },
    include: {
      meals: {
        where: { isAvailable: true, isDeleted: false },
      },
    },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  return provider;
};

const approveProvider = async (providerId: string) => {
  const existing = await prisma.providerProfile.findUnique({
    where: { id: providerId },
  });

  if (!existing) {
    throw new Error("Provider not found");
  }

  return prisma.providerProfile.update({
    where: { id: providerId },
    data: { isApproved: true },
  });
};

export const ProviderService = {
  createProviderProfile,
  getMyProviderProfile,
  getProviderBySlug,
  approveProvider
};