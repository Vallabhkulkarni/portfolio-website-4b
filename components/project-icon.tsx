"use client"

import { Code2, Cpu, Network, Database, Globe, Settings } from "lucide-react"

interface ProjectIconProps {
  projectType: "data-structures" | "threading" | "networking" | "web" | "database" | "system"
  className?: string
  size?: number
}

export default function ProjectIcon({ projectType, className = "", size = 48 }: ProjectIconProps) {
  const getIcon = () => {
    switch (projectType) {
      case "data-structures":
        return <Code2 size={size} className="text-blue-500" />
      case "threading":
        return <Cpu size={size} className="text-green-500" />
      case "networking":
        return <Network size={size} className="text-purple-500" />
      case "web":
        return <Globe size={size} className="text-orange-500" />
      case "database":
        return <Database size={size} className="text-red-500" />
      case "system":
        return <Settings size={size} className="text-gray-500" />
      default:
        return <Code2 size={size} className="text-blue-500" />
    }
  }

  const getBackgroundColor = () => {
    switch (projectType) {
      case "data-structures":
        return "bg-blue-50 dark:bg-blue-950/20"
      case "threading":
        return "bg-green-50 dark:bg-green-950/20"
      case "networking":
        return "bg-purple-50 dark:bg-purple-950/20"
      case "web":
        return "bg-orange-50 dark:bg-orange-950/20"
      case "database":
        return "bg-red-50 dark:bg-red-950/20"
      case "system":
        return "bg-gray-50 dark:bg-gray-950/20"
      default:
        return "bg-blue-50 dark:bg-blue-950/20"
    }
  }

  const getLabel = () => {
    switch (projectType) {
      case "data-structures":
        return "Data Structures"
      case "threading":
        return "Threading"
      case "networking":
        return "Networking"
      case "web":
        return "Web Development"
      case "database":
        return "Database"
      case "system":
        return "System Programming"
      default:
        return "Programming"
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center h-full ${getBackgroundColor()} ${className}`}>
      <div className="flex items-center justify-center mb-2">{getIcon()}</div>
      <span className="text-xs font-medium text-muted-foreground text-center px-2">{getLabel()}</span>
    </div>
  )
}
