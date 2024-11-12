import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import  axios from 'axios';
import getBaseURL from '../utils/baseUrl';


const AdminLogin = () => {
    const { register, handleSubmit } = useForm();
    const [message, setMessage] = useState("");

    const navigate = useNavigate()

    
  const onSubmit = async (data) => {
    console.log("Form Data:", data);

    try{
        
    const response   = await  axios.post(`${getBaseURL()}/api/auth/login`,data,{
            headers:{
                'Content-Type': 'application/json',
            }
        })

        const auth = response.data

        console.log(auth);

        if(auth.token){
            localStorage.setItem('token', auth.token);
            setTimeout(() => {
                localStorage.removeItem('token')
                alert("your token has  expired,please Login again")
                navigate('/')


            }, 3600 * 1000);

            alert("login successfull")
            navigate('/dashboard')
        }
        
      
      }
      catch(err){
        setMessage("please provide valid  email and password")
        console.log(err);
        
    
      }
    }

    return (
        <div className="h-[calc(100vh-120px)] border flex justify-center items-center">
          <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-xl font-semibold mb-4 text-center">Admin Dashboard Login</h2>
    
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  {...register("username", { required: true })}
                  placeholder="Username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
                />
              </div>
    
              {message && (
                <p className="text-red-500 text-xs mb-3 italic">{message}</p>
              )}
    
              <div className='flex justify-center'>
                <button type="submit" className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none ">
                  Login
                </button>
              </div>
            </form>
    
       
    
            {/* Google sign-in */}
          
            <p className="mt-5 text-gray-500 text-xs text-center">@2025 Book Store. All rights reserved.</p>
          </div>
        </div>
      );
}

export default AdminLogin