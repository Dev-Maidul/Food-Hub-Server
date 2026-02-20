import express from 'express';
import { CategoryController } from './category.controller';
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.post("/",auth(UserRole.admin), CategoryController.createCategory);
router.get("/",auth(UserRole.admin), CategoryController.getAllCategories);
router.patch("/:id",auth(UserRole.admin), CategoryController.updateCategory);
router.delete("/:id",auth(UserRole.admin), CategoryController.deleteCategory);

export const CategoryRoutes = router;


