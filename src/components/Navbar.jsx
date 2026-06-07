import React from "react";
import { ShoppingBag, Search, User, LayoutDashboard, Store, Menu } from "lucide-react";
import { INK } from "../constants/data";

const TICKER = [
  "Free delivery on orders over R850",
  "New season drop — live now",
  "Student discount · 10% off",
  "Shipped nationwide via PEP Paxi",
];

export default function Navbar({ view, setView, cartCount, setCartOpen }) {
  const go = (target) => {
    setView(target);
    window.scrollTo({ top: 0 });
  };

  const links = [
    { label: "Shop", view: "shop" },
    { label: "Collections", view: "collections" },
    { label: "About", view: "about" },
  ];

  return (
    <>
      <style>{`
        @keyframes jvTicker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .jv-ticker-track { animation: jvTicker 28s linear infinite; }
      `}</style>

      {/* Announcement ticker */}
      <div style={{ background: INK }} className="overflow-hidden">
        <div className="jv-ticker-track flex" style={{ width: "max-content" }}>
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0">
              {TICKER.map((t, i) => (
                <span
                  key={i}
                  className="text-white/85 text-[11px] font-medium uppercase tracking-[0.18em] py-2.5 flex items-center"
                >
                  {t}
                  <span className="opacity-30 px-5">/</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Nav bar */}
      <nav className="w-full bg-white sticky top-0 z-40" style={{ borderBottom: "1px solid #ECECEC" }}>
        <div
          className="w-full max-w-[1400px] mx-auto px-5 sm:px-8 grid grid-cols-[1fr_auto_1fr] items-center"
          style={{ height: 70 }}
        >
          {/* Left — links (desktop) / menu (mobile) */}
          <div className="flex items-center">
            <button
              className="md:hidden bg-transparent border-none cursor-pointer p-0"
              style={{ color: INK }}
              onClick={() => go("collections")}
              aria-label="Menu"
            >
              <Menu size={22} />
            </button>
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.label}
                  onClick={() => go(l.view)}
                  className="cursor-pointer text-[12px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
                  style={{
                    color: INK,
                    paddingBottom: 2,
                    borderBottom: view === l.view ? `2px solid ${INK}` : "2px solid transparent",
                  }}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Center — wordmark */}
          <button
            onClick={() => go("shop")}
            className="bg-transparent border-none cursor-pointer justify-self-center"
            style={{
              color: INK,
              fontWeight: 800,
              fontSize: "clamp(1.2rem, 3vw, 1.7rem)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            JV&nbsp;Kourt
          </button>

          {/* Right — utilities */}
          <div className="flex items-center justify-end gap-4">
            <button className="hidden sm:flex bg-transparent border-none cursor-pointer items-center" style={{ color: INK }} aria-label="Search">
              <Search size={19} />
            </button>
            <button className="hidden sm:flex bg-transparent border-none cursor-pointer items-center" style={{ color: INK }} aria-label="Account">
              <User size={19} />
            </button>
            <button
              onClick={() => setView(view === "admin" ? "shop" : "admin")}
              className="hidden lg:flex bg-transparent border-none cursor-pointer items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em]"
              style={{ color: INK }}
            >
              {view === "admin" ? <Store size={14} /> : <LayoutDashboard size={14} />}
              {view === "admin" ? "Store" : "Admin"}
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-transparent border-none cursor-pointer flex items-center"
              style={{ color: INK }}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-1.5 -right-1.5 flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: INK, width: 16, height: 16, borderRadius: 999 }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}