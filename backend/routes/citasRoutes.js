const express = require('express')
const router = express.Router()
const {createCita, getCitas, getCitaPorId, updateCita, deleteCita} = require('../controllers/citasControllers')
const {protect} = require('../middleware/authMiddleware')

router.post('/', createCita)
router.get('/', getCitas)
router.get('/:id', getCitaPorId)
router.put('/:id', updateCita)
router.delete('/:id', deleteCita)

module.exports = router