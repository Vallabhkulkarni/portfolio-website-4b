"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Activity, Eye } from "lucide-react"

interface PerformanceMetrics {
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  ttfb: number // Time to First Byte
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development or when explicitly enabled
    const showMonitor = process.env.NODE_ENV === "development" || localStorage.getItem("show-perf-monitor") === "true"
    setIsVisible(showMonitor)

    if (!showMonitor) return

    const measurePerformance = () => {
      try {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType("paint")

        const fcp = paint.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0
        const ttfb = navigation.responseStart - navigation.requestStart

        // Web Vitals observer
        if ("PerformanceObserver" in window) {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.entryType === "largest-contentful-paint") {
                setMetrics((prev) => ({ ...prev!, lcp: entry.startTime }))
              }
              if (entry.entryType === "first-input") {
                setMetrics((prev) => ({ ...prev!, fid: (entry as any).processingStart - entry.startTime }))
              }
              if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput) {
                setMetrics((prev) => ({ ...prev!, cls: prev!.cls + (entry as any).value }))
              }
            }
          })

          observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })
        }

        setMetrics({
          fcp,
          lcp: 0, // Will be updated by observer
          fid: 0, // Will be updated by observer
          cls: 0, // Will be updated by observer
          ttfb,
        })
      } catch (error) {
        console.warn("Performance monitoring error:", error)
      }
    }

    // Measure after page load
    if (document.readyState === "complete") {
      measurePerformance()
    } else {
      window.addEventListener("load", measurePerformance)
    }

    return () => {
      window.removeEventListener("load", measurePerformance)
    }
  }, [])

  const getScoreColor = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return "text-green-600"
    if (value <= thresholds[1]) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreLabel = (value: number, thresholds: [number, number]) => {
    if (value <= thresholds[0]) return "Good"
    if (value <= thresholds[1]) return "Needs Improvement"
    return "Poor"
  }

  if (!isVisible || !metrics) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card className="bg-background/95 backdrop-blur-sm border shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Performance Monitor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <div className="flex items-center justify-between">
                <span>FCP</span>
                <Badge variant="outline" className={getScoreColor(metrics.fcp, [1800, 3000])}>
                  {Math.round(metrics.fcp)}ms
                </Badge>
              </div>
              <div className="text-muted-foreground text-xs">{getScoreLabel(metrics.fcp, [1800, 3000])}</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span>LCP</span>
                <Badge variant="outline" className={getScoreColor(metrics.lcp, [2500, 4000])}>
                  {Math.round(metrics.lcp)}ms
                </Badge>
              </div>
              <div className="text-muted-foreground text-xs">{getScoreLabel(metrics.lcp, [2500, 4000])}</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span>FID</span>
                <Badge variant="outline" className={getScoreColor(metrics.fid, [100, 300])}>
                  {Math.round(metrics.fid)}ms
                </Badge>
              </div>
              <div className="text-muted-foreground text-xs">{getScoreLabel(metrics.fid, [100, 300])}</div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <span>CLS</span>
                <Badge variant="outline" className={getScoreColor(metrics.cls, [0.1, 0.25])}>
                  {metrics.cls.toFixed(3)}
                </Badge>
              </div>
              <div className="text-muted-foreground text-xs">{getScoreLabel(metrics.cls, [0.1, 0.25])}</div>
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="w-full text-xs">
            <Eye className="h-3 w-3 mr-1" />
            Hide Monitor
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
