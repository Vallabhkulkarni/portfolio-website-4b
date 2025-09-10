"use client"

import { useEffect, useState } from "react"

export default function EasterEgg() {
  const [sequence, setSequence] = useState<string[]>([])
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ]

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newSequence = [...sequence, event.code].slice(-konamiCode.length)
      setSequence(newSequence)

      if (newSequence.join(",") === konamiCode.join(",")) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 3000)
        setSequence([])
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [sequence, konamiCode])

  if (!showEasterEgg) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="easter-egg-title"
      aria-describedby="easter-egg-description"
    >
      <div className="text-center text-white">
        <div className="text-6xl mb-4" aria-hidden="true">
          🎉
        </div>
        <h2 id="easter-egg-title" className="text-2xl font-bold mb-2">
          Konami Code Activated!
        </h2>
        <p id="easter-egg-description" className="text-lg">
          You found the secret! 🎮
        </p>
      </div>
    </div>
  )
}
