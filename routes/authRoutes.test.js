let router = require('./authRoutes');
let request = require('supertest');
let server = 'http://localhost:4404';
let Con = require('../db/connectToDB/connectToDB');
describe('authentication routes testing', () => {

    afterAll(() => {
        Con.end(function (err) {
            if (err) {
                return console.log('error:' + err.message);
            }

        });
    })

    test('should retreive token once register', () => {
        return request(server)
            .post('/api/auth/register')
            .send({
                firstname: 'nameTest',
                lastname: 'lastnameTest',
                email: 'test@test.com',
                password: '123456789',
                birthDate: '2000-12-12',
                createdAt: '2020-05-05'
            })
            .then(res => {
                console.log(res.data)
                // expect(res.statusCode).toEqual(201)
                expect(res.data).toHaveProprety('resulsts')
            })


    })

})