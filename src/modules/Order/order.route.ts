import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/checkout", auth(UserRole.customer), OrderController.checkout);

router.get("/my-orders", auth(UserRole.customer), OrderController.getMyOrders);
router.get("/:id", auth(UserRole.customer), OrderController.getOrderById);
router.get(
  "/provider/orders",
  auth(UserRole.provider),
  OrderController.getProviderOrders,
);
router.patch(
  "/provider/:orderId/status",
  auth(UserRole.provider),
  OrderController.updateOrderStatus
);
router.patch(
  "/:orderId/cancel",
  auth(UserRole.customer),
  OrderController.cancelOrder
);
export const OrderRoutes = router;
