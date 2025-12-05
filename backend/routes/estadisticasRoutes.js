const express = require('express')
const router = express.Router()
const {getProductosStats, getEstilistasStats, getServiciosStats} = require('../controllers/estadisticasControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/productos', protect, getProductosStats)
router.get('/estilistas', protect, getEstilistasStats)
router.get('/servicios', protect, getServiciosStats)

module.exports = router


