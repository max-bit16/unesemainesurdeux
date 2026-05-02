import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Utensils, ChefHat, Users } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
  spring,
} from "@/lib/motion";

import photoDessert from "@/assets/photos/photo-pavlova.jpg";
import photoDessertWebp from "@/assets/photos/photo-pavlova.webp";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Carte du restaurant Une Semaine Sur Deux Grenoble · Bistronomie de saison" },
      {
        name: "description",
        content:
          "Découvrez la carte du restaurant Une Semaine Sur Deux à Grenoble. Entrées, plats, desserts faits maison. Poulpe signature, truite, mousse au chocolat Valrhona.",
      },
      { property: "og:title", content: "Carte du restaurant Une Semaine Sur Deux Grenoble" },
      {
        property: "og:description",
        content:
          "Entrées, plats, desserts faits maison. Bistronomie de saison à Grenoble.",
      },
      { property: "og:image", content: `${SITE_URL}/og-home.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-home.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/menu` }],
  }),
  component: MenuPage,
});

const ENTREES = [
  "Foie gras mi-cuit au bœuf séché, chutney de coing",
  "Gravlax de saumon Bömlo",
  "Tartare de thon",
  "Œuf poché à la crème d'olives noires, risotto noir",
];
const PLATS: { name: string; signature?: boolean }[] = [
  {
    name: "Poulpe à la crème d'ail noir, risotto de riz vénéré",
    signature: true,
  },
  { name: "Souris d'agneau fondante" },
  { name: "Truite, légumes frais de saison" },
  { name: "Suprême de pintade fermière, crème de chorizo" },
  { name: "Porc ibérique, réduction romarin, purée façon Robuchon" },
];
const DESSERTS = [
  "Mousse au chocolat Valrhona",
  "Crème brûlée au limoncello",
  "Pavlova mangue, sphères glacées",
  "Palet breton",
];

function MenuPage() {
  return (
    <>
      <MenuHeader />
      <MenuBody />
      <PhotoBreak />
      <Prices />
    </>
  );
}

function MenuHeader() {
  return (
    <section className="relative h-[55vh] md:h-[45vh] min-h-[420px] md:min-h-[380px] overflow-hidden flex items-center justify-center pt-[60px] md:pt-0">
      <img
          src="https://images.pexels.com/photos/4253317/pexels-photo-4253317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Salle et ambiance — restaurant Une Semaine Sur Deux Grenoble"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          width={1324}
          height={1324}
          style={{ objectPosition: "center 30%" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.003_90/0.82)] via-[oklch(0.985_0.003_90/0.90)] to-[oklch(0.985_0.003_90/0.98)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.985 0.003 90 / 0.55) 0%, oklch(0.985 0.003 90 / 0) 70%)",
        }}
        aria-hidden
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.h1 variants={staggerChild} className="display-h1 mb-5 md:mb-6">
          Une carte courte,
          <br />
          qui dit l'essentiel.
        </motion.h1>
        <motion.p variants={staggerChild} className="text-ivory-muted text-[14px] md:text-[16px] max-w-xl mx-auto">
          Renouvelée au fil des saisons. Tout est fait maison.
        </motion.p>
      </motion.div>
    </section>
  );
}

function MenuBody() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <MenuSection title="Entrées" items={ENTREES.map((n) => ({ name: n }))} />
        <MenuSection title="Plats" items={PLATS} />
        <MenuSection title="Desserts" items={DESSERTS.map((n) => ({ name: n }))} />
      </div>
    </section>
  );
}

function MenuSection({
  title,
  items,
}: {
  title: string;
  items: { name: string; signature?: boolean }[];
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-12"
    >
      <motion.h2
        variants={staggerChild}
        className="text-[10px] uppercase tracking-[0.25em] text-gold pb-6 font-light"
      >
        {title}
      </motion.h2>
      <div className="hairline mb-2" />

      <ul className="list-none p-0 m-0">
        {items.map((item) => (
          <motion.li
            key={item.name}
            variants={staggerChild}
            whileHover="hovered"
            initial="initial"
            className="relative pl-4 md:pl-5 py-3.5 md:py-4 cursor-default flex items-start justify-between gap-3 md:gap-4 group"
          >
            <motion.div
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-gold"
              variants={{
                initial: { scaleY: 0, opacity: 0 },
                hovered: { scaleY: 1, opacity: 1 },
              }}
              style={{ originY: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              aria-hidden="true"
            />
            <motion.span
              className="font-serif text-[1.1rem] md:text-[1.25rem] font-light leading-snug transition-colors flex-1 min-w-0"
              variants={{
                initial: { color: "var(--ivory)" },
                hovered: { color: "var(--gold)" },
              }}
            >
              {item.name}
            </motion.span>
            {item.signature && (
              <span className="inline-flex items-center text-[10px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-green text-green shrink-0 mt-1.5">
                Signature
              </span>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

function PhotoBreak() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      className="relative h-[34vh] md:h-[40vh] min-h-[260px] md:min-h-[320px] overflow-hidden flex items-center justify-center"
    >
      <picture>
        <source srcSet={photoDessertWebp} type="image/webp" />
        <motion.img
          src={photoDessert}
          alt="Dessert maison, gros plan dressage"
          loading="lazy"
          decoding="async"
          width={1324}
          height={1324}
          style={{ y, objectPosition: "center center" }}
          className="absolute inset-0 w-full h-[120%] object-cover"
        />
      </picture>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20,20,18,0.55) 0%, rgba(20,20,18,0.65) 60%, rgba(20,20,18,0.75) 100%)",
        }}
      />
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 pull-quote text-[1.5rem] md:text-[2rem] text-center px-6 max-w-2xl text-[oklch(0.985_0.003_90)] drop-shadow-[0_2px_20px_oklch(0.15_0.005_160/0.45)]"
      >
        "Tout est fait maison, jusqu'aux desserts."
      </motion.p>
    </section>
  );
}

function Prices() {
  const items = [
    { icon: Utensils, label: "Plat du jour", price: "13,50 €" },
    { icon: ChefHat, label: "Menu adulte", price: "Dès 39 €" },
    { icon: Users, label: "Menu enfant", price: "15 €" },
  ];
  return (
    <section className="py-28 md:py-36 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 md:divide-x divide-hairline"
      >
        {items.map(({ icon: Icon, label, price }) => (
          <motion.div
            key={label}
            variants={staggerChild}
            whileHover={{ y: -6 }}
            transition={spring}
            className="text-center px-6 cursor-default"
          >
            <Icon size={16} className="text-gold mx-auto mb-4" strokeWidth={1.5} />
            <p className="font-serif italic font-light text-[2.5rem] md:text-[3rem] text-ivory leading-none mb-3">
              {price}
            </p>
            <p className="eyebrow">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
