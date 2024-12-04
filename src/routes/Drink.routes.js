const { Router } = require('express');

const drinkRoutes = Router();

const DrinkController = require('../controllers/DrinkController');
const drinkController = new DrinkController();

drinkRoutes.post('/', drinkController.create);
drinkRoutes.put('/:id', drinkController.update);

module.exports = drinkRoutes;