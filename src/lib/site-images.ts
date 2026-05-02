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
 */

import heroGrenoble from "@/assets/photos/hero-grenoble-bulles.jpg";
import photoChefDressage from "@/assets/photos/photo-chef-dressage.jpg";
import photoSalle from "@/assets/photos/photo-salle.jpg";
import photoMenuPoulpe from "@/assets/photos/photo-menu-poulpe.jpg";
import photoVolaille from "@/assets/photos/photo-volaille.jpg";
import photoPoisson from "@/assets/photos/photo-poisson.jpg";
import photoSurfTurf from "@/assets/photos/photo-surf-turf.jpg";
import photoSaintJacques from "@/assets/photos/photo-saint-jacques.jpg";
import photoLegumes from "@/assets/photos/photo-legumes.jpg";


// ─── URLs Pexels partagées ──────────────────────────────────────────
export const PEXELS = {
  saintJacques: photoSaintJacques,
  gaultMillau:  "https://images.pexels.com/photos/3217156/pexels-photo-3217156.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=1",
  poulpe:        photoMenuPoulpe,
  volaille:      photoVolaille,
  poisson:       photoPoisson,
  surfTurf:      photoSurfTurf,
  legumes:       photoLegumes,
  dessertBowl:   "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1",
  marche:        "https://images.pexels.com/photos/375896/pexels-photo-375896.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=1",
  cave:          photoSalle,
  tartare:       "https://images.pexels.com/photos/8969237/pexels-photo-8969237.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&dpr=1",
  dressageGros:  "https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=900&h=900&dpr=1",
} as const;

const photoGaultMillau = PEXELS.gaultMillau;

/**
 * Identifiant logique d'une image (la valeur Vite-importée OU l'URL Pexels).
 * Utiliser cette clé pour déduplication. Pour les imports locaux, Vite renvoie
 * un chemin haché stable comparable par égalité stricte.
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
 * n'apparaissent pas déjà ailleurs sur le site. Garantit la règle
 * "pas de doublon inter-pages" automatiquement à la compilation/render.
 *
 * En dev, log un avertissement si un slot a été retiré.
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
 * Pool propre à la galerie. Les clés `salle` et `chefDressage` sont
 * volontairement présentes pour rappeler ces visuels existent — mais elles
 * seront automatiquement filtrées par `galleryPool()` puisqu'elles
 * apparaissent déjà sur /reserver et /chef.
 */
export const GALLERY_ONLY = {
  saintJacques: photoSaintJacques,
  gaultMillau: photoGaultMillau,
  tartare: PEXELS.tartare,
  cave: PEXELS.cave,
  dressageGros: PEXELS.dressageGros,
  marche: PEXELS.marche,
  // Filtrés automatiquement (doublons /chef et /reserver) :
  salle: photoSalle,
  chefDressage: photoChefDressage,
} as const;
