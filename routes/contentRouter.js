const router = require('express').Router()
const ContentController = require('../controllers/ContentController')

router.post('/',ContentController.create)



module.exports = router