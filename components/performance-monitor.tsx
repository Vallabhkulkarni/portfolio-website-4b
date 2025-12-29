"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Activity } from "lucide-react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export default function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") {
      return
    }

    // Keyboard shortcut to toggle monitor
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault()
        setIsVisible((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    // Web Vitals measurement
    const measureWebVitals = () => {
      // First Contentful Paint
      const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0] as PerformanceEntry
      if (fcpEntry) {
        setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }))
      }

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navigationEntry) {
        setMetrics((prev) => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }))
      }

      // Largest Contentful Paint (requires observer)
      if ("PerformanceObserver" in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            if (lastEntry) {
              setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
            }
          })
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

          // First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              setMetrics((prev) => ({ ...prev, fid: entry.processingStart - entry.startTime }))
            })
          })
          fidObserver.observe({ entryTypes: ["first-input"] })

          // Cumulative Layout Shift
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            })
            setMetrics((prev) => ({ ...prev, cls: clsValue }))
          })
          clsObserver.observe({ entryTypes: ["layout-shift"] })
        } catch (error) {
          console.warn("Performance Observer not supported:", error)
        }
      }
    }

    // Measure after page load
    if (document.readyState === "complete") {
      measureWebVitals()
    } else {
      window.addEventListener("load", measureWebVitals)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("load", measureWebVitals)
    }
  }, [])

  const getMetricStatus = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return "loading"
    if (value <= thresholds.good) return "good"
    if (value <= thresholds.poor) return "needs-improvement"
    return "poor"
  }

  const formatMetric = (value: number | null, unit = "ms") => {
    if (value === null) return "Measuring..."
    return `${Math.round(value)}${unit}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500/10 text-green-700 dark:text-green-300"
      case "needs-improvement":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300"
      case "poor":
        return "bg-red-500/10 text-red-700 dark:text-red-300"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300"
    }
  }

  if (process.env.NODE_ENV !== "development" || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm">Performance Monitor</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6"
              aria-label="Close performance monitor"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span>FCP:</span>
                <Badge className={getStatusColor(getMetricStatus(metrics.fcp, { good: 1800, poor: 3000 }))}>
                  {formatMetric(metrics.fcp)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>LCP:</span>
                <Badge className={getStatusColor(getMetricStatus(metrics.lcp, { good: 2500, poor: 4000 }))}>
                  {formatMetric(metrics.lcp)}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>FID:</span>
                <Badge className={getStatusColor(getMetricStatus(metrics.fid, { good: 100, poor: 300 }))}>
                  {formatMetric(metrics.fid)}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span>CLS:</span>
                <Badge className={getStatusColor(getMetricStatus(metrics.cls, { good: 0.1, poor: 0.25 }))}>
                  {formatMetric(metrics.cls, "")}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>TTFB:</span>
                <Badge className={getStatusColor(getMetricStatus(metrics.ttfb, { good: 800, poor: 1800 }))}>
                  {formatMetric(metrics.ttfb)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground text-center pt-2 border-t">Press Ctrl+Shift+P to toggle</div>
        </CardContent>
      </Card>
    </div>
  )
}
