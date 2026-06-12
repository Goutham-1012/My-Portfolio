import { motion } from "framer-motion";

/**
 * Scroll-triggered 3D reveal: content unfolds toward the viewer like a
 * map page — rises, rotates flat from a tipped-back angle, and un-blurs.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = "",
  once = true,
}) {
  return (
    <motion.div
      className={className}
      style={{ transformPerspective: 1000 }}
      initial={{ opacity: 0, y, rotateX: 16, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-70px" }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
