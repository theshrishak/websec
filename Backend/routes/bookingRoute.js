const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');

router.post('/', auth.verifyUser, bookingController.create_new_booking);
router.get('/', auth.isAdmin, bookingController.getAllBookings);
router.get('/makeup', auth.isAdmin, bookingController.getAllMakeupBookings);
router.get('/nails', auth.isAdmin, bookingController.getAllNailsBookings);
router.get('/user', auth.isAdmin, bookingController.getAllBookingsByUser);
router.patch('/cancel/:bookingId', auth.isAdmin, bookingController.cancelBooking);
router.patch('/:bookingId/:status/', auth.isAdmin, bookingController.updateBookingStatus);

module.exports = router;