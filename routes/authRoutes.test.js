let router = require('./authRoutes');
let request = require('supertest');
let server = 'localhost:4404'
describe('authentication routes testing', () => {

    it('should retreive token once register', async () => {
        let res = await request(router)
            .post('/api/auth/register')
            .send({
                firstname: 'nameTest',
                lastname: 'lastnameTest',
                email: 'test@test.com',
                password: '123456789',
                birthDate: '2000-12-12',
                createdAt: '2020-05-05'
            })

        expect(res.statusCode).toEqual(201)

        expect(res.body.results).toHaveProprety('token')





    })

})