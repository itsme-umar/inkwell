function Button({
  children,
  type = 'button',
  bgColor = 'bg-primary-600',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`
        inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-medium
        transition-all duration-200
        hover:opacity-90 active:scale-[0.98]
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        disabled:opacity-50 disabled:pointer-events-none
        ${bgColor} ${textColor} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
