"use client";

import { motion, useReducedMotion } from "framer-motion";

type ProjectFilterProps = {
  categories: string[];
  onFilterChange: (category: string) => void;
  activeFilter: string;
};

export default function ProjectFilter({ categories, onFilterChange, activeFilter }: ProjectFilterProps) {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
      {["All", ...categories].map((category) => {
        const active = activeFilter === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={active}
            onClick={() => onFilterChange(category)}
            className={`relative rounded-full border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${active ? "border-transparent text-white" : "border-white/10 text-white/60 hover:border-white/20 hover:text-white"}`}
          >
            {active && (
              <motion.span
                layoutId="active-project-filter"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/90 to-cyan-400/80"
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className={`relative z-10 ${active ? "project-filter-active-label" : ""}`}>{category}</span>
          </button>
        );
      })}
    </div>
  );
}
