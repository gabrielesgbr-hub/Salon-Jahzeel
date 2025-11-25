const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    usuario:{
        type:String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    productos:{
        type: mongoose.Types.DocumentArray,
        required: [true, 'El pedido no puede estar vacío']
    },
    total:{
        type: mongoose.Types.Decimal128,
        required: [true]
    },
    metodo_de_pago:{
        type:String,
        required: [true, 'Por favor ingresa el método de pago']
    }
},{
    timestamps: true
}) 

module.exports = mongoose.model('Pedido', pedidoSchema)