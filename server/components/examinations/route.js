const router = require('express').Router()

const { getExams, addExams, deleteCow, editCow} = require('./controller')


router.get('/', getExams)

router.post('/', addExams)

router.delete('/:id', deleteCow)

router.put('/:id', editCow);


module.exports = router