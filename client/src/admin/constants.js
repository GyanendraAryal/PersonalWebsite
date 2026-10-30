export const IMAGE_CATEGORIES = ['hero', 'work', 'other']

export const CATEGORY_LABELS = {
  hero: 'Homepage hero',
  work: 'Work library',
  about: 'About (legacy — not displayed)',
  other: 'Other / unassigned',
}

export const DJANGO_ADMIN_URL =
  import.meta.env.VITE_DJANGO_ADMIN_URL || 'http://127.0.0.1:8000/admin'

export const PORTFOLIO_PROFILE_ADMIN_URL =
  `${DJANGO_ADMIN_URL.replace(/\/+$/, '')}/work/portfolioprofile/1/change/`
