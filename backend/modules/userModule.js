const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type : String,
        required : [true,'Por favormingese el nombre']
    },
    email:{
        type : String,
        required : [true,'Por favormingese el email'],
        unique: true
    },
    password:{
        type:String,
        required : [true,'Por favor ingrese el email']
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