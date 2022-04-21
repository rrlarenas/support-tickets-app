const asyncHandler = require('express-async-handler')

const User = require('../modules/userModule') //Debio ser Model no Module!!
const Ticket = require('../modules/ticketModel')

//@desc   Obtiene Tickets usuario
//@route  /api/tickets
//@access Private

const getTickets = asyncHandler(async (req, res) => {

    //Get User ID from JWT}

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }

    const tickets = await Ticket.find({user: req.user.id})

     res.status(200).json(tickets)
}
)


//@desc   Obtiene Ticket usuario
//@route  /api/tickets/:id
//@access Private

const getTicket = asyncHandler(async (req, res) => {

    //Get User ID from JWT}

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket id no encontrado')
    }
    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('No Autorizado')
    }

     res.status(200).json(ticket)
}
)

//@desc   Crea nuevo ticket usuario
//@route  POST /api/tickets
//@access Private

const createTicket = asyncHandler(async (req, res) => {
    console.log (req.body)
    const {product,description} = req.body
    if(!product || !description){
        res.status(400)
        throw new Error('Ingrese los detalles de su solicitud')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }
    console.log (req.user.id)
    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status:'Nuevo'
    })
    res.status(201).json(ticket)
}
)

//@desc   Borra Ticket usuario
//@route  DELETE/api/tickets/:id
//@access Private

const deleteTicket = asyncHandler(async (req, res) => {

    //Get User ID from JWT}

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket id no encontrado')
    }
    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('No Autorizado')
    }

    await ticket.remove()

     res.status(200).json({seccess:true})
}
)

//@desc   Update Ticket usuario
//@route  PUT /api/tickets/:id
//@access Private

const updateTicket = asyncHandler(async (req, res) => {

    //Get User ID from JWT}

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('Usuario no encontrado')
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(404)
        throw new Error('Ticket id no encontrado')
    }

    if(ticket.user.toString()!== req.user.id){
        res.status(401)
        throw new Error('No Autorizado')
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id,req.body,{new: true})

     res.status(200).json(updatedTicket)
}
)

module.exports = {
    getTickets,
    getTicket,
    createTicket,
    deleteTicket,
    updateTicket
}