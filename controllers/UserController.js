const User = require('../models/User')
const {comparePassword} = require('../helpers/bcryptjs')
const {generateToken} = require('../helpers/jwt')

class UserController {
    static register (req,res,next) {
        let {name,email,password} = req.body
        User.create({name,email,password})
        .then(_ => {
            res.status(201).json({message:'register success'})
        })
        .catch(next)
    }
    static login (req,res,next) {
        let {email,password} = req.body
        User.findOne({email})
        .then(user=>{
            if(user && comparePassword(password,user.password)) {
                let payload = {name:user.name,email:user.email,_id:user._id}
                let token = generateToken(payload)
                res.status(201).json({token,name:user.name,_id:user._id,email:user.email, message: 'Login success'})
            } else {
                next({status:401,msg:'invalid email/password'})
            }
        })
        .catch(next)
    }
}

module.exports = UserController