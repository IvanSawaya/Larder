import React from "react";
import OriginStamp from "./OriginStamp";
import { CAT_LABELS, heatFlames, money } from "../data/products";

export default function ProductCard({p, onAdd, onFilterOrigin}){
  return (
    <div className="card">
      <div className="card-media" style={{background: p.cat==="Spices" ? "#F1DDD3" : p.cat==="Oils" ? "#F3E7C2" : p.cat==="Grains" ? "#E1E7D6" : "#DCE7E4"}}>
        <OriginStamp p={p} onClick={()=>onFilterOrigin(p.origin)} />
        {p.sale && <span className="sale-tag">SAVE {Math.round((1-p.sale/p.price)*100)}%</span>}
        <span>{p.icon}</span>
      </div>
      <div className="card-body">
        <span className="card-cat">{CAT_LABELS[p.cat]}</span>
        <h3>{p.name}</h3>
        <p className="card-desc">{p.desc}</p>
        {p.founder && <span className="founder-flag">✎ Founder's note included</span>}
        <div className="tag-row">
          {p.dietary.map(d=> <span key={d} className="mini-tag">{d}</span>)}
        </div>
        <div className="heat-row">Heat: <span className="mono">{heatFlames(p.heat)}</span></div>
        <div className="price-row">
          <div>
            {p.sale ? <><span className="price old">{money(p.price)}</span><span className="price">{money(p.sale)}</span></> : <span className="price">{money(p.price)}</span>}
          </div>
          <button className="add-btn" onClick={()=>onAdd(p)}>+ Add</button>
        </div>
      </div>
    </div>
  );
}
