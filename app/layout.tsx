import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Analytics from "@/components/analytics"
import { Suspense } from "react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
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
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Google Consent Mode v2 - Must be loaded BEFORE gtag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Set default consent mode
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'functionality_storage': 'granted',
                'security_storage': 'granted'
              });
              
              // Initialize gtag with current date
              gtag('js', new Date());
            `,
          }}
        />

        {/* Google tag (gtag.js) - Load immediately after consent setup */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-MNQC3YVDVF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Configure Google Analytics
              gtag('config', 'G-MNQC3YVDVF', {
                'page_title': document.title,
                'page_location': window.location.href,
                'anonymize_ip': true,
                'allow_google_signals': false,
                'allow_ad_personalization_signals': false,
                'cookie_flags': 'SameSite=Strict;Secure'
              });
              
              // Production-ready Google Analytics - Debug logging removed
              // GA tracking is fully functional without debug components
            `,
          }}
        />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Sitemap reference for SEO */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Theme and color scheme */}
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1d4ed8" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />

        {/* Privacy Policy and Cookie Policy meta tags for compliance */}
        <meta name="privacy-policy" content="https://vallabhkulkarni.vercel.app/privacy" />
        <meta name="cookie-policy" content="https://vallabhkulkarni.vercel.app/cookies" />

        {/* Performance hints */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//instagram.com" />

        {/* Critical CSS inlined for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for above-the-fold content */
            body { 
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
            }
            .hero-section {
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .navbar {
              position: fixed;
              top: 0;
              width: 100%;
              z-index: 50;
              backdrop-filter: blur(10px);
            }
            .typing-cursor {
              display: inline-block;
              width: 2px;
              height: 1.2em;
              background-color: currentColor;
              animation: blink 1s infinite;
            }
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            /* Consent banner styles */
            .consent-banner {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              z-index: 1000;
              background: rgba(255, 255, 255, 0.95);
              backdrop-filter: blur(10px);
              border-top: 1px solid #e5e7eb;
            }
            .dark .consent-banner {
              background: rgba(0, 0, 0, 0.95);
              border-top-color: #374151;
            }
          `,
          }}
        />

        {/* Structured Data - Person Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": "https://vallabhkulkarni.vercel.app/#person",
              name: "Vallabh Kulkarni",
              givenName: "Vallabh",
              familyName: "Kulkarni",
              jobTitle: "Software Developer",
              worksFor: {
                "@type": "Organization",
                name: "Oracle",
                url: "https://www.oracle.com",
              },
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "College of Engineering Pune (COEP)",
                url: "https://www.coep.org.in",
              },
              url: "https://vallabhkulkarni.vercel.app",
              image: "/placeholder-user.jpg",
              email: "kvallabh2000@gmail.com",
              sameAs: [
                "https://www.linkedin.com/in/vallabhkulkarni1512/",
                "https://github.com/Vallabhkulkarni",
                "https://www.instagram.com/vallabhcoolkarni",
              ],
              knowsAbout: [
                "Oracle VBCS",
                "Oracle ADF",
                "Oracle SQL",
                "Java",
                "JavaScript",
                "PL/SQL",
                "REST APIs",
                "Web Services",
                "Enterprise Applications",
                "Full Stack Development",
              ],
              description:
                "Experienced software developer at Oracle specializing in VBCS, ADF, Oracle SQL, and enterprise application development.",
            }),
          }}
        />

        {/* Website Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://vallabhkulkarni.vercel.app/#website",
              url: "https://vallabhkulkarni.vercel.app",
              name: "Vallabh Kulkarni Portfolio",
              description: "Professional portfolio of Vallabh Kulkarni, Software Developer at Oracle",
              author: {
                "@id": "https://vallabhkulkarni.vercel.app/#person",
              },
              inLanguage: "en-US",
              copyrightYear: new Date().getFullYear(),
              copyrightHolder: {
                "@id": "https://vallabhkulkarni.vercel.app/#person",
              },
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
          {/* Skip to main content link for accessibility and SEO */}
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
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-label="Loading"></div>
              </div>
            }
          >
            {children}
            <Analytics />
            {/* GADebug component removed - no debug panel will be rendered */}
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
