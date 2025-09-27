"use client"

import { useState, useEffect, JSX } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import { 
  SiHtml5, SiCss3, SiJavascript, SiTypescript, SiReact, SiNextdotjs, 
  SiRedux, SiTailwindcss, SiBootstrap, SiNodedotjs, SiExpress, 
  SiMongodb, SiPostgresql, SiRedis, SiGit, SiGithub, SiAmazon, 
  SiDocker, SiPrisma, SiPostman
} from "react-icons/si"
import { VscVscode } from "react-icons/vsc";
import SkillsCloud from "./skills-cloud"

// Map skills to their respective icons
const skillIcons: Record<string, JSX.Element> = {
  "HTML": <SiHtml5 color="#E34F26" />,
  "CSS": <SiCss3 color="#1572B6" />,
  "JavaScript": <SiJavascript color="#F7DF1E" />,
  "TypeScript": <SiTypescript color="#3178C6" />,
  "React.js": <SiReact color="#61DAFB" />,
  "Next.js": <SiNextdotjs color="#000000" />,
  "Redux": <SiRedux color="#764ABC" />,
  "TailwindCSS": <SiTailwindcss color="#06B6D4" />,
  "Bootstrap": <SiBootstrap color="#7952B3" />,
  "Node.js": <SiNodedotjs color="#339933" />,
  "Express.js": <SiExpress color="#000000" />,
  "MongoDB": <SiMongodb color="#47A248" />,
  "PostgreSQL": <SiPostgresql color="#4169E1" />,
  "Redis": <SiRedis color="#DC382D" />,
  "Git": <SiGit color="#F05032" />,
  "GitHub": <SiGithub color="#181717" />,
  "AWS": <SiAmazon color="#FF9900" />,
  "Docker": <SiDocker color="#2496ED" />,
  "Prisma": <SiPrisma color="#2D3748" />,
  "VS Code": <VscVscode  color="#007ACC" />,
  "Postman": <SiPostman color="#FF6C37" />
}

// Dynamically import the SkillsCloud component with no SSR
// const Skills;

const skillCategories = [
  {
    title: "Languages",
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Redux", "Context Api", "TailwindCSS", "Bootstrap"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Sql", "Redis", "FastApi"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "AWS", "Docker", "Prisma"," Drizzle", "Mongoose", "VS Code", "Postman", "n8n"],
  },
]

// Flatten all skills for the 3D cloud
const allSkills = skillCategories.flatMap((category) => category.skills)

export default function Skills() {
  const [activeTab, setActiveTab] = useState("list")
  const [mounted, setMounted] = useState(false)
  
  // Only render the 3D cloud when the component is mounted and the tab is active
  useEffect(() => {
    setMounted(true)
  }, [])
  
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const skillVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My technical toolkit includes a wide range of languages, frameworks, and tools that I use to build modern
            web applications.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="list" 
          className="w-full mb-16"
          onValueChange={(value) => setActiveTab(value)}
        >
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="cloud">3D Cloud</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {skillCategories.map((category, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.span
                            key={skillIndex}
                            variants={skillVariants}
                            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="cloud" className="w-full">
            {mounted && activeTab === "cloud" && (
              <Card className="shadow-md overflow-hidden">
                <CardContent className="p-6">
                  <SkillsCloud skills={allSkills} />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}