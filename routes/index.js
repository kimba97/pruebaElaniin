'user strict'

const express = require('express')
const api = express.Router()
const bodyParser = require('body-parser')
const useController = require('../controllers/user')
const auth = require('../middlewares/auth')

api.post('/signup', useController.signUp)
api.post('/signin', useController.signIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes Acceso'})
})
api.get('/users', useController.obtenerUsers)

module.exports = api