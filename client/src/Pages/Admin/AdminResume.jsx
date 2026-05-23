import { useEffect, useRef, useState } from 'react'
import { getActiveResume, uploadResume, deleteResume } from '../../api'

const AdminResume = () => {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [title, setTitle] = useState('')
  const fileRef = useRef()

  useEffect(() => {
    let cancelled = false
    const fetchResume = async () => {
      setLoading(true)
      try {
        const res = await getActiveResume()
        if (!cancelled) setResume(res.data?.id ? res.data : null)
      } catch {
        if (!cancelled) setError('Failed to load resume.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchResume()
    return () => { cancelled = true }
  }, [])

  const handleUpload = async (e) => {
    e.preventDefault()
    const file = fileRef.current?.files[0]
    if (!file) return setError('Select a PDF file.')
    if (!file.name.toLowerCase().endsWith('.pdf')) return setError('Only PDF files allowed.')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', title || file.name.replace('.pdf', ''))
    fd.append('is_active', 'true')
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await uploadResume(fd)
      setResume(res.data)
      setTitle('')
      fileRef.current.value = ''
      setSuccess('Resume uploaded and set as active.')
    } catch (err) {
      setError(err.response?.data?.file?.[0] || 'Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!resume?.id || !confirm('Delete current resume?')) return
    setLoading(true)
    setError('')
    try {
      await deleteResume(resume.id)
      setResume(null)
      setSuccess('Resume deleted.')
    } catch {
      setError('Delete failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Resume Management</h1>

      {/* Current Resume */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-orange-500 mb-4">Current Active Resume</h2>
        {loading && !resume ? (
          <p className="text-slate-400 text-sm">Loading…</p>
        ) : resume ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-medium">{resume.title}</p>
              <p className="text-slate-400 text-sm mt-1">
                Uploaded: {new Date(resume.uploaded_at).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-3">
              <a href={resume.file_url} target="_blank" rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-xl text-sm font-medium transition">
                View PDF
              </a>
              <a href={resume.file_url} download
                className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-xl text-sm transition">
                Download
              </a>
              <button onClick={handleDelete} disabled={loading}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2 rounded-xl text-sm transition disabled:opacity-50">
                Delete
              </button>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No active resume. Upload one below.</p>
        )}
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-lg font-semibold text-orange-500">
          {resume ? 'Replace Resume' : 'Upload Resume'}
        </h2>
        {resume && (
          <p className="text-slate-400 text-sm">
            Uploading a new resume will automatically deactivate the current one.
          </p>
        )}
        <div className="grid sm:grid-cols-2 gap-4">
          <input type="text" placeholder="Title (optional)" value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500" />
          <input ref={fileRef} type="file" accept=".pdf"
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm file:mr-3 file:bg-orange-500 file:border-0 file:text-white file:rounded-lg file:px-3 file:py-1 file:cursor-pointer" />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}
        <button type="submit" disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-2 rounded-xl text-sm font-medium transition">
          {loading ? 'Uploading…' : 'Upload PDF'}
        </button>
      </form>
    </div>
  )
}

export default AdminResume
