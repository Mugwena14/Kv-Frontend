import React from "react";
import { Package, ShieldCheck, RotateCcw, Lock, ArrowRight } from "lucide-react";
import { INK, MUTED } from "../constants/data";

const HAIR = "#ECEAE4";
const PROMO_IMG =
  "https://images.pexels.com/photos/31696422/pexels-photo-31696422.jpeg?auto=compress&cs=tinysrgb&w=1200";

export default function ShopExtras({ setView }) {
  const shopNow = () => {
    setView?.("collections");
    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {/* Promo + Newsletter split band */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 80 }}>
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

      {/* Trust strip */}
      <section className="w-full max-w-[1280px] mx-auto px-6 sm:px-12" style={{ marginTop: 24, marginBottom: 64 }}>
        <div
          className="bg-white flex flex-col md:flex-row md:items-stretch md:divide-x divide-neutral-100"
          style={{ border: `1px solid ${HAIR}` }}
        >
          {/* PEP delivery — lead item */}
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
      </section>
    </>
  );
}