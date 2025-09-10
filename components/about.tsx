"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Building, GraduationCap, Briefcase, ExternalLink } from "lucide-react"

export default function About() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const experiences = [
    {
      id: "oracle-current",
      title: "Application Developer 2",
      company: "Oracle",
      location: "India",
      period: "July 2023 - Present",
      type: "Full-time",
      description:
        "Currently developing enterprise applications using Oracle technologies with focus on user experience and performance optimization.",
      responsibilities: [
        "Developed applications using VBCS (Visual Builder Cloud Service) and ADF (Application Development Framework)",
        "Managed data migration processes using HDL (HCM Data Loader)",
        "Built and optimized SQL queries for improved database performance",
        "Collaborated in Agile teams using REST APIs for seamless integration",
        "Implemented user-friendly interfaces for Oracle HCM applications",
      ],
      technologies: ["Oracle VBCS", "Oracle ADF", "Oracle SQL", "PL/SQL", "HDL", "REST APIs", "Oracle HCM"],
      current: true,
    },
    {
      id: "rhythmflows-intern",
      title: "Software Developer Intern",
      company: "RhythmFlows Solutions Pvt. Ltd.",
      location: "India",
      period: "June 2022 - July 2022",
      type: "Internship",
      description: "Gained hands-on experience in full-stack development and API integration during summer internship.",
      responsibilities: [
        "Developed and consumed REST APIs for various client applications",
        "Integrated APIs with front-end applications for seamless user experience",
        "Optimized database performance through query optimization techniques",
        "Collaborated with senior developers on multiple client projects",
      ],
      technologies: ["REST APIs", "JavaScript", "Database Optimization", "Web Services"],
      current: false,
    },
  ]

  const education = {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Engineering",
    institution: "College of Engineering Pune (COEP)",
    year: "2023",
    location: "Pune, Maharashtra, India",
    description:
      "Graduated with comprehensive knowledge in computer science fundamentals, software engineering principles, and practical application development.",
  }

  return (
    <section id="about" className="py-20 md:py-32 bg-background" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate software developer with expertise in Oracle technologies and enterprise application development.
            Currently contributing to innovative solutions at Oracle while continuously expanding my technical skills.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Card className="border-2 hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{education.degree}</h3>
                  <p className="text-primary font-medium">{education.field}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {education.institution}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {education.year}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {education.location}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{education.description}</p>
              </CardContent>
            </Card>

            {/* Call to action for projects */}
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Interested in my technical work?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Explore my{" "}
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-primary hover:underline font-medium"
                  aria-label="Navigate to projects section"
                >
                  portfolio projects
                </button>{" "}
                showcasing my expertise in Oracle technologies, data structures, and system programming.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("projects")}
                aria-label="View portfolio projects"
              >
                View Projects
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          {/* Professional Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Professional Experience
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <article key={exp.id} className="timeline-item">
                  <Card
                    className={`border-2 transition-all duration-300 hover:shadow-lg ${
                      exp.current ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{exp.title}</CardTitle>
                          <p className="text-primary font-semibold">{exp.company}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        {exp.current && (
                          <Badge variant="default" className="bg-green-500/10 text-green-700 dark:text-green-400">
                            Current
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                      <div>
                        <h4 className="font-medium mb-2">Key Responsibilities:</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {exp.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1.5 text-xs">•</span>
                              <span>{responsibility}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            {/* Call to action for skills */}
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <h3 className="font-semibold mb-2">Want to know more about my technical expertise?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check out my comprehensive{" "}
                <button
                  onClick={() => scrollToSection("skills")}
                  className="text-primary hover:underline font-medium"
                  aria-label="Navigate to skills section"
                >
                  skills and technologies
                </button>{" "}
                section to see my proficiency across different domains.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection("skills")}
                aria-label="View technical skills"
              >
                View Skills
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
