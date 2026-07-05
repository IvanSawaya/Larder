import React from "react";
import { CATEGORIES, CAT_LABELS, ORIGINS, DIETARY, HEAT_LEVELS, money } from "../data/products";

export default function Facets({filters, setFilters, resultCount}){
  const toggle = (key, val) => {
    setFilters(f => {
      const set = new Set(f[key]);
      set.has(val) ? set.delete(val) : set.add(val);
      return {...f, [key]: set};
    });
  };
  const clearAll = () => setFilters({category:new Set(), origin:new Set(), dietary:new Set(), heat:new Set(), onSale:false, maxPrice:30});

  return (
    <aside className="facets" aria-label="Filter products">
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
        <strong style={{fontSize:15}}>Refine Your Search</strong>
        <button className="clear-link" onClick={clearAll}>Clear all</button>
      </div>

      <div className="facet-group">
        <span className="facet-title">Category</span>
        <div>
          {CATEGORIES.map(c=>(
            <label className="check-row" key={c}>
              <input type="checkbox" checked={filters.category.has(c)} onChange={()=>toggle("category", c)} />
              {CAT_LABELS[c]}
            </label>
          ))}
        </div>
      </div>

      <div className="facet-group">
        <span className="facet-title">Origin</span>
        <p className="facet-hint">Every ingredient is tagged to the country it was grown or made in.</p>
        <div className="chip-row">
          {ORIGINS.map(o=>(
            <button key={o} className={"chip" + (filters.origin.has(o) ? " active" : "")} onClick={()=>toggle("origin", o)}>{o}</button>
          ))}
        </div>
      </div>

      <div className="facet-group">
        <span className="facet-title">Dietary</span>
        <div>
          {DIETARY.map(d=>(
            <label className="check-row" key={d}>
              <input type="checkbox" checked={filters.dietary.has(d)} onChange={()=>toggle("dietary", d)} />
              {d}
            </label>
          ))}
        </div>
      </div>

      <div className="facet-group">
        <span className="facet-title">Heat Level</span>
        <p className="facet-hint">How much kick an ingredient brings, from none to fiery.</p>
        <div className="chip-row">
          {HEAT_LEVELS.map(h=>(
            <button key={h.v} className={"chip" + (filters.heat.has(h.v) ? " active" : "")} onClick={()=>toggle("heat", h.v)}>{h.label}</button>
          ))}
        </div>
      </div>

      <div className="facet-group">
        <span className="facet-title">Price</span>
        <div className="range-row">
          <input type="range" min="5" max="30" value={filters.maxPrice} onChange={e=>setFilters(f=>({...f, maxPrice:Number(e.target.value)}))} />
          <span className="mono" style={{fontSize:12, color:"var(--muted)"}}>Up to {money(filters.maxPrice)}</span>
        </div>
      </div>

      <div className="facet-group" style={{borderBottom:"none", paddingBottom:0, marginBottom:0}}>
        <label className="check-row">
          <input type="checkbox" checked={filters.onSale} onChange={()=>setFilters(f=>({...f, onSale: !f.onSale}))} />
          On sale only
        </label>
      </div>

      <p style={{fontSize:12.5, color:"var(--muted)", marginTop:16, marginBottom:0}}>{resultCount} ingredient{resultCount!==1?"s":""} match your search</p>
    </aside>
  );
}
