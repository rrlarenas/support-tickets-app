import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote  } from '../features/notes/noteSlice'
import {FaPlus} from 'react-icons/fa'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from 'react-modal'

const customStyles = {
    content: {
        width: '600px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
    },
}

Modal.setAppElement('#root')

function Ticket() {

    const [modalisOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')


    const { ticket, isLoading,  isError, message } = useSelector((state) => state.tickets)

    const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes)

    //const params = useParams()
    const dispatch = useDispatch()
    const { ticketId } = useParams()
    const navigate = useNavigate()

    // console.log(ticketId)
    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        console.log('Aca')
        dispatch(getNotes(ticketId))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError, message, ticketId])

    const onTicketClose = () => {

        dispatch(closeTicket(ticketId))
        toast.success('Ticket Cerrado')
        navigate('/tickets')

    }
    const onNoteSubmit =  (e) => {
        e.preventDefault()
        dispatch(createNote({noteText,ticketId}))
        closeModal()
    }
    //Cerrar Abrir Modal
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    if (isLoading || notesIsLoading) {
        return <Spinner />
    }

    if (isError) {
        <h3>Algo salió mal</h3>
    }

    return (
        <div className="ticket-page">
            <header className='ticket-header'>
                <BackButton url='/tickets' />
                <h2>
                    Ticket id: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>Fecha: {new Date(ticket.createdAt).toLocaleString('es-CL')} </h3>
                <h3>
                    Producto : {ticket.product}
                </h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Descripcion del problema</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>
                    Notas
                </h2>
            </header>
            {ticket.status !=='Cerrado' && (
                <button className="btn" onClick={openModal}><FaPlus />Agregar Nota</button>
            )}
            <Modal isOpen={modalisOpen} onRequestClose={closeModal} 
            style={customStyles} contentLabel = 'Add Note'>
                <h2>Agrege su comentario</h2>
                <button className='btn-close' onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-group">
                        <textarea 
                        name="noteText" 
                        id="noteText" 
                        className='form-control' 
                        placeholder='su texto'
                        value = {noteText} 
                        onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type='submit'>Enviar</button>
                    </div>
                </form>
            </Modal>

            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
            {ticket.status !== 'Cerrado' && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>Cerrar Ticket</button>
            )}
        </div>
    )
}

export default Ticket