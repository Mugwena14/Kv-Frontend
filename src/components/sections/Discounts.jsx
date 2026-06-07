import React, { useState } from "react";
import { Plus, Check, X, Tag as TagIcon } from "lucide-react";
import { fmt, INK, MUTED, ADMIN } from "../../constants/data";

const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };
const TYPES = [
  { key: "percent", label: "Percent %" },
  { key: "fixed", label: "Fixed R" },
  { key: "freeship", label: "Free shipping" },
];

const today = new Date().toISOString().slice(0, 10);
const statusOf = (d) =>
  d.disabled ? "Disabled" : today < d.from ? "Scheduled" : today > d.to ? "Expired" : "Active";

const valueLabel = (d) =>
  d.type === "percent" ? `${d.value}%` : d.type === "fixed" ? fmt(d.value) : "Free shipping";

const fmtDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

function StatusChip({ status }) {
  const active = status === "Active";
  return (
    <span
      className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]"
      style={active
        ? { background: INK, color: "#fff", borderRadius: 999, padding: "2px 9px" }
        : { color: status === "Scheduled" ? INK : MUTED, border: `1px solid ${status === "Scheduled" ? INK : ADMIN.line}`, borderRadius: 999, padding: "2px 9px" }}
    >
      {status}
    </span>
  );
}

const field = { border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 10px", color: INK, background: "#fff", fontSize: 13 };

export default function Discounts({ discounts = [], addDiscount, disableDiscount }) {
  const [creating, setCreating] = useState(false);
  const [confirmCode, setConfirmCode] = useState(null);

  const plus30 = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
  const blank = { code: "", type: "percent", value: 10, from: today, to: plus30 };
  const [draft, setDraft] = useState(blank);

  const reset = () => { setDraft(blank); setCreating(false); };

  const create = () => {
    const code = draft.code.trim().toUpperCase().replace(/\s+/g, "");
    if (!code) return;
    addDiscount({
      code,
      type: draft.type,
      value: draft.type === "freeship" ? 0 : Math.max(0, Number(draft.value) || 0),
      from: draft.from,
      to: draft.to,
    });
    reset();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px]" style={{ color: MUTED }}>
          <TagIcon size={15} /> {discounts.length} codes
        </div>
        {!creating && (
          <button
            onClick={() => setCreating(true)}
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer border-none"
            style={{ background: INK, borderRadius: 8, padding: "9px 16px" }}
          >
            <Plus size={14} /> New code
          </button>
        )}
      </div>

      {/* Create form */}
      {creating && (
        <div style={{ ...card, padding: 22 }}>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginBottom: 16 }}>New discount code</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Code</label>
              <input value={draft.code} onChange={(e) => setDraft({ ...draft, code: e.target.value })} placeholder="WINTER15" className="w-full outline-none uppercase" style={field} />
            </div>
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Type</label>
              <div className="flex flex-wrap gap-1.5">
                {TYPES.map((t) => {
                  const on = draft.type === t.key;
                  return (
                    <button key={t.key} onClick={() => setDraft({ ...draft, type: t.key })}
                      className="text-[10px] font-bold uppercase tracking-[0.06em] cursor-pointer"
                      style={on ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 999, padding: "6px 10px" }
                                : { background: "#fff", color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 999, padding: "6px 10px" }}>
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>
                {draft.type === "percent" ? "Percent (%)" : draft.type === "fixed" ? "Amount (R)" : "Value"}
              </label>
              <input
                type="number" value={draft.type === "freeship" ? "" : draft.value}
                disabled={draft.type === "freeship"}
                onChange={(e) => setDraft({ ...draft, value: e.target.value })}
                placeholder={draft.type === "freeship" ? "n/a" : "10"}
                className="w-full outline-none" style={{ ...field, opacity: draft.type === "freeship" ? 0.5 : 1 }}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>From</label>
                <input type="date" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} className="w-full outline-none" style={field} />
              </div>
              <div>
                <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>To</label>
                <input type="date" value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} className="w-full outline-none" style={field} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2" style={{ marginTop: 18 }}>
            <button onClick={create} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "9px 16px" }}>
              <Check size={14} /> Create code
            </button>
            <button onClick={reset} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] cursor-pointer bg-transparent" style={{ color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "9px 16px" }}>
              <X size={14} /> Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ ...card, padding: 22 }} className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Code", "Type", "Value", "Window", "Uses", "Status", ""].map((h, i) => (
                <th key={i} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => {
              const status = statusOf(d);
              const canDisable = status === "Active" || status === "Scheduled";
              const confirming = confirmCode === d.code;
              return (
                <tr key={d.code}>
                  <td className="py-3 text-[12px] font-bold uppercase" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{d.code}</td>
                  <td className="py-3 text-[12px] capitalize" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{d.type}</td>
                  <td className="py-3 text-[12px] font-semibold" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{valueLabel(d)}</td>
                  <td className="py-3 text-[11px] whitespace-nowrap" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{fmtDate(d.from)} – {fmtDate(d.to)}</td>
                  <td className="py-3 text-[12px]" style={{ color: INK, borderBottom: `1px solid ${ADMIN.line}` }}>{d.uses}</td>
                  <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}><StatusChip status={status} /></td>
                  <td className="py-3 text-right whitespace-nowrap" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                    {confirming ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="text-[11px]" style={{ color: INK }}>Disable {d.code}?</span>
                        <button onClick={() => { disableDiscount(d.code); setConfirmCode(null); }} className="text-[10px] font-bold uppercase cursor-pointer text-white border-none" style={{ background: INK, borderRadius: 6, padding: "5px 9px" }}>Confirm</button>
                        <button onClick={() => setConfirmCode(null)} className="text-[10px] font-bold uppercase cursor-pointer bg-transparent" style={{ color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 6, padding: "5px 9px" }}>Cancel</button>
                      </span>
                    ) : canDisable ? (
                      <button onClick={() => setConfirmCode(d.code)} className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 8, padding: "6px 12px" }}>Disable</button>
                    ) : (
                      <span className="text-[12px]" style={{ color: MUTED }}>—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}