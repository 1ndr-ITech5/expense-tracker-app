# 💰 Expense Tracker App

A full-stack personal finance tracking application designed to help users manage their daily expenses. This application allows users to register, securely log in, and perform full CRUD (Create, Read, Update, Delete) operations on their expenses. It also features dynamic dashboard metrics and interactive filters for seamless expense tracking.

---

## 🚀 Key Features

*   **🔒 Secure User Authentication**: User registration and login powered by secure JWT (JSON Web Tokens) and password hashing (bcryptjs).
*   **📊 Dynamic Dashboard Metrics**: Real-time summary cards tracking:
    *   **Total Expenses** (in ALL - Albanian Lek)
    *   **Today's Expenses**
    *   **Current Month's Expenses**
*   **✏️ Full CRUD Functionality**: Add, view, edit, and delete individual expense logs.
*   **🔍 Interactive Filters**:
    *   Filter expenses by **Category** (e.g., Food, Transport, Entertainment, Shopping, Bills, Health, and Others).
    *   Filter expenses by **Time Period** (All, Today, This Week, This Month).
*   **📱 Responsive & User-Friendly UI**: Clean design with real-time feedback notifications.

---

## 🛠️ Tech Stack

### Frontend
*   **React 19**: Core UI framework for component-based rendering.
*   **Redux Toolkit & RTK Query**: Global state management and optimized API caching/data-fetching.
*   **React Router DOM**: Client-side page navigation.
*   **Axios**: For user authentication API requests.
*   **React Toastify**: Smooth popup notifications for successful actions or errors.
*   **React Icons**: Modern UI iconography.
*   **Vite**: Fast development build tool.

### Backend
*   **Node.js & Express**: Fast, minimalist web framework for building RESTful endpoints.
*   **MongoDB & Mongoose**: NoSQL database and schema modeling to store user data and expense logs safely.
*   **JSON Web Tokens (JWT)**: Secure user session validation.
*   **Bcryptjs**: For hashing passwords before saving to the database.
*   **CORS**: Middleware configured for secure cross-origin resource access.
*   **Dotenv**: Environment variable configuration management.

---

## 📂 Project Structure

Here is a simplified overview of how the application is organized:

```text
expense-tracker/
├── backend/
│   ├── connection/      # Database connection configuration (MongoDB)
│   ├── controllers/     # Controller logic handling request/response data
│   ├── middleware/      # Custom authentication & error-handling middleware
│   ├── models/          # Mongoose database models (User & Expense)
│   ├── routes/          # Express route definitions
│   ├── server.js        # Server entry point
│   └── ...
└── frontend/
    └── UI/
        ├── public/      # Static assets
        ├── src/
        │   ├── assets/       # Images and icons
        │   ├── components/   # React UI components (Dashboard, Forms, Cards, Profile)
        │   ├── services/     # Authentication api calls (Axios client)
        │   ├── store/        # Redux state configuration & RTK Query (expenseApi)
        │   ├── styles/       # App stylesheet files
        │   ├── App.jsx       # Main application layout and routes
        │   └── main.jsx      # React mounting entry point
        └── ...
```

---

## 🔄 How It Works

1.  **Auth Flow**:
    *   When a user registers or logs in, their password is encrypted using `bcryptjs`.
    *   The server generates a JWT token and responds with user details.
    *   The frontend saves the session in `localStorage` and stores user info in the Redux store.
2.  **API Requests**:
    *   RTK Query handles fetching, adding, updating, and deleting expenses.
    *   Every outgoing expense request automatically grabs the JWT token from `localStorage`/Redux state and appends it to the `Authorization` header.
    *   The backend's authentication middleware intercepts these requests, verifies the token, and resolves the user's specific expense data.
3.  **Data Updates**:
    *   When an expense is added, edited, or deleted, RTK Query automatically invalidates cache tags (`['Expense']`) to fetch fresh records and update the dashboard instantaneously.

