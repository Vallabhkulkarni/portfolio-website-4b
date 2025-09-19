import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import ClientPageWrapper from "@/components/client-page-wrapper"
import StructuredData from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <StructuredData />

      {/* Critical above-the-fold content - Server rendered */}
      <Navbar />

      <main id="main-content" className="relative">
        <Hero />

        {/* Client-side rendered content */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          }
        >
          <ClientPageWrapper />
        </Suspense>
      </main>
    </>
  )
}
