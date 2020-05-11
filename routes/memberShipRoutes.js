let { Router } = require('express');
router = Router(),
    verify = require('./verifyUser'),
    Con = require('../db/connectToDB/connectToDB'),
    nodemailer = require('nodemailer');

router.post('/createMembership', verify, (req, res) => {
    let { server_id, newMemberEmail, message } = req.body;

    Con.query('SELECT name FROM Users WHERE email = (?)', [newMemberEmail], (err, result) => {
        if (err) { return res.status(400).send(err).end() }
        if (!result[0]) { return res.status(404).send('users with this email doesn\'t have an account unfortunately').end() }
        let { name } = result[0];

    })

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.BOIDS_EMAIL,
            pass: process.env.BOIDS_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });


})

module.exports = router;