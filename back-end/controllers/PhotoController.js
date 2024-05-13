const Photo = require("../models/Photo")
const User = require("../models/User")
const mongoose = require('mongoose')

const createPhoto = async(req, res) => {
    const {title} = req.body
    const image = req.file.filename

    const reqUser = req.user
    const user = await User.findById(reqUser._id)

    const newPhoto = await Photo.create({
        image,
        title,
        userName: user.name,
        userId: user._id
    })

    if(!newPhoto){
        res.status(422).json({errors: ["Houve um erro. Tente novamente mais tarde"]})
        return;
    }

    res.status(201).json(newPhoto)

}

const deletePhoto = async(req, res) => {
    const {id} = req.params
    const user = req.user

    try {
        const photoId = new mongoose.Types.ObjectId(id)
        const photo = await Photo.findById(photoId)
        
        if(!photo.userId.equals(user._id)){
            res.status(422).json({errors: ["Houve um erro. Tente novamente mais tarde"]})
        }

        await Photo.findByIdAndDelete(photo._id)

        res.status(200).json({id: photo._id, message: "Publicação deletada com sucesso"})

    } catch (error) {
        res.status(422).json({errors: ["Foto não encontrada"]})
    }
}

const getAllPhotos = async(req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()

    res.status(200).json(photos)
}

const getUserPhotos = async(req, res) => {
    const {id} = req.params

    const photos = await Photo.find({userId: id})
    res.status(200).json(photos)

}

const getPhotoById = async(req, res) => {
    const {id} = req.params
    try {
        const photoId = new mongoose.Types.ObjectId(id)
        const photo = await Photo.findById(photoId)
        if(!photo){
            res.status(422).json({errors: ["Publicação não encontrada"]})
        }
        res.status(200).json(photo)
    } catch (error) {
        res.status(422).json({errors: ["ID de publicação inválido"]})
    }

    res.status
}

module.exports = {createPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById}