**SchoolPay**

A full-stack MERN application for managing school fee transactions.
It includes Admin and Student dashboards, secure authentication, payment status tracking, and transaction filtering.


🚀 *Features*
      *User Authentication*

        JWT-based login & registration (Admin andStudent roles).
        Session persistence with localStorage.


     Admin Dashboard

        View all transactions.
        Filter by:
          Student ID (from User collection)
          School ID (from Order collection)
          Date range (from / to).
        Sort transactions by payment time.
        Logout functionality. 


     Student Dashboard

      View own payment status.

      Simple, mobile-friendly UI.

      API

      POST /api/auth/register – Register a new student/admin.

      POST /api/auth/login – Authenticate and receive a token.

      GET /api/orders/transactions – Fetch transactions with optional filters.

     Other

      Order status page by orderId.

      Webhook handler for payment updates.    

  🛠️ Tech Stack
Layer	Technology
Frontend	React, Redux Toolkit, React Router, Tailwind CSS
Backend	Node.js, Express, MongoDB (Mongoose)
Auth	JWT (JSON Web Tokens)
Hosting	Vercel (frontend), Render (backend)


schoolpay/
├── backend/
|   ├── config/
|   |    └── db.js
|   ├── middleware/
|   |     └── auth.js
│   ├── models/
│   │   ├── userSchema.js
│   │   ├── orderSchema.js
│   │   ├── orderStatus.js
|   |   └── webHookLog.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
|   |   ├── orderStatusRoutes.js
|   |   └── webhookRoutes.js
│   ├── controllers/
│   │   ├── orderController.js
|   |   ├── orderStatusController.js
|   |   ├── userController.js
|   |   └── webhookController.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── App.jsx
    |   ├── store/
    |   |     ├── store.jsx
    |   ├── api/
    |   |     ├──axios.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── OrderStatusPage.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   └── features/
    │       ├── auth/authSlice.jsx
    │       ├── admin/adminSlice.jsx
    |       └── orders/orderSlice.jsx
    └── package.json

⚙️ Installation & Setup

Clone the repository
git clone https://github.com/chetanchaudhari07/schoolpay.git
cd schoolpay

install dependencies

Backend:

cd backend
npm install


Frontend:

cd ../frontend
npm install


📝 License

This project is open-source and available under the MIT License
.    