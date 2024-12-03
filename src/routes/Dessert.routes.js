const { Router } = require('express');

const dessertRoutes = Router();

const DessertController = require('../controllers/DessertController');
const dessertController = new DessertController();

dessertRoutes.post('/', dessertController.create);
dessertRoutes.put('/:id', dessertController.update);
dessertRoutes.get('/', dessertController.index);
dessertRoutes.get('/:id', dessertController.show);
dessertRoutes.delete('/:id', dessertController.delete);

module.exports = dessertRoutes;