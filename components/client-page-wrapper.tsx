"use client"

import { Suspense, lazy } from "react"
import dynamic from "next/dynamic"

// Lazy load components that don't need SSR
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
  loading: () => null,
})

const PrivacyBanner = dynamic(() => import("@/components/privacy-banner"), {
  ssr: false,
  loading: () => null,
})

const EasterEgg = dynamic(() => import("@/components/easter-egg"), {
  ssr: false,
  loading: () => null,
})

// Lazy load sections for better performance
const About = lazy(() => import("@/components/about"))
const Skills = lazy(() => import("@/components/skills"))
const Projects = lazy(() => import("@/components/projects"))
const Footer = lazy(() => import("@/components/footer"))

// Loading component for sections
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
)

export default function ClientPageWrapper() {
  return (
    <>
      {/* Client-only components */}
      <CustomCursor />
      <PrivacyBanner />
      <EasterEgg />

      {/* Lazy-loaded sections */}
      <Suspense fallback={<SectionLoader />}>
        <About />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Skills />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Projects />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </>
  )
}
