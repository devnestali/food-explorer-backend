class DessertController {
    create(request, response) {
        return response.status(201).json({
            message: "requisição funcionando."
        });
    };
};

module.exports = DessertController;