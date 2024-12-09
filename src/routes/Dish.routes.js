const { Router } = require('express');

const dishRoutes = Router();

const DishController = require('../controllers/DishController');
const dishController = new DishController();

const multer = require('multer');
const multerConfig = require('../configs/multerConfig');
const upload = multer(multerConfig.MULTER);

dishRoutes.post('/', dishController.create);
dishRoutes.put('/:id', dishController.udpate); 
dishRoutes.get('/', dishController.index); 
dishRoutes.get('/:id', dishController.show); 
dishRoutes.delete('/:id', dishController.delete); 
dishRoutes.patch('/file', upload.single('file'), (request, response) => {
    console.log(request.file.filename);
    response.status(200).json();
});

module.exports = dishRoutes;