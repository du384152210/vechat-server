

module.exports = (app) => {
  // 我的
  app.get('/my', require('./my/info'))
  app.post('/updateInfo', require('./my/update'))
  // 登录&注册
  app.post('/login', require('./login/login'))
  app.post('/register', require('./login/register'))
 
  app.get('/search', require('./search/search'))
  app.get('/friend/detail', require('./friend/detail'))
  app.post('/friend/apply', require('./friend/apply'))
  app.get('/friend/list', require('./friend/list'))

  app.post('/oneMsg', require('./message/oneMsg'))
  app.get('/msg/list', require('./message/list'))

  require('./upload/index')(app)
}