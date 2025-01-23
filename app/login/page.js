'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { setToken } from '@/features/auth/AuthSlice'
import { useDispatch } from 'react-redux'
import { ValidateInputs } from '@/util/Validation'

const initialState = {
  email: '',
  password: '',
}

export default function LoginForm() {
  const [values, setValues] = useState(initialState)
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormErrors({})

    //Input validation on submit
    const errors = ValidateInputs(values)

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    try {
      setLoading(true)
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.ok) {
        if (result.token) {
          dispatch(setToken(result.token))
        }
        toast.success('Redirecting to Tasks')
        router.push('/tasks')
      } else {
        toast.error(result.error || 'Login failed')
      }
    } catch (err) {
      toast.error(err.message || 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='flex justify-center font-semibold text-xl p-2'>Login</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-3'>
          <label
            htmlFor='email'
            className='block text-grey-700 font-medium mb-2'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
          {formErrors.email && (
            <p className='text-red-500 text-sm'>{formErrors.email}</p>
          )}
        </div>
        <div className='mb-3'>
          <label
            htmlFor='password'
            className='block text-grey-700 font-medium mb-2'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
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
        <p>
          Not a member?{' '}
          <Link href='/register'>
            <span className='text-blue-800 hover:text-blue-500 font-semibold'>
              Register
            </span>
          </Link>
        </p>
      </form>
    </div>
  )
}
