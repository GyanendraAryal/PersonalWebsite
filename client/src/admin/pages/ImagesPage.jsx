import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CheckSquare, Search, Square, Upload } from 'lucide-react'
import { useImages } from '../hooks/useImages'
import { useToast } from '../hooks/useToast'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { ImageCardSkeleton } from '../components/ui/Skeleton'
import UploadZone from '../components/upload/UploadZone'
import ImageCard from '../components/images/ImageCard'
import ImageEditModal from '../components/images/ImageEditModal'
import ImagePreviewModal from '../components/images/ImagePreviewModal'
import BulkActionsBar from '../components/images/BulkActionsBar'
import { IMAGE_CATEGORIES, CATEGORY_LABELS } from '../constants'

const ROUTE_CATEGORY = { hero: 'hero', work: 'work' }

export default function ImagesPage() {
  const { category: routeCat } = useParams()
  const fixedCategory = ROUTE_CATEGORY[routeCat] || ''
  const { images, loading, error, upload, update, remove, removeMany } = useImages(fixedCategory)
  const { toast } = useToast()

  const [search,         setSearch]         = useState('')
  const [filterCat,      setFilterCat]      = useState(fixedCategory)
  const [uploadTitle,    setUploadTitle]    = useState('')
  const [uploadCategory, setUploadCategory] = useState(fixedCategory || 'other')
  const [uploading,      setUploading]      = useState(false)
  const [progress,       setProgress]       = useState(0)
  const [preview,        setPreview]        = useState(null)
  const [editImage,      setEditImage]      = useState(null)
  const [saving,         setSaving]         = useState(false)
  const [selected,       setSelected]       = useState(new Set())
  const [selectionMode,  setSelectionMode]  = useState(false)
  const [bulkDeleting,   setBulkDeleting]   = useState(false)

  const filtered = useMemo(() => {
    let list = images
    if (filterCat) list = list.filter((i) => i.category === filterCat)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter((i) => i.title.toLowerCase().includes(q))
    }
    return list
  }, [images, filterCat, search])

  const handleUploadFiles = async (files) => {
    setUploading(true)
    setProgress(0)
    let done = 0
    try {
      for (const file of files) {
        const fd = new FormData()
        fd.append('image',    file)
        fd.append('title',    uploadTitle || file.name.replace(/\.[^.]+$/, ''))
        fd.append('category', uploadCategory)
        await upload(fd, (e) => {
          const pct = e.total ? (e.loaded / e.total) * 100 : 0
          setProgress(((done + pct / 100) / files.length) * 100)
        })
        done += 1
        setProgress((done / files.length) * 100)
      }
      setUploadTitle('')
      toast.success(files.length > 1 ? `${files.length} images uploaded` : 'Image uploaded')
    } catch (err) {
      toast.error(err.response?.data?.image?.[0] || 'Upload failed.')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleSaveEdit = async ({ title, category }) => {
    if (!editImage) return
    setSaving(true)
    try {
      const fd = new FormData()
      fd.append('title',    title)
      fd.append('category', category)
      await update(editImage.id, fd)
      toast.success('Image updated')
      setEditImage(null)
    } catch {
      toast.error('Update failed.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (image) => {
    if (!confirm(`Delete "${image.title}"? This cannot be undone.`)) return
    try {
      await remove(image.id)
      selected.delete(image.id)
      setSelected(new Set(selected))
      toast.success('Image deleted')
    } catch {
      toast.error('Delete failed.')
    }
  }

  const handleBulkDelete = async () => {
    if (!selected.size || !confirm(`Permanently delete ${selected.size} image(s)?`)) return
    setBulkDeleting(true)
    try {
      const { failed, succeeded } = await removeMany([...selected])
      setSelected(new Set())
      if (failed) toast.error(`${failed} delete(s) failed`)
      else        toast.success(`${succeeded} image(s) deleted`)
    } catch {
      toast.error('Bulk delete failed.')
    } finally {
      setBulkDeleting(false)
    }
  }

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-6">

      {/* ── Upload card ───────────────────────────────── */}
      <Card>
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <Upload className="h-4 w-4 text-orange-400" />
            <h3 className="font-semibold text-sm text-zinc-100">Upload image assets</h3>
          </div>
          <p className="mt-1 text-xs text-zinc-500">
            Hero images appear in the homepage carousel. Work and other images are library assets;
            they do not appear publicly until assigned to frontend content.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
          <div className="col-span-full sm:col-span-1 lg:col-span-2">
            <label htmlFor="image-title" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Image title
            </label>
            <input
              id="image-title"
              type="text"
              placeholder="Optional — defaults to filename"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full rounded-xl bg-zinc-800/80 border border-white/8 px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/60 transition-colors"
            />
            <p className="mt-1 text-xs text-zinc-600">
              Used as accessible image text for homepage hero images; otherwise it identifies the asset in this library.
            </p>
          </div>
          <div>
            <label htmlFor="image-category" className="mb-1.5 block text-xs font-medium text-zinc-400">
              Placement
            </label>
            <select
              id="image-category"
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              disabled={!!fixedCategory}
              className="w-full rounded-xl bg-zinc-800/80 border border-white/8 px-3.5 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/60 transition-colors disabled:opacity-50"
            >
              {IMAGE_CATEGORIES.map((c) => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-zinc-600">
              {uploadCategory === 'hero'
                ? 'Shown in the homepage hero carousel.'
                : uploadCategory === 'work'
                  ? 'Library tag only; assign the URL to a Work item in Django Admin.'
                  : 'Stored in the library, not displayed on the public site.'}
            </p>
          </div>
        </div>

        <UploadZone
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onFiles={handleUploadFiles}
          disabled={uploading}
          uploading={uploading}
          progress={progress}
          hint="JPEG, PNG, WebP, GIF — max 5 MB each"
        />
      </Card>

      {/* ── Filters + search bar ─────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
          <input
            type="search"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-zinc-900/60 border border-white/8 pl-10 pr-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-orange-500/40 transition-colors"
          />
        </div>

        {/* Category filters */}
        {!fixedCategory && (
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setFilterCat('')}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-colors ${
                !filterCat
                  ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                  : 'bg-zinc-800/80 text-zinc-500 border border-white/6 hover:text-zinc-300'
              }`}
            >
              All
            </button>
            {IMAGE_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilterCat(c)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium capitalize transition-colors ${
                  filterCat === c
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'bg-zinc-800/80 text-zinc-500 border border-white/6 hover:text-zinc-300'
                }`}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        )}

        {/* Selection toggle */}
        <Button
          variant="secondary"
          size="md"
          onClick={() => { setSelectionMode((m) => !m); setSelected(new Set()) }}
        >
          {selectionMode ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
          {selectionMode ? 'Cancel' : 'Select'}
        </Button>
      </div>

      {/* ── Error ────────────────────────────────────── */}
      {error && (
        <p className="text-sm text-red-400 bg-red-500/8 border border-red-500/20 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {/* ── Image grid ───────────────────────────────── */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <ImageCardSkeleton key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No images found"
          description={
            search || filterCat
              ? 'Try adjusting your search or filter.'
              : 'Upload your first image above.'
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filtered.map((img) => (
              <ImageCard
                key={img.id}
                image={img}
                selected={selected.has(img.id)}
                selectionMode={selectionMode}
                onSelect={toggleSelect}
                onPreview={setPreview}
                onEdit={setEditImage}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Modals ───────────────────────────────────── */}
      <ImagePreviewModal open={!!preview}    image={preview}    onClose={() => setPreview(null)} />
      <ImageEditModal    key={editImage?.id ?? 'closed'} open={!!editImage} image={editImage} onClose={() => setEditImage(null)} onSave={handleSaveEdit} saving={saving} />
      <BulkActionsBar    count={selected.size} onClear={() => setSelected(new Set())} onDelete={handleBulkDelete} deleting={bulkDeleting} />
    </div>
  )
}
