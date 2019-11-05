'use strict'

const temp = require('../modelos/temp');
const hum = require('../modelos/humedad');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// Create a MQTT Client
var mqtt = require('mqtt');

// Create a client connection to CloudMQTT for live data
var options = {
    port: mqtt_port,
    host: 'mqtt_host',
    clientId: 'ClientMQTT' + Math.random().toString(16).substr(2, 8),
    username: 'mqtt_username',
    password: 'mqtt_password',
    keepalive: 60,
    reconnectPeriod: 1000,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clean: true,
    encoding: 'utf8'
};
var client = mqtt.connect('mqtt://m24.cloudmqtt.com', options);
client.on('connect', function() { // When connected
    console.log("Connected to CloudMQTT");
    // Subscribe to the temperature
    client.subscribe('sensor/temp', function() {
        // When a TEMP message arrives, do something with it
        client.on('message', function(topic, message) {
            if(topic === 'sensor/temp'){
                var tempM = new temp();
                tempM.temperatura = message.toString();
                var d = new Date();
                var dm = d.getMonth() + '/' + d.getDay() + '-' + d.getHours() + ':' + d.getMinutes();
                tempM.date = dm;
                tempM.save((err, tempM) => {
                    console.log('Temperatura: ' + tempM.temperatura +  ' guardada');
                })
            }
        });  
    });
    //subscribe to the humidity
    client.subscribe('sensor/humidity', function() {
        // When a HUMIDITY message arrives, do something with it
        client.on('message', function(topic, message) {
            if(topic === 'sensor/humidity'){
                var humM = new hum();
                humM.humedad = message.toString();
                var d = new Date();
                var dm = d.getMonth() + '/' + d.getDay() + '-' + d.getHours() + ':' + d.getMinutes();
                humM.date = dm;
                humM.save((err, humM) => {
                    console.log('Humedad: ' + humM.humedad +  ' guardada');
                    console.log("DATE: " + humM.date);
                    
                })
            }
        });  
    });
}); 


//FUNCIONES DE CONTROL DE LA BASE DE DATOS
function obtenerTemperatura(req, res){
    temp.find({}).exec((err, temperatura) =>{
        res.status(200).send({
            temperatura
        })
    })
}

function obtenerHumedad(req, res){
    hum.find({}).exec((err, humedad) =>{
        res.status(200).send({
            humedad
        })
    })
}

function anadirMedidas(req, res){
}

module.exports = {
    obtenerTemperatura,
    obtenerHumedad,
    anadirMedidas
}
