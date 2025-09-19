"use client"

import { useEffect, useState, memo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import heavy components
const TypingEffect = dynamic(() => import("./typing-effect"), {
  ssr: false,
  loading: () => <span className="text-muted-foreground">Software Developer</span>,
})

const OptimizedHero = memo(() => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Preload critical resources
    const preloadLinks = ["/vallabh-kulkarni-resume.pdf"]

    preloadLinks.forEach((href) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.href = href
      link.as = "document"
      document.head.appendChild(link)
    })
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/vallabh-kulkarni-resume.pdf"
    link.download = "Vallabh-Kulkarni-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!mounted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">Vallabh Kulkarni</h1>
              <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground min-h-[2em]">
                Software Developer
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden pt-20"
    >
      {/* Optimized background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" aria-hidden="true" />

      {/* Reduced floating elements for better performance */}
      <div
        className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Available for opportunities
            </Badge>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              Vallabh Kulkarni
            </h1>

            <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground min-h-[2em] flex items-center justify-center">
              <TypingEffect
                texts={["Software Developer at Oracle", "Full-Stack Engineer", "Problem Solver", "Tech Enthusiast"]}
                speed={100}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about creating innovative solutions with modern technologies. Specializing in enterprise
            applications, cloud platforms, and scalable architectures.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="View my projects"
            >
              View My Work
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-200" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleResumeDownload}
              className="group bg-transparent hover:bg-muted px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Download resume"
            >
              <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
              Download Resume
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="group bg-transparent hover:bg-muted px-8 py-3 text-lg font-medium transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Contact via email"
            >
              <a href="mailto:kvallabh2000@gmail.com">
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                Get In Touch
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Visit GitHub profile"
            >
              <a href="https://github.com/Vallabhkulkarni" target="_blank" rel="noopener noreferrer">
                <Github className="h-6 w-6" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Visit LinkedIn profile"
            >
              <a
                href="https://www.linkedin.com/in/vallabh-kulkarni-a14043227/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-12 w-12 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Send email to Vallabh Kulkarni"
            >
              <a href="mailto:kvallabh2000@gmail.com">
                <Mail className="h-6 w-6" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
})

OptimizedHero.displayName = "OptimizedHero"

export default OptimizedHero
