import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Leaf, Sprout, Sun, ChefHat } from "lucide-react";
import {
  scaleUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";

import photoMenuPoulpe from "@/assets/photos/photo-menu-poulpe.jpg";

export const Route = createFileRoute("/chef")({
  head: () => ({
    meta: [
      { title: "Le Chef Pierrick Vasseur — Une Semaine Sur Deux · Grenoble" },
      {
        name: "description",
        content:
          "Pierrick Vasseur, Chef du restaurant Une Semaine Sur Deux à Grenoble. Cuisine bistronomique, produits de saison, fait maison. Toque Gault & Millau 2026.",
      },
      { property: "og:title", content: "Le Chef Pierrick Vasseur — Une Semaine Sur Deux" },
      {
        property: "og:description",
        content:
          "Cuisine bistronomique, ancrée dans la saison et le territoire. Toque Gault & Millau 2026.",
      },
      { property: "og:image", content: photoMenuPoulpe },
      { name: "twitter:image", content: photoMenuPoulpe },
    ],
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
  return (
    <section className="relative min-h-[100svh] flex flex-col md:flex-row pt-[68px] md:pt-0">
      <div className="relative w-full md:w-[45%] h-[55vh] md:h-auto md:min-h-screen overflow-hidden">
        <img
          src={photoMenuPoulpe}
          alt="Le menu signé du Chef Pierrick Vasseur"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-y-0 right-0 w-[30%] pointer-events-none hidden md:block"
          style={{
            background:
              "linear-gradient(to left, oklch(0.183 0.006 60), transparent)",
          }}
        />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full md:w-[55%] flex flex-col justify-center px-6 md:px-16 py-16 md:py-0"
      >
        <motion.p variants={staggerChild} className="eyebrow mb-5">
          N°01 — Derrière les fourneaux
        </motion.p>
        <motion.h1 variants={staggerChild} className="display-h1 mb-8">
          Pierrick Vasseur,
          <br />
          cuisiner avec intention.
        </motion.h1>
        <motion.p variants={staggerChild} className="text-ivory-muted text-[16px] mb-5 max-w-xl leading-relaxed">
          Depuis l'ouverture, Pierrick Vasseur défend une cuisine bistronomique
          ancrée dans la saison et le territoire. Pas de carte longue — une
          sélection courte, renouvelée, où chaque plat est travaillé jusqu'à
          l'essentiel.
        </motion.p>
        <motion.p variants={staggerChild} className="text-ivory-muted text-[16px] mb-8 max-w-xl leading-relaxed">
          Distingué par une toque Gault &amp; Millau 2026, il s'appuie sur des
          produits en circuit court et une sélection viticole personnelle à prix
          justes.
        </motion.p>
        <motion.div variants={staggerChild} className="flex flex-wrap gap-4">
          <Badge icon={<Award size={16} />} text="Toque Gault & Millau 2026" />
          <Badge icon={<Leaf size={16} />} text="Circuit court" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Badge({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-gold/40 text-gold text-[13px] tracking-wide">
      {icon}
      {text}
    </span>
  );
}

function PullQuote() {
  return (
    <section className="bg-surface py-24">
      <motion.div
        variants={scaleUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl mx-auto px-6 text-center"
      >
        <div className="gold-divider mx-auto mb-10" />
        <p className="pull-quote text-[2.2rem] mb-8">
          "Tout est fait maison, jusqu'aux desserts."
        </p>
        <p className="text-ivory-muted text-sm tracking-wide mb-10">
          — Chef Pierrick Vasseur
        </p>
        <div className="gold-divider mx-auto" />
      </motion.div>
    </section>
  );
}

function Values() {
  const items = [
    {
      icon: Sprout,
      title: "Produits frais",
      body: "Fruits, légumes et viandes sourcés localement.",
    },
    {
      icon: Sun,
      title: "Saisons respectées",
      body: "La carte change quand les saisons changent.",
    },
    {
      icon: ChefHat,
      title: "Fait maison",
      body: "Chaque plat, chaque dessert, préparé sur place.",
    },
  ];

  return (
    <section className="bg-surface-alt py-20">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-[1100px] mx-auto px-6"
      >
        <motion.p variants={staggerChild} className="eyebrow text-center mb-12">
          N°02 — Nos engagements
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={staggerChild}
              whileHover={{ y: -4, borderColor: "oklch(0.703 0.106 65)" }}
              transition={{ duration: 0.3 }}
              className="bg-surface border border-border rounded-2xl p-10 text-center"
            >
              <Icon size={36} className="text-gold mx-auto mb-5" strokeWidth={1.5} />
              <h3 className="display-h3 mb-3">{title}</h3>
              <p className="text-ivory-muted text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
