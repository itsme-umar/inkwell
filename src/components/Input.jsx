import React from 'react'
import { useId } from 'react'

const Input = React.forwardRef(function Input(
  { label, type = 'text', className = '', error, ...props },
  ref
) {
  const id = useId()
  return (
    <div className="w-full">
      {label && (
        <label
          className="block text-sm font-medium text-stone-700 mb-1.5"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-4 py-2.5 rounded-lg border bg-white text-stone-800
          placeholder:text-surface-400
          focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500
          transition-colors duration-200
          ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : 'border-surface-300'}
          ${className}
        `}
        ref={ref}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        id={id}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export default Input
