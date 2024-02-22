import {Schema, model} from 'mongoose'

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,//%Solo puede existir un registro unico
        lowecase: true,
        required: true
    },
    password: {
        type: String,
        minLength: [8, 'Password must be characters'],
        required: true
    },
    phone: {
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: ['ADMIN', 'CLIENT']//%Solo los datos que esten en el arreglo son validos
    }
})

//#Pre Mongoose
//%Pluralizar
export default model('user', userSchema)

//*
//?
//!
//#
//%