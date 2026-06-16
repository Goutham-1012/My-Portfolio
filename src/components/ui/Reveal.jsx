import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered 3D reveal: content unfolds toward the viewer like a
 * map page — rises, rotates flat from a tipped-back angle, and un-blurs.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = false,
}) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion
    ? false
    : { opacity: 1, y, rotateX: 10, scale: 0.985 };
  const inView = reduceMotion
    ? { opacity: 1, y: 0, rotateX: 0, scale: 1 }
    : { opacity: 1, y: 0, rotateX: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000 }}
      initial={initial}
      whileInView={inView}
      viewport={{ once, margin: "-70px", amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
