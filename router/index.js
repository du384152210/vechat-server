module.exports = (app) => {
  app.get('/login', require('./login/login'))
  app.get('/my', require('./my/info'))
  app.post('/register', require('./login/register'))
}