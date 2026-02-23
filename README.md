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

