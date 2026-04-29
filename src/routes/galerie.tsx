import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/motion";

// Photos temporaires — Pexels CDN (libre de droits). À remplacer par photos originales du restaurant.
import photoSaintJacques from "@/assets/photos/photo-saint-jacques.jpg";
const photoPavlova = "https://images.pexels.com/photos/3740177/pexels-photo-3740177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const photoSurfTurf = "https://images.pexels.com/photos/4553378/pexels-photo-4553378.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1";
const photoPoisson = "https://images.pexels.com/photos/20802561/pexels-photo-20802561.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1";
const photoVolaille = "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1";
const photoMenuPoulpe = "https://images.pexels.com/photos/14885388/pexels-photo-14885388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const photoLegumes = "https://images.pexels.com/photos/32615777/pexels-photo-32615777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
import photoGaultMillau from "@/assets/photos/photo-gaultmillau.jpg";

export const Route = createFileRoute("/galerie")({
  head: () => ({
    meta: [
      { title: "Galerie Restaurant Une Semaine Sur Deux · Grenoble" },
      {
        name: "description",
        content:
          "Photos des plats et de l'ambiance du restaurant Une Semaine Sur Deux à Grenoble. Cuisine bistronomique, dressage soigné, produits frais.",
      },
      { property: "og:title", content: "Galerie Restaurant Une Semaine Sur Deux Grenoble" },
      {
        property: "og:description",
        content: "Photos des plats et de l'ambiance du restaurant à Grenoble.",
      },
      { property: "og:image", content: photoSaintJacques },
      { name: "twitter:image", content: photoSaintJacques },
    ],
    links: [{ rel: "canonical", href: "https://restaurant1sur2.fr/galerie" }],
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
        @1semainesur2restaurant <ExternalLink size={14} aria-hidden="true" />
      </a>
    </section>
  );
}
