const {body} = require('express-validator')


const userCreateValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('O campo nome é obrigatório')
            .isLength({min: 3})
            .withMessage('O campo nome precisa ter no mínimo 3 caracteres'),
        body('email')
            .isString()
            .withMessage('O campo e-mail é obrigatório')
            .isEmail()
            .withMessage('E-mail inválido'),
        body('password')
            .isString()
            .withMessage('O campo senha é obrigatório')
            .isLength({min: 5})
            .withMessage('O campo senha precisa ter no mínimo 5 caracteres'),
        body('confirmPassword')
            .isString()
            .withMessage('O campo de confirmação de senha é obrigatório')
            .custom((value, {req}) => {
                if(value!=req.body.password){
                    throw new Error('A senha precisam ser iguais')
                }
                return true
            })
    ]
}

const userLoginValidation = () => {
    return [
        body('email')
            .isString()
            .withMessage('O campo e-mail é obrigatório')
            .isEmail()
            .withMessage('E-mail inválido'),
        body('password')
            .isString()
            .withMessage('O campo senha é obrigatório')
    ]
}

module.exports = {userCreateValidation, userLoginValidation}