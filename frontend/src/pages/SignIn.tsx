import { useForm } from "react-hook-form";

export type SignInFormData = {
    email: string;
    password: string;
  };

const SignIn=()=>{
    const{register} =useForm<SignInFormData>(); 
    return(
        <form className="flex flex-col"></form>
)
}