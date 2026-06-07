import React, { useState } from "react";
import { Download, Check } from "lucide-react";
import { fmt, INK, MUTED, ADMIN } from "../../constants/data";

const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };
const itemsCount = (o) => (o.items || []).reduce((a, it) => a + it.qty, 0);
const invNo = (id) => "INV-" + id.replace(/[^\d]/g, "");
const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

function StatusChip({ status }) {
  return <span className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "2px 9px" }}>{status}</span>;
}

export default function Invoices({ orders = [] }) {
  const [done, setDone] = useState(() => new Set());
  const mark = (id) => setDone((d) => new Set(d).add(id));

  const total = orders.filter((o) => o.status !== "Refunded").reduce((a, o) => a + o.total, 0);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { k: "Invoices", v: orders.length },
          { k: "Invoiced (net)", v: fmt(total) },
          { k: "Refunded", v: orders.filter((o) => o.status === "Refunded").length },
        ].map((s) => (
          <div key={s.k} style={{ ...card, padding: 18 }}>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>{s.k}</div>
            <div className="text-[22px] font-extrabold" style={{ color: INK, marginTop: 8 }}>{s.v}</div>
          </div>
        ))}
      </div>

      <div style={{ ...card, padding: 22 }} className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>{["Invoice", "Order", "Customer", "Items", "Amount", "Date", "Status", ""].map((h, i) => <th key={i} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="py-3 text-[12px] font-bold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{invNo(o.id)}</td>
                <td className="py-3 text-[12px]" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{o.id}</td>
                <td className="py-3 text-[12px]" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{o.customer}</td>
                <td className="py-3 text-[12px]" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{itemsCount(o)}</td>
                <td className="py-3 text-[12px] font-semibold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{fmt(o.total)}</td>
                <td className="py-3 text-[11px] whitespace-nowrap" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{fmtDate(o.placedAt)}</td>
                <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}><StatusChip status={o.status} /></td>
                <td className="py-3 text-right whitespace-nowrap" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                  {done.has(o.id) ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold" style={{ color: INK }}><Check size={13} /> Generated</span>
                  ) : (
                    <button onClick={() => mark(o.id)} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 8, padding: "6px 12px" }}><Download size={13} /> PDF</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-[11px] font-light" style={{ color: MUTED, marginTop: 14 }}>PDF generation is a backend step — this is a mock that flags the invoice as generated.</p>
      </div>
    </div>
  );
}