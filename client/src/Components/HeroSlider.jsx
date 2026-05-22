import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useTypingAnimation from '../Hooks/useTypingAnimation'
import { getImages } from '../api'

const words = [
    "Modern Web Experiences.",
    "Scalable MERN Apps.",
    "Clean, Fast UIs.",
    "Real-World Products."
];

const HeroSlider = () => {
    // 1. Initialized safely as an empty array to prevent undefined length readings
    const [hero, setHero] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const res = await getImages('hero')
                setHero(Array.isArray(res.data) ? res.data : [])
            } catch (error) {
                console.error("Error fetching hero images:", error)
            }
        }
        fetchHeroData()
    }, [])

    useEffect(() => {
        // 3. Block loop configuration if data has not resolved yet
        if (hero.length === 0) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === hero.length - 1
                    ? 0
                    : prevIndex + 1
            )
        }, 3000)

        return () => clearInterval(interval)
    }, [hero]) // Fixed tracking array dependency

    const typed = useTypingAnimation(words, {
        typingSpeed: 80,
        deletingSpeed: 50,
        pauseDelay: 2000
    });

    return (
        <>
            <div className='min-h-screen w-full bg-black overflow-hidden'>
                <div className='max-w-7xl mx-auto
                    flex flex-col-reverse lg:flex-row
                    items-center justify-between
                    px-4 sm:px-6 lg:px-8
                    py-20'>

                    {/* LEFT CONTENT */}
                    <div className='w-full lg:w-1/2 
                        flex flex-col justify-center
                        text-center lg:text-left
                        mt-8 lg:mt-0'>

                        <p className='text-white
                            text-xs sm:text-sm 
                            tracking-[3px] uppercase mb-4'>
                            Full Stack Developer • React • Node.js
                        </p>

                        <h1 className='text-white 
                            text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
                            font-bold leading-tight'>
                            Building{" "}
                            <span className="text-orange-500">
                                {typed}<span className="animate-pulse">|</span>
                            </span>
                        </h1>

                        <p className='text-gray-400 
                            text-sm sm:text-base md:text-lg
                            mt-5 leading-7 max-w-xl
                            mx-auto lg:mx-0'>
                            I craft{' '}
                            <span className='text-white font-medium'>fast, scalable web apps</span>
                            {' '}with{' '}
                            <span className='text-white font-medium'>React, Node.js & MongoDB</span>
                            {' '}— turning real-world problems into{' '}
                            <span className='text-white font-medium'>clean, intuitive products</span>
                            {' '}that users actually enjoy.
                        </p>

                        {/* BUTTONS */}
                        <div className='flex flex-col sm:flex-row
                            gap-4 mt-8
                            justify-center lg:justify-start'>
                            <Link
                                to='/work'
                                className='bg-white text-black px-6 py-3 rounded-lg
                                    font-semibold hover:bg-orange-400 hover:text-white
                                    transition-all duration-300'>
                                View Projects
                            </Link>

                            <Link
                                to='/contact'
                                className='border border-gray-700 text-white px-6 py-3 rounded-lg
                                    hover:text-orange-400 transition-all duration-300'>
                                Contact
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div className='w-full lg:w-1/2 flex justify-center items-center relative'>
                        {hero.length > 0 ? (
                            <img
                                key={currentIndex} // 4. Forces animate-fadeIn to trigger every time slide index updates
                                className='w-full max-w-[700px] object-contain drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)] animate-fadeIn'
                                src={hero[currentIndex]?.image_url}
                                alt='Hero Visual Showcase'
                            />
                        ) : (
                            <div className='text-white font-medium tracking-wide animate-pulse'>
                                Loading Asset Stream...
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default HeroSlider
