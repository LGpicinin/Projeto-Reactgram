const {validationResult} = require('express-validator')

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const errorMessages = []
    errors.array().map((err) => {
        errorMessages.push(err.msg)
    })

    return res.status(422).json({
        errors: errorMessages
    })
}

module.exports = validate