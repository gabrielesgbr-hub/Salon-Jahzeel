const express = require('express')
const router = express.Router()
const {getEstadisticas, getProductosStats, getEstilistasStats, getServiciosStats} = require('../controllers/estadisticasControllers')
const {protect} = require('../middleware/authMiddleware')

const adminAuth = (req,res,next) =>{
    if (req.usuario && req.usuario.esAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('No autorizado como admin')
    }
}

router.get('/', protect, adminAuth, getEstadisticas)
router.get('/productos', protect, adminAuth, getProductosStats)
router.get('/estilistas', protect, adminAuth, getEstilistasStats)
router.get('/servicios', protect, adminAuth, getServiciosStats)

module.exports = router


