const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require('./connection/db');

const app = express();
connectDB();

app.use(express.json());

app.use("/api/expenses", require("./routes/expensesRoute"))

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));