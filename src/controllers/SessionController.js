const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const { compare } = require('bcrypt');

const knex = require('../database');

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;

        const emptyfield = !email || !password;
        verifyData.userInfoExists(emptyfield);

        const user = await knex("users").where({ email }).first();
        verifyData.sessionEmailVerification({ user });
        
        const passwordMatch = await compare(password, user.password);
        verifyData.sessionPasswordVerification({ password: passwordMatch })
        

        return response.status(200).json(user);
    };
};

module.exports = SessionController;