const asyncHandler = require('express-async-handler');
const Expense = require('../models/expensesModel');


const getExpenses = asyncHandler(async (req, res) => {
    const expenses = await Expense.find({user: req.user._id})
    res.status(200).json(expenses)
})


const createExpenses = asyncHandler(async (req, res) => {
    const { title, amount, category } = req.body

    // check if fields are filled
    if (!title || !amount || !category) {
        res.status(400)
        throw new Error("Please fill all the fields!")
    }

    // check if amount has not a negative value
    if (amount <= 0) {
        res.status(400)
        throw new Error("Amount cannot have a negative or zero value!")
    }

    const newExpense = await Expense.create({
        title: title,
        amount: amount,
        category: category,
        user: req.user._id
    })

    res.status(201).json('Expense created successfully!')
})


const updateExpenses = asyncHandler(async (req, res) => {
    const { id } = req.params

    // check if this id exists on database
    const exists = await Expense.findById(id)
    if (!exists) {
        res.status(404)
        throw new Error("This expense does not exist on database!")
    }

    // 1. check if req.user info has come
    if(!req.user){
        res.status(401)
        throw new Error("This user does not exist!")
    }

    // 2. check if the user that made req, is the one who owns the project for update
    if(exists.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You don't have rights on updating this expense!")
    }

    // 3. Control if user has sent an amount field for update
    if (req.body.amount !== undefined) {

        // 2. Check if amount is below than zero
        if (Number(req.body.amount) <= 0) {
            res.status(400);
            throw new Error('The expense amount cannot be negative or zero!');
        }
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
        id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json("Expense updated successfully!")
})


const deleteExpenses = asyncHandler(async (req, res) => {
    const { id } = req.params

    // check for the existence of expense in db
    const check = await Expense.findById(id)
    if (!check) {
        res.status(404)
        throw new Error("This expense does not exist!")
    }

    // 1. check if req.user info has come
    if(!req.user){
        res.status(401)
        throw new Error("This user does not exist!")
    }

    // 2. check if the user that made req, is the one who owns the project for update
    if(check.user.toString() !== req.user._id.toString()){
        res.status(401)
        throw new Error("You don't have rights on updating this expense!")
    }

    // after we find it, we delete it
    await Expense.findByIdAndDelete(id)
    res.status(200).json("Expense deleted successfully!")
})


module.exports = { getExpenses, createExpenses, updateExpenses, deleteExpenses }