import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const roles = [
  {
    company: "ShelfEx",
    location: "Gurgaon, Haryana",
    role: "Full Stack Developer",
    duration: "July 2025 – Present",
    projects: "ShelfScan · AI-powered retail recognition",
    highlights: [
      <>Built core backend modules for <strong>ShelfScan</strong>, an AI-powered retail recognition platform serving <strong className="metric-text">10,000+ users</strong> across <strong className="metric-text">10L+ stores</strong> for enterprise clients including <strong>PepsiCo</strong>.</>,
      <>Reduced server <strong className="metric-text">CPU from 90% to 2%</strong> by overhauling query execution plans, adding strategic indexes, and implementing parallel database connections — peak query latency now under <strong className="metric-text">2s</strong>.</>,
      <>Optimized the <strong className="metric-text">image recognition pipeline from 30s to 10s</strong> using Worker Threads and algorithmic code improvements.</>,
      <>Built background job pipelines with <strong>BullMQ</strong>, <strong>Redis</strong>, and <strong>AWS SES</strong> handling <strong className="metric-text">10k+ daily tasks</strong>.</>,
      <>Set up production observability with <strong>Grafana</strong> dashboards to monitor query latency, CPU usage, and job throughput in real time.</>,
      <>Optimized bulk data handling via <strong>Node.js Streams</strong> and improved page performance with <strong>Next.js SSR/ISR</strong>.</>,
    ],
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Drizzle ORM", "Docker", "BullMQ", "Redis", "AWS SES", "Grafana"],
  },
  {
    company: "Daya Consultancy Services",
    location: "Bhubaneswar, Odisha",
    role: "Full Stack Web Developer",
    duration: "Sept 2024 – June 2025",
    projects: "PERN CRM · Social media automation",
    highlights: [
      <>Built a <strong>PERN-based CRM</strong> with real-time dashboards, lead management, and secure <strong>RBAC + JWT</strong> auth using HTTP-only cookie sessions.</>,
      <>Managed a multi-container <strong>Docker Compose</strong> setup (Node.js, PostgreSQL, Redis) with <strong>CI/CD</strong> on <strong>AWS EC2</strong>.</>,
      <>Created a social media automation system with <strong>OAuth 2.0</strong> using Google, Facebook Graph, and X APIs.</>,
      <>Cut REST API latency by <strong className="metric-text">25%</strong> using DB indexing and <strong>Redis caching</strong>.</>,
    ],
    technologies: ["PERN", "React", "Node.js", "PostgreSQL", "Redis", "Docker Compose", "AWS EC2", "JWT", "OAuth 2.0"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-space px-4 sm:px-6">
      <div className="page-container">
        <div className="mb-12 max-w-3xl md:mb-16" data-reveal>
          <p className="eyebrow mb-3">Experience</p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
            Work built for <span className="gradient-text">real-world scale.</span>
          </h2>
          <p className="mt-4 max-w-[54ch] text-sm leading-7 text-muted-foreground sm:text-base">
            A record of building reliable web products, improving system performance, and shipping backend platforms.
          </p>
        </div>

        <div className="experience-timeline relative">
          <span className="experience-line" data-timeline-line aria-hidden="true" />
          <div className="space-y-8 md:space-y-12">
            {roles.map((role, index) => (
              <article key={role.company} className="experience-row relative grid gap-4 md:grid-cols-[1fr_52px_1fr] md:gap-0" data-reveal>
                <div className={`experience-card surface-card relative p-5 sm:p-7 ${index % 2 === 1 ? "md:col-start-3 md:row-start-1" : "md:col-start-1 md:row-start-1"}`}>
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow mb-2 text-[0.62rem]">{role.duration}</p>
                      <h3 className="font-heading text-xl font-semibold tracking-[-0.035em] sm:text-2xl">{role.role}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{role.company} · {role.location}</p>
                    </div>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.035] text-cyan-200">
                      <BriefcaseBusiness size={18} aria-hidden="true" />
                    </span>
                  </div>

                  <p className="mb-4 flex items-center gap-2 text-xs font-medium text-violet-200/80">
                    <ArrowUpRight size={14} aria-hidden="true" />{role.projects}
                  </p>

                  <ul className="space-y-3">
                    {role.highlights.map((highlight, highlightIndex) => (
                      <li key={highlightIndex} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <span className="mt-[0.65rem] size-1 shrink-0 rounded-full bg-violet-300" aria-hidden="true" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${role.company} technologies`}>
                    {role.technologies.map((technology) => (
                      <li key={technology} className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1 font-mono text-[0.6rem] text-white/65">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="experience-marker hidden md:col-start-2 md:row-start-1 md:flex" aria-hidden="true">
                  <span />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
