const multer = require('multer');
const mkdir = require('../../dao/mkdir');

// 控制文件存储
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = req.body.url;
    mkdir.mkdirs('../data/+url', err => {
      console.log(err);
    });

    cb(null, './data/'+url)
  },
  filename: function (req, file, cb) {
    // let name = req.body.name;
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