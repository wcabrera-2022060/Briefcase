'use strict'

import Animal from './animal.model.js'
import User from '../user/user.model.js'
import { checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    return res.send('Funciona el animal xd')
}

export const save = async (req, res) => {
    try {
        //%Capturar la data
        let data = req.body
        //%Validar que el keeper exista (Buscar a la BD)
        let user = await User.findOne({ _id: data.keeper })
        if (!user) return res.status(404).send({ message: 'Keeper not found' })
        //%Crear la 'instancia de animal'
        let animal = new Animal(data)
        //%Guardar animal
        await animal.save()
        //%Responder si todo sale bien
        return res.send({ message: 'Animal saved successfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering animal', err })
    }
}

export const get = async (req, res) => {
    try {
        let animals = await Animal.find()//!Encuentre o no encuentre devuleve un array
        if (animals.length === 0) return res.status(404).send({ message: 'no data' })
        return res.send({ animals })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error getting animal' })
    }
}

export const update = async (req, res) => {
    try {
        //%Capturar el id
        let { id } = req.params
        //%Capturar la data
        let data = req.body
        //%Validar que vengan datos
        let update = checkUpdate(data, false)
        if (!update) return res.status(400).send({ message: 'Have submit' })
        //%Actualizar
        let updatedAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).populate('keeper', ['name', 'phone'])
        //%Validar la actualizacion
        if (!updatedAnimal) return res.status(401).send({ message: 'Animal not found and not updated' })
        //%Responder
        return res.send({ message: 'Animal Update successfully', updatedAnimal })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error updating animal' })
    }
}


export const deleteA = async (req, res) => {
    try {
        //%Verificar si tiene una reunion en proceso
        
        //%Capturar el id del animal a eliminar
        let { id } = req.params
        //%Eliminar
        let deletedAnimal = await Animal.deleteOne({ _id: id })
        //%Validar que se elimno
        if (deletedAnimal.deletedCount == 0) return res.status(404).send({ message: 'Animal not found, note deleted' })
        //%Responder
        return res.send({ message: 'Deleted animal succesfully' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting animal' })
    }
}


export const search = async (req, res) => {
    try {
        //%Obtener el parametro de busqueda
        let { search } = req.body
        //%Buscar
        let animals = await Animal.find({ name: search }).populate('keeper', ['name', 'phone'])
        //%Validar la respuesta
        if(animals.length == 0) return res.status(404).send({message: 'Animals not found'})
        //%Responder si todo sale bien
        return res.send({message: 'Animals found', animals})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error searching animal' })
    }
}