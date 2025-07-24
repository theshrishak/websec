const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// Routes Imports
const userRoute = require('./routes/userRoute');
const nailRoute = require('./routes/nailRoute');    
const makeupRoute = require('./routes/makeupRoute');
const bookingRoute = require('./routes/bookingRoute');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(fileUpload({useTempFiles: true}));


// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Specify your front-end URL here
  credentials: true, // Allow credentials (cookies, HTTP authentication, etc.)
  methods: 'GET,POST,PUT, PATCH, DELETE', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
  exposedHeaders: 'Access-Control-Allow-Origin',
};

// Use CORS with the specified options
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Welcome to BeautyBooking API');
    res.end();
});


// Routes
app.use('/users', userRoute);
app.use('/nail', nailRoute);
app.use('/makeup', makeupRoute);
app.use('/booking', bookingRoute);

module.exports = app;