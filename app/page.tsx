import type { Metadata } from "next"
import ClientPageWrapper from "@/components/client-page-wrapper"
import Hero from "@/components/hero"

export const metadata: Metadata = {
  title: "Vallabh Kulkarni | Software Developer at Oracle",
  description:
    "Experienced software developer specializing in Oracle technologies, VBCS, ADF, and enterprise application development. Explore my portfolio showcasing innovative projects and technical expertise.",
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
    "System Design",
    "Problem Solving",
  ],
  openGraph: {
    title: "Vallabh Kulkarni | Software Developer at Oracle",
    description:
      "Experienced software developer specializing in Oracle technologies, VBCS, ADF, and enterprise application development.",
    url: "https://vallabhkulkarni.vercel.app",
    siteName: "Vallabh Kulkarni Portfolio",
    images: [
      {
        url: "/placeholder-user.jpg",
        width: 1200,
        height: 630,
        alt: "Vallabh Kulkarni - Software Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
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
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vallabhkulkarni.vercel.app",
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientPageWrapper />
    </>
  )
}
