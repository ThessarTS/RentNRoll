const router = require('express').Router()
const user = require('./userRoute')
const vehicle = require('./vehicleRoute')


router.use('/', user)
router.use('/vehicles', vehicle)

module.exports = router