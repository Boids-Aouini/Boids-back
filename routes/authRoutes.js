let CryptoJS = require('crypto-js');
let jwt = require('jsonwebtoken');

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
            (err, result) => {
                if (err) { response.status(401).send('email is already used') }
                else {

                    let token = jwt.sign({ id: result.insertId }, process.env.TOKEN_SECRET_KEY);
                    response.status(201).send({
                        results: {
                            token
                        }
                    })
                }

            })
    })

    app.post('/login', async (req, res) => {
        let { email, password } = req.body;

        await Con.query("SELECT id, password FROM Users WHERE email = (?)", [email], (err, result) => {
            if (err) { throw err }
            else {

                if (!!result[0]) {
                    let encryptedPass = result[0].password;
                    var bytes = CryptoJS.AES.decrypt(encryptedPass, process.env.PASSWORD_SECRET_KEY);
                    var decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    if (password === decryptedPass) {
                        let token = jwt.sign({ id: result[0].id }, process.env.TOKEN_SECRET_KEY);
                        response.status(201).send({
                            results: {
                                token
                            }
                        })
                    }

                } else {
                    res.status(401).send('email is not found')
                }
                console.log(result)
            }
        })

    })
}