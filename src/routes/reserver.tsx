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
// Hero "Réserver votre table" : salle bistronomique chaleureuse (générée IA)
import photoTable from "@/assets/photos/photo-salle.jpg";

export const Route = createFileRoute("/reserver")({
  head: () => ({
    meta: [
      { title: "Réserver une table Restaurant Une Semaine Sur Deux · Grenoble" },
      {
        name: "description",
        content:
          "Réservez votre table au restaurant Une Semaine Sur Deux, 4 Place Championnet, Grenoble. ☎ 04 76 27 13 75. Ouvert tous les jours.",
      },
      { property: "og:title", content: "Réserver une table Restaurant Une Semaine Sur Deux Grenoble" },
      {
        property: "og:description",
        content: "Réservation par téléphone 04 76 27 13 75. Ouvert 7/7 à Grenoble.",
      },
      { property: "og:image", content: photoSaintJacques },
      { name: "twitter:image", content: photoSaintJacques },
    ],
    links: [{ rel: "canonical", href: "https://restaurant1sur2.fr/reserver" }],
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
    <section className="relative h-[42vh] md:h-[40vh] min-h-[340px] md:min-h-[320px] overflow-hidden flex items-center justify-center pt-[60px] md:pt-0">
      <img
        src={photoTable}
        alt="Table dressée au restaurant Une Semaine Sur Deux à Grenoble"
        loading="eager"
        fetchPriority="high"
        style={{ objectPosition: "center 55%" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.985_0.003_90/0.72)] via-[oklch(0.985_0.003_90/0.82)] to-[oklch(0.985_0.003_90/0.95)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.985 0.003 90 / 0.45) 0%, oklch(0.985 0.003 90 / 0) 70%)",
        }}
        aria-hidden
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6"
      >
        <motion.p variants={staggerChild} className="eyebrow text-gold mb-4">
          N°01 Venez nous voir
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
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-start">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <p className="eyebrow mb-5 md:mb-6">Coordonnées</p>
          <address className="not-italic space-y-4 md:space-y-5 text-[15px] md:text-[16px] font-light">
            <Row icon={<MapPin size={15} className="text-gold" strokeWidth={1.5} aria-hidden="true" />}>
              4 Place Championnet, 38000 Grenoble
            </Row>
            <Row icon={<Phone size={15} className="text-gold" strokeWidth={1.5} aria-hidden="true" />}>
              <a href="tel:+33476271375" className="text-ivory hover:text-gold transition-colors">
                +33 4 76 27 13 75
              </a>
            </Row>
            <Row icon={<Mail size={15} className="text-gold" strokeWidth={1.5} aria-hidden="true" />}>
              <a
                href="mailto:restaurant1sur2@gmail.com"
                className="text-ivory hover:text-gold transition-colors break-all"
              >
                restaurant1sur2@gmail.com
              </a>
            </Row>
            <Row icon={<Clock size={15} className="text-gold" strokeWidth={1.5} aria-hidden="true" />}>
              Ouvert tous les jours · 12h–14h / 19h–21h30
            </Row>
          </address>
          <a
            href="https://maps.google.com/?q=4+Place+Championnet+Grenoble"
            target="_blank"
            rel="noreferrer noopener"
            className="btn-outline-green mt-8"
          >
            <MapPin size={14} aria-hidden="true" /> Voir sur Google Maps
          </a>
        </motion.div>

        <motion.div
          variants={scaleUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="bg-surface rounded-3xl p-7 md:p-10 border border-hairline w-full"
        >
          <h2 className="font-serif italic font-light text-[1.5rem] md:text-[1.75rem] text-ivory mb-3">
            Par téléphone
          </h2>
          <p className="text-ivory-muted text-[14.5px] md:text-[15px] font-light leading-relaxed mb-6">
            La meilleure façon de réserver. Nous confirmons immédiatement.
          </p>
          <a
            href="tel:+33476271375"
            className="btn-primary w-full !py-4"
          >
            <Phone size={16} aria-hidden="true" /> Appeler maintenant
          </a>

          <div className="hairline my-7 md:my-8" />

          <h3 className="font-serif italic font-light text-[1.35rem] md:text-[1.5rem] text-ivory mb-3">
            Événements privés
          </h3>
          <p className="text-ivory-muted text-[14.5px] md:text-[15px] font-light leading-relaxed mb-5">
            Le restaurant peut être privatisé pour vos événements.
          </p>
          <a
            href="mailto:restaurant1sur2@gmail.com"
            className="gold-link"
          >
            Nous écrire <ArrowRight size={14} aria-hidden="true" />
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
    <section className="py-20 md:py-32 px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="max-w-3xl mx-auto"
      >
        <motion.p variants={staggerChild} className="eyebrow text-center mb-10 md:mb-16">
          N°02 Ils en parlent
        </motion.p>
        <div>
          {items.map((t, i) => (
            <motion.div
              key={t.author}
              variants={staggerChild}
              className={`py-8 md:py-10 ${i === 0 ? "border-t border-hairline" : ""} border-b border-hairline`}
            >
              <p className="pull-quote text-[1.15rem] md:text-[1.3rem] mb-4">"{t.quote}"</p>
              <p className="text-[12.5px] md:text-[13px] text-ivory-muted">
                {t.author} <span className="text-gold ml-1">★★★★★</span>
              </p>
            </motion.div>
          ))}
        </div>
        <motion.p
          variants={staggerChild}
          className="text-center text-ivory-muted text-[12.5px] md:text-[13px] font-light mt-10 md:mt-12"
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
          Instagram <ExternalLink size={13} aria-hidden="true" />
        </a>
        <a
          href="https://www.facebook.com/1sur2grenoble/"
          target="_blank"
          rel="noreferrer noopener"
          className="gold-link"
        >
          Facebook <ExternalLink size={13} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
