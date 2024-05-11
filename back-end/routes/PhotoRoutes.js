const express = require('express')
const router = express.Router()

// controllers
const {createPhoto, deletePhoto} = require("../controllers/PhotoController")

// middlewares
const {photoCreateValidation} = require("../middlewares/photoValidations")
const authGuard = require("../middlewares/authGuard")
const validate = require("../middlewares/handleValidation")
const { uploadImage } = require('../middlewares/imageUpload')

// routes
router.post("/", authGuard, uploadImage.single('image'), photoCreateValidation(), validate, createPhoto)
router.delete("/:id", authGuard, deletePhoto)

module.exports = router