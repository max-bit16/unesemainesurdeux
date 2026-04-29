import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";

/* ─── Testimonials data — sourced from real customer reviews ─── */
type Testimonial = {
  name: string;
  context?: string;
  short: string;       // marquee fragment
  excerpt?: string;    // longer, for the side column
};

const FEATURED: Testimonial = {
  name: "E. Bagdassarian",
  context: "En couple Mars 2026",
  short: "On s'est régalés du début à la fin.",
  excerpt:
    "Le poulpe était incroyable : cuisson parfaite, tendre comme il faut, bien assaisonné. Et la souris d'agneau, fondante, savoureuse, pleine de goût. Un resto qui mérite d'être connu.",
};

const SIDE: Testimonial[] = [
  {
    name: "Giovanni Cascone",
    short: "Sans doute la meilleure mousse au chocolat que j'ai pu manger.",
    excerpt:
      "Le poulpe était juste incroyable. De loin ma plus belle expérience culinaire durant mon séjour à Grenoble.",
  },
  {
    name: "Ozzy Makeo",
    short: "Une atmosphère apaisante, comme à la maison.",
    excerpt:
      "Des plats à la fois croquants et fondants, une touche d'élégance, une ambiance moderne et raffinée.",
  },
];

const FRAGMENTS: Testimonial[] = [
  { name: "Anthony Cascone", short: "Le lieu est plein de charme, la cuisine savoureuse et généreuse." },
  { name: "Seulki Choi", short: "Le plat signature de poulpe tout était parfait." },
  { name: "S.D.", short: "Une cuisine délicieuse, fine et très gourmande." },
  { name: "E. Bagdassarian", short: "Ambiance chaleureuse, service au top." },
  { name: "Anthony Cascone", short: "La mousse au chocolat était tout simplement excellente." },
  { name: "Giovanni Cascone", short: "Une très belle découverte. Je recommande à 100%." },
  { name: "Ozzy Makeo", short: "Accueillies chaleureusement, un vrai régal." },
  { name: "Seulki Choi", short: "Le thon est également très bon. Service sympathique." },
  { name: "S.D.", short: "Un régal pour les yeux aussi." },
  { name: "Anthony Cascone", short: "Une adresse à retenir et à recommander." },
];

