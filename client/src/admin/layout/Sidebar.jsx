import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Briefcase,
  ChevronLeft,
  FileText,
  Grid,
  Image,
  LayoutDashboard,
  Mail,
  Settings,
  User,
} from 'lucide-react'

const NAV_GROUPS = [
  {
    items: [
      { to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Images',
    items: [
      { to: '/admin/images/hero',  label: 'Hero',   icon: Image },
      { to: '/admin/images/work',  label: 'Work',   icon: Briefcase },
      { to: '/admin/images/about', label: 'About',  icon: User },
      { to: '/admin/images', end: true, label: 'All Images', icon: Grid },
    ],
  },
  {
    label: 'Content',
    items: [
      { to: '/admin/resume',   label: 'Resume',   icon: FileText },
      { to: '/admin/contacts', label: 'Contacts', icon: Mail },
      { to: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

function NavItem({ to, end, label, icon: Icon, collapsed, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-orange-500/15 text-white border border-orange-500/20'
            : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5',
          collapsed ? 'justify-center px-2.5' : '',
        ].join(' ')
      }
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}

export default function Sidebar({ collapsed, onToggle, onNavigate }) {
  return (
    <aside
      className={[
        'hidden lg:flex flex-col fixed left-0 top-0 z-40 h-screen',
        'bg-[#141416] border-r border-white/5',
        'transition-[width] duration-300',
        collapsed ? 'w-[64px]' : 'w-[240px]',
      ].join(' ')}
    >
      {/* Brand */}
      <div
        className={[
          'flex items-center h-14 border-b border-white/5 shrink-0 px-4 gap-3',
          collapsed ? 'justify-center px-0' : '',
        ].join(' ')}
      >
        <div className="h-7 w-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 shrink-0">
          <span className="text-white text-xs font-bold">G</span>
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-semibold text-xs text-zinc-100 truncate">Portfolio CMS</p>
            <p className="text-[0.625rem] text-zinc-600 uppercase tracking-wider">Admin</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-5" aria-label="Admin navigation">
        {NAV_GROUPS.map((group, gi) => (
          <div key={gi}>
            {group.label && !collapsed && (
              <p className="px-3 mb-1.5 text-[0.625rem] font-semibold uppercase tracking-widest text-zinc-600">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavItem
                  key={item.to}
                  {...item}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-white/5">
        <button
          type="button"
          onClick={onToggle}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className={[
            'flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs text-zinc-600',
            'hover:bg-white/5 hover:text-zinc-400 transition-colors',
            collapsed ? 'justify-center px-0' : '',
          ].join(' ')}
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronLeft className="h-4 w-4" />
          </motion.span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
