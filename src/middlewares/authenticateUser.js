const authConfig = require('../configs/auth');

const { verify } = require('jsonwebtoken');

const VerifyData = require('../utils/VerifyData');
const verifyData = new VerifyData();

function authenticateUser(request, response, next) {
    const authHeader = request.headers.authorization;

    verifyData.tokenVerification({ token: authHeader});

    const [, token] = authHeader.split(' ');
    
    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);

        request.user = {
            id: Number(user_id)
        };

        next();
    } catch (err) {
        return response.status(401).json({
            err,
            message: 'JWT Token inválido',
        });
    };
};

module.exports = authenticateUser;