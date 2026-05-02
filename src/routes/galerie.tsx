import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { staggerContainer, staggerChild, viewportOnce } from "@/lib/motion";

// Pool large déclaré ici. La règle "pas de doublon avec /, /menu, /chef, /reserver"
// est appliquée automatiquement par galleryPool() qui filtre les slots déjà utilisés
// ailleurs (registre central : src/lib/site-images.ts).
import { galleryPool, GALLERY_ONLY, type GallerySlot } from "@/lib/site-images";
import { PEXELS } from "@/lib/site-images";

const photoGaultMillau     = "/photos/photo-gaultmillau.jpg";
const photoGaultMillauWebp = "/photos/photo-gaultmillau.webp";
const photoSaintJacques    = PEXELS.saintJacques;
const photoSaintJacquesWebp = PEXELS.saintJacques;

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
      { property: "og:image", content: `${SITE_URL}/og-galerie.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-galerie.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/galerie` }],
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
    <section className="pt-40 pb-20 text-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
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

// Pool large : on déclare TOUS les visuels candidats. galleryPool() retire
// automatiquement ceux qui sont déjà affichés sur les autres pages
// (chef-dressage et salle p.ex. seront retirés ici à la compile).
const POOL: GallerySlot[] = [
  { src: photoSaintJacques, srcWebp: photoSaintJacquesWebp, alt: "Saint-Jacques, riz noir vénéré et moules", caption: "Saint-Jacques, riz vénéré", aspect: "aspect-[4/5]", position: "object-bottom" },
  { src: GALLERY_ONLY.chefDressage, alt: "Le chef dressant une assiette à la pince", caption: "Dressage", aspect: "aspect-[4/5]", position: "object-center" },
  { src: GALLERY_ONLY.tartare, alt: "Tartare de poisson, dressage soigné", caption: "Tartare & fraîcheur", aspect: "aspect-[4/5]", position: "object-center" },
  { src: GALLERY_ONLY.salle, alt: "Salle du restaurant, table dressée", caption: "Ambiance & salle", aspect: "aspect-[4/3]", position: "object-center" },
  { src: GALLERY_ONLY.marche, alt: "Marché, produits frais de saison", caption: "Marché & saison", aspect: "aspect-[4/3]", position: "object-center" },
  { src: GALLERY_ONLY.cave, alt: "Cave & sélection viticole — Une Semaine Sur Deux", caption: "Cave & vins", aspect: "aspect-[4/5]", position: "object-center" },
  { src: photoGaultMillau, srcWebp: photoGaultMillauWebp, alt: "Plat dressé à l'assiette, distinction Gault & Millau 2026", caption: "Toque Gault & Millau 2026", aspect: "aspect-square", position: "object-center" },
];

// Filtre runtime : la galerie ne montre QUE les visuels qui lui sont propres.
const SLOTS = galleryPool(POOL);

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
                {s.srcWebp ? (
                  <picture>
                    <source srcSet={s.srcWebp} type="image/webp" />
                    <motion.img
                      src={s.src}
                      alt={s.alt}
                      loading={s === SLOTS[0] ? "eager" : "lazy"}
                      fetchPriority={s === SLOTS[0] ? "high" : undefined}
                      decoding={s === SLOTS[0] ? "sync" : "async"}
                      width={1324}
                      height={1324}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.99 }}
                      transition={{ type: "spring", stiffness: 280, damping: 26 }}
                      className={`w-full h-full object-cover ${s.position}`}
                    />
                  </picture>
                ) : (
                  <motion.img
                    src={s.src}
                    alt={s.alt}
                    loading="lazy"
                    decoding="async"
                    width={1324}
                    height={1324}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 280, damping: 26 }}
                    className={`w-full h-full object-cover ${s.position}`}
                  />
                )}
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
    <section className="py-20 text-center px-6">
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
