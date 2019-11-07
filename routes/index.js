const router = require('express').Router()
const contentRouter = require('./contentRouter')
const userRouter = require('./userRouter')

router.get('/',(req,res,next)=>{
    res.json({message:'welcome to app'})
})

router.use('/contents',contentRouter)
router.use('/users',userRouter)

module.exports = router