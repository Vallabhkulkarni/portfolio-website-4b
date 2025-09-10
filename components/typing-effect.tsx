"use client"

import { useState, useEffect } from "react"

interface TypingEffectProps {
  texts: string[]
  speed?: number
  deleteSpeed?: number
  delaySpeed?: number
  className?: string
}

export default function TypingEffect({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delaySpeed = 2000,
  className = "",
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

  useEffect(() => {
    if (!texts || texts.length === 0) return

    const timeout = setTimeout(
      () => {
        if (isWaiting) {
          setIsWaiting(false)
          setIsDeleting(true)
          return
        }

        const fullText = texts[currentTextIndex]

        if (!isDeleting) {
          // Typing
          if (currentText.length < fullText.length) {
            setCurrentText(fullText.substring(0, currentText.length + 1))
          } else {
            setIsWaiting(true)
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(fullText.substring(0, currentText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isWaiting ? delaySpeed : isDeleting ? deleteSpeed : speed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, currentTextIndex, isDeleting, isWaiting, texts, speed, deleteSpeed, delaySpeed])

  if (!texts || texts.length === 0) {
    return <span className={className}>Software Developer</span>
  }

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
