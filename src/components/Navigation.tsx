import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { spring } from "@/lib/motion";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { to: "/menu", label: "Menu" },
  { to: "/chef", label: "Le Chef" },
  { to: "/galerie", label: "Galerie" },
  { to: "/reserver", label: "Réserver" },
] as const;

export function Navigation() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 60);
    // Don't auto-hide while drawer is open
    if (!open) setVisible(y < lastY || y < 80);
    setLastY(y);
  });

  // Lock body scroll when drawer open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: visible ? 0 : -90 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? "backdrop-blur-md bg-[oklch(0.985_0.003_90/0.92)] border-b border-hairline"
            : "bg-[oklch(0.985_0.003_90/0.55)] md:bg-transparent backdrop-blur-sm md:backdrop-blur-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[60px] md:h-[68px] flex items-center justify-between">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="font-serif italic text-[17px] md:text-[20px] font-light text-ivory hover:text-gold transition-colors tracking-tight"
          >
            Une Semaine Sur Deux
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-9" role="navigation" aria-label="Navigation principale">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="nav-link text-[13px] tracking-[0.1em] uppercase text-ivory-muted hover:text-ivory transition-colors font-light"
                activeProps={{ className: "nav-link text-ivory", "aria-current": "page" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop reserve pill */}
          <motion.a
            href="tel:+33476271375"
            className="hidden md:inline-flex items-center justify-center text-[13px] font-light tracking-[0.04em] text-gold border border-gold rounded-full px-5 py-2 hover:bg-gold-dim transition-colors"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            Réserver
          </motion.a>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 text-ivory"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={22} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="m"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={22} strokeWidth={1.5} aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 z-40 pt-[60px] bg-[oklch(0.985_0.003_90/0.98)] backdrop-blur-md flex flex-col"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
              className="flex-1 flex flex-col items-center justify-center gap-2 px-6"
            >
              {links.map((l) => (
                <motion.li
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="block py-4 px-2 font-serif italic font-light text-[2rem] text-ivory hover:text-gold transition-colors"
                    activeProps={{ className: "text-gold", "aria-current": "page" }}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="px-6 pb-10 pt-4 border-t border-hairline"
            >
              <a
                href="tel:+33476271375"
                onClick={() => setOpen(false)}
                className="btn-primary w-full !py-4 text-[15px]"
              >
                <Phone size={16} aria-hidden="true" /> +33 4 76 27 13 75
              </a>
              <p className="text-center eyebrow mt-5">
                Ouvert 7/7 · 12h–14h · 19h–21h30
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
