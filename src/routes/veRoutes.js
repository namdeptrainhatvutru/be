const express = require('express');
const router = express.Router();
const veController = require('../controllers/veController');

router.post('/', veController.createVe);
router.get('/', veController.getAllVe);
router.get('/:id', veController.getVeById);
router.put('/:id', veController.updateVe);
router.delete('/:id', veController.deleteVe);

module.exports = router;
