import { Link, useLocation } from 'react-router-dom'
import { Menu, ExternalLink } from 'lucide-react'

const TITLES = {
  '/admin':              { label: 'Overview',       sub: 'Dashboard' },
  '/admin/images':       { label: 'All Images',     sub: 'Images' },
  '/admin/images/hero':  { label: 'Hero Images',    sub: 'Images' },
  '/admin/images/work':  { label: 'Work Images',    sub: 'Images' },
  '/admin/images/about': { label: 'About Images',   sub: 'Images' },
  '/admin/resume':       { label: 'Resume Manager', sub: 'Content' },
  '/admin/contacts':     { label: 'Contacts',       sub: 'Content' },
  '/admin/settings':     { label: 'Settings',       sub: 'Admin' },
}

export default function TopNav({ collapsed, onMenuClick }) {
  const { pathname } = useLocation()
  const title =
    TITLES[pathname] ||
    (pathname.startsWith('/admin/images') ? { label: 'Images', sub: 'Images' } : { label: 'Admin', sub: '' })

  return (
    <header
      className={[
        'fixed top-0 right-0 z-30 h-14 bg-[#111113]/90 backdrop-blur-md',
        'border-b border-white/5',
        'flex items-center justify-between px-4 lg:px-6',
        'transition-[left] duration-300',
        collapsed ? 'left-0 lg:left-[64px]' : 'left-0 lg:left-[240px]',
      ].join(' ')}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-zinc-500 hover:bg-white/5 hover:text-white transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          {title.sub && (
            <p className="text-[0.6rem] uppercase tracking-widest text-zinc-600 font-medium leading-none mb-0.5">
              {title.sub}
            </p>
          )}
          <h1 className="text-sm font-semibold text-zinc-100 leading-tight">{title.label}</h1>
        </div>
      </div>

      {/* Right */}
      <Link
        to="/"
        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-all duration-200"
        aria-label="View portfolio site"
      >
        <ExternalLink className="h-3.5 w-3.5" />
        View site
      </Link>
    </header>
  )
}
