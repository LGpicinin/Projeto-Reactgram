const express = require('express');
const router = express.Router();

// middlewares
const validate = require('../middlewares/handleValidation')
const {userCreateValidation} = require('../middlewares/userValidations')

// controller
const {register} = require('../controllers/UserController');

// routes
router.post('/register', userCreateValidation(), validate, register);

module.exports = router