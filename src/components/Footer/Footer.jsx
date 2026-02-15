import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row flex-wrap gap-8 sm:gap-12 lg:gap-16">
          <div className="flex-1 min-w-[200px]">
            <Link to="/megaBlog/" className="inline-block mb-4">
              <Logo />
            </Link>
            <p className="text-sm text-surface-500 max-w-xs">
              Share your stories and connect with readers. megaBlog — Write. Share. Connect.
            </p>
            <p className="text-sm text-surface-500 mt-4">
              &copy; {new Date().getFullYear()} megaBlog. All rights reserved.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/megaBlog/" className="text-stone-600 hover:text-primary-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/megaBlog/all-posts" className="text-stone-600 hover:text-primary-600 transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link to="/megaBlog/login" className="text-stone-600 hover:text-primary-600 transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/megaBlog/signup" className="text-stone-600 hover:text-primary-600 transition-colors">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-surface-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/megaBlog/" className="text-stone-600 hover:text-primary-600 transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/megaBlog/" className="text-stone-600 hover:text-primary-600 transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
