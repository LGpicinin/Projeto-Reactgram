const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const jwtSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: '7d'
    })
}

const generateHashedPassword = async(password) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}

const register = async(req, res) => {
    const {name, email, password} = req.body

    const existUser = await User.findOne({email})

    if(existUser){
        res.status(422).json({errors: ['E-mail já cadastrado. Insira outro e-mail']});
        return;
    }

    const hashedPassword = await generateHashedPassword(password)

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

const update = async(req, res) => {
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const userId = new mongoose.Types.ObjectId(reqUser._id)

    const user = await User.findById(userId).select("-password")

    if(name){
        user.name = name
    }

    if(password){
        const hashedPassword = await generateHashedPassword(password)
        user.password = hashedPassword
    }

    if(bio){
        user.bio = bio
    }

    if(profileImage){
        user.profileImage = profileImage
    }

    await user.save()

    res.status(200).json(user)
}

const getUserById = async(req, res) => {
    const reqId = req.params

    try {
        const userId = new mongoose.Types.ObjectId(reqId)

        const user = await User.findById(userId).select("-password")

        if(!user){
            res.status(404).json({errors: ["Usuário não encontrado"]})
            return;
        }

        res.status(200).json(user)
        
    } catch (error) {
        res.status(404).json({errors: ["Id inválido"]})
    }

}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById
}