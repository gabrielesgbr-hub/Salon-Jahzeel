const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'Por favor ingresa el nombre del producto']
    },
    marca:{
        type:String,
        default: 'generico'
    },
    categoria:{
        type:String,
        required: [true, 'Por favor ingresa la categoría del producto']
    },
    cantidad_disponible:{
        type:Number,
        default: 0,
        validate: {
            validator: Number.isInteger,
            message: 'el valor ingresado debe de ser entero'
        }
    },
    precio:{
        type: mongoose.Types.Decimal128,
        required: [true, 'Por favor ingresa el precio del producto'],
        set: v => {
            if (v === null || v === undefined) return v
            return mongoose.Types.Decimal128.fromString(parseFloat(v).toFixed(2))
        }
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Producto', productoSchema)