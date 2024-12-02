const { Router } = require('express');

const dishRoutes = Router();

const DishController = require('../controllers/DishController');
const dishController = new DishController();

dishRoutes.post('/', dishController.create);
dishRoutes.put('/:id', dishController.udpate);

module.exports = dishRoutes;