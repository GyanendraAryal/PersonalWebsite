import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
})

// Images
export const getImages = (category) =>
  api.get('/images/', { params: category ? { category } : {} })

export const uploadImage = (formData) =>
  api.post('/images/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const updateImage = (id, data) =>
  api.patch(`/images/${id}/`, data, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteImage = (id) =>
  api.delete(`/images/${id}/`)

// Resume
export const getActiveResume = () =>
  api.get('/resume/')

export const uploadResume = (formData) =>
  api.post('/resume/upload/', formData, { headers: { 'Content-Type': 'multipart/form-data' } })

export const deleteResume = (id) =>
  api.delete(`/resume/${id}/`)

// Contact
export const submitContact = (data) =>
  api.post('/contact/', data)

export default api
