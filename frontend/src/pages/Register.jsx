import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/auth/authSlice'

function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

const dispatch = useDispatch()

const { user, isLoading, isSuccess, message } = useSelector(state => state.auth)

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value
    }
    )
    )
}

const onSubmit = (e) => {
    e.preventDefault()


    if (password !== password2) {
        toast.error('Contraseñas deben ser iguales')
    }else{
        const userData = {
            name,
            email,
            password
        }
        dispatch(register(userData))

    }


}



return (
    <>
        <section className="heading">
            <h1><FaUser /> Registrate
            </h1>
            <p>Crea una cuenta</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control" id='name' value={name} name='name' onChange={onChange} placeholder='Ingreese nombre de usuario' required />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" id='email' value={email} name='email' onChange={onChange} placeholder='Ingrese su email' required />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" id='password' value={password} name='password' onChange={onChange} placeholder='Password' required />
                </div>
                <div className="form-group">
                    <input type="password2" className="form-control" id='password2' value={password2} name='password2' onChange={onChange} placeholder='Confirme Password' re />
                </div>
                <div className="form-group">
                    <button className="btn btn-block">
                        Enviar
                    </button>
                </div>
            </form>
        </section>
    </>
)
}

export default Register