import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/motion";

// Photos — mix d'originales restaurant + Pexels libre de droits + génération IA pour combler.
import photoSaintJacques from "@/assets/photos/photo-saint-jacques.jpg";
import photoSalle from "@/assets/photos/photo-salle.jpg";
import photoChefDressage from "@/assets/photos/photo-chef-dressage.jpg";
// Visuels uniques à la galerie (pas réutilisés ailleurs sur le site)
const photoTartare = "https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1";
const photoCave = "https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1";
const photoDressageGrosPlan = "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=1";
const photoMarche = "https://images.pexels.com/photos/375896/pexels-photo-375896.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1";
import photoGaultMillau from "@/assets/photos/photo-gaultmillau.jpg";
import ogGalerie from "@/assets/photos/og-galerie.jpg";

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
      { property: "og:image", content: ogGalerie },
      { name: "twitter:image", content: ogGalerie },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
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
  { src: photoSaintJacques, alt: "Saint-Jacques, riz noir vénéré et moules", caption: "Saint-Jacques, riz vénéré", aspect: "aspect-[4/5]", position: "object-bottom" },
  { src: photoChefDressage, alt: "Le chef dressant une assiette à la pince", caption: "Dressage", aspect: "aspect-[4/5]", position: "object-center" },
  { src: photoTartare, alt: "Tartare de poisson, dressage soigné", caption: "Tartare & fraîcheur", aspect: "aspect-[4/5]", position: "object-center" },
  { src: photoSalle, alt: "Salle du restaurant, table dressée", caption: "Ambiance & salle", aspect: "aspect-[4/3]", position: "object-center" },
  { src: photoDressageGrosPlan, alt: "Gros plan d'une assiette finale, sauce dressée", caption: "Détail dressage", aspect: "aspect-square", position: "object-center" },
  { src: photoMarche, alt: "Marché, produits frais de saison", caption: "Marché & saison", aspect: "aspect-[4/3]", position: "object-center" },
  { src: photoCave, alt: "Cave personnelle, sélection viticole du chef", caption: "Cave & vins", aspect: "aspect-[4/5]", position: "object-center" },
  { src: photoGaultMillau, alt: "Plat dressé à l'assiette, distinction Gault & Millau 2026", caption: "Toque Gault & Millau 2026", aspect: "aspect-square", position: "object-center" },
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
                  className={`w-full h-full object-cover ${s.position}`}
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
