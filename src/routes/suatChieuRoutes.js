const express = require('express');
const router = express.Router();
const suatChieuController = require('../controllers/suatChieuController');

router.post('/', suatChieuController.createSuatChieu);
router.get('/', suatChieuController.getAllSuatChieu);
router.get('/:id', suatChieuController.getSuatChieuById);
router.put('/:id', suatChieuController.updateSuatChieu);
router.delete('/:id', suatChieuController.deleteSuatChieu);

module.exports = router;
