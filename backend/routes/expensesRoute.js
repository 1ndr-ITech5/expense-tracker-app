const express = require('express')
const router = express.Router()
const {getExpenses, createExpenses, updateExpenses, deleteExpenses} = require('../controllers/expensesController')

router.get("/", getExpenses)

router.post("/", createExpenses)

router.put("/:id", updateExpenses)

router.delete("/:id", deleteExpenses)

module.exports = router;