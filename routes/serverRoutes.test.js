let request = require('supertest');
let tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTU4ODkxODk2OX0.eGAe633XYdu3FrQQhAO_5P7UNWPfjQZ-t6vGqg3M_Pg';
let server = 'http://localhost:4404';
let Con = require('../db/connectToDB/connectToDB');

describe('authentication routes testing', () => {

    beforeAll(() => {
        Con.connect(function (err) { // connect to db
            if (err) throw err; // throw error in case there is one
            console.log("DB Connected!"); // run this line in case every thing went well 
        });

    })

    afterAll(() => {
        Con.end(function (err) {
            if (err) {
                return console.log('error:' + err.message);
            }

        });
    })

    test('should create new Server', () => {
        return request(server)
            .post('/api/createServer')
            .send({
                name: 'testserver',
                createdAt: '2020-05-05'
            })
            .set('atuh_token', tokenTest)
            .then(res => {
                expect(res.body).toHaveProperty('results')
                expect(res.statusCode).toBe(201)
            })
    })
})