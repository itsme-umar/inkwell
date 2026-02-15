import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from './Loader'

export default function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true)
  const navigate = useNavigate()
  const authStatus = useSelector((state) => state.status)

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate('/inkwell/login')
    } else if (!authentication && authStatus) {
      navigate('/inkwell/')
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  if (loader) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center">
        <Loader size="md" label="Loading..." />
      </div>
    )
  }

  return <>{children}</>
}
