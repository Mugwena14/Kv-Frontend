import React, { useState } from "react";
import { ArrowLeft, Minus, Plus, Star, ShieldCheck, Package, Heart, Share2, Check } from "lucide-react";
import ProductImage from "../components/ProductImage";
import { PRODUCTS, INK, MUTED, fmt } from "../constants/data";

const HAIR = "#E6E6E6";
const TILE = "#F4F4F2";
const SALE_RED = "#E0312E";
const SIZES = ["Small", "Medium", "Large"];

export default function ProductPage({ product, onBack, onSelect, addToCart }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [activeThumb, setActiveThumb] = useState(0);

  if (!product) return null;

  const onSale = product.compareAt && product.compareAt > product.price;

  // Recommended — same family first, then fill from the rest
  const sameFamily = PRODUCTS.filter((p) => p.id !== product.id && p.family === product.family);
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.family !== product.family);
  const recommended = [...sameFamily, ...others].slice(0, 4);

  // Apparel fields — placeholders until JV Kourt data lands (swap freely)
  const sku = product.sku || `JV-${String(product.id).padStart(5, "0")}`;
  const material = product.material || ["92% Cotton", "8% Elastane", "Shell: 100% polyester"];
  const highlights = product.highlights || [
    "Relaxed everyday fit",
    "Ribbed crew neckline",
    "Embroidered JV Kourt mark",
    "Heavyweight 240gsm cotton",
  ];
  const care = product.care || ["Machine wash cold", "Do not bleach", "Tumble dry low", "Cool iron if needed"];
  const story =
    product.description ||
    product.blurb ||
    "A JV Kourt staple — built heavy, cut clean, made to be worn into the ground.";

  const add = () => {
    if (!size) return;
    addToCart({ ...product, size }, qty);
  };

  return (
    <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 24, marginBottom: 96 }}>
      {/* Breadcrumb + utilities */}
      <div className="flex items-center justify-between" style={{ marginBottom: 28 }}>
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.1em]">
          <button onClick={onBack} className="bg-transparent border-none p-0 cursor-pointer text-neutral-400 hover:text-black transition-colors">
            Shop
          </button>
          <span className="text-neutral-300">/</span>
          <span className="text-neutral-400">{product.family}</span>
          <span className="text-neutral-300">/</span>
          <span style={{ color: INK }}>{product.name}</span>
        </div>
        <div className="hidden sm:flex items-center gap-5 text-neutral-500">
          <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[11px] font-medium uppercase tracking-[0.1em] hover:text-black transition-colors">
            <Heart size={14} /> Save
          </button>
          <button className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[11px] font-medium uppercase tracking-[0.1em] hover:text-black transition-colors">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Hero — gallery + details */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="flex gap-4">
          {/* Thumbnail rail (placeholder — add alt shots per product later) */}
          <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
            {[0, 1, 2].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className="relative w-full aspect-[3/4] overflow-hidden cursor-pointer p-0"
                style={{
                  background: TILE,
                  borderRadius: 4,
                  border: activeThumb === i ? `2px solid ${INK}` : `1px solid ${HAIR}`,
                }}
                aria-label={`View ${i + 1}`}
              >
                <ProductImage product={product} />
              </button>
            ))}
          </div>

          {/* Main image */}
          <div className="relative grow aspect-[3/4] overflow-hidden" style={{ background: TILE, borderRadius: 6 }}>
            {onSale && (
              <span
                className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-[0.08em] text-white px-2.5 py-1"
                style={{ background: SALE_RED, borderRadius: 3 }}
              >
                Sale
              </span>
            )}
            <ProductImage product={product} />
          </div>
        </div>

        {/* Details card */}
        <div className="flex flex-col" style={{ border: `1px solid ${HAIR}`, borderRadius: 8, padding: 28 }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-400">
            {product.family}
          </span>

          <h1
            className="m-0 font-extrabold uppercase tracking-tight"
            style={{ color: INK, fontSize: "clamp(1.6rem, 3vw, 2.2rem)", lineHeight: 1.05, marginTop: 8 }}
          >
            {product.name}
          </h1>

          <span className="text-[11px] text-neutral-400" style={{ marginTop: 8 }}>
            Product code · {sku}
          </span>

          {/* Rating */}
          <div className="flex items-center gap-1.5" style={{ marginTop: 14 }}>
            {[0, 1, 2, 3, 4].map((s) => {
              const on = s < Math.round(product.rating || 0);
              return <Star key={s} size={13} style={{ color: on ? "#F5A623" : "#DAD9D5", fill: on ? "#F5A623" : "#DAD9D5" }} />;
            })}
            <span className="text-xs text-neutral-400 ml-1">({product.reviews})</span>
          </div>

          {/* Size selector */}
          <div style={{ marginTop: 24 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: INK }}>
                Select size
              </span>
              <span className="text-[11px] font-medium text-neutral-400 underline cursor-pointer">Size guide</span>
            </div>
            <div className="flex gap-2.5">
              {SIZES.map((s) => {
                const active = size === s;
                return (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="px-5 py-3 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer transition-colors flex-1"
                    style={
                      active
                        ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 4 }
                        : { background: "#fff", color: INK, border: `1px solid ${HAIR}`, borderRadius: 4 }
                    }
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {!size && (
              <p className="text-[11px] font-light text-neutral-400" style={{ marginTop: 10 }}>
                Please select a size to continue.
              </p>
            )}
          </div>

          {/* Spec rows */}
          <div style={{ marginTop: 24, borderTop: `1px solid ${HAIR}`, paddingTop: 18 }} className="flex flex-col">
            {[
              ["Article", sku],
              ["Material", material.slice(0, 2).join(", ")],
              ["Fit", product.fit || "Relaxed"],
            ].map(([k, v], i) => (
              <div key={i} className="flex items-center justify-between py-2.5" style={{ borderTop: i === 0 ? "none" : `1px solid ${HAIR}` }}>
                <span className="text-[12px] text-neutral-400">{k}</span>
                <span className="text-[12px] font-medium" style={{ color: INK }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3" style={{ marginTop: 22 }}>
            <span className="text-2xl font-extrabold" style={{ color: onSale ? SALE_RED : INK }}>
              {fmt(product.price)}
            </span>
            {onSale && (
              <span className="text-base font-light line-through text-neutral-400">{fmt(product.compareAt)}</span>
            )}
          </div>

          {/* Quantity + Add to bag */}
          <div className="flex items-stretch gap-3" style={{ marginTop: 18 }}>
            <div className="flex items-center shrink-0" style={{ border: `1px solid ${HAIR}`, borderRadius: 4 }}>
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-10 h-12 flex items-center justify-center bg-transparent border-none cursor-pointer text-neutral-500 hover:text-black transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-bold" style={{ color: INK }}>{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-10 h-12 flex items-center justify-center bg-transparent border-none cursor-pointer text-neutral-500 hover:text-black transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={add}
              disabled={!size}
              className="grow text-white border-none text-xs font-bold uppercase tracking-[0.16em] cursor-pointer transition-opacity"
              style={{ background: INK, borderRadius: 4, opacity: size ? 1 : 0.45, cursor: size ? "pointer" : "not-allowed" }}
            >
              {size ? "Add to bag" : "Select a size"}
            </button>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2" style={{ marginTop: 18 }}>
            <span className="flex items-center gap-2 text-[11px] font-light text-neutral-500">
              <Package size={14} /> Free PEP Paxi on 2+ items
            </span>
            <span className="flex items-center gap-2 text-[11px] font-light text-neutral-500">
              <ShieldCheck size={14} /> Easy 14-day returns
            </span>
          </div>
        </div>
      </div>

      {/* Story / Material / Highlights / Care */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16" style={{ marginTop: 72 }}>
        {/* Left column */}
        <div>
          <h3 className="m-0 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginBottom: 14 }}>
            Product story
          </h3>
          <p className="m-0 font-light" style={{ color: MUTED, fontSize: 14, lineHeight: 1.7 }}>
            {story}
          </p>

          <h3 className="m-0 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginTop: 32, marginBottom: 14 }}>
            Highlights
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm font-light" style={{ color: INK }}>
                <Check size={15} style={{ color: INK }} className="shrink-0" /> {h}
              </li>
            ))}
          </ul>
        </div>

        {/* Right column */}
        <div>
          <h3 className="m-0 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginBottom: 14 }}>
            Material
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {material.map((m, i) => (
              <li key={i} className="text-sm font-light" style={{ color: MUTED }}>{m}</li>
            ))}
          </ul>

          <h3 className="m-0 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginTop: 32, marginBottom: 14 }}>
            Care
          </h3>
          <ul className="list-none m-0 p-0 flex flex-col gap-2.5">
            {care.map((c, i) => (
              <li key={i} className="text-sm font-light" style={{ color: MUTED }}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* You might also like */}
      <div style={{ marginTop: 88 }}>
        <h2 className="m-0 font-extrabold uppercase tracking-tight" style={{ color: INK, fontSize: "clamp(1.4rem, 3vw, 2rem)", marginBottom: 28 }}>
          You might also like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
          {recommended.map((p, i) => {
            const recSale = p.compareAt && p.compareAt > p.price;
            return (
              <article
                key={p.id}
                className="rs-reveal group cursor-pointer flex flex-col"
                style={{ animationDelay: `${i * 70}ms` }}
                onClick={() => onSelect(p)}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ background: TILE, borderRadius: 3 }}>
                  <div className="absolute inset-0 transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]">
                    <ProductImage product={p} />
                  </div>
                </div>
                <div className="pt-3 flex flex-col gap-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">{p.family}</span>
                  <h3 className="m-0 text-[12px] font-bold uppercase tracking-tight text-neutral-900 truncate">{p.name}</h3>
                  <div className="flex items-center gap-2">
                    {recSale ? (
                      <>
                        <span className="text-[12px] line-through text-neutral-400">{fmt(p.compareAt)}</span>
                        <span className="text-[12px] font-bold" style={{ color: SALE_RED }}>{fmt(p.price)}</span>
                      </>
                    ) : (
                      <span className="text-[12px] font-bold text-neutral-900">{fmt(p.price)}</span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}