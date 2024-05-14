const express = require('express')
const router = express.Router()

// controllers
const {createPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos} = require("../controllers/PhotoController")

// middlewares
const {photoCreateValidation, photoUpdateValidation, photoCommentValidation} = require("../middlewares/photoValidations")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const { uploadImage } = require('../middlewares/imageUpload')

// routes
router.post("/", authGuard, uploadImage.single('image'), photoCreateValidation(), validate, createPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/search", authGuard, searchPhotos)
router.get("/:id", authGuard, getPhotoById)
router.put("/:id", authGuard, photoUpdateValidation(), validate, updatePhoto)
router.put("/like/:id", authGuard, likePhoto)
router.put("/comment/:id", authGuard, photoCommentValidation(), validate, commentPhoto)

module.exports = router