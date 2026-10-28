import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { Briefcase, FileText, Grid, Image, LayoutDashboard, Mail, Settings, User, X } from 'lucide-react'

const LINKS = [
  { to: '/admin', end: true, label: 'Dashboard',   icon: LayoutDashboard, group: null },
  { to: '/admin/images/hero',  label: 'Hero Images',  icon: Image,         group: 'Images' },
  { to: '/admin/images/work',  label: 'Work Images',  icon: Briefcase,     group: 'Images' },
  { to: '/admin/images/about', label: 'About Images', icon: User,          group: 'Images' },
  { to: '/admin/images', end: true, label: 'All Images', icon: Grid,       group: 'Images' },
  { to: '/admin/resume',   label: 'Resume',   icon: FileText, group: 'Content' },
  { to: '/admin/contacts', label: 'Contacts', icon: Mail,     group: 'Content' },
  { to: '/admin/settings', label: 'Settings', icon: Settings, group: 'Content' },
]

export default function MobileDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="fixed left-0 top-0 z-[60] h-full w-[min(260px,85vw)] bg-[#141416] border-r border-white/5 lg:hidden flex flex-col shadow-2xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-14 px-4 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                  <span className="text-white text-xs font-bold">G</span>
                </div>
                <span className="font-semibold text-sm text-zinc-100">Portfolio CMS</span>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-2 py-4">
              {['', 'Images', 'Content'].map((group) => {
                const items = LINKS.filter((l) => (l.group ?? '') === group)
                if (items.length === 0) return null
                return (
                  <div key={group} className={group ? 'mt-5' : ''}>
                    {group && (
                      <p className="px-3 mb-1.5 text-[0.625rem] font-semibold uppercase tracking-widest text-zinc-600">
                        {group}
                      </p>
                    )}
                    <div className="space-y-0.5">
                      {items.map(({ to, end, label, icon: Icon }) => (
                        <NavLink
                          key={to}
                          to={to}
                          end={end}
                          onClick={onClose}
                          className={({ isActive }) =>
                            [
                              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                              isActive
                                ? 'bg-orange-500/15 text-white border border-orange-500/20'
                                : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5',
                            ].join(' ')
                          }
                        >
                          <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                          {label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )
              })}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
