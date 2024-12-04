const { Router } = require('express');

const drinkRoutes = Router();

const DrinkController = require('../controllers/DrinkController');
const drinkController = new DrinkController();

drinkRoutes.post('/', drinkController.create);
drinkRoutes.put('/:id', drinkController.update);
drinkRoutes.get('/', drinkController.index);
drinkRoutes.get('/:id', drinkController.show);

module.exports = drinkRoutes;