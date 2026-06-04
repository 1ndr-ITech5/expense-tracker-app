const getExpenses = (req, res) => {
    res.status(200).json({message: "Get all the expenses!"})
}

const createExpenses = (req, res) => {
    res.status(201).json({message: "Create expense!"})
}

const updateExpenses = (req, res) => {
    res.status(200).json({message: "Update expense!"})
}

const deleteExpenses = (req, res) => {
    res.status(200).json({message: "Delete expense!"})
}

module.exports = {getExpenses, createExpenses, updateExpenses, deleteExpenses}