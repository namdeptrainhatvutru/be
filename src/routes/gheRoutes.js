const express = require('express');
const router = express.Router();
const gheController = require('../controllers/gheController');

router.post('/', gheController.createGhe);
router.get('/', gheController.getAllGhe);
router.get('/:id', gheController.getGheById);
router.put('/:id', gheController.updateGhe);
router.delete('/:id', gheController.deleteGhe);

module.exports = router;
