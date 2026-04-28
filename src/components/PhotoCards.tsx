import { motion } from "framer-motion";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/motion";

interface PhotoCardProps {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export function PhotoHoverCard({ src, alt, caption, className = "", loading = "lazy" }: PhotoCardProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-xl group cursor-default ${className}`}
      whileHover="hovered"
      initial="initial"
    >
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        variants={{
          initial: { scale: 1 },
          hovered: { scale: 1.07, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[oklch(0.985_0.003_90/0.85)] via-[oklch(0.985_0.003_90/0.2)] to-transparent flex items-end p-5"
        variants={{ initial: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-ivory text-[11px] uppercase tracking-[0.22em] font-light">
          {caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

export function PhotoStripCol({
  src,
  alt,
  caption,
  index,
}: PhotoCardProps & { index: number }) {
  return (
    <motion.div
      variants={staggerChild}
      className="relative h-[380px] overflow-hidden group"
      whileHover="hovered"
      initial="initial"
      custom={index}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        variants={{
          initial: { scale: 1 },
          hovered: { scale: 1.04, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="w-full h-full object-cover"
      />
      <motion.div
        className="absolute inset-0 bg-[oklch(0.985_0.003_90/0.78)] flex items-end justify-center pb-6"
        variants={{
          initial: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-ivory text-xs uppercase tracking-[0.25em]">{caption}</p>
      </motion.div>
    </motion.div>
  );
}

export { staggerContainer, viewportOnce };
