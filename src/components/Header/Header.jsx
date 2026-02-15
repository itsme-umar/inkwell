import { Container, LogoutBtn, Logo } from '../index'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.status)
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.replace(/\/$/, '') || '/inkwell'

  const navItems = [
    { name: 'Home', slug: '/inkwell/', active: true },
    { name: 'Login', slug: '/inkwell/login', active: !authStatus },
    { name: 'Signup', slug: '/inkwell/signup', active: !authStatus },
    { name: 'All Posts', slug: '/inkwell/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/inkwell/add-post', active: authStatus },
  ]

  const isSelected = (slug) => {
    const normalized = slug.replace(/\/$/, '') || '/inkwell'
    return pathname === normalized
  }

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200/80 bg-white/90 backdrop-blur-md shadow-soft">
      <Container>
        <nav className="flex items-center justify-between h-14 sm:h-16">
          <Link
            to="/inkwell/"
            className="flex items-center gap-2 font-display font-semibold text-stone-800 hover:text-primary-600 transition-colors"
          >
            <Logo />
          </Link>
          <ul className="flex items-center gap-1 sm:gap-2">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      type="button"
                      className={`inline-block px-3 py-2 sm:px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        isSelected(item.slug)
                          ? 'bg-primary-100 text-primary-700 font-semibold'
                          : 'text-stone-600 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                      onClick={() => navigate(item.slug)}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
