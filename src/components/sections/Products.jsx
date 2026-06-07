import React, { useState } from "react";
import { ChevronDown, Minus, Plus, Check, X } from "lucide-react";
import { fmt, INK, MUTED, ADMIN, FAMILIES, totalStock, lowStock } from "../../constants/data";

const card = { background: "#fff", border: `1px solid ${ADMIN.line}`, borderRadius: 14 };
const field = { border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 10px", color: INK, background: "#fff", fontSize: 13, width: "100%" };

const sizesFor = (cat) => (cat === "Tees" ? ["Small", "Medium", "Large"] : ["One Size"]);
const skuPrefix = { Tees: "TEE", Caps: "CAP", Bags: "BAG" };
const autoSku = (cat) => `JV-${skuPrefix[cat] || "GEN"}-${Math.floor(100 + Math.random() * 900)}`;

function Chip({ children, muted }) {
  return (
    <span className="inline-block text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: muted ? MUTED : INK, border: `1px solid ${muted ? ADMIN.line : INK}`, borderRadius: 999, padding: "2px 9px" }}>
      {children}
    </span>
  );
}

const BLANK = { name: "", category: "Tees", price: "", compareAt: "", sku: "", images: [], blurb: "", status: "live", badge: false, stock: {} };

export default function Products({ products = [], updateProduct, addProduct }) {
  const [openId, setOpenId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState(BLANK);
  const [imgInput, setImgInput] = useState("");

  const toggle = (id) => setOpenId((cur) => (cur === id ? null : id));
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));
  const setCategory = (c) => setDraft((d) => ({ ...d, category: c, stock: {} })); // reset stock keys on category change
  const setStockDraft = (size, v) => setDraft((d) => ({ ...d, stock: { ...d.stock, [size]: v } }));
  const addImage = () => {
    const u = imgInput.trim();
    if (!u) return;
    setDraft((d) => ({ ...d, images: [...d.images, u] }));
    setImgInput("");
  };
  const removeImage = (i) => setDraft((d) => ({ ...d, images: d.images.filter((_, idx) => idx !== i) }));
  const resetCreate = () => { setDraft(BLANK); setImgInput(""); setCreating(false); };

  const create = () => {
    const name = draft.name.trim();
    if (!name || draft.price === "" || draft.images.length === 0) return;
    const sizes = sizesFor(draft.category);
    const stock = {};
    sizes.forEach((s) => { stock[s] = Math.max(0, parseInt(draft.stock[s], 10) || 0); });
    addProduct({
      name,
      category: draft.category,
      family: draft.category,
      price: Math.max(0, Number(draft.price) || 0),
      compareAt: draft.compareAt ? Math.max(0, Number(draft.compareAt)) : undefined,
      sku: draft.sku.trim() || autoSku(draft.category),
      images: draft.images,
      image: draft.images[0],
      fit: "",
      sizes,
      rating: 0,
      reviews: 0,
      badge: draft.badge ? "New" : null,
      status: draft.status,
      material: [],
      highlights: [],
      care: [],
      blurb: draft.blurb.trim(),
      stock,
      lowStockThreshold: 5,
    });
    resetCreate();
  };

  const setStock = (p, size, val) => updateProduct(p.id, { stock: { ...p.stock, [size]: Math.max(0, val || 0) } });
  const setPrice = (p, val) => updateProduct(p.id, { price: Math.max(0, Number(val) || 0) });
  const setCompare = (p, val) => updateProduct(p.id, { compareAt: val ? Math.max(0, Number(val)) : undefined });
  const toggleBadge = (p) => updateProduct(p.id, { badge: p.badge ? null : "New" });
  const toggleStatus = (p) => updateProduct(p.id, { status: p.status === "live" ? "draft" : "live" });

  return (
    <div className="flex flex-col gap-5">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <span className="text-[12px]" style={{ color: MUTED }}>{products.length} products</span>
        {!creating && (
          <button onClick={() => setCreating(true)} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "9px 16px" }}>
            <Plus size={14} /> Add product
          </button>
        )}
      </div>

      {/* Create panel */}
      {creating && (
        <div style={{ ...card, padding: 22 }}>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: INK, marginBottom: 16 }}>New product</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Name *</label>
              <input style={field} value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="Heavyweight Box Tee" />
            </div>
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Category</label>
              <div className="flex flex-wrap gap-1.5">
                {FAMILIES.map((c) => {
                  const on = draft.category === c;
                  return (
                    <button key={c} onClick={() => setCategory(c)} className="text-[10px] font-bold uppercase tracking-[0.06em] cursor-pointer" style={on ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 999, padding: "6px 12px" } : { background: "#fff", color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 999, padding: "6px 12px" }}>{c}</button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Price (R) *</label>
              <input type="number" style={field} value={draft.price} onChange={(e) => set("price", e.target.value)} placeholder="450" />
            </div>
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Compare-at (R) — optional</label>
              <input type="number" style={field} value={draft.compareAt} onChange={(e) => set("compareAt", e.target.value)} placeholder="leave blank for none" />
            </div>
            <div>
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>SKU — optional</label>
              <input style={field} value={draft.sku} onChange={(e) => set("sku", e.target.value)} placeholder={`auto: ${autoSku(draft.category)}`} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Images * — first is the cover, the rest power the gallery swipe</label>
              <div className="flex items-center gap-2">
                <input
                  style={field}
                  value={imgInput}
                  onChange={(e) => setImgInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addImage(); } }}
                  placeholder="https://…  (paste a URL, press Enter or Add)"
                />
                <button onClick={addImage} className="shrink-0 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white cursor-pointer border-none" style={{ background: INK, borderRadius: 8, padding: "9px 14px" }}><Plus size={13} /> Add</button>
              </div>
              {draft.images.length > 0 && (
                <div className="flex flex-wrap gap-2" style={{ marginTop: 10 }}>
                  {draft.images.map((u, i) => (
                    <div key={i} className="relative" style={{ width: 56, height: 70, borderRadius: 6, overflow: "hidden", border: `1px solid ${ADMIN.line}`, background: "#F4F4F2" }}>
                      <img src={u} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />
                      {i === 0 && <span className="absolute bottom-0 left-0 right-0 text-center text-[8px] font-bold uppercase" style={{ background: INK, color: "#fff", padding: "1px 0" }}>Cover</span>}
                      <button onClick={() => removeImage(i)} className="absolute flex items-center justify-center cursor-pointer border-none" style={{ top: 2, right: 2, width: 16, height: 16, background: "rgba(0,0,0,0.6)", color: "#fff", borderRadius: 999 }} aria-label="Remove image"><X size={10} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Short description — optional</label>
              <input style={field} value={draft.blurb} onChange={(e) => set("blurb", e.target.value)} placeholder="The one you reach for daily." />
            </div>

            {/* Initial stock per size */}
            <div className="md:col-span-2">
              <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 6 }}>Starting stock</label>
              <div className="flex flex-wrap gap-3">
                {sizesFor(draft.category).map((size) => (
                  <div key={size} className="flex items-center gap-2">
                    <span className="text-[12px]" style={{ color: INK }}>{size}</span>
                    <input type="number" value={draft.stock[size] ?? ""} onChange={(e) => setStockDraft(size, e.target.value)} placeholder="0" style={{ ...field, width: 80 }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="md:col-span-2 flex flex-wrap gap-2">
              <button onClick={() => set("status", draft.status === "live" ? "draft" : "live")} className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer" style={draft.status === "live" ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 8, padding: "8px 14px" } : { background: "#fff", color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 14px" }}>{draft.status === "live" ? "Live" : "Draft"}</button>
              <button onClick={() => set("badge", !draft.badge)} className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer" style={draft.badge ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 8, padding: "8px 14px" } : { background: "#fff", color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 14px" }}>{draft.badge ? '"New" badge on' : "No badge"}</button>
            </div>
          </div>

          <div className="flex items-center gap-2" style={{ marginTop: 18 }}>
            <button onClick={create} disabled={!draft.name.trim() || draft.price === "" || draft.images.length === 0} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white cursor-pointer border-none disabled:opacity-40" style={{ background: INK, borderRadius: 8, padding: "9px 16px" }}>
              <Check size={14} /> Add product
            </button>
            <button onClick={resetCreate} className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] cursor-pointer bg-transparent" style={{ color: MUTED, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "9px 16px" }}>
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
              {["Product", "Price", "Stock", "Status", ""].map((h, i) => (
                <th key={i} className="text-left text-[10px] font-bold uppercase tracking-[0.1em] py-2" style={{ color: MUTED, borderBottom: `1px solid ${ADMIN.line}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const open = openId === p.id;
              const total = totalStock(p);
              const low = lowStock(p);
              return (
                <React.Fragment key={p.id}>
                  <tr onClick={() => toggle(p.id)} className="cursor-pointer" style={{ background: open ? "#FAFAF8" : "transparent" }}>
                    <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                      <div className="flex items-center gap-3">
                        <div className="shrink-0 overflow-hidden" style={{ width: 44, height: 54, background: "#F4F4F2", borderRadius: 4 }}>
                          {p.image && <img src={p.image} alt={p.name} className="w-full h-full object-cover" />}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[12px] font-bold uppercase tracking-tight truncate" style={{ color: INK }}>{p.name}</div>
                          <div className="text-[10px]" style={{ color: MUTED }}>{p.category} · {p.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 whitespace-nowrap" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                      {p.compareAt ? (
                        <span className="text-[12px]"><span className="font-semibold" style={{ color: INK }}>{fmt(p.price)}</span>{" "}<span className="line-through" style={{ color: MUTED }}>{fmt(p.compareAt)}</span></span>
                      ) : (
                        <span className="text-[12px] font-semibold" style={{ color: INK }}>{fmt(p.price)}</span>
                      )}
                    </td>
                    <td className="py-3 whitespace-nowrap" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                      <span className="text-[12px] font-semibold" style={{ color: INK, marginRight: 8 }}>{total}</span>
                      {total === 0 ? <Chip>Out</Chip> : low ? <Chip>Low</Chip> : null}
                    </td>
                    <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                      {p.status === "draft" ? <Chip muted>Draft</Chip> : <Chip>Live</Chip>}
                    </td>
                    <td className="py-3" style={{ borderBottom: `1px solid ${ADMIN.line}` }}>
                      <ChevronDown size={16} style={{ color: MUTED, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                    </td>
                  </tr>

                  {open && (
                    <tr>
                      <td colSpan={5} style={{ borderBottom: `1px solid ${ADMIN.line}`, background: "#FAFAF8" }}>
                        <div className="px-1 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Inventory */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: MUTED, marginBottom: 10 }}>Inventory</div>
                            <div className="flex flex-col gap-2">
                              {p.sizes.map((size) => {
                                const n = p.stock?.[size] ?? 0;
                                return (
                                  <div key={size} className="flex items-center justify-between gap-3">
                                    <span className="text-[12px] font-medium" style={{ color: INK }}>{size}</span>
                                    <div className="flex items-center" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 8, background: "#fff" }}>
                                      <button onClick={() => setStock(p, size, n - 1)} className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer" style={{ color: MUTED }}><Minus size={12} /></button>
                                      <input value={n} onChange={(e) => setStock(p, size, parseInt(e.target.value, 10))} className="w-10 text-center text-[12px] font-bold bg-transparent border-none outline-none" style={{ color: n === 0 ? "#C0564B" : INK }} />
                                      <button onClick={() => setStock(p, size, n + 1)} className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer" style={{ color: MUTED }}><Plus size={12} /></button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Pricing */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: MUTED, marginBottom: 10 }}>Pricing</div>
                            <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Price (R)</label>
                            <input type="number" value={p.price} onChange={(e) => setPrice(p, e.target.value)} className="w-full text-[13px] bg-white outline-none mb-3" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 10px", color: INK }} />
                            <label className="block text-[11px]" style={{ color: MUTED, marginBottom: 4 }}>Compare-at (R) — leave blank for none</label>
                            <input type="number" value={p.compareAt ?? ""} onChange={(e) => setCompare(p, e.target.value)} className="w-full text-[13px] bg-white outline-none" style={{ border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "8px 10px", color: INK }} />
                          </div>

                          {/* Visibility */}
                          <div>
                            <div className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: MUTED, marginBottom: 10 }}>Visibility</div>
                            <div className="flex flex-col gap-2">
                              <button onClick={() => toggleStatus(p)} className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer text-left" style={p.status === "live" ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 8, padding: "9px 12px" } : { background: "#fff", color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "9px 12px" }}>{p.status === "live" ? "Live — tap to set draft" : "Draft — tap to set live"}</button>
                              <button onClick={() => toggleBadge(p)} className="text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer text-left" style={p.badge ? { background: INK, color: "#fff", border: `1px solid ${INK}`, borderRadius: 8, padding: "9px 12px" } : { background: "#fff", color: INK, border: `1px solid ${ADMIN.line}`, borderRadius: 8, padding: "9px 12px" }}>{p.badge ? `"${p.badge}" badge on — tap to remove` : "No badge — tap to mark New"}</button>
                            </div>
                          </div>
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