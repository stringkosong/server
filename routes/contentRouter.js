const router = require('express').Router()
const ContentController = require('../controllers/ContentController')
const gcsUpload = require('../middlewares/gcs')
const {authentication, authorization} = require('../middlewares/auth')

const upload = gcsUpload({
  limits: {
    fileSize: 2e6
  },
  gcsConfig: {
    keyFilename: process.env.KEYFILE_PATH,
    bucketName: process.env.BUCKET_NAME
  }
})

router.use(authentication)
router.get('/', ContentController.findAll)
router.get('/:id', ContentController.findOne)
router.post('/', upload.single('file') , ContentController.create)
router.patch('/:id', ContentController.comment)
router.delete('/:id',authorization,ContentController.delete)


module.exports = router