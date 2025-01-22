'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser } from '../api/register'
import Link from 'next/link'

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

  const labelStyles = 'block text-grey-700 font-medium mb-2'
  const inputStyles = 'w-full px-3 py-2 border border-gray-300 rounded-md'
  const buttonsStyles =
    'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { name, email, password } = values
    const errors = {}

    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address.'
    }

    if (!passwordRegex.test(password)) {
      errors.password =
        'Password must be at least 6 characters long and contain both uppercase and lowercase letters.'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setLoading(false)
      return
    }

    try {
      const result = await registerUser(name, email, password) // Register user
      if (result?.error) {
        return
      }
      toast.success('Redirecting to login')
      router.push('/login') // Redirect to login after successful registration
      // }
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
          <label htmlFor='name' className={labelStyles}>
            Name
          </label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            className={inputStyles}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className={labelStyles}>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={values.email}
            onChange={handleChange}
            className={inputStyles}
            required
          />
          {formErrors.email && (
            <p className='text-red-500 text-sm'>{formErrors.email}</p>
          )}
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className={labelStyles}>
            Password
          </label>
          <input
            type='password'
            name='password'
            value={values.password}
            onChange={handleChange}
            className={inputStyles}
            required
          />
          {formErrors.password && (
            <p className='text-red-500 text-sm'>{formErrors.password}</p>
          )}
        </div>
        <button type='submit' className={buttonsStyles} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        <p>
          Already a member.?{' '}
          <Link href='/login'>
            <span className='text-blue-800 hover:text-blue-500  font-semibold  '>
              Login
            </span>
          </Link>{' '}
        </p>
      </form>
    </div>
  )
}
