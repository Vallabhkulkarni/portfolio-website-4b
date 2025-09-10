"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Server, GitBranch, BrainCircuit, Users } from "lucide-react"

interface Skill {
  icon: React.ReactNode
  name: string
  description: string
  items: string[]
}

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const skills: Skill[] = [
    {
      icon: <Code className="h-6 w-6" />,
      name: "Programming",
      description: "Languages and frameworks I work with",
      items: ["Java", "SQL", "PL/SQL", "JavaScript"],
    },
    {
      icon: <Database className="h-6 w-6" />,
      name: "Oracle HCM",
      description: "Oracle technologies I specialize in",
      items: ["VBCS", "ADF", "HDL", "Oracle SQL", "Oracle Fusion HCM"],
    },
    {
      icon: <Server className="h-6 w-6" />,
      name: "Integration & Middleware",
      description: "Technologies for connecting systems",
      items: ["REST APIs", "SOAP APIs", "Web Services"],
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      name: "Development Tools",
      description: "Tools I use for development",
      items: ["Oracle JDeveloper", "Visual Studio Code", "Git", "GitHub"],
    },
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      name: "Problem Solving",
      description: "Analytical approach to challenges",
      items: ["Algorithm Design", "Debugging", "Performance Optimization"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      name: "Collaboration",
      description: "Working effectively with teams",
      items: ["Agile Methodology", "Code Reviews", "Client Communication"],
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My technical expertise and professional capabilities.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className="h-full transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/50"
                onMouseEnter={() => {
                  setActiveSkill(skill.name)
                }}
                onMouseLeave={() => setActiveSkill(null)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary">{skill.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {skill.items.map((item, itemIndex) => (
                      <li
                        key={itemIndex}
                        className={`flex items-center text-sm transition-all duration-300 ${
                          activeSkill === skill.name ? "text-primary font-medium" : ""
                        }`}
                      >
                        <span className="mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg max-w-3xl mx-auto">
            I'm constantly learning and expanding my skill set to stay current with industry trends and technologies.
          </p>
          <div
            className="mt-4 text-primary font-medium cursor-help easter-egg"
            onMouseEnter={() => {}}
            onClick={() => {
              alert("Why do Java developers wear glasses? Because they don't C#!")
            }}
          >
            Click for a developer joke
          </div>
        </motion.div>
      </div>
    </section>
  )
}
