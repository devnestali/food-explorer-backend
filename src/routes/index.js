const { Router } = require('express');

const userRoutes = require('./User.routes');
const dishRoutes = require('./Dish.routes');
const dessertRoutes = require('./Dessert.routes');
const drinkRoutes = require('./Drink.routes');
const sessionRoutes = require('./Session.routes');

const authenticateUser = require('../middlewares/authenticateUser')

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dish', authenticateUser, dishRoutes);
routes.use('/dessert', dessertRoutes);
routes.use('/drink', drinkRoutes);
routes.use('/session', sessionRoutes);

module.exports = routes;

