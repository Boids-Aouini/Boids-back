let verify = require('./verifyUser');

module.exports = (app, Con) => {
    app.post('/createServer', verify, (req, res) => {
        let user_id = req.user.id; // retreive user id from verify middleware
        let { name, createdAt } = req.body;

        let newServer = [user_id, name, createdAt]; // set new server data for query

        Con.query('INSERT INTO Servers (leader_id, name, createdAt) VALUES (?, ?, ?)', newServer, // make insertion query
            (err, ServerResult) => { // callback once done with query
                if (err) { res.status(400).send('Server\'s name is used already').end() } // send error in case there is one
                Con.query('INSERT INTO Channels (server_id, name, createdAt) VALUES', [ServerResult.insertId, 'Announcement', createdAt],

                    (err, resultChannel) => {
                        if (err) { res.status(400).send(err).end() }
                        res.send({ // send successful response
                            results: {
                                response: "Handeled create new server request",
                                server: result.insertId
                            }
                        })
                    })
            })
    })
}