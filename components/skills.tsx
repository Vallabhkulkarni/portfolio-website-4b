"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code2, Database, Globe, Smartphone, Brain, Users, Lightbulb, Target, Puzzle, Bug, Layers } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Globe className="w-6 h-6" />,
    description: "Creating responsive and interactive user interfaces",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
      "Zustand",
      "React Query",
    ],
  },
  {
    title: "Backend Development",
    icon: <Database className="w-6 h-6" />,
    description: "Building scalable server-side applications and APIs",
    skills: [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "GraphQL",
      "REST APIs",
      "Microservices",
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6" />,
    description: "Cross-platform mobile application development",
    skills: [
      "React Native",
      "Expo",
      "Flutter",
      "Dart",
      "iOS Development",
      "Android Development",
      "Mobile UI/UX",
      "App Store Deployment",
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: <Code2 className="w-6 h-6" />,
    description: "Infrastructure, deployment, and cloud services",
    skills: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Vercel",
      "GitHub Actions",
      "CI/CD",
      "Nginx",
      "Linux",
      "Monitoring",
      "Load Balancing",
    ],
  },
  {
    title: "Problem Solving",
    icon: <Brain className="w-6 h-6" />,
    description: "Analytical thinking and solution architecture",
    skills: [
      "Algorithm Design",
      "Data Structures",
      "System Design",
      "Debugging",
      "Performance Optimization",
      "Code Review",
      "Technical Documentation",
    ],
  },
  {
    title: "Collaboration",
    icon: <Users className="w-6 h-6" />,
    description: "Working effectively in team environments",
    skills: [
      "Agile/Scrum",
      "Git/GitHub",
      "Code Review",
      "Mentoring",
      "Technical Writing",
      "Project Management",
      "Cross-functional Teams",
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function Skills() {
  return (
    <div className="container mx-auto px-4 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="text-center mb-16"
      >
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-4">
          <Lightbulb className="w-8 h-8 text-primary" />
          <h2 className="text-4xl font-bold">Skills & Expertise</h2>
        </motion.div>
        <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive toolkit for building modern, scalable applications
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {skillCategories.map((category, index) => (
          <motion.div key={category.title} variants={itemVariants}>
            <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {category.icon}
                  </div>
                </div>
                <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                <CardDescription className="text-sm">{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200 cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Skills Summary */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="mt-16 text-center"
      >
        <motion.div variants={itemVariants}>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-primary" />
                Core Competencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Puzzle className="w-4 h-4 text-primary" />
                    Architecture
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Designing scalable, maintainable system architectures with modern patterns and best practices.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Bug className="w-4 h-4 text-primary" />
                    Optimization
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Performance tuning, code optimization, and implementing efficient algorithms for better user
                    experience.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Layers className="w-4 h-4 text-primary" />
                    Integration
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Seamlessly connecting different systems, APIs, and services to create cohesive solutions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
