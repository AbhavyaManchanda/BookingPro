import React, { useContext, useState } from "react";
import * as apiClient from '../api-client';
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import { loadStripe,Stripe} from "@stripe/stripe-js";


//managing global state, toast notifications, authentication status, and Stripe integration


 
const STRIPE_PUB_KEY=import.meta.env.VITE_STRIPE_PUB_KEY||"";

type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
}


type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
    isLoggedIn: boolean;
    stripePromise:Promise<Stripe | null>;
}



const AppContext=React.createContext<AppContext|undefined>(undefined);


//initializing stripe library with public api key
const stripePromise=loadStripe(STRIPE_PUB_KEY);
//A shared promise that ensures the app initializes Stripe only once.
//Passed via context to components that interact with Stripe



export const AppContextProvider = ({children}: {
    children: React.ReactNode;
    }) => {

//toast ek state variable hai jo notification ke liye ToastMessage object ko store karega.
//setToast ek function hai to update the toast state.
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    
  
//Backend se token validation ke liye useQuery call ho raha hai.
    const { isError } = useQuery("validateToken", apiClient.validateToken, {
      retry: false,
    });

  
    return (
      <AppContext.Provider 
      value={{
        showToast: (toastMessage) =>{
            setToast(toastMessage)
        },
        isLoggedIn: !isError,
        stripePromise
      }}
      >
        
        {toast && (
            <Toast 
            message={toast.message} 
            type={toast.type} 
            onClose={()=>setToast(undefined)}
            />
            )}
        {children}
      </AppContext.Provider>
      //conditionally renders the toast component if it exists
    );
  };

  

export const useAppContext=()=>{
    const context = useContext(AppContext);
    return context as AppContext;
}
  