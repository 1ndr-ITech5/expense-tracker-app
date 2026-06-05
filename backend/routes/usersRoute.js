const express = require('express')
const router = express.Router()
const {logUser, registerUser, getUser} = require("../controllers/usersController")
const {protect} = require('../middleware/authMiddleware')

router.post("/login", logUser)

router.post("/register", registerUser)

router.get("/user-info", protect, getUser)

module.exports = router;