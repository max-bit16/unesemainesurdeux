import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-deep pt-16 pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="h-px w-full bg-gold/20 mb-12" />

        <div className="text-center mb-12">
          <Link
            to="/"
            className="font-serif italic text-[22px] text-ivory hover:text-gold transition-colors"
          >
            Une Semaine Sur Deux
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div className="space-y-3">
            <p className="eyebrow">Adresse</p>
            <p className="text-ivory-muted text-sm leading-relaxed flex items-start gap-2">
              <MapPin size={16} className="text-gold mt-1 shrink-0" />
              <span>4 Place Championnet
                <br />38000 Grenoble</span>
            </p>
            <p className="text-ivory-muted text-sm flex items-center gap-2">
              <Phone size={16} className="text-gold shrink-0" />
              <a href="tel:+33476271375" className="hover:text-ivory transition-colors">
                +33 4 76 27 13 75
              </a>
            </p>
            <p className="text-ivory-muted text-sm flex items-center gap-2">
              <Mail size={16} className="text-gold shrink-0" />
              <a href="mailto:restaurant1sur2@gmail.com" className="hover:text-ivory transition-colors">
                restaurant1sur2@gmail.com
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Horaires</p>
            <p className="text-ivory-muted text-sm leading-relaxed">
              Tous les jours
              <br />
              <span className="text-ivory">12h–14h · 19h–21h30</span>
            </p>
          </div>

          <div className="space-y-3">
            <p className="eyebrow">Navigation</p>
            <ul className="space-y-2 text-sm">
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

            <div className="flex items-center gap-4 pt-3">
              <a
                href="https://www.instagram.com/1semainesur2restaurant/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="text-ivory-muted hover:text-gold transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.facebook.com/1sur2grenoble/"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Facebook"
                className="text-ivory-muted hover:text-gold transition-colors"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-ivory-muted/70 tracking-wider">
            © 2026 Une Semaine Sur Deux · Grenoble · Site réalisé par Yamen Global
          </p>
        </div>
      </div>
    </footer>
  );
}
