const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const cors = require('cors')
const {errorHandler} = require('./middleware/errorMiddleware')

const port = process.env.PORT || 5000

connectDB() 

const app = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/usuarios', require('./routes/usuariosRoutes'))

app.use(errorHandler)

app.listen(port, ()=>console.log(`Servidor Iniciado en el puerto: ${port}`))
