import React from "react";
import { motion } from "framer-motion";

/** Scroll-reveal wrapper with optional stagger delay. */
export function Reveal({ children, delay = 0, y = 36, className = "", as = "div", once = true }) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Splits a headline into words that rise in one after another. */
export function SplitWords({ text, className = "", delay = 0, stagger = 0.07 }) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({ index, children }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50 font-medium">
      <span className="text-brand">{index}</span>
      <span className="h-px w-10 bg-white/20" />
      <span>{children}</span>
    </div>
  );
}
