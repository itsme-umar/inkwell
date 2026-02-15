/**
 * Circular loader (spinner). Use size "sm" | "md" | "lg" and optional label.
 * Without label, renders only the spinner for inline use (e.g. inside buttons).
 * Use light={true} for white spinner on dark backgrounds (e.g. primary button).
 */
export default function Loader({ size = 'md', label, className = '', light = false }) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-12 h-12 border-[3px]',
  }
  const borderColor = light ? 'border-white border-t-transparent' : 'border-primary-500 border-t-transparent'
  const ringClass = `rounded-full ${borderColor} animate-spin shrink-0 ${sizeClasses[size]}`

  const spinner = (
    <div className={ringClass} role="status" aria-label={label || 'Loading'} />
  )

  if (!label) {
    return <span className={className ? `inline-flex ${className}` : 'inline-flex'}>{spinner}</span>
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      {spinner}
      <p className="text-sm font-medium text-surface-500">{label}</p>
    </div>
  )
}
