require('dotenv').config();


const app = require('./app');
const db_connection = require('./utils/dbConnection'); 
const port = process.env.PORT || 8080;


db_connection().then(() => {
    app.listen(port, () => {
    console.log(`Server is running on port http://locahost:${port}`);
        });
    console.log('Connected to database');
}).catch((err) => {
    console.log('Error connecting to database', err);
});