import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { ease } from "@/lib/motion";

/**
 * Decorative SVG: traced fork, knife, plate, garnish.
 * Animates via pathLength on scroll-in.
 */
export function PlateLineDrawing({ className = "" }: { className?: string }) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (delay = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.4, ease },
        opacity: { duration: 0.01, delay },
      },
    }),
  };

  return (
    <div ref={ref} className={className}>
      <svg width="100%" height="100%" viewBox="0 0 220 220" fill="none" aria-hidden="true">
        <motion.path
          d="M 60 30 L 60 90 M 50 30 L 50 65 Q 60 75 70 65 L 70 30 M 60 90 L 60 190"
          stroke="oklch(0.703 0.106 65)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={pathVariants}
          custom={0}
          initial="hidden"
          animate={controls}
        />
        <motion.path
          d="M 160 30 C 160 30 175 50 175 80 C 175 95 165 100 160 100 L 160 190"
          stroke="oklch(0.703 0.106 65)"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={pathVariants}
          custom={0.3}
          initial="hidden"
          animate={controls}
        />
        <motion.circle
          cx="110"
          cy="120"
          r="55"
          stroke="oklch(0.378 0.038 160)"
          strokeWidth="2"
          variants={pathVariants}
          custom={0.6}
          initial="hidden"
          animate={controls}
        />
        <motion.circle
          cx="110"
          cy="120"
          r="42"
          stroke="oklch(0.378 0.038 160)"
          strokeWidth="1"
          strokeDasharray="4 3"
          variants={pathVariants}
          custom={0.9}
          initial="hidden"
          animate={controls}
        />
        <motion.path
          d="M 110 108 C 118 108 124 114 124 120 C 124 129 116 134 110 130 C 104 126 102 118 108 115"
          stroke="oklch(0.949 0.018 90)"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={pathVariants}
          custom={1.2}
          initial="hidden"
          animate={controls}
        />
      </svg>
    </div>
  );
}

/** Calligraphic signature stroke — handwriting reveal */
export function SignatureFlourish({ className = "" }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <svg
      ref={ref}
      width="280"
      height="50"
      viewBox="0 0 300 80"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d="M 20 50 C 20 50 30 10 50 35 C 60 50 55 65 65 60 C 80 53 75 18 90 28 C 100 35 95 60 108 56 C 120 52 118 23 132 33 C 142 40 135 60 148 55 C 160 50 158 18 172 28 C 182 35 178 60 192 56 C 204 52 200 23 215 33 C 225 40 220 60 234 55 C 246 50 242 30 258 40 C 268 47 265 63 278 60"
        stroke="oklch(0.703 0.106 65)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}
