const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add your name!']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email!'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please fill the password field!'],
    }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);