const AppError = require("./AppError");

class VerifyData {
    usersInfoExists(emptyField) {
        if (emptyField) {
            throw new AppError('Preencha todos os campos, por favor.');
        }
    }

    userAlreadyExists(email) {
        if (email) {
            throw new AppError('Já existe um usuário com este e-mail.');
        }
    }
};

module.exports = VerifyData;