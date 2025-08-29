const express = require('express');
const router = express.Router();
const thanhtoanController = require('../controllers/thanhtoanController');

router.post('/', thanhtoanController.createThanhToan);
router.get('/', thanhtoanController.getAllThanhToan);
router.get('/:id', thanhtoanController.getThanhToanById);
router.put('/:id', thanhtoanController.updateThanhToan);
router.delete('/:id', thanhtoanController.deleteThanhToan);

module.exports = router;
