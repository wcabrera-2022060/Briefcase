'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const createAppointment = async (req, res) => {
    try {
        //%Capturar la data
        let data = req.body
        data.user = req.user._id
        //!delete data.status
        //%Verificar que exista el animal
        let animal = await Animal.findOne({ _id: data.animal })
        if (!animal) return res.status(404).send({ message: 'Animal not found' })
        //%Verificar que la mascota no tenga una cita activa con la persona
        //%Validar si usuario tiene cita o si animal tiene cita
        /* let appointmentExist = await Appointment.findOne({
            $or: [{
                animal: data.animal,
                user: data.user
            }, {
                user: data.user
            }]}) */
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    //%Si el usuario tiene cita con ese animal
                    animal: data.animal,
                    user: data.user,
                },
                {
                    //%Si tiene una cita en esa fecha
                    date: data.date,
                    user: data.user
                }
            ]
        })
        if (appointmentExist) return res.send({ message: 'Appointment already exists' })
        //%Ejercicio <-- el usuario solo debe tener una cita por dia

        //%Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        return res.send({ message: `Appointment saved succesfully, fot the date ${appointment.date}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error saving appointment', err })
    }
}