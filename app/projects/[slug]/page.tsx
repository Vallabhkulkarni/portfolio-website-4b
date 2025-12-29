import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github, Calendar, User, Target, Lightbulb, Code2, Cpu, Network } from "lucide-react"
import Link from "next/link"

// Comprehensive project data
const projectsData = {
  "stl-c": {
    id: "stl-c",
    title: "STL_C",
    subtitle: "C Implementation of C++ STL Structures",
    description:
      "A comprehensive library that brings the power of C++ STL to C programming, featuring dynamic arrays, linked lists, hash tables, and various algorithms with optimized performance and memory management.",
    longDescription:
      "STL_C is a meticulously crafted library that bridges the gap between C and C++ by implementing essential Standard Template Library (STL) data structures and algorithms in pure C. This project demonstrates advanced understanding of memory management, data structure design, and algorithm optimization in systems programming.",
    technologies: ["C", "Data Structures", "Algorithms", "Memory Management", "Makefile", "Unit Testing"],
    githubUrl: "https://github.com/Vallabhkulkarni/STL_C",
    icon: Code2,
    color: "blue",
    year: "2023",
    status: "Completed",
    category: "Systems Programming",
    duration: "3 months",
    teamSize: "Individual Project",
    features: [
      {
        title: "Dynamic Arrays (Vector)",
        description:
          "Resizable arrays with automatic memory management, supporting push, pop, insert, and delete operations with O(1) amortized complexity.",
        technical: "Implements exponential growth strategy with reallocation optimization",
      },
      {
        title: "Linked Lists",
        description:
          "Singly and doubly linked list implementations with iterator support and memory-efficient node management.",
        technical: "Custom memory pool allocation for reduced fragmentation",
      },
      {
        title: "Hash Tables",
        description:
          "High-performance hash table with collision resolution using separate chaining and dynamic resizing.",
        technical: "Uses FNV-1a hash function with load factor optimization",
      },
      {
        title: "Sorting Algorithms",
        description: "Implementation of quicksort, mergesort, and heapsort with generic comparison functions.",
        technical: "Template-like macros for type-safe generic programming",
      },
      {
        title: "Search Algorithms",
        description: "Binary search, linear search, and hash-based lookup with optimized performance characteristics.",
        technical: "Branch prediction optimization and cache-friendly memory access patterns",
      },
    ],
    challenges: [
      {
        problem: "Memory Management",
        solution:
          "Implemented custom memory allocators with reference counting and automatic cleanup to prevent memory leaks while maintaining performance.",
      },
      {
        problem: "Generic Programming in C",
        solution:
          "Used advanced macro techniques and void pointers with type-safe wrappers to achieve template-like functionality.",
      },
      {
        problem: "Performance Optimization",
        solution:
          "Applied cache-friendly data layouts, branch prediction hints, and algorithmic optimizations to match C++ STL performance.",
      },
    ],
    architecture: {
      overview:
        "The library follows a modular architecture with separate modules for each data structure, unified memory management, and a common interface layer.",
      components: [
        "Core Memory Manager - Handles allocation, deallocation, and garbage collection",
        "Data Structure Modules - Individual implementations for each container type",
        "Algorithm Library - Generic algorithms that work with all container types",
        "Type System - Macro-based type safety and generic programming support",
        "Testing Framework - Comprehensive unit tests and benchmarking tools",
      ],
    },
    impact:
      "This project demonstrates deep understanding of systems programming concepts and has been used as a reference implementation by other developers learning advanced C programming techniques.",
    learnings: [
      "Advanced memory management techniques in C",
      "Generic programming patterns using macros",
      "Performance optimization and profiling",
      "API design for reusable libraries",
      "Comprehensive testing strategies",
    ],
  },
  "threading-library": {
    id: "threading-library",
    title: "Userland Threading Library",
    subtitle: "Advanced Threading Models Implementation",
    description:
      "A sophisticated threading library implementing both One-One and Many-One threading models with custom scheduling, synchronization primitives, and efficient context switching mechanisms.",
    longDescription:
      "This threading library represents a deep dive into concurrent programming concepts, implementing multiple threading models from scratch. The project showcases understanding of operating system concepts, thread scheduling algorithms, and synchronization mechanisms while providing a clean, efficient API for concurrent programming.",
    technologies: ["Python", "Threading", "Concurrency", "Operating Systems", "Context Switching", "Synchronization"],
    icon: Cpu,
    color: "green",
    year: "2023",
    status: "Completed",
    category: "Concurrent Programming",
    duration: "4 months",
    teamSize: "Individual Project",
    features: [
      {
        title: "One-One Threading Model",
        description:
          "Direct mapping of user threads to kernel threads, providing true parallelism and system-level thread management.",
        technical: "Utilizes OS threading primitives with custom scheduling layer",
      },
      {
        title: "Many-One Threading Model",
        description:
          "User-level thread management with cooperative scheduling, allowing thousands of lightweight threads.",
        technical: "Custom context switching using setjmp/longjmp with stack management",
      },
      {
        title: "Thread Scheduling",
        description:
          "Multiple scheduling algorithms including round-robin, priority-based, and fair scheduling with configurable time slices.",
        technical: "Implements priority queues and aging mechanisms for starvation prevention",
      },
      {
        title: "Synchronization Primitives",
        description: "Mutexes, semaphores, condition variables, and reader-writer locks with deadlock detection.",
        technical: "Lock-free algorithms where possible with fallback to blocking primitives",
      },
      {
        title: "Thread Pool Management",
        description: "Dynamic thread pool with work-stealing queues and automatic scaling based on workload.",
        technical: "Lock-free work-stealing deques with NUMA-aware thread affinity",
      },
    ],
    challenges: [
      {
        problem: "Context Switching Overhead",
        solution:
          "Optimized context switching by minimizing register saves/restores and using assembly-level optimizations for critical paths.",
      },
      {
        problem: "Deadlock Prevention",
        solution:
          "Implemented deadlock detection algorithms and lock ordering protocols to prevent circular wait conditions.",
      },
      {
        problem: "Scalability Issues",
        solution:
          "Used lock-free data structures and work-stealing algorithms to minimize contention in high-concurrency scenarios.",
      },
    ],
    architecture: {
      overview:
        "The library uses a layered architecture with a unified API layer, model-specific implementations, and a common runtime system for thread management and scheduling.",
      components: [
        "API Layer - Unified interface for both threading models",
        "Scheduler - Pluggable scheduling algorithms with priority management",
        "Context Manager - Efficient context switching and stack management",
        "Synchronization Layer - Thread-safe primitives and deadlock detection",
        "Runtime System - Thread lifecycle management and resource cleanup",
      ],
    },
    impact:
      "This project provides insights into operating system design and has been used as an educational tool for understanding threading concepts and concurrent programming patterns.",
    learnings: [
      "Deep understanding of threading models and their trade-offs",
      "Implementation of scheduling algorithms and their performance characteristics",
      "Synchronization mechanisms and deadlock prevention strategies",
      "Performance optimization in concurrent systems",
      "API design for complex concurrent libraries",
    ],
  },
  "http-server": {
    id: "http-server",
    title: "HTTP Server",
    subtitle: "High-Performance HTTP/1.1 Server Implementation",
    description:
      "A robust HTTP/1.1 server implementation in C supporting multiple HTTP methods, concurrent connections, and comprehensive error handling for production-ready web applications.",
    longDescription:
      "This HTTP server project demonstrates mastery of network programming concepts, implementing the HTTP/1.1 protocol from scratch with focus on performance, reliability, and standards compliance. The server handles concurrent connections efficiently while maintaining robust error handling and security features.",
    technologies: ["C", "Networking", "HTTP Protocol", "Server Architecture", "Socket Programming", "Multithreading"],
    icon: Network,
    color: "purple",
    year: "2023",
    status: "Completed",
    category: "Network Programming",
    duration: "3 months",
    teamSize: "Individual Project",
    features: [
      {
        title: "HTTP/1.1 Protocol Support",
        description:
          "Full implementation of HTTP/1.1 specification including persistent connections, chunked encoding, and proper header handling.",
        technical: "State machine-based parser with zero-copy buffer management",
      },
      {
        title: "Multiple HTTP Methods",
        description:
          "Support for GET, POST, PUT, DELETE, and HEAD methods with proper request validation and response generation.",
        technical: "Method dispatch table with pluggable handler architecture",
      },
      {
        title: "Concurrent Connection Handling",
        description:
          "Multi-threaded server architecture supporting thousands of concurrent connections with efficient resource management.",
        technical: "Thread pool with epoll-based event handling for Linux systems",
      },
      {
        title: "Static File Serving",
        description:
          "Efficient static file serving with MIME type detection, caching headers, and range request support.",
        technical: "Memory-mapped file I/O with sendfile() optimization for zero-copy transfers",
      },
      {
        title: "Error Handling & Logging",
        description:
          "Comprehensive error handling with detailed logging, graceful degradation, and proper HTTP status codes.",
        technical: "Structured logging with configurable levels and async log writing",
      },
    ],
    challenges: [
      {
        problem: "Memory Management",
        solution:
          "Implemented custom memory pools and buffer management to handle variable-sized HTTP requests efficiently without memory leaks.",
      },
      {
        problem: "Concurrent Access",
        solution:
          "Used thread-safe data structures and careful synchronization to handle multiple simultaneous connections without race conditions.",
      },
      {
        problem: "Performance Optimization",
        solution:
          "Applied zero-copy techniques, efficient parsing algorithms, and system call optimization to achieve high throughput.",
      },
    ],
    architecture: {
      overview:
        "The server follows an event-driven architecture with a main event loop, worker thread pool, and modular request processing pipeline.",
      components: [
        "Network Layer - Socket management and connection handling",
        "HTTP Parser - Protocol parsing and request validation",
        "Request Router - URL routing and handler dispatch",
        "Response Generator - HTTP response formatting and transmission",
        "Resource Manager - File system access and caching layer",
      ],
    },
    impact:
      "This project demonstrates production-ready server development skills and understanding of network protocols, serving as a foundation for more complex web server implementations.",
    learnings: [
      "Network programming and socket management",
      "HTTP protocol implementation and standards compliance",
      "Concurrent server architecture and performance optimization",
      "Memory management in network applications",
      "Error handling and logging in server applications",
    ],
  },
}

