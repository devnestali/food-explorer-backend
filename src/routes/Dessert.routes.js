const { Router } = require('express');

const dessertRoutes = Router();

const DessertController = require('../controllers/DessertController');
const dessertController = new DessertController();

dessertRoutes.post('/', dessertController.create);

module.exports = dessertRoutes;