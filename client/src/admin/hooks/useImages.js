import { useCallback, useEffect, useState } from 'react'
import { deleteImage, getApiErrorMessage, getImages, updateImage, uploadImage } from '../../api'

export function useImages(categoryFilter = '') {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const requestImages = useCallback(async () => {
    const res = await getImages(categoryFilter || undefined)
    return res.data
  }, [categoryFilter])

  const fetchImages = useCallback(async () => {
    setLoading(true)
    try {
      setImages(await requestImages())
      setError('')
    } catch (requestError) {
      setError(getApiErrorMessage(requestError, 'Failed to load images.'))
    }
    setLoading(false)
  }, [requestImages])

  useEffect(() => {
    let active = true
    requestImages()
      .then((data) => {
        if (active) {
          setImages(data)
          setError('')
        }
      })
      .catch((requestError) => {
        if (active) setError(getApiErrorMessage(requestError, 'Failed to load images.'))
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [requestImages])

  const upload = async (formData, onProgress) => {
    const res = await uploadImage(formData, {
      onUploadProgress: onProgress,
    })
    setImages((prev) => [res.data, ...prev])
    return res.data
  }

  const update = async (id, formData) => {
    const res = await updateImage(id, formData)
    setImages((prev) => prev.map((img) => (img.id === id ? res.data : img)))
    return res.data
  }

  const remove = async (id) => {
    await deleteImage(id)
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const removeMany = async (ids) => {
    const results = await Promise.allSettled(ids.map((id) => deleteImage(id)))
    const failed = results.filter((r) => r.status === 'rejected').length
    const succeeded = ids.filter((_, i) => results[i].status === 'fulfilled')
    setImages((prev) => prev.filter((img) => !succeeded.includes(img.id)))
    return { failed, succeeded: succeeded.length }
  }

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
    upload,
    update,
    remove,
    removeMany,
    setImages,
  }
}
