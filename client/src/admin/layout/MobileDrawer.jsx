import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
  Briefcase,
  FileText,
  Image,
  LayoutDashboard,
  Mail,
  Settings,
  Sparkles,
  User,
  X,
} from 'lucide-react'

const links = [
  { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/images/hero', label: 'Hero Images', icon: Image },
  { to: '/admin/images/work', label: 'Work Images', icon: Briefcase },
  { to: '/admin/images/about', label: 'About Images', icon: User },
  { to: '/admin/images', end: true, label: 'All Images', icon: Image },
  { to: '/admin/resume', label: 'Resume Manager', icon: FileText },
  { to: '/admin/contacts', label: 'Contacts', icon: Mail },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed left-0 top-0 z-50 h-full w-[min(300px,88vw)] admin-glass border-r border-white/5 lg:hidden flex flex-col"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between h-16 px-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-semibold text-sm">Portfolio CMS</span>
              </div>
              <button type="button" onClick={onClose} className="p-2 text-zinc-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {links.map(({ to, end, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium',
                      isActive
                        ? 'bg-violet-600/20 text-white'
                        : 'text-zinc-400 hover:bg-white/5',
                    ].join(' ')
                  }
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
