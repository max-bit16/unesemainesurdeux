import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Utensils, ChefHat, Users } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";

import photoLegumes from "@/assets/photos/photo-legumes.jpg";
import photoPavlova from "@/assets/photos/photo-pavlova.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "La Carte — Une Semaine Sur Deux · Restaurant à Grenoble" },
      {
        name: "description",
        content:
          "Carte courte, renouvelée au fil des saisons. Entrées, plats, desserts faits maison. Plat du jour 13,50€, menu adulte dès 39€.",
      },
      { property: "og:title", content: "La Carte — Une Semaine Sur Deux" },
      {
        property: "og:description",
        content:
          "Une carte bistronomique, courte et de saison. Faite maison à Grenoble.",
      },
      { property: "og:image", content: photoLegumes },
      { name: "twitter:image", content: photoLegumes },
    ],
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
    <section className="relative h-[45vh] min-h-[380px] overflow-hidden flex items-center justify-center">
      <img
        src={photoLegumes}
        alt="Légumes du marché — carte saisonnière"
        loading="eager"
        style={{ objectPosition: "center 30%" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.003_90/0.5)] via-[oklch(0.985_0.003_90/0.7)] to-[oklch(0.985_0.003_90/0.9)]" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-3xl pt-20"
      >
        <motion.p variants={staggerChild} className="eyebrow text-gold mb-4">
          N°01 — La Carte
        </motion.p>
        <motion.h1 variants={staggerChild} className="display-h1 mb-6">
          Une carte courte,
          <br />
          qui dit l'essentiel.
        </motion.h1>
        <motion.p variants={staggerChild} className="text-ivory-muted text-[16px] max-w-xl mx-auto">
          Renouvelée au fil des saisons. Tout est fait maison.
        </motion.p>
      </motion.div>
    </section>
  );
}

function MenuBody() {
  return (
    <section className="py-20 md:py-24 px-6">
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
      <motion.p
        variants={staggerChild}
        className="text-[10px] uppercase tracking-[0.3em] text-gold pb-6 font-normal"
      >
        {title}
      </motion.p>
      <div className="hairline mb-2" />

      <div>
        {items.map((item) => (
          <motion.div
            key={item.name}
            variants={staggerChild}
            whileHover="hovered"
            initial="initial"
            className="relative pl-5 py-4 cursor-default flex items-center justify-between gap-4 group"
          >
            <motion.div
              className="absolute left-0 top-3 bottom-3 w-[2px] bg-gold"
              variants={{
                initial: { scaleY: 0, opacity: 0 },
                hovered: { scaleY: 1, opacity: 1 },
              }}
              style={{ originY: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="font-serif text-[1.25rem] font-light leading-snug transition-colors"
              variants={{
                initial: { color: "oklch(0.928 0.018 85)" },
                hovered: { color: "oklch(0.703 0.106 65)" },
              }}
            >
              {item.name}
            </motion.span>
            {item.signature && (
              <span className="inline-flex items-center text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border border-green text-green ml-3 shrink-0">
                Signature
              </span>
            )}
          </motion.div>
        ))}
      </div>
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
      className="relative h-[40vh] min-h-[320px] overflow-hidden flex items-center justify-center"
    >
      <motion.img
        src={photoPavlova}
        alt="Pavlova mangue — desserts maison"
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.985 0.003 90 / 0.4), oklch(0.985 0.003 90 / 0.85))",
        }}
      />
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative z-10 pull-quote text-[2rem] text-center px-6 max-w-2xl"
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
    <section className="py-24 px-6">
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
            className="text-center px-6"
          >
            <Icon size={16} className="text-gold mx-auto mb-4" strokeWidth={1.5} />
            <p className="font-serif italic font-light text-[3rem] text-ivory leading-none mb-3">
              {price}
            </p>
            <p className="eyebrow">{label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
