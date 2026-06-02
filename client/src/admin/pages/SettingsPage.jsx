import { Link } from 'react-router-dom'
import { ExternalLink, Moon, PanelLeft } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useSidebar } from '../hooks/useSidebar'
import { DJANGO_ADMIN_URL } from '../constants'

export default function SettingsPage() {
  const { collapsed, toggleCollapsed } = useSidebar()

  return (
    <div className="space-y-6 max-w-2xl">
      <Card>
        <h3 className="font-semibold text-zinc-100 mb-4">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl bg-zinc-900/50 px-4 py-3 border border-white/5">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-violet-400" />
              <div>
                <p className="text-sm font-medium text-zinc-200">Dark theme</p>
                <p className="text-xs text-zinc-500">Enabled by default</p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-medium">On</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-zinc-900/50 px-4 py-3 border border-white/5">
            <div className="flex items-center gap-3">
              <PanelLeft className="h-5 w-5 text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-zinc-200">Collapsed sidebar</p>
                <p className="text-xs text-zinc-500">Saved to your browser</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" onClick={toggleCollapsed}>
              {collapsed ? 'Expand' : 'Collapse'}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-zinc-100 mb-4">API & integrations</h3>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-zinc-500 text-xs uppercase tracking-wider">API base URL</dt>
            <dd className="text-zinc-300 font-mono text-xs mt-1 break-all">
              {import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'}
            </dd>
          </div>
        </dl>
      </Card>

      <Card>
        <h3 className="font-semibold text-zinc-100 mb-2">Django Admin</h3>
        <p className="text-sm text-zinc-500 mb-4">
          Advanced model editing and database tools are available in Django Admin.
        </p>
        <a href={DJANGO_ADMIN_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">
            <ExternalLink className="h-4 w-4" />
            Open Django Admin
          </Button>
        </a>
      </Card>

      <p className="text-xs text-zinc-600">
        <Link to="/" className="text-violet-400 hover:text-violet-300">
          ← Back to portfolio site
        </Link>
      </p>
    </div>
  )
}
