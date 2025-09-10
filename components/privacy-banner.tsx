"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, X } from "lucide-react"

export default function PrivacyBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState<boolean | null>(null)

  useEffect(() => {
    // Check for existing consent
    const consent = localStorage.getItem("ga-consent")
    if (consent === null) {
      setShowBanner(true)
      setHasConsent(null)
    } else {
      setHasConsent(consent === "true")
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("ga-consent", "true")
    setHasConsent(true)
    setShowBanner(false)

    // Initialize Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
      })
    }
  }

  const handleDecline = () => {
    localStorage.setItem("ga-consent", "false")
    setHasConsent(false)
    setShowBanner(false)

    // Disable Google Analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
      })
    }
  }

  const handleClose = () => {
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
      <Card className="border-2 border-primary/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-sm mb-2">Cookie Consent</h3>
              <p className="text-xs text-muted-foreground mb-3">
                We use Google Analytics to understand how you interact with our website. This helps us improve your
                experience. You can accept or decline analytics cookies.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAccept} className="text-xs px-3 py-1 h-auto">
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDecline}
                  className="text-xs px-3 py-1 h-auto bg-transparent"
                >
                  Decline
                </Button>
              </div>
            </div>
            <Button size="sm" variant="ghost" onClick={handleClose} className="h-auto p-1" aria-label="Close banner">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
