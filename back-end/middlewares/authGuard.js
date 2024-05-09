const User = require('../models/User')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const authGuard = async(req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    // header format -> Bearer ajsdhgdsdhsadi8382

    // check if header has a token
    if(!token) {
        return res.status(401).json({errors: ["Acesso negado"]})
    }

    // validate token 
    try {
        const verificate = jwt.verify(token, jwtSecret)
        req.user = await User.findById(verificate.id).select("-password")
        next()
    } catch (error) {
        res.status(401).json({error: ["Token inválido"]})
    }
}

module.exports = authGuard