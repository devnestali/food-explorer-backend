const knex = require('../database');
const bcrypt = require('bcrypt');

const VerifyData = require('../utils/VerifyData.js');
const verifyData = new VerifyData();

class UserController {
    async create(request, response) {
        const { username, email, password } = request.body;

        const emptyField = !username || !email || !password;
        
        verifyData.usersInfoExists(emptyField);        

        const emailExists = await knex("users").where({ email }).first();
        
        verifyData.userAlreadyExists(emailExists);

        
        const formattedUsername = username.trim();
        const formattedEmail = email.trim();
        const hashedPassword = bcrypt.hashSync(password, 8);

        await knex("users").insert({
            username: formattedUsername,
            email: formattedEmail,
            password: hashedPassword
        });

        return response.status(200).json({
            username: formattedUsername,
            email: formattedEmail,
        }); 
    };
};   

module.exports = UserController;