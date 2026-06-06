import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useTypingAnimation from '../Hooks/useTypingAnimation'
import { getImages, getImageUrl } from '../api'
import heroImg from '../assets/heroImg.png'
import heroImg1 from '../assets/heroImg1.png'

const words = [
  'Modern Web Experiences.',
  'Scalable MERN Apps.',
  'Clean, Fast UIs.',
  'Real-World Products.',
]

// Fallback hero images when API is unavailable
const fallbackHeroImages = [
  { id: 'fallback-1', title: 'Portfolio Hero', image_url: heroImg },
  { id: 'fallback-2', title: 'Portfolio Hero Alt', image_url: heroImg1 },
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

        // Use API images if available, otherwise fallback to local images
        const imagesToUse = withUrl.length > 0 ? withUrl : fallbackHeroImages
        setSlides(imagesToUse)
        setCurrentIndex(0)
        setStatus('ready')
        
        if (withUrl.length === 0) {
          console.log('[HeroSlider] Using fallback local images')
        }
      } catch (error) {
        console.error('[HeroSlider] Error fetching hero images:', error)
        if (!cancelled) {
          // On API failure, use fallback images
          console.log('[HeroSlider] API failed, using fallback local images')
          setSlides(fallbackHeroImages)
          setStatus('ready')
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-slate-900">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col-reverse items-center justify-between px-4 py-20 sm:px-6 lg:flex-row lg:px-8 min-h-screen">
        <div className="mt-8 flex w-full flex-col justify-center text-center lg:mt-0 lg:w-1/2 lg:text-left">
          {/* Enhanced Badge */}
          <div className="mb-6 inline-flex items-center justify-center lg:justify-start">
            <span className="rounded-full bg-gradient-to-r from-orange-500/20 to-purple-500/20 backdrop-blur-sm border border-orange-500/30 px-4 py-2 text-xs font-semibold tracking-[3px] text-orange-300 uppercase animate-fade-in">
              Full Stack Developer • React • Node.js
            </span>
          </div>

          {/* Enhanced Main Title */}
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="inline-block animate-fade-in">Building</span>{' '}
            <span className="inline-block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              {typed}
              <span className="animate-pulse text-orange-400">|</span>
            </span>
          </h1>

          {/* Enhanced Description */}
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-gray-300 sm:text-lg md:text-xl lg:mx-0 animate-fade-in delay-300">
            I craft <span className="font-semibold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text">fast, scalable web apps</span> with{' '}
            <span className="font-semibold text-orange-400">React, Node.js & MongoDB</span> — turning
            real-world problems into{' '}
            <span className="font-semibold text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text">clean, intuitive products</span> that users
            actually enjoy.
          </p>

          {/* Enhanced CTA Buttons */}
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start animate-fade-in delay-500">
            <Link
              to="/work"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40"
            >
              <span className="relative z-10">View Projects</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
            <Link
              to="/contact"
              className="group rounded-xl border border-gray-600/50 bg-gray-800/30 backdrop-blur-sm px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:border-orange-500/50 hover:bg-gray-700/40 hover:text-orange-300"
            >
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>
        </div>

        {/* Enhanced Image Container */}
        <div className="relative flex w-full items-center justify-center lg:w-1/2">
          <div className="relative">
            {/* Image glow effect */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-2xl"></div>
            <div className="relative rounded-3xl border border-gray-700/50 bg-gray-800/20 backdrop-blur-sm p-2">
              {imageBlock}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
