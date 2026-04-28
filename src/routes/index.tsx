import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Wine,
  Users,
  ChefHat,
  Phone,
  MapPin,
  Award,
} from "lucide-react";
import { useRef } from "react";
import {
  fadeUp,
  scaleUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";

import photoMenuPoulpe from "@/assets/photos/photo-menu-poulpe.jpg";
import photoVolaille from "@/assets/photos/photo-volaille.jpg";
import photoPoisson from "@/assets/photos/photo-poisson.jpg";
import photoSurfTurf from "@/assets/photos/photo-surf-turf.jpg";
import photoGaultMillau from "@/assets/photos/photo-gaultmillau.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Restaurant Une Semaine Sur Deux à Grenoble — Cuisine Bistronomique · Gault & Millau 2026",
      },
      {
        name: "description",
        content:
          "Restaurant bistronomique à Grenoble. Produits frais, circuit court, fait maison. Toque Gault & Millau 2026. Chef Pierrick Vasseur. ☎ 04 76 27 13 75",
      },
      {
        property: "og:title",
        content:
          "Une Semaine Sur Deux — Restaurant gastronomique à Grenoble",
      },
      {
        property: "og:description",
        content:
          "Cuisine bistronomique, produits frais, circuit court. Toque Gault & Millau 2026.",
      },
      { property: "og:image", content: photoMenuPoulpe },
      { name: "twitter:image", content: photoMenuPoulpe },
    ],
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
      <SocialProof />
      <HoursReservation />
    </>
  );
}

