const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Import dotenv

const DB_URI = process.env.DB_URI_REMOTE || process.env.DB_URI_LOCAL; // Get the DB URI from the environment variables
console.log(DB_URI);

module.exports = async () => {
    console.log('Connecting to database...');
    return mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); // Connect to the database
}