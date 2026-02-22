import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/Auth/auth.route';
import { CategoryRoutes } from './modules/Category/category.route';
import { ProviderProfileRoutes } from './modules/ProviderProfile/providerProfile.route';
import { MealRoutes } from './modules/Meal/meal.route';
import { CartRoutes } from './modules/Cart/cart.route';
import { OrderRoutes } from './modules/Order/order.route';
import { AdminRoutes } from './modules/Admin/admin.route';
import { ReviewRoutes } from './modules/Review/review.route';
import { UserRoutes } from './modules/User/user.route';


const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// /api/auth/register
app.use('/api/auth',AuthRoutes)
// /api/provider/meals
app.use('/api/admin/categories',CategoryRoutes)
app.use('/api/providers',ProviderProfileRoutes)
app.use('/api/admin/providers',ProviderProfileRoutes)
app.use('/api/provider/meals',MealRoutes)
app.use('/api/meals',MealRoutes)
app.use('/api/cart',CartRoutes)
app.use("/api/orders", OrderRoutes);
app.use("/api/admin", AdminRoutes);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/users", UserRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Food Hub Server!');
});

export default app;
