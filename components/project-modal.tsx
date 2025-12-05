"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, Github, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

type Project = {
  date: string
  title: string
  description: string
  url: string
  demo: string
  imgSrc: string
  category?: string
}

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export default function ProjectModal({
  isOpen,
  onClose,
  project,
}: ProjectModalProps) {
  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background/95 backdrop-blur-md border-border/50 shadow-2xl sm:rounded-xl [&>button]:hidden">
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <Image
            src={project.imgSrc || "/placeholder.svg?height=600&width=800"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-90" />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-background/20 hover:bg-background/40 text-white backdrop-blur-sm"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>

          <div className="absolute bottom-6 left-6 right-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-2 mb-3">
                {project.category && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 border-primary/20 backdrop-blur-md">
                    {project.category}
                  </Badge>
                )}
                <Badge variant="outline" className="bg-background/20 text-foreground backdrop-blur-md border-white/20 text-white">
                  <Calendar className="h-3 w-3 mr-1" />
                  {project.date}
                </Badge>
              </div>
              <DialogTitle className="text-3xl md:text-4xl font-bold text-white drop-shadow-md">
                {project.title}
              </DialogTitle>
            </motion.div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <DialogDescription className="text-base md:text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </DialogDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href={project.demo} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
              <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/20">
                <ExternalLink className="h-5 w-5" />
                Live Demo
              </Button>
            </Link>
            <Link href={project.url} target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Github className="h-5 w-5" />
                View Code
              </Button>
            </Link>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
