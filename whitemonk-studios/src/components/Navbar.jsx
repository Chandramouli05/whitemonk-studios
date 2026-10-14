import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo.jsx";
import { NAV_LINKS } from "../brand.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-brand z-[70]"
      />
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-4 inset-x-0 z-50 px-4"
      >
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full pl-5 pr-2 py-2 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]" : "border border-transparent"
          }`}
        >
          <a href="#top" aria-label="Whitemonk Studios — home" className="text-[15px]">
            <Logo markClassName="h-7 w-auto" />
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 text-sm text-white/70 hover:text-white transition-colors group"
                >
                  {l.label}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgb(var(--brand)/0.6)]"
            >
              Book a Discovery Call <ArrowUpRight size={16} />
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className="md:hidden grid h-10 w-10 place-items-center rounded-full glass"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-8"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-5xl font-semibold py-2 hover:text-brand transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold"
            >
              Book a Discovery Call <ArrowUpRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
