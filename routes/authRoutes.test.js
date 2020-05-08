let app = require('../index');
let request = require('supertest');

test('should retreive token once register', function () {
    const response = request(app);
    response.post('/register')
        .send({
            firstname: 'nameTest',
            lastname: 'lastnameTest',
            email: 'test@test.com',
            password: '123456789',
            birthDate: '2000-12-12',
            createdAt: '2020-05-05'
        })
    console.log(response)

})
