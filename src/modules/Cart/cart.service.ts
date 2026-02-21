import { prisma } from "../../lib/prisma";

const createCart = async (userId: string) => {
  // 1️⃣ Check if user already has a cart
  let cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  });

  if (!cart) {
    // 2️⃣ Create new cart if it doesn't exist
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  return cart;
};

const getMyCart = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          meal: {
            include: {
              provider: true,
              category: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    throw new Error("Cart not found. Please create a cart first.");
  }

  // 🔥 Calculate totals
  const formattedItems = cart.items.map((item) => {
    const price = Number(item.meal.price);
    const subtotal = price * item.quantity;

    return {
      id: item.id,
      quantity: item.quantity,
      subtotal,
      meal: {
        id: item.meal.id,
        name: item.meal.name,
        price,
        image: item.meal.image,
        provider: {
          id: item.meal.provider.id,
          restaurantName: item.meal.provider.restaurantName,
        },
        category: {
          id: item.meal.category.id,
          name: item.meal.category.name,
        },
      },
    };
  });

  const totalAmount = formattedItems.reduce(
    (acc, item) => acc + item.subtotal,
    0
  );

  return {
    cartId: cart.id,
    items: formattedItems,
    totalItems: formattedItems.length,
    totalAmount,
  };
};

const addToCart = async (
  userId: string,
  mealId: string,
  quantity: number
) => {
  if (!quantity || quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const meal = await prisma.meal.findUnique({
    where: { id: mealId },
  });

  if (!meal || !meal.isAvailable) {
    throw new Error("Meal not available");
  }

  // Ensure cart exists
  let cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
    });
  }

  // Fetch items separately
  const cartItems = await prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { meal: true },
  });

  // Provider consistency check
  if (cartItems.length > 0) {
    const existingProviderId = cartItems[0].meal.providerId;

    if (existingProviderId !== meal.providerId) {
      throw new Error(
        "You can only add meals from one provider at a time"
      );
    }
  }

  const existingItem = cartItems.find(
    (item) => item.mealId === mealId
  );

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        mealId,
        quantity,
      },
    });
  }

  return { message: "Cart updated successfully" };
};

const updateQuantity = async (
  userId: string,
  cartItemId: string,
  quantity: number
) => {
  if (!quantity || quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  // 1️⃣ Find cart item with ownership validation
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: {
      cart: true,
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // 2️⃣ Check if item belongs to logged-in user
  if (cartItem.cart.userId !== userId) {
    throw new Error("Unauthorized access to cart item");
  }

  // 3️⃣ Update quantity
  const updatedItem = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  return updatedItem;
};

const removeItem = async (
  userId: string,
  cartItemId: string
) => {
  // 1️⃣ Find cart item with cart relation
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    include: {
      cart: true,
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  // 2️⃣ Ownership check
  if (cartItem.cart.userId !== userId) {
    throw new Error("Unauthorized access to cart item");
  }

  // 3️⃣ Delete item
  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  return { deletedId: cartItemId };
};

export const CartService = {
  createCart,
  getMyCart,
  addToCart,
  updateQuantity,
  removeItem,
};