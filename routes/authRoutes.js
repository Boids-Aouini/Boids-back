let CryptoJS = require('crypto-js');

module.exports = (app, Con) => {
    app.post('/register', async (req, response) => {
        let { firstname, lastname, email,
            password, longitude, latitude,
            heighAccuracy, createdAt, birthDate } = req.body;
        const cipherPass = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString();

        let newAcc = [firstname, lastname, email,
            cipherPass, birthDate, longitude, latitude,
            heighAccuracy, createdAt];

        await Con.query(`INSERT INTO Users (firstname, lastname, email, password, birthDate, longitude, latitude, heighAccuracy, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, newAcc,
            (err, result, fields) => {
                if (err) { response.staus(401).send('email is already used') }
                else {

                    console.log(result.insertId)
                }

            })
    })
}