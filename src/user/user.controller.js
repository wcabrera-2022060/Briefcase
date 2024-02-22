//*Logica
'use strict'

//#Importes
import User from './user.model.js' //!Unico que puede ir en mayusculas
import { encrypt, checkPassword, checkUpdate } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res) => {
    return res.send('Hello World')
}

//% req solicitud, res respuesta
export const register = async (req, res) => {//!Solo para clientes
    try {
        //%capturar la informacion del cliente (body)
        let data = req.body
        //%Encriptar la contrasena
        data.password = await encrypt(data.password)
        //%Asignar rol por defecto
        data.role = 'CLIENT' //!Si viene con otro valor o no viene, lo asigna a CLIENTE
        //%Crear  una instancia del modelo (Schema)
        let user = new User(data)
        //%Guardar la informacion
        await user.save()//!Si await falla se va al catch, si funciona es por que va todo bien
        //%Respondo al usuario
        return res.send({ message: 'Registered succesfully' })

    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err })
    }
}

export const login = async (req, res) => {
    try {
        //%Capturar la informacion (body)
        let { username, password } = req.body
        //%Validar que el usuario existe
        let user = await User.findOne({ username })//%Username: 'Jchitay'
        //%Verifico que la contrasena coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            //%Responder (dar acceso)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({ message: 'Invalid credentials' })
        ////if(!user) return res.status(404).send({message: 'User not found'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Failed to login' })
    }
}

export const update = async (req, res) => {//!Usuarios logeados
    try {
        //%Obtener el id del usuario a actualizar
        let { id } = req.params
        //%Obtener datos que vamos a actualizar
        let data = req.body
        //%Validar si trae datos a actualizar
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be update' })
        //%Validar si tiene permisos para actualizar (tokenizacion)

        //%Actualizamos en la DB
        let updateUser = await User.findOneAndUpdate(
            { _id: id },//ObejectId <- hexadecimal (Hora systema, version mongo, llave privada...)
            data,//Datos que va a actualizar
            { new: true }//Objeto de la BD ya actualizado
        )
        //%Validar si se actualizo
        if (!updateUser) return res.status(401).send({ message: 'User not found and not updated' })
        //%Responder al usuario con el dato actualizado
        return res.send({ message: 'Updated user', updateUser })
    } catch (err) {
        console.error(err)
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is alredy taken` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //%Obtener el id
        let { id } = req.params
        //%Validar si está logeado y es el mismo X Hoy no lo vemos X
        //%Eliminar (deleteOne (Solo elimina y no devuelve el documento) / findOneAndDelete (Devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //%Verificar que se eliminó
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //%Responder
        return res.send({ message: `Account with username ${deletedUser.username} deleted successfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}