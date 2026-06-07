import React from "react";
import {
  LayoutDashboard, ShoppingBag, Package, Users, Percent, Sparkles,
  FileText, Settings, LogOut, ChevronRight,
} from "lucide-react";
import { INK, ADMIN } from "../../constants/data";

const ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "orders",    label: "Orders",    icon: ShoppingBag },
  { key: "products",  label: "Products",  icon: Package },
  { key: "customers", label: "Customers", icon: Users },
  { key: "discounts", label: "Discounts", icon: Percent },
  { key: "invoices",  label: "Invoices",  icon: FileText },
  { key: "copilot",   label: "AI Co-pilot", icon: Sparkles },
  { key: "settings",  label: "Settings",  icon: Settings },
];

export default function Sidebar({ section, setSection, onLogout, mobileOpen, setMobileOpen }) {
  const go = (key) => {
    setSection(key);
    setMobileOpen?.(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div
        onClick={() => setMobileOpen?.(false)}
        className={`fixed inset-0 z-40 bg-black/50 md:hidden ${mobileOpen ? "block" : "hidden"}`}
      />

      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-[248px] shrink-0 flex flex-col
                    transition-transform duration-300 md:translate-x-0
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: ADMIN.sidebar, borderRight: `1px solid ${ADMIN.lineDark}` }}
      >
        {/* Brand — skewed white tag */}
        <div className="px-5 pt-6 pb-5">
          <div className="inline-block" style={{ transform: "skewX(-10deg)", background: ADMIN.onDark, padding: "8px 16px" }}>
            <span
              className="inline-block text-sm font-extrabold uppercase"
              style={{ transform: "skewX(10deg)", color: INK, letterSpacing: "0.04em" }}
            >
              JV Kourt
            </span>
          </div>
          <div className="text-[10px] tracking-[0.32em] uppercase mt-2.5" style={{ color: ADMIN.textDim }}>
            Admin
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 flex flex-col gap-1 overflow-y-auto">
          {ITEMS.map((it) => {
            const active = section === it.key;
            const Icon = it.icon;
            return (
              <button
                key={it.key}
                onClick={() => go(it.key)}
                className={`relative flex items-center gap-3 px-4 py-3 text-left bg-transparent border-none cursor-pointer rounded-[3px]
                            ${active ? "" : "hover:bg-white/5"}`}
              >
                {active && (
                  <span
                    className="absolute inset-y-1 left-2 right-2"
                    style={{ background: ADMIN.onDark, transform: "skewX(-10deg)", borderRadius: 3 }}
                  />
                )}
                <Icon size={18} className="relative z-10" style={{ color: active ? INK : ADMIN.textDim }} />
                <span
                  className="relative z-10 text-[12.5px] font-bold uppercase tracking-wide"
                  style={{ color: active ? INK : "#C9C9C9" }}
                >
                  {it.label}
                </span>
                {active && <ChevronRight size={16} className="relative z-10 ml-auto" style={{ color: INK }} />}
              </button>
            );
          })}
        </nav>

        {/* Logout pinned bottom */}
        <div className="px-3 py-4" style={{ borderTop: `1px solid ${ADMIN.lineDark}` }}>
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left bg-transparent border-none cursor-pointer rounded-[3px] hover:bg-white/5 transition-colors"
            style={{ color: ADMIN.textDim }}
          >
            <LogOut size={18} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}