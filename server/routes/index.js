const router = require('express').Router()
const user = require('./userRoute')
const vehicle = require('./vehicleRoute')
const order = require('./orderRoute')
const review = require('./reviewRoute')


router.use('/', user)
router.use('/vehicles', vehicle)
router.use('/orders', order)
router.use('/reviews', review)

module.exports = router