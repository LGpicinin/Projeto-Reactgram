const {body} = require('express-validator')

const photoCreateValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O campo título é obrigatório")
            .isString()
            .withMessage("O campo título é obrigatório")
            .isLength({min: 3})
            .withMessage("O título precisa ter no mínimo 3 caracteres"),
        body("image")
            .custom((value, {req}) => {
                if(!req.file){
                    throw new Error("A campo imagem é obrigatório")
                }
                return true;
            })
    ]
}

module.exports = {photoCreateValidation}