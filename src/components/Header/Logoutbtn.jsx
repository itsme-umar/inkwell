import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().finally(() => dispatch(logout()))
  }

  return (
    <button
      type="button"
      className="inline-block px-4 py-2 rounded-lg text-sm font-medium text-stone-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200"
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn
