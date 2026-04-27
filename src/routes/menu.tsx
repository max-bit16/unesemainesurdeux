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
      <MenuSections />
      <PhotoBreak />
      <Prices />
    </>
  );
}

function MenuHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-[55vh] min-h-[420px] overflow-hidden flex items-center justify-center">
      <motion.img
        src={photoLegumes}
        alt="Légumes du marché — carte saisonnière"
        loading="eager"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-[oklch(0.115_0.005_60/0.75)]" />
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
        <motion.p variants={staggerChild} className="text-ivory-muted text-[17px] max-w-xl mx-auto">
          Renouvelée au fil des saisons. Tout est fait maison.
        </motion.p>
      </motion.div>
    </section>
  );
}

function MenuSections() {
  return (
    <section className="bg-background py-20">
      <div className="max-w-4xl mx-auto px-6">
        <Section title="Entrées" items={ENTREES.map((n) => ({ name: n }))} />
        <Section title="Plats" items={PLATS} />
        <Section title="Desserts" items={DESSERTS.map((n) => ({ name: n }))} last />
      </div>
    </section>
  );
}

function Section({
  title,
  items,
  last,
}: {
  title: string;
  items: { name: string; signature?: boolean }[];
  last?: boolean;
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`bg-surface border-b border-border px-8 md:px-12 py-10 ${
        last ? "rounded-b-2xl" : ""
      } ${title === "Entrées" ? "rounded-t-2xl" : ""}`}
    >
      <motion.div
        variants={staggerChild}
        className="flex items-center gap-4 mb-7"
      >
        <p className="eyebrow text-gold">— {title}</p>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      <div className="space-y-1">
        {items.map((item) => (
          <motion.div
            key={item.name}
            variants={staggerChild}
            whileHover="hovered"
            initial="initial"
            className="relative pl-5 py-4 cursor-default flex items-center justify-between gap-4"
          >
            <motion.div
              className="absolute left-0 top-2 bottom-2 w-[2px] bg-gold"
              variants={{
                initial: { scaleY: 0, opacity: 0 },
                hovered: { scaleY: 1, opacity: 1 },
              }}
              style={{ originY: 0 }}
              transition={{ duration: 0.25 }}
            />
            <span className="font-serif text-[1.25rem] text-ivory leading-snug">
              {item.name}
            </span>
            {item.signature && (
              <span className="bg-green text-ivory text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-sm shrink-0">
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
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative h-[50vh] min-h-[360px] overflow-hidden flex items-center justify-center"
    >
      <motion.img
        src={photoPavlova}
        alt="Pavlova mangue — desserts maison"
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 w-full h-[120%] object-cover"
      />
      <div className="absolute inset-0 bg-[oklch(0.115_0.005_60/0.55)]" />
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
    { icon: ChefHat, label: "Menu adulte", price: "À partir de 39 €" },
    { icon: Users, label: "Menu enfant", price: "15 €" },
  ];
  return (
    <section className="bg-surface-alt py-16">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {items.map(({ icon: Icon, label, price }) => (
          <motion.div
            key={label}
            variants={staggerChild}
            whileHover={{ y: -4, borderColor: "oklch(0.703 0.106 65)" }}
            transition={{ duration: 0.3 }}
            className="bg-surface border border-border rounded-2xl p-10 text-center"
          >
            <Icon size={32} className="text-gold mx-auto mb-5" strokeWidth={1.5} />
            <p className="eyebrow mb-3">{label}</p>
            <p className="font-serif text-[3rem] text-ivory leading-none">{price}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
