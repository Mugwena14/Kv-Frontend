import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { INK, ADMIN } from "../../constants/data";

const ON_DARK = "#FFFFFF";

export default function Login({ onAuth, onCancel }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const field = { border: `1px solid ${ADMIN.lineDark}`, background: "transparent", color: "#fff", borderRadius: 8, padding: "11px 13px", width: "100%", fontSize: 13, outline: "none" };

  return (
    <div className="flex items-center justify-center min-h-screen px-6" style={{ background: ADMIN.sidebar }}>
      <div className="w-full" style={{ maxWidth: 380 }}>
        {/* Brand */}
        <div className="flex flex-col items-center" style={{ marginBottom: 28 }}>
          <div className="inline-block" style={{ transform: "skewX(-10deg)", background: ON_DARK, padding: "9px 18px" }}>
            <span className="inline-block text-base font-extrabold uppercase" style={{ transform: "skewX(10deg)", color: INK, letterSpacing: "0.04em" }}>JV Kourt</span>
          </div>
          <div className="text-[10px] tracking-[0.34em] uppercase" style={{ color: ADMIN.textDim, marginTop: 10 }}>Admin Portal</div>
        </div>

        <div className="flex flex-col gap-3">
          <input style={field} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={field} type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") onAuth?.(); }} />
          <button onClick={() => onAuth?.()} className="inline-flex items-center justify-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] cursor-pointer border-none" style={{ background: ON_DARK, color: INK, borderRadius: 8, padding: "13px" }}>
            Sign in <ArrowRight size={15} />
          </button>
        </div>

        <button onClick={() => onCancel?.()} className="block w-full text-center bg-transparent border-none cursor-pointer text-[11px] uppercase tracking-[0.16em]" style={{ color: ADMIN.textDim, marginTop: 18 }}>
          Back to store
        </button>
        <p className="text-center text-[10px]" style={{ color: ADMIN.textDim, marginTop: 18, opacity: 0.7 }}>Demo login — any details sign you in.</p>
      </div>
    </div>
  );
}