# 📦 FreshMart — MERN Ecommerce Platform

A fully functional grocery ecommerce platform built using the MERN stack (MongoDB, Express, React, Node.js).
FreshMart provides a seamless shopping experience with user authentication, cart system, checkout, order tracking, and an admin dashboard to manage products and orders.


## 🎥 Project Demo

<p align="center">
  https://github.com/user-attachments/assets/90345d9b-cdf6-4ca7-b0c2-0afa470f15a1
</p>


# 🛠️ Tech Stack
# Frontend

⚛️ React.js (Vite)

🎨 CSS (Custom UI Components)

📦 Context API (Auth + Cart)

🔍 React Router

📡 Axios

# Backend

🟢 Node.js + Express.js

🍃 MongoDB + Mongoose

🔐 JWT Authentication

🛡️ Role-based Access (Admin/User)

✨ Features

# 👤 User Features

-Register & Login (JWT Auth)

-Browse Products by Category

-Add/Remove Items to Cart

-Update Quantity in Cart

-Full Checkout Form

-Real Payment UI (dummy)

-Order Success Page

-View Order History

-Track Order Status

# 🛒 Cart System

-Cart Sidebar

-Cart Count Badge

-Add to Cart From Any Page

# 🔧 Admin Features

-Add, Edit, Delete Products

-Manage All Orders

-Update Order Status (Pending → Confirmed → Shipped → Delivered)

# 🎨 UI Features

-Fully responsive UI

-Category Navigation

-Dark/Light Mode Toggle

-Search with Suggestions

# 📁 Project Structure

freshmart-mern/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── layout/
    │   ├── pages/
    │   ├── styles/
    │   ├── api.js
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json

# ⚙️ Environment Variables

Backend .env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Frontend .env

VITE_API_URL=http://localhost:5000/api

# ▶️ How to Run the Project

# 1️⃣ Backend Setup
cd backend
npm install
npm start

# 2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

# 📦 API Endpoints

# -Auth

Method	  Endpoint	         Description
POST	/api/auth/register	 Register User
POST	/api/auth/login	     Login User
GET	    /api/auth/me	     Get Logged-in User

# -Products

Method	  Endpoint	         Description
GET	     /api/products	     Get All Products
POST	 /api/products	     Add Product (Admin)

# -Orders

Method	  Endpoint	            Description
POST	 /api/orders	        Place Order
GET	     /api/orders/my-orders	Get User Orders
GET	     /api/orders	        Admin: All Orders
PATCH	 /api/orders/:id/status	Update Order Status


# 📜 License

This project is licensed under the MIT License.

❤️ Author
Sahithi Mutnuru

GitHub: Sahithi-a13245
