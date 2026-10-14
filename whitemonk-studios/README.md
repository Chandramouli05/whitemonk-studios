# Whitemonk Studios — Agency Site

React 18 + Vite + Tailwind CSS 3 + Framer Motion + Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Where to edit

| What | Where |
| --- | --- |
| Brand colours | `src/index.css` → `--brand` (red `237 32 36`) and `--brand-deep` (`130 21 23`), as "R G B" |
| Logo | `src/components/Logo.jsx` (rebuilt from your `Asset 1.svg`; variants `color`, `mono`, `outline`) |
| Email / WhatsApp / socials / images | `src/brand.js` |
| Case studies | `src/components/Work.jsx` |
| Testimonials + estimator maths | `src/components/Proof.jsx` |
| Form delivery | `submit()` in `src/components/Contact.jsx` (currently opens a `mailto:`; swap in Formspree / Resend / your API) |

## Notes

- The source SVG embedded a raster fold shadow; in `Logo.jsx` it is replaced by a vector gradient so the mark stays crisp at any size.
- Client names, metrics and testimonials are illustrative placeholders — replace before launch.
- Images are hot-linked from Unsplash; swap for your own assets for production.
- Motion respects `prefers-reduced-motion`.
