import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Briefcase,
  ChevronLeft,
  FileText,
  Image,
  LayoutDashboard,
  Mail,
  Settings,
  Sparkles,
  User,
} from 'lucide-react'

const navGroups = [
  {
    items: [{ to: '/admin', end: true, label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    label: 'Images',
    items: [
      { to: '/admin/images/hero', label: 'Hero Images', icon: Image },
      { to: '/admin/images/work', label: 'Work Images', icon: Briefcase },
      { to: '/admin/images/about', label: 'About Images', icon: User },
      { to: '/admin/images', end: true, label: 'All Images', icon: Image },
    ],
  },
  {
    items: [
      { to: '/admin/resume', label: 'Resume Manager', icon: FileText },
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
      className={({ isActive }) =>
        [
          'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
          isActive
            ? 'bg-gradient-to-r from-violet-600/25 to-cyan-600/15 text-white border border-violet-500/20'
            : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5',
          collapsed ? 'justify-center px-2' : '',
        ].join(' ')
      }
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}

export default function Sidebar({ collapsed, onToggle, onNavigate }) {
  return (
    <aside
      className={[
        'hidden lg:flex flex-col fixed left-0 top-0 z-40 h-screen admin-glass border-r border-white/5 transition-[width] duration-300',
        collapsed ? 'w-[80px]' : 'w-[280px]',
      ].join(' ')}
    >
      <div
        className={[
          'flex items-center h-16 border-b border-white/5 shrink-0',
          collapsed ? 'justify-center px-2' : 'px-5 gap-3',
        ].join(' ')}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-600 shrink-0">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-semibold text-sm truncate">Portfolio CMS</p>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Admin</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label && !collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-600">
                {group.label}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem key={item.to} {...item} collapsed={collapsed} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        <button
          type="button"
          onClick={onToggle}
          className={[
            'flex w-full items-center gap-2 rounded-2xl px-3 py-2.5 text-sm text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition',
            collapsed ? 'justify-center' : '',
          ].join(' ')}
        >
          <motion.span animate={{ rotate: collapsed ? 180 : 0 }}>
            <ChevronLeft className="h-4 w-4" />
          </motion.span>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  )
}
