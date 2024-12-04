const { Router } = require('express');

const drinkRoutes = Router();

const DrinkController = require('../controllers/DrinkController');
const drinkController = new DrinkController();

drinkRoutes.post('/', drinkController.create);
drinkRoutes.put('/:id', drinkController.update);
drinkRoutes.get('/', drinkController.index);

module.exports = drinkRoutes;