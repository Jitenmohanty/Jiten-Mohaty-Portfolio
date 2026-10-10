const metrics = [
  { value: "10,000+", count: "10000", suffix: "+", label: "Platform users", detail: "Across enterprise retail operations" },
  { value: "10L+", count: "10", suffix: "L+", label: "Stores reached", detail: "Serving FMCG field teams" },
  { value: "10k+", count: "10", suffix: "k+", label: "Daily jobs", detail: "Processed through BullMQ pipelines" },
  { value: "25%", count: "25", suffix: "%", label: "Faster APIs", detail: "Through indexing and Redis caching" },
];

export default function ImpactStats() {
  return (
    <section id="impact" className="section-space px-4 sm:px-6">
      <div className="page-container">
        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-12 md:flex-row md:items-end" data-reveal>
          <div>
            <p className="eyebrow mb-3">Impact in production</p>
            <h2 className="max-w-[16ch] font-heading text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.05em]">
              Engineering measured in <span className="gradient-text">outcomes.</span>
            </h2>
          </div>
          <p className="max-w-[42ch] text-sm leading-7 text-muted-foreground md:text-base">
            Performance, reach, and reliability improvements from systems built for real teams and enterprise workloads.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <article className="surface-card group relative overflow-hidden p-5 sm:col-span-2 sm:p-7" data-reveal>
            <div className="absolute right-0 top-0 size-40 rounded-full bg-violet-500/10 blur-3xl transition-opacity group-hover:opacity-100" aria-hidden="true" />
            <p className="eyebrow relative mb-5">Server CPU usage</p>
            <div className="relative mb-6 flex items-baseline gap-3 font-heading tracking-[-0.055em]">
              <span className="text-[clamp(2.7rem,6vw,3.5rem)] font-semibold text-white"><span data-count-to="90" data-count-suffix="%">90%</span></span>
              <span className="text-xl text-white/35" aria-hidden="true">→</span>
              <span className="gradient-text text-[clamp(2.7rem,6vw,3.5rem)] font-semibold"><span data-count-to="2" data-count-suffix="%">2%</span></span>
            </div>
            <div className="relative space-y-3">
              <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground"><span>Before</span><span>90%</span></div>
              <div className="metric-track"><span className="metric-fill metric-fill-before" data-metric-bar="90" /></div>
              <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground"><span>After optimization</span><span>2%</span></div>
              <div className="metric-track"><span className="metric-fill metric-fill-after" data-metric-bar="2" /></div>
            </div>
            <p className="relative mt-5 max-w-[50ch] text-sm leading-6 text-muted-foreground">Query-plan improvements, strategic indexes, and parallel database connections brought peak query latency under 2 seconds.</p>
          </article>

          <article className="surface-card group relative overflow-hidden p-5 sm:col-span-2 sm:p-7" data-reveal>
            <div className="absolute right-0 top-0 size-40 rounded-full bg-cyan-500/10 blur-3xl" aria-hidden="true" />
            <p className="eyebrow relative mb-5">Image recognition pipeline</p>
            <div className="relative mb-6 flex items-baseline gap-3 font-heading tracking-[-0.055em]">
              <span className="text-[clamp(2.7rem,6vw,3.5rem)] font-semibold text-white"><span data-count-to="30" data-count-suffix="s">30s</span></span>
              <span className="text-xl text-white/35" aria-hidden="true">→</span>
              <span className="gradient-text text-[clamp(2.7rem,6vw,3.5rem)] font-semibold"><span data-count-to="10" data-count-suffix="s">10s</span></span>
            </div>
            <div className="relative mb-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground"><span>Pipeline time</span><span>3× faster</span></div>
            <div className="metric-track metric-track-tall"><span className="metric-fill metric-fill-gradient" data-metric-bar="33" /></div>
            <p className="relative mt-5 max-w-[50ch] text-sm leading-6 text-muted-foreground">Worker Threads and algorithmic improvements reduced image recognition processing from 30 seconds to 10 seconds.</p>
          </article>

          {metrics.map((metric) => (
            <article key={metric.label} className="surface-card p-5 sm:p-6" data-reveal>
              <p className="gradient-text mb-3 font-heading text-[clamp(2.2rem,4vw,3rem)] font-semibold leading-none tracking-[-0.055em]">
                <span data-count-to={metric.count} data-count-suffix={metric.suffix}>{metric.value}</span>
              </p>
              <h3 className="mb-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.11em] text-white/90">{metric.label}</h3>
              <p className="text-xs leading-5 text-muted-foreground">{metric.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
