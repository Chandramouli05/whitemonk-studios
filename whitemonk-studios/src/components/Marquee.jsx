import React from "react";
import { MARQUEE_WORDS } from "../brand.js";
import { LogoMark } from "./Logo.jsx";

function Row({ reverse = false, outline = false, slow = false }) {
  // content is duplicated so translateX(-50%) loops seamlessly
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div className="flex overflow-hidden select-none">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {items.map((w, i) => (
              <React.Fragment key={`${dup}-${i}`}>
                <span
                  className={`font-display font-extrabold whitespace-nowrap text-[clamp(2.5rem,7vw,6rem)] leading-none ${
                    outline ? "text-outline" : "text-white"
                  }`}
                >
                  {w}
                </span>
                <LogoMark variant="color" className="h-6 md:h-9 w-auto shrink-0 opacity-90" />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section aria-label="What we do" className="relative border-y border-white/10 bg-black/40 py-8 space-y-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-ink to-transparent" />
      <Row />
      <Row reverse outline slow />
    </section>
  );
}
