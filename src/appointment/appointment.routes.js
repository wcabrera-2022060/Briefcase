'use strict'

import { Router } from 'express'
import { createAppointment } from './appointment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = Router()

api.post('/createAppointment', [validateJwt], createAppointment)

export default api