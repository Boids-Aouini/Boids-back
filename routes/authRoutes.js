

module.exports = (app) => {
    app.post('/register', async (req, res) => {
        console.log(req.body);
    })
}