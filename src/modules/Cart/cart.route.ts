import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { CartController } from "./cart.controller";

const router = express.Router();

router.post("/", auth(UserRole.customer), CartController.createCart);
router.get("/my-cart", auth(UserRole.customer), CartController.getMyCart);
router.post("/add-item", auth(UserRole.customer), CartController.addToCart);
router.patch(
  "/update-quantity",
  auth(UserRole.customer),
  CartController.updateQuantity,
);
export const CartRoutes = router;
