'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const HumSchema = new Schema ({
    "humedad": String,
    "date": String,
})

module.exports = mongoose.model('Hum', HumSchema)