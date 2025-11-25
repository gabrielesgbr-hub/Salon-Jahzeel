const asyncHandler = require('express-async-handler')
const Producto = require('../models/productoModel')

const getProductos = asyncHandler(async(req, res)=>{
    const productos = await Producto.find()
    res.status(200).json(productos)
})

const createProductos = asyncHandler(async(req, res)=>{
    if(!req.body.)
})