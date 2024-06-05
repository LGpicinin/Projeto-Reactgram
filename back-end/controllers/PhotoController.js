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
        res.status(404).json({errors: ["Foto não encontrada"]})
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
            res.status(404).json({errors: ["Publicação não encontrada"]})
        }
        res.status(200).json(photo)
    } catch (error) {
        res.status(422).json({errors: ["ID de publicação inválido"]})
    }

    res.status
}

const updatePhoto = async(req, res) => {
    const {id} = req.params
    const {title}= req.body

    const reqUser = req.user

    try {
        const photo = await Photo.findById(id)
        if(!photo){
            res.status(404).json({errors: ["Publicação não encontrada"]})
            return
        }

        if(!photo.userId.equals(reqUser._id)){
            res.status(422).json({errors: ["Houve um erro. Tente novamente mais tarde"]})
            return
        }

        if(title){
            photo.title = title
        }

        await photo.save()

        res.status(200).json({photo, message:"Publicação atualizada com sucesso"})

    } catch (error) {
        res.status(422).json({errors: ["ID de publicação inválido"]})
        return
    }

}

const likePhoto = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user

    try {
        const photo = await Photo.findById(id)
        if(!photo){
            res.status(404).json({errors: ["Publicação não encontrada"]})
            return
        }

        if(photo.likes.includes(reqUser._id)){
            res.status(422).json({errors: ["Publicação já curtida pelo usuário"]})
            return
        }

        photo.likes.push(reqUser._id)

        await photo.save()

        res.status(200).json({photoId: photo._id, userId: reqUser._id, message:"Publicação curtida com sucesso"})


    } catch (error) {
        res.status(422).json({errors: ["ID de publicação inválido"]})
        return
    }

}

const commentPhoto = async(req, res) => {
    const {id} = req.params
    const reqUser = req.user
    const {comment} = req.body

    try {
        const photo = await Photo.findById(id)
        if(!photo){
            res.status(404).json({errors: ["Publicação não encontrada"]})
            return
        }

        photo.comments.push({userId: reqUser._id, userName: reqUser.name, comment})

        await photo.save()

        res.status(200).json({photoId: photo._id, userId: reqUser._id, userName: reqUser.name, userImage: reqUser.profileImage, comment: comment, message:"Publicação comentada com sucesso"})
        
    } catch (error) {
        res.status(422).json({errors: ["ID de publicação inválido"]})
        return
    }

}

const searchPhotos = async(req, res) => {
    const {q} = req.query
    
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec()

    res.status(200).json(photos)
}

module.exports = {createPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos}