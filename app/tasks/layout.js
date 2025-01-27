'use client'
export const dynamic = 'force-dynamic'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { FaAppStoreIos } from 'react-icons/fa6'

const Tasklayout = ({ children }) => {
  return (
    <div>
      <div className='flex justify-between p-4'>
        <Link href={'/dashboard'}>
          <FaAppStoreIos size={40} />
        </Link>
        <div className='flex items-center gap-2'>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className='text-white font-semibold bg-slate-700 p-2 rounded hover:bg-slate-900 '
          >
            LogOut
          </button>
          <div>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Tasklayout
