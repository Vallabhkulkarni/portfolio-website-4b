"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Monitor, X, Activity, Clock, Zap, Eye } from "lucide-react"

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  domContentLoaded: number | null
  loadComplete: number | null
}

export default function PerformanceMonitor() {
  const [isVisible, setIsVisible] = useState(false)
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    domContentLoaded: null,
    loadComplete: null,
  })

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return

    const measurePerformance = () => {
      if ("performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

        setMetrics((prev) => ({
          ...prev,
          ttfb: navigation.responseStart - navigation.requestStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
          loadComplete: navigation.loadEventEnd - navigation.navigationStart,
        }))

        // Web Vitals
        if ("PerformanceObserver" in window) {
          // First Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const fcpEntry = entries.find((entry) => entry.name === "first-contentful-paint")
            if (fcpEntry) {
              setMetrics((prev) => ({ ...prev, fcp: fcpEntry.startTime }))
            }
          }).observe({ entryTypes: ["paint"] })

          // Largest Contentful Paint
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1]
            if (lastEntry) {
              setMetrics((prev) => ({ ...prev, lcp: lastEntry.startTime }))
            }
          }).observe({ entryTypes: ["largest-contentful-paint"] })

          // First Input Delay
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (entry.processingStart && entry.startTime) {
                const fid = entry.processingStart - entry.startTime
                setMetrics((prev) => ({ ...prev, fid }))
              }
            })
          }).observe({ entryTypes: ["first-input"] })

          // Cumulative Layout Shift
          let clsValue = 0
          new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
                setMetrics((prev) => ({ ...prev, cls: clsValue }))
              }
            })
          }).observe({ entryTypes: ["layout-shift"] })
        }
      }
    }

    measurePerformance()

    // Keyboard shortcut to toggle (Ctrl+Shift+P)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "P") {
        e.preventDefault()
        setIsVisible((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [])

  const getScoreColor = (metric: string, value: number | null) => {
    if (value === null) return "secondary"

    switch (metric) {
      case "fcp":
        return value <= 1800 ? "default" : value <= 3000 ? "secondary" : "destructive"
      case "lcp":
        return value <= 2500 ? "default" : value <= 4000 ? "secondary" : "destructive"
      case "fid":
        return value <= 100 ? "default" : value <= 300 ? "secondary" : "destructive"
      case "cls":
        return value <= 0.1 ? "default" : value <= 0.25 ? "secondary" : "destructive"
      case "ttfb":
        return value <= 800 ? "default" : value <= 1800 ? "secondary" : "destructive"
      default:
        return "secondary"
    }
  }

  const formatValue = (value: number | null, unit = "ms") => {
    if (value === null) return "Measuring..."
    if (unit === "score") return value.toFixed(3)
    return `${Math.round(value)}${unit}`
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
              <Monitor className="h-4 w-4" />
              <CardTitle className="text-sm">Performance Monitor</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                FCP
              </span>
              <Badge variant={getScoreColor("fcp", metrics.fcp)} className="text-xs">
                {formatValue(metrics.fcp)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                LCP
              </span>
              <Badge variant={getScoreColor("lcp", metrics.lcp)} className="text-xs">
                {formatValue(metrics.lcp)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                FID
              </span>
              <Badge variant={getScoreColor("fid", metrics.fid)} className="text-xs">
                {formatValue(metrics.fid)}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                CLS
              </span>
              <Badge variant={getScoreColor("cls", metrics.cls)} className="text-xs">
                {formatValue(metrics.cls, "score")}
              </Badge>
            </div>

            <div className="flex items-center justify-between col-span-2">
              <span className="text-xs text-muted-foreground">TTFB</span>
              <Badge variant={getScoreColor("ttfb", metrics.ttfb)} className="text-xs">
                {formatValue(metrics.ttfb)}
              </Badge>
            </div>
          </div>

          <div className="text-xs text-muted-foreground text-center pt-2 border-t">Press Ctrl+Shift+P to toggle</div>
        </CardContent>
      </Card>
    </div>
  )
}
