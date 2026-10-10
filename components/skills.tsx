"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Cloud, Code2, Database, PanelsTopLeft, Server, Wrench } from "lucide-react";
import { SiDocker, SiDrizzle, SiGrafana, SiGoogle, SiNextdotjs, SiNodedotjs, SiPostgresql, SiReact, SiRedis, SiTypescript } from "react-icons/si";

const SkillsCloud = dynamic(() => import("./skills-cloud"), {
  ssr: false,
  loading: () => <div className="grid min-h-72 place-items-center font-mono text-xs text-muted-foreground">Preparing the 3D skill cloud…</div>,
});

const skillCategories = [
  { title: "Languages", icon: Code2, skills: ["JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3", "SQL"] },
  { title: "Frontend", icon: PanelsTopLeft, skills: ["React.js", "Next.js", "Redux Toolkit", "Zustand", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend", icon: Server, skills: ["Node.js", "Express.js", "REST APIs", "Flask", "FastAPI", "Socket.io", "WebRTC"] },
  { title: "Database", icon: Database, skills: ["PostgreSQL", "MongoDB", "Supabase", "Prisma", "Drizzle ORM", "Mongoose"] },
  { title: "DevOps & Cloud", icon: Cloud, skills: ["AWS", "Docker", "Docker Compose", "Redis", "BullMQ", "Grafana", "Git", "Linux"] },
  { title: "Tools & Frameworks", icon: Wrench, skills: ["JWT", "Zod", "NextAuth", "Stripe", "Gemini API", "Inngest", "LangSmith", "pgvector", "Postman"] },
];

const allSkills = skillCategories.flatMap((category) => category.skills);
const marqueeSkills = [
  { name: "TypeScript", icon: SiTypescript },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "Redis", icon: SiRedis },
  { name: "Docker", icon: SiDocker },
  { name: "AWS", icon: Cloud },
  { name: "Gemini API", icon: SiGoogle },
  { name: "BullMQ", icon: SiNodedotjs },
  { name: "Grafana", icon: SiGrafana },
  { name: "Drizzle ORM", icon: SiDrizzle },
];

function SkillMarquee() {
  return (
    <div className="mb-10 overflow-hidden border-y border-white/[0.07] py-4 sm:mb-12" aria-label="Technology stack highlights">
      <p className="sr-only">Technology highlights: TypeScript, Next.js, React, Node.js, PostgreSQL, Redis, Docker, AWS, Gemini API, BullMQ, Grafana, and Drizzle ORM.</p>
      <div className="skill-marquee-track" aria-hidden="true">
        {[...marqueeSkills, ...marqueeSkills].map(({ name, icon: Icon }, index) => (
          <span key={`forward-${name}-${index}`} className="skill-marquee-chip"><Icon size={13} />{name}</span>
        ))}
      </div>
      <div className="skill-marquee-track skill-marquee-reverse mt-3" aria-hidden="true">
        {[...marqueeSkills.slice().reverse(), ...marqueeSkills.slice().reverse()].map(({ name, icon: Icon }, index) => (
          <span key={`reverse-${name}-${index}`} className="skill-marquee-chip"><Icon size={13} />{name}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [cloudOpen, setCloudOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateViewport = () => {
      setIsDesktop(media.matches);
      if (!media.matches) setCloudOpen(false);
    };
    updateViewport();
    media.addEventListener("change", updateViewport);
    return () => media.removeEventListener("change", updateViewport);
  }, []);

  return (
    <section id="skills" className="section-space px-4 sm:px-6">
      <div className="page-container">
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow mb-3">Skills & tools</p>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
              A toolkit for <span className="gradient-text">shipping end to end.</span>
            </h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-7 text-muted-foreground sm:text-base">
              My technical toolkit includes a wide range of languages, frameworks, and tools that I use to build modern web applications.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCloudOpen((open) => !open)}
            aria-expanded={cloudOpen}
            aria-controls="skills-cloud-panel"
            disabled={!isDesktop}
            className="hidden shrink-0 items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-4 py-2.5 text-xs font-medium text-white/80 transition-colors hover:border-violet-300/40 hover:bg-violet-400/10 disabled:cursor-not-allowed disabled:opacity-50 md:inline-flex"
          >
            <Cloud size={15} aria-hidden="true" />
            {cloudOpen ? "Hide 3D cloud" : "Explore 3D cloud"}
          </button>
        </div>

        <SkillMarquee />

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <article key={category.title} className="surface-card skill-card p-5 sm:p-6" data-reveal>
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-violet-300/15 bg-violet-400/[0.08] text-violet-200"><Icon size={18} aria-hidden="true" /></span>
                    <div>
                      <p className="eyebrow text-[0.58rem]">Category 0{index + 1}</p>
                      <h3 className="font-heading text-lg font-semibold tracking-tight">{category.title}</h3>
                    </div>
                  </div>
                  <span className="font-mono text-[0.58rem] text-white/30">{String(category.skills.length).padStart(2, "0")}</span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 font-mono text-[0.63rem] text-white/70 transition-colors hover:border-cyan-300/25 hover:text-cyan-100">{skill}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {cloudOpen && isDesktop && (
          <div id="skills-cloud-panel" className="surface-card mt-4 overflow-hidden p-2 sm:p-4" data-reveal>
            <SkillsCloud skills={allSkills} />
          </div>
        )}
      </div>
    </section>
  );
}
