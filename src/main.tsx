import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from'react-toastify' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position='top-right' autoClose={1000} hideProgressBar={true} />
    <RouterProvider router={router} />
  </StrictMode>,
)
