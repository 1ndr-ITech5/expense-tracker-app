const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

// init the server
const app = express();

// app uses this route for endpoint requests
app.use("/api/expenses", require('./routes/expensesRoute'))

app.listen(port, () => console.log(`Server running on port ${port}`))