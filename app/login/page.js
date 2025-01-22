'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { setToken } from '@/features/auth/AuthSlice'
import { useDispatch } from 'react-redux'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  })
  const router = useRouter()
  const dispatch = useDispatch()

  const labelStyles = 'block text-grey-700 font-medium mb-2'
  const inputStyles = 'w-full px-3 py-2 border border-gray-300 rounded-md'
  const buttonsStyles =
    'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormErrors({
      email: '',
      password: '',
    })

    let valid = true
    if (!emailRegex.test(email)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }))
      valid = false
    }

    // if (!passwordRegex.test(password)) {
    //   setFormErrors((prevErrors) => ({
    //     ...prevErrors,
    //     password:
    //       'Password must be at least 6 characters long and contain both uppercase and lowercase letters.',
    //   }))
    //   valid = false
    // }

    if (valid) {
      setLoading(true)
      try {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        console.log('Result from login page', result)
        if (result?.error) {
          // If the `authorize` function throws, `result.error` will contain the message
          toast.error(result.error || 'Login failed')
        } else {
          // Successful login
          dispatch(setToken(result.token))
          toast.success('Redirecting to Tasks')
          router.push('/tasks') // Redirect to tasks page
        }
      } catch (err) {
        // Handle any unexpected errors
        toast.error(err.message || 'An unexpected error occurred')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className='container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='flex justify-center font-semibold text-xl p-2'>Login</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-3'>
          <label htmlFor='Email' className={labelStyles}>
            Email
          </label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputStyles}
            required
          />
          {formErrors.email && (
            <p className='text-red-500 text-sm'>{formErrors.email}</p>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='Password' className={labelStyles}>
            Password
          </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputStyles}
            required
          />
          {formErrors.password && (
            <p className='text-red-500 text-sm'>{formErrors.password}</p>
          )}
        </div>

        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <button type='submit' className={buttonsStyles} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <p>
          Not a member.?{' '}
          <Link href='/register'>
            <span className='text-blue-800 hover:text-blue-500 font-semibold  '>
              Register
            </span>
          </Link>{' '}
        </p>
      </form>
    </div>
  )
}
