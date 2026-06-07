import React, { useMemo, useRef, useState, useEffect } from "react";
import { Bot, Send, Sparkles, AlertTriangle, Check, X, Mic, Clock, Play, Mail, ShieldCheck } from "lucide-react";
import {
  STORE, fmt, INK, MUTED, ADMIN, lowStock, totalStock, askClaude,
} from "../../constants/data";

const MOCK = true; // demo mode — writes hit local state, no real backend
const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };

const QUICK = [
  "What sold today?",
  "Which orders need fulfilling?",
  "Fulfil all paid orders",
  "Restock Heavyweight Box Tee medium to 40",
  "Email everyone who bought the Canvas Tote",
  "Create a 15% code WEEKEND",
  "Who are my top customers?",
];

const GREETING = {
  role: "assistant",
  text:
    "Hi — I'm your JV Kourt store assistant. I can read your store data and take actions on your behalf:\n\n" +
    "• Check sales, unfulfilled orders, low stock, top customers\n" +
    "• Mark orders fulfilled (one or all paid) and refund\n" +
    "• Restock a product, e.g. \"restock the Box Tee medium to 40\"\n" +
    "• Email customers who bought a product\n" +
    "• Create discount codes and save automations\n\n" +
    "Anything that changes data asks for confirmation first.",
};

const newTracking = () => `PAXI-${Math.floor(1000 + Math.random() * 9000)}-ZA`;
const titleCase = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());

function StatusChip({ status }) {
  return <span className="inline-block text-[9px] font-bold uppercase tracking-[0.08em]" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "1px 7px" }}>{status}</span>;
}

function Cards({ cards }) {
  if (!cards) return null;
  const { kind, items } = cards;
  if (!items || items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2" style={{ marginTop: 12 }}>
      {items.map((it, i) => {
        if (kind === "orders") return (
          <div key={i} className="flex items-center justify-between" style={{ ...card, padding: "10px 12px" }}>
            <div className="min-w-0"><span className="text-[12px] font-bold" style={{ color: INK }}>{it.id}</span><span className="text-[11px]" style={{ color: MUTED }}> · {it.customer}</span></div>
            <div className="flex items-center gap-2 shrink-0"><span className="text-[12px] font-semibold" style={{ color: INK }}>{fmt(it.total)}</span><StatusChip status={it.status} /></div>
          </div>
        );
        if (kind === "products") { const total = totalStock(it); return (
          <div key={i} className="flex items-center justify-between" style={{ ...card, padding: "10px 12px" }}>
            <span className="text-[12px] font-bold uppercase tracking-tight truncate" style={{ color: INK }}>{it.name}</span>
            <span className="flex items-center gap-2 shrink-0"><span className="text-[12px] font-semibold" style={{ color: INK }}>{total} in stock</span>{total === 0 ? <StatusChip status="Out" /> : <StatusChip status="Low" />}</span>
          </div>
        ); }
        if (kind === "customers") return (
          <div key={i} className="flex items-center justify-between" style={{ ...card, padding: "10px 12px" }}>
            <span className="text-[12px] font-bold" style={{ color: INK }}>{it.name}</span>
            <span className="text-[11px]" style={{ color: MUTED }}>{it.orders} orders · <span style={{ color: INK, fontWeight: 600 }}>{fmt(it.spent)}</span></span>
          </div>
        );
        if (kind === "topProducts") return (
          <div key={i} className="flex items-center justify-between" style={{ ...card, padding: "10px 12px" }}>
            <span className="text-[12px] font-bold uppercase tracking-tight truncate" style={{ color: INK }}>{it.name}</span>
            <span className="text-[11px]" style={{ color: MUTED }}>{it.units} sold · <span style={{ color: INK, fontWeight: 600 }}>{fmt(it.revenue)}</span></span>
          </div>
        );
        return null;
      })}
    </div>
  );
}

