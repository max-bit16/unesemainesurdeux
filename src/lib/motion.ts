import type { Variants, Transition } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;

// Snappy spring for hover snap-back — stiffness 300+ keeps it refined, never bouncy
export const spring: Transition = { type: "spring", stiffness: 300, damping: 28 };
export const springTap: Transition = { type: "spring", stiffness: 400, damping: 30 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

// Subtler variant for elements close to the viewport center
export const fadeUpSubtle: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9 } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

// Gold divider: scaleX reveal from center — more purposeful than fade for a line
export const dividerReveal: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1, transition: { duration: 0.9, ease } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

// Tighter stagger for dense grids / quick lists
export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
export const viewportOnceClose = { once: true, margin: "-40px" } as const;
