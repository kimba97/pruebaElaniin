'use strict'


const services = require('../services')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'No tienes autorizacion'})
    }
    
    const token = req.headers.authorization.split(" ")[1]
    services.decodeToken(token)
        .then(response =>{
            req.user = response
            next()
            console.log('then')
        })
        .catch(response => {
            console.log('catch'+response.status)
            res.status(response.status).send({message: response.message})
        })
}

module.exports = isAuth