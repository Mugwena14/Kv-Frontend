import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import ProductImage from "../components/ProductImage";
import { PRODUCTS, STORE, FAMILIES, INK, MUTED, fmt } from "../constants/data";

const HAIR = "#E6E6E6";
const TILE = "#F4F4F2";
const SALE_RED = "#E0312E";
const PER = 8; // cards per page
const PROMO_IMG =
  "https://images.pexels.com/photos/31696422/pexels-photo-31696422.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function CollectionsPage({ addToCart, setActive, setView }) {
  const [family, setFamily] = useState("All");
  const [page, setPage] = useState(1);

  const chips = ["All", ...FAMILIES];
  const bestsellers = new Set(STORE.topProducts.map((t) => t.name));

  const shopNow = () => {
    setView?.("shop");
    window.scrollTo({ top: 0 });
  };

  const pick = (f) => {
    setFamily(f);
    setPage(1); // reset on filter change
  };

  const filtered =
    family === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.family === family);
  const pages = Math.max(1, Math.ceil(filtered.length / PER));
  const shown = filtered.slice((page - 1) * PER, page * PER);

  return (
    <>
    <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 56, marginBottom: 0 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1
          className="m-0 font-extrabold uppercase tracking-tight"
          style={{ color: INK, fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1, letterSpacing: "-0.02em" }}
        >
          All Products
        </h1>
        <p className="font-light text-sm text-neutral-500" style={{ marginTop: 10 }}>
          The full JV Kourt range — tees, caps and bags, built for the city.
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2.5 border-b pb-7" style={{ borderColor: HAIR, marginBottom: 40 }}>
        {chips.map((f) => {
          const isActive = family === f;
          return (
            <button
              key={f}
              onClick={() => pick(f)}
              className="text-[11px] font-bold uppercase tracking-[0.12em] px-4 py-2 cursor-pointer transition-colors"
              style={
                isActive
                  ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 3 }
                  : { background: "#fff", color: "#8A8A8A", border: `1px solid ${HAIR}`, borderRadius: 3 }
              }
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {shown.length === 0 ? (
        <div className="py-28 text-center">
          <p className="text-sm font-light text-neutral-400 tracking-wide">Nothing in this collection yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
          {shown.map((p, i) => {
            // Badges from real data
            const badges = [];
            if (p.compareAt && p.compareAt > p.price) {
              const save = Math.round((1 - p.price / p.compareAt) * 100);
              badges.push({ label: "Sale", accent: false });
              if (save > 0) badges.push({ label: `-${save}%`, accent: true });
            } else if (bestsellers.has(p.name)) {
              badges.push({ label: "Bestseller", accent: true });
            }
            if (p.badge) badges.unshift({ label: p.badge, accent: false });

            return (
              <article
                key={p.id}
                className="rs-reveal group cursor-pointer flex flex-col"
                style={{ animationDelay: `${(i % PER) * 60}ms` }}
                onClick={() => setActive(p)}
              >
                {/* Image tile */}
                <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ background: TILE, borderRadius: 3 }}>
                  <div className="absolute inset-0 transition-transform duration-[700ms] ease-out group-hover:scale-[1.04]">
                    <ProductImage product={p} size={104} />
                  </div>

                  {/* Corner badges */}
                  {badges.length > 0 && (
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                      {badges.map((b, bi) => (
                        <span
                          key={bi}
                          className="text-[9px] font-bold uppercase tracking-[0.06em] text-white px-2 py-1"
                          style={{ background: b.accent ? SALE_RED : INK, borderRadius: 3 }}
                        >
                          {b.label}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Add to bag — visible on touch, hover-reveal on desktop */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="absolute left-2.5 right-2.5 bottom-2.5 py-2.5 text-white text-[10px] font-bold uppercase
                               transition-all duration-300 ease-out
                               translate-y-0 opacity-100
                               lg:translate-y-[140%] lg:opacity-0
                               lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
                    style={{ background: INK, letterSpacing: "0.14em", borderRadius: 3 }}
                  >
                    Add to bag
                  </button>
                </div>

                {/* Meta */}
                <div className="pt-3 flex flex-col gap-1">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                    {p.family || "JV Kourt"}
                  </span>
                  <h3 className="m-0 text-[12px] font-bold uppercase tracking-tight text-neutral-900 truncate">
                    {p.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    {p.compareAt ? (
                      <>
                        <span className="text-[12px] line-through text-neutral-400">{fmt(p.compareAt)}</span>
                        <span className="text-[12px] font-bold" style={{ color: SALE_RED }}>{fmt(p.price)}</span>
                      </>
                    ) : (
                      <span className="text-[12px] font-bold text-neutral-900">{fmt(p.price)}</span>
                    )}
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5" style={{ marginTop: 2 }}>
                    {[0, 1, 2, 3, 4].map((s) => {
                      const on = s < Math.round(p.rating || 0);
                      return <Star key={s} size={11} style={{ color: on ? "#F5A623" : "#DAD9D5", fill: on ? "#F5A623" : "#DAD9D5" }} />;
                    })}
                    {p.reviews ? <span className="text-[10px] text-neutral-400 ml-1">({p.reviews})</span> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Pagination — INK underline marks the active page */}
      {pages > 1 && (
        <div className="flex items-center justify-between border-t pt-8" style={{ borderColor: HAIR, marginTop: 64, marginBottom: 24 }}>
          <button
            className="flex items-center gap-2 bg-transparent border-none text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors hover:text-black"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            <ArrowLeft size={15} />
            <span>Prev</span>
          </button>

          <div className="flex items-center gap-3">
            {Array.from({ length: pages }).map((_, i) => {
              const isSelected = page === i + 1;
              return (
                <button
                  key={i}
                  className={`relative bg-transparent border-none text-sm cursor-pointer transition-colors pb-1.5
                    ${isSelected ? "font-bold text-neutral-900" : "font-light text-neutral-400 hover:text-neutral-700"}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                  {isSelected && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px]" style={{ background: INK }} />
                  )}
                </button>
              );
            })}
          </div>

          <button
            className="flex items-center gap-2 bg-transparent border-none text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors hover:text-black"
            disabled={page === pages}
            onClick={() => setPage((p) => Math.min(p + 1, pages))}
          >
            <span>Next</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </section>

      {/* Promo + Newsletter */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 80, marginBottom: 64 }}>
        <div
          className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E6E6E6]"
          style={{ border: `1px solid #E6E6E6` }}
        >
          {/* Promo */}
          <div className="relative overflow-hidden flex items-center" style={{ background: "#F1F1EF", minHeight: 260 }}>
            <div className="relative z-10 px-8 py-10 sm:px-10" style={{ maxWidth: "62%" }}>
              <h3 className="m-0 font-extrabold uppercase tracking-tight" style={{ color: INK, fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)", lineHeight: 1.05 }}>
                New Arrival
              </h3>
              <p className="font-light text-sm" style={{ color: MUTED, marginTop: 10, lineHeight: 1.6 }}>
                New season collection — available online and in store now.
              </p>
              <button
                onClick={shopNow}
                className="text-white border-none cursor-pointer text-[11px] font-bold uppercase tracking-[0.16em] px-7 py-3 transition-opacity hover:opacity-90"
                style={{ background: INK, marginTop: 22, borderRadius: 3 }}
              >
                Shop now
              </button>
            </div>

            {/* Image bleeding from the right */}
            <img
              src={PROMO_IMG}
              alt="New arrival"
              loading="lazy"
              className="absolute right-0 top-0 h-full w-[58%] object-cover"
            />
            {/* Fade so the copy stays legible over the image */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, #F1F1EF 38%, rgba(241,241,239,0) 70%)" }}
            />
          </div>

          {/* Newsletter */}
          <div className="flex flex-col justify-center bg-white px-8 py-10 sm:px-12">
            <h3 className="m-0 font-extrabold uppercase tracking-tight" style={{ color: INK, fontSize: "clamp(1.3rem, 2.6vw, 1.9rem)", lineHeight: 1.05 }}>
              Newsletter
            </h3>
            <p className="font-light text-sm" style={{ color: MUTED, marginTop: 10, lineHeight: 1.6, maxWidth: "40ch" }}>
              Sign up to our newsletter and be the first to know about new drops, sales and more.
            </p>

            <div className="flex items-center" style={{ borderBottom: `1px solid ${INK}`, marginTop: 24, maxWidth: 420 }}>
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="grow bg-transparent border-none outline-none text-sm font-light py-3 text-neutral-800 placeholder-neutral-400"
              />
              <button
                className="flex items-center justify-center bg-transparent border-none cursor-pointer text-neutral-700 hover:text-black transition-colors px-1"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}