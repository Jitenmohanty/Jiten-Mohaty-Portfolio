"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, Github, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import projectsData from "@/data/projects.json";
import ProjectFilter from "./project-filter";
import { Input } from "@/components/ui/input";

type Project = {
  date: string;
  title: string;
  description: string;
  url: string;
  imgSrc: string;
  category?: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Extract unique categories from projects
  const rawProjects = projectsData.projects as Project[];

  const categories = Array.from(
    new Set(
      rawProjects.map((project) => {
        if (!project.category) {
          if (
            project.title.includes("React") ||
            project.description.includes("React")
          ) {
            return "React";
          } else if (
            project.title.includes("Next") ||
            project.description.includes("Next")
          ) {
            return "Next.js";
          } else if (
            project.title.includes("Node") ||
            project.description.includes("Node")
          ) {
            return "Backend";
          } else if (
            project.title.includes("UI") ||
            project.description.includes("UI")
          ) {
            return "UI/UX";
          } else if (
            project.title.includes("AI AGENT") ||
            project.description.includes("UI")
          ) {
            return "AI AGENT";
          } else {
            return "Other";
          }
        }
        return project.category;
      })
    )
  );

  useEffect(() => {
    const rawProjects = projectsData.projects as Project[];

    // Assign categories if not present
    const projectsWithCategories = rawProjects.map((project) => {
      if (!project.category) {
        if (
          project.title.includes("React") ||
          project.description.includes("React")
        ) {
          return { ...project, category: "React" };
        } else if (
          project.title.includes("Next") ||
          project.description.includes("Next")
        ) {
          return { ...project, category: "Next.js" };
        } else if (
          project.title.includes("Node") ||
          project.description.includes("Node")
        ) {
          return { ...project, category: "Backend" };
        } else if (
          project.title.includes("UI") ||
          project.description.includes("UI")
        ) {
          return { ...project, category: "UI/UX" };
        } else if (
          project.title.includes("AI AGENT") ||
          project.description.includes("UI")
        ) {
          return { ...project, category: "AI AGENT" };
        } else {
          return { ...project, category: "Other" };
        }
      }
      return project;
    });

    setProjects(projectsWithCategories);
  }, []);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setVisibleProjects(6);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleProjects(6);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === "All" || project.category === activeFilter;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const loadMore = () => {
    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleProjects((prev) => Math.min(prev + 6, filteredProjects.length));
      setIsLoading(false);
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="lg:container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my web development projects, demonstrating my skills
            and experience in building modern web applications.
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <ProjectFilter
              categories={Array.from(categories)}
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
            />

            <div className="relative w-full md:w-64">
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-muted-foreground">
              No projects found matching your criteria.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects
                .slice(0, visibleProjects)
                .map((project, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    layout
                  >
                    <Card className="overflow-hidden h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={
                            project.imgSrc ||
                            "/placeholder.svg?height=400&width=600"
                          }
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        {project.category && (
                          <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
                            {project.category}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6 flex-grow">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{project.date}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-3">
                          {project.description}
                        </p>
                      </CardContent>
                      <CardFooter className="p-6 pt-0 flex justify-between">
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                          </Button>
                        </Link>
                        <Link
                          href={`https://github.com/Jitenmohanty/${project.title.replace(
                            /\s+/g,
                            "-"
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Github className="h-4 w-4" />
                            Code
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        )}

        {visibleProjects < filteredProjects.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button
              onClick={loadMore}
              size="lg"
              className="gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin mr-2">⟳</span>
                  Loading...
                </>
              ) : (
                "Load More Projects"
              )}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
