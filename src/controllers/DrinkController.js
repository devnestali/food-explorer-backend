class DrinkController {
    create(request, response) {
        return response.status(200).json({
            message: 'Controller funcionando'
        });
    };
};

module.exports = DrinkController;