/* ─── Section ─────────────────────────────────────────────────── */
export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const driftLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const driftRight = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 overflow-hidden"
      aria-label="Témoignages clients"
    >
      {/* soft mineral wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, oklch(0.500 0.034 150 / 0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 90%, oklch(0.500 0.034 150 / 0.05) 0%, transparent 55%)",
        }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-14 md:mb-28"
        >
          <motion.div variants={staggerChild} className="gold-divider mx-auto mb-6 md:mb-8" />
          <motion.p variants={staggerChild} className="eyebrow mb-5 md:mb-6">
            N°06 Ce qu'ils en disent
          </motion.p>
          <motion.h2 variants={staggerChild} className="display-h2">
            Une cuisine
            <br />
            qui se raconte.
          </motion.h2>
        </motion.div>

        {/* Featured + Side composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start mb-20 md:mb-32">
          {/* Featured testimonial */}
          <motion.figure
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7 relative"
          >
            <motion.div
              variants={staggerChild}
              className="absolute -top-4 -left-1 md:-top-10 md:-left-6 text-green/15 pointer-events-none"
              aria-hidden
            >
              <Quote
                className="rotate-180 w-[72px] h-[72px] md:w-[120px] md:h-[120px]"
                strokeWidth={0.6}
              />
            </motion.div>

            <motion.div variants={staggerChild} className="relative">
              <Stars />
            </motion.div>

            <motion.blockquote
              variants={staggerChild}
              className="relative font-serif italic font-light text-ivory text-[1.5rem] md:text-[2.5rem] leading-[1.2] tracking-tight mt-5 md:mt-6"
            >
              «&nbsp;{FEATURED.short}&nbsp;»
            </motion.blockquote>

            <motion.p
              variants={staggerChild}
              className="relative text-[15px] md:text-[17px] text-ivory-muted font-light leading-relaxed mt-6 md:mt-8 max-w-xl"
            >
              {FEATURED.excerpt}
            </motion.p>

            <motion.figcaption
              variants={staggerChild}
              className="relative mt-8 md:mt-10 flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              <span className="h-px w-10 bg-gold" aria-hidden />
              <span className="eyebrow !text-ivory">{FEATURED.name}</span>
              {FEATURED.context && (
                <span className="text-[12px] text-ivory-ghost tracking-wide">
                  · {FEATURED.context}
                </span>
              )}
            </motion.figcaption>
          </motion.figure>

          {/* Side column — two stacked testimonials with hairlines */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-5 lg:pl-10 lg:border-l border-hairline space-y-10 md:space-y-12"
          >
            {SIDE.map((t) => (
              <motion.figure
                key={t.name + t.short}
                variants={staggerChild}
                className="group"
              >
                <Stars small />
                <blockquote className="font-serif italic font-light text-ivory text-[1.15rem] md:text-[1.375rem] leading-snug mt-3 md:mt-4">
                  «&nbsp;{t.short}&nbsp;»
                </blockquote>
                {t.excerpt && (
                  <p className="text-[14px] md:text-[14.5px] text-ivory-muted font-light leading-relaxed mt-3 md:mt-4">
                    {t.excerpt}
                  </p>
                )}
                <figcaption className="eyebrow !text-ivory-muted mt-4 md:mt-5">
                  {t.name}
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        {/* Hairlines + meta */}
        <div className="hairline mb-8 md:mb-10" />
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap items-center justify-center gap-x-5 md:gap-x-8 gap-y-3 text-center mb-12 md:mb-16"
        >
          <span className="eyebrow !text-ivory">96% de recommandations</span>
          <span className="text-ivory-ghost hidden sm:inline">·</span>
          <span className="eyebrow !text-ivory">204 avis ★ 5/5</span>
          <span className="text-ivory-ghost hidden sm:inline">·</span>
          <span className="eyebrow !text-ivory">Gault &amp; Millau 2026</span>
        </motion.div>
      </div>

      {/* ─── Drifting fragment rails (parallax marquee) ─── */}
      <div className="relative space-y-6">
        <motion.div style={{ x: driftLeft }} aria-hidden>
          <Marquee items={FRAGMENTS.slice(0, 5)} direction="left" />
        </motion.div>
        <motion.div style={{ x: driftRight }} aria-hidden>
          <Marquee items={FRAGMENTS.slice(5)} direction="right" />
        </motion.div>

        {/* edge fades */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-32 md:w-56"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-32 md:w-56"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}

/* ─── Subtle 5-star row ──────────────────────────────────────── */
function Stars({ small = false }: { small?: boolean }) {
  const size = small ? 11 : 13;
  return (
    <div className="flex items-center gap-1 text-gold" aria-label="5 étoiles sur 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={1.25} className="fill-current" />
      ))}
    </div>
  );
}

/* ─── Marquee row — duplicated content for seamless loop ─────── */
function Marquee({
  items,
  direction,
}: {
  items: Testimonial[];
  direction: "left" | "right";
}) {
  const animation =
    direction === "left"
      ? { x: ["0%", "-50%"] }
      : { x: ["-50%", "0%"] };

  return (
    <div className="relative overflow-hidden">
      <motion.ul
        className="flex gap-10 md:gap-14 whitespace-nowrap will-change-transform"
        animate={animation}
        transition={{
          duration: 60,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[...items, ...items, ...items].map((t, i) => (
          <li
            key={i}
            className="flex items-center gap-5 shrink-0"
          >
            <span className="font-serif italic font-light text-ivory text-[1.05rem] md:text-[1.25rem]">
              «&nbsp;{t.short}&nbsp;»
            </span>
            <span className="eyebrow !text-ivory-ghost">{t.name}</span>
            <span className="h-px w-12 bg-hairline" aria-hidden />
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
