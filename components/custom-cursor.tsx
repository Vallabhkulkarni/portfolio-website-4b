"use client"

import { useEffect, useState, useCallback } from "react"

interface CursorPosition {
  x: number
  y: number
}

export default function CustomCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Check if user prefers reduced motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  const updatePosition = useCallback(
    (e: MouseEvent) => {
      if (!isMounted) return

      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
      })
    },
    [isMounted],
  )

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    setIsHovering(false)
    setIsClicking(false)
  }, [])

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target) return

    const isInteractive =
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.role === "button" ||
      target.classList.contains("cursor-pointer") ||
      target.classList.contains("clickable") ||
      target.closest("button") ||
      target.closest("a") ||
      target.closest("[role='button']") ||
      target.closest(".cursor-pointer") ||
      target.closest(".clickable")

    setIsHovering(isInteractive)
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsClicking(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  useEffect(() => {
    if (!isMounted || prefersReducedMotion) return

    // Add event listeners
    document.addEventListener("mousemove", updatePosition, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [
    isMounted,
    prefersReducedMotion,
    updatePosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseOver,
    handleMouseDown,
    handleMouseUp,
  ])

  // Don't render if not mounted, user prefers reduced motion, or not visible
  if (!isMounted || prefersReducedMotion || !isVisible) {
    return null
  }

  const cursorScale = isClicking ? 0.8 : isHovering ? 1.5 : 1
  const outlineScale = isClicking ? 0.6 : isHovering ? 1.2 : 1

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-100 ease-out will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorScale})`,
        }}
        aria-hidden="true"
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>

      {/* Cursor outline */}
      <div
        className="fixed pointer-events-none z-[9998] border border-white/30 rounded-full transition-all duration-300 ease-out will-change-transform"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${outlineScale})`,
          width: isHovering ? "40px" : "32px",
          height: isHovering ? "40px" : "32px",
        }}
        aria-hidden="true"
      />
    </>
  )
}
