const router = require('express').Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/userController');

router.post('/register', userController.register_new_user);
router.post('/login', userController.login_user);
router.get('/', auth.verifyUser, userController.get_user_profile);
router.patch('/', auth.verifyUser, userController.update_user_profile);

// Serch History and Metadata
router.get('/metadata', auth.verifyUser, userController.get_user_metadata);
router.post('/search-history', auth.verifyUser, userController.update_search_history);

router.post("/reset-code", userController.resetCode)
router.post("/new-password",  userController.newPassword)
router.post("/change-password", auth.verifyUser, userController.change_password)


// Route to get user details (for admin)
router.get('/all', auth.verifyUser, userController.get_all_users);
router.patch('/role/:userId/:status/', auth.verifyUser, userController.update_user_role);    
module.exports = router;