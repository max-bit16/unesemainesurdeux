/**
 * Registre central des images visuelles du site, par page.
 *
 * RÈGLE : la galerie ne doit JAMAIS réutiliser une image déjà affichée
 * sur /, /menu, /chef ou /reserver. Elle déclare un pool large et filtre
 * automatiquement les doublons via `galleryPool()`.
 *
 * Les images "OG" (méta sociales) sont volontairement exclues : elles ne
 * sont pas rendues visuellement sur la page, elles ne créent pas de doublon
 * perceptible.
 *
 * PERF : les vraies photos restaurant sont dans /public/photos/ (servies par CDN,
 * non bundlées). Les photos fictives menu/galerie sont sur Pexels CDN dpr=1.
 */

// Photos restaurant : chemins /public/ (pas d'import JS = pas bundlé)
const heroGrenoble      = "/photos/hero-grenoble-bulles.jpg";
const heroGrenobleWebp  = "/photos/hero-grenoble-bulles.webp";
const photoChefDressage = "/photos/photo-chef-dressage.jpg";
const photoSalle        = "/photos/photo-salle.jpg";
const photoGaultMillau  = "/photos/photo-gaultmillau.jpg";
const photoDessert      = "/photos/photo-pavlova.jpg";

export { heroGrenoble, heroGrenobleWebp, photoChefDressage, photoSalle, photoGaultMillau, photoDessert };

// ─── URLs Pexels dpr=1 (photos fictives menu / galerie) ───────────────
export const PEXELS = {
  saintJacques: "https://images.pexels.com/photos/30469688/pexels-photo-30469688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  gaultMillau:  "https://images.pexels.com/photos/3217156/pexels-photo-3217156.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=1",
  poulpe:       "https://images.pexels.com/photos/14885388/pexels-photo-14885388.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  volaille:     "https://images.pexels.com/photos/8697542/pexels-photo-8697542.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  poisson:      "https://images.pexels.com/photos/3655916/pexels-photo-3655916.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  surfTurf:     "https://images.pexels.com/photos/323682/pexels-photo-323682.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=1",
  legumes:      "https://images.pexels.com/photos/4253317/pexels-photo-4253317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  dessertBowl:  "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  marche:       "https://images.pexels.com/photos/375896/pexels-photo-375896.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  cave:         "https://images.pexels.com/photos/4254039/pexels-photo-4254039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  tartare:      "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1",
  dressageGros: "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=1",
} as const;

/**
 * Identifiant logique d'une image.
 */
export type ImageKey = string;

/** Normalise une URL Pexels en retirant les query params (mêmes IDs = doublon). */
function normalize(src: ImageKey): string {
  if (src.startsWith("http")) {
    try {
      const u = new URL(src);
      return `${u.origin}${u.pathname}`;
    } catch {
      return src;
    }
  }
  return src;
}

/** Images affichées (visibles à l'écran) sur chaque page hors /galerie. */
export const PAGE_IMAGES: Record<"home" | "menu" | "chef" | "reserver", ImageKey[]> = {
  home: [
    heroGrenoble,
    PEXELS.poulpe,
    PEXELS.volaille,
    PEXELS.poisson,
    PEXELS.surfTurf,
  ],
  menu: [
    PEXELS.legumes,
    PEXELS.dessertBowl,
  ],
  chef: [
    photoChefDressage,
  ],
  reserver: [
    photoSalle,
  ],
};

/** Toutes les images "réservées" hors-galerie. */
export function reservedImages(): Set<string> {
  const all = [
    ...PAGE_IMAGES.home,
    ...PAGE_IMAGES.menu,
    ...PAGE_IMAGES.chef,
    ...PAGE_IMAGES.reserver,
  ];
  return new Set(all.map(normalize));
}

export type GallerySlot = {
  src: ImageKey;
  srcWebp?: string;
  alt: string;
  caption: string;
  aspect: string;
  position: string;
};

/**
 * Filtre un pool de slots de galerie pour n'en garder que ceux qui
 * n'apparaissent pas déjà ailleurs sur le site.
 */
export function galleryPool(slots: GallerySlot[]): GallerySlot[] {
  const reserved = reservedImages();
  const kept: GallerySlot[] = [];
  const dropped: string[] = [];
  for (const s of slots) {
    if (reserved.has(normalize(s.src))) {
      dropped.push(s.caption);
    } else {
      kept.push(s);
    }
  }
  if (import.meta.env.DEV && dropped.length > 0) {
    console.warn(
      `[gallery] ${dropped.length} slot(s) retiré(s) car déjà utilisés ailleurs sur le site :`,
      dropped,
    );
  }
  return kept;
}

/**
 * Pool propre à la galerie.
 */
export const GALLERY_ONLY = {
  saintJacques: PEXELS.saintJacques,
  gaultMillau:  photoGaultMillau,
  tartare:      PEXELS.tartare,
  cave:         PEXELS.cave,
  dressageGros: PEXELS.dressageGros,
  marche:       PEXELS.marche,
  salle:        photoSalle,
  chefDressage: photoChefDressage,
} as const;
