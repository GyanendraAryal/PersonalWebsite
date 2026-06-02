import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
})

/** Always return an array from list endpoints (handles DRF pagination wrappers). */
export function normalizeImageList(data) {
  if (Array.isArray(data)) return data
  if (data && typeof data === 'object') {
    if (Array.isArray(data.results)) return data.results
    if (Array.isArray(data.data)) return data.data
  }
  console.warn('[api] normalizeImageList: unexpected shape', data)
  return []
}

export function getImageUrl(item) {
  if (!item || typeof item !== 'object') return ''
  const url = item.image_url || item.image || item.url
  return typeof url === 'string' ? url.trim() : ''
}

// Images
export const getImages = (category) =>
  api
    .get('/images/', { params: category ? { category } : {} })
    .then((res) => ({
      ...res,
      data: normalizeImageList(res.data),
    }))

export const uploadImage = (formData, config = {}) =>
  api.post('/images/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config,
  })

export const updateImage = (id, data) =>
  api.patch(`/images/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteImage = (id) =>
  api.delete(`/images/${id}/`)

// Resume
export const getActiveResume = () =>
  api.get('/resume/')

export const uploadResume = (formData, config = {}) =>
  api.post('/resume/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config,
  })

export const deleteResume = (id) =>
  api.delete(`/resume/${id}/`)

// Contact
export const submitContact = (data) =>
  api.post('/contact/', data)

export const getContacts = () =>
  api.get('/contacts/')

export default api
