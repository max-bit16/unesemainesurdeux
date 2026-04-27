import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import {
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";
import { PhotoHoverCard } from "@/components/PhotoCards";

import photoSaintJacques from "@/assets/photos/photo-saint-jacques.jpg";
import photoPavlova from "@/assets/photos/photo-pavlova.jpg";
import photoSurfTurf from "@/assets/photos/photo-surf-turf.jpg";
import photoPoisson from "@/assets/photos/photo-poisson.jpg";
import photoVolaille from "@/assets/photos/photo-volaille.jpg";
import photoMenuPoulpe from "@/assets/photos/photo-menu-poulpe.jpg";
import photoLegumes from "@/assets/photos/photo-legumes.jpg";
import photoGaultMillau from "@/assets/photos/photo-gaultmillau.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie — Une Semaine Sur Deux · Photos · Restaurant Grenoble" },
      {
        name: "description",
        content:
          "Galerie photo des plats du restaurant Une Semaine Sur Deux à Grenoble. Saint-Jacques, poulpe, pavlova et plats de saison.",
      },
      { property: "og:title", content: "Galerie — Une Semaine Sur Deux" },
      {
        property: "og:description",
        content: "Photographies des plats du restaurant à Grenoble.",
      },
      { property: "og:image", content: photoSaintJacques },
      { name: "twitter:image", content: photoSaintJacques },
    ],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  return (
    <>
      <GalerieHeader />
      <MasonryGrid />
      <CtaStrip />
    </>
  );
}

function GalerieHeader() {
  return (
    <section className="pt-32 pb-16 text-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={staggerChild} className="eyebrow mb-4">
          N°01 — Dans l'assiette
        </motion.p>
        <motion.h1 variants={staggerChild} className="display-h1 mb-5">
          Un régal pour les yeux aussi.
        </motion.h1>
        <motion.p variants={staggerChild} className="text-ivory-muted text-[15px]">
          Photographies · Une Semaine Sur Deux · Grenoble
        </motion.p>
      </motion.div>
    </section>
  );
}

function MasonryGrid() {
  // 8 photos with row-spans giving a masonry feel on a 3-col grid (200px row)
  const slots: { src: string; alt: string; caption: string; spanRows: number }[] = [
    { src: photoSaintJacques, alt: "Saint-Jacques, riz noir vénéré et moules", caption: "Saint-Jacques, riz noir vénéré", spanRows: 2 },
    { src: photoPavlova, alt: "Pavlova mangue, sphères glacées", caption: "Pavlova mangue, sphères glacées", spanRows: 1 },
    { src: photoSurfTurf, alt: "Viande, homard, sauce crémée", caption: "Viande, homard, sauce crémée", spanRows: 1 },
    { src: photoPoisson, alt: "Truite, légumes frais de saison", caption: "Truite, légumes frais de saison", spanRows: 2 },
    { src: photoVolaille, alt: "Volaille fermière, champignons et sauce", caption: "Volaille, champignons, sauce", spanRows: 1 },
    { src: photoMenuPoulpe, alt: "Le menu signature et plat de poulpe", caption: "Le menu · Plat signature", spanRows: 1 },
    { src: photoLegumes, alt: "Légumes du marché et champignons", caption: "Légumes du marché, champignons", spanRows: 1 },
    { src: photoGaultMillau, alt: "Plaque Gault & Millau Table Gourmande 2026", caption: "Toque Gault & Millau 2026", spanRows: 1 },
  ];

  return (
    <section className="px-6 md:px-12 pb-24">
      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] gap-3"
      >
        {slots.map((s, i) => (
          <motion.div
            key={i}
            variants={staggerChild}
            className={s.spanRows === 2 ? "row-span-2" : ""}
          >
            <PhotoHoverCard
              src={s.src}
              alt={s.alt}
              caption={s.caption}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

function CtaStrip() {
  return (
    <section className="bg-surface py-16 text-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <motion.p variants={staggerChild} className="text-ivory text-lg mb-4">
          Retrouvez-nous sur Instagram
        </motion.p>
        <motion.a
          variants={staggerChild}
          href="https://www.instagram.com/1semainesur2restaurant/"
          target="_blank"
          rel="noreferrer noopener"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 text-gold text-base tracking-wider hover:opacity-80 transition-opacity"
        >
          <Instagram size={20} />
          @1semainesur2restaurant
        </motion.a>
      </motion.div>
    </section>
  );
}
