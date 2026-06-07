import React from "react";
import { X } from "lucide-react";
import Bottle from "./Bottle";
import { INK, BONE, fmt } from "../constants/data";

export default function ProductModal({ active, setActive, addToCart }) {
  if (!active) return null;

  return (
    <div className="rs-overlay" onClick={() => setActive(null)}>
      <div className="rs-modal" onClick={(e) => e.stopPropagation()}>
        <button className="rs-close" onClick={() => setActive(null)}><X size={18} /></button>
        <div className="rs-modal-grid">
          <div className="rs-modal-art" style={{ background: `radial-gradient(120% 90% at 50% 10%, #fff 0%, ${BONE} 75%)` }}>
            <Bottle family={active.family} size={180} />
          </div>
          <div className="rs-modal-body">
            <h2 className="rs-serif" style={{ fontSize: 38, color: INK }}>{active.name}</h2>
            <p style={{ color: "#7A766E", marginTop: 14 }}>{active.blurb}</p>
            <button 
              className="rs-btn rs-btn-solid w-full mt-4" 
              onClick={() => { addToCart(active); setActive(null); }}
            >
              Add to cart — {fmt(active.price)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}