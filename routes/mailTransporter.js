let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({ // make transporter
    service: 'gmail',
    auth: {
        user: process.env.BOIDS_MAIL,
        pass: process.env.BOIDS_PASS // naturally, replace both with your real credentials or an application-specific password
    },
    tls: { // run locally
        rejectUnauthorized: false
    }
});

module.exports = transporter;