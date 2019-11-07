const { Schema, model } = require('mongoose')
const { hashPassword } = require('../helpers/bcryptjs')
const { isEmailValidation } = require('../helpers/validator')

const userSchema = new Schema ({
    name: {type:String,required:[true,'name is required']},
    email: {type:String,required:[true,'email is required'],validate:isEmailValidation,unique:true},
    password: {type:String,required:[true,'password is required']}
},{ timestamps: true, versionKey: false })

userSchema.pre('save',function(next){
    this.password = hashPassword(this.password)
    next()
})

const User = model('User',userSchema)

module.exports = User