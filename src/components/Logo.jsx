import { Link } from 'react-router-dom'

function Logo({ className = '' }) {
  return (
    <span
      className={`font-display font-bold text-xl sm:text-2xl text-stone-800 ${className}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      Ink<span className="text-primary-600">Well</span>
    </span>
  )
}

export default Logo
