import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { CartController } from "./cart.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.customer),
  CartController.createCart
);

export const CartRoutes = router;