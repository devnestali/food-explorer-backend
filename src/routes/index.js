const { Router } = require('express');

const userRoutes = require('./User.routes');
const dishRoutes = require('./Dish.routes');
const dessertRoutes = require('./Dessert.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dish', dishRoutes);
routes.use('/dessert', dessertRoutes);

module.exports = routes;

