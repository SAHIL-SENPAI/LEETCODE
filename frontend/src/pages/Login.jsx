import { useForm } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../authSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";


const loginSchema = z.object({
    emailId: z.string().email("Invalid Email"),
    password: z.string().min(8,"Password should contain atleast 8 characters")
})




function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isAuthenticated} = useSelector((state)=>state.auth)

    const {register,handleSubmit,watch,formState:{errors},} = useForm({resolver:zodResolver(loginSchema)});

    useEffect(()=>{
        if(isAuthenticated){
            navigate("/");
        }
    },[isAuthenticated]);

    const submittedData = (data)=>{
        dispatch(loginUser(data));
    }


    return (
  <div className="min-h-screen flex items-center justify-center bg-base-200">
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleSubmit(submittedData)} className="space-y-4">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("emailId")}
              type="email"
              placeholder="Enter Your Email"
              className="input input-bordered w-full"
            />
            {errors.emailId && (
              <span className="text-red-500 text-sm">
                {errors.emailId.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Enter Your Password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
);

}

export default Login;