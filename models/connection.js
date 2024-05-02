
const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://slaain13:slaain13127_@slaain0.saqg4lp.mongodb.net/hackatweet';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));