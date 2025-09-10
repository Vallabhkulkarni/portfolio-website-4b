"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Code2, Cpu, Network } from "lucide-react"

// Project data with enhanced metadata
const projects = [
  {
    id: "stl-c",
    title: "STL_C",
    description:
      "C implementation of STL structures from C++, providing efficient data structures and algorithms for C developers.",
    longDescription:
      "A comprehensive library that brings the power of C++ STL to C programming. Features include dynamic arrays, linked lists, hash tables, and various algorithms with optimized performance and memory management.",
    technologies: ["C", "Data Structures", "Algorithms", "Memory Management"],
    githubUrl: "https://github.com/Vallabhkulkarni/STL_C",
    icon: Code2,
    color: "blue",
    year: "2023",
    status: "Completed",
    category: "Systems Programming",
  },
  {
    id: "threading-library",
    title: "Userland Threading Library",
    description:
      "Python-based threading library supporting One-One and Many-One models for efficient concurrent programming.",
    longDescription:
      "Advanced threading library implementing custom thread scheduling and synchronization mechanisms. Supports both One-One and Many-One threading models with efficient context switching and resource management.",
    technologies: ["Python", "Threading", "Concurrency", "Operating Systems"],
    icon: Cpu,
    color: "green",
    year: "2023",
    status: "Completed",
    category: "Concurrent Programming",
  },
  {
    id: "http-server",
    title: "HTTP Server",
    description:
      "C-based HTTP/1.1 server supporting GET, POST, PUT, DELETE, and HEAD methods with robust error handling.",
    longDescription:
      "High-performance HTTP/1.1 server implementation in C featuring request parsing, response generation, connection management, and comprehensive error handling for production-ready web applications.",
    technologies: ["C", "Networking", "HTTP Protocol", "Server Architecture"],
    icon: Network,
    color: "purple",
    year: "2023",
    status: "Completed",
    category: "Network Programming",
  },
]

// Color mappings for consistent theming
const colorMappings = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-950/20",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  },
  green: {
    bg: "bg-green-50 dark:bg-green-950/20",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  purple: {
    bg: "bg-purple-50 dark:bg-purple-950/20",
    border: "border-purple-200 dark:border-purple-800",
    icon: "text-purple-600 dark:text-purple-400",
    badge: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  },
}

// Individual project card component
function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })
  const colors = colorMappings[project.color as keyof typeof colorMappings]
  const IconComponent = project.icon

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg ${colors.border} group`}>
        {/* Project Icon Header */}
        <div className={`${colors.bg} p-6 transition-all duration-300 group-hover:scale-105`}>
          <div className="flex items-center justify-center">
            <div
              className={`p-4 rounded-full ${colors.bg} border-2 ${colors.border} transition-transform duration-300 group-hover:scale-110`}
            >
              <IconComponent className={`h-8 w-8 ${colors.icon}`} aria-hidden="true" />
            </div>
          </div>
          <div className="text-center mt-4">
            <Badge variant="secondary" className={`${colors.badge} text-xs font-medium`}>
              {project.category}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span>{project.year}</span>
                <span>•</span>
                <span className="text-green-600 dark:text-green-400 font-medium">{project.status}</span>
              </div>
            </div>
          </div>

          <CardDescription className="text-sm leading-relaxed">
            {isExpanded ? project.longDescription : project.description}
          </CardDescription>

          {project.longDescription !== project.description && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 p-0 h-auto text-primary hover:text-primary/80 font-medium"
              aria-expanded={isExpanded}
              aria-controls={`project-description-${project.id}`}
            >
              {isExpanded ? "Show Less" : "Read More"}
            </Button>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {/* Technologies */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs bg-background hover:bg-muted transition-colors">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {project.githubUrl && (
              <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90 transition-all duration-200">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <Github className="h-4 w-4 mr-2" aria-hidden="true" />
                  View Code
                  <ExternalLink className="h-3 w-3 ml-2" aria-hidden="true" />
                </a>
              </Button>
            )}

            {!project.githubUrl && (
              <div className="flex-1 text-center">
                <p className="text-sm text-muted-foreground italic py-2">Project details available upon request</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Main projects component - removed any scroll-down functionality
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4 bg-muted/30" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Clean without any scroll functionality */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            id="projects-heading"
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
          >
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of my technical expertise through innovative software solutions, demonstrating proficiency in
            systems programming, concurrent computing, and network architecture.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 container-responsive">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">Interested in collaborating or learning more about my work?</p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <a
              href="mailto:kvallabh2000@gmail.com"
              className="inline-flex items-center gap-2"
              aria-label="Contact Vallabh Kulkarni via email"
            >
              Get In Touch
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
