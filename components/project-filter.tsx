"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

type ProjectFilterProps = {
  categories: string[]
  onFilterChange: (category: string) => void
  activeFilter: string
}

export default function ProjectFilter({ categories, onFilterChange, activeFilter }: ProjectFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-wrap justify-center gap-2 mb-8"
    >
      {["All", ...categories].map((category) => (
        <Button
          key={category}
          variant={activeFilter === category ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(category)}
          className={`rounded-full px-4 ${
            activeFilter === category ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
          }`}
        >
          {category}
        </Button>
      ))}
    </motion.div>
  )
}
