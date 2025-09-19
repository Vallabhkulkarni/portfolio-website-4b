"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Globe, Wrench, Lightbulb, Users } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    description: "Core programming languages and frameworks",
    skills: [
      "Java",
      "JavaScript",
      "TypeScript",
      "PL/SQL",
      "HTML5",
      "CSS3",
      "Python",
      "C++",
      "React",
      "Next.js",
      "Node.js",
    ],
  },
  {
    title: "Oracle Technologies",
    icon: Database,
    description: "Enterprise Oracle development stack",
    skills: [
      "Oracle VBCS",
      "Oracle ADF",
      "Oracle SQL",
      "Oracle HCM",
      "HDL (HCM Data Loader)",
      "Oracle Database",
      "Oracle Forms",
      "Oracle Reports",
      "Oracle APEX",
    ],
  },
  {
    title: "Web Technologies",
    icon: Globe,
    description: "Modern web development technologies",
    skills: [
      "REST APIs",
      "Web Services",
      "JSON",
      "XML",
      "SOAP",
      "GraphQL",
      "Microservices",
      "Progressive Web Apps",
      "Responsive Design",
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    description: "Development tools and platforms",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ IDEA",
      "Oracle JDeveloper",
      "Postman",
      "Docker",
      "Jenkins",
      "Maven",
      "npm/yarn",
    ],
  },
  {
    title: "Problem Solving",
    icon: Lightbulb,
    description: "Analytical and problem-solving capabilities",
    skills: [
      "Algorithm Design",
      "System Design",
      "Data Structures",
      "Debugging",
      "Performance Optimization",
      "Code Review",
      "Technical Documentation",
      "Requirements Analysis",
    ],
  },
  {
    title: "Soft Skills",
    icon: Users,
    description: "Communication and collaboration skills",
    skills: [
      "Team Collaboration",
      "Project Management",
      "Client Communication",
      "Mentoring",
      "Agile Methodology",
      "Scrum",
      "Leadership",
      "Presentation Skills",
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills, tools, and technologies I work with to deliver high-quality
            software solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.title}
                className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
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

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Always learning and exploring new technologies to stay current with industry trends.
          </p>
        </div>
      </div>
    </section>
  )
}
