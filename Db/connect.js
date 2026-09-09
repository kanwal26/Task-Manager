// const mongoose = require('mongoose');
// const dns = require('dns');

// dns.setServers(['8.8.8.8', '1.1.1.1']);

// const connectionString =
//   'mongodb+srv://kksheikh2626_db_user:iVgGDlPxo4fTjbJQ@tasks.uzoxswj.mongodb.net/?appName=Tasks';

// mongoose
//   .connect(connectionString)
//   .then(() => {
//     console.log('Connected to DB');
//   })
//   .catch((err) => {
//     console.log('MongoDB connection error:', err);
//   });



const mongoose = require('mongoose');
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);

  const connectDb  = (url) => {
    return mongoose.connect(url)
  }
 module.exports = connectDb;