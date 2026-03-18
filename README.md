<<<<<<< HEAD
# 🚀 FoodHub Backend Server

Backend API for FoodHub - A multi-vendor food delivery platform built with Node.js, Express, Prisma, and PostgreSQL.

# Credentials for Testing

- **Admin**
  - Email:admin@gmail.com
  - Password:admin@123

- **Provider**
  - Email:provider@gmail.com
  - Password:provider@com

- **Customer**
  - Email:customer@gmail.com
  - Password:customer@com

# Live Demo

- **Frontend:** [https://food-hub-client-eta.vercel.app](https://food-hub-client-eta.vercel.app)
- **Backend API:** [https://assaignment-4-server.vercel.app](https://assaignment-4-server.vercel.app)

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** Better Auth with JWT
- **Validation:** Zod
- **Build Tool:** tsup

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/              # Feature modules
│   │   ├── auth/            # Authentication & authorization
│   │   ├── category/        # Meal categories
│   │   ├── meal/            # Meal management
│   │   ├── order/           # Order processing
│   │   ├── provider/        # Provider/shop management
│   │   ├── review/          # Reviews & ratings
│   │   └── user/            # User management
│   ├── middleware/          # Express middleware
│   │   ├── auth.ts         # Authentication middleware
│   │   ├── errorHandler.ts # Global error handler
│   │   └── validateRequest.ts # Request validation
│   ├── routes/             # Route definitions
│   └── errors/             # Custom error classes
├── helper/                 # Helper utilities
├── shared/                 # Shared utilities
├── types/                  # TypeScript type definitions
├── app.ts                  # Express app setup
└── server.ts              # Server entry point

prisma/
├── schema/                 # Modular Prisma schemas
│   ├── schema.prisma      # Main schema file
│   ├── auth.prisma        # User & session models
│   ├── meal.prisma        # Meal models
│   ├── order.prisma       # Order models
│   ├── provider.prisma    # Provider models
│   └── review.prisma      # Review models
└── migrations/            # Database migrations
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm/yarn/pnpm

### Installation

1. **Clone and navigate to server directory**

```bash
cd assaignment-4-server
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

Edit `.env` and add your configuration:

```env
NODE_DEV=development
PORT=8080
BETTER_AUTH_SECRET=
BETTER_AUTH_URL="http://localhost:8080"
FRONTEND_URL="http://localhost:3000"
DATABASE_URL="postgresql://user:password@localhost:5432/foodhub"

# email config
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=
```

4. **Run Prisma migrations**

```bash
npx prisma migrate dev
```

5. **Seed the database (optional)**

```bash
npm run seed
```

6. **Start development server**

```bash
npm run dev
```

Server will run on `http://localhost:8080`

## 📝 Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm run build            # Build TypeScript to JavaScript
npm run start            # Start production server
npm run seed             # Seed database with sample data
npx prisma studio        # Open Prisma Studio (Database GUI)
npx prisma migrate dev   # Create and apply migrations
npx prisma generate      # Generate Prisma Client
```

## 🗄️ Database Schema

### Users Table

- Multiple roles: CUSTOMER, PROVIDER, ADMIN
- Managed authentication with Better Auth
- User profiles with contact information

### Provider Table

- Shop information (name, address, description)
- Links to meals and orders
- Provider-specific settings

### Meal Table

- Complete meal information
- Category relationships
- Availability status
- Pricing and descriptions

### Order Table

- Order tracking with status (PENDING, ACCEPTED, COOKING, ON_THE_WAY, DELIVERED, CANCELLED)
- Order items with quantities
- Total amount calculation
- Timestamps for tracking

### Review Table

- User reviews for meals
- Star ratings (1-5)
- Unique constraint: one review per user per meal

### Category Table

- Meal categorization
- Used for filtering and organization

## 🌐 Deployment

### Vercel Deployment

```bash
vercel --prod
```

### Environment Variables for Production

- Set `DATABASE_URL` to production database
- Update `BETTER_AUTH_SECRET`
- Set `NODE_ENV=production`
- Configure CORS origins

## 📊 Database Management

### View Database

```bash
npx prisma studio
```

### Create Migration

```bash
npx prisma migrate dev --name migration_name
```

### Reset Database

```bash
npx prisma migrate reset
```

### Generate Prisma Client

```bash
npx prisma generate
```

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**

```bash
# Check DATABASE_URL in .env
# Ensure PostgreSQL is running
# Verify database exists
```

**Prisma Client Not Generated**

```bash
npx prisma generate
```

**Port Already in Use**

```bash
# Change PORT in .env
# Or kill process using port 5000
```

## 📈 Performance Optimization

- Database indexing on frequently queried fields
- Pagination for large datasets
- Efficient query optimization with Prisma
- Caching strategies (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Developed by [Monir Hossain]

---

**Note:** This is the backend API for the FoodHub project. See the frontend repository for the complete application.
=======
# 🍱 FoodHub Backend API
### Discover & Order Delicious Meals

FoodHub is a full-stack meal ordering platform where customers can browse meals, place orders, track delivery status, and leave reviews. Providers can manage their menus and orders, while admins oversee the entire platform.

This repository contains the **Backend REST API** built with Node.js, Express, Prisma, and PostgreSQL.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL**
- **JWT Authentication**
- **Role-Based Access Control**
- **Modular Architecture**

---

## 📁 Project Structure


src/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── category/
│ ├── provider/
│ ├── meal/
│ ├── cart/
│ ├── order/
│ ├── review/
│ └── admin/
├── middlewares/
├── utils/
├── lib/
└── app.ts


---

## 👥 Roles & Permissions

| Role       | Permissions |
|------------|------------|
| Customer   | Browse meals, cart, checkout, cancel order, review |
| Provider   | Manage menu, view orders, update order status |
| Admin      | Manage users, view all orders, analytics |

---

# 🔐 Authentication

JWT-based authentication.

Protected routes require:


Authorization: Bearer <token>


---

# 📌 Core Features

---

## 🌐 Public APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/meals | Browse meals (pagination + filtering) |
| GET | /api/meals/:id | Get meal details |
| GET | /api/providers/:id | Provider profile |
| GET | /api/reviews/meal/:mealId | Get meal reviews |

---

## 👤 Customer APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/users/me | Get profile |
| PATCH | /api/users/me | Update profile |
| POST | /api/cart | Create cart |
| GET | /api/cart/my-cart | Get my cart |
| POST | /api/cart/add-item | Add item to cart |
| PATCH | /api/cart/update-quantity | Update cart item |
| DELETE | /api/cart/remove-item/:mealId | Remove item |
| DELETE | /api/cart/clear | Clear cart |
| POST | /api/orders/checkout | Place order |
| GET | /api/orders/my-orders | My orders |
| GET | /api/orders/:id | Order details |
| PATCH | /api/orders/:orderId/cancel | Cancel order |
| POST | /api/reviews | Create review |

---

## 🍳 Provider APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /api/provider/meals | Add meal |
| PATCH | /api/provider/meals/:id | Update meal |
| DELETE | /api/provider/meals/:id | Delete meal |
| GET | /api/orders/provider/orders | Incoming orders |
| PATCH | /api/orders/provider/:orderId/status | Update order status |

---

## 👑 Admin APIs

| Method | Endpoint | Description |
|--------|----------|------------|
| GET | /api/admin/users | Get all users |
| PATCH | /api/admin/users/:id | Suspend/Activate user |
| GET | /api/admin/orders | Get all orders |
| GET | /api/admin/orders?status=PLACED | Filter orders |
| GET | /api/admin/analytics | Dashboard analytics |

---

# 📦 Order Status Flow


PLACED
├── Provider → PREPARING → READY → DELIVERED
└── Customer → CANCELLED


State transitions are strictly validated in the backend.

---

# ⭐ Review System

- Only customers with **DELIVERED** orders can review
- One review per meal per customer
- Average rating calculated dynamically

---

# 📊 Admin Analytics

Admin dashboard provides:

- Total Orders
- Total Revenue (DELIVERED only)
- Total Customers
- Total Providers
- Orders grouped by status

---

# 🔎 Filtering & Pagination

Meals support:

- Category filter
- Provider filter
- Price range filter
- Pagination
- Sorting by latest

---

# 🗄 Database Models

- Users
- ProviderProfiles
- Categories
- Meals
- Cart & CartItems
- Orders & OrderItems
- Reviews
- RefreshTokens

---

# ⚙️ Setup Instructions

### 1️⃣ Clone Repository


git clone <repo-url>
cd foodhub-backend


### 2️⃣ Install Dependencies


npm install


### 3️⃣ Setup Environment Variables

Create `.env` file:


DATABASE_URL=your_database_url
JWT_SECRET=your_secret


### 4️⃣ Prisma Setup


npx prisma generate
npx prisma migrate dev


### 5️⃣ Start Server


npm run dev


Server runs at:


http://localhost:5000


---

# 🧪 Postman Collection

Exported Postman collection included for testing all endpoints.

---

# 🛡 Security Features

- JWT authentication
- Role-based authorization
- Enum-based status control
- Ownership validation
- Strict order state machine
- Soft delete support
- Input validation

---

# 📌 Production-Ready Features

- Modular architecture
- Clean separation of concerns
- Transaction-based checkout
- Strict order lifecycle control
- Review eligibility validation
- Admin analytics aggregation

---

# 👨‍💻 Author

**Md Maidul Islam**  
Full-Stack Developer  
MERN Stack | Prisma | PostgreSQL  

---

# 📜 License

This project is developed for educational and demonstration purposes.

>>>>>>> 12c406d800755276ebafeafea08eef31879660c5
