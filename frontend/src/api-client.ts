import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register =async(formData:RegisterFormData)=>{

    const response=await fetch(`${API_BASE_URL}/api/users/register`,
        {
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },

    body:JSON.stringify(formData),
});

const responseBody =await response.json();
//Parses the server's JSON response and stores it in responseBody

if(!response.ok){
    throw new Error(responseBody.message)//server se message liya
}

}


//taaki sirf authenticated users hi access kr sken
export const validateToken=async()=>{

    const response=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
    })

    if(!response.ok){
        throw new Error("Token invalid")
    }

    return response.json();
}