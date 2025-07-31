require('dotenv').config();

const db_connection = require('./utils/dbConnection'); 
const port = process.env.PORT || 8090;
const app = require('./app');
const { logger } = require('./utils/logger');


db_connection().then(() => {
    app.listen(port, () => {
        logger.info(`Server is running on port http://localhost:${port}`);
    });
    logger.info('Connected to database');
}).catch((err) => {
    logger.info('Error connecting to database', err);
});

