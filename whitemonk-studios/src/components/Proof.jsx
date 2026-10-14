import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star, Sparkles, ArrowRight } from "lucide-react";
import { Reveal, SplitWords, SectionLabel } from "./Reveal.jsx";
import { IMG } from "../brand.js";

/* ------------------------- ROI / growth estimator ------------------------- */

const CURRENCIES = {
  INR: { symbol: "₹", locale: "en-IN", min: 100000, max: 10000000, step: 50000, rev: 1000000, ads: 200000 },
  USD: { symbol: "$", locale: "en-US", min: 2000, max: 200000, step: 1000, rev: 20000, ads: 4000 },
};

const LEVERS = [
  { id: "brand", label: "Brand Identity", note: "+12% conversion from trust & clarity" },
  { id: "web", label: "Web / E-commerce", note: "+30% conversion from a faster storefront" },
  { id: "reels", label: "Reels & Shorts", note: "Organic reach adds ~22% more revenue" },
  { id: "ads", label: "Performance Ads", note: "Scaled spend at ~3.8x ROAS" },
];

function Estimator() {
  const [cur, setCur] = useState("INR");
  const C = CURRENCIES[cur];
  const [revenue, setRevenue] = useState(C.rev);
  const [adBudget, setAdBudget] = useState(C.ads);
  const [on, setOn] = useState({ brand: true, web: true, reels: true, ads: true });

  const switchCur = (c) => {
    setCur(c);
    setRevenue(CURRENCIES[c].rev);
    setAdBudget(CURRENCIES[c].ads);
  };

  const fmt = (n) =>
    C.symbol +
    new Intl.NumberFormat(C.locale, { notation: "compact", maximumFractionDigits: 1 }).format(Math.round(n));

  const result = useMemo(() => {
    let lift = 1;
    if (on.brand) lift += 0.12;
    if (on.web) lift += 0.3;
    const base = revenue * lift;
    const organic = on.reels ? revenue * 0.22 * (on.brand ? 1.1 : 1) : 0;
    const paid = on.ads ? adBudget * 3.8 : 0;
    const projected = base + organic + paid;
    const growth = ((projected - revenue) / revenue) * 100;
    const views = on.reels ? Math.round((revenue / (cur === "INR" ? 1000000 : 20000)) * 2.4 * 10) / 10 : 0;
    return { projected, growth, views, paid, organic, base };
  }, [revenue, adBudget, on, cur]);

  const fill = (v, min, max) => `${((v - min) / (max - min)) * 100}%`;

  return (
    <div className="gradient-border glass rounded-3xl p-6 md:p-10 grid gap-10 lg:grid-cols-2">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-brand" size={22} /> Growth Estimator
          </h3>
          <div className="flex rounded-full glass p-1 text-xs">
            {Object.keys(CURRENCIES).map((c) => (
              <button
                key={c}
                onClick={() => switchCur(c)}
                className={`rounded-full px-3 py-1 transition ${cur === c ? "bg-brand text-white" : "text-white/60"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-2 text-sm text-white/55">Rough 90-day projection. Drag, toggle, see what a full-funnel push could do.</p>

        <div className="mt-8 space-y-8">
          <div>
            <div className="flex justify-between text-sm">
              <label htmlFor="rev" className="text-white/70">Current monthly revenue</label>
              <span className="font-semibold">{fmt(revenue)}</span>
            </div>
            <input
              id="rev"
              type="range"
              min={C.min}
              max={C.max}
              step={C.step}
              value={revenue}
              style={{ "--fill": fill(revenue, C.min, C.max) }}
              onChange={(e) => setRevenue(+e.target.value)}
              className="mt-3"
            />
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <label htmlFor="ads" className="text-white/70">Monthly ad budget</label>
              <span className="font-semibold">{fmt(adBudget)}</span>
            </div>
            <input
              id="ads"
              type="range"
              min={C.min / 5}
              max={C.max / 3}
              step={C.step / 2}
              value={adBudget}
              style={{ "--fill": fill(adBudget, C.min / 5, C.max / 3) }}
              onChange={(e) => setAdBudget(+e.target.value)}
              className="mt-3"
              disabled={!on.ads}
            />
          </div>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2">
          {LEVERS.map((l) => (
            <button
              key={l.id}
              onClick={() => setOn((s) => ({ ...s, [l.id]: !s[l.id] }))}
              aria-pressed={on[l.id]}
              className={`rounded-2xl border p-4 text-left transition-all ${
                on[l.id] ? "border-brand/70 bg-brand/10" : "border-white/10 bg-white/[0.02] opacity-70 hover:opacity-100"
              }`}
            >
              <div className="flex items-center justify-between text-sm font-semibold">
                {l.label}
                <span className={`h-4 w-4 rounded-full border-2 transition ${on[l.id] ? "bg-brand border-brand" : "border-white/30"}`} />
              </div>
              <div className="mt-1 text-xs text-white/50">{l.note}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-black/50 border border-white/10 p-8 flex flex-col justify-between">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand/30 blur-[90px]" />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.3em] text-white/45">Projected monthly revenue</div>
          <motion.div
            key={Math.round(result.projected)}
            initial={{ opacity: 0.5, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 font-display text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            {fmt(result.projected)}
          </motion.div>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand/15 border border-brand/40 px-3 py-1 text-sm text-brand font-semibold">
            ▲ {Math.round(result.growth)}% vs today
          </div>

          <div className="mt-8 space-y-3">
            {[
              { label: "Conversion-led revenue", v: result.base, c: "bg-white" },
              { label: "Organic via Reels & Shorts", v: result.organic, c: "bg-brand" },
              { label: "Paid ads revenue", v: result.paid, c: "bg-brand-deep" },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between text-xs text-white/60">
                  <span>{r.label}</span>
                  <span>{fmt(r.v)}</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${r.c}`}
                    animate={{ width: `${Math.min(100, (r.v / result.projected) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 18 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-8">
          {on.reels && (
            <div className="text-sm text-white/60 mb-4">
              Estimated reach: <span className="text-white font-semibold">{result.views}M+ views / month</span>
            </div>
          )}
          <a
            href="#contact"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand py-4 font-semibold transition hover:bg-white hover:text-black"
          >
            Get my real plan <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <p className="mt-3 text-[11px] text-white/35 text-center">
            Illustrative model based on typical retail results. Actual outcomes vary.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Testimonials ------------------------------ */

const TESTIMONIALS = [
  {
    quote:
      "We went from a single shop and a hand-painted sign to a brand people DM us about. Whitemonk handled identity, the website and the Reels — our online orders tripled in a quarter.",
    name: "Meera Raghavan",
    role: "Founder, Kaveri Home Store",
    img: IMG.av1,
    stat: "3x online orders",
  },
  {
    quote:
      "Our agency before this had four vendors that never talked to each other. Whitemonk is one team, one dashboard. The ad spend finally makes sense — ROAS has stayed above 4x for six months.",
    name: "Arjun Mehta",
    role: "Co-founder, Urban Kicks",
    img: IMG.av2,
    stat: "4.6x ROAS",
  },
  {
    quote:
      "One Reel they scripted crossed 12 million views and our stock was gone in a weekend. The content engine is the best investment we've made.",
    name: "Priya Nair",
    role: "Owner, The Corner Closet",
    img: IMG.av3,
    stat: "12.4M views",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 6500);
    return () => clearInterval(t);
  }, [paused]);
  const t = TESTIMONIALS[i];
  const go = (d) => setI((x) => (x + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative mt-24"
    >
      <div className="gradient-border glass relative overflow-hidden rounded-3xl p-8 md:p-14">
        <Quote className="absolute right-8 top-8 text-brand/20" size={120} />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end"
          >
            <div>
              <div className="flex gap-1 text-brand">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="mt-6 max-w-3xl font-display text-2xl md:text-3xl font-medium leading-snug">“{t.quote}”</p>
              <div className="mt-8 flex items-center gap-4">
                <img src={t.img} alt={t.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-brand/60" />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-white/55">{t.role}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-brand px-6 py-4 font-display text-xl font-bold text-center md:self-start">
              {t.stat}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              aria-label={`Show testimonial ${k + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-10 bg-brand" : "w-4 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-brand transition">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => go(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-brand transition">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-white/35">Testimonials are sample copy — replace with real client quotes in <code>src/components/Proof.jsx</code>.</p>
    </div>
  );
}

export default function Proof() {
  return (
    <section id="proof" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel index="04">Proof & Projection</SectionLabel>
        </Reveal>
        <h2 className="mt-6 max-w-4xl font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.2rem,6vw,5rem)]">
          <SplitWords text="See the upside before you sign." />
        </h2>
        <Reveal delay={0.1} className="mt-14">
          <Estimator />
        </Reveal>
        <Testimonials />
      </div>
    </section>
  );
}
