import React, { useMemo, useState } from "react";
import { Search, ChevronRight, ArrowLeft, Mail } from "lucide-react";
import { STORE, fmt, INK, MUTED, ADMIN } from "../../constants/data";

const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };

const itemsCount = (o) => (o.items || []).reduce((a, it) => a + it.qty, 0);
const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const fmtWhen = (iso) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} · ${d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false })}`;
};

function Tag({ children }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "2px 9px" }}>
      {children}
    </span>
  );
}

function StatusChip({ status }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "2px 9px" }}>
      {status}
    </span>
  );
}

export default function Customers({ customers = STORE.customers, orders = [] }) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter((c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q));
  }, [customers, query]);

  const selected = customers.find((c) => c.id === selectedId);
  const history = useMemo(() => {
    if (!selected) return [];
    return orders.filter((o) => o.email === selected.email || o.customer === selected.name);
  }, [selected, orders]);

  /* ---------- profile view ---------- */
  if (selected) {
    return (
      <div className="flex flex-col gap-5">
        <button
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-2 self-start bg-transparent border-none cursor-pointer text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: MUTED }}
        >
          <ArrowLeft size={15} /> All customers
        </button>

        {/* Header */}
        <div style={{ ...card, padding: 24 }}>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="m-0 text-2xl font-extrabold uppercase tracking-tight" style={{ color: INK }}>{selected.name}</h2>
              <div className="flex items-center gap-1.5 text-[12px]" style={{ color: MUTED, marginTop: 6 }}>
                <Mail size={13} /> {selected.email}
              </div>
              {selected.tags.length > 0 && (
                <div className="flex gap-2" style={{ marginTop: 12 }}>
                  {selected.tags.map((t) => <Tag key={t}>{t}</Tag>)}
                </div>
              )}
            </div>
            <div className="flex gap-8">
              {[
                { k: "Orders", v: selected.orders },
                { k: "Spent", v: fmt(selected.spent) },
                { k: "Last order", v: fmtDate(selected.lastOrder) },
              ].map((s) => (
                <div key={s.k} className="text-right">
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>{s.k}</div>
                  <div className="text-[16px] font-extrabold" style={{ color: INK, marginTop: 4 }}>{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History */}
        <div style={{ ...card, padding: 22 }} className="overflow-x-auto">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginBottom: 14 }}>Recent orders</div>
          {history.length === 0 ? (
            <p className="text-sm font-light py-6" style={{ color: MUTED }}>No orders on record in this view.</p>
          ) : (
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order", "Items", "Total", "Status", "Placed"].map((h) => (
                    <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 text-[12px] font-bold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{o.id}</td>
                    <td className="py-3 text-[12px]" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{itemsCount(o)}</td>
                    <td className="py-3 text-[12px] font-semibold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{fmt(o.total)}</td>
                    <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}><StatusChip status={o.status} /></td>
                    <td className="py-3 text-[11px] whitespace-nowrap" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{fmtWhen(o.placedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }

  /* ---------- list view ---------- */
  return (
    <div style={{ ...card, padding: 22 }}>
      <div className="flex items-center gap-2 max-w-[360px]" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 10, padding: "0 12px", marginBottom: 18 }}>
        <Search size={16} style={{ color: MUTED }} />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name or email…"
          className="grow bg-transparent border-none outline-none text-sm py-2.5"
          style={{ color: INK }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Customer", "Orders", "Spent", "Last order", "Tags", ""].map((h, i) => (
                <th key={i} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.length === 0 && (
              <tr><td colSpan={6} className="py-12 text-center text-sm font-light" style={{ color: MUTED }}>No customers match.</td></tr>
            )}
            {shown.map((c) => (
              <tr key={c.id} onClick={() => setSelectedId(c.id)} className="cursor-pointer hover:bg-[#FAFAF8]">
                <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                  <div className="text-[12px] font-bold uppercase tracking-tight" style={{ color: INK }}>{c.name}</div>
                  <div className="text-[10px]" style={{ color: MUTED }}>{c.email}</div>
                </td>
                <td className="py-3 text-[12px]" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{c.orders}</td>
                <td className="py-3 text-[12px] font-semibold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{fmt(c.spent)}</td>
                <td className="py-3 text-[11px] whitespace-nowrap" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{fmtDate(c.lastOrder)}</td>
                <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                  <div className="flex gap-1.5">{c.tags.length ? c.tags.map((t) => <Tag key={t}>{t}</Tag>) : <span className="text-[11px]" style={{ color: MUTED }}>—</span>}</div>
                </td>
                <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                  <ChevronRight size={16} style={{ color: MUTED }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}