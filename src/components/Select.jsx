import React from 'react'
import { useId } from 'react'

function Select({ options = [], label, className = '', ...props }, ref) {
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
      <select
        {...props}
        id={id}
        ref={ref}
        className={`
          w-full px-4 py-2.5 rounded-lg border border-surface-300 bg-white text-stone-800
          focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500
          transition-colors duration-200
          ${className}
        `}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default React.forwardRef(Select)
