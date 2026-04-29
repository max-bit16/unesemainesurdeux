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

// Photos temporaires — Pexels CDN (libre de droits). À remplacer par photos originales du restaurant.
const photoLegumes = "https://images.pexels.com/photos/32615777/pexels-photo-32615777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const photoPavlova = "https://images.pexels.com/photos/31500975/pexels-photo-31500975.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

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
      { property: "og:image", content: photoLegumes },
      { name: "twitter:image", content: photoLegumes },
    ],
    links: [{ rel: "canonical", href: "https://restaurant1sur2.fr/menu" }],
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
        src={photoLegumes}
        alt="Légumes du marché carte saisonnière"
        loading="eager"
        fetchPriority="high"
        style={{ objectPosition: "center 30%" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.003_90/0.65)] via-[oklch(0.985_0.003_90/0.78)] to-[oklch(0.985_0.003_90/0.95)]" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        <motion.p variants={staggerChild} className="eyebrow text-gold mb-4">
          N°01 La Carte
        </motion.p>
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
      <motion.h2
        variants={staggerChild}
        className="text-[10px] uppercase tracking-[0.3em] text-gold pb-6 font-normal"
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
              transition={{ duration: 0.25 }}
              aria-hidden="true"
            />
            <motion.span
              className="font-serif text-[1.1rem] md:text-[1.25rem] font-light leading-snug transition-colors flex-1 min-w-0"
              variants={{
                initial: { color: "oklch(0.300 0.005 160)" },
                hovered: { color: "oklch(0.570 0.030 150)" },
              }}
            >
              {item.name}
            </motion.span>
            {item.signature && (
              <span className="inline-flex items-center text-[9px] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full border border-green text-green shrink-0 mt-1.5">
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
      <motion.img
        src={photoPavlova}
        alt="Pavlova framboises et meringue, dessert maison"
        loading="lazy"
        style={{ y, objectPosition: "center 75%" }}
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
        className="relative z-10 pull-quote text-[1.5rem] md:text-[2rem] text-center px-6 max-w-2xl"
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
    <section className="py-20 md:py-24 px-6">
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
