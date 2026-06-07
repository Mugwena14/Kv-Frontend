import React from "react";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { INK, fmt } from "../constants/data";

const HAIR = "#E6E6E6";
const TILE = "#F4F4F2";

export default function CartDrawer({
  cartOpen,
  setCartOpen,
  cart = [], // default empty to avoid runtime crashes
  setQty,
  removeItem,
  cartTotal,
  onSelect, // open a product's page from a cart row
}) {
  const goToProduct = (it) => {
    setCartOpen(false);
    onSelect?.(it);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 z-50 transition-opacity duration-300"
        style={{
          background: "rgba(0,0,0,0.45)",
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? "auto" : "none",
        }}
      />

      {/* Panel */}
      <aside
        className="fixed top-0 right-0 h-full z-50 bg-white flex flex-col transition-transform duration-300 ease-out"
        style={{
          width: "90%",
          maxWidth: 400,
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between" style={{ padding: "20px 22px", borderBottom: `1px solid ${HAIR}` }}>
          <h3 className="m-0 font-extrabold uppercase tracking-tight" style={{ color: INK, fontSize: 18 }}>
            Your Bag
          </h3>
          <button
            onClick={() => setCartOpen(false)}
            className="bg-transparent border-none cursor-pointer flex items-center"
            style={{ color: INK }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="grow overflow-y-auto" style={{ padding: 18 }}>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center" style={{ paddingTop: 90 }}>
              <p className="text-sm font-light text-neutral-400">Your bag is empty.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cart.map((it) => (
                <div key={`${it.id}-${it.size || "x"}`} className="flex gap-3">
                  {/* Thumbnail — click to product */}
                  <button
                    onClick={() => goToProduct(it)}
                    className="shrink-0 relative overflow-hidden border-none cursor-pointer p-0"
                    style={{ width: 72, height: 88, background: TILE, borderRadius: 3 }}
                    aria-label={`View ${it.name}`}
                  >
                    {it.image && (
                      <img src={it.image} alt={it.name} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                  </button>

                  {/* Details */}
                  <div className="grow flex flex-col min-w-0">
                    <button
                      onClick={() => goToProduct(it)}
                      className="bg-transparent border-none p-0 cursor-pointer text-left"
                    >
                      <span className="block text-[12px] font-bold uppercase tracking-tight truncate" style={{ color: INK }}>
                        {it.name}
                      </span>
                    </button>
                    {it.size && (
                      <span className="text-[11px] text-neutral-400" style={{ marginTop: 2 }}>
                        Size · {it.size}
                      </span>
                    )}
                    <span className="text-[12px] font-semibold" style={{ color: INK, marginTop: 4 }}>
                      {fmt(it.price)}
                    </span>

                    {/* Controls */}
                    <div className="flex items-center justify-between" style={{ marginTop: 10 }}>
                      <div className="flex items-center" style={{ border: `1px solid ${HAIR}`, borderRadius: 3 }}>
                        <button onClick={() => setQty(it.id, -1)} className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer text-neutral-600 hover:text-black" aria-label="Decrease">
                          <Minus size={12} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold" style={{ color: INK }}>{it.qty}</span>
                        <button onClick={() => setQty(it.id, 1)} className="w-7 h-7 flex items-center justify-center bg-transparent border-none cursor-pointer text-neutral-600 hover:text-black" aria-label="Increase">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(it.id)}
                        className="flex items-center gap-1 bg-transparent border-none cursor-pointer text-[11px] font-medium text-neutral-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 size={13} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ borderTop: `1px solid ${HAIR}`, padding: 20 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 6 }}>
              <span className="text-sm font-medium" style={{ color: INK }}>Subtotal</span>
              <span className="text-base font-extrabold" style={{ color: INK }}>{fmt(cartTotal)}</span>
            </div>
            <p className="text-[11px] font-light text-neutral-400" style={{ marginBottom: 14 }}>
              Shipped via PEP Paxi · free on 2+ items.
            </p>
            <button
              className="w-full text-white border-none cursor-pointer text-xs font-bold uppercase tracking-[0.16em] py-4 transition-opacity hover:opacity-90"
              style={{ background: INK, borderRadius: 3 }}
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}