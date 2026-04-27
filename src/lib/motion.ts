import type { Variants, Transition } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1] as const;
export const easeIn = [0.4, 0, 1, 1] as const;
export const spring: Transition = { type: "spring", stiffness: 60, damping: 20 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
