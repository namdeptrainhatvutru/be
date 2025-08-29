const express = require('express');
const router = express.Router();
const phongChieuController = require('../controllers/phongChieuController');

router.post('/', phongChieuController.createPhongChieu);
router.get('/', phongChieuController.getAllPhongChieu);
router.get('/:id', phongChieuController.getPhongChieuById);
router.put('/:id', phongChieuController.updatePhongChieu);
router.delete('/:id', phongChieuController.deletePhongChieu);

module.exports = router;
