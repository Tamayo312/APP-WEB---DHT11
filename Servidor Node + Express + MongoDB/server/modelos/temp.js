'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TempSchema = new Schema ({
    "temperatura": String,
    "date": String,
})

module.exports = mongoose.model('Temp', TempSchema)