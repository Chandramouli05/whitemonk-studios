import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, useInView } from "framer-motion";
import { ArrowDownRight, ArrowRight, Play, TrendingUp, Eye, Rocket } from "lucide-react";
import { LogoMark } from "./Logo.jsx";
import { SplitWords } from "./Reveal.jsx";
import { IMG } from "../brand.js";

function Counter({ to, decimals = 0, suffix = "", prefix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const STATS = [
  { icon: Eye, to: 50, suffix: "M+", label: "Reels views generated", decimals: 0 },
  { icon: TrendingUp, to: 3.8, suffix: "x", label: "Average retail ROAS", decimals: 1 },
  { icon: Rocket, to: 120, suffix: "+", label: "Brands launched & scaled", decimals: 0 },
];

const ROTATING = ["Branding", "Web", "Reels", "Ads"];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  // pointer parallax for the floating mark + glow
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rx = useTransform(sy, [-1, 1], [8, -8]);
  const ry = useTransform(sx, [-1, 1], [-10, 10]);
  const tx = useTransform(sx, [-1, 1], [-24, 24]);
  const ty = useTransform(sy, [-1, 1], [-24, 24]);

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden pt-32 pb-20 flex items-center"
    >
      {/* backdrop */}
      <div className="absolute inset-0 -z-10">
        <img src={IMG.hero} alt="" className="h-full w-full object-cover opacity-[0.18] grayscale" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <motion.div
          style={{ x: tx, y: ty }}
          className="absolute -top-40 -right-40 h-[620px] w-[620px] rounded-full bg-brand/30 blur-[140px]"
        />
        <motion.div
          style={{ x: useTransform(tx, (v) => -v), y: useTransform(ty, (v) => -v) }}
          className="absolute -bottom-52 -left-40 h-[520px] w-[520px] rounded-full bg-brand-deep/40 blur-[140px]"
        />
      </div>

      {/* floating logo mark */}
      <motion.div
        style={{ rotateX: rx, rotateY: ry, x: tx, y: ty, perspective: 900 }}
        className="pointer-events-none absolute right-[-6%] top-[18%] hidden lg:block w-[44vw] max-w-[640px] opacity-[0.16]"
      >
        <div className="animate-float">
          <LogoMark variant="color" className="w-full h-auto drop-shadow-[0_30px_80px_rgba(237,32,36,0.35)]" />
        </div>
      </motion.div>

      <div className="mx-auto w-full max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs tracking-widest uppercase text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          Creative & Growth Agency · Taking on 3 new brands this quarter
        </motion.div>

        <h1 className="mt-8 font-display font-extrabold leading-[0.95] tracking-tight text-[clamp(2.9rem,9vw,8.2rem)]">
          <SplitWords text="From Local Shelf" delay={0.35} />
          <br />
          <span className="text-outline">
            <SplitWords text="to Global" delay={0.6} />
          </span>{" "}
          <span className="relative inline-block text-brand">
            <SplitWords text="Screen." delay={0.8} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-2xl text-lg md:text-xl text-white/65 leading-relaxed"
        >
          One partner for the entire funnel. We build the{" "}
          <span className="relative inline-block h-[1.4em] w-[5.2ch] align-bottom overflow-hidden text-white font-semibold">
            {ROTATING.map((w, i) => (
              <motion.span
                key={w}
                className="absolute left-0 top-0 text-brand"
                animate={{ y: i === idx ? "0%" : i === (idx + ROTATING.length - 1) % ROTATING.length ? "-110%" : "110%", opacity: i === idx ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {w}
              </motion.span>
            ))}
          </span>{" "}
          that turns a neighbourhood brand into a name people scroll for — identity, flagship web experiences,
          viral Reels &amp; Shorts, and paid ads that scale what works.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#services"
            className="group inline-flex items-center gap-3 rounded-full bg-brand px-7 py-4 font-semibold text-white transition-all hover:bg-white hover:text-black hover:shadow-[0_0_50px_rgb(var(--brand)/0.55)]"
          >
            Explore Services
            <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </a>
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full glass px-7 py-4 font-semibold text-white transition-all hover:border-white/40 hover:bg-white/10"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 group-hover:bg-brand transition-colors">
              <Play size={12} fill="currentColor" />
            </span>
            View Our Work
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + i * 0.12, duration: 0.8 }}
              whileHover={{ y: -6 }}
              className="gradient-border glass rounded-2xl p-6"
            >
              <s.icon className="text-brand mb-4" size={22} />
              <div className="font-display text-4xl md:text-5xl font-bold tracking-tight">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-white/55">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
