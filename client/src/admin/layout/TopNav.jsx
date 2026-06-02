import { Link, useLocation } from 'react-router-dom'
import { Menu, ExternalLink } from 'lucide-react'
import Button from '../components/ui/Button'

const titles = {
  '/admin': 'Dashboard',
  '/admin/images': 'All Images',
  '/admin/images/hero': 'Hero Images',
  '/admin/images/work': 'Work Images',
  '/admin/images/about': 'About Images',
  '/admin/resume': 'Resume Manager',
  '/admin/contacts': 'Contacts',
  '/admin/settings': 'Settings',
}

export default function TopNav({ collapsed, onMenuClick }) {
  const { pathname } = useLocation()
  const title =
    titles[pathname] ||
    (pathname.startsWith('/admin/images') ? 'Images' : 'Admin')

  return (
    <header
      className={[
        'fixed top-0 right-0 z-30 h-16 admin-glass border-b border-white/5 flex items-center justify-between px-4 lg:px-8 transition-[left] duration-300',
        collapsed ? 'left-0 lg:left-[80px]' : 'left-0 lg:left-[280px]',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-zinc-600 font-medium">
            CMS
          </p>
          <h1 className="text-lg font-semibold text-zinc-100 leading-tight">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/" className="hidden sm:block">
          <Button variant="ghost" size="sm">
            <ExternalLink className="h-4 w-4" />
            View site
          </Button>
        </Link>
      </div>
    </header>
  )
}
