import express from 'express';
import { ProviderController } from './providerProfile.controller';
import auth, { UserRole } from '../../middlewares/auth';


const router = express.Router();
router.post("/profile",auth(UserRole.provider), ProviderController.createProviderProfile);
router.get("/me",auth(UserRole.provider), ProviderController.getMyProviderProfile);
router.get("/:slug", ProviderController.getProviderBySlug);
router.patch("/:id/approve",auth(UserRole.admin), ProviderController.approveProvider);
export const ProviderProfileRoutes = router;
