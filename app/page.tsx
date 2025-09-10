import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import EasterEgg from "@/components/easter-egg"
import StructuredData from "@/components/structured-data"

export default function Home() {
  return (
    <>
      {/* Structured Data for SEO */}
      <StructuredData />

      {/* Custom Cursor Effect */}
      <CustomCursor />

      {/* Easter Egg Component */}
      <EasterEgg />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="relative">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <Suspense
            fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            }
          >
            <Hero />
          </Suspense>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-muted/50">
          <Suspense
            fallback={
              <div className="container mx-auto px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            }
          >
            <About />
          </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <Suspense
            fallback={
              <div className="container mx-auto px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            }
          >
            <Skills />
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-muted/50">
          <Suspense
            fallback={
              <div className="container mx-auto px-4 py-20 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              </div>
            }
          >
            <Projects />
          </Suspense>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
