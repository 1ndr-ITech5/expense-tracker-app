const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors')
const PORT = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./connection/db');

const app = express();
connectDB();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// endpoint for expenses operations
app.use("/api/expenses", require("./routes/expensesRoute"))

// endpoint for user operations
app.use("/api/user", require("./routes/usersRoute"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));