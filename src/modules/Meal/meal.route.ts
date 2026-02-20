import express from 'express';
import auth, { UserRole } from '../../middlewares/auth';
import { MealController } from './meal.controller';

const router = express.Router();
router.get("/", MealController.getAllMeals);
router.get("/:slug", MealController.getMealBySlug);
router.post("/",auth(UserRole.provider), MealController.createMeal);
router.patch("/:id",auth(UserRole.provider), MealController.updateMeal);
export const MealRoutes = router;
