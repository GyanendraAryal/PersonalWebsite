import { useState, useEffect, useRef } from 'react'

const useTypingAnimation = (words, { typingSpeed = 100, deletingSpeed = 60, pauseDelay = 1500 } = {}) => {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  // Use a ref for words to avoid re-running the effect when the array reference changes
  const wordsRef = useRef(words)

  useEffect(() => {
    const current = wordsRef.current[wordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1))
        if (displayText.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pauseDelay)
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1))
        if (displayText.length - 1 === 0) {
          setIsDeleting(false)
          setWordIndex((prev) => (prev + 1) % wordsRef.current.length)
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, wordIndex, typingSpeed, deletingSpeed, pauseDelay])

  return displayText
}

export default useTypingAnimation
