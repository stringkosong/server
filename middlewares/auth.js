const {verifyToken} = require('../helpers/jwt')
const User = require('../models/User')
const Content = require('../models/Content')

function authentication(req,res,next) {
    try {
        let decodedToken = verifyToken(req.headers.token)
        
        User.findOne({_id:decodedToken._id})
        .then(user=>{
            
            if(user) {
                req.loggedUser = decodedToken
                next()
            } else {
                next({status:401, msg:'authentication failed'})
            }
        })
        .catch(next)
    }
    catch (err) {
        next({status:403, msg:'you must login first'})
    }
}

function authorization(req,res,next) {
    let {id} = req.params
    Content.findOne({_id:id})
    .then(result=>{
        if(result && result.userId == req.loggedUser._id) {
            next()
        } else {
            next({status: 401,msg: "not authorized"})
        }
    })
    .catch(next)
}



module.exports = { authentication,authorization }