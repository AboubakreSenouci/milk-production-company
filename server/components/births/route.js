
const router = require('express').Router()

const { getBriths, addBirth, deleteBirth, editBirth } = require('./controller')


router.get('/', getBriths)

router.post('/', addBirth)

router.delete('/:id', deleteBirth)

router.put('/:id', editBirth);


module.exports = router