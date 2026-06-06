import { useState } from 'react'
import { NavLink, useLocation, Link } from 'react-router-dom'

const Navbar = () => {
  const [mobileView, setMobileView] = useState(false)
  const location = useLocation()

  // Close mobile menu when route changes — use key to reset state instead of effect
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/service' },
    { name: 'Work', path: '/work' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ]

  const linkClass = ({ isActive }) =>
    `relative transition-all duration-300 ${
      isActive
        ? 'text-orange-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-orange-500'
        : 'text-white hover:text-orange-400'
    }`

  const closeMobile = () => setMobileView(false)

  return (
    <nav className="w-full bg-black/80 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5 fixed top-0 left-0 z-50" key={location.pathname}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" onClick={closeMobile}>
            <div className="text-xl sm:text-2xl font-bold tracking-wide cursor-pointer group">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent group-hover:from-orange-400 group-hover:via-orange-500 group-hover:to-orange-400 transition-all duration-300">Gyanendra</span>
              <span className="text-orange-500 text-3xl group-hover:scale-110 inline-block transition-transform duration-300">.</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm lg:text-base">
            {navItems.map((item) => (
              <li key={item.path} className="relative cursor-pointer group">
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => 
                    `relative px-3 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'text-orange-400 bg-orange-500/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 transform -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileView(true)}
            className="md:hidden text-white transition-transform duration-300 hover:scale-110"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5h16" /><path d="M4 12h16" /><path d="M4 19h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Overlay */}
      <div
        onClick={closeMobile}
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          mobileView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[50%] bg-black/90 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out md:hidden ${
          mobileView ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={closeMobile} className="text-white p-2 rounded-full hover:bg-white/10 transition-all duration-300 hover:rotate-90 hover:scale-110" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-2 px-6 py-4 text-white text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.path} onClick={closeMobile}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `block px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'text-orange-400 bg-orange-500/10 border-l-2 border-orange-400'
                      : 'text-gray-300 hover:text-white hover:bg-white/5 hover:translate-x-2'
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
