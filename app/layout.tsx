import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Analytics from "@/components/analytics"
import PerformanceMonitor from "@/components/performance-monitor"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL("https://vallabhkulkarni.vercel.app"),
  title: {
    default: "Vallabh Kulkarni | Software Developer at Oracle",
    template: "%s | Vallabh Kulkarni",
  },
  description:
    "Vallabh Kulkarni is an experienced software developer at Oracle specializing in VBCS, ADF, Oracle SQL, and enterprise application development. B.Tech Computer Engineering graduate from COEP with expertise in Java, REST APIs, and full-stack development.",
  keywords: [
    "Vallabh Kulkarni",
    "Software Developer",
    "Oracle Developer",
    "VBCS",
    "ADF",
    "Oracle SQL",
    "Enterprise Applications",
    "Full Stack Developer",
    "Java Developer",
    "REST APIs",
    "Web Services",
    "Portfolio",
    "COEP",
    "Computer Engineering",
    "Oracle HCM",
    "HDL",
    "PL/SQL",
    "JavaScript",
    "Application Developer",
    "Software Engineer",
  ],
  authors: [{ name: "Vallabh Kulkarni", url: "https://vallabhkulkarni.vercel.app" }],
  creator: "Vallabh Kulkarni",
  publisher: "Vallabh Kulkarni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vallabhkulkarni.vercel.app",
    title: "Vallabh Kulkarni | Software Developer at Oracle",
    description:
      "Experienced software developer specializing in Oracle technologies, VBCS, ADF, and enterprise application development. Explore my portfolio showcasing innovative projects and technical expertise.",
    siteName: "Vallabh Kulkarni Portfolio",
    images: [
      {
        url: "/placeholder-user.jpg",
        width: 1200,
        height: 630,
        alt: "Vallabh Kulkarni - Software Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vallabh Kulkarni | Software Developer at Oracle",
    description:
      "Experienced software developer specializing in Oracle technologies, VBCS, ADF, and enterprise application development.",
    creator: "@vallabhcoolkarni",
    images: ["/placeholder-user.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "googledd242a5960a833d8",
  },
  category: "Technology",
  classification: "Portfolio",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//instagram.com" />

        {/* Preload critical assets */}
        <link rel="preload" href="/vallabh-kulkarni-resume.pdf" as="document" />
        <link rel="preload" href="/placeholder-user.jpg" as="image" />

        {/* Google Consent Mode v2 - Optimized */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });
              gtag('js', new Date());
            `,
          }}
        />

        {/* Google Analytics - Async loading */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNQC3YVDVF" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('config', 'G-MNQC3YVDVF', {
                'page_title': document.title,
                'page_location': window.location.href,
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false,
                'cookie_flags': 'SameSite=Strict;Secure',
                'send_page_view': false
              });
            `,
          }}
        />

        {/* Optimized favicon and icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* SEO and performance meta tags */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1d4ed8" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        <meta name="privacy-policy" content="https://vallabhkulkarni.vercel.app/privacy" />
        <meta name="cookie-policy" content="https://vallabhkulkarni.vercel.app/cookies" />

        {/* Critical CSS - Optimized and minified */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            body{font-family:'Inter',system-ui,-apple-system,sans-serif;line-height:1.6;margin:0;padding:0}
            .hero-section{min-height:100vh;display:flex;align-items:center;justify-content:center}
            .navbar{position:fixed;top:0;width:100%;z-index:50;backdrop-filter:blur(10px)}
            .typing-cursor{display:inline-block;width:2px;height:1.2em;background-color:currentColor;animation:blink 1s infinite}
            @keyframes blink{0%,50%{opacity:1}51%,100%{opacity:0}}
            .consent-banner{position:fixed;bottom:0;left:0;right:0;z-index:1000;background:rgba(255,255,255,0.95);backdrop-filter:blur(10px);border-top:1px solid #e5e7eb}
            .dark .consent-banner{background:rgba(0,0,0,0.95);border-top-color:#374151}
            .bg-grid-pattern{background-image:radial-gradient(circle,rgba(59,130,246,0.1) 1px,transparent 1px);background-size:20px 20px}
            @media (prefers-reduced-motion:reduce){*{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}}
          `,
          }}
        />

        {/* Structured Data - Optimized */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "https://vallabhkulkarni.vercel.app/#person",
                  name: "Vallabh Kulkarni",
                  jobTitle: "Software Developer",
                  worksFor: {
                    "@type": "Organization",
                    name: "Oracle",
                    url: "https://www.oracle.com",
                  },
                  url: "https://vallabhkulkarni.vercel.app",
                  image: "/placeholder-user.jpg",
                  email: "kvallabh2000@gmail.com",
                  sameAs: [
                    "https://www.linkedin.com/in/vallabhkulkarni1512/",
                    "https://github.com/Vallabhkulkarni",
                    "https://www.instagram.com/vallabhcoolkarni",
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://vallabhkulkarni.vercel.app/#website",
                  url: "https://vallabhkulkarni.vercel.app",
                  name: "Vallabh Kulkarni Portfolio",
                  author: { "@id": "https://vallabhkulkarni.vercel.app/#person" },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="vallabh-portfolio-theme"
        >
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all duration-200"
            aria-label="Skip to main content"
          >
            Skip to main content
          </a>

          <Suspense
            fallback={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-label="Loading" />
              </div>
            }
          >
            {children}
            <Analytics />
            <PerformanceMonitor />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
