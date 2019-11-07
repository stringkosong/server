const multer = require('multer')
const uploadToGcs = require('./gcsUpload')

module.exports = ({ limits, gcsConfig }) => {
  const multerStorage = multer.memoryStorage()
  const upload = multer({ storage: multerStorage, limits })
  // console.log('MASUK GCS')

  return {
    single: (fieldname) => [
      upload.single(fieldname),
      async (req, res, next) => {
        try {
          req.body[fieldname] = await uploadToGcs({ file: req.file, gcsConfig })
          next()
        } catch (error) {
          next(error)
        }
      }
    ]
  }
}