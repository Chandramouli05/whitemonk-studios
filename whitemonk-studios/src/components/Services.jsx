import React from "react";
import { motion } from "framer-motion";
import { Fingerprint, MonitorSmartphone, Clapperboard, Megaphone, ArrowUpRight } from "lucide-react";
import { Reveal, SplitWords, SectionLabel } from "./Reveal.jsx";
import { IMG } from "../brand.js";

const SERVICES = [
  {
    icon: Fingerprint,
    title: "Brand Identity & Positioning",
    img: IMG.brand,
    desc: "Naming, logo systems, packaging, tone of voice and a brand bible that makes you unmistakable on shelf and on screen.",
    tags: ["Logo & motion mark", "Packaging", "Brand bible", "Tone of voice"],
  },
  {
    icon: MonitorSmartphone,
    title: "UI/UX & Web Development",
    img: IMG.web,
    desc: "Story-led, lightning-fast storefronts and sites. Custom React, headless commerce and Shopify builds engineered for conversion.",
    tags: ["E-commerce", "React / Next.js", "Shopify", "CRO"],
  },
  {
    icon: Clapperboard,
    title: "Short-Form Reels / Shorts Production & Strategy",
    img: IMG.reels,
    desc: "Hook-first scripting, shooting and editing for Reels, TikTok and YouTube Shorts — a weekly content engine, not random posts.",
    tags: ["Scripting", "Shoot & edit", "Creators", "Community"],
  },
  {
    icon: Megaphone,
    title: "Performance Marketing & Ad Campaigns",
    img: IMG.ads,
    desc: "Meta, Google and YouTube campaigns with retargeting loops and offer testing, reported weekly and scaled on proven creative.",
    tags: ["Meta Ads", "Google Ads", "Retargeting", "Analytics"],
  },
];

function Card({ s, i }) {
  return (
    <Reveal delay={(i % 2) * 0.12} className="h-full">
      <motion.article
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="gradient-border group relative h-full overflow-hidden rounded-3xl glass min-h-[420px] cursor-pointer"
      >
        <motion.img
          src={s.img}
          alt=""
          variants={{ rest: { scale: 1.02, opacity: 0.22 }, hover: { scale: 1.12, opacity: 0.5 } }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-brand/40 blur-[90px]"
        />

        <div className="relative flex h-full min-h-[420px] flex-col justify-between p-8">
          <div className="flex items-start justify-between">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand group-hover:border-brand transition-colors duration-500">
              <s.icon size={26} />
            </span>
            <span className="font-display text-sm text-white/30">0{i + 1}</span>
          </div>

          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold leading-tight">{s.title}</h3>
            <motion.div
              variants={{ rest: { height: 0, opacity: 0 }, hover: { height: "auto", opacity: 1 } }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-white/70 leading-relaxed">{s.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-brand transition-colors">
              <a href="#contact">Start this project</a>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative py-28 md:py-36 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel index="02">Services</SectionLabel>
        </Reveal>
        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="max-w-3xl font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.2rem,6vw,5rem)]">
            <SplitWords text="Everything a brand needs. One studio." />
          </h2>
          <Reveal delay={0.15} className="max-w-sm text-white/60">
            No hand-offs between five agencies. Strategy, design, build, content and ads share one team and one goal:
            revenue.
          </Reveal>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <Card key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
