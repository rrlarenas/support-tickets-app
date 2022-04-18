import {Link} from  'react-router-dom'

function TicketItem({ticket}){
 return (
     <div className="ticket">
         <div className=""> {new Date(ticket.createdAt).toLocaleDateString('es-CL')} </div>
         <div className="">{ticket.product} </div>
         <div className={`status status-${ticket.status}`}>{ticket.status}</div>
         <Link to={`/ticket/${ticket._id}`} className = 'btn btn-reverse btn-sm' >Ver</Link>
     </div>
 )
}

export default TicketItem 