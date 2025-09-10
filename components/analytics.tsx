"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Cookie, Shield, Eye, EyeOff } from "lucide-react"

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function Analytics() {
  const [showBanner, setShowBanner] = useState(false)
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      // Check if consent has been given before
      const consent = localStorage.getItem("analytics-consent")
      if (consent === null) {
        setShowBanner(true)
        setConsentGiven(null)
      } else {
        setConsentGiven(consent === "true")
        setShowBanner(false)

        // Update consent mode based on stored preference
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: consent === "true" ? "granted" : "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
          })
        }
      }
    } catch (error) {
      console.warn("Analytics consent error:", error)
      setShowBanner(true)
      setConsentGiven(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleAccept = () => {
    try {
      localStorage.setItem("analytics-consent", "true")
      setConsentGiven(true)
      setShowBanner(false)

      // Update consent mode
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        })

        // Send a page view event after consent
        window.gtag("event", "page_view", {
          page_title: document.title,
          page_location: window.location.href,
          page_path: window.location.pathname,
        })

        // Send consent granted event
        window.gtag("event", "consent_granted", {
          event_category: "privacy",
          event_label: "analytics_consent",
        })
      }
    } catch (error) {
      console.error("Error accepting consent:", error)
    }
  }

  const handleDecline = () => {
    try {
      localStorage.setItem("analytics-consent", "false")
      setConsentGiven(false)
      setShowBanner(false)

      // Update consent mode to deny analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        })

        // Send consent declined event (will be blocked by consent mode)
        window.gtag("event", "consent_declined", {
          event_category: "privacy",
          event_label: "analytics_consent",
        })
      }
    } catch (error) {
      console.error("Error declining consent:", error)
    }
  }

  const toggleConsent = () => {
    try {
      const newConsent = !consentGiven
      localStorage.setItem("analytics-consent", newConsent.toString())
      setConsentGiven(newConsent)

      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: newConsent ? "granted" : "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
        })

        if (newConsent) {
          // Send a page view event after enabling
          window.gtag("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname,
          })

          window.gtag("event", "consent_enabled", {
            event_category: "privacy",
            event_label: "analytics_toggle",
          })
        } else {
          window.gtag("event", "consent_disabled", {
            event_category: "privacy",
            event_label: "analytics_toggle",
          })
        }
      }
    } catch (error) {
      console.error("Error toggling consent:", error)
    }
  }

  const clearAnalyticsData = () => {
    try {
      // Clear analytics cookies
      const cookies = document.cookie.split(";")
      cookies.forEach((cookie) => {
        const eqPos = cookie.indexOf("=")
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()
        if (name.startsWith("_ga") || name.startsWith("_gid")) {
          // Clear for current domain
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
          // Clear for parent domain
          const domain = window.location.hostname
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${domain}`
        }
      })

      // Clear localStorage
      localStorage.removeItem("analytics-consent")
      setConsentGiven(null)
      setShowBanner(true)

      // Send data cleared event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "data_cleared", {
          event_category: "privacy",
          event_label: "analytics_data",
        })
      }
    } catch (error) {
      console.error("Error clearing data:", error)
    }
  }

  // Don't render anything while loading
  if (isLoading) {
    return null
  }

  // Consent Banner Component
  if (showBanner) {
    return (
      <div className="consent-banner fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border p-4 shadow-lg">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Cookie Consent</CardTitle>
              </div>
              <CardDescription className="text-sm">
                We use cookies to analyze website traffic and optimize your experience. Your data will be aggregated
                with all other user data and help us improve our website.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Privacy First
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    No Personal Data
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    GDPR Compliant
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleDecline}>
                    Decline
                  </Button>
                  <Button size="sm" onClick={handleAccept}>
                    Accept
                  </Button>
                </div>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">
                <a href="/privacy" className="underline hover:no-underline">
                  Privacy Policy
                </a>
                {" • "}
                <a href="/cookies" className="underline hover:no-underline">
                  Cookie Policy
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Privacy controls component for footer
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleConsent}
        className="h-auto p-1 text-xs hover:text-foreground"
        aria-label={consentGiven ? "Disable analytics" : "Enable analytics"}
      >
        {consentGiven ? (
          <>
            <Eye className="h-3 w-3 mr-1" />
            Analytics On
          </>
        ) : (
          <>
            <EyeOff className="h-3 w-3 mr-1" />
            Analytics Off
          </>
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={clearAnalyticsData}
        className="h-auto p-1 text-xs hover:text-foreground"
        aria-label="Clear analytics data"
      >
        <X className="h-3 w-3 mr-1" />
        Clear Data
      </Button>
    </div>
  )
}
