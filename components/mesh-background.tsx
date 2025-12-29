"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Animation variables
    let time = 0
    const gridSize = 50
    const amplitude = 20

    // Get current theme colors
    const getCurrentTheme = () => {
      const currentTheme = theme === "system" ? systemTheme : theme
      return currentTheme === "dark"
    }

    const animate = () => {
      const isDark = getCurrentTheme()

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set colors based on theme
      const primaryColor = isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.08)"
      const secondaryColor = isDark ? "rgba(139, 92, 246, 0.05)" : "rgba(139, 92, 246, 0.04)"

      // Draw animated mesh
      ctx.strokeStyle = primaryColor
      ctx.lineWidth = 1

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        for (let y = 0; y <= canvas.height; y += 2) {
          const wave = Math.sin((x + time) * 0.01) * amplitude * Math.sin((y + time) * 0.005)
          const xPos = x + wave

          if (y === 0) {
            ctx.moveTo(xPos, y)
          } else {
            ctx.lineTo(xPos, y)
          }
        }
        ctx.stroke()
      }

      // Horizontal lines
      ctx.strokeStyle = secondaryColor
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        for (let x = 0; x <= canvas.width; x += 2) {
          const wave = Math.cos((y + time) * 0.01) * amplitude * Math.cos((x + time) * 0.005)
          const yPos = y + wave

          if (x === 0) {
            ctx.moveTo(x, yPos)
          } else {
            ctx.lineTo(x, yPos)
          }
        }
        ctx.stroke()
      }

      // Add floating particles
      ctx.fillStyle = isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.2)"
      for (let i = 0; i < 5; i++) {
        const x = Math.sin(time * 0.001 + i) * canvas.width * 0.3 + canvas.width * 0.5
        const y = Math.cos(time * 0.0015 + i) * canvas.height * 0.2 + canvas.height * 0.5
        const radius = Math.sin(time * 0.002 + i) * 2 + 3

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 1
      animationRef.current = requestAnimationFrame(animate)
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      // Static version for users who prefer reduced motion
      const isDark = getCurrentTheme()
      ctx.strokeStyle = isDark ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.03)"
      ctx.lineWidth = 1

      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    } else {
      animate()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme, systemTheme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        background: "transparent",
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  )
}
