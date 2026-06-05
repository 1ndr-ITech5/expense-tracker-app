const jwt = require('jsonwebtoken')

const tokenGeneration = (id) => {
    // generate the token
    return jwt.sign(
        {id}, process.env.JWT_SECRET, {expiresIn: '10d'}
    )
}

module.exports = tokenGeneration;