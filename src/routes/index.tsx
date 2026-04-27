import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Star,
  ArrowRight,
  MapPin,
  Wine,
  Users,
  Phone,
  Clock,
} from "lucide-react";
import { useRef } from "react";
import {
  fadeUp,
  fadeIn,
  scaleUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { PhotoStripCol } from "@/components/PhotoCards";
import { SignatureFlourish } from "@/components/SvgFlourishes";

import photoSaintJacques from "@/assets/photos/photo-saint-jacques.jpg";
import photoMenuPoulpe from "@/assets/photos/photo-menu-poulpe.jpg";
import photoPavlova from "@/assets/photos/photo-pavlova.jpg";
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
        content: "Une Semaine Sur Deux — Restaurant gastronomique à Grenoble",
      },
      {
        property: "og:description",
        content:
          "Cuisine bistronomique, produits frais, circuit court. Toque Gault & Millau 2026.",
      },
      { property: "og:image", content: photoSaintJacques },
      { name: "twitter:image", content: photoSaintJacques },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <GaultMillauBanner />
      <SignatureDish />
      <BentoGrid />
      <PhotoStrip />
      <SocialProof />
      <HoursReservation />
    </>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -80]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col md:flex-row overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 50%, oklch(0.243 0.008 70 / 0.5), oklch(0.183 0.006 60) 70%)",
      }}
    >
      {/* Left: typography */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full md:w-[55%] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 md:pt-0 pb-16 md:pb-0 order-2 md:order-1"
      >
        <motion.p variants={staggerChild} className="eyebrow mb-6">
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
          className="text-[17px] text-ivory-muted max-w-md mb-10 leading-relaxed"
        >
          Restaurant gastronomique · Grenoble · Toque Gault &amp; Millau 2026
        </motion.p>

        <motion.div
          variants={staggerChild}
          className="flex flex-wrap items-center gap-4 mb-10"
        >
          <motion.a
            href="tel:+33476271375"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="btn-primary"
          >
            Réserver une table
          </motion.a>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/menu" className="btn-ghost-gold">
              Voir la carte
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerChild}
          transition={{ delay: 0.6 }}
          className="gold-divider"
        />

        <motion.div variants={staggerChild} className="mt-10">
          <SignatureFlourish />
        </motion.div>
      </motion.div>

      {/* Right: photo with parallax */}
      <div className="relative w-full md:w-[45%] h-[55vh] md:h-auto md:min-h-screen overflow-hidden order-1 md:order-2">
        <motion.img
          src={photoSaintJacques}
          alt="Saint-Jacques, riz noir vénéré et moules — plat signature"
          loading="eager"
          style={{ y }}
          className="w-full h-[110%] object-cover absolute inset-0"
        />
        {/* Left gradient blend */}
        <div
          className="absolute inset-y-0 left-0 w-[30%] pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, oklch(0.183 0.006 60), transparent)",
          }}
        />
      </div>
    </section>
  );
}

/* ─── GAULT & MILLAU BANNER ─────────────────────────────────── */
function GaultMillauBanner() {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="bg-surface py-14"
    >
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        <div className="flex justify-center md:justify-start">
          <img
            src={photoGaultMillau}
            alt="Plaque Gault & Millau Table Gourmande 2026"
            loading="lazy"
            className="rounded-xl max-h-32 object-contain"
          />
        </div>

        <div className="text-center">
          <p className="eyebrow text-gold mb-3">Distinction · 2026</p>
          <p className="display-h2 text-[2.5rem] mb-3">Table Gourmande</p>
          <p className="text-[15px] text-ivory-muted max-w-md mx-auto">
            Attribuée au Chef Pierrick Vasseur pour la qualité de sa cuisine
            bistronomique à Grenoble.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4">
          <Award size={40} className="text-gold" strokeWidth={1.5} />
          <Star size={28} className="text-gold" strokeWidth={1.5} fill="currentColor" />
        </div>
      </div>
    </motion.section>
  );
}

