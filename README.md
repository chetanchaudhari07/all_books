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








      
