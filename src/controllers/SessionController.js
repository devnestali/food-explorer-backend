const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

const { compare } = require('bcrypt');

const knex = require('../database');

const { sign } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

class SessionController {
    async create(request, response) {
        const { email, password } = request.body;
        const { expiresIn, secret } = authConfig.jwt;

        const emptyfield = !email || !password;
        verifyData.userInfoExists(emptyfield);

        const user = await knex("users").where({ email }).first();
        verifyData.sessionEmailVerification({ user });
        
        const passwordMatch = await compare(password, user.password);
        verifyData.sessionPasswordVerification({ password: passwordMatch })
        
        const payload = { id: user.id };

        const token = sign(payload, secret, { expiresIn });
        
        const authorizedUser = {
            userInfo: {
                ...user,
            },
            token
        };

        return response.status(200).json(authorizedUser);
    };
};

module.exports = SessionController;