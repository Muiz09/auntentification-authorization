const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/index')
const { handleClientError, handleServerError } = require('../helpers/errorHandler')

async function aunthentication(req, res, next) {
    try {
        const { access_token } = req.headers;
        if (!access_token) return handleClientError(res, 401, 'Unaunthenticated')

        const payload = verifyToken(access_token)

        let user = {}
        user = await User.findOne({ where: { id: payload.id } })
        if (!user) return handleClientError(res, 401, 'Unaunthenticated')

        req.additionalData = {
            userId: user.id,
            username: user.username,
            role: user.role
        }
        next()
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return handleClientError(res, 401, 'Invalid token');
        } else {
            return handleServerError(res);
        }
    }
}

module.exports = aunthentication