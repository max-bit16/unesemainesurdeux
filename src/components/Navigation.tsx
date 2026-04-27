import { Link } from "@tanstack/react-router";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/chef", label: "Le Chef" },
  { to: "/galerie", label: "Galerie" },
  { to: "/reserver", label: "Réserver" },
] as const;

export function Navigation() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 80);
    setVisible(y < lastY || y < 80);
    setLastY(y);
  });

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: visible ? 0 : -90 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-[oklch(0.196_0.006_60/0.92)] border-b border-hairline"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[68px] flex items-center justify-between">
        <Link
          to="/"
          className="font-serif italic text-[18px] font-light text-ivory hover:text-gold transition-colors"
        >
          Une Semaine Sur Deux
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[13px] tracking-[0.1em] uppercase text-ivory-muted hover:text-ivory transition-colors font-light"
              activeProps={{ className: "text-ivory" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <a
          href="tel:+33476271375"
          className="inline-flex items-center justify-center text-[13px] font-light tracking-[0.04em] text-gold border border-gold rounded-full px-5 py-2 hover:bg-gold-dim transition-colors"
        >
          Réserver
        </a>
      </div>
    </motion.nav>
  );
}
