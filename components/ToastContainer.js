'use client'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Slide } from 'react-toastify'

export function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer transition={Slide} />
    </>
  )
}
