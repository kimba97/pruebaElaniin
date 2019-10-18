'user strict'

const express = require('express')
const api = express.Router()
const bodyParser = require('body-parser')
const useController = require('../controllers/user')
const User = require('../models/user')
const auth = require('../middlewares/auth')

api.post('/signup', useController.signUp)
api.post('/signin', useController.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes Acceso'})
})
api.get('/users', useController.obtenerUsers)
api.delete('/user/:userId', (req, res) =>{
    let userId = req.params.userId
    User.findById(userId, (err, user) => {
        if(err) res.status(500).send({message: `Error al borrar el user: ${err}`})

        user.remove(err => {
            if(err) return res.status(500).send({message: `Error al borrar el user: ${err}`})
            return res.status(200).send({message: 'User Borrado Correctamente'})
        })
    })
})

api.put('/user/:userId', (req, res) =>{
    let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId, update, (err, productUpdated) => {
        if(err) res.status(500).send({message: `Error al actualizar el user: ${err}`})

        res.status(200).send({message: 'User actualizado correctamente'})
    })
})



module.exports = api