import { useEffect, useRef, useState } from 'react'
import { getImages, uploadImage, updateImage, deleteImage } from '../../api'

const CATEGORIES = ['hero', 'work', 'about', 'other']

const AdminImages = () => {
  const [images, setImages] = useState([])
  const [filter, setFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({ title: '', category: '' })
  const fileRef = useRef()
  const [form, setForm] = useState({ title: '', category: 'other' })

  useEffect(() => {
    let cancelled = false
    const fetchImages = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await getImages(filter || undefined)
        if (!cancelled) setImages(res.data)
      } catch {
        if (!cancelled) setError('Failed to load images.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchImages()
    return () => { cancelled = true }
  }, [filter])

  const handleUpload = async (e) => {
    e.preventDefault()
    const file = fileRef.current?.files[0]
    if (!file) return setError('Select an image file.')
    const fd = new FormData()
    fd.append('image', file)
    fd.append('title', form.title || file.name)
    fd.append('category', form.category)
    setLoading(true)
    setError('')
    try {
      const res = await uploadImage(fd)
      setImages((prev) => [res.data, ...prev])
      setForm({ title: '', category: 'other' })
      fileRef.current.value = ''
    } catch (err) {
      setError(err.response?.data?.image?.[0] || 'Upload failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = async (id) => {
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('title', editData.title)
      fd.append('category', editData.category)
      const res = await updateImage(id, fd)
      setImages((prev) => prev.map((img) => (img.id === id ? res.data : img)))
      setEditId(null)
    } catch {
      setError('Update failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return
    setLoading(true)
    try {
      await deleteImage(id)
      setImages((prev) => prev.filter((img) => img.id !== id))
    } catch {
      setError('Delete failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Image Management</h1>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8 space-y-4">
        <h2 className="text-lg font-semibold text-orange-500">Upload Image</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          />
          <select
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
          >
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-sm file:mr-3 file:bg-orange-500 file:border-0 file:text-white file:rounded-lg file:px-3 file:py-1 file:cursor-pointer"
          />
        </div>
        <button type="submit" disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-2 rounded-xl text-sm font-medium transition">
          {loading ? 'Uploading…' : 'Upload'}
        </button>
      </form>

      {/* Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <button onClick={() => setFilter('')}
          className={`px-4 py-1.5 rounded-xl text-sm transition ${!filter ? 'bg-orange-500' : 'bg-slate-800 hover:bg-slate-700'}`}>
          All
        </button>
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-xl text-sm transition ${filter === c ? 'bg-orange-500' : 'bg-slate-800 hover:bg-slate-700'}`}>
            {c}
          </button>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
      {loading && !images.length && <p className="text-slate-400 text-sm">Loading…</p>}

      {/* Image Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img) => (
          <div key={img.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <img src={img.image_url} alt={img.title} className="w-full h-44 object-cover" />
            <div className="p-4 space-y-3">
              {editId === img.id ? (
                <>
                  <input value={editData.title}
                    onChange={(e) => setEditData((d) => ({ ...d, title: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-orange-500" />
                  <select value={editData.category}
                    onChange={(e) => setEditData((d) => ({ ...d, category: e.target.value }))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-orange-500">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(img.id)} className="flex-1 bg-orange-500 hover:bg-orange-600 rounded-lg py-1.5 text-sm transition">Save</button>
                    <button onClick={() => setEditId(null)} className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-lg py-1.5 text-sm transition">Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="font-medium text-sm truncate">{img.title}</p>
                  <span className="text-xs bg-orange-500/10 border border-orange-500/20 text-orange-400 px-2 py-0.5 rounded-lg">{img.category}</span>
                  <div className="flex gap-2 pt-1">
                    <button onClick={() => { setEditId(img.id); setEditData({ title: img.title, category: img.category }) }}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 rounded-lg py-1.5 text-sm transition">Edit</button>
                    <button onClick={() => handleDelete(img.id)}
                      className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg py-1.5 text-sm transition">Delete</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {!loading && images.length === 0 && (
        <p className="text-slate-500 text-sm text-center py-12">No images found.</p>
      )}
    </div>
  )
}

export default AdminImages
