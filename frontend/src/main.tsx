import React from 'react'
import  ReactDOM  from 'react-dom/client';// manage rendering React components into the DOM
 
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query' //query==api calls     react-query controls data fetching
import { AppContextProvider } from './contexts/AppContext.tsx'

const queryClient =new QueryClient({
  defaultOptions:{
    queries:{
      retry:0,//Prevents retrying failed API requests
    },
  },
})

//rendering the app
ReactDOM.createRoot(document.getElementById('root')!).render(
  //React.StrictMode: For dev warnings.
//QueryClientProvider: To manage API calls.
//AppContextProvider: To share global state.



  <React.StrictMode>  
    <QueryClientProvider client={queryClient}>
     <AppContextProvider>
      <App/>
     </AppContextProvider>
    </QueryClientProvider> 
     
  </React.StrictMode>, 
)
