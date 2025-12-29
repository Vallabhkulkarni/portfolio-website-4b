import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Page Not Found</CardTitle>
          <CardDescription>
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the
            wrong URL.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild>
              <Link href="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#projects" className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                View Projects
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Or contact me at{" "}
            <a
              href="mailto:kvallabh2000@gmail.com"
              className="text-primary hover:underline"
              aria-label="Contact Vallabh Kulkarni via email"
            >
              kvallabh2000@gmail.com
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
