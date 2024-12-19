const { Router } = require('express');

const dishRoutes = Router();

const DishController = require('../controllers/DishController');
const dishController = new DishController();

const multer = require('multer');
const multerConfig = require('../configs/multerConfig');
const upload = multer(multerConfig.MULTER);

dishRoutes.post('/', dishController.create);
dishRoutes.put('/:id', dishController.update); 
dishRoutes.get('/', dishController.index); 
dishRoutes.get('/:id', dishController.show); 
dishRoutes.delete('/:id', dishController.delete); 
dishRoutes.patch('/file/:id', upload.single('file'), dishController.updateImage);

module.exports = dishRoutes;