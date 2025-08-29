const express = require('express');
const router = express.Router();
const khachHangController = require('../controllers/khachHangController');

router.post('/', khachHangController.createKhachHang);
router.get('/', khachHangController.getAllKhachHang);
router.get('/:id', khachHangController.getKhachHangById);
router.put('/:id', khachHangController.updateKhachHang);
router.delete('/:id', khachHangController.deleteKhachHang);

module.exports = router;
