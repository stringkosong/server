const router = require('express').Router()
const ContentController = require('../controllers/ContentController')
const gcsUpload = require('../middlewares/gcs')


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
router.post('/', upload.single('file') , ContentController.create)



module.exports = router