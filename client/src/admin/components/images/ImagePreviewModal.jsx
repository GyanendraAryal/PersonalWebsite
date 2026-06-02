import Modal from '../ui/Modal'
import Badge from '../ui/Badge'
import { CATEGORY_LABELS } from '../../constants'

export default function ImagePreviewModal({ open, image, onClose }) {
  if (!image) return null

  return (
    <Modal open={open} onClose={onClose} size="xl">
      <div className="p-0 -m-0">
        <img
          src={image.image_url}
          alt={image.title}
          className="w-full max-h-[70vh] object-contain bg-zinc-950 rounded-t-3xl"
        />
        <div className="px-6 py-4 border-t border-white/5 flex flex-wrap items-center gap-3">
          <h3 className="font-semibold text-zinc-100">{image.title}</h3>
          <Badge category={image.category}>
            {CATEGORY_LABELS[image.category] || image.category}
          </Badge>
          <span className="text-xs text-zinc-500 ml-auto">
            {new Date(image.created_at).toLocaleString()}
          </span>
        </div>
      </div>
    </Modal>
  )
}
