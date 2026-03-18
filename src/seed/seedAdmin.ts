import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@123";

    console.log("🔍 Checking for existing admin...");

    const existingUser = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });

    if (existingUser) {
      console.log("⚠️ Admin already exists. Skipping seeding.");
      return;
    }

    // 🔐 Hash Password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const adminUser = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        name: "Super Admin",
        role: UserRole.admin, // Always use Prisma enum
        password: hashedPassword,
        emailVerified: true,
      },
    });

    console.log("✅ Admin seeded successfully!");
    console.log("📧 Email:", adminUser.email);
  } catch (err) {
    console.error("❌ Error seeding admin user:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();