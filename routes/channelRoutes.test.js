let request = require('supertest');
let server = 'http://localhost:4404';
let Con = require('../db/connectToDB/connectToDB');
let serverTestId = 1;
let tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTkwODE0OTcxfQ.OSEPmqL_dQP2L005PiF6wl636IIoxhCS_lt4x9sCBRw';

describe('Channels routes tests', () => {
    beforeAll(() => {
        Con.connect(function (err) { // connect to db
            if (err) throw err; // throw error in case there is one
            console.log("DB Connected!"); // run this line in case every thing went well 
        });
        // request(server)
        //     .post('/api/boidsServers/createServer')
        //     .send({
        //         name: 'test',
        //         createdAt: '2020-05-05'
        //     })
        //     .set({ auth_token: tokenTest })
        //     .then(res => {
        //         serverTestId = res.body.results.server.server_id
        //     })
    })

    afterAll(() => {
        Con.query('DELETE FROM Channels where name = (?)', ['test'], (err, result) => {
            if (err) throw err;
        })

        Con.end(function (err) {
            if (err) {
                return console.log('error:' + err.message);
            }

        });


    })

    test('insert new channel', () => {
        return request(server)
            .post('/api/channels/makeChannel')
            .send({
                server_id: serverTestId,
                name: 'test',
                createdAt: '2020-05-05'
            })
            .set({ 'auth_token': tokenTest })
            .then(res => {
                expect(res.statusCode).toEqual(201)
                expect(res.body.results).toHaveProperty('newChannel')
            })
    })

    test('retreive server\'s channels', () => {
        return request(server)
            .get('/api/channels/getChannels/' + serverTestId)
            .set({ 'auth_token': tokenTest })
            .then(res => {
                expect(res.statusCode).toEqual(200)
                expect(res.body.results).toHaveProperty('channels')
            })
    })
})