import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const {registerUser,signInWithGoogle} = useAuth()
  const navigate = useNavigate()



  const onSubmit = async (data) => {
    console.log("Form Data:", data);
  try{
    await registerUser(data.email, data.password)
    alert("user registered successfully")
  }
  catch(err){
    setMessage("please provide valid  email and password")
    console.log(err);
    

  }
  }


  const handleGoogleSignIn  = async ()=>{
    try {

      await signInWithGoogle();
      alert("login successfull")
      navigate('/')
      
    } catch (error) {
      alert("google sign in failed")
      console.log(error);
      

    }

  }

  return (
    <div className="h-[calc(100vh-120px)] border flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email Address"
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

          <div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
              Register
            </button>
          </div>
        </form>

        <p className="font-medium text-sm my-4 align-baseline">
          Have an account? Please
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            {" "}Login
          </Link>
        </p>

        {/* Google sign-in */}
        <button className="w-full flex items-center gap-1 bg-secondary hover:bg-blue-700 text-white font-bold px-4 py-2 rounded outline-none"
        onClick={handleGoogleSignIn}>
          <FaGoogle className="mr-2"/>
          Sign in with Google
        </button>
        <p className="mt-5 text-gray-500 text-xs text-center">@2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Register;
