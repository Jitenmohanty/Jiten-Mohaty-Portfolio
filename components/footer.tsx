"use client";

import { Github, Linkedin, MoveUpRight, Twitter } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    const lenis = (window as Window & { lenis?: { scrollTo: (target: number) => void } }).lenis;
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] px-4 py-8 sm:px-6 sm:py-10">
      <div className="page-container">
        <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
          <Link href="#home" aria-label="JM, back to home" className="font-heading text-xl font-bold tracking-[-0.08em] text-foreground">
            JM<span className="gradient-text">.</span>
          </Link>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            {links.map((link) => <Link key={link.href} href={link.href} className="link-wipe text-xs text-muted-foreground hover:text-foreground">{link.label}</Link>)}
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com/Jitenmohanty" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-violet-300/30 hover:text-foreground"><Github size={15} aria-hidden="true" /></a>
            <a href="https://linkedin.com/in/jiten-mohanty" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-violet-300/30 hover:text-foreground"><Linkedin size={15} aria-hidden="true" /></a>
            <a href="https://twitter.com/jitenmohanty" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="grid size-9 place-items-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-violet-300/30 hover:text-foreground"><Twitter size={15} aria-hidden="true" /></a>
          </div>

          <button type="button" onClick={scrollToTop} className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-full border border-white/10 px-4 text-xs font-medium text-muted-foreground transition-colors hover:border-cyan-300/30 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:self-auto">
            Back to top <MoveUpRight size={14} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-white/[0.07] pt-5 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Jiten Mohanty. All rights reserved.</p>
          <p>Designed & built with care</p>
        </div>
      </div>
    </footer>
  );
}
