import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
const ACCESS_TOKEN_KEY = 'admin-access-token'
const REFRESH_TOKEN_KEY = 'admin-refresh-token'

const api = axios.create({
  baseURL,
})

export function getAdminTokens() {
  return {
    access: localStorage.getItem(ACCESS_TOKEN_KEY),
    refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
  }
}

export function storeAdminTokens({ access, refresh }) {
  localStorage.setItem(ACCESS_TOKEN_KEY, access)
  if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
}

export function clearAdminTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const loginAdmin = (credentials) =>
  axios.post(`${baseURL}/token/`, credentials).then((response) => {
    storeAdminTokens(response.data)
    return response
  })

export const getAdminProfile = () => api.get('/user/')

let refreshRequest

api.interceptors.request.use((config) => {
  const { access } = getAdminTokens()
  if (access) config.headers.Authorization = `Bearer ${access}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const { refresh } = getAdminTokens()
    const isTokenRequest = originalRequest?.url?.includes('/token/')

    if (error.response?.status !== 401 || !refresh || isTokenRequest || originalRequest?._retry) {
      if (error.response?.status === 401 && !isTokenRequest) {
        clearAdminTokens()
        window.dispatchEvent(new Event('admin:unauthorized'))
      }
      return Promise.reject(error)
    }

    originalRequest._retry = true
    try {
      refreshRequest ??= axios
        .post(`${baseURL}/token/refresh/`, { refresh })
        .then(({ data }) => {
          storeAdminTokens({ access: data.access })
          return data.access
        })
        .finally(() => {
          refreshRequest = null
        })

      const access = await refreshRequest
      originalRequest.headers.Authorization = `Bearer ${access}`
      return api(originalRequest)
    } catch (refreshError) {
      clearAdminTokens()
      window.dispatchEvent(new Event('admin:unauthorized'))
      return Promise.reject(refreshError)
    }
  },
)

/** Always return an array from list endpoints (handles DRF pagination wrappers). */
export function getApiErrorMessage(error, fallback) {
  const data = error?.response?.data
  if (typeof data?.detail === 'string') return data.detail
  if (typeof data?.message === 'string') return data.message
  if (data && typeof data === 'object') {
    const fieldError = Object.values(data)
      .flatMap((value) => (Array.isArray(value) ? value : [value]))
      .find((value) => typeof value === 'string' && value.length > 0)
    if (fieldError) return fieldError
  }
  if (error?.message === 'Network Error') {
    return 'Unable to reach the API. Check the backend connection.'
  }
  return fallback
}

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
