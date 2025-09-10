"use client"

import { useEffect } from "react"

export default function StructuredData() {
  const personSchema = {
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
  }

  const websiteSchema = {
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
  }

  const projectsSchema = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "@id": "https://vallabhkulkarni.vercel.app/#stl-c-project",
      name: "STL_C",
      description:
        "C implementation of STL structures from C++, providing efficient data structures and algorithms for C developers.",
      url: "https://vallabhkulkarni.vercel.app/#projects",
      codeRepository: "https://github.com/Vallabhkulkarni/STL_C",
      programmingLanguage: "C",
      author: {
        "@id": "https://vallabhkulkarni.vercel.app/#person",
      },
      keywords: ["C", "Data Structures", "Algorithms", "STL"],
      dateCreated: "2023",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "@id": "https://vallabhkulkarni.vercel.app/#threading-library-project",
      name: "Userland Threading Library",
      description:
        "Python-based threading library supporting One-One and Many-One models for efficient concurrent programming.",
      url: "https://vallabhkulkarni.vercel.app/#projects",
      programmingLanguage: "Python",
      author: {
        "@id": "https://vallabhkulkarni.vercel.app/#person",
      },
      keywords: ["Python", "Threading", "Concurrency"],
      dateCreated: "2023",
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "@id": "https://vallabhkulkarni.vercel.app/#http-server-project",
      name: "HTTP Server",
      description:
        "C-based HTTP/1.1 server supporting GET, POST, PUT, DELETE, and HEAD methods with robust error handling.",
      url: "https://vallabhkulkarni.vercel.app/#projects",
      programmingLanguage: "C",
      author: {
        "@id": "https://vallabhkulkarni.vercel.app/#person",
      },
      keywords: ["C", "Networking", "HTTP Protocol"],
      dateCreated: "2023",
    },
  ]

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://vallabhkulkarni.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: "https://vallabhkulkarni.vercel.app#about",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Projects",
        item: "https://vallabhkulkarni.vercel.app#projects",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Skills",
        item: "https://vallabhkulkarni.vercel.app#skills",
      },
    ],
  }

  useEffect(() => {
    // Add structured data for portfolio projects
    const projectsStructuredData = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Vallabh Kulkarni's Portfolio Projects",
      description: "A collection of software development projects by Vallabh Kulkarni",
      itemListElement: [
        {
          "@type": "SoftwareApplication",
          name: "Oracle VBCS Applications",
          description: "Enterprise applications built using Oracle Visual Builder Cloud Service",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          author: {
            "@type": "Person",
            name: "Vallabh Kulkarni",
          },
        },
        {
          "@type": "SoftwareApplication",
          name: "Oracle ADF Projects",
          description: "Applications developed using Oracle Application Development Framework",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web Browser",
          author: {
            "@type": "Person",
            name: "Vallabh Kulkarni",
          },
        },
        {
          "@type": "SoftwareApplication",
          name: "REST API Services",
          description: "RESTful web services and API integrations",
          applicationCategory: "WebApplication",
          programmingLanguage: "Java",
          author: {
            "@type": "Person",
            name: "Vallabh Kulkarni",
          },
        },
      ],
    }

    // Add skills structured data
    const skillsStructuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://vallabhkulkarni.vercel.app/#person",
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Developer",
        occupationLocation: {
          "@type": "Country",
          name: "India",
        },
        skills: [
          "Oracle VBCS",
          "Oracle ADF",
          "Oracle SQL",
          "PL/SQL",
          "Java",
          "JavaScript",
          "REST APIs",
          "Web Services",
          "Oracle HCM",
          "HDL",
          "Enterprise Applications",
          "Full Stack Development",
        ],
      },
    }

    // Inject structured data into the page
    const script1 = document.createElement("script")
    script1.type = "application/ld+json"
    script1.textContent = JSON.stringify(personSchema)
    document.head.appendChild(script1)

    const script2 = document.createElement("script")
    script2.type = "application/ld+json"
    script2.textContent = JSON.stringify(websiteSchema)
    document.head.appendChild(script2)

    const script3 = document.createElement("script")
    script3.type = "application/ld+json"
    script3.textContent = JSON.stringify(projectsSchema)
    document.head.appendChild(script3)

    const script4 = document.createElement("script")
    script4.type = "application/ld+json"
    script4.textContent = JSON.stringify(breadcrumbSchema)
    document.head.appendChild(script4)

    const script5 = document.createElement("script")
    script5.type = "application/ld+json"
    script5.textContent = JSON.stringify(projectsStructuredData)
    document.head.appendChild(script5)

    const script6 = document.createElement("script")
    script6.type = "application/ld+json"
    script6.textContent = JSON.stringify(skillsStructuredData)
    document.head.appendChild(script6)

    // Cleanup function
    return () => {
      document.head.removeChild(script1)
      document.head.removeChild(script2)
      document.head.removeChild(script3)
      document.head.removeChild(script4)
      document.head.removeChild(script5)
      document.head.removeChild(script6)
    }
  }, [])

  return null
}
