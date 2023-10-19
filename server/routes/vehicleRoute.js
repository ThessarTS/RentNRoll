const router = require('express').Router()

const VehicleController = require('../controllers/vehicleController')

router.get('/')
router.get('/:id')
router.post('/')
router.put('/:id')
router.delete('/:id')


module.exports = router
