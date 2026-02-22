import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post(
  "/checkout",
  auth(UserRole.customer),
  OrderController.checkout
);

router.get(
  "/my-orders",
  auth(UserRole.customer),
  OrderController.getMyOrders
);

export const OrderRoutes = router;