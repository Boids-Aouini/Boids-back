let verify = require('./verifyUser');

module.exports = (app, Con) => {
    app.post('/createServer', verify, (req, res) => {
        let { id } = req.user;
        let { name, createdAt } = req.body;
    })
}