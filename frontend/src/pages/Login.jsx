import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaSignInAlt} from 'react-icons/fa'
import { login,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Login = () => {
    const [formData,setFormData] = useState({
        email: '',
        password: ''
    })

    const {email,password} = formData

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user,isError,isSuccess,message,isLoading} = useSelector((state) => state.auth)


    useEffect(() => {
        if(isError) {
            // console.log(message)
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,password
        }

        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }
    
    return (
        <>
            <section className='heading'>
                <h1>
                    <FaSignInAlt /> Login
                </h1>
                <p>Login and start setting goals</p>
            </section>
            <section>
            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="form-control" 
                        value={email}
                        placeholder="Enter your email"
                        onChange={onChange} 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="form-control" 
                        value={password}
                        placeholder="Enter your password"
                        onChange={onChange} 
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className='btn btn-block'>Login</button>
                </div>
            </form>
            </section>
        </>
    )
}

export default Login
