import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { STORE, fmt, INK, MUTED, ADMIN } from "../../constants/data";

const card = {
  background: "#fff",
  border: `1px solid ${ADMIN.line}`,
  borderRadius: 14,
};

const itemsCount = (o) => (o.items || []).reduce((a, it) => a + it.qty, 0);

const fmtWhen = (iso) => {
  const d = new Date(iso);
  const day = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const t = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${day} · ${t}`;
};

function Label({ children, sub }) {
  return (
    <div className="flex items-baseline justify-between" style={{ marginBottom: 16 }}>
      <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK }}>{children}</span>
      {sub && <span className="text-[11px] font-light" style={{ color: MUTED }}>{sub}</span>}
    </div>
  );
}

export default function Dashboard({ orders = STORE.orders }) {
  const weekDelta = Math.round(
    ((STORE.revenueThisWeek - STORE.revenueLastWeek) / STORE.revenueLastWeek) * 100
  );

  const kpis = [
    { label: "Revenue today", value: fmt(STORE.revenueToday), delta: `${weekDelta >= 0 ? "+" : ""}${weekDelta}%`, up: weekDelta >= 0, sub: "vs last week" },
    { label: "Orders today", value: STORE.ordersToday, delta: `+${STORE.ordersDelta}%`, up: STORE.ordersDelta >= 0, sub: "vs yesterday" },
    { label: "Conversion", value: `${STORE.conversion}%`, delta: `+${STORE.conversionDelta} pts`, up: STORE.conversionDelta >= 0, sub: "7-day avg" },
    { label: "Customers", value: STORE.customersTotal.toLocaleString("en-US"), delta: `+${STORE.newCustomers}`, up: true, sub: "new this week" },
  ];

  const maxRev = Math.max(...STORE.weekly.map((w) => w.revenue));
  const maxCat = Math.max(...STORE.byCategory.map((c) => c.sales));
  const recent = orders.slice(0, 6);

  return (
    <div className="flex flex-col gap-5">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => {
          const Arrow = k.up ? ArrowUpRight : ArrowDownRight;
          return (
            <div key={k.label} style={{ ...card, padding: 20 }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: MUTED }}>{k.label}</span>
              <div className="flex items-end justify-between" style={{ marginTop: 12 }}>
                <span className="font-extrabold tracking-tight" style={{ color: INK, fontSize: 26, lineHeight: 1 }}>{k.value}</span>
                <span className="inline-flex items-center gap-0.5 text-[12px] font-bold" style={{ color: INK }}>
                  <Arrow size={14} />{k.delta}
                </span>
              </div>
              <span className="block text-[11px] font-light" style={{ color: MUTED, marginTop: 6 }}>{k.sub}</span>
            </div>
          );
        })}
      </div>

      {/* Revenue chart + categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly revenue */}
        <div className="lg:col-span-2" style={{ ...card, padding: 22 }}>
          <Label sub={fmt(STORE.revenueThisWeek) + " this week"}>Revenue · last 7 days</Label>
          <div className="flex items-end justify-between gap-3" style={{ height: 180 }}>
            {STORE.weekly.map((w, i) => {
              const h = Math.round((w.revenue / maxRev) * 100);
              const isLast = i === STORE.weekly.length - 1;
              return (
                <div key={w.day} className="flex-1 flex flex-col items-center justify-end h-full">
                  <span className="text-[10px] font-medium" style={{ color: MUTED, marginBottom: 6 }}>
                    {Math.round(w.revenue / 1000)}k
                  </span>
                  <div
                    title={`${w.day}: ${fmt(w.revenue)}`}
                    style={{
                      width: "100%", maxWidth: 38, height: `${h}%`, borderRadius: 4,
                      background: isLast ? INK : "#D9D9D6",
                    }}
                  />
                  <span className="text-[11px] font-bold uppercase" style={{ color: isLast ? INK : MUTED, marginTop: 8 }}>
                    {w.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sales by category */}
        <div style={{ ...card, padding: 22 }}>
          <Label>Sales by category</Label>
          <div className="flex flex-col gap-4" style={{ marginTop: 4 }}>
            {STORE.byCategory.map((c) => (
              <div key={c.category}>
                <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
                  <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: INK }}>{c.category}</span>
                  <span className="text-[12px] font-semibold" style={{ color: MUTED }}>{c.sales}</span>
                </div>
                <div style={{ height: 8, background: "#EFEFED", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(c.sales / maxCat) * 100}%`, background: INK, borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top sellers + recent orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top sellers */}
        <div style={{ ...card, padding: 22 }}>
          <Label>Top sellers</Label>
          <div className="flex flex-col">
            {STORE.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 py-3" style={{ borderTop: i ? `1px solid ${ADMIN.line}` : "none" }}>
                <span className="flex items-center justify-center text-[11px] font-extrabold" style={{ width: 24, height: 24, background: INK, color: "#fff", borderRadius: 6 }}>
                  {i + 1}
                </span>
                <div className="grow min-w-0">
                  <div className="text-[12px] font-bold uppercase tracking-tight truncate" style={{ color: INK }}>{p.name}</div>
                  <div className="text-[11px] font-light" style={{ color: MUTED }}>{p.units} sold</div>
                </div>
                <span className="text-[12px] font-semibold" style={{ color: INK }}>{fmt(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="lg:col-span-2 overflow-x-auto" style={{ ...card, padding: 22 }}>
          <Label sub={`${orders.length} total`}>Recent orders</Label>
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Order", "Customer", "Items", "Total", "Status", "Placed"].map((h) => (
                  <th key={h} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((o) => (
                <tr key={o.id}>
                  <td className="py-3 text-[12px] font-bold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{o.id}</td>
                  <td className="py-3 text-[12px]" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{o.customer}</td>
                  <td className="py-3 text-[12px]" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{itemsCount(o)}</td>
                  <td className="py-3 text-[12px] font-semibold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{fmt(o.total)}</td>
                  <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "2px 9px" }}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-[11px] whitespace-nowrap" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{fmtWhen(o.placedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}