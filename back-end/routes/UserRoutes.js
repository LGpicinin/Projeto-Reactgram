const express = require('express');
const router = express.Router();

// middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidation, userLoginValidation, userUpdateValidation} = require('../middlewares/userValidations')
const authGuard = require('../middlewares/authGuard')
const {uploadImage} = require('../middlewares/imageUpload')

// controller
const {register, login, getCurrentUser, update, getUserById} = require('../controllers/UserController');

// routes
router.post('/register', userCreateValidation(), validate, register);
router.post('/login', userLoginValidation(), validate, login);
router.post('/profile', authGuard, getCurrentUser)
router.put('/update', authGuard, userUpdateValidation(), validate, uploadImage.single("profileImage"), update)
router.get('/:id', getUserById)

module.exports = router