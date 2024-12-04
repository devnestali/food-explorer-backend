const { Router } = require('express');

const drinkRoutes = Router();

const DrinkController = require('../controllers/DrinkController');
const drinkController = new DrinkController();

drinkRoutes.post('/', drinkController.create);

module.exports = drinkRoutes;