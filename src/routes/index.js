const { Router } = require('express');

const userRoutes = require('./User.routes');
const dishRoutes = require('./Dish.routes');

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dish', dishRoutes);

module.exports = routes;

