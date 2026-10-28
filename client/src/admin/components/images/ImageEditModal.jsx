import { useState } from 'react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { IMAGE_CATEGORIES, CATEGORY_LABELS } from '../../constants'

export default function ImageEditModal({ open, image, onClose, onSave, saving }) {
  const [title, setTitle] = useState(image?.title ?? '')
  const [category, setCategory] = useState(image?.category ?? 'other')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ title, category })
  }

  return (
    <Modal open={open} onClose={onClose} title="Edit image">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl bg-zinc-800/80 border border-white/10 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1.5">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl bg-zinc-800/80 border border-white/10 px-4 py-2.5 text-sm text-zinc-100 focus:outline-none focus:border-orange-500/50"
          >
            {IMAGE_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
