let request = require('supertest');
let tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkwODE0OTcxfQ.OSEPmqL_dQP2L005PiF6wl636IIoxhCS_lt4x9sCBRw';
let server = 'http://localhost:4404';
let Con = require('../db/connectToDB/connectToDB');

describe('Servers routes tests', () => {

    beforeAll(() => {
        Con.connect(function (err) { // connect to db
            if (err) throw err; // throw error in case there is one
            console.log("DB Connected!"); // run this line in case every thing went well 
        });
    })

    afterAll(() => {
        Con.query('DELETE FROM Channels', (err, result) => {
            if (err) throw err
        })
        Con.query('DELETE FROM Servers WHERE name = (?)', ['testserver'], (err, results) => {
            if (err) throw err;
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
                expect(res.body.results).toHaveProperty('server')
                expect(res.body.results).toHaveProperty('response')
            })
    })

    test('should retreive server', () => {
        return request(server)
            .get('/api/boidsServers/serversAsLeader')
            .set({ 'auth_token': tokenTest })
            .then(res => {
                expect(res.statusCode).toBe(200)
                expect(res.body).toHaveProperty('results')
                expect(res.body.results).toHaveProperty('servers')
                expect(res.body.results).toHaveProperty('response')
            })
    })
})