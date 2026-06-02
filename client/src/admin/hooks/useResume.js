import { useCallback, useEffect, useState } from 'react'
import { deleteResume, getActiveResume, uploadResume } from '../../api'

export function useResume() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchResume = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getActiveResume()
      setResume(res.data?.id ? res.data : null)
    } catch {
      setError('Failed to load resume.')
      setResume(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchResume()
  }, [fetchResume])

  const upload = async (formData, onProgress) => {
    const res = await uploadResume(formData, { onUploadProgress: onProgress })
    setResume(res.data)
    return res.data
  }

  const remove = async () => {
    if (!resume?.id) return
    await deleteResume(resume.id)
    setResume(null)
  }

  return { resume, loading, error, refetch: fetchResume, upload, remove }
}
