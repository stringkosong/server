const validate = require('mongoose-validator')

let isEmailValidation = [
    validate({
        validator: 'isEmail',
        message: 'invalid email format'
    })
]

module.exports = { isEmailValidation }