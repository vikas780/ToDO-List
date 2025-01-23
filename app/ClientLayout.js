// app/client-layout.js or app/client-layout.tsx
'use client'

import { ToastProvider } from '@/components/ToastContainer'
import { SessionProvider } from 'next-auth/react'
import { ReduxProvider } from '@/ReduxProvider'

export default function ClientLayout({ children }) {
  return (
    <ReduxProvider>
      <SessionProvider>
        <ToastProvider>{children}</ToastProvider>
      </SessionProvider>
    </ReduxProvider>
  )
}
