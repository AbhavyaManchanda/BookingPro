import React from 'react'
import  ReactDOM  from 'react-dom/client'
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AppContextProvider } from './contexts/AppContext.tsx'

const queryClient =new QueryClient({
  defaultOptions:{
    queries:{
      retry:0,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
     <AppContextProvider>
      <App />
     </AppContextProvider>
    </QueryClientProvider>
     
  </React.StrictMode>,
)
