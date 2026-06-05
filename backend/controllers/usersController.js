const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require("../models/userModel")
const {tokenGeneration} = require("../utils/generateToken")

const registerUser = asyncHandler(async(req,res) => {
    // destruct the user's info from req.body
    const {name, email, password} = req.body

    // check if the given fields are filled
    if (!name || !email || !password){
        res.status(400)
        throw new Error("Please fill all the fields!!")
    }

    // check if the given email already exists on db
    const checkExistence = await User.findOne({email})
    if (checkExistence) {
        res.status(400)
        throw new Error("This user already exists on the database!")
    }

    // lets encrypt user's password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create the user on database
    const newUser = await User.create({
        name, email, password: hashedPassword
    })

    // get the token 
    const token = tokenGeneration(newUser._id)

    // check if the user its created, return a json file with his info
    if (newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token
        })
    }else{
        res.status(400)
        throw new Error("Invalid data!")
    }
})

const logUser = asyncHandler(async(req, res) => {
    // check if the fields given are filled
    const {email, password} = req.body
    if (!email || !password){
        res.status(400)
        throw new Error("Please fill the LogIn fields!")
    }

    // check if the email exists on db
    const emailExists = await User.findOne({email})
    if (!emailExists){
        res.status(404)
        throw new Error("This user does not exists!")
    }

    // check if passwords match
    const isMatch = await bcrypt.compare(password, emailExists.password)
    if (!isMatch){
        res.status(401)
        throw new Error("Invalid password credentials!")
    }

    // token generated
    const token = tokenGeneration(emailExists._id)

    res.status(200).json({
        _id: emailExists._id,
        name: emailExists.name,
        email: emailExists.email,
        token
    })
})

module.exports = {registerUser, logUser}