"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [mounted, setMounted] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()

  // Check if user prefers reduced motion
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return true
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  }, [])

  // Update cursor position with requestAnimationFrame for smooth performance
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    animationRef.current = requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  // Check if element is interactive
  const isInteractiveElement = useCallback((element: Element): boolean => {
    const interactiveSelectors = [
      "a",
      "button",
      "input",
      "textarea",
      "select",
      "label",
      '[role="button"]',
      "[tabindex]",
      ".cursor-pointer",
      ".clickable",
    ]

    return interactiveSelectors.some((selector) => {
      try {
        return element.matches(selector) || element.closest(selector)
      } catch {
        return false
      }
    })
  }, [])

  // Handle mouse enter/leave on interactive elements
  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Element
      if (target && isInteractiveElement(target)) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    },
    [isInteractiveElement],
  )

  // Handle mouse down
  const handleMouseDown = useCallback(() => {
    setIsClicking(true)
  }, [])

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    setIsClicking(false)
  }, [])

  // Handle mouse enter viewport
  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
  }, [])

  // Handle mouse leave viewport
  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    setIsHovering(false)
    setIsClicking(false)
  }, [])

  useEffect(() => {
    setMounted(true)

    // Don't show custom cursor if user prefers reduced motion
    if (prefersReducedMotion()) {
      return
    }

    // Add event listeners
    const eventOptions = { passive: true }

    document.addEventListener("mousemove", updateCursorPosition, eventOptions)
    document.addEventListener("mouseover", handleMouseOver, eventOptions)
    document.addEventListener("mousedown", handleMouseDown, eventOptions)
    document.addEventListener("mouseup", handleMouseUp, eventOptions)
    document.addEventListener("mouseenter", handleMouseEnter, eventOptions)
    document.addEventListener("mouseleave", handleMouseLeave, eventOptions)

    // Hide default cursor
    document.body.style.cursor = "none"

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      // Restore default cursor
      document.body.style.cursor = "auto"

      // Cancel any pending animation frame
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    updateCursorPosition,
    handleMouseOver,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
    prefersReducedMotion,
  ])

  // Don't render on server or if user prefers reduced motion
  if (!mounted || prefersReducedMotion()) {
    return null
  }

  return (
    <div
      ref={cursorRef}
      className={`
        fixed top-0 left-0 pointer-events-none z-[9999] 
        transition-all duration-150 ease-out
        ${isVisible ? "opacity-100" : "opacity-0"}
        ${isHovering ? "scale-150" : "scale-100"}
        ${isClicking ? "scale-75" : ""}
      `}
      style={{
        transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0)`,
        willChange: "transform",
        mixBlendMode: "difference",
      }}
    >
      <div className="w-4 h-4 bg-white rounded-full border border-white/50 shadow-lg" />
    </div>
  )
}
