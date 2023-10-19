const router = require('express').Router()

const UserController = require('../controllers/userController')

router.post('/otp')
router.post('/login')
router.post('/register')
router.post('/google-login')
router.get('/profiles')
router.post('/profiles')
router.put('/profiles/:id')
router.delete('/profiles/:id')
router.post('/midtrans-token')


module.exports = router