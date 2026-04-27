import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink } from "lucide-react";
import {
  fadeUp,
  scaleUp,
  staggerContainer,
  staggerChild,
  viewportOnce,
} from "@/lib/motion";

import photoSaintJacques from "@/assets/photos/photo-saint-jacques.jpg";

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
      { property: "og:image", content: photoSaintJacques },
      { name: "twitter:image", content: photoSaintJacques },
    ],
  }),
  component: ReserverPage,
});

function ReserverPage() {
  return (
    <>
      <Header />
      <Contact />
      <Testimonials />
      <Social />
    </>
  );
}

function Header() {
  return (
    <section className="relative h-[40vh] min-h-[320px] overflow-hidden flex items-center justify-center">
      <img
        src={photoSaintJacques}
        alt="Saint-Jacques signature"
        loading="eager"
        style={{ objectPosition: "center 60%" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[oklch(0.196_0.006_60/0.78)]" />
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

function Contact() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow mb-6">Coordonnées</p>
          <div className="space-y-5 text-[16px] font-light">
            <Row icon={<MapPin size={15} className="text-gold" strokeWidth={1.5} />}>
              4 Place Championnet, 38000 Grenoble
            </Row>
            <Row icon={<Phone size={15} className="text-gold" strokeWidth={1.5} />}>
              <a href="tel:+33476271375" className="text-ivory hover:text-gold transition-colors">
                +33 4 76 27 13 75
              </a>
            </Row>
            <Row icon={<Mail size={15} className="text-gold" strokeWidth={1.5} />}>
              <a
                href="mailto:restaurant1sur2@gmail.com"
                className="text-ivory hover:text-gold transition-colors"
              >
                restaurant1sur2@gmail.com
              </a>
            </Row>
            <Row icon={<Clock size={15} className="text-gold" strokeWidth={1.5} />}>
              Ouvert tous les jours · 12h–14h / 19h–21h30
            </Row>
          </div>
          <a
            href="https://maps.google.com/?q=4+Place+Championnet+Grenoble"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline-green mt-8"
          >
            <MapPin size={14} /> Voir sur Google Maps
          </a>
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-surface rounded-3xl p-10"
          style={{ border: "1px solid oklch(0.703 0.106 65 / 0.3)" }}
        >
          <h2 className="font-serif italic font-light text-[1.75rem] text-ivory mb-3">
            Par téléphone
          </h2>
          <p className="text-ivory-muted text-[15px] font-light leading-relaxed mb-6">
            La meilleure façon de réserver. Nous confirmons immédiatement.
          </p>
          <a
            href="tel:+33476271375"
            className="btn-primary w-full !py-4"
          >
            <Phone size={16} /> Appeler maintenant
          </a>

          <div className="hairline my-8" />

          <h3 className="font-serif italic font-light text-[1.5rem] text-ivory mb-3">
            Événements privés
          </h3>
          <p className="text-ivory-muted text-[15px] font-light leading-relaxed mb-5">
            Le restaurant peut être privatisé pour vos événements.
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
      <span className="mt-2 shrink-0">{icon}</span>
      <span className="text-ivory">{children}</span>
    </div>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "Le poulpe était incroyable : cuisson parfaite, tendre, bien assaisonné. La souris d'agneau, fondante, pleine de goût.",
      author: "E. Bagdassarian",
    },
    {
      quote:
        "La mousse au chocolat est sans doute la meilleure que j'ai pu manger. De loin ma plus belle expérience à Grenoble.",
      author: "G. Cascone",
    },
    {
      quote:
        "L'ambiance allie modernité et raffinement. On se sent comme à la maison.",
      author: "Ozzy Makeo",
    },
  ];

  return (
    <section className="py-32 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl mx-auto"
      >
        <motion.p variants={staggerChild} className="eyebrow text-center mb-16">
          N°02 — Ils en parlent
        </motion.p>
        <div>
          {items.map((t, i) => (
            <motion.div
              key={t.author}
              variants={staggerChild}
              className={`py-10 ${i === 0 ? "border-t border-hairline" : ""} border-b border-hairline`}
            >
              <p className="pull-quote text-[1.3rem] mb-4">"{t.quote}"</p>
              <p className="text-[13px] text-ivory-muted">
                — {t.author} <span className="text-gold ml-1">★★★★★</span>
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={staggerChild}
          className="text-center text-ivory-muted text-[13px] font-light mt-12"
        >
          96% des clients recommandent · 204 avis Facebook
        </motion.p>
      </motion.div>
    </section>
  );
}

function Social() {
  return (
    <section className="py-16 text-center px-6">
      <div className="flex items-center justify-center gap-8 text-[13px]">
        <a
          href="https://www.instagram.com/1semainesur2restaurant/"
          target="_blank"
          rel="noreferrer noopener"
          className="gold-link"
        >
          Instagram <ExternalLink size={13} />
        </a>
        <a
          href="https://www.facebook.com/1sur2grenoble/"
          target="_blank"
          rel="noreferrer noopener"
          className="gold-link"
        >
          Facebook <ExternalLink size={13} />
        </a>
      </div>
    </section>
  );
}
