const AppError = require("./AppError");

class VerifyData {
    userInfoExists(emptyField) {
        if (emptyField) {
            throw new AppError('Preencha todos os campos, por favor.');
        }
    }

    userAlreadyExists(email) {
        if (email) {
            throw new AppError('Já existe um usuário com este e-mail.', 401);
        }
    }

    infoExists(title, description) {
        const emptyField = !title || !description;
        
        if(emptyField) {
            throw new AppError('É necessário preencher os campos de título e descrição.');
        }
    }

    ingredientsInfoExists(ingredients) {
        const emptyIngredients = ingredients.length <= 0 || !ingredients.some(Boolean);
        
        if(emptyIngredients) {
            throw new AppError('É preciso ter pelo menos 1 ingrediente');
        }
    }

    priceIsEmptyAndNotANumber(price) {
        const emptyPrice = price <= 0 || isNaN(price);
        
        if(emptyPrice) {
            throw new AppError('O preço precisa ser um número maior que 0');
        }
    }
};

module.exports = VerifyData;