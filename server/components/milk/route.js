
const router = require('express').Router()

const { getMilk, addMilk, deleteMilk, editMilk} = require('./controller')


router.get('/', getMilk)

router.post('/', addMilk)

router.delete('/:id', deleteMilk)

router.put('/:id', editMilk);


module.exports = router