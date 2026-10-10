"use client";

import { useState, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, ExternalLink, Github, Search } from "lucide-react";
import projectsData from "@/data/projects.json";
import ProjectFilter from "./project-filter";

type Project = {
  date: string;
  title: string;
  description: string;
  url: string;
  demo: string;
  imgSrc: string;
  category?: string;
};

type ProjectStyle = CSSProperties & {
  "--spotlight-x"?: string;
  "--spotlight-y"?: string;
};

const technologyLabels = [
  "Next.js", "PostgreSQL", "Drizzle", "Docker", "BullMQ", "Redis", "AWS", "Gemini", "React", "Node.js", "TypeScript", "MongoDB", "Stripe", "Prisma", "Python", "Java", "Express", "Supabase", "Tailwind", "Flask", "FastAPI", "WebRTC", "OAuth", "JWT",
];

function deriveCategory(project: Project) {
  if (project.category) return project.category;
  const text = `${project.title} ${project.description}`.toLowerCase();
  if (/ai|agent|gemini/.test(text)) return "AI AGENT";
  if (/next\.js/.test(text)) return "Next.js";
  if (/react/.test(text)) return "React";
  if (/node|express|api|backend/.test(text)) return "Backend";
  if (/ui|design/.test(text)) return "UI/UX";
  return "Other";
}

const projects = (projectsData.projects as Project[]).map((project) => ({
  ...project,
  category: deriveCategory(project),
}));
const featuredProject = projects.find((project) => project.title.includes("ShelfScan"));
const categories = [...new Set(projects.map((project) => project.category).filter((category): category is string => Boolean(category)))];

function getProjectTags(project: Project) {
  const searchable = `${project.title} ${project.description}`.toLowerCase();
  return technologyLabels.filter((technology) => searchable.includes(technology.toLowerCase())).slice(0, 4);
}

function ProjectImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  return (
    <div className="project-image relative h-full w-full overflow-hidden bg-[#141722]">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-violet-500/15 via-white/[0.035] to-cyan-400/10" aria-hidden="true" />}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-violet-500/15 via-[#11131b] to-cyan-400/10" aria-label={`${alt} preview unavailable`}>
          <span className="font-heading text-4xl font-semibold tracking-[-0.06em] text-white/60">JM<span className="text-cyan-300">.</span></span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={75}
          onLoad={() => setLoaded(true)}
          onError={() => { setLoaded(true); setFailed(true); }}
          className={`object-cover transition-[opacity,transform] duration-500 group-hover:scale-[1.05] ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5" aria-hidden="true" />
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="project-feature surface-card overflow-hidden" data-reveal>
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="group relative min-h-[280px] overflow-hidden bg-[#141722] sm:min-h-[360px] lg:min-h-full">
          <ProjectImage src={project.imgSrc} alt={`${project.title} project preview`} priority />
          <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/80 backdrop-blur-md">Featured · ShelfEx</div>
          <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
            {["10,000+ users", "10L+ stores", "95% accuracy"].map((metric) => <span key={metric} className="rounded-full border border-white/15 bg-black/45 px-3 py-1.5 font-mono text-[0.62rem] text-white/90 backdrop-blur-md">{metric}</span>)}
          </div>
        </div>

        <div className="p-5 sm:p-8 lg:p-9">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="eyebrow text-[0.6rem]">{project.category}</span>
            <span className="size-1 rounded-full bg-white/20" aria-hidden="true" />
            <span className="font-mono text-[0.63rem] text-muted-foreground">{project.date}</span>
          </div>
          <h3 className="mb-4 font-heading text-[clamp(1.8rem,4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.05em]">{project.title}</h3>
          <p className="mb-6 text-sm leading-7 text-muted-foreground">{project.description}</p>

          <div className="grid gap-4 border-y border-white/[0.08] py-5 sm:grid-cols-3">
            <div><p className="eyebrow mb-2 text-[0.56rem]">Problem</p><p className="text-xs leading-5 text-white/75">Server CPU reached 90%; image recognition took 30 seconds.</p></div>
            <div><p className="eyebrow mb-2 text-[0.56rem]">Solution</p><p className="text-xs leading-5 text-white/75">Query-plan optimization, indexing, parallel connections, and Worker Threads.</p></div>
            <div><p className="eyebrow mb-2 text-[0.56rem]">Result</p><p className="text-xs leading-5 text-white/75">2% CPU, peak queries under 2s, and recognition in 10s.</p></div>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="ShelfScan technologies">
            {["Next.js", "PostgreSQL + Drizzle ORM", "Docker", "BullMQ", "Redis", "AWS SES", "Grafana"].map((technology) => (
              <li key={technology} className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 font-mono text-[0.59rem] text-white/70">{technology}</li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#experience" className="button-primary inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold">Explore experience <ArrowUpRight size={14} aria-hidden="true" /></a>
            <a href="#contact" className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-xs font-semibold text-white/85 transition-colors hover:border-white/30 hover:bg-white/[0.05]">Discuss a project <ArrowDownRight size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    const rotateX = (0.5 - y) * 12;
    const rotateY = (x - 0.5) * 12;
    card.style.setProperty("--spotlight-x", `${x * 100}%`);
    card.style.setProperty("--spotlight-y", `${y * 100}%`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const resetPointer = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.transform = "";
  };

  const tags = getProjectTags(project);
  return (
    <article
      className="project-card surface-card group relative flex h-full flex-col overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      style={{ "--spotlight-x": "50%", "--spotlight-y": "50%" } as ProjectStyle}
      data-reveal
    >
      <div className="project-spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
      <div className="project-preview group relative aspect-[16/10] overflow-hidden">
        <ProjectImage src={project.imgSrc} alt={`${project.title} preview`} priority={index < 3} />
        <span className="absolute left-3 top-3 z-10 rounded-full border border-white/15 bg-black/45 px-3 py-1 font-mono text-[0.58rem] text-white/90 backdrop-blur-md">{project.category}</span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground">{project.date}</p>
          <span className="font-mono text-[0.56rem] text-white/35">PROJECT {String(index + 1).padStart(2, "0")}</span>
        </div>
        <h3 className="mb-2 font-heading text-lg font-semibold leading-snug tracking-[-0.025em] sm:text-xl">{project.title}</h3>
        <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{project.description}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} technology tags`}>
          {tags.map((tag) => <li key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.025] px-2.5 py-1 font-mono text-[0.55rem] text-white/60">{tag}</li>)}
        </ul>

        <details className="project-details mt-4 border-t border-white/[0.07] pt-3">
          <summary className="cursor-pointer text-xs font-medium text-white/65 transition-colors hover:text-cyan-200">Full project details</summary>
          <p className="mt-3 text-xs leading-6 text-muted-foreground">{project.description}</p>
        </details>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live demo in a new tab`} className="project-link inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 px-3.5 text-[0.68rem] font-semibold text-white/80 transition-colors hover:border-cyan-200/40 hover:text-cyan-100"><ExternalLink size={14} aria-hidden="true" />Live demo</a>}
          {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} source repository in a new tab`} className="project-link inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 px-3.5 text-[0.68rem] font-semibold text-white/80 transition-colors hover:border-violet-300/40 hover:text-violet-100"><Github size={14} aria-hidden="true" />Code</a>}
          {!project.demo && !project.url && <span className="font-mono text-[0.58rem] text-white/40">No public demo or repository</span>}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matchesProject = (project: Project) => {
    const matchesFilter = activeFilter === "All" || project.category === activeFilter;
    const matchesSearch = !normalizedQuery || `${project.title} ${project.description}`.toLowerCase().includes(normalizedQuery);
    return matchesFilter && matchesSearch;
  };

  const showFeatured = Boolean(featuredProject && matchesProject(featuredProject));
  const filteredProjects = projects.filter((project) => project !== featuredProject && matchesProject(project));
  const visibleList = filteredProjects.slice(0, visibleProjects);
  const hasAnyResult = showFeatured || filteredProjects.length > 0;

  const changeFilter = (category: string) => {
    setActiveFilter(category);
    setVisibleProjects(6);
  };

  return (
    <section id="projects" className="section-space px-4 sm:px-6">
      <div className="page-container">
        <div className="mb-9 max-w-3xl" data-reveal>
          <p className="eyebrow mb-3">Selected work</p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">Projects built to <span className="gradient-text">solve real problems.</span></h2>
          <p className="mt-4 max-w-[56ch] text-sm leading-7 text-muted-foreground sm:text-base">A showcase of my web development projects, demonstrating my skills and experience in building modern web applications.</p>
        </div>

        <div className="mb-8 flex flex-col gap-4 border-y border-white/[0.08] py-4 lg:flex-row lg:items-center lg:justify-between" data-reveal>
          <ProjectFilter categories={categories} onFilterChange={changeFilter} activeFilter={activeFilter} />
          <label className="relative block w-full shrink-0 lg:max-w-[260px]">
            <span className="sr-only">Search projects</span>
            <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => { setSearchQuery(event.target.value); setVisibleProjects(6); }}
              placeholder="Search projects…"
              className="h-11 w-full rounded-input border border-white/10 bg-white/[0.035] pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-cyan-300/50 focus:outline-none focus:ring-4 focus:ring-cyan-300/10"
            />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">{filteredProjects.length + (showFeatured ? 1 : 0)} projects shown</p>

        {showFeatured && featuredProject && <div className="mb-4"><FeaturedProject project={featuredProject} /></div>}

        {visibleList.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="Project list">
            {visibleList.map((project, index) => <ProjectCard key={`${project.title}-${project.date}`} project={project} index={index} />)}
          </div>
        ) : !showFeatured && !hasAnyResult ? (
          <div className="surface-card grid min-h-56 place-items-center px-6 py-12 text-center" data-reveal>
            <div>
              <span className="mx-auto mb-4 grid size-12 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-violet-200"><Search size={19} aria-hidden="true" /></span>
              <h3 className="font-heading text-xl font-semibold">No matching projects</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try another search term or category.</p>
              <button type="button" onClick={() => { setSearchQuery(""); changeFilter("All"); }} className="mt-5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:border-cyan-200/40 hover:text-cyan-100">Clear filters</button>
            </div>
          </div>
        ) : null}

        {visibleProjects < filteredProjects.length && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setVisibleProjects((visible) => Math.min(visible + 6, filteredProjects.length))} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm font-semibold text-white/80 transition-colors hover:border-violet-300/40 hover:bg-white/[0.04] hover:text-white">
              Load more projects <ArrowDownRight size={15} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
