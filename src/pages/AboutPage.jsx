import React from "react";
import { ArrowRight, Asterisk, Package, ShieldCheck, RotateCcw, Lock } from "lucide-react";
import { INK, MUTED } from "../constants/data";

const HAIR = "#E6E6E6";
const ABOUT_IMG =
  "https://images.pexels.com/photos/33232902/pexels-photo-33232902.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default function AboutPage({ setView }) {
  const shopNow = () => {
    setView?.("collections");
    window.scrollTo({ top: 0 });
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 sm:px-12" style={{ marginTop: 56, marginBottom: 88 }}>
      {/* Eyebrow */}
      <div className="flex items-center gap-2" style={{ marginBottom: 20 }}>
        <Asterisk size={15} strokeWidth={2.4} style={{ color: INK }} />
        <span className="text-[11px] font-bold tracking-[0.24em] uppercase" style={{ color: MUTED }}>
          JV Kourt · Est. 2026
        </span>
      </div>

      {/* Headline — the motto */}
      <h1
        className="m-0 font-extrabold uppercase"
        style={{
          color: INK,
          fontSize: "clamp(2.6rem, 8vw, 6rem)",
          lineHeight: 0.92,
          letterSpacing: "-0.03em",
          maxWidth: "14ch",
        }}
      >
        Rules the streets{" "}
        <span style={{ color: "transparent", WebkitTextStroke: `2px ${INK}` }}>quietly.</span>
      </h1>

      {/* Intro */}
      <p
        className="font-light"
        style={{ color: "#3A3A3A", fontSize: "clamp(1rem, 1.5vw, 1.15rem)", lineHeight: 1.7, maxWidth: "58ch", marginTop: 26 }}
      >
        JV Kourt started in Pretoria with one idea: clothes that don&rsquo;t have to
        shout. Heavyweight tees, clean caps and everyday bags — built well, cut right,
        and made to wear into the ground. No loud logos, no hype tax. Just pieces that
        rule the streets quietly.
      </p>

      {/* Editorial image */}
      <div className="relative w-full overflow-hidden" style={{ borderRadius: 4, marginTop: 44, aspectRatio: "16 / 7", background: "#111" }}>
        <img src={ABOUT_IMG} alt="JV Kourt" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      </div>

      {/* Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5" style={{ marginTop: 56 }}>
        {[
          { title: "Built heavy", body: "Heavyweight cotton, reinforced seams, hardware that holds. Made to outlast the season." },
          { title: "Quiet by design", body: "No screaming logos. Clean lines and the right fit do all the talking." },
          { title: "Made local", body: "Designed and produced in South Africa, released in limited runs." },
        ].map((p, i) => (
          <div
            key={i}
            className="bg-white border p-6 transition-shadow duration-300 hover:shadow-md"
            style={{ borderColor: HAIR, borderRadius: 3 }}
          >
            <span className="block text-xs font-bold" style={{ color: INK, marginBottom: 12, letterSpacing: "0.1em" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="m-0 font-bold uppercase tracking-tight" style={{ color: INK, fontSize: 17, marginBottom: 8 }}>
              {p.title}
            </h3>
            <p className="m-0 font-light" style={{ color: MUTED, fontSize: 14, lineHeight: 1.6 }}>
              {p.body}
            </p>
          </div>
        ))}
      </div>

      {/* Trust strip */}
      <div
        className="bg-white flex flex-col md:flex-row md:items-stretch md:divide-x divide-neutral-100"
        style={{ border: `1px solid ${HAIR}`, marginTop: 24 }}
      >
        <div className="flex items-start gap-3 px-7 py-6 md:basis-2/5">
          <Package size={20} style={{ color: INK }} className="shrink-0 mt-0.5" />
          <div>
            <p className="m-0 font-semibold text-sm" style={{ color: INK, marginBottom: 3 }}>
              Delivered via PEP Paxi
            </p>
            <p className="m-0 font-light text-xs" style={{ color: MUTED, lineHeight: 1.5 }}>
              Collect at your nearest PEP store nationwide.{" "}
              <span style={{ color: INK, fontWeight: 700 }}>Free on 2 or more items.</span>
            </p>
          </div>
        </div>

        {[
          { icon: ShieldCheck, label: "Quality checked", sub: "Built to last" },
          { icon: RotateCcw, label: "Easy returns", sub: "14-day, hassle-free" },
          { icon: Lock, label: "Secure checkout", sub: "Encrypted & safe" },
        ].map(({ icon: Icon, label, sub }, i) => (
          <div key={i} className="flex items-start gap-3 px-7 py-6 flex-1">
            <Icon size={20} style={{ color: INK }} className="shrink-0 mt-0.5" />
            <div>
              <p className="m-0 font-semibold text-sm" style={{ color: INK, marginBottom: 3 }}>
                {label}
              </p>
              <p className="m-0 font-light text-xs" style={{ color: MUTED }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-t pt-9"
        style={{ borderColor: HAIR, marginTop: 56 }}
      >
        <p className="m-0 font-extrabold uppercase tracking-tight" style={{ color: INK, fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)", lineHeight: 1.05, maxWidth: "20ch" }}>
          Less noise. More fit.
        </p>
        <button
          onClick={shopNow}
          className="group inline-flex items-center justify-center gap-2 border-none text-white text-xs font-bold uppercase tracking-[0.16em] cursor-pointer transition-opacity hover:opacity-90 shrink-0"
          style={{ background: INK, borderRadius: 3, padding: "16px 30px" }}
        >
          Shop the drop
          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}