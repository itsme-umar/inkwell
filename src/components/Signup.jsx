import { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Logo } from './index'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function getErrorMessage(err) {
  if (!err) return 'Sign up failed'
  if (typeof err.message === 'string' && err.message.trim()) return err.message.trim()
  if (typeof err.response === 'string') return err.response
  if (err.toString && err.toString() !== '[object Object]') return err.toString()
  return 'Sign up failed. Check your details and that your app URL is added in Appwrite Console (Auth → Platforms).'
}

function Signup() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()

  const create = async (data) => {
    setError('')
    try {
      const userAccount = await authService.createAccount(data)
      if (userAccount) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(login({ userData }))
          navigate('/inkwell/login')
        } else {
          setError('Account created but could not load user. Try signing in on the Login page.')
        }
      } else {
        setError('Sign up failed. Please try again.')
      }
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-8 px-4">
      <div className="w-full max-w-md rounded-2xl border border-surface-200 bg-white p-8 shadow-soft animate-fade-in">
        <div className="text-center mb-8">
          <Link to="/inkwell/" className="inline-block mb-6">
            <Logo />
          </Link>
          <h2 className="font-display text-2xl font-bold text-stone-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-surface-500">
            Already have an account?{' '}
            <Link to="/inkwell/login" className="font-medium text-primary-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        {(error || Object.keys(formErrors).length > 0) && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm text-center" role="alert">
            {error || (formErrors.name?.message ?? formErrors.email?.message ?? formErrors.password?.message ?? 'Please fix the errors below.')}
          </div>
        )}
        <form onSubmit={handleSubmit(create)} className="space-y-5">
          <Input
            label="Full name"
            placeholder="Your name"
            {...register('name', { required: 'Full name is required' })}
            error={formErrors.name?.message}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            type="email"
            {...register('email', {
              required: 'Email is required',
              validate: (v) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address',
            })}
            error={formErrors.email?.message}
          />
          <Input
            label="Password"
            placeholder="••••••••"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={formErrors.password?.message}
          />
          <Button type="submit" className="w-full bg-primary-600 hover:bg-primary-700">
            Create account
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
