// app/client-layout.js or app/client-layout.tsx
'use client'

import { ToastProvider } from '@/components/ToastContainer'
import { SessionProvider } from 'next-auth/react'
import { ReduxProvider } from '@/ReduxProvider'
import { DarkTheme } from './DarkTheme'

export default function ClientLayout({ children }) {
  return (
    <DarkTheme>
      <ReduxProvider>
        <SessionProvider>
          <ToastProvider>{children}</ToastProvider>
        </SessionProvider>
      </ReduxProvider>
    </DarkTheme>
  )
}
