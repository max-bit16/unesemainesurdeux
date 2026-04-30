import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/config/site";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sprout, Sun, ChefHat } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  staggerFast,
  staggerChild,
  viewportOnce,
  spring,
  dividerReveal,
} from "@/lib/motion";

// Photo générée — geste de dressage du chef, ambiance bistronomique premium.
import photoChef from "@/assets/photos/photo-chef-dressage.jpg";
import photoChefWebp from "@/assets/photos/photo-chef-dressage.webp";

export const Route = createFileRoute("/chef")({
  head: () => ({
    meta: [
      { title: "Chef Pierrick Vasseur Restaurant Une Semaine Sur Deux · Grenoble" },
      {
        name: "description",
        content:
          "Pierrick Vasseur, chef du restaurant Une Semaine Sur Deux à Grenoble. Cuisine bistronomique, produits locaux et de saison. Toque Gault & Millau 2026.",
      },
      { property: "og:title", content: "Chef Pierrick Vasseur Restaurant Une Semaine Sur Deux Grenoble" },
      {
        property: "og:description",
        content:
          "Cuisine bistronomique, produits locaux et de saison. Toque Gault & Millau 2026.",
      },
      { property: "og:image", content: `${SITE_URL}/og-chef.jpg` },
      { name: "twitter:image", content: `${SITE_URL}/og-chef.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/chef` }],
  }),
  component: ChefPage,
});

function ChefPage() {
  return (
    <>
      <ChefHero />
      <PullQuote />
      <Values />
    </>
  );
}

function ChefHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col md:flex-row pt-[60px] md:pt-0"
    >
      <div className="relative w-full md:w-1/2 h-[40vh] md:h-auto md:min-h-screen overflow-hidden">
        <picture>
          <source srcSet={photoChefWebp} type="image/webp" />
          <motion.img
            src={photoChef}
            alt="Le chef dressant une assiette signature"
            loading="eager"
            fetchPriority="high"
            style={{ y, objectPosition: "center center" }}
            className="w-full h-[115%] object-cover absolute inset-0"
          />
        </picture>
        <div
          className="absolute inset-y-0 right-0 w-[25%] pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to left, oklch(0.985 0.003 90), transparent)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none md:hidden"
          style={{
            background:
              "linear-gradient(to top, oklch(0.985 0.003 90), transparent)",
          }}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-16 py-14 md:py-24 md:pt-32"
      >
        <motion.h1 variants={staggerChild} className="display-h1 mb-6 md:mb-8">
          Pierrick Vasseur,
          <br />
          cuisiner avec intention.
        </motion.h1>
        <motion.p
          variants={staggerChild}
          className="text-ivory-muted text-[15px] md:text-[16px] mb-5 max-w-md font-light leading-relaxed md:leading-loose"
        >
          Depuis l'ouverture, Pierrick Vasseur défend une cuisine bistronomique
          ancrée dans la saison et le territoire. Pas de carte longue une
          sélection courte, où chaque plat est travaillé jusqu'à l'essentiel.
        </motion.p>
        <motion.p
          variants={staggerChild}
          className="text-ivory-muted text-[15px] md:text-[16px] mb-8 max-w-md font-light leading-relaxed md:leading-loose"
        >
          Distingué par une toque Gault &amp; Millau 2026, il s'appuie sur des
          produits en circuit court et une sélection viticole personnelle à prix
          justes.
        </motion.p>
      </motion.div>
    </section>
  );
}

function PullQuote() {
  return (
    <section className="py-28 md:py-36 px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.div
          variants={dividerReveal}
          className="gold-divider mx-auto mb-8 md:mb-12"
          style={{ transformOrigin: "center" }}
        />
        <p className="pull-quote text-[1.65rem] md:text-[2.2rem] mb-6">
          "Tout est fait maison, jusqu'aux desserts."
        </p>
        <p className="text-[13px] md:text-[14px] text-ivory-muted">Chef Pierrick Vasseur</p>
        <motion.div
          variants={dividerReveal}
          className="gold-divider mx-auto mt-8 md:mt-12"
          style={{ transformOrigin: "center" }}
        />
      </motion.div>
    </section>
  );
}

function Values() {
  const rows = [
    {
      icon: Sprout,
      label: "Produits frais",
      body: "Fruits, légumes et viandes sourcés localement, au fil des arrivages.",
    },
    {
      icon: Sun,
      label: "Saisons respectées",
      body: "La carte évolue quand les saisons changent. Pas l'inverse.",
    },
    {
      icon: ChefHat,
      label: "Fait maison",
      body: "Chaque plat préparé sur place. Chaque dessert pensé par le chef.",
    },
  ];

  return (
    <section className="py-28 md:py-40 px-6">
      <motion.div
        variants={staggerFast}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl mx-auto"
      >
        <div>
          {rows.map(({ icon: Icon, label, body }, i) => (
            <motion.div
              key={label}
              variants={staggerChild}
              whileHover={{ x: 6 }}
              transition={spring}
              className={`grid grid-cols-1 md:grid-cols-[40%_60%] gap-3 md:gap-10 py-7 md:py-8 cursor-default ${
                i === 0 ? "border-t border-hairline" : ""
              } border-b border-hairline`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} className="text-gold shrink-0" strokeWidth={1.5} />
                <p className="font-serif italic text-[1.25rem] md:text-[1.375rem] text-ivory font-light">
                  {label}
                </p>
              </div>
              <p className="text-[15px] md:text-[16px] text-ivory-muted font-light leading-relaxed">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
