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

    dishInfoExists(emptyFields) {
        if(emptyFields) {
            throw new AppError('É necessário preencher os campos de título e descrição.');
        }
    }

    ingredientsInfoExists(emptyIngredients) {
        if(emptyIngredients) {
            throw new AppError('É preciso ter pelo menos 1 ingrediente');
        }
    }

    priceIsEmptyAndNotANumber(emptyPrice) {
        if(emptyPrice) {
            throw new AppError('O preço precisa ser um número maior que 0');
        }
    }
};

module.exports = VerifyData;