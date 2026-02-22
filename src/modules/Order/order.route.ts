import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/checkout", auth(UserRole.customer), OrderController.checkout);

export const OrderRoutes = router;
