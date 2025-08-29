const express = require('express');
const router = express.Router();
const phimController = require('../controllers/phimController');

router.post('/', phimController.createPhim);
router.get('/', phimController.getAllPhim);
router.get('/:id', phimController.getPhimById);
router.put('/:id', phimController.updatePhim);
router.delete('/:id', phimController.deletePhim);

module.exports = router;
