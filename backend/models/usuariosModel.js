const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: [true, 'Por favor ingresa tu nombre']
    },
    email:{
        type: String,
        required: [true, 'Por favor ingresa tu email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Por favor ingresa tu contraseña']
    },
    esAdmin:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Usuario', usuarioSchema)