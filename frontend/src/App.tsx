import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Layout from "./layouts/Layout";
// import './App.css'

const App=()=>{
   

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>
          <p>HomePage</p>
        </Layout>
      }
      />
            
          <Route path="search" element={<Layout>
          <p>Search</p>
        </Layout>
      }
      />
          {/* <Route path="contact" element={<Contact />} />
          // <Route path="*" element={<NoPage />} /> */} 
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
