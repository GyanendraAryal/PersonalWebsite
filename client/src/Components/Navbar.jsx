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
    <nav className="w-full bg-black shadow-md fixed top-0 left-0 z-50" key={location.pathname}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" onClick={closeMobile}>
            <div className="text-xl sm:text-2xl font-bold tracking-wide text-white cursor-pointer">
              <span className="text-white">Gyanendra</span>
              <span className="text-orange-500 text-3xl">.</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium text-sm lg:text-base">
            {navItems.map((item) => (
              <li key={item.path} className="cursor-pointer transition-all duration-300 hover:text-red-400 hover:scale-105">
                <NavLink to={item.path} className={linkClass}>{item.name}</NavLink>
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
        className={`fixed top-0 right-0 h-screen w-[75%] sm:w-[50%] bg-black/50 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out md:hidden ${
          mobileView ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-5">
          <button onClick={closeMobile} className="text-white transition-transform duration-300 hover:rotate-90 hover:scale-110" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col items-start gap-8 px-8 py-6 text-white text-lg font-medium">
          {navItems.map((item) => (
            <li key={item.path} onClick={closeMobile} className="cursor-pointer transition-all duration-300 hover:text-red-400 hover:translate-x-2">
              <NavLink to={item.path} className={linkClass}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
