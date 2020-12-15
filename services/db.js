const config = require('../config')
const mongoose = require('mongoose')
const url = config.mongoUrl;
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
connect.then((db) => {
  console.log("Connect to the database server correctly");
}, (err) => { console.log(err); }); 