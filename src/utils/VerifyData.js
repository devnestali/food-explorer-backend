const AppError = require("./AppError");

class VerifyData {
    usersInfoExists({ username, email, password}) {
        if(!username || !email || !password) {
            throw new AppError('Preencha todos os campos, por favor.')
        }

        return { username, email, password };
    };
};

module.exports = VerifyData;