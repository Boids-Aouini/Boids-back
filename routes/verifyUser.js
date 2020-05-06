let jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token = req.header('auth_token');

    if (!token) { res.status(401).send('access denied').end() } // send error if there is not token
    try {
        let verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET_KEY); // verify token
        req.user = verifiedUser; // set req.user to verified user 
        next(); // run the next middleware
    } catch (err) {
        res.status(400).send('Invalid Token !') // send error if token is invalid
    }
}