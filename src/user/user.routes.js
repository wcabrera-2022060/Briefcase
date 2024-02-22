//*Rutas del Usuario
//#Creando enrutador de Express
'use strict'

import express from 'express'
import { isAdmin, validateJwt } from '../middlewares/validate-jwt.js'
import { test, register, login, update, deleteU } from './user.controller.js'


const api = express.Router()

//%Middleware
//%Role ADMIN
api.get('/test', [validateJwt, isAdmin], test) // <- solo si esta logeado


//%Role CLIENT/ADMIN
api.put('/update/:id', update)
api.delete('/delete/:id', deleteU)

//%PUBLIC
api.post('/register', register)
api.post('/login', login) //!JWT


export default api

//export const api //!<- tengo si o si el nombre que esta en este archivo EJ:api
//export default api //!<- importar con otro nombre de userRoutes EJ: userRoutes