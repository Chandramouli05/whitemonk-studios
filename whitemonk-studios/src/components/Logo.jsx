import React, { useId } from "react";

/**
 * Whitemonk Studios logo — rebuilt from the supplied Asset 1.svg.
 *
 * Variants (mirrors the brand sheet):
 *   "color"   → red + silver gradient mark (use on dark or light)
 *   "mono"    → solid white mark (dark backgrounds)
 *   "outline" → thin line mark (light backgrounds)
 *
 * <Logo />                      icon + wordmark lockup
 * <Logo iconOnly />             just the "W" mark
 * <Logo textColor="#0A0A0A" />  wordmark colour for light backgrounds
 */

const SILVER =
  "M56.12,44.58,92,12.13l37.59,34.81q-.34,33.56-.7,67.12-20.4-19.05-41-38.75Q71.81,59.91,56.12,44.58Z";
const RIGHT = "M131.5,46.87q-.5,33.59-1,67.19l55.26-53.93L186,2Z";
const RED = "M55.36,112,55,46.38,0,0,0,52.6Z";
const FOLD =
  "M88.46,80.06l-33.1,32L55,46.38Q64.18,56.1,74.08,66,81.31,73.21,88.46,80.06Z";

export function LogoMark({ variant = "color", className = "" }) {
  const id = useId().replace(/:/g, "");
  const g = (n) => `${id}-${n}`;

  const common = {
    viewBox: "0 0 185.99 115.24",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    role: "img",
    "aria-label": "Whitemonk Studios logo mark",
  };

  if (variant === "outline") {
    return (
      <svg {...common}>
        <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d={SILVER} />
          <path d={RIGHT} />
          <path d={RED} />
          <path d={FOLD} />
        </g>
      </svg>
    );
  }

  if (variant === "mono") {
    return (
      <svg {...common}>
        <defs>
          <clipPath id={g("clip")}>
            <path d={RED} />
          </clipPath>
          <linearGradient id={g("sh")} x1="55" y1="0" x2="44" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#000" stopOpacity="0.5" />
            <stop offset="1" stopColor="#000" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="#fdfdfd">
          <path d={SILVER} />
          <path d={RIGHT} />
          <path d={RED} />
          <path d={FOLD} />
        </g>
        <rect x="42" y="38" width="14" height="76" fill={`url(#${g("sh")})`} clipPath={`url(#${g("clip")})`} />
      </svg>
    );
  }

  // full colour
  return (
    <svg {...common}>
      <defs>
        <linearGradient id={g("a")} x1="56.12" y1="63.1" x2="129.56" y2="63.1" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f1f2f2" />
          <stop offset="0.37" stopColor="#eeeff0" />
          <stop offset="0.6" stopColor="#e6e7e8" />
          <stop offset="0.79" stopColor="#d7d9da" />
          <stop offset="0.95" stopColor="#c3c5c7" />
          <stop offset="1" stopColor="#bcbec0" />
        </linearGradient>
        <linearGradient id={g("b")} x1="130.49" y1="58.02" x2="185.99" y2="58.02" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f1f2f2" />
          <stop offset="0.37" stopColor="#eeeff0" />
          <stop offset="0.6" stopColor="#e6e7e8" />
          <stop offset="0.79" stopColor="#d7d9da" />
          <stop offset="0.95" stopColor="#c3c5c7" />
          <stop offset="1" stopColor="#bcbec0" />
        </linearGradient>
        <linearGradient id={g("c")} x1="0.47" y1="36.07" x2="56.64" y2="77.21" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ed2024" />
          <stop offset="0.46" stopColor="#db1f2c" />
          <stop offset="0.53" stopColor="#d81f2d" />
          <stop offset="0.66" stopColor="#c51d28" />
          <stop offset="0.92" stopColor="#92171b" />
          <stop offset="1" stopColor="#821517" />
        </linearGradient>
        <linearGradient id={g("d")} x1="54.97" y1="79.2" x2="88.46" y2="79.2" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ed2024" />
          <stop offset="0.59" stopColor="#bb2025" />
          <stop offset="0.75" stopColor="#a81c20" />
          <stop offset="1" stopColor="#821517" />
        </linearGradient>
        {/* soft fold shadow (replaces the raster shadow in the source SVG) */}
        <linearGradient id={g("sh")} x1="55" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#000" stopOpacity="0.62" />
          <stop offset="0.5" stopColor="#000" stopOpacity="0.2" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <clipPath id={g("clip")}>
          <path d={RED} />
        </clipPath>
      </defs>
      <path d={SILVER} fill={`url(#${g("a")})`} />
      <path d={RIGHT} fill={`url(#${g("b")})`} />
      <path d={RED} fill={`url(#${g("c")})`} />
      <rect x="38" y="38" width="18" height="76" fill={`url(#${g("sh")})`} clipPath={`url(#${g("clip")})`} />
      <path d={FOLD} fill={`url(#${g("d")})`} />
    </svg>
  );
}

export default function Logo({
  variant = "color",
  iconOnly = false,
  textColor = "#ffffff",
  className = "",
  markClassName = "h-9 w-auto",
}) {
  if (iconOnly) return <LogoMark variant={variant} className={`${markClassName} ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} style={{ color: textColor }}>
      <LogoMark variant={variant} className={markClassName} />
      <span className="flex flex-col leading-none font-display select-none">
        <span className="font-extrabold tracking-tight text-[1.05em]">WHITEMONK</span>
        <span className="font-normal tracking-wide text-[0.95em] mt-[0.12em]">STUDIOS</span>
      </span>
    </span>
  );
}
