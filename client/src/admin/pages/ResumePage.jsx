import { useState } from 'react'
import { CheckCircle2, Download, ExternalLink, FileText, Trash2 } from 'lucide-react'
import { useResume } from '../hooks/useResume'
import { useToast } from '../hooks/useToast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import UploadZone from '../components/upload/UploadZone'
import EmptyState from '../components/ui/EmptyState'
import { Skeleton } from '../components/ui/Skeleton'

export default function ResumePage() {
  const { resume, loading, error, refetch, upload, remove } = useResume()
  const { toast } = useToast()
  const [title,     setTitle]     = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress,  setProgress]  = useState(0)

  const handleFiles = async (files) => {
    const file = files[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files are allowed.')
      return
    }
    const fd = new FormData()
    fd.append('file',      file)
    fd.append('title',     title || file.name.replace(/\.pdf$/i, ''))
    fd.append('is_active', 'true')
    setUploading(true)
    setProgress(0)
    try {
      await upload(fd, (e) => setProgress(e.total ? (e.loaded / e.total) * 100 : 0))
      setTitle('')
      toast.success(resume ? 'Resume replaced successfully' : 'Resume uploaded')
    } catch (err) {
      toast.error(err.response?.data?.file?.[0] || 'Upload failed.')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDelete = async () => {
    if (!resume?.id || !confirm('Delete the current resume? This cannot be undone.')) return
    try {
      await remove()
      toast.success('Resume deleted')
    } catch {
      toast.error('Delete failed.')
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">

      {/* ── Current resume card ──────────────────────── */}
      <Card>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="h-4 w-4 text-orange-400" />
          <h3 className="font-semibold text-sm text-zinc-100">Active resume</h3>
        </div>
        <p className="text-xs text-zinc-600 mb-6">The PDF displayed on your public portfolio.</p>

        {error ? (
          <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3 text-sm text-red-300">
            <span>{error}</span>
            <Button variant="secondary" size="sm" onClick={refetch}>
              Retry
            </Button>
          </div>
        ) : loading && !resume ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-10 w-full max-w-xs" />
          </div>
        ) : resume ? (
          <div className="space-y-5">

            {/* Status row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{resume.title}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">
                    Uploaded {new Date(resume.uploaded_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-1.5 text-[0.6875rem] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2 py-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="h-4 w-4" /> Preview
                  </Button>
                </a>
                <a href={resume.file_url} download>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4" /> Download
                  </Button>
                </a>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
              </div>
            </div>

            {/* Embedded preview */}
            <div className="rounded-xl border border-white/6 overflow-hidden bg-zinc-950 h-[500px]">
              <iframe
                title="Resume PDF preview"
                src={resume.file_url}
                className="w-full h-full"
              />
            </div>

          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No resume uploaded"
            description="Upload a PDF below to display on your portfolio."
          />
        )}
      </Card>

      {/* ── Upload card ──────────────────────────────── */}
      <Card>
        <h3 className="font-semibold text-sm text-zinc-100 mb-1">
          {resume ? 'Replace resume' : 'Upload resume'}
        </h3>
        {resume && (
          <p className="text-xs text-zinc-600 mb-4">
            Uploading a new file automatically deactivates the current one.
          </p>
        )}

        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-sm rounded-xl bg-zinc-800/80 border border-white/8 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 mb-4 focus:outline-none focus:border-orange-500/60 transition-colors"
        />

        <UploadZone
          variant="pdf"
          accept=".pdf,application/pdf"
          onFiles={handleFiles}
          disabled={uploading}
          uploading={uploading}
          progress={progress}
          label="Drop PDF resume here or click to select"
          hint="PDF only — max 10 MB"
        />
      </Card>

    </div>
  )
}
