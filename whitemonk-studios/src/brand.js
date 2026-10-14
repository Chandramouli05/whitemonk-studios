// ---------------------------------------------------------------
// Central brand + content config. Edit here, the whole site updates.
// Colours live in src/index.css (--brand / --brand-deep).
// The logo lives in src/components/Logo.jsx (built from Asset 1.svg).
// ---------------------------------------------------------------

export const BRAND = {
  name: "Whitemonk Studios",
  short: "Whitemonk",
  email: "hello@whitemonk.studio",
  whatsapp: "919999999999", // international format, no + or spaces
  whatsappLabel: "+91 99999 99999",
  instagram: "https://instagram.com/whitemonkstudios",
  linkedin: "https://linkedin.com/company/whitemonkstudios",
  youtube: "https://youtube.com/@whitemonkstudios",
  location: "India · Working worldwide",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Case Study", href: "#work" },
  { label: "Workflow", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const MARQUEE_WORDS = [
  "BRANDING",
  "VIRAL CONTENT",
  "WEB DESIGN",
  "PERFORMANCE ADS",
  "REELS & SHORTS",
  "E-COMMERCE",
  "GROWTH",
];

// Unsplash images (hot-linked). Swap with your own assets any time.
const u = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  hero: u("photo-1441986300917-64674bd600d8", 1600), // retail storefront
  brand: u("photo-1558655146-9f40138edfeb", 1200), // branding mockups
  web: u("photo-1460925895917-afdab827c52f", 1200), // dashboard / laptop
  reels: u("photo-1492691527719-9d1e07e534b4", 1200), // cinematography
  ads: u("photo-1551288049-bebda4e38f71", 1200), // analytics dashboard
  shop1: u("photo-1472851294608-062f824d29cc", 1200), // retail store
  shop2: u("photo-1556742049-0cfed4f6a45d", 1200), // product packaging
  shop3: u("photo-1607083206869-4c7672e72a8a", 1200), // shopping bags
  studio: u("photo-1522071820081-009f0129c71c", 1200), // team
  edit: u("photo-1574717024653-61fd2cf4d44c", 1200), // video editing
  phone: u("photo-1611162617213-7d7a39e9b1d7", 1200), // social on phone
  av1: u("photo-1494790108377-be9c29b29330", 200),
  av2: u("photo-1507003211169-0a1dd7228f2d", 200),
  av3: u("photo-1438761681033-6461ffad8d80", 200),
};
