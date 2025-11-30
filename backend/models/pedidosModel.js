const mongoose = require('mongoose')

const pedidoSchema = mongoose.Schema({
    usuario:{
        type:String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    productos:[{
        producto:{
            type: mongoose.Types.ObjectId,
            ref:"Producto",
            required: [true, 'El pedido no puede estar vacío']
        },
        cantidad:{
            type:Number,
            default: 1,
            validate: {
                validator: Number.isInteger,
                message: 'el valor ingresado debe de ser entero'
            }
        }
    }],
    total:{
        type: mongoose.Types.Decimal128,
        required: [true]
    },
    estado:{
        type: String,
        enum:['pendiente', 'cancelado', 'completado'],
        default: 'pendiente'
    }
},{
    timestamps: true,
}) 

module.exports = mongoose.model('Pedido', pedidoSchema)