import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Image, Briefcase, Sparkles, Upload } from 'lucide-react'
import { getActiveResume, getImages } from '../../api'
import StatCard from '../components/ui/StatCard'
import Card from '../components/ui/Card'
import { StatCardSkeleton } from '../components/ui/Skeleton'
import Badge from '../components/ui/Badge'
import { CATEGORY_LABELS } from '../constants'

export default function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [resume, setResume] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [imgRes, resRes] = await Promise.all([getImages(), getActiveResume()])
        if (!cancelled) {
          setImages(imgRes.data)
          setResume(resRes.data?.id ? resRes.data : null)
        }
      } catch {
        /* handled by empty stats */
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const heroCount = images.filter((i) => i.category === 'hero').length
  const workCount = images.filter((i) => i.category === 'work').length
  const recent = [...images]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 5)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-zinc-100">Welcome back</h2>
        <p className="text-zinc-500 text-sm mt-1">
          Overview of your portfolio content
        </p>
      </div>

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
            <StatCard
              icon={Image}
              label="Total Images"
              value={images.length}
              accent="violet"
            />
            <StatCard
              icon={Sparkles}
              label="Hero Images"
              value={heroCount}
              accent="cyan"
            />
            <StatCard
              icon={Briefcase}
              label="Work Images"
              value={workCount}
              accent="amber"
            />
            <StatCard
              icon={FileText}
              label="Resume Status"
              value={resume ? 'Active' : 'None'}
              sublabel={resume?.title || 'Upload a PDF resume'}
              accent="emerald"
            />
          </>
        )}
      </div>

      <Card>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Upload className="h-5 w-5 text-violet-400" />
            <h3 className="font-semibold text-zinc-100">Recent Uploads</h3>
          </div>
          <Link
            to="/admin/images"
            className="text-xs text-violet-400 hover:text-violet-300 font-medium"
          >
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-2xl bg-zinc-800/50 animate-pulse" />
            ))}
          </div>
        ) : recent.length === 0 ? (
          <p className="text-sm text-zinc-500 py-6 text-center">No uploads yet.</p>
        ) : (
          <ul className="space-y-2">
            {recent.map((img) => (
              <li
                key={img.id}
                className="flex items-center gap-4 rounded-2xl p-2 hover:bg-white/[0.03] transition"
              >
                <img
                  src={img.image_url}
                  alt=""
                  className="h-12 w-12 rounded-xl object-cover bg-zinc-800"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-200 truncate">{img.title}</p>
                  <p className="text-xs text-zinc-500">
                    {new Date(img.created_at).toLocaleDateString()}
                  </p>
                </div>
                <Badge category={img.category}>
                  {CATEGORY_LABELS[img.category]}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  )
}
