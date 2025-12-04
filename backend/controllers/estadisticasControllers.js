const asyncHandler = require('express-async-handler')
const Cita = require('../models/citasModel')
const Pedido = require('../models/pedidosModel')
const Producto = require('../models/productosModel')
const Estilista = require('../models/estilistaModel')

const getProductosStats = asyncHandler(async(req, res) => {
    const productosStats = await Pedido.aggregate([
        {$unwind: "$productos"},
        {
            $group:{
                _id: "$productos.producto",
                totalVendido: {$sum: "$productos.cantidad"}

            }
        },
        { $sort: { totalVendido: -1}},
        {
            $lookup:{
                from: "productos",
                localField: "_id",
                foreignField: "_id",
                as: "info"
            }
        },
        { $unwind: "$info"},
        {
            $project: {
                _id: 1,
                nombre: "$info.nombre",
                totalVendido: 1
            }
        }
    ])

    const top5Productos = productosStats.slice(0,5)
    const bottom5Productos = productosStats.slice(-5).reverse()

    res.status(200).json({
        masVendidos: top5Productos,
        menosVendidos: bottom5Productos
    })
})

const getEstilistasStats = asyncHandler(async(req, res) => {
    const estilistasStats = await Cita.aggregate([
        {
            $group: {
                _id: "$estilista",
                totalCitas: { $sum: 1}
            }
        },
        { $sort: { totalCitas: -1}},
        {
            $lookup: {
                from: "estilistas",
                localField: "_id",
                foreignField: "_id",
                as: "info"
            }
        },
        { $unwind: "$info"},
        {
            $project: {
                nombre : "$info.nombre",
                totalCitas: 1
            }
        }
    ])

    const top3Estilistas = estilistasStats.slice(0,3)
    const bottom3Estilistas = estilistasStats.slice(-3).reverse()

    res.status(200).json({
        masSolicitados: top3Estilistas,
        menosSolicitados: bottom3Estilistas
    })
})

const getServiciosStats = asyncHandler(async(req, res) => {
    const serviciosStats = await Cita.aggregate([
        {
            $group: {
                _id: "$servicio",
                totalSolicitudes: { $sum: 1}
            }
        },
        { $sort: {totalSolicitudes: -1}}
    ])

    const top3Servicios = serviciosStats.slice(0,3)
    const bottom3Servicios = serviciosStats.slice(-3).reverse()

    res.status(200).json({
        masSolicitados: top3Servicios,
        menosSolicitados: bottom3Servicios
    })
})

const getEstadisticas = asyncHandler(async(req, res) => {

    const productosStats = await Pedido.aggregate([
        {$unwind: "$productos"},
        {
            $group:{
                _id: "$productos.producto",
                totalVendido: {$sum: "$productos.cantidad"}

            }
        },
        { $sort: { totalVendido: -1}},
        {
            $lookup:{
                from: "productos",
                localField: "_id",
                foreignField: "_id",
                as: "info"
            }
        },
        { $unwind: "$info"},
        {
            $project: {
                _id: 1,
                nombre: "$info.nombre",
                totalVendido: 1
            }
        }
    ])

    const top5Productos = productosStats.slice(0,5)
    const bottom5Productos = productosStats.slice(-5).reverse()

    const serviciosStats = await Cita.aggregate([
        {
            $group: {
                _id: "$servicio",
                totalSolicitudes: { $sum: 1}
            }
        },
        { $sort: {totalSolicitudes: -1}}
    ])

    const top3Servicios = serviciosStats.slice(0,3)
    const bottom3Servicios = serviciosStats.slice(-3).reverse()

    const estilistasStats = await Cita.aggregate([
        {
            $group: {
                _id: "$estilista",
                totalCitas: { $sum: 1}
            }
        },
        { $sort: { totalCitas: -1}},
        {
            $lookup: {
                from: "estilistas",
                localField: "_id",
                foreignField: "_id",
                as: "info"
            }
        },
        { $unwind: "$info"},
        {
            $project: {
                nombre : "$info.nombre",
                totalCitas: 1
            }
        }
    ])

    const top3Estilistas = estilistasStats.slice(0,3)
    const bottom3Estilistas = estilistasStats.slice(-3).reverse()

    res.status(200).json({
        productos: {
            masVendidos: top5Productos,
            menosVendidos: bottom5Productos
        },
        servicios: {
            masSolicitados: top3Servicios,
            menosSolicitados: bottom3Servicios
        },
        estilistas: {
            masSolicitados: top3Estilistas,
            menosSolicitados: bottom3Estilistas
        }
    })
})

module.exports = {
    getEstadisticas,
    getProductosStats,
    getEstilistasStats,
    getServiciosStats
}