import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Projects from "./components/Projects.jsx";
import Education from "./components/Education.jsx";
import Impact from "./components/Impact.jsx";
import Contact from "./components/Contact.jsx";
import AmbientVoyage from "./components/ui/AmbientVoyage.jsx";
import { CompassRose, SeaSerpent, XMark } from "./components/ui/MapDecor.jsx";

export default function App() {
  const [storm, setStorm] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", storm ? "storm" : "day");
  }, [storm]);

  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      requestAnimationFrame(() => {
        const target = document.getElementById(id);
        if (!target) return;
        const top = target.getBoundingClientRect().top + window.scrollY - 104;
        window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
      });
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  // Briefly let every color cross-fade while the palette flips,
  // then restore normal (fast) hover transitions.
  function toggleStorm() {
    const root = document.documentElement;
    root.classList.add("theme-fade");
    setStorm((s) => !s);
    window.setTimeout(() => root.classList.remove("theme-fade"), 950);
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen">
      {/* Old-map ambience: chart grid, water squiggles, aged vignette */}
      <div aria-hidden="true" className="bg-chart pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="bg-dots pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="bg-noise pointer-events-none fixed inset-0 z-0" />
      <AmbientVoyage />
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <CompassRose className="absolute -top-16 -right-28 w-[26rem] animate-spin-slow text-ink-900/6" />
        <SeaSerpent className="absolute top-[30%] left-[2%] w-28 text-ocean-600/10" />
        <XMark className="absolute top-[58%] left-[5%] w-8 rotate-12 text-crimson-500/10" />
        <XMark className="absolute top-[82%] right-[8%] w-7 -rotate-6 text-crimson-500/8" />
      </div>

      {/* Storm rain across the whole voyage */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[45] transition-opacity duration-1000 ${
          storm ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="rain-far absolute inset-0" />
        <div className="rain-near absolute inset-0" />
      </div>

      <Navbar />
      <main className="relative z-10">
        <Hero storm={storm} onToggleStorm={toggleStorm} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Impact />
        <Contact />
      </main>
    </div>
    </MotionConfig>
  );
}
