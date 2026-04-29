import { Link } from "@tanstack/react-router";
import { Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-deep pt-14 md:pt-16 pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="gold-divider mx-auto mb-7 md:mb-8" />

        <div className="text-center mb-10 md:mb-12">
          <Link
            to="/"
            className="font-serif italic text-[18px] md:text-[20px] font-light text-ivory hover:text-gold transition-colors"
          >
            Une Semaine Sur Deux
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-10 md:mb-12 text-center md:text-left">
          <div className="space-y-2">
            <p className="eyebrow mb-3">Adresse</p>
            <address className="not-italic text-ivory-muted text-[13px] font-light leading-loose">
              4 Place Championnet
              <br />38000 Grenoble
              <br />
              <a href="tel:+33476271375" className="hover:text-ivory transition-colors">
                +33 4 76 27 13 75
              </a>
            </address>
          </div>

          <div className="space-y-2">
            <p className="eyebrow mb-3">Horaires</p>
            <p className="text-ivory-muted text-[13px] font-light leading-loose">
              Tous les jours
              <br />
              <span className="text-ivory">12h–14h · 19h–21h30</span>
            </p>
          </div>

          <nav aria-label="Navigation pied de page" className="space-y-2">
            <p className="eyebrow mb-3">Navigation</p>
            <ul className="space-y-1.5 text-[13px] font-light">
              {[
                { to: "/menu", label: "Menu" },
                { to: "/chef", label: "Le Chef" },
                { to: "/galerie", label: "Galerie" },
                { to: "/reserver", label: "Réserver" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-ivory-muted hover:text-ivory transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center md:justify-start gap-4 pt-3">
              <a
                href="https://www.instagram.com/1semainesur2restaurant/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="text-ivory-muted hover:text-gold transition-colors"
              >
                <Instagram size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/1sur2grenoble/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="text-ivory-muted hover:text-gold transition-colors"
              >
                <Facebook size={16} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        <div className="hairline mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-ivory-ghost font-light tracking-wider">
          <p className="text-center md:text-left">
            © 2026 Une Semaine Sur Deux · Grenoble · Site par Yamen Global
          </p>
          <Link
            to="/mentions-legales"
            className="text-ivory-ghost hover:text-ivory transition-colors"
            style={{ fontSize: "12px" }}
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
