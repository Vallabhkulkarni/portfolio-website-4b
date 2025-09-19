import { Suspense } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import StructuredData from "@/components/structured-data"

// Dynamic imports for better performance
const OptimizedHero = dynamic(() => import("@/components/optimized-hero"), {
  ssr: true,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
    </div>
  ),
})

const About = dynamic(() => import("@/components/about"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
    </div>
  ),
})

const Skills = dynamic(() => import("@/components/skills"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
    </div>
  ),
})

const OptimizedProjects = dynamic(() => import("@/components/optimized-projects"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
    </div>
  ),
})

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => (
    <div className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
      </div>
    </div>
  ),
})

// Lazy load non-critical components
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
})

const EasterEgg = dynamic(() => import("@/components/easter-egg"), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content */}
      <StructuredData />
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section - Critical, load immediately */}
        <section id="home" className="hero-section">
          <OptimizedHero />
        </section>

        {/* Below-the-fold content - Lazy loaded */}
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
            <OptimizedProjects />
          </Suspense>
        </section>
      </main>

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

      {/* Non-critical components */}
      <CustomCursor />
      <EasterEgg />
    </>
  )
}
