const mongoose = require('mongoose');
const userName = 'root';
const password = 'root';

mongoose.connect(`mongodb+srv://${userName}:${password}@demo1.kkdyluj.mongodb.net/vechat`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('数据库连接成功');
});