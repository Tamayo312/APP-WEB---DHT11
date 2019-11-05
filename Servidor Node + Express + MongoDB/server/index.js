'use strict'

const mongoose = require('mongoose');
const server = require('./server');

const urlServer = 'mongodb://127.0.0.1:27017/medidas' //BD creada en mongoDB

const port = process.env.port || 8080;

mongoose.connect(urlServer, {useNewUrlParser: true}) //Conecta BD y server
    .then(() => {
        console.log('conectado al server de la BD con éxito')
        const servidor = server.listen(port, () => {
        console.log(`server escuchando en ${servidor.address().port}`);
    })
})

.catch(err => console.log(err))
