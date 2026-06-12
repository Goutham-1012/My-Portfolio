import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Anchor } from "lucide-react";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Reading progress — the voyage so far */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-gold-400 via-crimson-400 to-ocean-500"
      />

      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-3 z-[60] flex justify-center px-4"
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
            scrolled
              ? "border-2 border-ink-900/15 bg-parchment-50/90 shadow-pop backdrop-blur-md"
              : "border-2 border-transparent"
          }`}
        >
          <a
            href="#top"
            className="group flex items-center gap-2 font-display text-2xl text-ink-900"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-tar bg-gold-400 text-tar shadow-pop-solid-sm transition-transform duration-300 group-hover:rotate-12">
              <Anchor size={17} strokeWidth={2.5} />
            </span>
            GR<span className="text-gradient">.</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-ink-500 transition-colors duration-300 hover:bg-ink-900/5 hover:text-ink-900"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden rounded-full border-2 border-tar bg-crimson-500 px-5 py-2 text-sm font-bold text-foam shadow-pop-solid-sm transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none md:block"
          >
            Recruit Me
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full text-ink-700 transition-colors hover:bg-ink-900/5 md:hidden"
          >
            <Menu size={20} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] flex flex-col bg-parchment-50/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-2xl text-ink-900">
                GR<span className="text-gradient">.</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.45, ease: "easeOut" }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-4xl text-ink-700 transition-colors hover:text-crimson-500"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="px-8 pb-10 font-hand text-xl text-ink-400">
              gunnalagouthamreddy0@gmail.com
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
