import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Image, Briefcase, Sparkles, Upload, ArrowRight, Image as ImageIcon } from 'lucide-react'
import { getActiveResume, getApiErrorMessage, getImages } from '../../api'
import StatCard from '../components/ui/StatCard'
import Card from '../components/ui/Card'
import { StatCardSkeleton } from '../components/ui/Skeleton'
import Badge from '../components/ui/Badge'
import { CATEGORY_LABELS } from '../constants'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [images, setImages]   = useState([])
  const [resume, setResume]   = useState(null)
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    let cancelled = false
    Promise.allSettled([getImages(), getActiveResume()])
      .then(([imagesResult, resumeResult]) => {
        if (cancelled) return
        const errors = []
        if (imagesResult.status === 'fulfilled') {
          setImages(imagesResult.value.data)
        } else {
          errors.push(`Images: ${getApiErrorMessage(imagesResult.reason, 'Could not load images.')}`)
        }
        if (resumeResult.status === 'fulfilled') {
          setResume(resumeResult.value.data?.id ? resumeResult.value.data : null)
        } else {
          errors.push(`Resume: ${getApiErrorMessage(resumeResult.reason, 'Could not load resume.')}`)
        }
        setError(errors.join(' '))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [refreshKey])

  const heroCount = images.filter((i) => i.category === 'hero').length
  const workCount = images.filter((i) => i.category === 'work').length
  const recent    = [...images]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6)

  return (
    <div className="space-y-8">

      {/* ── Welcome header ─────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100">Overview</h2>
          <p className="text-zinc-500 text-sm mt-1">Your portfolio content at a glance</p>
        </div>
        <Link
          to="/admin/images"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
        >
          Manage images <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {error && (
        <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">
          <span>{error}</span>
          <button
            type="button"
            className="font-medium text-red-200 underline underline-offset-2"
            onClick={() => {
              setLoading(true)
              setRefreshKey((key) => key + 1)
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Stat cards ─────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard icon={Image}     label="Total Images"  value={images.length} />
            <StatCard icon={Sparkles}  label="Hero Images"   value={heroCount} />
            <StatCard icon={Briefcase} label="Work Images"   value={workCount} />
            <StatCard
              icon={FileText}
              label="Resume"
              value={resume ? 'Active' : 'None'}
              sublabel={resume?.title ?? 'Upload a PDF resume'}
            />
          </>
        )}
      </div>

      {/* ── Main content row ───────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Recent uploads — spans 2 cols */}
        <Card className="lg:col-span-2 !p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-orange-400" />
              <h3 className="font-semibold text-sm text-zinc-100">Recent uploads</h3>
            </div>
            <Link
              to="/admin/images"
              className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-14 rounded-xl bg-zinc-800/50 animate-pulse" />
              ))}
            </div>
          ) : recent.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-14 text-center px-6">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-zinc-600" />
              </div>
              <p className="text-sm text-zinc-500">No images uploaded yet</p>
              <Link to="/admin/images" className="text-xs text-orange-400 hover:text-orange-300">
                Upload your first image →
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-white/[0.04]">
              {recent.map((img) => (
                <li key={img.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/[0.02] transition">
                  <img
                    src={img.image_url}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover bg-zinc-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 truncate">{img.title}</p>
                    <p className="text-xs text-zinc-600">
                      {new Date(img.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                    </p>
                  </div>
                  <Badge category={img.category}>
                    {CATEGORY_LABELS[img.category] ?? img.category}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {/* Quick actions */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-sm text-zinc-100">Quick actions</h3>
          </div>

          {[
            { label: 'Upload hero image',    to: '/admin/images/hero',    desc: 'Shown on home page' },
            { label: 'Upload work image',    to: '/admin/images/work',    desc: 'Shown in projects gallery' },
            { label: 'Update resume PDF',    to: '/admin/resume',         desc: 'Public resume download' },
            { label: 'View contacts',        to: '/admin/contacts',       desc: 'Messages from visitors' },
          ].map((action) => (
            <Link
              key={action.to}
              to={action.to}
              className="flex items-start justify-between gap-3 p-3.5 rounded-xl border border-white/6 hover:border-orange-500/30 hover:bg-white/[0.03] transition-all duration-200 group"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors truncate">
                  {action.label}
                </p>
                <p className="text-xs text-zinc-600 mt-0.5">{action.desc}</p>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-orange-400 shrink-0 mt-1 transition-colors" />
            </Link>
          ))}
        </Card>

      </div>

    </div>
  )
}
