const express = require('express')
const router = express.Router()

// controllers
const {createPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById} = require("../controllers/PhotoController")

// middlewares
const {photoCreateValidation} = require("../middlewares/photoValidations")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const { uploadImage } = require('../middlewares/imageUpload')

// routes
router.post("/", authGuard, uploadImage.single('image'), photoCreateValidation(), validate, createPhoto)
router.delete("/:id", authGuard, deletePhoto)
router.get("/", authGuard, getAllPhotos)
router.get("/user/:id", authGuard, getUserPhotos)
router.get("/:id", authGuard, getPhotoById)

module.exports = router