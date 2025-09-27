"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, MapPin, Mail, Phone, User } from "lucide-react";

export default function About() {
  const personalInfo = [
    { label: "Name", value: "Jiten Mohanty", icon: User },
    { label: "Email", value: "jitenmohantyaz@gmail.com", icon: Mail },
    { label: "Location", value: "Bhubaneswar, Odisha", icon: MapPin },
    { label: "Phone", value: "+91-8637246237", icon: Phone },
  ];

  const workExperience = [
    {
      title: "Full Stack Developer",
      company: "Shelfex, Gurgaon, Haryana",
      duration: "July 2025 – Present"
    },
    {
      title: "Full Stack Web Developer", 
      company: "Daya Consultancy Services, Bhubaneswar",
      duration: "Sept 2024 – July 2025"
    }
  ];

  const education = [
    {
      degree: "MCA (Computer Application)",
      institution: "Biju Patnaik University, Rourkela",
      score: "CGPA 8.89",
      duration: "2020 - 2022"
    },
    {
      degree: "BSC (Mathematics)",
      institution: "Utkal University, Bhubaneswar", 
      score: "CGPA 7.04",
      duration: "2016 - 2019"
    }
  ];

  const certifications = [
    "NPTEL clear on IoT, Cloud Computing and AI",
    "Intern on JAVA at PieInfo Com",
    "Core Java Excellence with DSA at Coding Ninjas",
    "Frontend With Excellence at Coding Ninjas",
    "React.js With Excellence at Coding Ninjas",
    "Backend on Node.js With Excellence at Coding Ninjas"
  ];

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            About Me
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-primary mx-auto mb-6 sm:mb-8"></div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Left Column - Description & Personal Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Description */}
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                As a dedicated full-stack web developer, I possess a comprehensive
                skill set spanning both frontend and backend technologies. With a
                solid foundation in HTML, CSS, JavaScript, as well as backend
                frameworks like Node.js, Express, and database management with
                MongoDB, I excel in building dynamic and scalable web
                applications.
              </p>
            </div>

            {/* Personal Information Card */}
            <Card className="border-muted/50 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {personalInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="space-y-1"
                    >
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <info.icon className="h-4 w-4" />
                        {info.label}:
                      </div>
                      <p className="text-sm sm:text-base font-medium break-all sm:break-normal">
                        {info.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Experience, Education, Certifications */}
          <div className="space-y-6">
            
            {/* Work Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-muted/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0">
                      <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        Work Experience
                      </h3>
                      <div className="space-y-4 sm:space-y-6">
                        {workExperience.map((work, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border-l-2 border-primary/20 pl-4 space-y-1"
                          >
                            <p className="font-medium text-sm sm:text-base">
                              {work.title}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {work.company}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                              {work.duration}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="border-muted/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        Education
                      </h3>
                      <div className="space-y-4 sm:space-y-6">
                        {education.map((edu, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="border-l-2 border-primary/20 pl-4 space-y-1"
                          >
                            <p className="font-medium text-sm sm:text-base">
                              {edu.degree}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground">
                              {edu.institution}
                            </p>
                            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                              {edu.score} | {edu.duration}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="border-muted/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0">
                      <Award className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                        Certifications
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {certifications.map((cert, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2 text-xs sm:text-sm"
                          >
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <p className="leading-relaxed">{cert}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}