const knex = require('../database');

class UserController {
    async create(request, response) {
        const { username, email, password} = request.body;

        return response.status(200).json({
            username,
            email,
            password
        }); 
    };
};   

module.exports = UserController;