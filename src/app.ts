import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { AuthRoutes } from './modules/Auth/auth.route';
import { CategoryRoutes } from './modules/Category/category.route';
import { ProviderProfileRoutes } from './modules/ProviderProfile/providerProfile.route';


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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Food Hub Server!');
});

export default app;
