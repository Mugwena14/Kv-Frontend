import React from "react";
import { Star } from "lucide-react";
import Bottle from "./Bottle";
import { INK, BONE, AMBER, MUTED, fmt } from "../constants/data";

export default function ProductCard({ p, onOpen, onAdd, delay = 0 }) {
  return (
    <div className="rs-card rs-reveal" style={{ animationDelay: `${delay}ms` }}>
      <div className="rs-card-img" style={{ background: `radial-gradient(120% 90% at 50% 10%, #ffffff 0%, ${BONE} 70%)` }}
           onClick={() => onOpen(p)}>
        <span className="rs-tag">{p.family}</span>
        <Bottle family={p.family} size={104} />
      </div>
      <div className="px-5 pb-5 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="rs-serif" style={{ fontSize: 22, lineHeight: 1.1, color: INK }}>{p.name}</h3>
        </div>
        <div className="flex items-center gap-1 mt-1" style={{ color: MUTED, fontSize: 12 }}>
          <Star size={12} fill={AMBER} stroke={AMBER} />
          <span style={{ color: INK, fontWeight: 600 }}>{p.rating}</span>
          <span>· {p.reviews} reviews</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span style={{ fontSize: 17, fontWeight: 600, color: INK }}>{fmt(p.price)}</span>
          <div className="flex gap-2">
            <button className="rs-btn rs-btn-ghost" onClick={() => onOpen(p)}>Details</button>
            <button className="rs-btn rs-btn-solid" onClick={() => onAdd(p)}>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}