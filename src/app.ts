<<<<<<< HEAD
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./app/middleware/GlobalErrorHandler";
import logger from "./app/middleware/Logger";
import notFound from "./app/middleware/NotFound";
import routes from "./app/routes";
import sendResponse from "./shared/sendResponse";
import { auth } from "./utils/auth";

const app: Application = express();
app.set("trust proxy", 1);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = process.env.FRONTEND_URL?.replace(/\/$/, "");
      if (!origin || origin.replace(/\/$/, "") === allowed) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);
app.use(logger);

app.all("/api/auth/*any", toNodeHandler(auth));
app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    data: {
      message: "Server is running",
      author: "Md Maidul Islam",
      version: "1.0.0",
      host: req.hostname,
      protocol: req.protocol,
      ip: ip,
      time: new Date().toISOString(),
    },
  });
  res.end();
});

app.use("/api", routes);

app.use(globalErrorHandler);

app.use(notFound);

=======
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

>>>>>>> 12c406d800755276ebafeafea08eef31879660c5
export default app;
