'use client'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const Tasklayout = ({ children }) => {
  return (
    <div>
      <div className='flex justify-between p-4'>
        <Link href={'/tasks'}>
          <Image
            className='dark:invert'
            src='/vercel.svg'
            alt='Vercel logomark'
            width={20}
            height={20}
          />
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className='text-white font-semibold bg-slate-700 p-2 rounded hover:bg-slate-900 '
        >
          LogOut
        </button>
      </div>
      {children}
    </div>
  )
}

export default Tasklayout
