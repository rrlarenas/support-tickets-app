const express = require('express')
const router = express.Router()
const {getTickets,getTicket,createTicket,deleteTicket,updateTicket} = require('../controllers/ticketController')

const {protect} = require('../middlelware/authMiddleware')
 //protect es que tienes que estar autenticado

//Re -  route en noteRouter
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes',noteRouter)


router.route('/').get(protect,getTickets).post(protect,createTicket)

router.route('/:id').get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket)

module.exports = router