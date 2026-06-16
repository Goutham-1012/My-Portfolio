import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CompassRose, SeaSerpent, XMark } from "./MapDecor.jsx";

export default function AmbientVoyage() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -170]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [-2, 3]);

  const drift = reduceMotion ? {} : { y, rotateZ };
  const glintMotion = reduceMotion
    ? {}
    : {
        animate: { x: ["-8%", "108%"], opacity: [0, 0.65, 0] },
        transition: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
      };

  return (
    <motion.div aria-hidden="true" className="ambient-voyage" style={drift}>
      <div className="ambient-voyage__plane">
        <svg
          viewBox="0 0 1400 820"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            className="ambient-route ambient-route--gold"
            d="M-60 640 C 220 460 350 760 590 520 S 1000 300 1480 430"
          />
          <path
            className="ambient-route ambient-route--ocean"
            d="M-80 210 C 230 340 410 40 680 180 S 1040 470 1490 170"
          />
          <path
            className="ambient-route ambient-route--crimson"
            d="M120 850 C 260 660 470 660 620 730 S 980 680 1270 810"
          />
        </svg>
        <CompassRose className="absolute right-[4%] top-[4%] w-56 text-gold-600/14" />
        <SeaSerpent className="absolute left-[4%] top-[42%] w-28 text-ocean-600/12" />
        <XMark className="absolute bottom-[10%] right-[18%] w-8 rotate-12 text-crimson-500/14" />
      </div>
      <motion.span className="ambient-glint ambient-glint--top" {...glintMotion} />
      <motion.span
        className="ambient-glint ambient-glint--bottom"
        {...(reduceMotion
          ? {}
          : {
              animate: { x: ["112%", "-12%"], opacity: [0, 0.45, 0] },
              transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2.2 },
            })}
      />
    </motion.div>
  );
}
