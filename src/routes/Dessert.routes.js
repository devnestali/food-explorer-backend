const { Router } = require('express');

const dessertRoutes = Router();

const DessertController = require('../controllers/DessertController');
const dessertController = new DessertController();

const multer = require('multer');
const multerConfig = require('../configs/multerConfig');
const upload = multer(multerConfig.MULTER);

dessertRoutes.post('/', dessertController.create);
dessertRoutes.put('/:id', dessertController.update);
dessertRoutes.get('/', dessertController.index);
dessertRoutes.get('/:id', dessertController.show);
dessertRoutes.delete('/:id', dessertController.delete);
dessertRoutes.patch('/file/:id', upload.single('file'), dessertController.updateImage);

module.exports = dessertRoutes;