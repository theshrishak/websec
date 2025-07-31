const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const { logger } = require('./utils/logger');

const userRoute = require('./routes/userRoute');
const nailRoute = require('./routes/nailRoute');    
const makeupRoute = require('./routes/makeupRoute');
const bookingRoute = require('./routes/bookingRoute');

const app = express();

app.use(helmet());
app.use(xssClean());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}))
app.use(express.json());

app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
app.use(mongoSanitize());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET, POST,PUT, PATCH, DELETE',
  allowedHeaders: ['Content-Type', 'Authorization', 'XSRF-Token'],
  exposedHeaders: 'Access-Control-Allow-Origin',
}));
app.use(csrf({ cookie: true }));

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('csrftoken', csrfToken);
  res.status(200).json({ csrfToken });
});

app.use('/users', userRoute);
app.use('/nail', nailRoute);
app.use('/makeup', makeupRoute);
app.use('/booking', bookingRoute);

app.get('/', (req, res) => {
    res.send('Welcome to BeautyBooking API');
    res.end();
});

module.exports = app;
