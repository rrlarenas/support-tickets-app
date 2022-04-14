
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

import React from 'react'

function Home() {
    return (
        <>
            <section className="heading">
                <h1>
                    ¿En que podemos ayudarle?
                    <p>Seleccione alguna opción</p>
                </h1>
            </section>
            <Link to='/new-ticket' className='btn btn-reverse btn-block' >
                <FaQuestionCircle /> Crear nuevo Ticket

            </Link>
            <Link to='/tickets' className='btn  btn-block' >
                <FaTicketAlt /> Mis Tickets

            </Link>
        </>

    )
}

export default Home