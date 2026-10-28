import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { clearAdminTokens, getAdminProfile } from '../../api'
import '../admin.css'
import { ToastProvider } from '../hooks/useToast'
import { useSidebar } from '../hooks/useSidebar'
import Sidebar from './Sidebar'
import TopNav from './TopNav'
import MobileDrawer from './MobileDrawer'
import ToastContainer from '../components/ui/Toast'

export default function AdminShell() {
  const { collapsed, mobileOpen, toggleCollapsed, openMobile, closeMobile } = useSidebar()
  const location = useLocation()
  const [authorized, setAuthorized] = useState(null)

  useEffect(() => {
    let active = true
    const handleUnauthorized = () => {
      if (active) setAuthorized(false)
    }

    window.addEventListener('admin:unauthorized', handleUnauthorized)
    getAdminProfile()
      .then(() => {
        if (active) setAuthorized(true)
      })
      .catch(() => {
        clearAdminTokens()
        if (active) setAuthorized(false)
      })

    return () => {
      active = false
      window.removeEventListener('admin:unauthorized', handleUnauthorized)
    }
  }, [])

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center text-sm text-zinc-500">
        Checking admin access…
      </div>
    )
  }

  if (!authorized) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return (
    <ToastProvider>
      <div className="admin-root">
        <Sidebar collapsed={collapsed} onToggle={toggleCollapsed} onNavigate={closeMobile} />
        <MobileDrawer open={mobileOpen} onClose={closeMobile} />
        <TopNav collapsed={collapsed} onMenuClick={openMobile} />

        <main
          className={[
            'pt-14 min-h-screen transition-[padding-left] duration-300',
            collapsed ? 'lg:pl-[64px]' : 'lg:pl-[240px]',
          ].join(' ')}
        >
          <div className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        <ToastContainer />
      </div>
    </ToastProvider>
  )
}
