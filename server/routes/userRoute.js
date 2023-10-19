const router = require('express').Router()

router.post('/login')
router.post('/register')
router.post('/google-login')
router.get('/profiles/:id')
router.post('/profiles')
router.put('/profiles/:id')
router.delete('/profiles/:id')
router.post('/midtrans-token')


module.exports = router