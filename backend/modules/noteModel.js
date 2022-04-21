const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'User'
    },
    ticket:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'Ticket'
    },
    isStaff:{
        type : Boolean,
        required : false,
        default: false
    },
    staffId:{
        type:String
    },
    text:{
        type:String,
        required : [true,'Ingrese  el texto']
    },


},{
    timestamps:true,
})

module.exports = mongoose.model('Note',noteSchema)