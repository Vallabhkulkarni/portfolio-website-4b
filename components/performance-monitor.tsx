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
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })
  const [isVisible, setIsVisible] = useState(false)
  const [isDevelopment, setIsDevelopment] = useState(false)

  useEffect(() => {
    // Only show in development
    setIsDevelopment(process.env.NODE_ENV === "development")

    if (typeof window === "undefined" || process.env.NODE_ENV !== "development") {
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

    // Performance observer for Web Vitals
    if ("PerformanceObserver" in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint")
        if (fcpEntry) {
          setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }))
        }
      })

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lcpEntry = entries[entries.length - 1]
        if (lcpEntry) {
          setMetrics((prev) => ({ ...prev, lcp: lcpEntry.startTime }))
        }
      })

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
          }
        }
        setMetrics((prev) => ({ ...prev, cls: clsValue }))
      })

      try {
        fcpObserver.observe({ entryTypes: ["paint"] })
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
        clsObserver.observe({ entryTypes: ["layout-shift"] })
      } catch (error) {
        console.warn("Performance Observer not fully supported:", error)
      }

      // Navigation timing for TTFB
      if (performance.getEntriesByType) {
        const navigationEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[]
        if (navigationEntries.length > 0) {
          const ttfb = navigationEntries[0].responseStart - navigationEntries[0].requestStart
          setMetrics((prev) => ({ ...prev, ttfb }))
        }
      }

      return () => {
        document.removeEventListener("keydown", handleKeyPress)
        fcpObserver.disconnect()
        lcpObserver.disconnect()
        clsObserver.disconnect()
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [])

  const getMetricStatus = (value: number | null, thresholds: { good: number; poor: number }) => {
    if (value === null) return "loading"
    if (value <= thresholds.good) return "good"
    if (value <= thresholds.poor) return "needs-improvement"
    return "poor"
  }

  const formatMetric = (value: number | null, unit = "ms") => {
    if (value === null) return "Loading..."
    return `${Math.round(value)}${unit}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "bg-green-500/10 text-green-600 border-green-200"
      case "needs-improvement":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200"
      case "poor":
        return "bg-red-500/10 text-red-600 border-red-200"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200"
    }
  }

  if (!isDevelopment || !isVisible) {
    return isDevelopment ? (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsVisible(true)}
          size="sm"
          variant="outline"
          className="bg-background/80 backdrop-blur-sm"
        >
          <Activity className="h-4 w-4 mr-2" />
          Performance
        </Button>
      </div>
    ) : null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-background/95 backdrop-blur-sm border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Performance Monitor
            </CardTitle>
            <Button onClick={() => setIsVisible(false)} size="sm" variant="ghost" className="h-6 w-6 p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="font-medium mb-1">First Contentful Paint</div>
              <Badge className={getStatusColor(getMetricStatus(metrics.fcp, { good: 1800, poor: 3000 }))}>
                {formatMetric(metrics.fcp)}
              </Badge>
            </div>
            <div>
              <div className="font-medium mb-1">Largest Contentful Paint</div>
              <Badge className={getStatusColor(getMetricStatus(metrics.lcp, { good: 2500, poor: 4000 }))}>
                {formatMetric(metrics.lcp)}
              </Badge>
            </div>
            <div>
              <div className="font-medium mb-1">Cumulative Layout Shift</div>
              <Badge className={getStatusColor(getMetricStatus(metrics.cls, { good: 0.1, poor: 0.25 }))}>
                {formatMetric(metrics.cls, "")}
              </Badge>
            </div>
            <div>
              <div className="font-medium mb-1">Time to First Byte</div>
              <Badge className={getStatusColor(getMetricStatus(metrics.ttfb, { good: 800, poor: 1800 }))}>
                {formatMetric(metrics.ttfb)}
              </Badge>
            </div>
          </div>
          <div className="text-xs text-muted-foreground pt-2 border-t">Press Ctrl+Shift+P to toggle this monitor</div>
        </CardContent>
      </Card>
    </div>
  )
}
