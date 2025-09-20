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
│   ├── models/
│   │   ├── User.js
│   │   ├── Order.js
│   │   └── OrderStatus.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── transactionRoutes.js
│   ├── controllers/
│   │   └── transactionController.js
│   └── server.js
└── frontend/
    ├── src/
    │   ├── App.jsx
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
    │       ├── auth/
    │       └── admin/
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





      
