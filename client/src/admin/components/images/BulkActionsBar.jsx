import { AnimatePresence, motion } from 'framer-motion'
import { Trash2, X } from 'lucide-react'
import Button from '../ui/Button'

export default function BulkActionsBar({ count, onClear, onDelete, deleting }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 admin-glass rounded-2xl px-5 py-3 flex items-center gap-4 shadow-2xl border border-orange-500/20"
        >
          <span className="text-sm text-zinc-300">
            <strong className="text-white">{count}</strong> selected
          </span>
          <Button variant="danger" size="sm" onClick={onDelete} disabled={deleting}>
            <Trash2 className="h-4 w-4" />
            {deleting ? 'Deleting…' : 'Delete'}
          </Button>
          <button
            type="button"
            onClick={onClear}
            className="p-2 text-zinc-500 hover:text-zinc-300"
            aria-label="Clear selection"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
