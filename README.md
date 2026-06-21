# 💰 Expense Tracker App

A full-stack MERN personal finance tracker. Register, log in, and manage your expenses with real-time dashboard metrics and interactive filters.

---

## 🚀 Features

- 🔒 **JWT Auth** — Secure registration & login with bcryptjs password hashing
- 📊 **Dashboard Metrics** — Live totals for all-time, today, and this month
- ✏️ **Full CRUD** — Add, view, edit (modal), and delete expenses
- 🔍 **Filters** — By category (Food, Transport, Bills, etc.) and time period
- 🔔 **Toast Notifications** — Real-time feedback on every action

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Redux Toolkit & RTK Query, React Router DOM, Axios, Vite |
| **Backend** | Node.js, Express, MongoDB & Mongoose, JWT, bcryptjs |

---

## 📂 Project Structure

```
expense-tracker/
├── backend/
│   ├── connection/      # MongoDB connection
│   ├── controllers/     # Request/response logic
│   ├── middleware/       # Auth & error-handling middleware
│   ├── models/          # Mongoose schemas (User, Expense)
│   ├── routes/          # Express route definitions
│   └── server.js        # Entry point
└── frontend/UI/src/
    ├── entry/           # Login.jsx · Register.jsx  (+ co-located CSS)
    ├── layout/          # Navbar.jsx · Header.jsx   (+ co-located CSS)
    ├── dashboard/       # Dashboard.jsx · AddExpense.jsx · Profile.jsx  (+ CSS)
    ├── expense/         # ExpensesCard.jsx · UpdateExpense.jsx  (+ CSS)
    ├── utils/           # Spinner.jsx · ProtectedLayout.jsx
    ├── services/        # Axios auth client
    ├── store/           # Redux store, RTK Query (expenseApi), slices
    ├── App.jsx          # Routes & layout
    └── main.jsx         # React entry point
```

---

## 🔄 How It Works

1. **Auth** — On login/register, the server issues a JWT stored in Redux & `localStorage`. Every expense request attaches it as a Bearer token; middleware verifies it server-side.
2. **Data Fetching** — RTK Query manages all CRUD calls with automatic cache invalidation (`['Expense']` tag), keeping the dashboard in sync instantly.
3. **Update Modal** — Clicking *Update* on an expense card opens a full-screen modal overlay without leaving the dashboard.