/* ─── SIGNATURE DISH (full-bleed cinematic) ─────────────────── */
function SignatureDish() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[500px] w-full overflow-hidden"
    >
      <motion.img
        src={photoMenuPoulpe}
        alt="Le plat signature — poulpe à la crème d'ail noir"
        loading="lazy"
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-[oklch(0.115_0.005_60/0.65)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-3xl mx-auto"
      >
        <motion.p variants={staggerChild} className="eyebrow text-gold mb-5">
          N°02 — Plat Signature
        </motion.p>
        <motion.h2 variants={staggerChild} className="display-h2 text-white mb-6">
          Le Poulpe à la crème d'ail noir,
          <br />
          risotto de riz vénéré.
        </motion.h2>
        <motion.p variants={staggerChild} className="text-[17px] text-ivory-muted mb-7 max-w-xl">
          Le plat qui revient dans tous les avis. Cuisson parfaite, produits de
          saison, fait maison.
        </motion.p>
        <motion.div variants={staggerChild}>
          <Link to="/menu" className="gold-link text-base">
            Voir la carte complète <ArrowRight size={16} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── BENTO GRID — L'ESPRIT DU LIEU ─────────────────────────── */
function BentoGrid() {
  return (
    <section className="bg-surface-alt py-28">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <motion.p variants={staggerChild} className="eyebrow mb-4 text-center">
            N°03 — L'Esprit du Lieu
          </motion.p>
          <motion.h2 variants={staggerChild} className="display-h2 text-center mb-16">
            Bistronomie sincère
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[260px]">
            {/* Card A — large photo (2 cols) */}
            <motion.div
              variants={staggerChild}
              className="md:col-span-2 relative overflow-hidden rounded-2xl group cursor-default"
              whileHover="hover"
            >
              <motion.img
                src={photoPavlova}
                alt="Pavlova mangue — desserts maison"
                loading="lazy"
                variants={{ hover: { scale: 1.05 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.115_0.005_60/0.85)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 max-w-md">
                <p className="eyebrow text-gold mb-2">Desserts</p>
                <h3 className="display-h3 italic mb-2">Bistronomie</h3>
                <p className="text-ivory-muted text-sm leading-relaxed">
                  Une carte courte, renouvelée au fil des saisons.
                </p>
              </div>
            </motion.div>

            {/* Card B */}
            <BentoCard
              icon={<MapPin size={24} className="text-gold" strokeWidth={1.5} />}
              title="Produits locaux"
              body="Produits frais, circuit court, de saison."
            />

            {/* Card C */}
            <BentoCard
              icon={<Wine size={24} className="text-gold" strokeWidth={1.5} />}
              title="Cave personnelle"
              body="Sélection viticole du chef à prix justes."
            />

            {/* Card D */}
            <BentoCard
              icon={<Users size={24} className="text-gold" strokeWidth={1.5} />}
              title="Privatisation"
              body="Le restaurant peut accueillir vos événements privés."
            />

            {/* Card E — testimonial green */}
            <motion.div
              variants={staggerChild}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-green rounded-2xl p-8 flex flex-col justify-between"
            >
              <p className="pull-quote text-[1.3rem]">
                "On se régale du début à la fin. Le poulpe était incroyable."
              </p>
              <p className="text-[13px] text-ivory-muted mt-4">
                — E. Bagdassarian ★★★★★
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      variants={staggerChild}
      whileHover={{ y: -4, borderColor: "oklch(0.703 0.106 65)" }}
      transition={{ duration: 0.3 }}
      className="bg-surface border border-border rounded-2xl p-8 flex flex-col justify-between"
    >
      <div>{icon}</div>
      <div>
        <h3 className="display-h3 mb-2">{title}</h3>
        <p className="text-ivory-muted text-sm leading-relaxed">{body}</p>
      </div>
    </motion.div>
  );
}

/* ─── PHOTO STRIP ───────────────────────────────────────────── */
function PhotoStrip() {
  const items = [
    { src: photoVolaille, alt: "Volaille fermière, sauce crémée", caption: "Viandes & volailles" },
    { src: photoPoisson, alt: "Truite et légumes frais de saison", caption: "Poissons & fruits de mer" },
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
      {items.map((item, i) => (
        <PhotoStripCol
          key={item.caption}
          src={item.src}
          alt={item.alt}
          caption={item.caption}
          index={i}
        />
      ))}
    </motion.section>
  );
}

/* ─── SOCIAL PROOF ──────────────────────────────────────────── */
function SocialProof() {
  return (
    <section className="bg-surface py-16">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          <Stat>
            <span className="font-serif italic text-gold text-[4.5rem] leading-none">
              <AnimatedCounter target={96} suffix="%" />
            </span>
            <p className="eyebrow mt-3">Recommandent ce restaurant</p>
          </Stat>
          <Stat>
            <span className="font-serif italic text-gold text-[4.5rem] leading-none">
              <AnimatedCounter target={204} />
            </span>
            <p className="eyebrow mt-3">Avis Facebook</p>
          </Stat>
          <Stat>
            <Award size={36} className="text-green" strokeWidth={1.5} />
            <p className="eyebrow mt-3 max-w-[200px]">
              Table Gourmande · Gault &amp; Millau 2026
            </p>
          </Stat>
        </div>
      </div>
    </section>
  );
}

function Stat({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8">
      {children}
    </div>
  );
}

/* ─── HOURS & RESERVATION ──────────────────────────────────── */
function HoursReservation() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow mb-3">N°04 — Informations</p>
          <h2 className="display-h2 mb-8">Nous retrouver</h2>

          <div className="space-y-5 text-[15px]">
            <div className="flex items-start gap-4">
              <Clock size={20} className="text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="text-ivory">Tous les jours</p>
                <p className="text-ivory-muted">12h – 14h · 19h – 21h30</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={20} className="text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <a
                href="https://maps.google.com/?q=4+Place+Championnet+Grenoble"
                target="_blank"
                rel="noreferrer noopener"
                className="text-ivory hover:text-gold transition-colors"
              >
                4 Place Championnet, Grenoble
              </a>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={20} className="text-gold mt-1 shrink-0" strokeWidth={1.5} />
              <a
                href="tel:+33476271375"
                className="text-ivory hover:text-gold transition-colors"
              >
                +33 4 76 27 13 75
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-surface border border-green rounded-xl p-10"
        >
          <p className="eyebrow text-gold mb-3">Réservation</p>
          <h3 className="display-h3 mb-4 text-[2rem] italic font-normal font-serif">
            Réserver votre table
          </h3>
          <p className="text-ivory-muted mb-8 text-[15px]">
            Sur place ou par téléphone. Confirmation immédiate.
          </p>
          <motion.a
            href="tel:+33476271375"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full !py-3.5"
          >
            <Phone size={16} /> Appeler le restaurant
          </motion.a>
          <a
            href="https://maps.google.com/?q=4+Place+Championnet+Grenoble"
            target="_blank"
            rel="noreferrer noopener"
            className="gold-link mt-6"
          >
            Voir sur Google Maps <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