/* ─── HERO — typographic, no photo ─────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 bg-background overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-3xl text-center"
      >
        <motion.div
          variants={staggerChild}
          className="gold-divider mx-auto mb-8"
        />
        <motion.p variants={staggerChild} className="eyebrow mb-8">
          N°01 — Gastronomie Grenobloise
        </motion.p>
        <motion.h1
          variants={staggerChild}
          className="display-h1 mb-8"
        >
          Cuisine vivante,
          <br />
          saisons intactes.
        </motion.h1>
        <motion.p
          variants={staggerChild}
          className="text-[16px] text-ivory-muted mb-12"
        >
          Restaurant · Grenoble · Gault &amp; Millau 2026
        </motion.p>
        <motion.div
          variants={staggerChild}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="tel:+33476271375" className="btn-primary">
            Réserver une table
          </a>
          <Link to="/menu" className="btn-ghost-gold">
            Voir la carte
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory-muted"
        aria-hidden
      >
        <ChevronDown size={18} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}

/* ─── AWARD — pure text on canvas ──────────────────────────── */
function AwardSection() {
  return (
    <section className="py-24 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.p variants={staggerChild} className="eyebrow mb-6">
          N°02 — Distinction
        </motion.p>
        <motion.div variants={staggerChild} className="flex justify-center mb-6">
          <img
            src={photoGaultMillau}
            alt="Plaque Gault & Millau Table Gourmande 2026"
            loading="lazy"
            className="h-20 object-contain"
          />
        </motion.div>
        <motion.div variants={staggerChild} className="gold-divider mx-auto mb-6" />
        <motion.h2 variants={staggerChild} className="display-h2 mb-4">
          Table Gourmande
        </motion.h2>
        <motion.p variants={staggerChild} className="text-[15px] text-ivory-muted">
          Attribuée au Chef Pierrick Vasseur · Gault &amp; Millau 2026
        </motion.p>
      </motion.div>
      <div className="hairline max-w-5xl mx-auto mt-24" />
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
      className="relative h-[65vh] min-h-[480px] w-full overflow-hidden"
    >
      <motion.img
        src={photoMenuPoulpe}
        alt="Le plat signature — poulpe à la crème d'ail noir"
        loading="lazy"
        style={{ y, objectPosition: "center 40%" }}
        className="absolute inset-0 w-full h-[115%] object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.985 0.003 90 / 0.25) 0%, oklch(0.985 0.003 90 / 0.88) 100%)",
        }}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 h-full flex flex-col justify-end max-w-2xl px-8 md:px-14 pb-14"
      >
        <motion.p variants={staggerChild} className="eyebrow text-gold mb-5">
          N°03 — Plat Signature
        </motion.p>
        <motion.h2 variants={staggerChild} className="display-h2 mb-6">
          Le Poulpe à la crème d'ail noir,
          <br />
          risotto de riz vénéré.
        </motion.h2>
        <motion.p
          variants={staggerChild}
          className="text-[16px] text-ivory-muted max-w-lg mb-7"
        >
          Le plat qui revient dans tous les avis. Cuisson parfaite, produits de
          saison, fait maison.
        </motion.p>
        <motion.div variants={staggerChild}>
          <Link to="/menu" className="gold-link">
            Voir la carte complète <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
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
    <section className="py-32 md:py-40 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-4xl mx-auto"
      >
        <motion.p variants={staggerChild} className="eyebrow mb-16 text-center">
          N°04 — L'Esprit du Lieu
        </motion.p>

        <div>
          {rows.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              variants={staggerChild}
              className={`grid grid-cols-1 md:grid-cols-[40%_60%] gap-6 md:gap-10 py-8 ${
                i === 0 ? "border-t border-hairline" : ""
              } border-b border-hairline`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <p className="font-serif italic text-[1.375rem] text-ivory font-light">
                  {label}
                </p>
              </div>
              <p className="text-[16px] text-ivory-muted font-light leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="text-center pt-20 max-w-2xl mx-auto"
        >
          <p className="pull-quote text-[1.5rem]">
            "On se régale du début à la fin."
          </p>
          <p className="text-[13px] text-ivory-muted mt-4">
            — E. Bagdassarian ★★★★★
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── PHOTO STRIP — 3 columns, no gap, contained height ────── */
function PhotoStrip() {
  const items = [
    { src: photoVolaille, alt: "Volaille fermière, sauce crémée", caption: "Viandes & volailles" },
    { src: photoPoisson, alt: "Truite et légumes frais de saison", caption: "Poissons & saison" },
    { src: photoSurfTurf, alt: "Surf & turf — viande et homard", caption: "Plats du moment" },
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
          className="relative h-[240px] md:h-[340px] overflow-hidden group"
          whileHover="hovered"
          initial="initial"
        >
          <motion.img
            src={item.src}
            alt={item.alt}
            loading="lazy"
            variants={{
              initial: { scale: 1 },
              hovered: { scale: 1.03, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
            }}
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

/* ─── SOCIAL PROOF — no card, hairlines top/bottom ─────────── */
function SocialProof() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="hairline mb-16" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x divide-hairline"
        >
          <motion.div variants={staggerChild} className="text-center px-4">
            <span className="stat-num">
              <AnimatedCounter target={96} suffix="%" />
            </span>
            <p className="eyebrow mt-5">recommandent ce restaurant</p>
          </motion.div>
          <motion.div variants={staggerChild} className="text-center px-4">
            <span className="stat-num">
              <AnimatedCounter target={204} />
            </span>
            <p className="eyebrow mt-5">avis facebook</p>
          </motion.div>
          <motion.div variants={staggerChild} className="text-center px-4 flex flex-col items-center">
            <Award size={32} className="text-green mb-4" strokeWidth={1.5} />
            <p className="display-h3">Table Gourmande</p>
            <p className="eyebrow mt-3">Gault &amp; Millau 2026</p>
          </motion.div>
        </motion.div>
        <div className="hairline mt-16" />
      </div>
    </section>
  );
}

/* ─── HOURS & RESERVATION — only bordered card on home ─────── */
function HoursReservation() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow mb-5">N°05 — Informations</p>
          <h3 className="font-serif italic font-light text-[2rem] text-ivory mb-6">
            Nous retrouver
          </h3>
          <div className="space-y-2 text-[16px] text-ivory font-light leading-loose">
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
            Voir sur Google Maps <ArrowRight size={14} />
          </a>
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-surface border border-hairline rounded-3xl p-10"
          style={{ borderColor: "oklch(0.703 0.106 65 / 0.3)" }}
        >
          <h3 className="font-serif italic font-light text-[1.75rem] text-ivory mb-4">
            Réserver votre table
          </h3>
          <p className="text-ivory-muted mb-7 text-[15px] font-light leading-relaxed">
            Sur place ou par téléphone. Confirmation immédiate.
          </p>
          <a
            href="tel:+33476271375"
            className="btn-primary w-full !py-3.5"
          >
            <Phone size={16} /> Appeler le restaurant
          </a>
          <a
            href="mailto:restaurant1sur2@gmail.com"
            className="gold-link mt-5 text-[13px]"
          >
            <MapPin size={12} /> restaurant1sur2@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}
