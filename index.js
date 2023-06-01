const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const path = require('path');
const { varifyToken } = require('./utils/token');

// 处理文件上传
const formidableMiddleware = require('express-formidable');

const port = 3000
let server = app.listen(8082);

const io = new Server(server, {cors: true});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('gbmsg',msg);
  })
});
// 跨域处理
app.use(cors());
// 处理post参数
app.use(formidableMiddleware({
  //文件上传目录
  uploadDir: path.join(__dirname, 'public', 'uploads'),
  //z最大上传文件为2M
  maxFileSize: 2 * 1024 * 1024,
  //保留文件扩展名
  keepExtensions: true
}));

//开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  if (req.url != '/login' && req.url != '/register') {
    let token = req.headers.authorization;
    let result = varifyToken(token);
    if (result.code === 200) {
      next()
    } else {
      return res.status(401).send({
        message: '登录信息过期',
        status: 401
      })
    }
  } else {
    next();
  }
})

//数据库连接
require('./config/db');

require('./router')(app)

app.listen(port, () => {
  console.log('running....');
})
