const AuthController = require('../controllers/authController')
const middlewares = require('../middlewares')

module.exports = (app) => {
    app.post('/api/user/register', AuthController.register)
    app.post('/api/user/login', AuthController.login)
    app.get('/api/user/auth', middlewares.auth, AuthController.authUser)
    app.get('/api/user', middlewares.auth, (req,res) => {
        res.json({message:'User root'});
    });
}