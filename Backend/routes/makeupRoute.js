const router = require('express').Router();
const makeupController = require('../controllers/makeupController');
const auth = require('../middlewares/auth');

router.get('/', makeupController.get_all_makeup_services);
router.get('/:id', makeupController.get_makeup_service_by_id);
router.post('/', auth.verifyUser, makeupController.add_makeup_service);
router.post('/all', auth.verifyUser, makeupController.add_all_makeup_services);
router.patch('/:id', auth.verifyUser, makeupController.update_makeup_service);
router.patch('/image/:id', auth.verifyUser, makeupController.update_makeup_image);
router.delete('/:id',auth.verifyUser, makeupController.delete_makeup_service_by_id);

module.exports = router;