const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Import dotenv
const { logger } = require('./logger');


const DB_URI = process.env.DB_URI_REMOTE || process.env.DB_URI_LOCAL; // Get the DB URI from the environment variables

module.exports = async () => {
    logger.info('Connecting to database...');
    return mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}
