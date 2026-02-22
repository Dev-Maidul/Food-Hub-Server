import express from "express";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";

const router = express.Router();

// 👤 Get My Profile
router.get(
  "/me",
  auth(),
  UserController.getMyProfile
);

// 👤 Update My Profile
router.patch(
  "/me",
  auth(),
  UserController.updateMyProfile
);

export const UserRoutes = router;
