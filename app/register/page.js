'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser } from '../api/register'
import Link from 'next/link'
import { ValidateInputs } from '@/util/Validation'
import { getSession, signIn } from 'next-auth/react'
import { useDispatch } from 'react-redux'
import { setToken } from '@/features/auth/AuthSlice'

const initialState = {
  name: '',
  email: '',
  password: '',
}

export default function RegisterForm() {
  const dispatch = useDispatch()
  const [values, setValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] = useState({})
  const router = useRouter()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    //Input validation on submit
    const errors = ValidateInputs(values)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setLoading(false)
      return
    }

    try {
      const result = await registerUser(
        values.name,
        values.email,
        values.password
      )

      if (result?.error) {
        return
      }
      // Automatic login because the token is created while signIn
      const Loginresult = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })
      if (Loginresult?.ok) {
        const session = await getSession()
        // Sending token to AuthSlice
        if (session?.user?.token) {
          dispatch(setToken(session.user.token))
        }
        toast.success('Redirecting to tasks')
        router.push('/tasks')
      } else {
        toast.error(Loginresult.error || 'Failed login')
      }
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='flex justify-center font-semibold text-xl p-2 dark:text-black'>
        Register
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-3'>
          <label
            htmlFor='name'
            className='block text-grey-700 font-medium mb-2 dark:text-black'
          >
            Username
          </label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-white dark:text-black'
            required
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='email'
            className='block text-grey-700 font-medium mb-2 dark:text-black'
          >
            Email
          </label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-white dark:text-black'
            required
          />
          {formErrors.email && (
            <p className='text-red-500 text-sm'>{formErrors.email}</p>
          )}
        </div>
        <div className='mb-3'>
          <label
            htmlFor='password'
            className='block text-grey-700 font-medium mb-2 dark:text-black'
          >
            Password
          </label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-white dark:text-black'
            required
          />
          {formErrors.password && (
            <p className='text-red-500 text-sm'>{formErrors.password}</p>
          )}
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <p className='dark:text-black'>
          Already a member?{' '}
          <Link href='/login'>
            <span className='text-blue-800 hover:text-blue-500 font-semibold'>
              Login
            </span>
          </Link>
        </p>
      </form>
    </div>
  )
}
