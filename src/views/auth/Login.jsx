import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { overrideStyle } from '../../utils/utils';
import { seller_login,messageClear } from '../../store/Reducers/authReducer';
import illustration from './../../assets/illustration.png';
const Login = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const {loader,errorMessage,successMessage} = useSelector(state=>state.auth)

    const [state, setState] = useState({ 
        email: "",
        password: ""
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        dispatch(seller_login(state))
    }

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            navigate('/') 
            dispatch(messageClear()) 
            
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
        

    },[successMessage,errorMessage])


    return (
        <div className="min-w-screen min-h-screen flex justify-center items-center bg-white">
            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden" style={{ width: '80%', maxWidth: '900px' }}>
                {/* Left section for form */}
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <div className="text-left mb-6">
                        <h2 className="text-3xl font-bold text-gray-900">DG Ecommerce</h2>
                        <p className="text-gray-600 mt-2">Welcome back seller</p>
                        <h3 className="text-4xl font-bold mt-4">Sign in</h3>
                    </div>
                    <form onSubmit={submit}>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="email" className="text-gray-700 font-semibold">Email</label>
                            <input
                                onChange={inputHandle}
                                value={state.email}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                id="email"
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <label htmlFor="password" className="text-gray-700 font-semibold flex justify-between">
                                Password <span className="text-orange-500 cursor-pointer"></span>
                            </label>
                            <input
                                onChange={inputHandle}
                                value={state.password}
                                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 bg-orange-50"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                id="password"
                                required
                            />
                        </div>
                        <button
                            disabled={loader}
                            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-200 flex justify-center items-center"
                        >
                            {loader ? <PropagateLoader color="#fff" cssOverride={overrideStyle} /> : 'SIGN IN'}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 mt-4">
                        I don’t have an account? 
                        <Link className='font-bold text-orange-500 cursor-pointer' to="/register"> Sign Up</Link>
                    </p>
                </div>

                {/* Right section for illustration */}
                <div className="hidden md:flex w-1/2 bg-orange-50 justify-center items-center">
    <img src={illustration} alt="Admin Illustration" className="w-3/4 h-auto" />
</div>

            </div>
        </div>
    );
};

export default Login;
