const express = require('express')
const router = express.Router()
const {logUser, registerUser, getUser} = require("../controllers/usersController")

router.post("/login", logUser)

router.post("/register", registerUser)

//router.get("/user-info/:id", getUser)

module.exports = router;