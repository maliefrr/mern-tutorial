import React from 'react'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {FaUser} from 'react-icons/fa'
import { register,reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

const Register = () => {
    const [formData,setFormData] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation : ""
    })
    const {name,email,password,passwordConfirmation} = formData

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user,isLoading,isSuccess,isError,message} = useSelector((state) => state.auth)


    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())
    },[user,isError,isSuccess,message,navigate,dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(password !== passwordConfirmation) {
            toast.error("Password and Password confirmation do not match")
        } else {
            const userData = {
                name,email,password,passwordConfirmation
            }

            dispatch(register(userData))
        }
    }
    if(isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className='heading'>
                <h1><FaUser /> Register</h1>
                <p>Please create an account</p>
            </section>
            <section>
                <form action="" onSubmit={onSubmit}>
                    <div className="form-group">
                    <input 
                        type="text" 
                        className="form-control" 
                        id='name' 
                        value={name} 
                        name='name' 
                        placeholder='Enter your name' 
                        onChange={onChange}
                    />
                    <input 
                        type="email" 
                        className="form-control" 
                        id='email' 
                        value={email} 
                        name='email' 
                        placeholder='Enter your email' 
                        onChange={onChange}
                    />
                    <input 
                        type="password" 
                        className="form-control" 
                        id='password' 
                        value={password} 
                        name='password' 
                        placeholder='Enter your password' 
                        onChange={onChange}
                    />
                    <input 
                        type="password" 
                        className="form-control" 
                        id='passwordConfirmation' 
                        value={passwordConfirmation} 
                        name='passwordConfirmation' 
                        placeholder='re-enter your password' 
                        onChange={onChange}
                    />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
