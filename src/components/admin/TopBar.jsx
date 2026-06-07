import React from "react";
import { Menu } from "lucide-react";
import { INK, MUTED, ADMIN } from "../../constants/data";

export default function TopBar({ title, onMenu, admin = {} }) {
  const { name = "ES Makofane", role = "Admin Access", initials = "EM" } = admin;

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-5 md:px-8 bg-white"
      style={{ height: 64, borderBottom: `1px solid ${ADMIN.line}` }}
    >
      {/* Left — menu (mobile) + accent tick + section title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenu}
          className="md:hidden flex items-center justify-center bg-transparent border-none cursor-pointer"
          style={{ color: INK }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <span style={{ width: 26, height: 3, background: INK, borderRadius: 2, display: "inline-block" }} />
        <h1 className="m-0 text-base md:text-lg font-extrabold uppercase tracking-tight" style={{ color: INK }}>
          {title}
        </h1>
      </div>

      {/* Right — profile chip + avatar square */}
      <div className="flex items-center gap-3">
        <div className="text-right leading-tight hidden sm:block">
          <div className="text-[10px] tracking-[0.18em] uppercase" style={{ color: MUTED }}>{role}</div>
          <div className="text-[13px] font-bold uppercase" style={{ color: INK }}>{name}</div>
        </div>
        <div
          className="flex items-center justify-center"
          style={{ width: 40, height: 40, background: INK }}
        >
          <span className="text-[12px] font-extrabold" style={{ color: "#fff" }}>{initials}</span>
        </div>
      </div>
    </header>
  );
}