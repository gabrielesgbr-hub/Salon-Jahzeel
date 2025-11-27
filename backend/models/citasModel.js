const mongoose = require('mongoose')

const citaSchema = mongoose.Schema({
    cliente: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del cliente']
    },
    servicio: {
        type: String,
        required: [true, 'Por favor ingresa el servicio solicitado']
    },
    estilista: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'estilista', 
        required: [true, 'Por favor asigna un estilista']
    },
    fecha: {
        type: Date,
        required: [true, 'Por favor ingresa la fecha de la cita']
    },
    hora: {
        type: String,
        required: [true, 'Por favor ingresa la hora de la cita (debe tener el formato HH:MM (24 horas))'],
        validate: {
            validator: function(v) {
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(v)
            },
            message: 'La hora debe tener el formato HH:MM (24 horas)'
        }
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
        default: 'pendiente'
    },
    telefono: {
        type: String,
        required: [true, 'Por favor ingresa el número de teléfono del cliente'],
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v)  
            },
            message: 'El teléfono debe contener 10 dígitos'
        }
    },
    notas: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cita', citaSchema)