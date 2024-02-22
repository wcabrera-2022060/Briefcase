'use strict'

import { Schema, model } from 'mongoose'

const appointmentSchema = Schema({
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['CREATED', 'ACCEPTED', 'CANCELLED', 'COMPLETED'],
        default: 'CREATED',
        required: true
    },
    animal: {
        type: Schema.ObjectId,
        ref: 'animal',//%Debe poner el dato exacto al que haga referencia
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    versionKey: false//%quita el __v de la consulta
})

export default model('appointment', appointmentSchema)