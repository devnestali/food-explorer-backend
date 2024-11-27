const knex = require('../database');


const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

class UserController {
    create(request, response) {
        const { username, email, password } = request.body;

        verifyData.usersInfoExists({ username, email, password });

        return response.status(200).json({
            username,
            email,
            password
        }); 
    };
};   

module.exports = UserController;