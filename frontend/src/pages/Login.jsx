import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { login,reset } from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

function Login() {

    const [formData, setFormData] = useState({

        email: '',
        password: '',

    })



    const {  email, password } = formData

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { user, isLoading, isSuccess, message , isError} = useSelector(state => state.auth)

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess|| user){
            toast.success('Sesión Iniciada')
            navigate('/')
        }

        dispatch(reset())
    },[isError,isSuccess,user,message,navigate,dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]:e.target.value
        }
        )
        )
    }

    const onSubmit = (e) =>{
        e.preventDefault()

        const userData={
            email,
            password
        }
        dispatch(login(userData))

    }

    if(isLoading){
        return <Spinner />
    }



    return (
        <>
            <section className="heading">
                <h1><FaSignInAlt /> Ingresa
                </h1>
                <p>Ingresa para acceder a soporte</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="email" className="form-control" id='email' value={email} name='email' onChange={onChange} placeholder='Ingrese su email' required />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id='password' value={password} name='password' onChange={onChange} placeholder='Password' required />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-block">
                            Entrar
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login