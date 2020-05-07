let CryptoJS = require('crypto-js');
let jwt = require('jsonwebtoken');

module.exports = (app, Con) => {
    app.post('/register', async (req, response) => {
        let { firstname, lastname, email,
            password, createdAt, birthDate } = req.body;
        const cipherPass = CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET_KEY).toString(); // crypte password

        let newAcc = [firstname, lastname, email,
            cipherPass, birthDate, createdAt]; // new account data that is going to be stored in the db

        await Con.query(`INSERT INTO Users (firstname, lastname, email, password, birthDate, createdAt) VALUES (?, ?, ?, ?, ?, ?)`, newAcc,
            (err, result) => {
                if (err) { response.status(401).send('email is already used') } // send err in case there is one
                else {


                    let token = jwt.sign({ id: result.insertId }, process.env.TOKEN_SECRET_KEY); // make token
                    response.status(201).send({ // send successful response with token
                        results: {
                            token
                        }
                    })
                }

            })
    })

    app.post('/login', async (req, response) => {
        let { email, password } = req.body;
        console.log(req.body)
        await Con.query("SELECT id, password FROM Users WHERE email = (?)", email, (err, result) => {
            if (err) { response.status(400).send(err).end() } // send error in case there is one
            else {
                // console.log(!!result[0], result)
                if (!!result[0]) {
                    let encryptedPass = result[0].password;
                    let bytes = CryptoJS.AES.decrypt(encryptedPass, process.env.PASSWORD_SECRET_KEY);
                    let decryptedPass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8)); // decrypt password
                    if (password + "" === decryptedPass + "") {
                        let token = jwt.sign({ id: result[0].id }, process.env.TOKEN_SECRET_KEY); // make token if creds is valid
                        response.status(201).send({ // send response with the token
                            results: {
                                token
                            }
                        })
                    } else {
                        response.status(401).send('invalid password') // send invalid token in case that it is
                    }

                } else {
                    response.status(401).send('email is not found') // send email not found in case that it is
                }
            }
        })

    })
}