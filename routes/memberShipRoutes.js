let { Router } = require('express');
let router = Router();
let verify = require('./verifyUser');
let Con = require('../db/connectToDB/connectToDB');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, newMemberEmail, message } = req.body;

    Con.query('SELECT name FROM Users WHERE email = (?)', [newMemberEmail], (err, result) => {
        if (err) { return res.status(400).send(err).end() }
        if (!result[0]) { return res.status(404).send('users with this email doesn\'t have an account unfortunately').end() }

    })


})

module.exports = router;