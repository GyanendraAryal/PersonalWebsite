import React, { useEffect, useState } from 'react'
import HeroImg from '../assets/heroImg.png'
import HeroImg1 from '../assets/heroImg1.png'
import { Link } from 'react-router-dom'
import useTypingAnimation from '../Hooks/useTypingAnimation'


const words = [
    "Modern Web Experiences.",
    "Scalable MERN Apps.",
    "Clean, Fast UIs.",
    "Real-World Products."
];


const HeroSlider = () => {

    const [index, setIndex] = useState(0)

    const images = [HeroImg, HeroImg1]

    useEffect(() => {

        const interval = setInterval(() => {

            setIndex((prevIndex) => {
                return prevIndex === images.length - 1
                    ? 0
                    : prevIndex + 1
            })

        }, 5000)

        return () => clearInterval(interval)

    }, [])

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
                    <div className='w-full lg:w-1/2
                flex justify-center items-center
                relative'>

                        <img
                            key={index}
                            className='w-full max-w-[700px] object-contain
    drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]
    animate-fadeIn'
                            src={images[index]}
                            alt={`hero slide ${index + 1}`}
                        />

                    </div>

                </div>
            </div>
        </>
    )
}

export default HeroSlider