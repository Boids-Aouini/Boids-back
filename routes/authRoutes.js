let CryptoJS = require('crypto-js');

module.exports = (app, Con) => {
    app.post('/register', async (req, res) => {
        let { firstname, lastname, email,
            password, longitude, latitude,
            heighAccuracy, createdAt } = req.body;

        const cipherPass = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY);


    })
}