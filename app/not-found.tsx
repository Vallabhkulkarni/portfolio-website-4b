import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-background flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center space-y-8">
            {/* 404 Visual */}
            <div className="space-y-4">
              <h1 className="text-9xl font-bold text-primary/20">404</h1>
              <h2 className="text-2xl font-semibold text-foreground">Page Not Found</h2>
              <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            </div>

            {/* Navigation Options */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild className="flex items-center gap-2">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex items-center gap-2 bg-transparent">
                  <Link href="/#about">
                    <ArrowLeft className="h-4 w-4" />
                    Go Back
                  </Link>
                </Button>
              </div>

              {/* Quick Links */}
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Quick Links:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/#about">About Me</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/#projects">Projects</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/#skills">Skills</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-4 text-sm text-muted-foreground">
              <p>Need help? Contact me at:</p>
              <a href="mailto:kvallabh2000@gmail.com" className="text-primary hover:underline">
                kvallabh2000@gmail.com
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  )
}
