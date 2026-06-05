const express = require('express')
const router = express.Router()
const {getExpenses, createExpenses, updateExpenses, deleteExpenses} = require('../controllers/expensesController')
const {protect} = require('../middleware/authMiddleware')

router.get("/", protect, getExpenses)

router.post("/", protect, createExpenses)

router.put("/:id", protect, updateExpenses)

router.delete("/:id", protect, deleteExpenses)

module.exports = router;