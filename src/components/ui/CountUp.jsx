import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/** Number that counts up from 0 when it scrolls into view. */
export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
