const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    jwt.sign({id}, jwtSecret, {
        expiresIn: '7d'
    })
}

const register = (req, res) => {
    res.send('Registro realizado!!!')
}

module.exports = {
    register,
}