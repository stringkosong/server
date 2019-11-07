const router = require('express').Router()
const ContentController = require('../controllers/ContentController')
const gcsUpload = require('../middlewares/gcs')
const {authentication, authorization} = require('../middlewares/auth')

const upload = gcsUpload({
  limits: {
    fileSize: 2e6
  },
  gcsConfig: {
    keyFilename: './keyfile.json',
    bucketName: 'qmage'
  }
})

router.get('/', ContentController.findAll)
router.post('/', authentication, upload.single('file') , ContentController.create)
router.patch('/:id', authentication, ContentController.comment)


module.exports = router