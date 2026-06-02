import { useState } from 'react'
import { FileText, Trash2, Download, ExternalLink } from 'lucide-react'
import { useResume } from '../hooks/useResume'
import { useToast } from '../hooks/useToast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import UploadZone from '../components/upload/UploadZone'
import EmptyState from '../components/ui/EmptyState'
import { Skeleton } from '../components/ui/Skeleton'

export default function ResumePage() {
  const { resume, loading, upload, remove } = useResume()
  const { toast } = useToast()
  const [title, setTitle] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFiles = async (files) => {
    const file = files[0]
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Only PDF files allowed.')
      return
    }
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', title || file.name.replace(/\.pdf$/i, ''))
    fd.append('is_active', 'true')
    setUploading(true)
    setProgress(0)
    try {
      await upload(fd, (e) => {
        setProgress(e.total ? (e.loaded / e.total) * 100 : 0)
      })
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
    if (!resume?.id || !confirm('Delete current resume?')) return
    try {
      await remove()
      toast.success('Resume deleted')
    } catch {
      toast.error('Delete failed.')
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <Card>
        <h3 className="font-semibold text-zinc-100 mb-1 flex items-center gap-2">
          <FileText className="h-5 w-5 text-violet-400" />
          Current Resume
        </h3>
        <p className="text-xs text-zinc-500 mb-6">Active PDF shown on your portfolio</p>

        {loading && !resume ? (
          <div className="space-y-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-10 w-full max-w-md" />
          </div>
        ) : resume ? (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <p className="text-lg font-medium text-zinc-100">{resume.title}</p>
                <p className="text-sm text-zinc-500 mt-1">
                  Uploaded {new Date(resume.uploaded_at).toLocaleDateString(undefined, {
                    dateStyle: 'medium',
                  })}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={resume.file_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="h-4 w-4" />
                    Open
                  </Button>
                </a>
                <a href={resume.file_url} download>
                  <Button variant="secondary" size="sm">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </a>
                <Button variant="danger" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-950 h-[480px]">
              <iframe
                title="Resume preview"
                src={resume.file_url}
                className="w-full h-full"
              />
            </div>
          </div>
        ) : (
          <EmptyState
            icon={FileText}
            title="No active resume"
            description="Upload a PDF below to display on your portfolio."
          />
        )}
      </Card>

      <Card>
        <h3 className="font-semibold text-zinc-100 mb-1">
          {resume ? 'Replace Resume' : 'Upload New Resume'}
        </h3>
        {resume && (
          <p className="text-xs text-zinc-500 mb-4">
            Uploading a new file will automatically deactivate the current one.
          </p>
        )}
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full max-w-md rounded-xl bg-zinc-800/80 border border-white/10 px-4 py-2.5 text-sm text-zinc-100 mb-4 focus:outline-none focus:border-violet-500/50"
        />
        <UploadZone
          variant="pdf"
          accept=".pdf,application/pdf"
          onFiles={handleFiles}
          disabled={uploading}
          uploading={uploading}
          progress={progress}
          label="Drop PDF resume here"
          hint="PDF only — max 10MB"
        />
      </Card>
    </div>
  )
}
