const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'G:\\personal\\node\\vechat-server\\public\\images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
  }
})

const upload = multer({ storage })

module.exports = (app) => {
  app.post('/upload', upload.single('file'), function (req, res, next) {
    res.json({
      message: 'success',
      src: 'http://localhost:3000/images/' + req.file.filename
    })
  })
}