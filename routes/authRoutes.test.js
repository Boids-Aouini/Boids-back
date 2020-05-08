let router = require('./authRoutes');
let request = require('supertest');
let server = 'http://localhost:4404';
let Con = require('../db/connectToDB/connectToDB');

describe('authentication routes testing', () => {

    afterAll(() => {
        Con.query('DELETE FROM Users where email = (?)', ['test@test.com'], (err, result) => {
            if (err) throw err;
        })

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
                expect(res.statusCode).toEqual(201)
                expect(res.body).toHaveProperty('results')
            })


    })

    test('should retreive token once login', () => {
        return request(server)
            .post('/api/auth/login')
            .send({
                email: 'test@test.com',
                password: '123456789'
            })
            .then(res => {
                expect(res.statusCode).toEqual(201)
                expect(res.body).toHaveProperty('results')
            })


    })

})