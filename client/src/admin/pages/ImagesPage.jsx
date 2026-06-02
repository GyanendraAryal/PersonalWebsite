import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CheckSquare, Search, Square } from 'lucide-react'
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

const routeCategoryMap = {
  hero: 'hero',
  work: 'work',
  about: 'about',
}

export default function ImagesPage() {
  const { category: routeCat } = useParams()
  const fixedCategory = routeCategoryMap[routeCat] || ''
  const { images, loading, error, upload, update, remove, removeMany } =
    useImages(fixedCategory)
  const { toast } = useToast()

  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState(fixedCategory)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadCategory, setUploadCategory] = useState(fixedCategory || 'other')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState(null)
  const [editImage, setEditImage] = useState(null)
  const [saving, setSaving] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const [selectionMode, setSelectionMode] = useState(false)
  const [bulkDeleting, setBulkDeleting] = useState(false)

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
        fd.append('image', file)
        fd.append('title', uploadTitle || file.name.replace(/\.[^.]+$/, ''))
        fd.append('category', uploadCategory)
        await upload(fd, (e) => {
          const pct = e.total ? (e.loaded / e.total) * 100 : 0
          setProgress(((done + pct / 100) / files.length) * 100)
        })
        done += 1
        setProgress((done / files.length) * 100)
      }
      setUploadTitle('')
      toast.success(
        files.length > 1 ? `${files.length} images uploaded` : 'Image uploaded'
      )
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
      fd.append('title', title)
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
    if (!confirm(`Delete "${image.title}"?`)) return
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
    if (!selected.size || !confirm(`Delete ${selected.size} images?`)) return
    setBulkDeleting(true)
    try {
      const { failed, succeeded } = await removeMany([...selected])
      setSelected(new Set())
      if (failed) toast.error(`${failed} delete(s) failed`)
      else toast.success(`${succeeded} image(s) deleted`)
    } catch {
      toast.error('Bulk delete failed.')
    } finally {
      setBulkDeleting(false)
    }
  }

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="space-y-8">
      <Card>
        <h3 className="font-semibold text-zinc-100 mb-4">Upload images</h3>
        <div className="grid lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Title (optional)"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
            className="rounded-xl bg-zinc-800/80 border border-white/10 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/50"
          />
          <select
            value={uploadCategory}
            onChange={(e) => setUploadCategory(e.target.value)}
            disabled={!!fixedCategory}
            className="rounded-xl bg-zinc-800/80 border border-white/10 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/50 disabled:opacity-60"
          >
            {IMAGE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
        <UploadZone
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onFiles={handleUploadFiles}
          disabled={uploading}
          uploading={uploading}
          progress={progress}
          hint="JPEG, PNG, WebP, GIF — max 5MB each"
        />
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="search"
            placeholder="Search by title…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-zinc-900/60 border border-white/10 pl-10 pr-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-violet-500/40"
          />
        </div>
        {!fixedCategory && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterCat('')}
              className={`px-4 py-2 rounded-xl text-sm transition ${
                !filterCat ? 'bg-violet-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              All
            </button>
            {IMAGE_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilterCat(c)}
                className={`px-4 py-2 rounded-xl text-sm capitalize transition ${
                  filterCat === c
                    ? 'bg-violet-600 text-white'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        )}
        <Button
          variant="secondary"
          size="md"
          onClick={() => {
            setSelectionMode((m) => !m)
            setSelected(new Set())
          }}
        >
          {selectionMode ? (
            <CheckSquare className="h-4 w-4" />
          ) : (
            <Square className="h-4 w-4" />
          )}
          Select
        </Button>
      </div>

      {error && (
        <p className="text-red-400 text-sm admin-glass rounded-2xl px-4 py-3">{error}</p>
      )}

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ImageCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No images found"
          description={
            search || filterCat
              ? 'Try adjusting search or filters.'
              : 'Upload your first image using the zone above.'
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

      <ImagePreviewModal
        open={!!preview}
        image={preview}
        onClose={() => setPreview(null)}
      />
      <ImageEditModal
        open={!!editImage}
        image={editImage}
        onClose={() => setEditImage(null)}
        onSave={handleSaveEdit}
        saving={saving}
      />
      <BulkActionsBar
        count={selected.size}
        onClear={() => setSelected(new Set())}
        onDelete={handleBulkDelete}
        deleting={bulkDeleting}
      />
    </div>
  )
}
