'use strict'

import jwt from 'jsonwebtoken'

export const generateJwt = async (payload) => {
    try {
        //!el Objeto de confiuracion debe ir minimo el tiempo de expiracion
        
        return jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (err) {
        console.error(err)
        return err
    }
}