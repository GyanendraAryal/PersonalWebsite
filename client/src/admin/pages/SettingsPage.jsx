import { Link } from 'react-router-dom'
import { ExternalLink, Moon, PanelLeft, Info } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import { useSidebar } from '../hooks/useSidebar'
import { DJANGO_ADMIN_URL } from '../constants'

function SettingRow({ icon: Icon, iconColor = 'text-orange-400', title, description, control }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-zinc-900/40 border border-white/5 px-4 py-3.5">
      <div className="flex items-center gap-3 min-w-0">
        <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-200 leading-none">{title}</p>
          <p className="text-xs text-zinc-600 mt-0.5 truncate">{description}</p>
        </div>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  )
}

export default function SettingsPage() {
  const { collapsed, toggleCollapsed } = useSidebar()

  return (
    <div className="space-y-6 max-w-2xl">

      {/* ── Appearance ───────────────────────────────── */}
      <Card>
        <h3 className="font-semibold text-sm text-zinc-100 mb-4">Appearance</h3>
        <div className="space-y-2">
          <SettingRow
            icon={Moon}
            iconColor="text-orange-400"
            title="Dark theme"
            description="Enabled by default — matches your portfolio"
            control={
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2 py-0.5">
                On
              </span>
            }
          />
          <SettingRow
            icon={PanelLeft}
            iconColor="text-orange-400"
            title="Sidebar layout"
            description={collapsed ? 'Currently collapsed' : 'Currently expanded'}
            control={
              <Button variant="secondary" size="sm" onClick={toggleCollapsed}>
                {collapsed ? 'Expand' : 'Collapse'}
              </Button>
            }
          />
        </div>
      </Card>

      {/* ── API & integrations ───────────────────────── */}
      <Card>
        <h3 className="font-semibold text-sm text-zinc-100 mb-4">API &amp; integrations</h3>
        <dl className="space-y-3">
          <div className="rounded-xl bg-zinc-900/40 border border-white/5 px-4 py-3.5">
            <dt className="text-[0.6875rem] uppercase tracking-widest text-zinc-600 font-semibold mb-1">
              API base URL
            </dt>
            <dd className="text-sm font-mono text-zinc-300 break-all">
              {import.meta.env.VITE_API_URL ? 'Configured via VITE_API_URL' : 'Local development fallback'}
            </dd>
          </div>
        </dl>
        <div className="mt-3 flex items-start gap-2 rounded-xl border border-blue-500/15 bg-blue-500/6 px-4 py-3">
          <Info className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-xs text-zinc-500">
            To change the API URL, update{' '}
            <code className="text-zinc-400">VITE_API_URL</code> in your{' '}
            <code className="text-zinc-400">client/.env</code> file and restart the dev server.
          </p>
        </div>
      </Card>

      {/* ── Django Admin ─────────────────────────────── */}
      <Card>
        <h3 className="font-semibold text-sm text-zinc-100 mb-1">Django Admin</h3>
        <p className="text-xs text-zinc-600 mb-4">
          Advanced database management, user administration, and raw model editing.
        </p>
        <a href={DJANGO_ADMIN_URL} target="_blank" rel="noopener noreferrer">
          <Button variant="secondary">
            <ExternalLink className="h-4 w-4" />
            Open Django Admin
          </Button>
        </a>
      </Card>

      {/* ── Back link ────────────────────────────────── */}
      <p className="text-xs text-zinc-700">
        <Link to="/" className="text-orange-400 hover:text-orange-300 transition-colors">
          ← Back to portfolio site
        </Link>
      </p>

    </div>
  )
}
