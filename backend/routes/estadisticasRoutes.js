const express = require('express')
const router = express.Router()
const {getEstadisticas} = require('../controllers/estadisticasControllers')
const {protect} = require('../middleware/authMiddleware')

router.get('/', protect, (req,res,next) =>{
    if (req.usuario && req.usuario.esAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('No autorizado como admin')
    }
}, getEstadisticas)

module.exports = router