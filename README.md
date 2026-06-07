# JV Kourt — Admin Portal (handoff notes)

A self-contained admin portal living inside the storefront app. It opens from the
Navbar "Admin" toggle (`view === "admin"`), where the storefront chrome (Navbar,
Footer, Cart) is hidden and the portal takes the full screen.

## File map

```
src/
  App.jsx                         # hides storefront chrome in admin; renders <Admin setView/>
  components/
    Admin.jsx                     # portal shell: auth gate, lifted state, section router
    admin/
      Sidebar.jsx                 # dark nav, angled active item, logout
      TopBar.jsx                  # section title + profile chip
      Login.jsx                   # mock login gate
    sections/
      Dashboard.jsx               # KPIs, weekly revenue, categories, top sellers, recent orders
      Oders.jsx                   # Orders — fulfil / tracking / refund   (note: filename is "Oders")
      Products.jsx                # catalogue + per-size inventory
      Customers.jsx               # list + profile with order history
      Discounts.jsx               # promo codes (create / disable)
      Invoices.jsx                # invoice list (PDF is a mock stub)
      Settings.jsx                # store / shipping / storefront settings
      CoPilot.jsx                 # AI assistant (read + write, confirmation-gated)
  constants/
    data.js                       # palette, ADMIN tokens, PRODUCTS, STORE, helpers, CSS
```

Import convention (matches the project): section files import data with
`../../constants/data`; `admin/` files do the same; `Admin.jsx` imports sections
from `./sections/...`.

## State model (important)

All mutable admin state is **lifted into `Admin.jsx`** and passed down:

- `orders` + `updateOrder(id, patch)`
- `products` + `updateProduct(id, patch)`
- `discounts` + `addDiscount(d)` / `disableDiscount(code)`
- `settings` + `setSettings`

Because Orders, Products, Dashboard, Customers, Invoices and the Co-pilot all read
from the same lifted state, an action in one place (or via the AI) reflects
everywhere immediately.

This is **session state seeded from `STORE` / `PRODUCTS`** — it resets on reload.
The storefront pages still import `PRODUCTS` directly, so admin edits do **not**
change the live shop in this mock; unifying them is a backend task (below).

## AI Co-pilot

- A deterministic `localResolve` (reads) and `localAction` (writes) engine answers
  from live state with no network — this is what runs in local dev.
- `askClaude()` (in `data.js`) is the fallback for open-ended questions. It calls
  `api.anthropic.com` directly, which only works inside the claude.ai artifact
  sandbox; in your own deployment, point it at your backend proxy with a key.
- Every write returns a **confirmation card**; nothing mutates until the user taps
  Confirm. `MOCK = true` in `CoPilot.jsx` shows a "Mock mode" badge and labels
  writes as local-only.
- Email-to-buyers is gated by a **POPIA notice** (consent + unsubscribe) and is a
  mock send.

## Wiring a real backend (FastAPI/Postgres)

Replace the seed reads and the mutation handlers in `Admin.jsx`:

| Mock today                         | Real swap                                              |
|------------------------------------|--------------------------------------------------------|
| `useState(STORE.orders)`           | fetch `GET /orders`                                    |
| `updateOrder(id, patch)`           | `PATCH /orders/{id}` then update state                 |
| `useState(PRODUCTS)`               | `GET /products`                                        |
| `updateProduct(id, patch)`         | `PATCH /products/{id}`                                 |
| `addDiscount` / `disableDiscount`  | `POST /discounts` / `PATCH /discounts/{code}`          |
| `setSettings`                      | `PUT /settings`                                        |
| `askClaude` (direct API)           | your `POST /assistant` proxy (key server-side)         |
| Invoices "PDF" stub                | server-rendered PDF endpoint                           |
| Login gate (mock)                  | real auth/session                                      |
| Storefront `PRODUCTS` import       | shared product source so stock/price reflect in shop   |


## Theme

Fully mono (black/white) to match the storefront. `ADMIN` tokens in `data.js`:
`accent` (INK, for light surfaces), `onDark` (white, for sidebar highlights),
`sidebar`, `bg`, `line`, `lineDark`, `textDim`. The storefront fonts (Manrope +
Cormorant Garamond) are inherited via `.rs-root`.