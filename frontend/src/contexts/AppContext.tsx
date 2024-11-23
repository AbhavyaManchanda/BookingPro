import React, { useContext, useState } from "react";
import * as apiClient from '../api-client';
import Toast from "../components/Toast";
import { useQuery } from "react-query";



type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
}


type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
    isLoggedIn: boolean;
}



const AppContext=React.createContext<AppContext|undefined>(undefined);



export const AppContextProvider = ({children}: {
    children: React.ReactNode;
    }) => {

//toast ek state variable hai jo notification ke liye ToastMessage object ko store karega.
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  
//Backend se token validation ke liye useQuery call ho raha hai.
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
      retry: false,
    });

  
    return (
      <AppContext.Provider value={{
        showToast: (toastMessage) =>{
            setToast(toastMessage)
        },
        isLoggedIn: !isError,
      }}>
        {toast && (
            <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={()=>setToast(undefined)}
            />
            )}
        {children}
      </AppContext.Provider>
    );
  };

  

export const useAppContext=()=>{
    const context = useContext(AppContext);
    return context as AppContext;
}
  