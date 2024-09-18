const express = require('express');
const dogosController = require('./controllers/dogosController');
const dogosMiddleware = require('./middlewares/dogosMiddleware');
const authenticateToken = require('./middlewares/authMiddleware');
const router = express.Router();

router.get('/dogos', dogosController.getDogos);
router.post('/dogos', dogosMiddleware.validateBody,dogosController.createDog); //verificar se foi preenchido, criar middleware
router.delete('/dogos/:id', authenticateToken, dogosController.deleteDog);
router.put('/dogos/:id', dogosController.updateDog);

module.exports = router;