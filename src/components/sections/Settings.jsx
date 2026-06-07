import React, { useState } from "react";
import { Check } from "lucide-react";
import { INK, MUTED, ADMIN } from "../../constants/data";

const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };
const field = { border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "9px 11px", color: INK, background: "#fff", fontSize: 13, width: "100%" };

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{ ...card, padding: 22 }}>
      <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginBottom: 16 }}>{title}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

export default function Settings({ settings, onSave }) {
  const [draft, setDraft] = useState(settings);
  const [saved, setSaved] = useState(false);
  const set = (k, v) => { setDraft((d) => ({ ...d, [k]: v })); setSaved(false); };

  const save = () => { onSave?.(draft); setSaved(true); };

  return (
    <div className="flex flex-col gap-5" style={{ maxWidth: 820 }}>
      <Panel title="Store">
        <Field label="Store name"><input style={field} value={draft.storeName} onChange={(e) => set("storeName", e.target.value)} /></Field>
        <Field label="Contact email"><input style={field} value={draft.email} onChange={(e) => set("email", e.target.value)} /></Field>
        <Field label="Phone"><input style={field} value={draft.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
      </Panel>

      <Panel title="Shipping (PEP Paxi)">
        <Field label="Free shipping from (items)"><input type="number" style={field} value={draft.freeShipQty} onChange={(e) => set("freeShipQty", Number(e.target.value) || 0)} /></Field>
        <Field label="Paxi store code"><input style={field} value={draft.paxiCode} onChange={(e) => set("paxiCode", e.target.value)} /></Field>
        <Field label="Paxi enabled">
          <button onClick={() => set("paxiEnabled", !draft.paxiEnabled)} className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer text-left" style={draft.paxiEnabled ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 8, padding: "9px 14px" } : { background: "#fff", color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "9px 14px" }}>{draft.paxiEnabled ? "Enabled" : "Disabled"}</button>
        </Field>
      </Panel>

      <Panel title="Storefront">
        <div className="md:col-span-2">
          <Field label="Announcement bar text"><input style={field} value={draft.announce} onChange={(e) => set("announce", e.target.value)} /></Field>
        </div>
      </Panel>

      <div className="flex items-center gap-3">
        <button onClick={save} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "11px 20px" }}>Save changes</button>
        {saved && <span className="inline-flex items-center gap-1 text-[12px] font-bold" style={{ color: INK }}><Check size={14} /> Saved</span>}
      </div>
    </div>
  );
}

