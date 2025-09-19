"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Globe, Wrench, Brain, Users, Server, Smartphone, GitBranch, Shield } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    description: "Core programming languages and frameworks",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "PL/SQL", "HTML5", "CSS3", "SQL"],
    color: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
  },
  {
    title: "Oracle Technologies",
    icon: Database,
    description: "Enterprise Oracle development stack",
    skills: ["Oracle VBCS", "Oracle ADF", "Oracle SQL", "Oracle HCM", "HDL", "Oracle Forms", "Oracle Reports"],
    color: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-800",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    description: "Modern web development technologies",
    skills: ["React", "Next.js", "Node.js", "Express.js", "REST APIs", "GraphQL", "WebSockets"],
    color: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800",
  },
  {
    title: "Backend & Infrastructure",
    icon: Server,
    description: "Server-side technologies and cloud platforms",
    skills: ["Spring Boot", "Microservices", "Docker", "Kubernetes", "AWS", "Azure", "CI/CD"],
    color: "bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800",
  },
  {
    title: "Database Management",
    icon: Database,
    description: "Database design and optimization",
    skills: ["Oracle Database", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Database Design", "Query Optimization"],
    color: "bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800",
  },
  {
    title: "Development Tools",
    icon: Wrench,
    description: "Development and productivity tools",
    skills: ["Git", "GitHub", "GitLab", "JIRA", "Confluence", "VS Code", "IntelliJ IDEA", "Postman"],
    color: "bg-gray-500/10 text-gray-600 border-gray-200 dark:border-gray-800",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    description: "Cross-platform mobile application development",
    skills: ["React Native", "Flutter", "Ionic", "Progressive Web Apps", "Mobile UI/UX"],
    color: "bg-pink-500/10 text-pink-600 border-pink-200 dark:border-pink-800",
  },
  {
    title: "DevOps & Version Control",
    icon: GitBranch,
    description: "Development operations and collaboration",
    skills: ["Git Workflows", "Jenkins", "GitHub Actions", "Docker Compose", "Monitoring", "Logging"],
    color: "bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-800",
  },
  {
    title: "Security & Testing",
    icon: Shield,
    description: "Application security and quality assurance",
    skills: ["Unit Testing", "Integration Testing", "Security Best Practices", "Code Review", "Performance Testing"],
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800",
  },
  {
    title: "Problem Solving",
    icon: Brain,
    description: "Analytical and problem-solving capabilities",
    skills: [
      "Algorithm Design",
      "Data Structures",
      "System Design",
      "Debugging",
      "Performance Optimization",
      "Code Refactoring",
    ],
    color: "bg-teal-500/10 text-teal-600 border-teal-200 dark:border-teal-800",
  },
  {
    title: "Soft Skills",
    icon: Users,
    description: "Communication and collaboration skills",
    skills: [
      "Team Leadership",
      "Project Management",
      "Client Communication",
      "Mentoring",
      "Agile Methodologies",
      "Documentation",
    ],
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-200 dark:border-cyan-800",
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
    <div className="container mx-auto px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="text-center mb-16"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
        >
          Technical Skills
        </motion.h2>
        <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive overview of my technical expertise and professional capabilities
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillCategories.map((category, index) => {
          const IconComponent = category.icon
          return (
            <motion.div key={category.title} variants={itemVariants}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 group border-2 hover:border-primary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className={`${category.color} hover:scale-105 transition-transform cursor-default`}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={itemVariants}
        className="mt-16 text-center"
      >
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-semibold mb-4 text-primary">Continuous Learning</h3>
            <p className="text-muted-foreground leading-relaxed">
              I'm passionate about staying current with emerging technologies and best practices. Currently exploring
              advanced cloud architectures, AI/ML integration, and modern development methodologies to deliver
              cutting-edge solutions.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
