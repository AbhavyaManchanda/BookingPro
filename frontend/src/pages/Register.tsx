import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};



const Register = () => {
  const queryClient=useQueryClient();
  const navigate=useNavigate();

  const {showToast}=useAppContext();



  const {
    register,//binds the form fields
    watch,//watches their values
    handleSubmit,
    formState: { errors },//Errors during validation are stored
  } = useForm<RegisterFormData>();

  //linking the form to the handler
  //handleSubmit -- to validate the form data before submission.
    const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);//POST request server tak jaata hai data
    });



    const mutation=useMutation(apiClient.register,{
      onSuccess: async () => {//callback hai
        showToast({message:"registration successfull",type:"SUCCESS"});
        await queryClient.invalidateQueries("validateToken")
        navigate("/");
    },
    
    onError:(error:Error)=>{
    showToast({message:error.message,type:"ERROR"});

    },
    });



  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">

        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input className="border rounded w-full py-1 px-2 font-normal"  {...register("firstName", { required: "This field is required" })}>
          </input>
          {errors.firstName&&(
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input className="border rounded w-full py-1 px-2 font-normal"  {...register("lastName", { required: "This field is required" })}></input>
          {errors.lastName&&(
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
          type="email"
           className="border rounded w-full py-1 px-2 font-normal"  {...register("email", { required: "This field is required" })}></input>
           {errors.email&&(
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Password
          <input
          type="password"
           className="border rounded w-full py-1 px-2 font-normal"  {...register("password", { 
            required: "This field is required",
            minLength:{ 
              value:6, 
              message:"Password must be 6 characters or longer" 
            },

           })
           }></input>
           {errors.password&&(
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </label>


        <label className="text-gray-700 text-sm font-bold flex-1">
           Confirm Password
          <input
          type="password"
           className="border rounded w-full py-1 px-2 font-normal"  {...register("confirmPassword", { 
             validate:(val)=>{
              if(!val){
                return "This field is required"
              } else if(watch("password")!==val){
                return "Passwords do not match";
              }

             },

           })
           }></input>
           {errors.confirmPassword&&(
            <span className="text-red-500">{errors.confirmPassword.message}</span>
          )}
        </label>
           <span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
              Create Account
            </button>
           </span>

    </form> )
}
export default Register;














 
 

  
 

 

 