export default function CoPilot({ orders = [], products = [], customers = [], discounts = [], updateOrder, updateProduct, addDiscount }) {
  const idRef = useRef(1);
  const [messages, setMessages] = useState([{ id: 0, ...GREETING }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [listening, setListening] = useState(false);
  const [automations, setAutomations] = useState([{ id: 1, label: "Every Monday", task: "Which products are low on stock?" }]);
  const recogRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, busy]);

  const pushMsg = (m) => setMessages((ms) => [...ms, { id: idRef.current++, ...m }]);
  const setActionBody = (id, body) =>
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, action: { ...m.action, params: { ...m.action.params, body } } } : m)));

  const unfulfilled = useMemo(() => orders.filter((o) => o.status === "Paid" || o.status === "Processing"), [orders]);
  const lowItems = useMemo(() => products.filter((p) => lowStock(p)), [products]);
  const live = [
    { k: "Orders today", v: STORE.ordersToday }, { k: "Revenue today", v: fmt(STORE.revenueToday) },
    { k: "Unfulfilled", v: unfulfilled.length }, { k: "Low stock", v: lowItems.length },
  ];

  /* ---------- parsing helpers ---------- */
  const findOrder = (q) => {
    const m = q.match(/#?\s*jv-?\s*(\d{3,})/i);
    if (!m) return null;
    const norm = (s) => s.toLowerCase().replace(/[#\s]/g, "");
    return orders.find((o) => norm(o.id) === norm(`#JV-${m[1]}`)) || null;
  };
  const detectSize = (q) => {
    for (const [w, c] of [["small", "Small"], ["medium", "Medium"], ["large", "Large"], ["one size", "One Size"], ["onesize", "One Size"]]) if (q.includes(w)) return c;
    return null;
  };
  const findProduct = (q) => {
    let best = null, score = 0;
    products.forEach((p) => {
      const toks = p.name.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
      const s = toks.filter((t) => q.includes(t)).length;
      if (s > score) { score = s; best = p; }
    });
    return score > 0 ? best : null;
  };

  /* ---------- write intents ---------- */
  const localAction = (query) => {
    const q = query.toLowerCase();

    // automation
    if (/\b(every|each)\s+(day|morning|monday|tuesday|wednesday|thursday|friday|saturday|sunday|week)/.test(q) || /^automate[:\s]/.test(q)) {
      const label = titleCase((q.match(/(every|each)\s+\w+/) || ["recurring"])[0]);
      const task = query.replace(/(every|each)\s+\w+,?\s*/i, "").replace(/^automate[:\s]+/i, "").trim() || query;
      return { type: "createAutomation", params: { label, task }, summary: `Save an automation — ${label}:\n"${task}"` };
    }

    // email buyers
    if (/(email|e-mail|mail|notify|message)/.test(q) && /(bought|ordered|purchased|got)/.test(q)) {
      const p = findProduct(q);
      if (!p) return { type: "none", answer: "Which product? I couldn't match that to your catalogue." };
      const seen = new Set(); const recipients = [];
      orders.forEach((o) => { if (o.items.some((it) => it.productId === p.id) && !seen.has(o.email)) { seen.add(o.email); recipients.push({ name: o.customer, email: o.email }); } });
      if (!recipients.length) return { type: "none", answer: `No one has bought the ${p.name} yet.` };
      const body = `Hi there,\n\nThanks for picking up the ${p.name} from JV Kourt. Fresh drops just landed — have a look before they're gone.\n\nRules the streets quietly,\nJV Kourt`;
      return { type: "emailBuyers", params: { product: p.name, recipients, subject: "New from JV Kourt", body }, summary: `Email ${recipients.length} customer${recipients.length > 1 ? "s" : ""} who bought the ${p.name}.` };
    }

    // bulk fulfil
    if (/(fulfil|fulfill|mark|ship)/.test(q) && /(all|every)/.test(q) && /paid/.test(q)) {
      const ids = orders.filter((o) => o.status === "Paid").map((o) => o.id);
      if (!ids.length) return { type: "none", answer: "No paid orders to fulfil right now." };
      return { type: "bulkFulfil", params: { ids }, summary: `Mark ${ids.length} paid order${ids.length > 1 ? "s" : ""} as fulfilled and attach PEP tracking to each.\n${ids.join(", ")}` };
    }
    // single fulfil
    if (/(fulfil|fulfill|ship|mark)/.test(q) && /jv-?\s*\d/.test(q)) {
      const o = findOrder(q);
      if (!o) return { type: "none", answer: "I couldn't find that order." };
      if (o.status === "Fulfilled") return { type: "none", answer: `${o.id} is already fulfilled.` };
      if (o.status === "Refunded") return { type: "none", answer: `${o.id} was refunded — it can't be fulfilled.` };
      const tracking = newTracking();
      return { type: "fulfilOrder", params: { id: o.id, tracking }, summary: `Mark ${o.id} (${o.customer}) as fulfilled and attach tracking ${tracking}.` };
    }
    // refund
    if (/refund/.test(q) && /jv-?\s*\d/.test(q)) {
      const o = findOrder(q);
      if (!o) return { type: "none", answer: "I couldn't find that order." };
      if (o.status === "Refunded") return { type: "none", answer: `${o.id} is already refunded.` };
      return { type: "refundOrder", params: { id: o.id }, summary: `Refund ${fmt(o.total)} to ${o.customer} for ${o.id}. This can't be undone.` };
    }
    // restock
    if (/(restock|re-stock|set stock|add stock|stock)/.test(q) && /\bto\s+\d+/.test(q)) {
      const p = findProduct(q);
      if (!p) return { type: "none", answer: "Which product? I couldn't match that name to your catalogue." };
      const qty = parseInt(q.match(/to\s+(\d+)/)[1], 10);
      let size = detectSize(q);
      if (!size) { if (p.sizes.length === 1) size = p.sizes[0]; else return { type: "none", answer: `Which size for ${p.name}? (${p.sizes.join(", ")})` }; }
      return { type: "restock", params: { productId: p.id, size, qty, name: p.name }, summary: `Set ${p.name} — ${size} stock to ${qty}.` };
    }
    // create discount
    if ((/(create|make|add|new|set up)/.test(q) && /(code|discount|coupon|promo)/.test(q)) || /\d+%\s*(off|code|discount)/.test(q)) {
      let type = "percent", value = 10;
      const pct = q.match(/(\d+)\s*%/); const rand = q.match(/r\s?(\d+)/);
      if (/free ship/.test(q)) { type = "freeship"; value = 0; } else if (pct) { type = "percent"; value = parseInt(pct[1], 10); } else if (rand) { type = "fixed"; value = parseInt(rand[1], 10); }
      let code = null;
      const named = query.match(/(?:called|code|named|name)\s+["']?([A-Za-z0-9]{3,})/);
      if (named) code = named[1].toUpperCase();
      if (!code) { const up = query.match(/\b([A-Z][A-Z0-9]{2,})\b/); if (up && up[1] !== "JV") code = up[1]; }
      if (!code) code = type === "freeship" ? "FREESHIP" : type === "fixed" ? `R${value}OFF` : `SAVE${value}`;
      const from = new Date().toISOString().slice(0, 10);
      const to = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10);
      const label = type === "percent" ? `${value}%` : type === "fixed" ? fmt(value) : "free shipping";
      return { type: "createDiscount", params: { code, dtype: type, value, from, to }, summary: `Create code ${code} — ${label}, valid ${from} to ${to}.` };
    }
    return null;
  };

  /* ---------- read intents ---------- */
  const localResolve = (query) => {
    const q = query.toLowerCase();
    const refunds = orders.filter((o) => o.status === "Refunded");
    if (/(unfulfil|need.*fulfil|fulfil|pending|awaiting|to ship)/.test(q)) return unfulfilled.length ? { answer: `${unfulfilled.length} order${unfulfilled.length > 1 ? "s are" : " is"} awaiting fulfilment.`, cards: { kind: "orders", items: unfulfilled } } : { answer: "Nothing awaiting fulfilment — you're all caught up." };
    if (/(low stock|low on stock|restock|out of stock|inventory|running low)/.test(q)) return lowItems.length ? { answer: `${lowItems.length} product${lowItems.length > 1 ? "s are" : " is"} low or out of stock.`, cards: { kind: "products", items: lowItems } } : { answer: "Stock looks healthy — nothing below threshold." };
    if (/week/.test(q) && /(revenue|sales|made|earn|turnover)/.test(q)) { const delta = Math.round(((STORE.revenueThisWeek - STORE.revenueLastWeek) / STORE.revenueLastWeek) * 100); return { answer: `Revenue this week is ${fmt(STORE.revenueThisWeek)} — ${delta >= 0 ? "up" : "down"} ${Math.abs(delta)}% on last week (${fmt(STORE.revenueLastWeek)}).` }; }
    if (/today/.test(q) && /(sold|sale|sales|revenue|made|earn)/.test(q)) return { answer: `Today you've made ${fmt(STORE.revenueToday)} across ${STORE.ordersToday} orders. Best sellers right now:`, cards: { kind: "topProducts", items: STORE.topProducts } };
    if (/(top|best|biggest).*(customer|spender|buyer)/.test(q)) { const top = [...customers].sort((a, b) => b.spent - a.spent).slice(0, 3); return { answer: "Your top customers by spend:", cards: { kind: "customers", items: top } }; }
    if (/refund/.test(q)) return refunds.length ? { answer: `${refunds.length} refunded order${refunds.length > 1 ? "s" : ""} on record.`, cards: { kind: "orders", items: refunds } } : { answer: "No refunds on record." };
    if (/(best|top).*(sell|seller|product)/.test(q)) return { answer: "Your best sellers:", cards: { kind: "topProducts", items: STORE.topProducts } };
    if (/discount|promo|code|coupon/.test(q)) { const today = new Date().toISOString().slice(0, 10); const active = discounts.filter((d) => !d.disabled && today >= d.from && today <= d.to); return { answer: `${active.length} active discount code${active.length === 1 ? "" : "s"}: ${active.map((d) => d.code).join(", ") || "none"}.` }; }
    return null;
  };

  const execute = (a) => {
    switch (a.type) {
      case "fulfilOrder": updateOrder(a.params.id, { status: "Fulfilled", tracking: a.params.tracking }); return `${a.params.id} fulfilled · tracking ${a.params.tracking}.`;
      case "refundOrder": updateOrder(a.params.id, { status: "Refunded" }); return `Refunded ${a.params.id}.`;
      case "bulkFulfil": a.params.ids.forEach((id) => updateOrder(id, { status: "Fulfilled", tracking: newTracking() })); return `${a.params.ids.length} orders fulfilled.`;
      case "restock": { const p = products.find((x) => x.id === a.params.productId); updateProduct(a.params.productId, { stock: { ...(p?.stock || {}), [a.params.size]: a.params.qty } }); return `${a.params.name} — ${a.params.size} stock set to ${a.params.qty}.`; }
      case "createDiscount": addDiscount({ code: a.params.code, type: a.params.dtype, value: a.params.value, from: a.params.from, to: a.params.to }); return `Code ${a.params.code} created.`;
      case "createAutomation": setAutomations((xs) => [...xs, { id: Date.now(), label: a.params.label, task: a.params.task }]); return "Automation saved.";
      case "emailBuyers": return `Sent to ${a.params.recipients.length} customer${a.params.recipients.length > 1 ? "s" : ""}${MOCK ? " (mock — nothing actually left your store)" : ""}.`;
      default: return "Done.";
    }
  };

  const confirm = (id) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg?.action || msg.action.status !== "pending") return;
    const result = execute(msg.action);
    setMessages((ms) => ms.map((m) => (m.id === id ? { ...m, action: { ...m.action, status: "done", result } } : m)));
  };
  const cancel = (id) => setMessages((ms) => ms.map((m) => (m.id === id && m.action?.status === "pending" ? { ...m, action: { ...m.action, status: "cancelled" } } : m)));

  const send = async (text) => {
    const query = (text ?? input).trim();
    if (!query || busy) return;
    setInput("");
    pushMsg({ role: "user", text: query });
    setBusy(true);
    const action = localAction(query);
    if (action) {
      if (action.type === "none") pushMsg({ role: "assistant", text: action.answer });
      else pushMsg({ role: "assistant", text: "Here's what I'll do — confirm to apply:", action: { ...action, status: "pending" } });
      setBusy(false); return;
    }
    const read = localResolve(query);
    if (read) { pushMsg({ role: "assistant", ...read }); setBusy(false); return; }
    try {
      const slim = products.map((p) => ({ name: p.name, category: p.category, price: p.price, stock: totalStock(p) }));
      const ctx = { kpis: { revenueToday: STORE.revenueToday, ordersToday: STORE.ordersToday, revenueThisWeek: STORE.revenueThisWeek }, orders, products: slim, customers };
      const prompt = `You are the store assistant for JV Kourt, a streetwear store (tees, caps, bags). Current store data (JSON): ${JSON.stringify(ctx)}.\n\nOwner asks: "${query}".\nAnswer ONLY from this data, concise (1-3 sentences), money with an R prefix. Plain text.`;
      const raw = await askClaude(prompt);
      pushMsg({ role: "assistant", text: raw?.trim() || "I couldn't find that in your store data." });
    } catch {
      pushMsg({ role: "assistant", text: "I can read your store data and take actions — try today's sales, unfulfilled orders, low stock, or \"restock the Box Tee medium to 40\"." });
    } finally { setBusy(false); }
  };

  const toggleVoice = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { pushMsg({ role: "assistant", text: "Voice input isn't supported in this browser. Type your request and I'll handle it." }); return; }
    if (listening) { recogRef.current?.stop(); return; }
    const r = new SR(); recogRef.current = r;
    r.lang = "en-ZA"; r.interimResults = false; r.maxAlternatives = 1;
    r.onresult = (e) => setInput(e.results[0][0].transcript);
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    setListening(true); r.start();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4" style={{ minHeight: "calc(100vh - 64px - 64px)" }}>
      {/* Chat */}
      <div className="grow flex flex-col" style={{ ...card, overflow: "hidden" }}>
        <div className="flex items-center justify-between gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center" style={{ width: 34, height: 34, background: INK, borderRadius: 9 }}><Bot size={18} style={{ color: "#fff" }} /></div>
            <div>
              <div className="text-[14px] font-extrabold uppercase tracking-tight" style={{ color: INK }}>AI Co-pilot</div>
              <div className="text-[11px]" style={{ color: MUTED }}>JV Kourt · read + write access</div>
            </div>
          </div>
          {MOCK && <span className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: INK, border: `1px solid ${INK}`, borderRadius: 999, padding: "3px 10px" }}>Mock mode</span>}
        </div>

        <div className="grow overflow-y-auto px-5 py-5 flex flex-col gap-4" style={{ background: "#FAFAF8" }}>
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className="flex gap-2.5 max-w-[92%]" style={{ flexDirection: m.role === "user" ? "row-reverse" : "row" }}>
                {m.role === "assistant" && <div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, background: INK, borderRadius: 8 }}><Bot size={15} style={{ color: "#fff" }} /></div>}
                <div>
                  <div className="text-[13px]" style={m.role === "user" ? { background: INK, color: "#fff", borderRadius: 12, padding: "10px 14px", whiteSpace: "pre-wrap", lineHeight: 1.5 } : { background: "#fff", color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 12, padding: "12px 14px", whiteSpace: "pre-wrap", lineHeight: 1.55 }}>{m.text}</div>
                  {m.role === "assistant" && <Cards cards={m.cards} />}

                  {m.action && (
                    <div style={{ background: "#fff", border: `1px solid ${INK}`, borderRadius: 12, padding: 14, marginTop: 12 }}>
                      <div className="text-[12px]" style={{ color: INK, whiteSpace: "pre-wrap", lineHeight: 1.5 }}>{m.action.summary}</div>

                      {/* Email-specific UI */}
                      {m.action.type === "emailBuyers" && (
                        <div style={{ marginTop: 12 }}>
                          <div className="text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: MUTED, marginBottom: 6 }}>Recipients ({m.action.params.recipients.length})</div>
                          <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 12, maxHeight: 80, overflowY: "auto" }}>
                            {m.action.params.recipients.map((r) => <span key={r.email} className="text-[11px]" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 999, padding: "2px 9px", color: INK }}>{r.name}</span>)}
                          </div>
                          {m.action.status === "pending" && (
                            <textarea value={m.action.params.body} onChange={(e) => setActionBody(m.id, e.target.value)} rows={6} className="w-full text-[12px] outline-none" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: 10, color: INK, resize: "vertical", lineHeight: 1.5 }} />
                          )}
                          <div className="flex items-start gap-1.5 text-[10px]" style={{ color: MUTED, marginTop: 8, lineHeight: 1.5 }}>
                            <ShieldCheck size={13} className="shrink-0 mt-0.5" /> POPIA: only message customers who've opted in to marketing, and include an unsubscribe option.
                          </div>
                        </div>
                      )}

                      {m.action.status === "pending" ? (
                        <>
                          <div className="flex items-center gap-2" style={{ marginTop: 12 }}>
                            <button onClick={() => confirm(m.id)} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "8px 14px" }}><Check size={13} /> {m.action.type === "emailBuyers" ? "Send" : "Confirm"}</button>
                            <button onClick={() => cancel(m.id)} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer bg-transparent" style={{ color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 14px" }}><X size={13} /> Cancel</button>
                          </div>
                          <div className="text-[10px]" style={{ color: MUTED, marginTop: 10 }}>{MOCK ? "Mock mode — applies to local store data only." : "Applies to your store immediately."}</div>
                        </>
                      ) : m.action.status === "done" ? (
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold" style={{ color: INK, marginTop: 10 }}><Check size={13} /> {m.action.result}</div>
                      ) : (
                        <div className="text-[11px]" style={{ color: MUTED, marginTop: 10 }}>Cancelled — nothing changed.</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start"><div className="flex gap-2.5"><div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, background: INK, borderRadius: 8 }}><Bot size={15} style={{ color: "#fff" }} /></div><div className="text-[13px]" style={{ background: "#fff", color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 12, padding: "12px 14px" }}>…</div></div></div>
          )}
          <div ref={endRef} />
        </div>

        <div className="px-5 py-4" style={{ borderTop: `1px solid ${ADMIN.line}` }}>
          <div className="flex items-center gap-2" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 12, padding: "4px 4px 4px 14px" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask anything or give an instruction…" className="grow bg-transparent border-none outline-none text-sm py-2" style={{ color: INK }} />
            <button onClick={toggleVoice} className="flex items-center justify-center border-none cursor-pointer" style={{ width: 38, height: 38, background: listening ? INK : "transparent", border: listening ? "none" : `1px solid ${ADMIN.line}`, borderRadius: 9 }} aria-label="Voice input"><Mic size={16} style={{ color: listening ? "#fff" : MUTED }} /></button>
            <button onClick={() => send()} disabled={busy || !input.trim()} className="flex items-center justify-center border-none cursor-pointer disabled:opacity-30" style={{ width: 38, height: 38, background: INK, borderRadius: 9 }} aria-label="Send"><Send size={16} style={{ color: "#fff" }} /></button>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]" style={{ color: MUTED, marginTop: 10 }}><AlertTriangle size={12} /> Actions require confirmation before executing · always verify critical changes.</div>
        </div>
      </div>

      {/* Right rail */}
      <div className="lg:w-[320px] shrink-0 flex flex-col gap-4">
        <div style={{ ...card, padding: 18 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 14 }}><Sparkles size={15} style={{ color: INK }} /><span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK }}>Quick actions</span></div>
          <div className="flex flex-col gap-2">{QUICK.map((qa) => <button key={qa} onClick={() => send(qa)} disabled={busy} className="text-left text-[12px] cursor-pointer transition-colors hover:bg-[#FAFAF8] disabled:opacity-40" style={{ color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 10, padding: "10px 12px" }}>{qa}</button>)}</div>
        </div>

        <div style={{ ...card, padding: 18 }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 12 }}><Clock size={14} style={{ color: INK }} /><span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK }}>Automations</span></div>
          {automations.length === 0 ? <p className="text-[12px] font-light" style={{ color: MUTED }}>None yet — say "every Monday show low stock".</p> : (
            <div className="flex flex-col gap-2">
              {automations.map((a) => (
                <div key={a.id} className="flex items-center gap-2" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 10, padding: "8px 10px" }}>
                  <div className="grow min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: MUTED }}>{a.label}</div>
                    <div className="text-[12px] truncate" style={{ color: INK }}>{a.task}</div>
                  </div>
                  <button onClick={() => send(a.task)} className="shrink-0 flex items-center justify-center cursor-pointer border-none bg-transparent" aria-label="Run" style={{ color: INK }}><Play size={14} /></button>
                  <button onClick={() => setAutomations((xs) => xs.filter((x) => x.id !== a.id))} className="shrink-0 flex items-center justify-center cursor-pointer border-none bg-transparent" aria-label="Remove" style={{ color: MUTED }}><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ ...card, padding: 18 }}>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: MUTED }}>Live data</span>
          <div className="flex flex-col" style={{ marginTop: 10 }}>{live.map((s, i) => <div key={s.k} className="flex items-center justify-between py-2.5" style={{ borderTop: i ? `1px solid ${ADMIN.line}` : "none" }}><span className="text-[12px]" style={{ color: INK }}>{s.k}</span><span className="text-[13px] font-extrabold" style={{ color: INK }}>{s.v}</span></div>)}</div>
        </div>
      </div>
    </div>
  );
}