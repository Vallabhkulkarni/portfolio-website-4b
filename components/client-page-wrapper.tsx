"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"

// Dynamic imports for client-side components
const About = dynamic(() => import("@/components/about"), {
  loading: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
    </div>
  ),
})

const Skills = dynamic(() => import("@/components/skills"), {
  loading: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
    </div>
  ),
})

const Projects = dynamic(() => import("@/components/projects"), {
  loading: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
    </div>
  ),
})

const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => (
    <div className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
      </div>
    </div>
  ),
})

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
})

const EasterEgg = dynamic(() => import("@/components/easter-egg"), {
  ssr: false,
})

const PerformanceMonitor = dynamic(() => import("@/components/performance-monitor"), {
  ssr: false,
})

export default function ClientPageWrapper() {
  return (
    <>
      {/* Below-the-fold sections */}
      <section id="about" className="py-20 bg-muted/50">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          }
        >
          <About />
        </Suspense>
      </section>

      <section id="skills" className="py-20">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          }
        >
          <Skills />
        </Suspense>
      </section>

      <section id="projects" className="py-20 bg-muted/50">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-20 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          }
        >
          <Projects />
        </Suspense>
      </section>

      {/* Footer */}
      <Suspense
        fallback={
          <div className="bg-background border-t border-border py-12">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          </div>
        }
      >
        <Footer />
      </Suspense>

      {/* Client-only components */}
      <CustomCursor />
      <EasterEgg />
      <PerformanceMonitor />
    </>
  )
}
