const router = require('express').Router();
const nailController = require('../controllers/nailController');
const auth = require('../middlewares/auth');

router.get('/', nailController.get_all_nail_services);
router.get('/:id', nailController.get_nail_service_by_id);
router.post('/', nailController.add_nail_service);
router.post('/all', auth.verifyUser, nailController.add_all_nail_services);
router.patch('/:id', nailController.update_nail_service);
router.patch('/image/:id', nailController.update_nail_image);
router.delete('/:id', nailController.delete_nail_service_by_id);

module.exports = router;