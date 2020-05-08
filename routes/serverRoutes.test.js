let request = require('supertest');
let tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTU4ODkxODk2OX0.eGAe633XYdu3FrQQhAO_5P7UNWPfjQZ-t6vGqg3M_Pg';
let server = 'http://localhost:4404';
let Con = require('../db/connectToDB/connectToDB');

describe('Servers routes tests', () => {

    afterAll(() => {
        Con.query('DELETE FROM Channels', (err, result) => {
            if (err) throw err
            Con.query('DELETE FROM Servers', (err, results) => {
                if (err) throw err;
            })
        })
        Con.end(function (err) {
            if (err) {
                return console.log('error:' + err.message);
            }

        });
    })

    test('should create new Server', () => {
        return request(server)
            .post('/api/boidsServers/createServer')
            .send({
                name: 'testserver',
                createdAt: '2020-05-05'
            })
            .set({ 'auth_token': tokenTest })
            .then(res => {
                expect(res.statusCode).toBe(201)
                expect(res.body).toHaveProperty('results')
            })
    })
})