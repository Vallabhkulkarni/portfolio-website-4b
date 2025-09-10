"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X, Download } from "lucide-react"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80 // Account for navbar height
      const elementPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
      setIsMobileMenuOpen(false)
    }
  }

  const handleResumeDownload = () => {
    const link = document.createElement("a")
    link.href = "/vallabh-kulkarni-resume.pdf"
    link.download = "Vallabh-Kulkarni-Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              aria-label="Go to home section"
            >
              VK
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium relative group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-3 py-2"
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeDownload}
                className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Download Vallabh Kulkarni's resume"
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                aria-label="Contact Vallabh Kulkarni via email"
              >
                <a href="mailto:kvallabh2000@gmail.com">Contact</a>
              </Button>
              <ModeToggle />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
                className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-background/98 backdrop-blur-md border-t border-border"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-3 px-2 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-border space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResumeDownload}
                    className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="Download Vallabh Kulkarni's resume"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    aria-label="Contact Vallabh Kulkarni via email"
                  >
                    <a href="mailto:kvallabh2000@gmail.com">Contact Me</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Spacer to prevent content overlap */}
      <div className="h-20" aria-hidden="true"></div>
    </>
  )
}
