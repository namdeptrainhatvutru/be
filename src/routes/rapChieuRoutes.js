const express = require('express');
const router = express.Router();
const rapChieuController = require('../controllers/rapChieuController');

router.post('/', rapChieuController.createRapChieu);
router.get('/', rapChieuController.getAllRapChieu);
router.get('/:id', rapChieuController.getRapChieuById);
router.put('/:id', rapChieuController.updateRapChieu);
router.delete('/:id', rapChieuController.deleteRapChieu);

module.exports = router;
