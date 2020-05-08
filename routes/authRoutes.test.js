let router = require('./authRoutes');
let request = require('supertest');
describe('authentication routes testing', () => {

    it('should retreive token once register', async () => {
        request(router)
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
                console.log(res.body)
                console.log(res)
            })



    })

})