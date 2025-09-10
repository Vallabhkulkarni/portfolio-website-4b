import { Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Analytics from "@/components/analytics"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vallabh Kulkarni</h3>
            <p className="text-sm text-muted-foreground">
              Software Developer at Oracle specializing in VBCS, ADF, and enterprise application development.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/Vallabhkulkarni"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://www.linkedin.com/in/vallabhkulkarni1512/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://www.instagram.com/vallabhcoolkarni"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                About
              </a>
              <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Skills
              </a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Projects
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href="mailto:kvallabh2000@gmail.com" className="hover:text-foreground transition-colors">
                  kvallabh2000@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>Available on LinkedIn</span>
              </div>
            </div>
          </div>

          {/* Legal & Privacy */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <div className="space-y-2">
              <a
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Privacy Policy
              </a>
              <a
                href="/cookies"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors block"
              >
                Cookie Policy
              </a>
              <div className="text-sm text-muted-foreground">
                <span>© {currentYear} Vallabh Kulkarni</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
          </div>

          {/* Analytics Privacy Controls */}
          <Analytics />
        </div>

        {/* Additional Footer Info */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="text-center text-xs text-muted-foreground">
            <p>
              This website uses Google Analytics to analyze traffic and improve user experience.
              <br />
              Your privacy is important to us. No personal data is collected without consent.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
