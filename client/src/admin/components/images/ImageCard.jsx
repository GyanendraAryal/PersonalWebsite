import { motion } from 'framer-motion'
import { Calendar, Pencil, Trash2, ZoomIn } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { CATEGORY_LABELS } from '../../constants'

export default function ImageCard({
  image,
  selected,
  onSelect,
  onPreview,
  onEdit,
  onDelete,
  selectionMode,
}) {
  const date = new Date(image.created_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className={[
        'group admin-glass rounded-3xl overflow-hidden',
        selected ? 'ring-2 ring-violet-500' : '',
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        <img
          src={image.image_url}
          alt={image.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {selectionMode && (
          <label className="absolute top-3 left-3 z-10">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onSelect(image.id)}
              className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-violet-500"
            />
          </label>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            type="button"
            onClick={() => onPreview(image)}
            className="rounded-xl bg-white/10 p-2.5 backdrop-blur hover:bg-white/20 transition"
            aria-label="Preview"
          >
            <ZoomIn className="h-4 w-4 text-white" />
          </button>
          <button
            type="button"
            onClick={() => onEdit(image)}
            className="rounded-xl bg-white/10 p-2.5 backdrop-blur hover:bg-white/20 transition"
            aria-label="Edit"
          >
            <Pencil className="h-4 w-4 text-white" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(image)}
            className="rounded-xl bg-red-500/30 p-2.5 backdrop-blur hover:bg-red-500/50 transition"
            aria-label="Delete"
          >
            <Trash2 className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <p className="font-medium text-sm text-zinc-100 truncate">{image.title}</p>
        <div className="flex items-center justify-between gap-2">
          <Badge category={image.category}>
            {CATEGORY_LABELS[image.category] || image.category}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-zinc-500">
            <Calendar className="h-3 w-3" />
            {date}
          </span>
        </div>
        <div className="flex gap-2 pt-1 sm:hidden">
          <Button variant="secondary" size="sm" className="flex-1" onClick={() => onEdit(image)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" className="flex-1" onClick={() => onDelete(image)}>
            Delete
          </Button>
        </div>
      </div>
    </motion.article>
  )
}
