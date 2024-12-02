const { Router } = require('express');

const dishRoutes = Router();

const DishController = require('../controllers/DishController');
const dishController = new DishController();

dishRoutes.post('/', dishController.create);
dishRoutes.put('/:id', dishController.udpate); 
dishRoutes.get('/', dishController.index); 
dishRoutes.get('/:id', dishController.show); 

module.exports = dishRoutes;