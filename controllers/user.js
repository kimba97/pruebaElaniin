'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')

function signUp (req, res){
    const user = new User({
        email: req.body.email,
        nombre: req.body.nombre,
        password: req.body.password
    })

    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })

}

function signIn (req, res) {
    User.find({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send({message: err})
        if(!user) return res.status(404).send({message: 'no existe el usuario'})

        req.user = user
        res.status(200).send({
            message: 'Inicio de Sesion correcto',
            token: service.createToken(user)
        })
    })
}

function obtenerUsers(req, res){
    User.find({},(err, users)=>{
        if(err) return res.status(500).send({message:'Error al realizar la peticion'})
        if(!users) return res.status(404).send({messsage: 'No existen Usuarios'})

        res.send(200, {users})
    })
}

module.exports = {signUp, signIn, obtenerUsers}