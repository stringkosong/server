const router = require('express').Router()
const contentRouter = require('./contentRouter')

router.get('/',(req,res,next)=>{
    res.json({message:'welcome to app'})
})

router.use('/contents',contentRouter)


module.exports = router