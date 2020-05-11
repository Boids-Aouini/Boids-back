let { Router } = require('express');
let router = Router();
let verify = require('./verifyUser');
let Con = require('../db/connectToDB/connectToDB');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, newMemberEmail, message } = req.body;

    Con.query('SELECT name FROM Users WHERE email = (?)', [newMemberEmail], (err, result) => {
        if (err) { return res.status(400).send(err).end() }
    })


})

module.exports = router;