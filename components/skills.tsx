"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Database,
  Code,
  Globe,
  Server,
  Smartphone,
  Palette,
  Users,
  Lightbulb,
  Target,
  BookOpen,
  Wrench,
} from "lucide-react"

const skillCategories = [
  {
    title: "Oracle Technologies",
    icon: Database,
    description: "Enterprise Oracle solutions and development",
    skills: ["Oracle VBCS", "Oracle ADF", "Oracle SQL", "PL/SQL", "Oracle HCM", "HDL"],
    color: "bg-red-500/10 text-red-700 dark:text-red-300",
  },
  {
    title: "Programming Languages",
    icon: Code,
    description: "Core programming and scripting languages",
    skills: ["Java", "JavaScript", "Python", "C", "C++", "TypeScript"],
    color: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  {
    title: "Web Technologies",
    icon: Globe,
    description: "Modern web development frameworks and tools",
    skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Node.js"],
    color: "bg-green-500/10 text-green-700 dark:text-green-300",
  },
  {
    title: "Backend & APIs",
    icon: Server,
    description: "Server-side development and API integration",
    skills: ["REST APIs", "Web Services", "Spring Boot", "Express.js", "GraphQL", "Microservices"],
    color: "bg-purple-500/10 text-purple-700 dark:text-purple-300",
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    description: "Cross-platform mobile application development",
    skills: ["React Native", "Flutter", "Android", "iOS", "Expo", "Mobile UI/UX"],
    color: "bg-pink-500/10 text-pink-700 dark:text-pink-300",
  },
  {
    title: "Design & UI/UX",
    icon: Palette,
    description: "User interface and experience design",
    skills: ["Figma", "Adobe XD", "Responsive Design", "Material Design", "Accessibility", "Prototyping"],
    color: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  },
  {
    title: "Collaboration",
    icon: Users,
    description: "Team collaboration and project management",
    skills: ["Git", "GitHub", "Agile", "Scrum", "Jira", "Team Leadership"],
    color: "bg-teal-500/10 text-teal-700 dark:text-teal-300",
  },
  {
    title: "Problem Solving",
    icon: Lightbulb,
    description: "Analytical thinking and solution development",
    skills: ["Algorithm Design", "System Design", "Debugging", "Code Review", "Performance Optimization", "Testing"],
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  },
  {
    title: "Project Management",
    icon: Target,
    description: "Planning, execution, and delivery of projects",
    skills: [
      "Project Planning",
      "Risk Management",
      "Stakeholder Communication",
      "Timeline Management",
      "Quality Assurance",
      "Documentation",
    ],
    color: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
  },
  {
    title: "Continuous Learning",
    icon: BookOpen,
    description: "Staying updated with latest technologies",
    skills: [
      "Technology Research",
      "Online Courses",
      "Technical Writing",
      "Knowledge Sharing",
      "Mentoring",
      "Innovation",
    ],
    color: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
  },
  {
    title: "DevOps & Tools",
    icon: Wrench,
    description: "Development operations and productivity tools",
    skills: ["Docker", "CI/CD", "AWS", "Vercel", "VS Code", "Postman"],
    color: "bg-gray-500/10 text-gray-700 dark:text-gray-300",
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and areas of expertise developed through years of
            hands-on experience and continuous learning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-muted-foreground/20"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs px-2 py-1 bg-background/50 hover:bg-background transition-colors duration-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            Always eager to learn new technologies and take on challenging projects.{" "}
            <a
              href="mailto:kvallabh2000@gmail.com"
              className="text-primary hover:underline font-medium"
              aria-label="Contact Vallabh Kulkarni via email"
            >
              Let's collaborate!
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
