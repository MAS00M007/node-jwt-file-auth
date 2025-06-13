# 📦 Node.js REST API with Express, JWT, and File-Based User Management

## 🧠 What I Learned Today

Today, I deepened my understanding of backend development by building a RESTful API using **Node.js** and **Express.js**. This project helped me explore core backend concepts like routing, authentication, middleware, and token-based security using JWT — all without a database, just a simple JSON file to manage users.

---

## 🚀 Highlights from My Learning Journey

### ✅ Express.js Fundamentals
- Set up a clean and modular Express server using `index.js`.
- Used **Express Router** to organize routes (`routes/auth.js`), making the codebase scalable and easy to manage.

### 📋 Logging and Middleware
- Integrated `morgan` for HTTP request logging — outputting to both the **console** and a local `access.log` file.
- Built custom **JWT authentication middleware** to secure protected routes.

### 🔐 Environment Variables
- Managed sensitive data like the JWT secret using `.env` and the `dotenv` package, following best practices for security and config management.

### 👤 User Authentication System
- Developed `signup` and `login` endpoints:
  - **Passwords are hashed** using `bcrypt`.
  - **User details** are stored in a local file: `authDetails.json`.

### 🔑 JWT Authorization
- After login, a **JWT token** is issued.
- Token is sent in the request header and verified in middleware to control access to routes like `/dashboard`.

### 🧰 CRUD Operations with File-Based Storage
- Implemented full CRUD functionality:
  - Create, update, delete, and get all users.
  - All data operations are performed on `authDetails.json`, which simulates a lightweight, file-based database.

### 🗂 Project Structure

/project-root
│
├── routes/
│ └── auth.js # Auth-related routes (signup, login, etc.)
│
├── middleware/
│ └── authMiddleware.js # Verifies JWT token
│
├── authDetails.json # File-based user storage
├── access.log # HTTP logs from morgan
├── .env # Environment variables (JWT_SECRET, etc.)
├── index.js # Entry point for the server
├── package.json # Project dependencies and scripts
└── README.md # You're here!



---

## 🔧 Technologies Used

- **Node.js**
- **Express.js**
- **JWT (jsonwebtoken)**
- **bcrypt**
- **dotenv**
- **morgan**
- **File System (fs)**

---

## 🔒 How Authentication Works

1. **Signup:** User registers with email, username, and password → password is hashed and saved to JSON.
2. **Login:** User logs in with email and password → receives a JWT token.
3. **Protected Routes:** Token must be included in the `Authorization` header to access routes like `/dashboard`.
4. **Middleware:** Validates token and makes `req.user` available for route logic.

---

## 📫 Feel Free to Clone and Explore

This project is perfect for understanding authentication, JWT, and REST APIs **without setting up a full database**. Great for beginners and those prototyping ideas quickly.

```bash
git clone https://github.com/mas00m007/node-jwt-file-auth.git
cd node-jwt-file-auth
npm install
node index.js
