import React from "react";
import { Asterisk } from "lucide-react";
import { INK } from "../constants/data";

const PHRASE = "Rules The Streets Quietly";
const PER_HALF = 6; // even number so solid/outline alternation stays seamless across the loop

export default function Marquee() {
  const items = Array.from({ length: PER_HALF });

  return (
    <section
      className="w-full overflow-hidden"
      style={{ background: "#fff", borderTop: "1px solid #E6E6E6", borderBottom: "1px solid #E6E6E6", marginTop: 80 }}
    >
      <style>{`
        @keyframes jvMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .jv-marquee-track { animation: jvMarquee 32s linear infinite; }
      `}</style>

      <div className="jv-marquee-track flex items-center" style={{ width: "max-content", paddingTop: 20, paddingBottom: 20 }}>
        {[0, 1].map((group) => (
          <div key={group} className="flex items-center shrink-0">
            {items.map((_, i) => {
              const solid = i % 2 === 0;
              return (
                <div key={i} className="flex items-center shrink-0" style={{ gap: 28, paddingRight: 28 }}>
                  <span
                    className="font-extrabold uppercase whitespace-nowrap select-none"
                    style={{
                      fontSize: "clamp(1.4rem, 3.6vw, 2.5rem)",
                      letterSpacing: "0.01em",
                      lineHeight: 1,
                      color: solid ? INK : "transparent",
                      WebkitTextStroke: solid ? "0" : `1.4px ${INK}`,
                    }}
                  >
                    {PHRASE}
                  </span>
                  <Asterisk size={20} strokeWidth={2.4} style={{ color: INK }} className="shrink-0" />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}