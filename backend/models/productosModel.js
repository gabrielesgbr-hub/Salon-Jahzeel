const mongoose = require('mongoose')

const productoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'Por favor ingresa el nombre del producto']
    },
    sku:{
        type: String,
        required: [true, "Por favor ingresa el SKU del producto"]
    },
    marca:{
        type:String,
        requires: {true: 'Por favor ingresa la marca del producto'}
    },
    categoria:{
        type:String,
        required: [true, 'Por favor ingresa la categoría del producto']
    },
    stock:{
        type:Number,
        minimum: 0,
        validate: {
            validator: Number.isInteger,
            message: 'el valor ingresado debe de ser entero'
        },
        required: [true, 'Por favor ingresa el stock del producto']
    },
    precio:{
        type: mongoose.Types.Decimal128,
        minimum: 0,
        required: [true, 'Por favor ingresa el precio del producto'],
        set: v => {
            if (v === null || v === undefined) return v
            return mongoose.Types.Decimal128.fromString(parseFloat(v).toFixed(2))
        }
    },
    estaActivo:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true,
})

module.exports = mongoose.model('Producto', productoSchema)