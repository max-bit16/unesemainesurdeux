import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import {
  fadeUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";

import photoSurfTurf from "@/assets/photos/photo-surf-turf.jpg";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Réserver — Une Semaine Sur Deux · Restaurant à Grenoble" },
      {
        name: "description",
        content:
          "Réservez votre table au restaurant Une Semaine Sur Deux à Grenoble. Par téléphone : 04 76 27 13 75. Ouvert tous les jours, midi et soir.",
      },
      { property: "og:title", content: "Réserver — Une Semaine Sur Deux" },
      {
        property: "og:description",
        content: "Réservation par téléphone · 04 76 27 13 75 · Ouvert 7/7.",
      },
      { property: "og:image", content: photoSurfTurf },
      { name: "twitter:image", content: photoSurfTurf },
    ],
  }),
  component: ReserverPage,
});

function ReserverPage() {
  return (
    <>
      <Header />
      <ContactSplit />
      <Testimonials />
      <SocialProofMini />
    </>
  );
}

function Header() {
  return (
    <section className="relative h-[40vh] min-h-[340px] overflow-hidden flex items-center justify-center">
      <img
        src={photoSurfTurf}
        alt="Plat signature surf and turf"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[oklch(0.115_0.005_60/0.7)]" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 pt-16"
      >
        <motion.p variants={staggerChild} className="eyebrow text-gold mb-4">
          N°01 — Venez nous voir
        </motion.p>
        <motion.h1 variants={staggerChild} className="display-h1">
          Réservez votre table.
        </motion.h1>
      </motion.div>
    </section>
  );
}

function ContactSplit() {
  return (
    <section className="py-24">
      <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-surface border border-border rounded-2xl p-10"
        >
          <p className="eyebrow text-gold mb-5">Coordonnées</p>
          <div className="space-y-5 text-[15px]">
            <Row icon={<MapPin size={18} className="text-gold" strokeWidth={1.5} />}>
              4 Place Championnet, 38000 Grenoble
            </Row>
            <Row icon={<Phone size={18} className="text-gold" strokeWidth={1.5} />}>
              <a href="tel:+33476271375" className="hover:text-gold transition-colors">
                +33 4 76 27 13 75
              </a>
            </Row>
            <Row icon={<Mail size={18} className="text-gold" strokeWidth={1.5} />}>
              <a
                href="mailto:restaurant1sur2@gmail.com"
                className="hover:text-gold transition-colors"
              >
                restaurant1sur2@gmail.com
              </a>
            </Row>
            <Row icon={<Clock size={18} className="text-gold" strokeWidth={1.5} />}>
              Ouvert tous les jours · 12h–14h / 19h–21h30
            </Row>
          </div>
          <motion.a
            href="https://maps.google.com/?q=4+Place+Championnet+Grenoble"
            target="_blank"
            rel="noreferrer noopener"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary mt-8"
          >
            <MapPin size={16} /> Voir sur Google Maps
          </motion.a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          transition={{ delay: 0.15 }}
          className="bg-surface border border-green rounded-2xl p-10"
        >
          <p className="eyebrow text-gold mb-3">Réservation</p>
          <h2 className="display-h3 italic font-serif text-[1.75rem] mb-3">
            Par téléphone
          </h2>
          <p className="text-ivory-muted text-[15px] mb-6">
            La meilleure façon de réserver. Nous confirmons immédiatement.
          </p>
          <motion.a
            href="tel:+33476271375"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-primary w-full !py-4 text-base"
          >
            <Phone size={18} /> Appeler maintenant
          </motion.a>

          <div className="h-px bg-border my-8" />

          <h3 className="display-h3 italic font-serif text-[1.5rem] mb-3">
            Événements privés
          </h3>
          <p className="text-ivory-muted text-[15px] mb-5">
            Le restaurant peut être privatisé pour vos événements professionnels
            ou familiaux.
          </p>
          <a
            href="mailto:restaurant1sur2@gmail.com"
            className="gold-link"
          >
            Nous écrire <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <span className="text-ivory">{children}</span>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Le poulpe était incroyable : cuisson parfaite, tendre, bien assaisonné. Et la souris d'agneau, fondante, pleine de goût.",
      author: "E. Bagdassarian",
    },
    {
      quote:
        "La mousse au chocolat est sans doute la meilleure que j'ai pu manger. De loin ma plus belle expérience culinaire à Grenoble.",
      author: "G. Cascone",
    },
    {
      quote:
        "Les plats, à la fois croquants et fondants, sont un vrai régal. L'ambiance allie modernité et raffinement.",
      author: "Ozzy Makeo",
    },
  ];

  return (
    <section className="bg-surface-alt py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-[1200px] mx-auto px-6"
      >
        <motion.p variants={staggerChild} className="eyebrow text-center mb-12">
          N°02 — Ils en parlent
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <motion.div
              key={t.author}
              variants={staggerChild}
              whileHover={{ y: -6, borderColor: "oklch(0.703 0.106 65)" }}
              transition={{ duration: 0.3 }}
              className="bg-surface border border-border rounded-2xl p-8 flex flex-col gap-5"
            >
              <p className="pull-quote text-[1.15rem]">"{t.quote}"</p>
              <p className="text-[13px] text-ivory-muted mt-auto">
                — {t.author} <span className="text-gold">★★★★★</span>
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={staggerChild}
          className="text-center text-ivory-muted text-sm mt-12"
        >
          96% des clients recommandent ce restaurant · 204 avis Facebook
        </motion.p>
      </motion.div>
    </section>
  );
}

function SocialProofMini() {
  return (
    <section className="py-16 text-center">
      <p className="eyebrow mb-5">Suivez-nous</p>
      <div className="flex items-center justify-center gap-8 text-[15px]">
        <a
          href="https://www.instagram.com/1semainesur2restaurant/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-ivory hover:text-gold transition-colors"
        >
          @1semainesur2restaurant
        </a>
        <span className="text-border">·</span>
        <a
          href="https://www.facebook.com/1sur2grenoble/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-ivory hover:text-gold transition-colors"
        >
          Une Semaine sur Deux
        </a>
      </div>
    </section>
  );
}
