'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser } from '../api/register'
import Link from 'next/link'
import { ValidateInputs } from '@/util/Validation'

const initialState = {
  name: '',
  email: '',
  password: '',
}

export default function RegisterForm() {
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
      toast.success('Redirecting to login')
      router.push('/login')
    } catch (err) {
      toast.error(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md'>
      <h2 className='flex justify-center font-semibold text-xl p-2'>
        Register
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='mb-3'>
          <label
            htmlFor='name'
            className='block text-grey-700 font-medium mb-2'
          >
            Name
          </label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            required
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='email'
            className='block text-grey-700 font-medium mb-2'
          >
            Email
          </label>
          <input
            type='email'
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
