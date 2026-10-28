import { useCallback, useEffect, useState } from 'react'
import { deleteResume, getActiveResume, getApiErrorMessage, uploadResume } from '../../api'

export function useResume() {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const requestResume = useCallback(async () => {
    const res = await getActiveResume()
    return res.data?.id ? res.data : null
  }, [])

  const fetchResume = useCallback(async () => {
    setLoading(true)
    try {
      setResume(await requestResume())
      setError('')
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Failed to load resume.'))
    }
    setLoading(false)
  }, [requestResume])

  useEffect(() => {
    let active = true
    requestResume()
      .then((data) => {
        if (active) {
          setResume(data)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError, 'Failed to load resume.'))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [requestResume])

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
