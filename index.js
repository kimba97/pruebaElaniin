'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')



mongoose.connect(config.db, (err, res)=>{
    if(err) throw err
    console.log('Conexion a BD completa')

    app.listen(config.port, () =>{
        console.log(`API REST ON http://localhost:${config.port}`)
    })
})
