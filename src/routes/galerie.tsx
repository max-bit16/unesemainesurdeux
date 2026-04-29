import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/motion";

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
      { title: "Galerie Une Semaine Sur Deux · Photos · Restaurant Grenoble" },
      {
        name: "description",
        content:
          "Galerie photo des plats du restaurant Une Semaine Sur Deux à Grenoble. Saint-Jacques, poulpe, pavlova et plats de saison.",
      },
      { property: "og:title", content: "Galerie Une Semaine Sur Deux" },
      {
        property: "og:description",
        content: "Photographies des plats du restaurant à Grenoble.",
      },
    ],
  }),
  component: GaleriePage,
});

function GaleriePage() {
  return (
    <>
      <Header />
      <Masonry />
      <CtaStrip />
    </>
  );
}

function Header() {
  return (
    <section className="pt-36 pb-16 text-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={staggerChild} className="eyebrow mb-4">
          N°01 Dans l'assiette
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

const SLOTS = [
  { src: photoSaintJacques, alt: "Saint-Jacques, riz noir vénéré et moules", caption: "Saint-Jacques, riz vénéré", aspect: "aspect-[4/5]" },
  { src: photoPavlova, alt: "Pavlova mangue, sphères glacées", caption: "Pavlova mangue", aspect: "aspect-square" },
  { src: photoSurfTurf, alt: "Viande, homard, sauce crémée", caption: "Surf & turf", aspect: "aspect-square" },
  { src: photoPoisson, alt: "Truite, légumes frais de saison", caption: "Truite & légumes", aspect: "aspect-[4/5]" },
  { src: photoVolaille, alt: "Volaille fermière, champignons", caption: "Volaille & champignons", aspect: "aspect-square" },
  { src: photoMenuPoulpe, alt: "Menu signature et plat de poulpe", caption: "Menu · Poulpe", aspect: "aspect-[4/5]" },
  { src: photoLegumes, alt: "Légumes du marché et champignons", caption: "Légumes du marché", aspect: "aspect-square" },
  { src: photoGaultMillau, alt: "Plaque Gault & Millau 2026", caption: "Toque Gault & Millau 2026", aspect: "aspect-square" },
];

function Masonry() {
  return (
    <section className="px-3 md:px-6 pb-24">
      <motion.div
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-[1400px] mx-auto"
        style={{
          columnCount: 1,
          columnGap: "12px",
        }}
      >
        <style>{`
          @media (min-width: 640px) { .gallery-cols { column-count: 2 !important; } }
          @media (min-width: 1024px) { .gallery-cols { column-count: 3 !important; } }
        `}</style>
        <div className="gallery-cols" style={{ columnGap: "12px" }}>
          {SLOTS.map((s, i) => (
            <motion.div
              key={i}
              variants={staggerChild}
              className="mb-3"
              style={{ breakInside: "avoid" }}
            >
              <div
                className={`relative overflow-hidden group cursor-default ${s.aspect}`}
              >
                <motion.img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-[oklch(0.985_0.003_90/0.78)] flex items-end"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-ivory text-[11px] uppercase tracking-[0.18em] font-light pl-4 pb-4">
                    {s.caption}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CtaStrip() {
  return (
    <section className="py-16 text-center px-6">
      <p className="text-ivory-muted text-[14px] font-light mb-3">
        Retrouvez-nous sur Instagram
      </p>
      <a
        href="https://www.instagram.com/1semainesur2restaurant/"
        target="_blank"
        rel="noreferrer noopener"
        className="gold-link"
      >
        @1semainesur2restaurant <ExternalLink size={14} />
      </a>
    </section>
  );
}
