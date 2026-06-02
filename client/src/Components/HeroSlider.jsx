import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useTypingAnimation from '../Hooks/useTypingAnimation'
import { getImages, getImageUrl } from '../api'

const words = [
  'Modern Web Experiences.',
  'Scalable MERN Apps.',
  'Clean, Fast UIs.',
  'Real-World Products.',
]

const HeroSlider = () => {
  const [slides, setSlides] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [status, setStatus] = useState('loading') // loading | ready | empty | error
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchHeroData = async () => {
      setStatus('loading')
      setSlides([])
      setCurrentIndex(0)

      try {
        const res = await getImages('hero')

        if (cancelled) return

        const raw = res.data
        const withUrl = raw.filter((item) => getImageUrl(item))

        console.log('[HeroSlider] GET /api/images/?category=hero', {
          httpStatus: res.status,
          isArray: Array.isArray(raw),
          rawCount: raw.length,
          validCount: withUrl.length,
          firstItem: raw[0] ?? null,
          firstUrl: withUrl[0] ? getImageUrl(withUrl[0]) : null,
        })

        if (raw.length > 0 && withUrl.length === 0) {
          console.warn(
            '[HeroSlider] API returned items but none had image_url/image/url:',
            raw
          )
        }

        setSlides(withUrl)
        setCurrentIndex(0)
        setStatus(withUrl.length > 0 ? 'ready' : 'empty')
      } catch (error) {
        console.error('[HeroSlider] Error fetching hero images:', error)
        if (!cancelled) {
          setSlides([])
          setStatus('error')
        }
      }
    }

    fetchHeroData()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [slides.length])

  const safeIndex = slides.length
    ? Math.min(currentIndex, slides.length - 1)
    : 0

  const activeSlide = slides[safeIndex] ?? null
  const imageSrc = getImageUrl(activeSlide)

  useEffect(() => {
    setImgError(false)
  }, [imageSrc, safeIndex])

  const typed = useTypingAnimation(words, {
    typingSpeed: 80,
    deletingSpeed: 50,
    pauseDelay: 2000,
  })

  const imageBlock = useMemo(() => {
    if (status === 'loading') {
      return (
        <div
          className="flex h-[280px] w-full max-w-[700px] items-center justify-center rounded-2xl border border-gray-800 bg-gray-900/50 sm:h-[360px]"
          aria-busy="true"
        >
          <p className="text-sm font-medium tracking-wide text-gray-400 animate-pulse">
            Loading hero images…
          </p>
        </div>
      )
    }

    if (status === 'error') {
      return (
        <div className="flex h-[280px] w-full max-w-[700px] flex-col items-center justify-center gap-2 rounded-2xl border border-red-900/50 bg-red-950/20 px-6 text-center sm:h-[360px]">
          <p className="text-sm font-medium text-red-400">Could not load hero images</p>
          <p className="text-xs text-gray-500">
            Check the API is running and CORS allows {import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'}
          </p>
        </div>
      )
    }

    if (status === 'empty' || !activeSlide || !imageSrc) {
      return (
        <div className="flex h-[280px] w-full max-w-[700px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-gray-700 bg-gray-900/40 px-6 text-center sm:h-[360px]">
          <p className="text-sm font-medium text-gray-300">No hero images yet</p>
          <p className="text-xs text-gray-500">
            Upload images with category &quot;hero&quot; in the admin panel.
          </p>
        </div>
      )
    }

    if (imgError) {
      return (
        <div className="flex h-[280px] w-full max-w-[700px] flex-col items-center justify-center gap-2 rounded-2xl border border-amber-900/50 bg-amber-950/20 px-6 text-center sm:h-[360px]">
          <p className="text-sm font-medium text-amber-400">Image failed to load</p>
          <p className="text-xs text-gray-500 break-all">{imageSrc}</p>
        </div>
      )
    }

    return (
      <img
        key={`${activeSlide.id ?? safeIndex}-${imageSrc}`}
        className="h-auto w-full max-w-[700px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-fade-in"
        src={imageSrc}
        alt={activeSlide.title || 'Hero showcase'}
        loading="eager"
        decoding="async"
        onError={() => {
          console.warn('[HeroSlider] img onError — URL:', imageSrc)
          setImgError(true)
        }}
      />
    )
  }, [status, activeSlide, imageSrc, safeIndex, imgError])

  return (
    <div className="min-h-screen w-full overflow-hidden bg-black">
      <div
        className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between px-4 py-20 sm:px-6 lg:flex-row lg:px-8"
      >
        <div className="mt-8 flex w-full flex-col justify-center text-center lg:mt-0 lg:w-1/2 lg:text-left">
          <p className="mb-4 text-xs uppercase tracking-[3px] text-white sm:text-sm">
            Full Stack Developer • React • Node.js
          </p>

          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Building{' '}
            <span className="text-orange-500">
              {typed}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base md:text-lg lg:mx-0">
            I craft <span className="font-medium text-white">fast, scalable web apps</span> with{' '}
            <span className="font-medium text-white">React, Node.js & MongoDB</span> — turning
            real-world problems into{' '}
            <span className="font-medium text-white">clean, intuitive products</span> that users
            actually enjoy.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Link
              to="/work"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-orange-400 hover:text-white"
            >
              View Projects
            </Link>
            <Link
              to="/contact"
              className="rounded-lg border border-gray-700 px-6 py-3 text-white transition-all duration-300 hover:text-orange-400"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          {imageBlock}
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
