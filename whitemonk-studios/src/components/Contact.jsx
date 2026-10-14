import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";
import Logo from "./Logo.jsx";
import { Reveal, SplitWords, SectionLabel } from "./Reveal.jsx";
import { BRAND, NAV_LINKS } from "../brand.js";

const SERVICES = ["Branding", "Web", "Reels", "Ads"];
const BUDGETS = [
  "Under ₹50K / month",
  "₹50K – ₹1.5L / month",
  "₹1.5L – ₹5L / month",
  "₹5L+ / month",
  "One-time project",
  "Not sure yet",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
  const [picked, setPicked] = useState([]);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const toggle = (s) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email";
    if (!picked.length) er.services = "Pick at least one service";
    setErrors(er);
    if (Object.keys(er).length) return;

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || "-"}`,
      `Company: ${form.company || "-"}`,
      `Services: ${picked.join(", ")}`,
      `Budget: ${form.budget || "-"}`,
      "",
      form.message || "(no message)",
    ].join("\n");
    // Opens the visitor's mail client. Replace with your API / Formspree / Resend call when ready.
    window.location.href = `mailto:${BRAND.email}?subject=${encodeURIComponent(
      `New enquiry from ${form.name}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", phone: "", company: "", budget: "", message: "" });
    setPicked([]);
  };

  const field =
    "w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3.5 text-sm placeholder:text-white/30 outline-none transition focus:border-brand focus:bg-white/[0.07] focus:shadow-[0_0_0_4px_rgb(var(--brand)/0.15)]";

  const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Hi Whitemonk Studios, I'd like to book a discovery call.")}`;

  return (
    <>
      <section id="contact" className="relative py-28 md:py-36 overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[160px]" />
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <SectionLabel index="05">Contact</SectionLabel>
          </Reveal>
          <div className="mt-6 grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display font-extrabold leading-[0.98] tracking-tight text-[clamp(2.4rem,6vw,5.2rem)]">
                <SplitWords text="Let's put your brand on the global screen." />
              </h2>
              <Reveal delay={0.2} className="mt-6 max-w-md text-white/60 text-lg">
                Book a free 30-minute discovery call. You'll leave with a clear plan — whether you hire us or not.
              </Reveal>

              <Reveal delay={0.3} className="mt-10 space-y-4">
                <a href={`mailto:${BRAND.email}`} className="group flex items-center gap-4 rounded-2xl glass p-4 transition hover:border-brand/60">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand group-hover:bg-brand group-hover:text-white transition"><Mail size={20} /></span>
                  <span>
                    <span className="block text-xs text-white/45">Email</span>
                    <span className="font-medium">{BRAND.email}</span>
                  </span>
                </a>
                <a href={wa} target="_blank" rel="noreferrer" className="group flex items-center gap-4 rounded-2xl glass p-4 transition hover:border-brand/60">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand group-hover:bg-brand group-hover:text-white transition"><MessageCircle size={20} /></span>
                  <span>
                    <span className="block text-xs text-white/45">WhatsApp</span>
                    <span className="font-medium">{BRAND.whatsappLabel}</span>
                  </span>
                </a>
                <div className="flex items-center gap-4 rounded-2xl glass p-4">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand"><MapPin size={20} /></span>
                  <span>
                    <span className="block text-xs text-white/45">Studio</span>
                    <span className="font-medium">{BRAND.location}</span>
                  </span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="gradient-border glass relative rounded-3xl p-6 md:p-10 min-h-[560px]">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex h-full min-h-[480px] flex-col items-center justify-center text-center"
                    >
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }}>
                        <CheckCircle2 size={72} className="text-brand" />
                      </motion.div>
                      <h3 className="mt-6 font-display text-3xl font-bold">Brief received.</h3>
                      <p className="mt-3 max-w-sm text-white/60">
                        Your email app should have opened with the details. Send it and we'll reply within one business day.
                      </p>
                      <button onClick={reset} className="mt-8 rounded-full glass px-6 py-3 text-sm hover:bg-white/10 transition">
                        Send another brief
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <input className={field} placeholder="Your name *" value={form.name} onChange={set("name")} aria-label="Your name" />
                          {errors.name && <p className="mt-1 text-xs text-brand">{errors.name}</p>}
                        </div>
                        <div>
                          <input className={field} type="email" placeholder="Email *" value={form.email} onChange={set("email")} aria-label="Email" />
                          {errors.email && <p className="mt-1 text-xs text-brand">{errors.email}</p>}
                        </div>
                        <input className={field} placeholder="Phone / WhatsApp" value={form.phone} onChange={set("phone")} aria-label="Phone" />
                        <input className={field} placeholder="Business name" value={form.company} onChange={set("company")} aria-label="Business name" />
                      </div>

                      <div>
                        <div className="mb-3 text-sm text-white/60">What do you need?</div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                          {SERVICES.map((s) => {
                            const on = picked.includes(s);
                            return (
                              <label
                                key={s}
                                className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm transition select-none ${
                                  on ? "border-brand bg-brand/15 text-white" : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/30"
                                }`}
                              >
                                <input type="checkbox" className="sr-only" checked={on} onChange={() => toggle(s)} />
                                <span className={`grid h-4 w-4 place-items-center rounded border transition ${on ? "bg-brand border-brand" : "border-white/30"}`}>
                                  {on && <span className="text-[10px] leading-none">✓</span>}
                                </span>
                                {s}
                              </label>
                            );
                          })}
                        </div>
                        {errors.services && <p className="mt-2 text-xs text-brand">{errors.services}</p>}
                      </div>

                      <select className={`${field} appearance-none`} value={form.budget} onChange={set("budget")} aria-label="Budget">
                        <option value="" className="bg-neutral-900">Budget range</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b} className="bg-neutral-900">{b}</option>
                        ))}
                      </select>

                      <textarea
                        className={`${field} min-h-[130px] resize-y`}
                        placeholder="Tell us about your business and what you want to achieve…"
                        value={form.message}
                        onChange={set("message")}
                        aria-label="Message"
                      />

                      <button
                        type="submit"
                        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand py-4 font-semibold transition-all hover:bg-white hover:text-black hover:shadow-[0_0_45px_rgb(var(--brand)/0.5)]"
                      >
                        Book my discovery call
                        <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-white/10 pt-16 pb-10 overflow-hidden">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            <div className="max-w-xs">
              <Logo markClassName="h-10 w-auto" className="text-xl" />
              <p className="mt-5 text-sm text-white/50">
                Brand, web, viral content and performance ads — one studio taking retail brands from local shelf to global screen.
              </p>
            </div>
            <nav className="grid grid-cols-2 gap-x-16 gap-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="text-white/60 hover:text-brand transition-colors">{l.label}</a>
              ))}
            </nav>
            <div className="flex gap-3">
              {[
                { i: Instagram, href: BRAND.instagram, l: "Instagram" },
                { i: Linkedin, href: BRAND.linkedin, l: "LinkedIn" },
                { i: Youtube, href: BRAND.youtube, l: "YouTube" },
              ].map(({ i: Icon, href, l }) => (
                <a key={l} href={href} target="_blank" rel="noreferrer" aria-label={l} className="grid h-11 w-11 place-items-center rounded-full glass hover:bg-brand hover:border-brand transition">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-14 select-none text-center font-display font-extrabold leading-none text-outline opacity-20 text-[clamp(3rem,15vw,12rem)]">
            WHITEMONK
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
            <span>© {new Date().getFullYear()} Whitemonk Studios. All rights reserved.</span>
            <a href="#top" className="inline-flex items-center gap-2 hover:text-white transition">
              Back to top <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
