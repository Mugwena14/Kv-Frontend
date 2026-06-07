import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Mic, ArrowRight, Search, Star } from "lucide-react";
import {
  PRODUCTS,
  STORE,
  INK,
  BONE,
  AMBER,
  fmt,
  askClaude,
  extractJSON,
  localMatch,
} from "../constants/data";
import ProductImage from "../components/ProductImage";
import ShopExtras from "../components/ShopExtras";
import CategoryShowcase from "../components/CategoryShowcase";
import Marquee from "../components/Marquee";

const PER = 4; // teaser count shown on the shop landing
const HAIR = "#ECEAE4"; // hairline border tone
const CATS = ["All", "Tees", "Caps", "Bags"]; // visual tabs — wire to product.category after re-data
const SALE_RED = "#E0312E";

export default function ShopPage({ addToCart, setActive, setView }) {
  // filters
  const [fams, setFams] = useState([]);
  const [gender, setGender] = useState("All");
  const [occ, setOcc] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1800);
  const [cat, setCat] = useState("All");

  // shopper AI
  const [q, setQ] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResults, setAiResults] = useState(null);
  const [aiErr, setAiErr] = useState(false);
  const matchRef = useRef(null);

  const toggleFam = (f) => {
    setFams((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]));
  };

  const filtered = PRODUCTS.filter(
    (p) =>
      (fams.length === 0 || fams.includes(p.family)) &&
      (gender === "All" || p.gender === gender) &&
      (occ === "All" || p.occasion === occ) &&
      p.price <= maxPrice
  );
  const shown = filtered.slice(0, PER);

  // Real "Bestseller" badges sourced from admin top-sellers data (not fabricated)
  const bestsellers = new Set(STORE.topProducts.map((t) => t.name));

  const viewMore = () => {
    setView("collections");
    window.scrollTo({ top: 0 });
  };

  // Hero slideshow, for JV Kourt's campaign shots
  const HERO_IMAGES = [
    "https://images.pexels.com/photos/34579430/pexels-photo-34579430.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/31696422/pexels-photo-31696422.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/33232902/pexels-photo-33232902.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];
  const [heroIdx, setHeroIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % HERO_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const runFinder = async (text) => {
    const query = (text ?? q).trim();
    if (!query) return;
    setQ(query);
    setAiLoading(true);
    setAiErr(false);
    setAiResults(null);
    setTimeout(() => matchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);

    const slim = PRODUCTS.map((p) => ({
      id: p.id, name: p.name, family: p.family, gender: p.gender,
      occasion: p.occasion, intensity: p.intensity,
      notes: `${p.notes.top}; ${p.notes.heart}; ${p.notes.base}`,
    }));
    const prompt =
      `You are the scent concierge for "Result Scents", a luxury perfume house. ` +
      `Catalogue (JSON): ${JSON.stringify(slim)}\n\n` +
      `A customer describes the result they want: "${query}".\n` +
      `Choose the 2 to 3 best matches. Respond with ONLY a JSON array, no markdown, no extra text, ` +
      `in this exact shape: [{"id": <number>, "reason": "<one warm sentence, max 18 words, on why it matches them>"}].`;

    try {
      const raw = await askClaude(prompt);
      const parsed = extractJSON(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("bad");
      const valid = parsed.filter((r) => PRODUCTS.some((p) => p.id === r.id)).slice(0, 3);
      if (valid.length === 0) throw new Error("empty");
      setAiResults(valid);
    } catch {
      setAiErr(true);
      setAiResults(localMatch(query));
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
{/* Hero — crossfades through 3 images every 4s */}
  <header className="relative w-full h-[78vh] min-h-[560px] overflow-hidden select-none bg-black">
    {HERO_IMAGES.map((src, i) => (
      <div
        key={i}
        className="absolute inset-0 bg-cover bg-center transition-opacity ease-in-out"
        style={{
          backgroundImage: `url('${src}')`,
          opacity: i === heroIdx ? 1 : 0,
          transitionDuration: "1200ms",
        }}
      />
    ))}

    {/* Legibility overlay */}
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.55) 100%)" }}
    />

    {/* Overlay content */}
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
      <span className="text-white/90 text-xs sm:text-sm font-semibold uppercase" style={{ letterSpacing: "0.3em", marginBottom: 18 }}>
        New Season · 2026
      </span>
      <h1
        className="m-0 text-white uppercase"
        style={{ fontWeight: 800, fontSize: "clamp(2.8rem, 9vw, 7rem)", lineHeight: 0.92, letterSpacing: "-0.02em" }}
      >
        Off The Court
      </h1>
      <p className="text-white/85 font-light" style={{ marginTop: 16, maxWidth: "42ch", fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)" }}>
        Tees, caps and bags built for the city. The new JV Kourt drop is live.
      </p>
      <div className="flex items-center gap-3" style={{ marginTop: 30 }}>
        <button
          onClick={() => { setView("collections"); window.scrollTo({ top: 0 }); }}
          className="px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] bg-white text-black border-none cursor-pointer transition-opacity hover:opacity-90"
        >
          Shop New
        </button>
        <button
          onClick={() => { setView("collections"); window.scrollTo({ top: 0 }); }}
          className="px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] bg-transparent text-white cursor-pointer transition-colors hover:bg-white hover:text-black"
          style={{ border: "1px solid #fff" }}
        >
          Lookbook
        </button>
      </div>
    </div>

    {/* Slide indicators */}
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
      {HERO_IMAGES.map((_, i) => (
        <button
          key={i}
          onClick={() => setHeroIdx(i)}
          aria-label={`Slide ${i + 1}`}
          className="h-1.5 rounded-full transition-all border-none cursor-pointer p-0"
          style={{ width: i === heroIdx ? 28 : 10, background: i === heroIdx ? "#fff" : "rgba(255,255,255,0.5)" }}
        />
      ))}
    </div>
  </header>

      {/* AI Matches */}
      {(aiLoading || aiResults) && (
        <section ref={matchRef} className="rs-wrap" style={{ paddingTop: 40, paddingBottom: 20 }}>
          <div className="rs-matched">
            <div className="flex items-center justify-between" style={{ marginBottom: 18 }}>
              <div className="flex items-center gap-2">
                <Sparkles size={16} style={{ color: AMBER }} />
                <h2 className="rs-serif" style={{ fontSize: 26, color: INK }}>Matched for you</h2>
              </div>
              {aiResults && !aiLoading && (
                <button className="rs-chip" onClick={() => { setAiResults(null); setQ(""); }}>Clear</button>
              )}
            </div>

            {aiErr && !aiLoading && (
              <div className="rs-note">Concierge is offline right now — showing close matches from the house.</div>
            )}

            {aiLoading ? (
              <div className="rs-grid">
                {[0, 1, 2].map((i) => <div key={i} className="rs-skel rs-shimmer" />)}
              </div>
            ) : (
              <div className="rs-grid">
                {aiResults.map((r, i) => {
                  const p = PRODUCTS.find((x) => x.id === r.id);
                  if (!p) return null;
                  return (
                    <div key={r.id} className="rs-card rs-reveal" style={{ animationDelay: `${i * 90}ms` }}>
                      <div className="rs-card-img" onClick={() => setActive(p)}
                           style={{ background: `radial-gradient(120% 90% at 50% 10%, #fff 0%, ${BONE} 70%)` }}>
                        <span className="rs-tag">{p.family}</span>
                      </div>
                      <div className="px-5 pb-5 pt-4">
                        <h3 className="rs-serif" style={{ fontSize: 22, color: INK }}>{p.name}</h3>
                        <p className="rs-reason"><span style={{ color: AMBER, fontWeight: 600 }}>Why &middot; </span>{r.reason}</p>
                        <div className="flex items-center justify-between" style={{ marginTop: 12 }}>
                          <span style={{ fontSize: 17, fontWeight: 600 }}>{fmt(p.price)}</span>
                          <button className="rs-btn rs-btn-amber" onClick={() => addToCart(p)}>Add to cart</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ───────────────────────── New Arrivals ───────────────────────── */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 80 }}>
        {/* Heading + subtext */}
        <div className="flex items-center justify-between border-b" style={{ borderColor: "#E6E6E6", marginBottom: 36 }}>
          <div style={{ marginBottom: 18 }}>
          <h2
            className="m-0 font-extrabold uppercase tracking-tight"
            style={{ color: INK, fontSize: "clamp(1.6rem, 4vw, 2.4rem)", letterSpacing: "-0.01em", lineHeight: 1 }}
          >
            New Arrivals
          </h2>
          <p className="font-light text-sm text-neutral-500" style={{ marginTop: 8 }}>
            Discover the latest drop — fresh tees, caps and bags.
          </p>
        </div>
          <button
            onClick={viewMore}
            className="group flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-[12px] font-bold uppercase tracking-[0.12em] pb-3 transition-opacity hover:opacity-60"
            style={{ color: INK }}
          >
            View all
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Grid */}
        {shown.length === 0 ? (
          <div className="py-28 text-center">
            <p className="text-sm font-light text-neutral-400 tracking-wide">
              Nothing in this drop yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-9">
            {shown.map((p, i) => {
              // Badges from real data: Sale (if compareAt set) or Bestseller (from STORE)
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
                  style={{ animationDelay: `${i * 70}ms` }}
                  onClick={() => setActive(p)}
                >
                  {/* Image tile */}
                  <div
                    className="relative w-full aspect-[3/4] overflow-hidden"
                    style={{ background: "#F4F4F2", borderRadius: 3 }}
                  >
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
                        return (
                          <Star
                            key={s}
                            size={11}
                            style={{ color: on ? "#F5A623" : "#DAD9D5", fill: on ? "#F5A623" : "#DAD9D5" }}
                          />
                        );
                      })}
                      {p.reviews ? (
                        <span className="text-[10px] text-neutral-400 ml-1">({p.reviews})</span>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <CategoryShowcase setView={setView} />

      <Marquee />

      <ShopExtras setView={setView} />
    </>
  );
}