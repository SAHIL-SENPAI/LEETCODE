import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";



const signupSchema = z.object({
    firstName:z.string().min(3,"Names should contain atleast 3 characters"),
    emailId:z.string().email("invalid email"),
    password:z.string().min(8,'Password should contain atleast 8 character')
})



function Signup(){

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated,loading,error} = useSelector((state)=>state.auth);

    const {register,handleSubmit,watch,formState: { errors },} = useForm({resolver:zodResolver(signupSchema)});

    useEffect(()=>{
      if(isAuthenticated){
        navigate('/');
      }
    },[isAuthenticated]);
    
    const submittedData = (data) =>{
        //handleSubmit also uses preventdefault so we dont have to use it again
        dispatch(registerUser(data));
        //DATA VALIDATION IN FRONT END
        //INSTEAD OF REACT-HOOK-FORM WE'LL USE ZOD FOR EASY VALIDATION;
    }
    
    return (
  <div className="min-h-screen flex items-center justify-center bg-base-200">
    <div className="card w-full max-w-md shadow-xl bg-base-100">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(submittedData)} className="space-y-4">
          {/* First Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              {...register('firstName')}
              type="text"
              placeholder="Enter Your Name"
              className="input input-bordered w-full"
            />
            {errors.firstName && (
              <span className="text-red-500 text-sm">{errors.firstName.message}</span>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register('emailId')}
              type="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full"
            />
            {errors.emailId && (
              <span className="text-red-500 text-sm">{errors.emailId.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register('password')}
              type="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password.message}</span>
            )}
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button className="btn btn-primary w-full" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
    );

}


export default Signup;










/* without using libraries*/

 
// import {useState,useEffect} from 'react'

// function Signup(){

//     const [name,setName] = useState("");
//     const [email,setEmail] = useState("");
//     const [password,setPassword] = useState("");

//     const handleSubmit = (e) =>{

//         e.preventDefault();

//         console.log(name,email,password)

//     }

//     return(
        
//         <form onSubmit={handleSubmit}>
//             <input type="text" value={name} placeholder='Enter first name' onChange={(e)=>setName(e.target.value)}/>
//             <input type="email" value={email} placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
//             <input type="password" value={password} placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
//             <button type='submit'>Submit</button>
//         </form>

//     )
// }