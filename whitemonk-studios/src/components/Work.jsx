import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowUpRight, TrendingUp, Heart, MessageCircle, Eye } from "lucide-react";
import { Reveal, SplitWords, SectionLabel } from "./Reveal.jsx";
import { IMG } from "../brand.js";

const FILTERS = ["All", "Branding", "Web", "Reels", "Ads"];

const PROJECTS = [
  {
    id: 1,
    cat: "Branding",
    title: "Kaveri Home Store — Rebrand",
    sub: "From a 40-year-old family shop to a modern lifestyle label",
    img: IMG.shop2,
    span: "md:col-span-2 md:row-span-2",
    tall: true,
    metrics: ["+212% walk-ins", "New packaging in 11 stores"],
  },
  {
    id: 2,
    cat: "Web",
    title: "Nila Organics — Flagship Store",
    sub: "Headless storefront, 1.1s LCP",
    img: IMG.web,
    span: "",
    metrics: ["+61% conversion", "2.3x AOV"],
  },
  {
    id: 3,
    cat: "Reels",
    title: "The Corner Closet — Reel Engine",
    sub: "Weekly Reels & Shorts for a neighbourhood boutique",
    img: IMG.phone,
    span: "",
    video: true,
    stats: { views: "12.4M", likes: "880K", comments: "14K" },
    metrics: ["12.4M views on one Reel"],
  },
  {
    id: 4,
    cat: "Ads",
    title: "Urban Kicks — Scale Campaign",
    sub: "Meta + Google full-funnel in 90 days",
    img: IMG.ads,
    span: "md:col-span-2",
    metrics: ["4.6x ROAS", "−38% CAC", "₹1.2Cr tracked revenue"],
  },
  {
    id: 5,
    cat: "Branding",
    title: "Saffron & Co. — Identity",
    sub: "Visual system for a gourmet retail chain",
    img: IMG.shop3,
    span: "",
    metrics: ["Brand bible + 40 assets"],
  },
  {
    id: 6,
    cat: "Reels",
    title: "FitFuel — Short-Form Series",
    sub: "Shot on location, cut for retention",
    img: IMG.edit,
    span: "",
    video: true,
    stats: { views: "6.8M", likes: "412K", comments: "7.2K" },
    metrics: ["6.8M views in 30 days"],
  },
];

function ReelOverlay({ stats }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur-md border border-white/30 transition-transform duration-500 group-hover:scale-110 group-hover:bg-brand group-hover:border-brand">
        <Play fill="white" size={22} className="translate-x-0.5" />
      </span>
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4 text-xs text-white/90">
        <span className="flex flex-col items-center gap-1"><Heart size={20} />{stats.likes}</span>
        <span className="flex flex-col items-center gap-1"><MessageCircle size={20} />{stats.comments}</span>
        <span className="flex flex-col items-center gap-1"><Eye size={20} />{stats.views}</span>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState("All");
  const items = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel index="03">Case Studies</SectionLabel>
        </Reveal>
        <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.2rem,6vw,5rem)]">
            <SplitWords text="Work that moves product, not just pixels." />
          </h2>
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-5 py-2 text-sm transition-all ${
                  filter === f ? "bg-brand text-white shadow-[0_0_25px_rgb(var(--brand)/0.5)]" : "glass text-white/70 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-14 grid auto-rows-[260px] gap-5 md:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`gradient-border group relative overflow-hidden rounded-3xl cursor-pointer ${p.span}`}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-brand/0 group-hover:bg-brand/10 transition-colors duration-500" />
                {p.video && <ReelOverlay stats={p.stats} />}

                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full glass px-3 py-1 text-[11px] uppercase tracking-widest">{p.cat}</span>
                </div>
                <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full glass opacity-0 -translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <ArrowUpRight size={18} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-xl md:text-2xl font-bold leading-tight">{p.title}</h3>
                  <p className="mt-1 text-sm text-white/65">{p.sub}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="inline-flex items-center gap-1.5 rounded-full bg-black/50 border border-white/15 backdrop-blur px-3 py-1 text-xs"
                      >
                        <TrendingUp size={12} className="text-brand" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-xs text-white/35">
          Client names and figures shown are illustrative placeholders — replace them in <code>src/components/Work.jsx</code> with your real case studies.
        </p>
      </div>
    </section>
  );
}
