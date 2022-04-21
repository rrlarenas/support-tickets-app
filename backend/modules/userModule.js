const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : [true,'Por favor ingese el nombre']
    },
    email:{
        type : String,
        required : [true,'Por favor ingese el email'],
        unique: true
    },
    password:{
        type:String,
        required : [true,'Por favor ingrese su contraseña']
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }

},{
    timestamps:true,
})

module.exports = mongoose.model('User',userSchema)