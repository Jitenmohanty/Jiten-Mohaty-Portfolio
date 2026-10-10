"use client";

import { useRef, type CSSProperties, type PointerEvent } from "react";
import { TypeAnimation } from "react-type-animation";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";

type GlowStyle = CSSProperties & {
  "--glow-x": string;
  "--glow-y": string;
};

const stack = ["Next.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !heroRef.current) return;
    const bounds = heroRef.current.getBoundingClientRect();
    heroRef.current.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
    heroRef.current.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      onPointerMove={moveGlow}
      className="hero-shell relative flex min-h-[100svh] items-center overflow-hidden px-4 pb-12 pt-28 sm:px-6 lg:pt-32"
      style={{ "--glow-x": "50%", "--glow-y": "40%" } as GlowStyle}
    >
      <div className="hero-cursor-glow pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="page-container relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10">
          <div className="relative z-10 max-w-[690px]">
            <p className="eyebrow mb-7 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2.5 text-[0.68rem] text-white/75">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for work
            </p>

            <h1 className="hero-title mb-5 max-w-[12ch] font-heading text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[1] tracking-[-0.06em] text-white">
              Hi, I&apos;m <span className="gradient-text whitespace-nowrap">Jiten Mohanty</span>
            </h1>

            <div className="mb-5 flex min-h-8 items-center gap-2 font-heading text-lg font-medium text-white/75 sm:text-xl">
              <span className="size-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
              <TypeAnimation
                sequence={[
                  "Full Stack Developer", 1800,
                  "AI Platform Builder", 1800,
                  "Backend Performance Engineer", 1800,
                  "PERN / MERN / Next.js", 1800,
                  "Docker & Microservices", 1800,
                  "Node.js & PostgreSQL", 1800,
                ]}
                wrapper="span"
                speed={48}
                repeat={Number.POSITIVE_INFINITY}
                cursor
              />
            </div>

            <p className="mb-8 max-w-[55ch] text-base leading-[1.75] text-[#9aa0b4] sm:text-[1.0625rem]">
              Full Stack Developer building scalable, performance-tuned platforms — currently powering AI-driven retail products for Fortune 500 FMCG clients including PepsiCo.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/resume2.pdf"
                download="Jiten_resume.pdf"
                className="button-primary inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold"
              >
                Download Resume
                <Download size={16} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.025] px-6 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.07]"
              >
                Contact Me
                <ArrowDownRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px] lg:ml-auto">
            <div className="float-chip float-chip-one absolute -left-4 top-12 z-20 hidden rounded-full border border-violet-300/20 bg-[#171321]/90 px-4 py-2 font-mono text-[0.68rem] text-violet-100 shadow-xl backdrop-blur-xl sm:block">
              AI systems
            </div>
            <div className="float-chip float-chip-two absolute -right-3 top-28 z-20 hidden rounded-full border border-cyan-200/20 bg-[#10191d]/90 px-4 py-2 font-mono text-[0.68rem] text-cyan-100 shadow-xl backdrop-blur-xl sm:block">
              API performance
            </div>
            <div className="float-chip float-chip-three absolute -bottom-4 left-12 z-20 hidden rounded-full border border-white/10 bg-[#12141d]/90 px-4 py-2 font-mono text-[0.68rem] text-white/80 shadow-xl backdrop-blur-xl sm:block">
              Shipping to production
            </div>

            <div className="glass-panel relative overflow-hidden p-1.5 sm:rounded-[26px]">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" aria-hidden="true" />
              <div className="rounded-[19px] border border-white/[0.045] bg-[#0b0d13]/95 p-4 sm:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <p className="font-mono text-[0.65rem] text-white/40">jiten@portfolio ~ /stack</p>
                  <span className="w-10" aria-hidden="true" />
                </div>

                <div className="grid grid-cols-[1.3rem_1fr] gap-x-3 font-mono text-[0.72rem] leading-[2.05] sm:text-[0.8rem]">
                  <span className="text-white/20">01</span><p><span className="text-violet-300">const</span> <span className="text-cyan-200">engineer</span> = &#123;</p>
                  <span className="text-white/20">02</span><p className="pl-4"><span className="text-[#9aa0b4]">focus</span>: <span className="text-emerald-300">&quot;AI platforms&quot;</span>,</p>
                  <span className="text-white/20">03</span><p className="pl-4"><span className="text-[#9aa0b4]">scale</span>: <span className="text-amber-200">10,000+</span> <span className="text-white/45">users</span>,</p>
                  <span className="text-white/20">04</span><p className="pl-4"><span className="text-[#9aa0b4]">latency</span>: <span className="text-amber-200">&lt; 2s</span>,</p>
                  <span className="text-white/20">05</span><p className="pl-4"><span className="text-[#9aa0b4]">craft</span>: [</p>
                  <span className="text-white/20">06</span><p className="pl-8 text-emerald-300">&quot;reliable systems&quot;,</p>
                  <span className="text-white/20">07</span><p className="pl-8 text-emerald-300">&quot;measurable impact&quot;</p>
                  <span className="text-white/20">08</span><p className="pl-4">],</p>
                  <span className="text-white/20">09</span><p>&#125;;</p>
                  <span className="text-white/20">10</span><p className="mt-2"><span className="text-violet-300">await</span> engineer.<span className="text-cyan-200">ship</span>();<span className="ml-1 inline-block h-4 w-1 animate-pulse bg-cyan-300 align-middle" aria-hidden="true" /></p>
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-4">
                  <p className="eyebrow mb-3 text-[0.58rem] text-white/45">Current stack</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/[0.09] bg-white/[0.035] px-3 py-1.5 font-mono text-[0.63rem] text-white/70">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-3 border-t border-white/[0.09] pt-5 sm:grid-cols-3 sm:gap-6 lg:mt-14">
          {[
            { value: "90% → 2%", label: "Server CPU" },
            { value: "10,000+", label: "Platform users" },
            { value: "PepsiCo", label: "Enterprise client" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline justify-between gap-3 sm:block">
              <p className="font-heading text-xl font-semibold tracking-[-0.035em] text-white sm:text-2xl">{stat.value}</p>
              <p className="font-mono text-[0.61rem] uppercase tracking-[0.12em] text-[#9aa0b4]">{stat.label}</p>
            </div>
          ))}
        </div>

        <a href="#impact" className="link-wipe mt-9 hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white/80 lg:inline-flex">
          Scroll to explore <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
