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
const axios = require('axios');

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
  // exposedHeaders: 'Access-Control-Allow-Origin',
}));
app.use(csrf({ cookie: true }));

app.get('/api/csrf-token', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('csrftoken', csrfToken);
  res.status(200).json({ csrfToken });
});

app.get('/api/khalti', async (req, res) => {

const response = await axios.post(
  'https://dev.khalti.com/api/v2/epayment/initiate/',
  {
    'return_url': 'http://localhost:3000/',
    'website_url': 'http://localhost:3000/',
    'amount': '1000',
    'purchase_order_id': 'Order01',
    'modes': [
      'KHALTI'
    ],
    'purchase_order_name': 'test',
    'customer_info': {
      'name': 'Test Bahadur',
      'email': 'test@khalti.com',
      'phone': '9800000001'
    }
  },
  {
    headers: {
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Origin': 'https://docs.khalti.com',
      'Pragma': 'no-cache',
      'Referer': 'https://docs.khalti.com/',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-site',
      'Sec-GPC': '1',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36',
      'authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
      'content-type': 'application/json',
      'sec-ch-ua': '"Not)A;Brand";v="8", "Chromium";v="138", "Brave";v="138"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Linux"'
    }
  }
);
console.log(response.data);
res.status(200).json({ payment_url: response.data?.payment_url ?? '' });
})

app.use('/users', userRoute);
app.use('/nail', nailRoute);
app.use('/makeup', makeupRoute);
app.use('/booking', bookingRoute);

app.get('/', (req, res) => {
    res.send('Welcome to BeautyBooking API');
    res.end();
});

module.exports = app;
