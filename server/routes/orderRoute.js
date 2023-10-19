const router = require('express').Router()

router.get('/')
router.get('/:id')
router.post('/')
router.patch('/:id')
router.delete('/:id')
router.get('/vehicle/:vehicleid')



module.exports = router
