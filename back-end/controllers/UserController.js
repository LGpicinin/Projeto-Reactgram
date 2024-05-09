const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '7d'
    })
}

const register = async(req, res) => {
    const {name, email, password} = req.body

    const existUser = await User.findOne({email})

    if(existUser){
        res.status(422).json({errors: ['E-mail já cadastrado. Insira outro e-mail']});
        return;
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = User.create({
        name,
        email,
        password: hashedPassword
    })

    if(!newUser){
        res.status(422).json({errors: ['Houve um problema. Tente novamente mais tarde.']});
        return;
    }

    res.status(201).json({
        _id: (await newUser)._id,
        token: generateToken(newUser._id),
    });
}

const login = async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user){
        res.status(404).json({errors: ["Usuário não encontrado"]})
        return;
    }

    if(!(await bcrypt.compare(password, user.password))){
        res.status(422).json({errors: ["Senha incorreta"]})
        return
    }

    res.status(201).json({
        _id: (await user)._id,
        token: generateToken(user._id),
    })


}

const getCurrentUser = (req, res) => {
    const user = req.user

    res.status(200).json(user)
}

module.exports = {
    register,
    login,
    getCurrentUser
}