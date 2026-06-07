import React, { useMemo, useState } from "react";
import { Search, ChevronDown, Truck, RotateCcw, Check, X } from "lucide-react";
import { PRODUCTS, fmt, INK, MUTED, ADMIN } from "../../constants/data";

const STATUSES = ["Paid", "Processing", "Fulfilled", "Refunded"];
const PROD = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

const itemsCount = (o) => (o.items || []).reduce((a, it) => a + it.qty, 0);
const fmtWhen = (iso) => {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const t = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${day} · ${t}`;
};
const suggestTracking = () => `PAXI-${Math.floor(1000 + Math.random() * 9000)}-ZA`;

function StatusChip({ status }) {
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]"
      style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "2px 9px" }}
    >
      {status}
    </span>
  );
}

const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };

export default function Orders({ orders = [], updateOrder }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [openId, setOpenId] = useState(null);
  const [mode, setMode] = useState(null);          // null | "fulfil" | "refund"
  const [tracking, setTracking] = useState("");

  const counts = useMemo(() => {
    const c = { All: orders.length };
    STATUSES.forEach((s) => (c[s] = orders.filter((o) => o.status === s).length));
    return c;
  }, [orders]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
      const matchF = filter === "All" || o.status === filter;
      return matchQ && matchF;
    });
  }, [orders, query, filter]);

  const toggle = (id) => {
    setOpenId((cur) => (cur === id ? null : id));
    setMode(null);
  };

  const startFulfil = () => { setTracking(suggestTracking()); setMode("fulfil"); };
  const confirmFulfil = (id) => { updateOrder(id, { status: "Fulfilled", tracking: tracking || null }); setMode(null); };
  const confirmRefund = (id) => { updateOrder(id, { status: "Refunded" }); setMode(null); };

  const chips = ["All", ...STATUSES];

  return (
    <div style={{ ...card, padding: 22 }}>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3" style={{ marginBottom: 18 }}>
        <div className="flex items-center gap-2 grow max-w-[360px]" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 10, padding: "0 12px" }}>
          <Search size={16} style={{ color: MUTED }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order # or customer…"
            className="grow bg-transparent border-none outline-none text-sm py-2.5"
            style={{ color: INK }}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="text-[11px] font-bold uppercase tracking-[0.08em] px-3 py-2 cursor-pointer transition-colors"
                style={active
                  ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 999 }
                  : { background: "#fff", color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 999 }}
              >
                {c} <span style={{ opacity: 0.6 }}>{counts[c] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Order", "Customer", "Items", "Total", "Status", "Placed", ""].map((h, i) => (
                <th key={i} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr><td colSpan={7} className="py-12 text-center text-sm font-light" style={{ color: MUTED }}>No orders match.</td></tr>
            )}
            {shown.map((o) => {
              const open = openId === o.id;
              return (
                <React.Fragment key={o.id}>
                  <tr onClick={() => toggle(o.id)} className="cursor-pointer" style={{ background: open ? "#FAFAF8" : "transparent" }}>
                    <td className="py-3 text-[12px] font-bold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{o.id}</td>
                    <td className="py-3 text-[12px]" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{o.customer}</td>
                    <td className="py-3 text-[12px]" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{itemsCount(o)}</td>
                    <td className="py-3 text-[12px] font-semibold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{fmt(o.total)}</td>
                    <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}><StatusChip status={o.status} /></td>
                    <td className="py-3 text-[11px] whitespace-nowrap" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{fmtWhen(o.placedAt)}</td>
                    <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                      <ChevronDown size={16} style={{ color: MUTED, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                    </td>
                  </tr>

                  {open && (
                    <tr>
                      <td colSpan={7} style={{ borderBottom: `1px solid ${ADMIN.line}`, background: "#FAFAF8" }}>
                        <div className="px-1 py-4 flex flex-col gap-4">
                          {/* Line items */}
                          <div className="flex flex-col gap-2">
                            {o.items.map((it, i) => {
                              const p = PROD[it.productId];
                              return (
                                <div key={i} className="flex items-center justify-between text-[12px]">
                                  <span style={{ color: INK }}>
                                    <span className="font-bold uppercase">{p ? p.name : `#${it.productId}`}</span>
                                    <span style={{ color: MUTED }}> · {it.size} × {it.qty}</span>
                                  </span>
                                  <span className="font-semibold" style={{ color: INK }}>{fmt(it.price * it.qty)}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Meta */}
                          <div className="flex flex-wrap gap-x-8 gap-y-1 text-[11px]" style={{ color: MUTED }}>
                            <span>Email: <span style={{ color: INK }}>{o.email}</span></span>
                            {o.tracking && <span>Tracking: <span style={{ color: INK }}>{o.tracking}</span></span>}
                          </div>

                          {/* Actions */}
                          {mode === "fulfil" ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px] font-medium" style={{ color: INK }}>PEP Paxi tracking</span>
                              <input
                                value={tracking}
                                onChange={(e) => setTracking(e.target.value)}
                                className="text-[12px] bg-white outline-none"
                                style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "6px 10px", minWidth: 180 }}
                              />
                              <button onClick={() => confirmFulfil(o.id)} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "7px 12px" }}>
                                <Check size={13} /> Confirm fulfil
                              </button>
                              <button onClick={() => setMode(null)} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent" style={{ color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "7px 12px" }}>
                                <X size={13} /> Cancel
                              </button>
                            </div>
                          ) : mode === "refund" ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[11px]" style={{ color: INK }}>
                                Refund <strong>{fmt(o.total)}</strong> to {o.customer}? This can&rsquo;t be undone.
                              </span>
                              <button onClick={() => confirmRefund(o.id)} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "7px 12px" }}>
                                <Check size={13} /> Confirm refund
                              </button>
                              <button onClick={() => setMode(null)} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent" style={{ color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "7px 12px" }}>
                                <X size={13} /> Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-wrap items-center gap-2">
                              {o.status !== "Fulfilled" && o.status !== "Refunded" && (
                                <button onClick={startFulfil} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "8px 14px" }}>
                                  <Truck size={14} /> Mark fulfilled
                                </button>
                              )}
                              {o.status !== "Refunded" && (
                                <button onClick={() => setMode("refund")} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 8, padding: "8px 14px" }}>
                                  <RotateCcw size={14} /> Refund
                                </button>
                              )}
                              {(o.status === "Fulfilled" || o.status === "Refunded") && (
                                <span className="text-[11px] font-light" style={{ color: MUTED }}>No further actions for a {o.status.toLowerCase()} order.</span>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}