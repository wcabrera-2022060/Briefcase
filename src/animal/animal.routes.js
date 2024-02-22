'use strict'

import {Router} from 'express'
import { save, get, update, deleteA, search } from './animal.controller.js'
import { validateJwt, isAdmin } from '../middlewares/validate-jwt.js'


const api = Router()

//%Role ADMIN
//api.get('/test', test)
api.post('/addAnimal', [validateJwt, isAdmin], save)
api.put('/updateA/:id', [validateJwt, isAdmin],update)
api.delete('/deleteA/:id', [validateJwt, isAdmin], deleteA)

//%Role CLIENT/ADMIN
api.post('/search', [validateJwt],search)
api.get('/get', [validateJwt, isAdmin], get)

export default api