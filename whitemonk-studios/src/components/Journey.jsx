import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fingerprint, Globe2, Clapperboard, Megaphone, Check, ArrowRight } from "lucide-react";
import { Reveal, SplitWords, SectionLabel } from "./Reveal.jsx";
import { IMG } from "../brand.js";

const PHASES = [
  {
    n: "01",
    icon: Fingerprint,
    title: "Visual Identity & Brand Bible",
    tag: "Weeks 1–3",
    img: IMG.brand,
    blurb:
      "We strip the business back to its truth, then rebuild it as a brand people remember: name story, logo system, colour, type, packaging and a brand bible every future designer can follow.",
    points: ["Positioning & audience workshop", "Logo system + motion mark", "Packaging & in-store graphics", "Brand bible (PDF + Figma)"],
    metric: "Recognition ↑ 2.4x",
  },
  {
    n: "02",
    icon: Globe2,
    title: "Flagship E-Commerce / Web Platform",
    tag: "Weeks 3–8",
    img: IMG.web,
    blurb:
      "A fast, story-led storefront engineered to convert — custom UI, headless or Shopify builds, payments, inventory sync and analytics wired in from day one.",
    points: ["UX flows built around conversion", "Custom React / Shopify development", "Core Web Vitals-grade performance", "Tracking, pixels & CRM integrations"],
    metric: "Conversion ↑ 61%",
  },
  {
    n: "03",
    icon: Clapperboard,
    title: "Viral Short-Form Content & Community Engine",
    tag: "Weeks 6–∞",
    img: IMG.reels,
    blurb:
      "A weekly content machine: scripted, shot and cut for Reels, TikTok and Shorts — with hooks tested against real retention curves, trends we jump on early and a community that talks back.",
    points: ["Hook-first scripting & shot lists", "On-site production + editing", "Trend & creator partnerships", "Community management"],
    metric: "50M+ views",
  },
  {
    n: "04",
    icon: Megaphone,
    title: "Paid Ads, Retargeting & Offer Scaling",
    tag: "Weeks 8–∞",
    img: IMG.ads,
    blurb:
      "We put budget behind the creative that already wins — structured Meta & Google campaigns, retargeting loops and offer testing that compound into profitable, predictable scale.",
    points: ["Creative-led Meta / Google / YouTube ads", "Full-funnel retargeting", "Offer & bundle testing", "Weekly dashboards, monthly strategy"],
    metric: "3.8x ROAS",
  },
];

export default function Journey() {
  const [active, setActive] = useState(0);
  const p = PHASES[active];

  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel index="01">The Retail Transformation Journey</SectionLabel>
        </Reveal>
        <h2 className="mt-6 max-w-4xl font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.2rem,6vw,5rem)]">
          <SplitWords text="Zero identity to global scale, in four moves." />
        </h2>
        <Reveal delay={0.15} className="mt-5 max-w-2xl text-white/60 text-lg">
          Pick a phase to see how a local retailer becomes a brand the internet can't ignore.
        </Reveal>

        {/* progress rail */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-0 relative">
          <div className="hidden md:block absolute top-[27px] left-[6%] right-[6%] h-px bg-white/10" />
          <motion.div
            className="hidden md:block absolute top-[27px] left-[6%] h-px bg-brand origin-left"
            animate={{ width: `${(active / (PHASES.length - 1)) * 88}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {PHASES.map((ph, i) => {
            const done = i <= active;
            return (
              <button
                key={ph.n}
                onClick={() => setActive(i)}
                className="relative flex md:flex-col items-center gap-3 text-left md:text-center group"
              >
                <span
                  className={`relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    done
                      ? "bg-brand border-brand shadow-[0_0_30px_rgb(var(--brand)/0.55)]"
                      : "bg-ink border-white/15 group-hover:border-white/40"
                  }`}
                >
                  <ph.icon size={22} className={done ? "text-white" : "text-white/60"} />
                </span>
                <span>
                  <span className={`block text-xs tracking-widest ${i === active ? "text-brand" : "text-white/40"}`}>
                    PHASE {ph.n}
                  </span>
                  <span className={`block text-sm font-medium max-w-[14ch] md:mx-auto ${i === active ? "text-white" : "text-white/50"}`}>
                    {ph.title.split(" & ")[0]}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* active card */}
        <div className="mt-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="gradient-border glass grid overflow-hidden rounded-3xl md:grid-cols-2"
            >
              <div className="relative min-h-[280px] md:min-h-[460px] overflow-hidden">
                <motion.img
                  src={p.img}
                  alt={p.title}
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-ink/70" />
                <div className="absolute left-6 top-6 font-display text-8xl font-extrabold text-white/90 mix-blend-overlay leading-none">
                  {p.n}
                </div>
                <div className="absolute bottom-6 left-6 rounded-full bg-brand px-4 py-2 text-sm font-semibold shadow-lg">
                  {p.metric}
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="text-xs tracking-[0.3em] uppercase text-brand">{p.tag}</div>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-bold leading-tight">{p.title}</h3>
                <p className="mt-5 text-white/65 leading-relaxed">{p.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt, i) => (
                    <motion.li
                      key={pt}
                      initial={{ opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-brand/20 text-brand">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {pt}
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => setActive((a) => Math.max(0, a - 1))}
                    disabled={active === 0}
                    className="rounded-full glass px-5 py-3 text-sm disabled:opacity-30 hover:bg-white/10 transition"
                  >
                    Back
                  </button>
                  {active < PHASES.length - 1 ? (
                    <button
                      onClick={() => setActive((a) => a + 1)}
                      className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-brand hover:text-white transition"
                    >
                      Next phase <ArrowRight size={16} />
                    </button>
                  ) : (
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold hover:bg-white hover:text-black transition"
                    >
                      Start phase 01 <ArrowRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
