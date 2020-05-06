let verify = require('./verifyUser');

module.exports = (app, Con) => {
    app.post('/createServer', verify, (req, res) => {
        let user_id = req.user.id;
        let { name, createdAt } = req.body;
        console.log(req.user)
        let newServer = [user_id, name, createdAt];

        Con.query('INSERT INTO Servers (user_id, name, createdAt) VALUES (?, ?, ?)', newServer,
            (err, results) => {
                if (err) { res.status(400).send('Server\'s name is used already').end() }
                res.send({
                    results: {
                        response: "Handeled create new server request",
                        server_id: results.insertId
                    }
                })
            })
    })
}