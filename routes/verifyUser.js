let jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.header('auth_token');

    if (!token) { res.status(401).send('access denied').end() }
    try {
        let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = verifiedUser;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token !')
    }
}