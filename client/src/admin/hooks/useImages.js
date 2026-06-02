import { useCallback, useEffect, useState } from 'react'
import { deleteImage, getImages, updateImage, uploadImage } from '../../api'

export function useImages(categoryFilter = '') {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchImages = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await getImages(categoryFilter || undefined)
      setImages(res.data)
    } catch {
      setError('Failed to load images.')
      setImages([])
    } finally {
      setLoading(false)
    }
  }, [categoryFilter])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

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
