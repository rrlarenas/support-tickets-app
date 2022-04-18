const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref:'User'
    },
    product:{
        type : String,
        required : [true,'Seleccione un producto'],
        enum: ['iPhone','MacBook Pro','iMac','iPad']
    },
    description:{
        type:String,
        required : [true,'Ingrese una descripción de su problema']
    },
    status:{
        type: String,
        required: true,
        enum:['Nuevo','Abierto','En Proceso','Cerrado'],
        defualt: 'Nuevo'
    }

},{
    timestamps:true,
})

module.exports = mongoose.model('Ticket',ticketSchema)