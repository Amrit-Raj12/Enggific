import React, { useEffect, useState } from "react"

// Base animation component for scroll-triggered animations
const useScrollAnimation = (className) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(`.${className}`)
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8) {
          element.classList.add("show")
        } else {
          element.classList.remove("show")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [className])

  return isVisible
}

// Slide down from the top
const AnimatedComponent = ({ children }) => {
  useScrollAnimation("animate-from-top")

  return (
    <div
      className="animate-from-top transition-all duration-1000 ease-in-out transform opacity-0 -translate-y-10"
    >
      {children}
    </div>
  )
}

// Slide in from the left
export const AnimatedFromLeft = ({ children }) => {
  useScrollAnimation("animate-from-left")

  return (
    <div
      className="animate-from-left transition-all duration-1000 ease-in-out transform opacity-0 -translate-x-10"
    >
      {children}
    </div>
  )
}

// Slide in from the right
export const AnimatedFromRight = ({ children }) => {
  useScrollAnimation("animate-from-right")

  return (
    <div
      className="animate-from-right transition-all duration-1000 ease-in-out transform opacity-0 translate-x-10"
    >
      {children}
    </div>
  )
}

export default AnimatedComponent