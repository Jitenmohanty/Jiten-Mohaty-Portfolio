// app/page.tsx
import Hero from "@/components/hero";
import ImpactStats from "@/components/impact-stats";
import About from "@/components/about";
import Experience from "@/components/experience";
import TalkToMe from "@/components/talk-to-me";
import Skills from "@/components/skills";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import ClientNavbar from "@/components/ClientNavbar"; // Import the client component wrapper

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Toaster />
      <ClientNavbar /> {/* Use the client component wrapper */}
      <Hero />
      <ImpactStats />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
      <ScrollToTop />
      <TalkToMe />
    </main>
  );
}
