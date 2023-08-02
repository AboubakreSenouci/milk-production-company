const router = require('express').Router()

const { getCows, addCow, deleteCow, editCow } = require('./controller')


router.get('/', getCows)

router.post('/', addCow)

router.delete('/:id', deleteCow)

router.put('/:id', editCow);


module.exports = router