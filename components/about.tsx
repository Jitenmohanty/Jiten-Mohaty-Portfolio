import { Award, BriefcaseBusiness, GraduationCap, MapPin, Sparkles } from "lucide-react";

const certifications = [
  "NPTEL clear on IoT, Cloud Computing and AI",
  "Intern on JAVA at PieInfo Com",
  "Core Java Excellence with DSA at Coding Ninjas",
  "Frontend With Excellence at Coding Ninjas",
  "React.js With Excellence at Coding Ninjas",
  "Backend on Node.js With Excellence at Coding Ninjas",
];

const credentials = [
  { degree: "MCA (Computer Application)", institution: "Biju Patnaik University, Rourkela", score: "CGPA 8.89", duration: "2020 – 2022" },
  { degree: "BSC (Mathematics)", institution: "Utkal University, Bhubaneswar", score: "CGPA 7.04", duration: "2016 – 2019" },
];

export default function About() {
  return (
    <section id="about" className="section-space px-4 sm:px-6">
      <div className="page-container">
        <div className="mb-10 max-w-3xl md:mb-14" data-reveal>
          <p className="eyebrow mb-3">About me</p>
          <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
            Building products that make <span className="gradient-text">work better.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
          <div className="flex flex-col justify-center" data-reveal>
            <p className="max-w-[58ch] text-base leading-[1.9] text-muted-foreground sm:text-lg">
              Full Stack Developer specialized in building scalable web platforms using{" "}
              <strong className="font-medium text-foreground">PERN, MERN, and Next.js</strong> stacks. I focus on{" "}
              <strong className="font-medium text-foreground">backend performance optimization</strong>, containerized microservices with{" "}
              <strong className="font-medium text-foreground">Docker</strong>, and production observability with{" "}
              <strong className="font-medium text-foreground">Grafana</strong>. Currently building AI-driven platforms serving{" "}
              <strong className="font-medium text-foreground">Fortune 500 FMCG clients including PepsiCo</strong> — where I reduced server CPU from{" "}
              <strong className="font-medium text-cyan-300">90% to 2%</strong> and cut image recognition latency from{" "}
              <strong className="font-medium text-cyan-300">30s to 10s</strong>.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.035] text-violet-300">
                <Sparkles size={16} aria-hidden="true" />
              </span>
              Focused on practical AI, system performance, and product quality.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <article className="surface-card p-4 sm:p-5" data-reveal>
              <span className="mb-4 grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><MapPin size={17} aria-hidden="true" /></span>
              <p className="eyebrow mb-1 text-[0.6rem]">Based in</p>
              <h3 className="font-heading text-base font-semibold tracking-tight sm:text-lg">Bhubaneswar</h3>
              <p className="text-xs text-muted-foreground">Odisha, India</p>
            </article>
            <article className="surface-card p-4 sm:p-5" data-reveal>
              <span className="mb-4 grid size-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><BriefcaseBusiness size={17} aria-hidden="true" /></span>
              <p className="eyebrow mb-1 text-[0.6rem]">Experience</p>
              <h3 className="gradient-text font-heading text-2xl font-semibold tracking-tight sm:text-3xl">2+ years</h3>
              <p className="text-xs text-muted-foreground">Full stack development</p>
            </article>
            <article className="surface-card col-span-2 p-4 sm:p-5" data-reveal>
              <p className="eyebrow mb-2 text-[0.6rem]">Currently building at</p>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <h3 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">ShelfEx</h3>
                <p className="text-xs leading-5 text-muted-foreground">AI-driven retail products</p>
              </div>
            </article>

            <article className="surface-card col-span-2 p-4 sm:p-5" data-reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-cyan-300/10 text-cyan-300"><GraduationCap size={17} aria-hidden="true" /></span>
                <div>
                  <p className="eyebrow text-[0.6rem]">Education</p>
                  <h3 className="font-heading text-lg font-semibold">Academic background</h3>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {credentials.map((credential) => (
                  <div key={credential.degree} className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
                    <p className="text-sm font-medium text-foreground">{credential.degree}</p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{credential.institution}</p>
                    <p className="mt-2 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-cyan-200/80">{credential.score} · {credential.duration}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card col-span-2 p-4 sm:p-5" data-reveal>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-violet-400/10 text-violet-300"><Award size={17} aria-hidden="true" /></span>
                <div>
                  <p className="eyebrow text-[0.6rem]">Certifications</p>
                  <h3 className="font-heading text-lg font-semibold">Courses & recognition</h3>
                </div>
              </div>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {certifications.map((certification) => (
                  <li key={certification} className="flex gap-2 text-xs leading-5 text-muted-foreground">
                    <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-cyan-300" aria-hidden="true" />
                    {certification}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
