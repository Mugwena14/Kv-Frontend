/* ---------- palette & helpers ---------- */
export const INK = "#0A0A0A";
export const BONE = "#FAFAF8";
export const LINE = "#E8E6E0";
export const AMBER = "#C9A86A";
export const MUTED = "#7A766E";

/* ---------- admin theme tokens (Phase 0) ----------
   Mono, like the storefront. `accent` is INK for LIGHT surfaces (ticks, bars,
   buttons); `onDark` is white for highlights ON the dark sidebar. */
export const ADMIN = {
  sidebar: "#0A0A0A",   // INK sidebar
  sidebar2: "#161616",  // hover / raised surface on the sidebar
  bg: "#F4F4F2",        // light content background
  line: "#E6E6E6",      // hairlines on light surfaces
  lineDark: "#222222",  // hairlines on the dark sidebar
  accent: "#0A0A0A",    // INK accent for light surfaces
  onDark: "#FFFFFF",    // white — highlights on the dark sidebar
  textDim: "#8A8A8A",   // muted text on dark
};

export const fmt = (n) => "R" + n.toLocaleString("en-US");

/* Pexels CDN helper — free stock, no attribution required.
   Swap these for JV Kourt's own product shots before launch. */
const img = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900`;

/* ---------- catalogue ---------- */
export const FAMILIES = ["Tees", "Caps", "Bags"]; // used as the category filter set
export const TINT = { Tees: "#9C9C9C", Caps: "#8A8A8A", Bags: "#B0AAA0" };

const APPAREL_SIZES = ["Small", "Medium", "Large"];
const ONE_SIZE = ["One Size"];

export const PRODUCTS = [
  {
    id: 1, name: "Heavyweight Box Tee", category: "Tees", family: "Tees",
    price: 450, rating: 4.8, reviews: 142, image: img(34579430), badge: "New",
    sku: "JV-TEE-001", fit: "Boxy", sizes: APPAREL_SIZES,
    material: ["100% combed cotton", "240gsm heavyweight", "Pre-shrunk"],
    highlights: ["Boxy, structured fit", "Ribbed crew neckline", "Embroidered JV Kourt mark", "Holds its shape wash after wash"],
    care: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Cool iron if needed"],
    blurb: "The one you reach for daily. Heavy cotton, clean cut, quietly confident.",
    stock: { Small: 18, Medium: 0, Large: 7 }, lowStockThreshold: 6, status: "live",
  },
  {
    id: 2, name: "Court Logo Tee", category: "Tees", family: "Tees",
    price: 420, compareAt: 520, rating: 4.7, reviews: 98, image: img(31696422),
    sku: "JV-TEE-002", fit: "Regular", sizes: APPAREL_SIZES,
    material: ["100% cotton", "200gsm", "Garment dyed"],
    highlights: ["Regular fit", "Soft hand feel", "Screen-printed court graphic", "Fade-resistant dye"],
    care: ["Machine wash cold", "Wash inside out", "Tumble dry low", "Do not iron print"],
    blurb: "A clean graphic tee that does the talking without shouting.",
    stock: { Small: 9, Medium: 14, Large: 3 }, lowStockThreshold: 6, status: "live",
  },
  {
    id: 3, name: "Oversized Drop-Shoulder Tee", category: "Tees", family: "Tees",
    price: 480, rating: 4.9, reviews: 176, image: img(33232902),
    sku: "JV-TEE-003", fit: "Oversized", sizes: APPAREL_SIZES,
    material: ["100% cotton", "230gsm", "Pre-shrunk"],
    highlights: ["Oversized drop-shoulder", "Dropped armhole", "Wide ribbed collar", "Street-ready silhouette"],
    care: ["Machine wash cold", "Do not bleach", "Hang dry", "Cool iron"],
    blurb: "Relaxed, dropped-shoulder cut built for layering and movement.",
    stock: { Small: 22, Medium: 31, Large: 19 }, lowStockThreshold: 8, status: "live",
  },
  {
    id: 4, name: "6-Panel Cap", category: "Caps", family: "Caps",
    price: 320, rating: 4.6, reviews: 64, image: img(12285563),
    sku: "JV-CAP-001", fit: "Adjustable", sizes: ONE_SIZE,
    material: ["100% brushed cotton", "Metal buckle strap"],
    highlights: ["Classic 6-panel crown", "Curved brim", "Adjustable strap", "Embroidered eyelets"],
    care: ["Spot clean only", "Air dry", "Do not machine wash", "Reshape while damp"],
    blurb: "A clean structured 6-panel — the finishing touch on any fit.",
    stock: { "One Size": 41 }, lowStockThreshold: 10, status: "live",
  },
  {
    id: 5, name: "Corduroy Dad Cap", category: "Caps", family: "Caps",
    price: 340, compareAt: 400, rating: 4.5, reviews: 47, image: img(12285563),
    sku: "JV-CAP-002", fit: "Adjustable", sizes: ONE_SIZE,
    material: ["Cotton corduroy", "Brass slide buckle"],
    highlights: ["Soft unstructured crown", "Corduroy texture", "Low-profile fit", "Tonal stitching"],
    care: ["Spot clean only", "Air dry", "Do not machine wash", "Reshape while damp"],
    blurb: "Soft, low-profile corduroy with a worn-in feel from day one.",
    stock: { "One Size": 8 }, lowStockThreshold: 10, status: "live",
  },
  {
    id: 6, name: "Trucker Cap", category: "Caps", family: "Caps",
    price: 300, rating: 4.4, reviews: 39, image: img(12285563), badge: "New",
    sku: "JV-CAP-003", fit: "Snapback", sizes: ONE_SIZE,
    material: ["Cotton front panels", "Breathable mesh back"],
    highlights: ["5-panel trucker build", "Mesh back panels", "Snapback closure", "Flat embroidered logo"],
    care: ["Spot clean only", "Air dry", "Do not machine wash", "Reshape while damp"],
    blurb: "Mesh-back trucker for warm days and easy fits.",
    stock: { "One Size": 0 }, lowStockThreshold: 8, status: "live",
  },
  {
    id: 7, name: "Canvas Tote", category: "Bags", family: "Bags",
    price: 380, rating: 4.7, reviews: 88, image: img(9471910),
    sku: "JV-BAG-001", fit: "One size", sizes: ONE_SIZE,
    material: ["16oz heavy canvas", "Cotton webbing handles"],
    highlights: ["Roomy everyday carry", "Reinforced handles", "Internal pocket", "Boxed base"],
    care: ["Spot clean", "Air dry", "Do not bleach", "Do not tumble dry"],
    blurb: "Heavy canvas tote that carries everything and ages well.",
    stock: { "One Size": 27 }, lowStockThreshold: 8, status: "live",
  },
  {
    id: 8, name: "Crossbody Sling", category: "Bags", family: "Bags",
    price: 520, rating: 4.8, reviews: 73, image: img(6786706),
    sku: "JV-BAG-002", fit: "Adjustable", sizes: ONE_SIZE,
    material: ["Water-resistant nylon", "Adjustable webbing strap"],
    highlights: ["Hands-free crossbody", "Adjustable strap", "Zip main compartment", "Hidden back pocket"],
    care: ["Wipe clean", "Air dry", "Do not machine wash", "Do not bleach"],
    blurb: "Minimal sling for the essentials — phone, keys, wallet, gone.",
    stock: { "One Size": 12 }, lowStockThreshold: 6, status: "live",
  },
  {
    id: 9, name: "Weekender Duffel", category: "Bags", family: "Bags",
    price: 890, compareAt: 1050, rating: 4.6, reviews: 51, image: img(9471910),
    sku: "JV-BAG-003", fit: "One size", sizes: ONE_SIZE,
    material: ["Heavy canvas body", "Leather-look trim", "Metal hardware"],
    highlights: ["Weekend-sized capacity", "Detachable shoulder strap", "Shoe compartment", "Reinforced base"],
    care: ["Spot clean", "Air dry", "Do not bleach", "Do not tumble dry"],
    blurb: "Enough room for the weekend, built to take the trip with you.",
    stock: { "One Size": 4 }, lowStockThreshold: 5, status: "draft",
  },
];

/* ---------- admin mock data ---------- */
export const STORE = {
  ordersToday: 23, ordersDelta: 12,
  revenueToday: 28940, revenueThisWeek: 212600, revenueLastWeek: 184200,
  customersTotal: 1847, newCustomers: 64,
  conversion: 3.8, conversionDelta: 0.4,
  weekly: [
    { day: "Mon", revenue: 24100 }, { day: "Tue", revenue: 31200 },
    { day: "Wed", revenue: 27800 }, { day: "Thu", revenue: 35600 },
    { day: "Fri", revenue: 42300 }, { day: "Sat", revenue: 38900 },
    { day: "Sun", revenue: 28940 },
  ],
  byCategory: [
    { category: "Tees", sales: 184 },
    { category: "Caps", sales: 112 },
    { category: "Bags", sales: 96 },
  ],
  // back-compat alias (older Admin code reads byFamily) — same data, {family, sales}
  byFamily: [
    { family: "Tees", sales: 184 },
    { family: "Caps", sales: 112 },
    { family: "Bags", sales: 96 },
  ],
  topProducts: [
    { name: "Oversized Drop-Shoulder Tee", units: 88, revenue: 42240 },
    { name: "6-Panel Cap", units: 71, revenue: 22720 },
    { name: "Canvas Tote", units: 54, revenue: 20520 },
  ],
  slow: [{ name: "Trucker Cap", units: 9 }, { name: "Weekender Duffel", units: 14 }],

  // lightweight feed kept for back-compat with the current Dashboard
  recentOrders: [
    { id: "#JV-2041", customer: "T. Mabasa", items: 2, total: 770, status: "Paid", when: "2 min ago" },
    { id: "#JV-2040", customer: "L. Khoza", items: 1, total: 480, status: "Paid", when: "18 min ago" },
    { id: "#JV-2039", customer: "N. Dlamini", items: 3, total: 1100, status: "Processing", when: "41 min ago" },
    { id: "#JV-2038", customer: "S. Naidoo", items: 1, total: 320, status: "Paid", when: "1 hr ago" },
    { id: "#JV-2037", customer: "K. Botha", items: 2, total: 760, status: "Refunded", when: "2 hrs ago" },
    { id: "#JV-2036", customer: "A. Mthembu", items: 1, total: 450, status: "Paid", when: "3 hrs ago" },
  ],

  // full order objects — the canonical source the portal + co-pilot use
  orders: [
    { id: "#JV-2041", customer: "T. Mabasa", email: "t.mabasa@gmail.com",
      items: [{ productId: 1, size: "Medium", qty: 1, price: 450 }, { productId: 4, size: "One Size", qty: 1, price: 320 }],
      total: 770, status: "Paid", placedAt: "2026-06-07T09:42:00", tracking: null },
    { id: "#JV-2040", customer: "L. Khoza", email: "l.khoza@gmail.com",
      items: [{ productId: 3, size: "Large", qty: 1, price: 480 }],
      total: 480, status: "Paid", placedAt: "2026-06-07T09:26:00", tracking: null },
    { id: "#JV-2039", customer: "N. Dlamini", email: "n.dlamini@outlook.com",
      items: [{ productId: 2, size: "Small", qty: 1, price: 420 }, { productId: 6, size: "One Size", qty: 1, price: 300 }, { productId: 7, size: "One Size", qty: 1, price: 380 }],
      total: 1100, status: "Processing", placedAt: "2026-06-07T09:03:00", tracking: null },
    { id: "#JV-2038", customer: "S. Naidoo", email: "s.naidoo@gmail.com",
      items: [{ productId: 4, size: "One Size", qty: 1, price: 320 }],
      total: 320, status: "Paid", placedAt: "2026-06-07T08:40:00", tracking: null },
    { id: "#JV-2037", customer: "K. Botha", email: "k.botha@yahoo.com",
      items: [{ productId: 2, size: "Medium", qty: 1, price: 420 }, { productId: 5, size: "One Size", qty: 1, price: 340 }],
      total: 760, status: "Refunded", placedAt: "2026-06-07T07:55:00", tracking: null },
    { id: "#JV-2036", customer: "A. Mthembu", email: "a.mthembu@gmail.com",
      items: [{ productId: 1, size: "Large", qty: 1, price: 450 }],
      total: 450, status: "Paid", placedAt: "2026-06-07T07:12:00", tracking: null },
    { id: "#JV-2035", customer: "P. Sithole", email: "p.sithole@gmail.com",
      items: [{ productId: 9, size: "One Size", qty: 1, price: 890 }, { productId: 8, size: "One Size", qty: 1, price: 520 }],
      total: 1410, status: "Fulfilled", placedAt: "2026-06-06T16:30:00", tracking: "PAXI-7781-ZA" },
    { id: "#JV-2034", customer: "R. Pillay", email: "r.pillay@gmail.com",
      items: [{ productId: 3, size: "Medium", qty: 2, price: 480 }],
      total: 960, status: "Fulfilled", placedAt: "2026-06-06T14:08:00", tracking: "PAXI-7762-ZA" },
  ],

  customers: [
    { id: "c1", name: "T. Mabasa", email: "t.mabasa@gmail.com", orders: 5, spent: 3820, lastOrder: "2026-06-07", tags: ["Repeat"] },
    { id: "c2", name: "L. Khoza", email: "l.khoza@gmail.com", orders: 2, spent: 980, lastOrder: "2026-06-07", tags: [] },
    { id: "c3", name: "N. Dlamini", email: "n.dlamini@outlook.com", orders: 8, spent: 7240, lastOrder: "2026-06-07", tags: ["VIP"] },
    { id: "c4", name: "S. Naidoo", email: "s.naidoo@gmail.com", orders: 1, spent: 320, lastOrder: "2026-06-07", tags: ["New"] },
    { id: "c5", name: "K. Botha", email: "k.botha@yahoo.com", orders: 3, spent: 1510, lastOrder: "2026-06-07", tags: [] },
    { id: "c6", name: "A. Mthembu", email: "a.mthembu@gmail.com", orders: 4, spent: 2110, lastOrder: "2026-06-07", tags: ["Repeat"] },
    { id: "c7", name: "P. Sithole", email: "p.sithole@gmail.com", orders: 6, spent: 5630, lastOrder: "2026-06-06", tags: ["VIP"] },
    { id: "c8", name: "R. Pillay", email: "r.pillay@gmail.com", orders: 2, spent: 1440, lastOrder: "2026-06-06", tags: [] },
  ],

  discounts: [
    { code: "WELCOME10", type: "percent", value: 10, from: "2026-05-01", to: "2026-12-31", uses: 142 },
    { code: "FREESHIP2", type: "freeship", value: 0, from: "2026-01-01", to: "2026-12-31", uses: 318 },
    { code: "WINTER15", type: "percent", value: 15, from: "2026-06-01", to: "2026-06-30", uses: 27 },
    { code: "R50OFF", type: "fixed", value: 50, from: "2026-04-01", to: "2026-04-30", uses: 64 },
  ],
};

/* ---------- AI helpers ---------- */
export function extractJSON(text) {
  let t = (text || "").replace(/```json/gi, "").replace(/```/g, "").trim();
  const fa = t.indexOf("["), fo = t.indexOf("{");
  let start = fa === -1 ? fo : fo === -1 ? fa : Math.min(fa, fo);
  const end = Math.max(t.lastIndexOf("]"), t.lastIndexOf("}"));
  if (start === -1 || end === -1) return null;
  try { return JSON.parse(t.slice(start, end + 1)); } catch { return null; }
}

export async function askClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });
  const data = await res.json();
  return (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("\n");
}

/* Offline fallback matcher — keyword → category scoring (no API needed) */
export function localMatch(query) {
  const q = query.toLowerCase();
  const map = [
    ["tee", ["Tees"]], ["t-shirt", ["Tees"]], ["shirt", ["Tees"]], ["top", ["Tees"]],
    ["oversized", ["Tees"]], ["heavy", ["Tees"]], ["box", ["Tees"]],
    ["cap", ["Caps"]], ["hat", ["Caps"]], ["snapback", ["Caps"]], ["trucker", ["Caps"]],
    ["bag", ["Bags"]], ["tote", ["Bags"]], ["sling", ["Bags"]], ["duffel", ["Bags"]],
    ["carry", ["Bags"]], ["crossbody", ["Bags"]],
  ];
  const wantCats = new Set();
  map.forEach(([k, cats]) => { if (q.includes(k)) cats.forEach((c) => wantCats.add(c)); });

  const scored = PRODUCTS.map((p) => {
    let s = 0;
    if (wantCats.has(p.category)) s += 3;
    const text = (p.name + " " + (p.blurb || "")).toLowerCase();
    q.split(/\s+/).forEach((w) => { if (w.length > 3 && text.includes(w)) s += 1; });
    return { p, s };
  }).sort((a, b) => b.s - a.s);

  const top = scored[0].s > 0 ? scored.filter((x) => x.s > 0).slice(0, 3) : scored.slice(0, 3);
  const singular = { Tees: "tee", Caps: "cap", Bags: "bag" };
  return top.map(({ p }) => ({
    id: p.id,
    reason: `A ${singular[p.category] || "piece"} that matches what you described — clean, heavy, easy to wear.`,
  }));
}

/* ---------- admin helpers (Phase 0) ---------- */
export const totalStock = (p) =>
  Object.values(p.stock || {}).reduce((a, n) => a + n, 0);

export const lowStock = (p) =>
  totalStock(p) <= (p.lowStockThreshold ?? 5);

export const orderTotal = (o) =>
  (o.items || []).reduce((a, it) => a + it.price * it.qty, 0);

export const STATUS_COLORS = {
  Paid:       { fg: "#2E7D4F", bg: "#E8F3EC" },
  Processing: { fg: "#8A6D33", bg: "#FBF3E4" },
  Fulfilled:  { fg: "#1D4ED8", bg: "#E6EDFB" },
  Refunded:   { fg: "#C0564B", bg: "#F8EAE8" },
};

/* ---------- styles ---------- */
export const CSS =  `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600;700&display=swap');
* { box-sizing: border-box; }
.rs-root { font-family: 'Manrope', sans-serif; color: ${INK}; background: ${BONE}; min-height: 100vh; -webkit-font-smoothing: antialiased; }
.rs-serif { font-family: 'Cormorant Garamond', serif; font-weight: 500; }
.rs-wrap { max-width: 1180px; margin: 0 auto; padding-left: 24px; padding-right: 24px; }
 
.rs-announce { background: ${INK}; color: rgba(250,250,248,.82); text-align: center; font-size: 12px; letter-spacing: .03em; padding: 9px 12px; }
 
.rs-nav { position: sticky; top: 0; z-index: 40; background: rgba(250,250,248,.72); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid ${LINE}; }
.rs-navlinks { display: flex; gap: 30px; }
.rs-navlinks a { font-size: 14px; color: ${INK}; cursor: pointer; opacity: .8; transition: opacity .2s; }
.rs-navlinks a:hover { opacity: 1; }
@media (max-width: 760px){ .rs-navlinks { display: none; } }
 
.rs-iconbtn { width: 40px; height: 40px; border-radius: 999px; border: 1px solid ${LINE}; background: #fff; display: flex; align-items: center; justify-content: center; color: ${INK}; cursor: pointer; transition: all .2s; }
.rs-iconbtn:hover { border-color: ${INK}; }
.rs-iconbtn:disabled { opacity: .3; cursor: default; }
.rs-badge { position: absolute; top: -4px; right: -4px; background: ${AMBER}; color: ${INK}; font-size: 11px; font-weight: 700; width: 18px; height: 18px; border-radius: 999px; display: flex; align-items: center; justify-content: center; }
 
.rs-btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; border-radius: 999px; font-size: 13px; font-weight: 600; letter-spacing: .01em; padding: 0 18px; height: 40px; cursor: pointer; border: 1px solid transparent; transition: all .22s ease; white-space: nowrap; }
.rs-btn-solid { background: ${INK}; color: ${BONE}; }
.rs-btn-solid:hover { background: #262320; transform: translateY(-1px); }
.rs-btn-ghost { background: transparent; border-color: ${LINE}; color: ${INK}; }
.rs-btn-ghost:hover { border-color: ${INK}; }
.rs-btn-amber { background: ${AMBER}; color: ${INK}; }
.rs-btn-amber:hover { filter: brightness(1.05); transform: translateY(-1px); }
 
.rs-kicker { font-size: 12px; letter-spacing: .18em; text-transform: uppercase; color: ${AMBER}; font-weight: 600; margin-bottom: 18px; }
 
/* hero */
.rs-hero { position: relative; overflow: hidden; padding: 64px 0 56px; }
.rs-hero-grid { display: grid; grid-template-columns: 1.15fr .85fr; gap: 40px; align-items: center; position: relative; z-index: 2; }
@media (max-width: 880px){ .rs-hero-grid { grid-template-columns: 1fr; } .rs-hero-art { display: none; } }
.rs-h1 { font-size: 76px; line-height: .98; letter-spacing: -.02em; color: ${INK}; }
@media (max-width: 880px){ .rs-h1 { font-size: 54px; } }
.rs-sub { color: ${MUTED}; font-size: 16px; line-height: 1.55; max-width: 460px; margin-top: 18px; margin-bottom: 28px; }
.rs-watermark { position: absolute; top: 40%; left: 50%; transform: translate(-50%,-50%); font-size: 300px; color: rgba(10,10,10,.035); z-index: 1; pointer-events: none; letter-spacing: .04em; font-weight: 600; }
.rs-hero-art { position: relative; display: flex; align-items: center; justify-content: center; height: 360px; }
.rs-glow { position: absolute; width: 320px; height: 320px; border-radius: 999px; background: radial-gradient(circle, ${AMBER}33 0%, ${AMBER}00 65%); }
 
.rs-finder { display: flex; align-items: center; gap: 12px; background: #fff; border: 1px solid ${LINE}; border-radius: 16px; padding: 8px 8px 8px 18px; box-shadow: 0 14px 40px -28px rgba(10,10,10,.4); max-width: 520px; }
.rs-finder-input { flex: 1; border: none; outline: none; background: transparent; font-family: 'Manrope', sans-serif; font-size: 15px; color: ${INK}; }
.rs-finder-input::placeholder { color: #A6A29A; }
.rs-mic { width: 36px; height: 36px; border-radius: 999px; border: 1px solid ${LINE}; background: #fff; color: ${MUTED}; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all .2s; }
.rs-mic:hover { border-color: ${AMBER}; color: ${AMBER}; }
 
.rs-chip { font-size: 12.5px; border: 1px solid ${LINE}; background: #fff; color: ${INK}; border-radius: 999px; padding: 8px 14px; cursor: pointer; transition: all .2s; }
.rs-chip:hover { border-color: ${INK}; }
 
/* matched */
.rs-matched { background: #fff; border: 1px solid ${LINE}; border-radius: 24px; padding: 28px; margin-top: 12px; }
.rs-note { background: #FBF6EC; border: 1px solid ${AMBER}55; color: #8a6d33; font-size: 13px; padding: 10px 14px; border-radius: 10px; margin-bottom: 16px; }
.rs-reason { font-size: 13px; color: ${MUTED}; line-height: 1.5; margin-top: 8px; }
.rs-skel { height: 320px; border-radius: 20px; }
 
.rs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
@media (max-width: 900px){ .rs-grid { grid-template-columns: repeat(2,1fr); } }
@media (max-width: 600px){ .rs-grid { grid-template-columns: 1fr; } }
 
/* cards */
.rs-card { background: #fff; border: 1px solid ${LINE}; border-radius: 20px; overflow: hidden; transition: transform .4s cubic-bezier(.2,.8,.2,1), box-shadow .4s; }
.rs-card:hover { transform: translateY(-6px); box-shadow: 0 26px 50px -30px rgba(10,10,10,.3); }
.rs-card-img { position: relative; height: 220px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.rs-tag { position: absolute; top: 14px; right: 14px; font-size: 11px; letter-spacing: .08em; text-transform: uppercase; color: ${MUTED}; background: rgba(255,255,255,.7); backdrop-filter: blur(6px); padding: 4px 10px; border-radius: 999px; border: 1px solid ${LINE}; }
 
/* shop layout */
.rs-shop { display: grid; grid-template-columns: 230px 1fr; gap: 40px; margin-top: 48px; }
@media (max-width: 880px){ .rs-shop { grid-template-columns: 1fr; } .rs-sidebar { display: none; } }
.rs-side-head { display: flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: ${MUTED}; margin-bottom: 22px; }
.rs-fgroup { padding-bottom: 22px; margin-bottom: 22px; border-bottom: 1px solid ${LINE}; }
.rs-fgroup-title { font-size: 13px; font-weight: 600; margin-bottom: 14px; }
.rs-check { display: flex; align-items: center; gap: 10px; font-size: 14px; color: ${INK}; cursor: pointer; padding: 4px 0; }
.rs-box { width: 18px; height: 18px; border: 1px solid ${LINE}; border-radius: 5px; display: flex; align-items: center; justify-content: center; transition: all .2s; }
.rs-tick { width: 6px; height: 10px; border-right: 2px solid #fff; border-bottom: 2px solid #fff; transform: rotate(42deg) translateY(-1px); }
.rs-pill { font-size: 12.5px; border: 1px solid ${LINE}; background: #fff; border-radius: 999px; padding: 6px 12px; cursor: pointer; transition: all .2s; color: ${INK}; }
.rs-pill.on { background: ${INK}; color: ${BONE}; border-color: ${INK}; }
.rs-pillstatic { font-size: 12px; border: 1px solid ${LINE}; border-radius: 999px; padding: 6px 12px; color: ${MUTED}; }
.rs-range { width: 100%; accent-color: ${INK}; margin-bottom: 8px; }
.rs-empty { color: ${MUTED}; text-align: center; padding: 60px 0; font-size: 15px; }
 
.rs-pagenum { width: 40px; height: 40px; border-radius: 999px; border: 1px solid ${LINE}; background: #fff; cursor: pointer; font-weight: 600; font-size: 14px; transition: all .2s; }
.rs-pagenum.on { background: ${INK}; color: ${BONE}; border-color: ${INK}; }
 
/* cta */
.rs-cta { background: ${INK}; border-radius: 28px; padding: 56px; display: flex; align-items: center; justify-content: space-between; gap: 30px; flex-wrap: wrap; }
.rs-ctaform { display: flex; gap: 10px; }
.rs-ctainput { height: 48px; border-radius: 999px; border: 1px solid rgba(250,250,248,.25); background: rgba(250,250,248,.06); color: ${BONE}; padding: 0 20px; font-family: 'Manrope'; font-size: 14px; outline: none; min-width: 220px; }
.rs-ctainput::placeholder { color: rgba(250,250,248,.45); }
 
/* footer */
.rs-footer { margin-top: 72px; padding-top: 48px; padding-bottom: 40px; border-top: 1px solid ${LINE}; }
.rs-foot-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 24px; }
@media (max-width: 700px){ .rs-foot-grid { grid-template-columns: 1fr 1fr; gap: 32px; } }
.rs-foot-title { font-size: 13px; font-weight: 600; margin-bottom: 14px; }
.rs-foot-link { display: block; font-size: 13.5px; color: ${MUTED}; cursor: pointer; padding: 5px 0; transition: color .2s; }
.rs-foot-link:hover { color: ${INK}; }
.rs-foot-bottom { margin-top: 40px; font-size: 12px; color: ${MUTED}; }
 
/* modal */
.rs-overlay { position: fixed; inset: 0; background: rgba(10,10,10,.45); backdrop-filter: blur(6px); z-index: 60; display: flex; align-items: center; justify-content: center; padding: 24px; }
.rs-modal { background: ${BONE}; border-radius: 28px; max-width: 860px; width: 100%; max-height: 90vh; overflow: auto; position: relative; }
.rs-modal-grid { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 720px){ .rs-modal-grid { grid-template-columns: 1fr; } }
.rs-modal-art { display: flex; align-items: center; justify-content: center; padding: 50px; }
.rs-modal-body { padding: 44px 44px 44px 0; }
@media (max-width: 720px){ .rs-modal-body { padding: 0 28px 36px; } }
.rs-close { position: absolute; top: 18px; right: 18px; width: 38px; height: 38px; border-radius: 999px; border: 1px solid ${LINE}; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 2; }
.rs-notes { margin-top: 22px; border-top: 1px solid ${LINE}; }
.rs-note-row { display: flex; gap: 16px; padding: 12px 0; border-bottom: 1px solid ${LINE}; font-size: 14px; }
.rs-note-k { width: 56px; color: ${AMBER}; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: .06em; padding-top: 1px; }
 
/* drawer */
.rs-drawer-bg { position: fixed; inset: 0; background: rgba(10,10,10,.4); opacity: 0; pointer-events: none; transition: opacity .3s; z-index: 70; }
.rs-drawer-bg.open { opacity: 1; pointer-events: auto; }
.rs-drawer { position: fixed; top: 0; right: 0; height: 100%; width: 400px; max-width: 90vw; background: ${BONE}; z-index: 80; transform: translateX(100%); transition: transform .4s cubic-bezier(.2,.8,.2,1); display: flex; flex-direction: column; box-shadow: -20px 0 60px -30px rgba(0,0,0,.4); }
.rs-drawer.open { transform: translateX(0); }
.rs-cart-items { flex: 1; overflow: auto; padding: 8px 24px; }
.rs-cart-row { display: flex; gap: 14px; padding: 18px 0; border-bottom: 1px solid ${LINE}; align-items: flex-start; }
.rs-cart-thumb { width: 56px; height: 72px; background: #fff; border: 1px solid ${LINE}; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.rs-qty { display: flex; align-items: center; gap: 8px; margin-top: 8px; }
.rs-qty button { width: 26px; height: 26px; border-radius: 999px; border: 1px solid ${LINE}; background: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.rs-qty span { font-size: 14px; font-weight: 600; min-width: 16px; text-align: center; }
.rs-remove { width: auto !important; border: none !important; color: ${MUTED}; font-size: 12px; margin-left: 6px; text-decoration: underline; }
.rs-cart-foot { padding: 22px 24px; border-top: 1px solid ${LINE}; }
 
/* admin */
.rs-kpis { display: grid; grid-template-columns: repeat(4,1fr); gap: 18px; }
@media (max-width: 880px){ .rs-kpis { grid-template-columns: repeat(2,1fr); } }
.rs-kpi { background: #fff; border: 1px solid ${LINE}; border-radius: 18px; padding: 20px; }
.rs-kpi-top { display: flex; align-items: center; justify-content: space-between; }
.rs-delta { font-size: 12px; font-weight: 600; display: inline-flex; align-items: center; gap: 3px; padding: 3px 8px; border-radius: 999px; }
.rs-delta.up { color: #2E7D4F; background: #E8F3EC; }
.rs-delta.down { color: #C0564B; background: #F8EAE8; }
 
.rs-ask { background: #fff; border: 1px solid ${LINE}; border-radius: 22px; padding: 26px; margin-top: 22px; }
.rs-answer { margin-top: 18px; background: ${BONE}; border: 1px solid ${LINE}; border-radius: 16px; padding: 18px; font-size: 14.5px; }
.rs-statchips { display: flex; gap: 12px; margin-top: 16px; flex-wrap: wrap; }
.rs-statchip { background: #fff; border: 1px solid ${LINE}; border-radius: 14px; padding: 12px 18px; min-width: 110px; }
 
.rs-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 18px; }
@media (max-width: 880px){ .rs-charts { grid-template-columns: 1fr; } .rs-panel[style*="span 2"]{ grid-column: auto !important; } }
.rs-panel { background: #fff; border: 1px solid ${LINE}; border-radius: 20px; padding: 22px; }
.rs-panel-head { display: flex; align-items: center; justify-content: space-between; }
 
.rs-fambar { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.rs-fambar-track { flex: 1; height: 9px; background: ${BONE}; border-radius: 999px; overflow: hidden; }
.rs-fambar-fill { height: 100%; border-radius: 999px; transition: width .6s ease; }
 
.rs-table { width: 100%; border-collapse: collapse; margin-top: 8px; }
.rs-table th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: ${MUTED}; font-weight: 600; padding: 10px 8px; border-bottom: 1px solid ${LINE}; }
.rs-table td { font-size: 14px; padding: 13px 8px; border-bottom: 1px solid ${LINE}; }
.rs-status { font-size: 11px; font-weight: 600; padding: 3px 9px; border-radius: 999px; }
.rs-status.paid { color: #2E7D4F; background: #E8F3EC; }
.rs-status.processing { color: #8a6d33; background: #FBF3E4; }
.rs-status.refunded { color: #C0564B; background: #F8EAE8; }
 
.rs-toprow { display: flex; align-items: center; gap: 14px; padding: 13px 0; border-bottom: 1px solid ${LINE}; }
.rs-rank { width: 26px; height: 26px; border-radius: 999px; background: ${INK}; color: ${BONE}; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
 
/* motion */
@keyframes rsFade { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
.rs-reveal { animation: rsFade .7s cubic-bezier(.2,.8,.2,1) both; }
@keyframes rsShimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
.rs-shimmer { background: linear-gradient(90deg, #f0eeea 25%, #f7f6f2 50%, #f0eeea 75%); background-size: 800px 100%; animation: rsShimmer 1.4s infinite linear; }
`;