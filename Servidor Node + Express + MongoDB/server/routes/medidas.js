'use strict'

const express = require('express');

const medidasControlador = require('../controladores/medidas');

let api = express.Router();

api.get('/temperatura', medidasControlador.obtenerTemperatura);
api.get('/humedad', medidasControlador.obtenerHumedad);
api.post('/medidas', medidasControlador.anadirMedidas); 

module.exports = api;