const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require("../models/userModel")
const {tokenGeneration} = require("../utils/generateToken")

const registerUser = asyncHandler(async(req,res) => {
    // destruct the user's info from req.body
    const {name, email, password} = req.body

    // check that the inputed fields are in string data type format
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string"){
        res.status(409)
        throw new Error("The inputed fields should be in string data type!")
    }

    const clearName = name.trim()
    const validEmail = email.trim().toLowerCase()

    // check if the given fields are filled
    if (!clearName || !validEmail || !password){
        res.status(400)
        throw new Error("Please fill all the fields!!")
    }

    // check if the given email already exists on db
    const user = await User.findOne({email: validEmail})
    if (user) {
        res.status(409)
        throw new Error("This user already exists on the database!")
    }

    // lets encrypt user's password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create the user on database
    let newUser;

    try {
        newUser = await User.create({
            name: clearName,
            email: validEmail,
            password: hashedPassword
        });
    } catch (error) {
        // 11000 = duplicate key nga indeksi unik (mbulon race condition)
        if (error.code === 11000) {
            res.status(409);
            throw new Error("This user already exists on the database!");
        }
        throw error;
    }

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token: tokenGeneration(newUser._id),
        createdAt: newUser.createdAt })
})

const logUser = asyncHandler(async(req, res) => {
    // check if the fields given are filled
    const {email, password} = req.body
    if (!email || !password){
        res.status(400)
        throw new Error("Please fill the LogIn fields!")
    }

    // check if the email exists on db
    const user = await User.findOne({email})
    if (!user){
        res.status(404)
        throw new Error("This user does not exists!")
    }

    // check if passwords match
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        res.status(401)
        throw new Error("Invalid password credentials!")
    }

    res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: tokenGeneration(user._id),
        createdAt: user.createdAt
    })
})


const getUser = asyncHandler(async(req, res) => {
    const user = req.user

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt
        })
    }else{
        res.status(404)
        throw new Error("User profile not found!")
    }
})

module.exports = {registerUser, logUser, getUser}