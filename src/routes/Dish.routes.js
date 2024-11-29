const { Router } = require('express');

const dishRoutes = Router();

const DishController = require('../controllers/DishController');
const dishController = new DishController();

dishRoutes.post('/', dishController.create);

module.exports = dishRoutes;