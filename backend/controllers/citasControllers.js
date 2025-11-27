const asyncHandler = require('express-async-handler')
const Cita = require('../models/citasModels')

const createCita = asyncHandler(async (req, res) => {
    const { cliente, servicio, fecha, hora, telefono, notas } = req.body

    if (!cliente || !servicio || !fecha || !hora || !telefono) {
        res.status(400)
        throw new Error('Faltan datos obligatorios para la cita')
    }

    const cita = await Cita.create({
        cliente,
        servicio,
        fecha,
        hora,
        telefono,
        notas
    })

    if (cita) {
        res.status(201).json(cita)
    } else {
        res.status(400)
        throw new Error('No se pudo crear la cita')
    }
})

const getCitas = asyncHandler(async (req, res) => {
    if (!req.usuario.esAdmin) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    const citas = await Cita.find()
    res.status(200).json(citas)
})

const getCitaPorId = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id)

    if (!cita) {
        res.status(404)
        throw new Error('Cita no encontrada')
    }

    if (!req.usuario.esAdmin) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    res.status(200).json(cita)
})


const updateCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id)

    if (!cita) {
        res.status(404)
        throw new Error('Cita no encontrada')
    }

    if (!req.usuario.esAdmin) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    const citaActualizada = await Cita.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json(citaActualizada)
})

const deleteCita = asyncHandler(async (req, res) => {
    const cita = await Cita.findById(req.params.id)

    if (!cita) {
        res.status(404)
        throw new Error('Cita no encontrada')
    }

    if (!req.usuario.esAdmin) {
        res.status(401)
        throw new Error('Acceso no autorizado')
    }

    await cita.deleteOne()

    res.status(200).json({ id: req.params.id })
})

module.exports = {
    createCita,
    getCitas,
    getCitaPorId,
    updateCita,
    deleteCita
}