import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CloudUpload, FileText, ImageIcon } from 'lucide-react'

export default function UploadZone({
  accept,
  multiple = false,
  onFiles,
  disabled,
  progress = 0,
  uploading = false,
  label = 'Drag & drop files here',
  hint,
  variant = 'image',
}) {
  const inputRef = useRef()
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback(
    (fileList) => {
      if (!fileList?.length || disabled) return
      onFiles(multiple ? [...fileList] : [fileList[0]])
    },
    [disabled, multiple, onFiles]
  )

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const Icon = variant === 'pdf' ? FileText : ImageIcon

  return (
    <div className="space-y-3">
      <motion.div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        animate={{
          borderColor: dragOver ? 'rgba(139,92,246,0.6)' : 'rgba(255,255,255,0.1)',
          scale: dragOver ? 1.01 : 1,
        }}
        className={[
          'relative rounded-3xl border-2 border-dashed p-10 text-center transition-colors cursor-pointer',
          dragOver ? 'bg-violet-500/5' : 'bg-zinc-900/40 hover:bg-zinc-900/60',
          disabled ? 'opacity-50 pointer-events-none' : '',
        ].join(' ')}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            handleFiles(e.target.files)
            e.target.value = ''
          }}
        />
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
          {uploading ? (
            <CloudUpload className="h-7 w-7 text-violet-400 animate-pulse" />
          ) : (
            <Icon className="h-7 w-7 text-violet-400" />
          )}
        </div>
        <p className="text-sm font-medium text-zinc-200">{label}</p>
        <p className="mt-1 text-xs text-zinc-500">
          {hint || 'or click to browse'}
        </p>
      </motion.div>

      {uploading && (
        <div className="space-y-1">
          <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-zinc-500 text-right">{Math.round(progress)}%</p>
        </div>
      )}
    </div>
  )
}
