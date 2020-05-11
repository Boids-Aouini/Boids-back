let { Router } = require('express');
let router = Router();
let verify = require('./verifyUser');
let Con = require('../db/connectToDB/connectToDB');

router.post('/createMembership', verify, (req, res) => {
    let { serverName } = req.body
    Con.query('SELECT leader_id FROM Servers WHERE name = (?)', [serverName], (err, result) => {
        if (err) { return res.status(400).send(err).end() }

    })

})

module.exports = router;