// Generate metadata for each project page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = projectsData[params.slug as keyof typeof projectsData]

  if (!project) {
    return {
      title: "Project Not Found | Vallabh Kulkarni",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} | Vallabh Kulkarni`,
    description: project.description,
    keywords: [
      project.title,
      ...project.technologies,
      "Vallabh Kulkarni",
      "Software Developer",
      "Project Portfolio",
      project.category,
    ],
    openGraph: {
      title: `${project.title} | Vallabh Kulkarni`,
      description: project.description,
      url: `https://vallabhkulkarni.vercel.app/projects/${project.id}`,
      siteName: "Vallabh Kulkarni Portfolio",
      images: [
        {
          url: "/placeholder-user.jpg",
          width: 1200,
          height: 630,
          alt: `${project.title} - Project by Vallabh Kulkarni`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Vallabh Kulkarni`,
      description: project.description,
      creator: "@vallabhcoolkarni",
      images: ["/placeholder-user.jpg"],
    },
    alternates: {
      canonical: `https://vallabhkulkarni.vercel.app/projects/${project.id}`,
    },
  }
}

// Generate static params for all projects
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData[params.slug as keyof typeof projectsData]

  if (!project) {
    notFound()
  }

  const IconComponent = project.icon

  // Color mappings for consistent theming
  const colorMappings = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/20",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      gradient: "from-blue-600 to-blue-400",
    },
    green: {
      bg: "bg-green-50 dark:bg-green-950/20",
      border: "border-green-200 dark:border-green-800",
      icon: "text-green-600 dark:text-green-400",
      badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      gradient: "from-green-600 to-green-400",
    },
    purple: {
      bg: "bg-purple-50 dark:bg-purple-950/20",
      border: "border-purple-200 dark:border-purple-800",
      icon: "text-purple-600 dark:text-purple-400",
      badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      gradient: "from-purple-600 to-purple-400",
    },
  }

  const colors = colorMappings[project.color as keyof typeof colorMappings]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/#projects" aria-label="Back to projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Project Header */}
        <div className={`${colors.bg} rounded-lg p-8 mb-8 ${colors.border} border`}>
          <div className="flex items-start gap-6">
            <div className={`p-4 rounded-full ${colors.bg} border-2 ${colors.border}`}>
              <IconComponent className={`h-12 w-12 ${colors.icon}`} aria-hidden="true" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className={`text-4xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent`}>
                  {project.title}
                </h1>
                <Badge variant="secondary" className={`${colors.badge} text-sm font-medium`}>
                  {project.status}
                </Badge>
              </div>
              <p className="text-xl text-muted-foreground mb-4">{project.subtitle}</p>
              <p className="text-lg leading-relaxed mb-6">{project.longDescription}</p>

              {/* Project Meta */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.year} • {project.duration}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{project.teamSize}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>{project.category}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {project.githubUrl && (
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <Github className="h-5 w-5 mr-2" />
                      View Source Code
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code2 className="h-5 w-5" />
              Technologies & Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-sm bg-background hover:bg-muted">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Key Features
            </CardTitle>
            <CardDescription>Core functionality and technical implementations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {project.features.map((feature, index) => (
              <div key={index} className="border-l-4 border-primary/20 pl-4">
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-2">{feature.description}</p>
                <p className="text-sm text-primary font-medium">{feature.technical}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              System Architecture
            </CardTitle>
            <CardDescription>Design patterns and architectural decisions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{project.architecture.overview}</p>
            <div className="space-y-2">
              {project.architecture.components.map((component, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span className="text-sm">{component}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges & Solutions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Challenges & Solutions
            </CardTitle>
            <CardDescription>Technical challenges encountered and how they were resolved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {project.challenges.map((challenge, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg mb-2 text-red-600 dark:text-red-400">
                  Challenge: {challenge.problem}
                </h3>
                <p className="text-muted-foreground mb-2">
                  <span className="font-medium text-green-600 dark:text-green-400">Solution:</span> {challenge.solution}
                </p>
                {index < project.challenges.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Impact & Learnings */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Project Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{project.impact}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Learnings</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {project.learnings.map((learning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{learning}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className={`${colors.bg} ${colors.border} border text-center`}>
          <CardContent className="py-8">
            <h2 className="text-2xl font-bold mb-4">Interested in this project?</h2>
            <p className="text-muted-foreground mb-6">
              I'd love to discuss the technical details, challenges, and learnings from this project.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <a
                  href="mailto:kvallabh2000@gmail.com?subject=Inquiry about ${project.title}"
                  aria-label="Contact Vallabh Kulkarni about this project"
                >
                  Get In Touch
                </a>
              </Button>
              {project.githubUrl && (
                <Button asChild variant="outline" size="lg">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code`}
                  >
                    <Github className="h-4 w-4 mr-2" />
                    View Code
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
