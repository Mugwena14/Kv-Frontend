import React from "react";
import { ArrowRight } from "lucide-react";
import { INK } from "../constants/data";

// Swap these for JV Kourt's own category campaign shots
const CATEGORIES = [
  {
    key: "Tees",
    caption: "New Season",
    title: "Tees",
    img: "https://images.pexels.com/photos/34579430/pexels-photo-34579430.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "Caps",
    caption: "Top It Off",
    title: "Caps",
    img: "https://images.pexels.com/photos/12285563/pexels-photo-12285563.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    key: "Bags",
    caption: "Everyday Carry",
    title: "Bags",
    img: "https://images.pexels.com/photos/9471910/pexels-photo-9471910.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

function Tile({ cat, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden text-left w-full p-0 border-none cursor-pointer ${className}`}
      style={{ borderRadius: 4, background: "#111" }}
    >
      <img
        src={cat.img}
        alt={cat.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
      />
      {/* Legibility gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 55%, rgba(0,0,0,0.15) 100%)" }}
      />
      {/* Content */}
      <div className="absolute left-0 bottom-0 z-10 p-6 sm:p-7 text-white">
        <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/75" style={{ marginBottom: 8 }}>
          {cat.caption}
        </span>
        <h3 className="m-0 font-extrabold uppercase tracking-tight" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1 }}>
          {cat.title}
        </h3>
        <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ marginTop: 12 }}>
          Shop {cat.title}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

export default function CategoryShowcase({ setView }) {
  const [tees, caps, bags] = CATEGORIES;

  const go = () => {
    // TODO: pass the category to pre-filter Collections once products are categorised
    setView?.("collections");
    window.scrollTo({ top: 0 });
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 96 }}>
      {/* Heading */}
      <div style={{ marginBottom: 28 }}>
        <h2
          className="m-0 font-extrabold uppercase tracking-tight"
          style={{ color: INK, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", lineHeight: 1, letterSpacing: "-0.01em" }}
        >
          Shop by Category
        </h2>
        <p className="font-light text-sm text-neutral-500" style={{ marginTop: 8 }}>
          Tees, caps and bags — pick your lane.
        </p>
      </div>

      {/* Mosaic — Tees (tall), Caps + Bags stacked */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Tile cat={tees} onClick={go} className="min-h-[420px] md:min-h-[560px]" />
        <div className="grid grid-rows-2 gap-4">
          <Tile cat={caps} onClick={go} className="min-h-[220px] md:min-h-0" />
          <Tile cat={bags} onClick={go} className="min-h-[220px] md:min-h-0" />
        </div>
      </div>
    </section>
  );
}