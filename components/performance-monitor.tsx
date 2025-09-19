"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, X, Activity, Clock, Zap, Eye } from "lucide-react"

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Only show in development
    if (process.env.NODE_ENV !== "development") {
      return
    }

    // Keyboard shortcut to toggle performance monitor (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault()
        setIsVisible((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyPress)

    // Collect performance metrics
    const collectMetrics = () => {
      try {
        // Get navigation timing
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        if (navigation) {
          setMetrics((prev) => ({
            ...prev,
            ttfb: navigation.responseStart - navigation.requestStart,
          }))
        }

        // Get paint timing
        const paintEntries = performance.getEntriesByType("paint")
        paintEntries.forEach((entry) => {
          if (entry.name === "first-contentful-paint") {
            setMetrics((prev) => ({ ...prev, fcp: entry.startTime }))
          }
        })

        // Web Vitals observer
        if ("PerformanceObserver" in window) {
          // LCP Observer
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
          })
          lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

          // FID Observer
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              setMetrics((prev) => ({ ...prev, fid: entry.processingStart - entry.startTime }))
            })
          })
          fidObserver.observe({ type: "first-input", buffered: true })

          // CLS Observer
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
          clsObserver.observe({ type: "layout-shift", buffered: true })
        }
      } catch (error) {
        console.warn("Performance monitoring error:", error)
      }
    }

    // Collect metrics after page load
    if (document.readyState === "complete") {
      collectMetrics()
    } else {
      window.addEventListener("load", collectMetrics)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress)
      window.removeEventListener("load", collectMetrics)
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

  if (!mounted || process.env.NODE_ENV !== "development" || !isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-[9998] max-w-sm">
      <Card className="shadow-lg border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Performance Monitor
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
              <X className="w-3 h-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {/* Core Web Vitals */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-3 h-3" />
                <span className="text-xs font-medium">FCP</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    getMetricStatus(metrics.fcp, { good: 1800, poor: 3000 }) === "good"
                      ? "default"
                      : getMetricStatus(metrics.fcp, { good: 1800, poor: 3000 }) === "needs-improvement"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {formatMetric(metrics.fcp)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-3 h-3" />
                <span className="text-xs font-medium">LCP</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    getMetricStatus(metrics.lcp, { good: 2500, poor: 4000 }) === "good"
                      ? "default"
                      : getMetricStatus(metrics.lcp, { good: 2500, poor: 4000 }) === "needs-improvement"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {formatMetric(metrics.lcp)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-3 h-3" />
                <span className="text-xs font-medium">FID</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    getMetricStatus(metrics.fid, { good: 100, poor: 300 }) === "good"
                      ? "default"
                      : getMetricStatus(metrics.fid, { good: 100, poor: 300 }) === "needs-improvement"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {formatMetric(metrics.fid)}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-medium">CLS</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    getMetricStatus(metrics.cls, { good: 0.1, poor: 0.25 }) === "good"
                      ? "default"
                      : getMetricStatus(metrics.cls, { good: 0.1, poor: 0.25 }) === "needs-improvement"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {formatMetric(metrics.cls, "")}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="w-3 h-3" />
                <span className="text-xs font-medium">TTFB</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    getMetricStatus(metrics.ttfb, { good: 800, poor: 1800 }) === "good"
                      ? "default"
                      : getMetricStatus(metrics.ttfb, { good: 800, poor: 1800 }) === "needs-improvement"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-xs"
                >
                  {formatMetric(metrics.ttfb)}
                </Badge>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t text-xs text-muted-foreground">Press Ctrl+Shift+P to toggle</div>
        </CardContent>
      </Card>
    </div>
  )
}
