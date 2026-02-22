import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

// 👑 Get All Orders
router.get("/orders", auth(UserRole.admin), AdminController.getAllOrders);
router.patch(
  "/users/:id",
  auth(UserRole.admin),
  AdminController.updateUserStatus,
);
router.get("/analytics", auth(UserRole.admin), AdminController.getAnalytics);
export const AdminRoutes = router;
