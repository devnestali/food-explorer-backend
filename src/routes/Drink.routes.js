const { Router } = require('express');

const drinkRoutes = Router();

const DrinkController = require('../controllers/DrinkController');
const drinkController = new DrinkController();

const multer = require('multer');
const multerConfig = require('../configs/multerConfig');
const upload = multer(multerConfig.MULTER);

drinkRoutes.post('/', drinkController.create);
drinkRoutes.put('/:id', drinkController.update);
drinkRoutes.get('/', drinkController.index);
drinkRoutes.get('/:id', drinkController.show);
drinkRoutes.delete('/:id', drinkController.delete);
drinkRoutes.patch('/file/:id', upload.single('file'), drinkController.updateImage);

module.exports = drinkRoutes;