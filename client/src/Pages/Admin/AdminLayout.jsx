import { Link, Outlet, useLocation } from 'react-router-dom'

const AdminLayout = () => {
  const { pathname } = useLocation()

  const navItems = [
    { to: '/admin/images', label: 'Images' },
    { to: '/admin/resume', label: 'Resume' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <nav className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex items-center gap-6">
        <span className="text-orange-500 font-bold text-lg">Admin</span>
        {navItems.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`text-sm font-medium transition ${
              pathname.startsWith(to)
                ? 'text-orange-500'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {label}
          </Link>
        ))}
        <Link to="/" className="ml-auto text-sm text-slate-500 hover:text-white transition">
          ← Back to Portfolio
        </Link>
      </nav>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
