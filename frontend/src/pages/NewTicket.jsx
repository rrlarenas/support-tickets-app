import { useState, useEffect } from 'react'
import { useSelector, dispatch, useDispatch } from 'react-redux'
import {useNavigate, useNavigationType} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createTicket,reset} from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewTicket() {
    const { user } = useSelector((state) => state.auth)

    const {isLoading,isError,isSuccess, message} = useSelector((state)=> state.tickets)

    const [name] = useState(user.name)
    const [email] = useState(user.email)
    const [product, setProduct] = useState('iPhone')
    const [description, setDescrption] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect (()=>{
        console.log(isError)
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }

        dispatch(reset())
    },[dispatch,isError,isSuccess,navigate,message])

    const onSubmit = (e) => {
        e.preventDefault()
       // console.log(product)
        dispatch(createTicket({product,description}))
    }

    if(isLoading){
        return <Spinner />
    }
    return (
        <>
        <BackButton url='/' />
            <section className="heading">
                <h1>Crea un nuevo ticket</h1>
                <p>Por favor ingrese la información</p>
            </section>
            <section className="form">
                <div className="form-group">
                    <label htmlFor="name">Nombre de cliente</label>
                    <input type="text" className="form_control" value={name} disabled />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="text" className="form_control" value={email} disabled />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="product">Producto</label>
                        <select
                            name="product"
                            id="product"
                            value={product} 
                            onChange={(e) => setProduct(e.target.value)} defaultValue={product}>
                            <option value="iPhone" >iPhone</option>
                            <option value="MacBook Pro">MacBook Pro</option>
                            <option value="iMac">iMac</option>
                            <option value="iPad">iPad</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Descripción del problema</label>
                        <textarea name="description" id="description" className='form-control' placeholder='Ingrese su problema' value={description}
                        onChange = {(e) =>setDescrption(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-block">Enviar</button>
                    </div>
                </form>
            </section>

        </>
    )
}

export default NewTicket