module.exports = (app) => {
  app.get('/my', require('./my/info'))
  app.post('/login', require('./login/login'))
  app.post('/register', require('./login/register'))
  app.post('/updateInfo', require('./my/update'))
}