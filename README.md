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

## Installation and setup

You can run BarPOS on your local workspace by following these steps:

### 1. Get the MongoDB connection string

- Ensure that you have access on a free Mongo Atlas Cluster.
- Sign in to Mongo Atlas [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database)
- Create a new project and deploy a free (M0) cluster.
- Under **Database Access** create a database user and under **Network access** add your IP address or allow access from anywhere (0.0.0.0/0).
- Go to Database > Connect > Drivers and copy your connection string (replacing in process <username> and <password>).

### 2. Configure the environment

### Getting Started

- Clone the repository to your local machine.

### Backend

1. Open the `backend` folder and rename `.env.example` to `.env`.
2. Fill in `.env` with your MongoDB connection string and jwt secret key.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open the `frontend` folder and rename `.env.example` to `.env`.
2. Install the dependencies and start the app:
   ```bash
   npm install
   npm run dev
   ```

## Author

**Indrit Llangozi**
- GitHub: [@1ndr-ITech5](https://github.com/1ndr-ITech5)
- LinkedIn: [Indrit Llangozi](www.linkedin.com/in/indrit-llangozi-bb60042b9)
- Email: indritllangozi5@gmail.com

## License

Copyright (c) 2026 Indrit Llangozi. All rights reserved.
This source code is published for **portfolio and review purposes only**. It may not be copied, modified or used commercially without written permission.