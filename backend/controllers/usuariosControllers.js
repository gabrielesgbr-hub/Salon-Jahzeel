const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Usuario = require ('../models/usuariosModel')

const login = asyncHandler(async(req,res) => {
    const {email, password} = req.body

    //verificar que el usuario exista
    const usuario = await Usuario.findOne({email})

    //Si el usuario existe verifico el hash
    if (usuario && (await bcrypt.compare(password, usuario.password))){
        res.status(200).json({
            _id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarToken(usuario.id)
        })
    }
})

const register = asyncHandler(async(req,res) => {
    //desestructurar el body
    const {nombre, email, password} = req.body
    //verificamos que se pasen todos los campos
    if (!nombre || !email || !password){
        res.status(400)
        throw new Error('Faltan datos')
    }
    //verificamos que ese usuario no existe y si no existe guardarlo
    const usuarioExists = await Usuario.findOne({email})
    if (usuarioExists){
        res.status(400)
        throw new Error('Ese usuario ya existe')
    } else{
        //hash al password
        const salt = await bcrypt.genSalt(10)
        const passwordHashed = await bcrypt.hash(password, salt)
        
        //crear el usuario
        const usuario = await Usuario.create({
            nombre,     //nombre:nombre
            email,      //email:email
            password: passwordHashed
        })

        //Si el usuario se creo correctamente lo muestro
        if (usuario){
            res.status(201).json({
                _id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
            })
        } else{
            res.status(400)
            throw new Error ('No se pudieron guardar los datos')
        }
    }
})
const data = asyncHandler(async(req,res) => {
    res.status(200).json(req.usuario)
})

const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    login, register, data
}