import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Logo, Input, Loader } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function getErrorMessage(err) {
  if (!err) return 'Login failed'
  if (typeof err.message === 'string' && err.message.trim()) return err.message.trim()
  if (typeof err.response === 'string') return err.response
  if (err.toString && err.toString() !== '[object Object]') return err.toString()
  return 'Login failed. Check email and password, and that your app URL is added in Appwrite Console (Auth → Platforms).'
}

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const login = async (data) => {
    setError('')
    setLoading(true)
    try {
      const session = await authService.login(data.email, data.password)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin({ userData }))
          navigate('/inkwell/')
        } else {
          setError(
            'Session created but user could not be loaded. Add your app URL (e.g. http://localhost:5173) in Appwrite Console → Auth → Platforms (Web), then try again.'
          )
        }
      } else {
        setError('Login failed. Please try again.')
      }
    } catch (err) {
      const msg = getErrorMessage(err)
      setError(msg)
    } finally {
      setLoading(false)
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-surface-500">
            Don&apos;t have an account?{' '}
            <Link to="/inkwell/signup" className="font-medium text-primary-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        {(error || Object.keys(formErrors).length > 0) && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm text-center" role="alert">
            {error || (formErrors.email?.message ?? formErrors.password?.message ?? 'Please fix the errors below.')}
          </div>
        )}
        <form onSubmit={handleSubmit(login)} className="space-y-5">
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
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size="sm" light />
                <span>Signing in…</span>
              </>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
