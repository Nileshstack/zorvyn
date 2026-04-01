# 💰 Finance Backend API

This is a simple backend project for a finance dashboard built using **Node.js, Express, and MongoDB**.
## 🌐 Live Demo
Check live at:  
👉 https://finance-backend-m4q9.onrender.com/

It supports:
- User authentication (login & register)
- Role-based access (admin, analyst, viewer)
- Transaction management (income & expenses)
- Dashboard data (summary, trends, etc.)

---

## 🛠 Tech Stack

- Node.js  
- Express.js  
- MongoDB (Atlas)  
- Mongoose  
- JWT (Authentication)  
- bcryptjs (Password hashing)  

---

## 📁 Project Structure
finance-backend/
─ config/
─ middleware/
─ models/
─ routes/
─ controllers/
─ .env
## Notes
Only admin can create/update/delete transactions
Soft delete is used (data is not permanently removed)
Inactive users cannot log in
─ server.js

## Create .env file
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
