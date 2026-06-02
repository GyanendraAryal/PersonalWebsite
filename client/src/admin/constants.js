export const IMAGE_CATEGORIES = ['hero', 'work', 'about', 'other']

export const CATEGORY_LABELS = {
  hero: 'Hero',
  work: 'Work',
  about: 'About',
  other: 'Other',
}

export const DJANGO_ADMIN_URL =
  import.meta.env.VITE_DJANGO_ADMIN_URL || 'http://127.0.0.1:8000/admin'
