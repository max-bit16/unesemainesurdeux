import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SITE_URL } from "@/config/site";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Wine,
  Users,
  ChefHat,
  Phone,
  MapPin,
} from "lucide-react";
import { useRef } from "react";
import {
  fadeUp,
  scaleUp,
  staggerContainer,
  staggerFast,
  staggerChild,
  viewportOnce,
  spring,
  dividerReveal,
} from "@/lib/motion";
import { Testimonials } from "@/components/Testimonials";

/*
  PHOTOS TEMPORAIRES — Pexels CDN (libre de droits)
  Ces photos sont des substituts haute qualité.
  Remplacer par les photos originales du restaurant
  une fois reçues en format RAW ou JPEG non compressé.
  Contact : restaurant1sur2@gmail.com
  Date de remplacement prévue : à confirmer avec le client
*/
import heroGrenoble from "@/assets/photos/hero-grenoble-bulles.jpg";
import heroGrenobleWebp from "@/assets/photos/hero-grenoble-bulles.webp";
import { PEXELS } from "@/lib/site-images";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Restaurant Une Semaine Sur Deux à Grenoble Cuisine Bistronomique · Gault & Millau 2026",
      },
      {
        name: "description",
        content:
          "Restaurant bistronomique à Grenoble. Produits frais, circuit court, cuisine faite maison. Toque Gault & Millau 2026. Chef Pierrick Vasseur. ☎ 04 76 27 13 75",
      },
      {
        property: "og:title",
        content:
          "Restaurant Une Semaine Sur Deux à Grenoble Cuisine Bistronomique · Gault & Millau 2026",
      },
      {
        property: "og:description",
        content:
          "Restaurant bistronomique à Grenoble. Produits frais, circuit court, cuisine faite maison. Toque Gault & Millau 2026.",
      },
      { property: "og:image", content: `${SITE_URL}/og-home.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-home.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <AwardSection />
      <SignatureDish />
      <Esprit />
      <PhotoStrip />
      <Testimonials />
      <HoursReservation />
    </>
  );
}

const HERO_LINES = [
  ["Restaurant", "à", "Grenoble,"],
  ["cuisine", "vivante."],
];

const wordContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.3 } },
};
const WORD_EASE = [0.22, 1, 0.36, 1] as const;
const wordSlide = {
  hidden: { y: "108%", opacity: 0 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0.72, ease: WORD_EASE } },
};

/* ─── HERO — scroll-driven narrative ───────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, prefersReducedMotion ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, prefersReducedMotion ? 0 : -32]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-24 pb-16 md:py-0 overflow-hidden"
    >
      {/* Hero photograph — parallax layer */}
      <motion.div
        style={{ top: "-40px", bottom: "-40px", y: imageY }}
        className="absolute inset-x-0 z-0"
      >
        <picture>
          <source srcSet={heroGrenobleWebp} type="image/webp" />
          <img
            src={heroGrenoble}
            alt="Téléphériques de Grenoble surplombant la ville au coucher de soleil"
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            width={1920}
            height={1280}
            className="w-full h-full object-cover object-[68%_center] md:object-center"
          />
        </picture>
      </motion.div>

      {/* Veils */}
      <div
        className="absolute inset-0 z-0 pointer-events-none md:hidden"
        style={{ background: "radial-gradient(ellipse at center, rgba(250,250,247,0.85) 0%, rgba(250,250,247,0.93) 55%, rgba(242,241,236,0.98) 100%)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none hidden md:block"
        style={{ background: "radial-gradient(ellipse at center, rgba(250,250,247,0.72) 0%, rgba(250,250,247,0.88) 65%, rgba(242,241,236,0.95) 100%)" }}
        aria-hidden
      />
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(250,250,247,0.45) 0%, rgba(250,250,247,0) 25%, rgba(250,250,247,0) 75%, rgba(250,250,247,0.7) 100%)" }}
        aria-hidden
      />

      {/* Content — fades + drifts up as user scrolls away */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl text-center w-full"
      >
        <motion.div
          variants={dividerReveal}
          initial="hidden"
          animate="visible"
          className="gold-divider mx-auto mb-8 md:mb-10"
          style={{ transformOrigin: "center" }}
        />

        {/* Word-by-word reveal */}
        <motion.h1
          variants={wordContainer}
          initial="hidden"
          animate="visible"
          className="display-h1 mb-6 md:mb-8"
        >
          {HERO_LINES.map((words, li) => (
            <span key={li} className="block">
              {words.map((word, wi) => (
                <span
                  key={wi}
                  style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}
                >
                  <motion.span variants={wordSlide} style={{ display: "inline-block" }}>
                    {word}{wi < words.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[14px] md:text-[16px] text-ivory-muted mb-9 md:mb-12 px-2"
        >
          Restaurant · Grenoble · Gault &amp; Millau 2026
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-none mx-auto"
        >
          <a href="tel:+33476271375" className="btn-primary !py-3.5">
            Réserver une table
          </a>
          <Link to="/menu" className="btn-ghost-gold !py-3.5">
            Voir la carte
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint — fades with content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-ivory-muted"
        aria-hidden
      >
        <ChevronDown size={18} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}

/* ─── AWARD — horizontal editorial split ───────────────────── */
function AwardSection() {
  const ease = [0.22, 1, 0.36, 1] as const;
  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  };
  const fadeUpDelayed = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.15, ease } },
  };
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease } },
  };
  const statsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
  };
  const statItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-[45%_55%] min-h-[280px]">
      {/* LEFT — pearl surface, editorial copy */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="bg-surface flex flex-col justify-center px-6 py-16 md:px-16 md:py-28"
      >
        <div className="mb-6 h-px w-10 bg-gold opacity-60" />
        <h2 className="display-h2">Table Gourmande</h2>
        <p className="mt-4 max-w-xs text-[15px] text-ivory-muted font-light leading-relaxed">
          Distinction attribuée au Chef Pierrick Vasseur pour la qualité de sa cuisine bistronomique à Grenoble.
        </p>
        <p className="mt-8 text-[12px] uppercase tracking-[0.15em] text-gold font-light">
          Gault &amp; Millau · 2026
        </p>
      </motion.div>

      {/* RIGHT — mineral surface, plaque + stats */}
      <motion.div
        variants={fadeUpDelayed}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="bg-surface-deep flex flex-col md:flex-row items-center md:justify-start gap-10 md:gap-12 px-6 py-16 md:px-16 md:py-28"
      >
        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="shrink-0 flex flex-col items-center justify-center text-center px-6 py-8 border border-[oklch(0.570_0.030_150_/_0.35)] rounded-full w-[140px] h-[140px] md:w-[180px] md:h-[180px]"
          style={{ boxShadow: "0 0 32px oklch(0.570 0.030 150 / 0.18)" }}
          aria-label="Plaque Gault & Millau Table Gourmande 2026"
        >
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.22em] text-gold font-light">
            Gault &amp; Millau
          </span>
          <span className="font-serif italic font-light text-[1.25rem] md:text-[1.6rem] text-ivory leading-tight mt-1">
            Table
            <br />
            Gourmande
          </span>
          <span className="text-[10px] md:text-[11px] tracking-[0.18em] text-gold font-light mt-2">
            2026
          </span>
        </motion.div>

        <motion.div
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-row md:flex-col gap-0 w-full md:w-auto"
        >
          {[
            { value: "96%", label: "clients satisfaits", serif: "italic", size: "text-[2.25rem] md:text-[3.5rem]", color: "text-gold" },
            { value: "204", label: "avis facebook", serif: "italic", size: "text-[2.25rem] md:text-[3.5rem]", color: "text-gold" },
            { value: "Toque", label: "Gault & Millau 2026", serif: "italic", size: "text-[1.5rem] md:text-[2rem]", color: "text-ivory" },
          ].map((s, i, arr) => (
            <motion.div
              key={s.value}
              variants={statItem}
              className={`flex-1 md:flex-none py-3 md:py-4 px-3 md:px-0 text-center md:text-left ${
                // dividers: vertical between items on mobile, horizontal between items on desktop
                i < arr.length - 1
                  ? "border-r md:border-r-0 md:border-b border-[oklch(0.570_0.030_150_/_0.20)]"
                  : ""
              } md:min-w-[200px]`}
            >
              <div
                className={`font-serif font-light leading-none ${s.serif === "italic" ? "italic" : ""} ${s.size} ${s.color}`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-ivory-muted font-light">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── SIGNATURE DISH — cinematic contained ─────────────────── */
function SignatureDish() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={ref}
      className="relative w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-[oklch(0.78_0.03_155)]"
    >
      {/* LEFT — sage panel with text */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-14 md:py-32 lg:px-20 bg-[oklch(0.78_0.03_155)]"
      >
        <motion.h2 variants={staggerChild} className="display-h2 mb-5 md:mb-6">
          Le Poulpe à la crème
          <br className="hidden sm:block" />
          {" "}d'ail noir.
        </motion.h2>
        <motion.p
          variants={staggerChild}
          className="text-[15px] md:text-[16px] text-ivory-muted max-w-lg mb-6 md:mb-7"
        >
          Le plat qui revient dans tous les avis. Cuisson parfaite, produits de
          saison, fait maison.
        </motion.p>
        <motion.div variants={staggerChild}>
          <Link to="/menu" className="gold-link">
            Voir la carte complète <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>

      {/* RIGHT — photo, naturally framed (square asset, contained height) */}
      <div className="relative w-full h-[60vw] max-h-[640px] md:h-auto md:max-h-none md:min-h-[560px] overflow-hidden">
        <motion.img
            src={PEXELS.poulpe}
            alt="Poulpe à la crème d'ail noir — plat signature du Chef Pierrick Vasseur"
            loading="lazy"
            decoding="async"
            width={1324}
            height={1324}
            style={{ y, objectPosition: "center 40%" }}
            className="absolute inset-0 w-full h-[110%] object-cover"
          />
        {/* Subtle blend toward the sage panel on the left edge */}
        <div
          className="absolute inset-y-0 left-0 w-16 hidden md:block pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.78 0.03 155 / 0.55) 0%, oklch(0.78 0.03 155 / 0) 100%)",
          }}
        />
      </div>
    </section>
  );
}

/* ─── L'ESPRIT — editorial text rows, no cards ─────────────── */
function Esprit() {
  const rows = [
    {
      icon: Leaf,
      label: "Produits locaux",
      body: "Produits frais, circuit court, de saison. Rien qui ne vient de loin.",
    },
    {
      icon: Wine,
      label: "Cave personnelle",
      body: "Sélection viticole du chef à prix justes, renouvelée régulièrement.",
    },
    {
      icon: Users,
      label: "Privatisation",
      body: "Le restaurant accueille vos événements privés sur demande.",
    },
    {
      icon: ChefHat,
      label: "Fait maison",
      body: "Chaque plat, chaque dessert, préparé sur place par Pierrick Vasseur.",
    },
  ];

  return (
    <section className="py-32 md:py-48 px-6">
      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-4xl mx-auto"
      >

        <div>
          {rows.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              variants={staggerChild}
              whileHover={{ x: 6 }}
              transition={spring}
              className={`grid grid-cols-1 md:grid-cols-[40%_60%] gap-3 md:gap-10 py-7 md:py-8 cursor-default ${
                i === 0 ? "border-t border-hairline" : ""
              } border-b border-hairline`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <p className="font-serif italic text-[1.25rem] md:text-[1.375rem] text-ivory font-light">
                  {label}
                </p>
              </div>
              <p className="text-[15px] md:text-[16px] text-ivory-muted font-light leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}

/* ─── PHOTO STRIP — 3 columns, no gap, contained height ────── */
function PhotoStrip() {
  const items = [
    { src: PEXELS.volaille, alt: "Viandes & plats du moment — restaurant Une Semaine Sur Deux", caption: "Viandes & plats", position: "center 35%" },
    { src: PEXELS.poisson, alt: "Poissons & fruits de mer — bistronomie Grenoble", caption: "Poissons & saison", position: "center center" },
    { src: PEXELS.surfTurf, alt: "Plats du moment — Une Semaine Sur Deux Grenoble", caption: "Plats du moment", position: "center 40%" },
  ];

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="grid grid-cols-1 md:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div
          key={item.caption}
          variants={staggerChild}
          className="relative h-[240px] md:h-[420px] overflow-hidden group"
          whileHover="hovered"
          initial="initial"
        >
          <motion.img
              src={item.src}
              alt={item.alt}
              loading="lazy"
              decoding="async"
              width={1324}
              height={1324}
              variants={{
                initial: { scale: 1 },
                hovered: { scale: 1.03, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
              }}
              style={{ objectPosition: item.position }}
              className="w-full h-full object-cover"
            />
          <motion.div
            className="absolute inset-0 bg-[oklch(0.985_0.003_90/0.78)] flex items-end justify-center pb-6"
            variants={{ initial: { opacity: 0 }, hovered: { opacity: 1 } }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-ivory text-[11px] uppercase tracking-[0.18em] font-light">
              {item.caption}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
}

/* ─── HOURS & RESERVATION — only bordered card on home ─────── */
function HoursReservation() {
  return (
    <section className="py-32 md:py-40 px-6 bg-background">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <h3 className="font-serif italic font-light text-[1.75rem] md:text-[2rem] text-ivory mb-6">
            Nous retrouver
          </h3>
          <div className="space-y-2 text-[15px] md:text-[16px] text-ivory font-light leading-loose">
            <p>4 Place Championnet, 38000 Grenoble</p>
            <p>
              <a href="tel:+33476271375" className="hover:text-gold transition-colors">
                +33 4 76 27 13 75
              </a>
            </p>
            <p className="text-ivory-muted">
              Ouvert tous les jours · 12h–14h / 19h–21h30
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=4+Place+Championnet+Grenoble"
            target="_blank"
            rel="noreferrer noopener"
            className="gold-link mt-6"
          >
            Voir sur Google Maps <ArrowRight size={14} aria-hidden="true" />
          </a>
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-surface border border-hairline rounded-3xl p-7 md:p-10 w-full"
          whileHover={{ y: -6, boxShadow: "0 24px 48px oklch(0.300 0.005 160 / 0.07)" }}
          transition={spring}
        >
          <h3 className="font-serif italic font-light text-[1.5rem] md:text-[1.75rem] text-ivory mb-3 md:mb-4">
            Réserver votre table
          </h3>
          <p className="text-ivory-muted mb-6 md:mb-7 text-[14.5px] md:text-[15px] font-light leading-relaxed">
            Sur place ou par téléphone. Confirmation immédiate.
          </p>
          <a
            href="tel:+33476271375"
            className="btn-primary w-full !py-4"
          >
            <Phone size={16} aria-hidden="true" /> Appeler le restaurant
          </a>
          <a
            href="mailto:restaurant1sur2@gmail.com"
            className="gold-link mt-5 text-[13px] break-all"
          >
            <MapPin size={12} className="shrink-0" aria-hidden="true" /><span>&nbsp;restaurant1sur2@gmail.com</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
