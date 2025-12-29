"use client"

import { Suspense, lazy } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PrivacyBanner from "@/components/privacy-banner"
import EasterEgg from "@/components/easter-egg"
import MeshBackground from "@/components/mesh-background"

// Lazy load components for better performance
const About = lazy(() => import("@/components/about"))
const Skills = lazy(() => import("@/components/skills"))
const Projects = lazy(() => import("@/components/projects"))

// Loading component
function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-label="Loading section" />
    </div>
  )
}

export default function ClientPageWrapper() {
  return (
    <>
      {/* Background Effects */}
      <MeshBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      {/* Footer */}
      <Footer />

      {/* Interactive Elements */}
      <PrivacyBanner />
      <EasterEgg />
    </>
  )
}
