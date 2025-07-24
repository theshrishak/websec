const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middlewares/auth');

router.post('/', auth.verifyUser, bookingController.create_new_booking);
router.get('/', auth.verifyUser, bookingController.getAllBookings);
router.get('/makeup', auth.verifyUser, bookingController.getAllMakeupBookings);
router.get('/nails', auth.verifyUser, bookingController.getAllNailsBookings);
router.get('/user', auth.verifyUser, bookingController.getAllBookingsByUser);
router.patch('/cancel/:bookingId', auth.verifyUser, bookingController.cancelBooking);
router.patch('/:bookingId/:status/', auth.verifyUser, bookingController.updateBookingStatus);

// booking cancled by user


// router.put('/:bookingId/status', isAdmin, bookingController.updateBookingStatus);



module.exports = router;