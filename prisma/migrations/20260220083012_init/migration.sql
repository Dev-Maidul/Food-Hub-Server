/*
  Warnings:

  - You are about to drop the column `created_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `category_id` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `is_available` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `meals` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `meal_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `order_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `delivery_address` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `provider_id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `total_amount` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `provider_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `is_approved` on the `provider_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_name` on the `provider_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `provider_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `provider_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `expires_at` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `refresh_tokens` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `customer_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `meal_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reset_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `reset_token_expiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verification_token` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `provider_profiles` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[verificationToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[resetToken]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `meals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deliveryAddress` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantName` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `provider_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mealId` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_category_id_fkey";

-- DropForeignKey
ALTER TABLE "meals" DROP CONSTRAINT "meals_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_meal_id_fkey";

-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_provider_id_fkey";

-- DropForeignKey
ALTER TABLE "provider_profiles" DROP CONSTRAINT "provider_profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_meal_id_fkey";

-- DropIndex
DROP INDEX "categories_is_active_idx";

-- DropIndex
DROP INDEX "meals_category_id_idx";

-- DropIndex
DROP INDEX "meals_created_at_idx";

-- DropIndex
DROP INDEX "meals_is_available_idx";

-- DropIndex
DROP INDEX "meals_provider_id_idx";

-- DropIndex
DROP INDEX "order_items_meal_id_idx";

-- DropIndex
DROP INDEX "order_items_order_id_idx";

-- DropIndex
DROP INDEX "orders_created_at_idx";

-- DropIndex
DROP INDEX "orders_customer_id_idx";

-- DropIndex
DROP INDEX "orders_provider_id_idx";

-- DropIndex
DROP INDEX "orders_provider_id_status_idx";

-- DropIndex
DROP INDEX "provider_profiles_is_approved_idx";

-- DropIndex
DROP INDEX "provider_profiles_restaurant_name_idx";

-- DropIndex
DROP INDEX "provider_profiles_user_id_key";

-- DropIndex
DROP INDEX "refresh_tokens_user_id_idx";

-- DropIndex
DROP INDEX "reviews_created_at_idx";

-- DropIndex
DROP INDEX "reviews_customer_id_idx";

-- DropIndex
DROP INDEX "reviews_meal_id_idx";

-- DropIndex
DROP INDEX "users_created_at_idx";

-- DropIndex
DROP INDEX "users_reset_token_key";

-- DropIndex
DROP INDEX "users_verification_token_key";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "created_at",
DROP COLUMN "is_active",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "meals" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "is_available",
DROP COLUMN "provider_id",
DROP COLUMN "updated_at",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isAvailable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "created_at",
DROP COLUMN "meal_id",
DROP COLUMN "order_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "mealId" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "delivery_address",
DROP COLUMN "provider_id",
DROP COLUMN "total_amount",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "provider_profiles" DROP COLUMN "created_at",
DROP COLUMN "is_approved",
DROP COLUMN "restaurant_name",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "restaurantName" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "refresh_tokens" DROP COLUMN "created_at",
DROP COLUMN "expires_at",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "created_at",
DROP COLUMN "customer_id",
DROP COLUMN "meal_id",
DROP COLUMN "updated_at",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "mealId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "email_verified",
DROP COLUMN "reset_token",
DROP COLUMN "reset_token_expiry",
DROP COLUMN "updated_at",
DROP COLUMN "verification_token",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "verificationToken" TEXT;

-- CreateIndex
CREATE INDEX "categories_isActive_idx" ON "categories"("isActive");

-- CreateIndex
CREATE INDEX "meals_providerId_idx" ON "meals"("providerId");

-- CreateIndex
CREATE INDEX "meals_categoryId_idx" ON "meals"("categoryId");

-- CreateIndex
CREATE INDEX "meals_isAvailable_idx" ON "meals"("isAvailable");

-- CreateIndex
CREATE INDEX "meals_createdAt_idx" ON "meals"("createdAt");

-- CreateIndex
CREATE INDEX "order_items_orderId_idx" ON "order_items"("orderId");

-- CreateIndex
CREATE INDEX "order_items_mealId_idx" ON "order_items"("mealId");

-- CreateIndex
CREATE INDEX "orders_customerId_idx" ON "orders"("customerId");

-- CreateIndex
CREATE INDEX "orders_providerId_idx" ON "orders"("providerId");

-- CreateIndex
CREATE INDEX "orders_createdAt_idx" ON "orders"("createdAt");

-- CreateIndex
CREATE INDEX "orders_providerId_status_idx" ON "orders"("providerId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "provider_profiles_userId_key" ON "provider_profiles"("userId");

-- CreateIndex
CREATE INDEX "provider_profiles_isApproved_idx" ON "provider_profiles"("isApproved");

-- CreateIndex
CREATE INDEX "provider_profiles_restaurantName_idx" ON "provider_profiles"("restaurantName");

-- CreateIndex
CREATE INDEX "refresh_tokens_userId_idx" ON "refresh_tokens"("userId");

-- CreateIndex
CREATE INDEX "reviews_mealId_idx" ON "reviews"("mealId");

-- CreateIndex
CREATE INDEX "reviews_customerId_idx" ON "reviews"("customerId");

-- CreateIndex
CREATE INDEX "reviews_createdAt_idx" ON "reviews"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "users_verificationToken_key" ON "users"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "users_resetToken_key" ON "users"("resetToken");

-- CreateIndex
CREATE INDEX "users_createdAt_idx" ON "users"("createdAt");

-- AddForeignKey
ALTER TABLE "provider_profiles" ADD CONSTRAINT "provider_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meals" ADD CONSTRAINT "meals_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "provider_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
