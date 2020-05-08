let app = require('../index');
let request = require('supertest');
describe('authentication routes testing', () => {

    it('should retreive token once register', async () => {
        const res = await request(app)
            .post('/register')
            .send({
                firstname: 'nameTest',
                lastname: 'lastnameTest',
                email: 'test@test.com',
                password: '123456789',
                birthDate: '2000-12-12',
                createdAt: '2020-05-05'
            })

        console.log(res.body)
        expect(res.statusCode).toBeEqual(201)

    })

})