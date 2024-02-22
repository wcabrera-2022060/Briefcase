//*Conexion a MongoDB
'use strict'

import mongoose from 'mongoose'

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect mongodb')
            mongoose.disconnect
        })

        mongoose.connection.on('connecting', () => console.log('MongoDB | try connecting'))
        mongoose.connection.on('connected', () => console.log('MongoDB | connected mongodb'))
        mongoose.connection.on('open', () => console.log('MongoDB | connected to database'))
        mongoose.connection.on('disconnected', () => console.log('MongoDB | disconnected'))
        mongoose.connection.on('reconnected', () => console.log('MongoDB | reconnected to mongodb'))

        return await mongoose.connect('mongodb://127.0.0.1:27017/AdoptionSystemAV24')
    } catch (err) {
        console.error('Database connection failed', err)
    }
}