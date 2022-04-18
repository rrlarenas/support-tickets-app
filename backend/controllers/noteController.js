const asyncHandler = require('express-async-handler')

const User = require('../modules/userModule') //Debio ser Model no Module!!
const Note = require('../modules/noteModel') //Debio ser Model no Module!!
const Ticket = require('../modules/ticketModel')

const getNotes = asyncHandler(async (req, res) => {

    //Get User ID from JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    }

    const notes = await Note.find({ticket: req.params.ticketId})

     res.status(200).json(notes)
}
)

const addNote = asyncHandler(async (req, res) => {

    //Get User ID from JWT

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('Usuario no autorizado')
    }

    const note = await Note.create({
        text : req.body.text,
        isStaff:false,
        user: req.user.id,
        ticket:req.params.ticketId
    })

     res.status(200).json(note)
}
)

module.exports =  {
    getNotes,
    addNote
}

