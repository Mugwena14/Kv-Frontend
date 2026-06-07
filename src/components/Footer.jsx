import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { INK } from "../constants/data";

const LIGHT = "rgba(255,255,255,0.72)";
const MUTED = "rgba(255,255,255,0.5)";
const RULE = "rgba(255,255,255,0.14)";

/* ---- Inline social glyphs (lucide dropped brand icons) ---- */
const InstagramIcon = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);
const TikTokIcon = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...p}>
    <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9v2.4c-1.2.1-2.3-.2-3.5-.8v5.7c0 3-2.1 5.3-5 5.3-2.8 0-4.9-2.1-4.9-4.8 0-2.8 2.2-4.8 5-4.6v2.5c-.4-.1-.8-.2-1.2-.1-1.2.1-2 .9-2 2.1 0 1.3 1 2.2 2.2 2.2 1.3 0 2.2-1 2.2-2.6V3h3.6z" />
  </svg>
);
const FacebookIcon = (p) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" {...p}>
    <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
  </svg>
);
const XIcon = (p) => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}>
    <path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1 2.5h6.8l4.7 6.3 5.7-6.3zm-1.2 17.6h1.8L7.1 4.3H5.2L17 20.1z" />
  </svg>
);

/* ---- Inline payment glyphs ---- */
const ApplePayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94 1.07.08 2.16-.52 2.82-1.33z" />
  </svg>
);
const VisaIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
    <path d="M10.02 17.02h2.36l1.47-9.04h-2.36l-1.47 9.04zm7.62-8.73c-.45-.19-.16-.79.68-.79.43 0 .84.1 1.2.29l.23.11.42-2.58a5.1 5.1 0 00-1.92-.35c-2.38 0-4.05 1.25-4.06 3.06-.02 1.33 1.2 2.07 2.11 2.51.93.45 1.25.74 1.24 1.15-.01.62-.75.9-1.45.9-.97 0-1.49-.15-2.28-.49l-.32-.15-.45 2.76c.75.34 2.13.63 3.56.65 2.53 0 4.17-1.24 4.2-3.16.03-1.05-.63-1.86-2.01-2.51zm-7.98.05l-2.3 6.13-.28-1.39-.99-4.74H3.72l3.41 9.03h2.51l4.71-9.03H9.66z" />
  </svg>
);
const MastercardIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
    <circle cx="8.2" cy="12" r="6.2" opacity="0.9" />
    <circle cx="15.8" cy="12" r="6.2" opacity="0.6" />
  </svg>
);

const SOCIALS = [InstagramIcon, TikTokIcon, FacebookIcon, XIcon];
const GATEWAYS = [
  { aria: "Apple Pay", icon: ApplePayIcon },
  { aria: "Visa", icon: VisaIcon },
  { aria: "Mastercard", icon: MastercardIcon },
];

// Instagram grid — swap for JV Kourt's real feed
const IG = [34579430, 31696422, 33232902, 12285563, 9471910, 6786706, 33232902, 34579430].map(
  (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=400`
);

export default function Footer({ setView }) {
  const go = (target) => {
    setView(target);
    window.scrollTo({ top: 0 });
  };

  const shop = [
    { label: "Shop", view: "shop" },
    { label: "Collections", view: "collections" },
    { label: "New Arrivals", view: "shop" },
    { label: "About", view: "about" },
  ];
  const care = [
    { label: "Delivery & PEP", view: "about" },
    { label: "Returns & Exchanges", view: "about" },
    { label: "Order Tracking", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Contact", href: "#" },
  ];

  const linkStyle = { color: LIGHT };
  const hoverIn = (e) => (e.currentTarget.style.color = "#fff");
  const hoverOut = (e) => (e.currentTarget.style.color = LIGHT);

  const renderLink = (l) =>
    l.view ? (
      <button
        onClick={() => go(l.view)}
        className="bg-transparent border-none p-0 cursor-pointer text-sm font-light transition-colors text-left"
        style={linkStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {l.label}
      </button>
    ) : (
      <a
        href={l.href}
        className="cursor-pointer text-sm font-light transition-colors"
        style={linkStyle}
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        {l.label}
      </a>
    );

  return (
    <footer style={{ background: INK }}>
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 py-16 sm:py-20">
        {/* Top */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_1fr_1.7fr] gap-12 lg:gap-10">
          {/* Brand + contact + social */}
          <div>
            <button
              onClick={() => go("shop")}
              className="bg-transparent border-none cursor-pointer p-0 text-left"
              style={{ color: "#fff", fontWeight: 800, fontSize: 22, letterSpacing: "0.14em", textTransform: "uppercase" }}
            >
              JV&nbsp;Kourt
            </button>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: MUTED, marginTop: 6 }}>
              Est. 2026
            </span>

            <div className="flex flex-col gap-3" style={{ marginTop: 22 }}>
              <span className="flex items-start gap-2.5 text-sm font-light" style={{ color: LIGHT }}>
                <MapPin size={15} className="shrink-0 mt-0.5" /> 123 Kloof Street, Pretoria, 8001
              </span>
              <span className="flex items-center gap-2.5 text-sm font-light" style={{ color: LIGHT }}>
                <Phone size={15} className="shrink-0" /> +27 21 123 4567
              </span>
              <span className="flex items-center gap-2.5 text-sm font-light" style={{ color: LIGHT }}>
                <Mail size={15} className="shrink-0" /> hello@jvkourt.co.za
              </span>
            </div>

            <div className="flex items-center gap-2.5" style={{ marginTop: 24 }}>
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center justify-center rounded-full transition-colors"
                  style={{ width: 36, height: 36, border: `1px solid ${RULE}`, color: LIGHT }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = INK; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = LIGHT; }}
                  aria-label="Social link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-white" style={{ marginBottom: 18 }}>
              Shop
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {shop.map((l) => <li key={l.label}>{renderLink(l)}</li>)}
            </ul>
          </div>

          {/* Customer care */}
          <div>
            <h4 className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-white" style={{ marginBottom: 18 }}>
              Customer Care
            </h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {care.map((l) => <li key={l.label}>{renderLink(l)}</li>)}
            </ul>
          </div>

          {/* Instagram */}
          <div>
            <h4 className="m-0 text-[11px] font-bold uppercase tracking-[0.2em] text-white" style={{ marginBottom: 18 }}>
              @jvkourt on Instagram
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {IG.map((src, i) => (
                <a
                  key={i}
                  href="#"
                  className="relative block aspect-square overflow-hidden group"
                  style={{ borderRadius: 3 }}
                  aria-label="Instagram post"
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <span
                    className="absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,0.25)" }}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar — copyright + payments */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          style={{ borderTop: `1px solid ${RULE}`, marginTop: 40, paddingTop: 28 }}
        >
          <span className="text-xs font-light" style={{ color: MUTED }}>
            © 2026 JV Kourt. All rights reserved. · Crafted in South Africa
          </span>

          <div className="flex items-center gap-2">
            {GATEWAYS.map(({ aria, icon: Icon }) => (
              <div
                key={aria}
                className="flex items-center justify-center transition-all duration-300"
                style={{ width: 46, height: 30, borderRadius: 5, border: `1px solid ${RULE}`, background: "rgba(255,255,255,0.03)", color: MUTED }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = RULE; e.currentTarget.style.color = MUTED; }}
                aria-label={aria}
              >
                <Icon />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}