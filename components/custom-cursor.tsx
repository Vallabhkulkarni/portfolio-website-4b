"use client"

import { useEffect, useState, useCallback } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Check if user prefers reduced motion
  const prefersReducedMotion =
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false

  // Check if device supports hover (not touch-only)
  const supportsHover =
    typeof window !== "undefined" ? window.matchMedia("(hover: hover) and (pointer: fine)").matches : false

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  const handleMouseDown = useCallback(() => {
    setIsClicking(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  const handleElementHover = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    const isInteractive =
      target.matches(
        'button, a, input, textarea, select, [role="button"], [tabindex]:not([tabindex="-1"]), .cursor-pointer, .clickable',
      ) || target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer, .clickable')

    setIsHovering(isInteractive)
  }, [])

  useEffect(() => {
    setMounted(true)

    // Don't render cursor if user prefers reduced motion or device doesn't support hover
    if (prefersReducedMotion || !supportsHover) {
      return
    }

    // Add event listeners
    document.addEventListener("mousemove", updatePosition, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })
    document.addEventListener("mouseover", handleElementHover, { passive: true })

    // Hide default cursor
    document.body.style.cursor = "none"

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleElementHover)

      // Restore default cursor
      document.body.style.cursor = "auto"
    }
  }, [
    updatePosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleElementHover,
    prefersReducedMotion,
    supportsHover,
  ])

  // Don't render if not mounted, reduced motion, or no hover support
  if (!mounted || prefersReducedMotion || !supportsHover) {
    return null
  }

  return (
    <div
      className={`fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] transition-all duration-200 ease-out mix-blend-difference ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: `translate(${position.x - 12}px, ${position.y - 12}px) scale(${
          isClicking ? 0.8 : isHovering ? 1.5 : 1
        })`,
        willChange: "transform",
      }}
    >
      <div className="w-full h-full bg-white rounded-full border-2 border-white shadow-lg" />
    </div>
  )
}
