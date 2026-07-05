import React, { useState, useMemo, useRef } from "react";
import "./index.css";
import { PRODUCTS } from "./data/products";
import { CartIcon, Chevron } from "./components/Icons";
import ProductCard from "./components/ProductCard";
import Facets from "./components/Facets";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import Survey from "./components/Survey";

export default function App(){
  const [cart, setCart] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [surveyHighlight, setSurveyHighlight] = useState(false);
  const [filters, setFilters] = useState({category:new Set(), origin:new Set(), dietary:new Set(), heat:new Set(), onSale:false, maxPrice:30});
  const shopRef = useRef(null);
  const surveyRef = useRef(null);

  const addToCart = (p) => {
    setCart(c => {
      const existing = c[p.id];
      return {...c, [p.id]: {p, qty: existing ? existing.qty+1 : 1}};
    });
    setDrawerOpen(true);
  };

  const filterByOrigin = (origin) => {
    setFilters(f => { const s = new Set(f.origin); s.add(origin); return {...f, origin:s}; });
    shopRef.current && shopRef.current.scrollIntoView({behavior:"smooth", block:"start"});
  };

  const filtered = useMemo(()=>{
    return PRODUCTS.filter(p=>{
      if(filters.category.size && !filters.category.has(p.cat)) return false;
      if(filters.origin.size && !filters.origin.has(p.origin)) return false;
      if(filters.dietary.size && ![...filters.dietary].every(d=>p.dietary.includes(d))) return false;
      if(filters.heat.size && !filters.heat.has(p.heat)) return false;
      if(filters.onSale && !p.sale) return false;
      const effPrice = p.sale || p.price;
      if(effPrice > filters.maxPrice) return false;
      return true;
    });
  }, [filters]);

  const cartCount = Object.values(cart).reduce((s,i)=>s+i.qty,0);

  const scrollTo = (ref) => ref.current && ref.current.scrollIntoView({behavior:"smooth", block:"start"});

  return (
    <React.Fragment>
      <div className="promo">🌾 <b>Harvest Sale</b> — 20% off select single-origins, through Sunday. Free shipping over $40!</div>

      <header className="site">
        <div className="nav-inner">
          <div className="logo"><span className="seed">●</span> LARDER</div>
          <nav className="links">
            <button onClick={()=>scrollTo(shopRef)}>Shop</button>
            <button onClick={()=>scrollTo(shopRef)}>Our Farms</button>
            <button onClick={()=>scrollTo(surveyRef)}>Tell Us Something</button>
          </nav>
          <div className="header-actions">
            <button className="icon-btn" onClick={()=>setDrawerOpen(true)} aria-label="Open cart">
              <CartIcon/>
              {cartCount>0 && <span className="cart-count mono">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className="hero">
        <div>
          <span className="eyebrow">Single-origin pantry goods</span>
          <h1>Big flavor,<br/><em>direct from</em> the source.</h1>
          <p className="lede">We work with small, single-origin farms for spices, oils, grains and sauces most stores never carry — and pay them fairly for it. Taste the difference freshness makes.</p>
          <div style={{display:"flex", gap:12}}>
            <button className="btn btn-primary" onClick={()=>scrollTo(shopRef)}>Shop the Harvest <Chevron/></button>
            <button className="btn btn-ghost" onClick={()=>scrollTo(surveyRef)}>Share Feedback</button>
          </div>
        </div>
        <div className="hero-art">
          <div className="disc">
            <span className="num">15</span>
            <span className="lbl">Origins Stocked</span>
          </div>
        </div>
      </div>

      <div className="section" ref={shopRef} id="shop">
        <div className="section-head">
          <div>
            <span className="eyebrow">The shop</span>
            <h2>Find Your Next Ingredient</h2>
            <p>Filter by category, origin, diet or heat — or just browse and see what catches your eye.</p>
          </div>
        </div>
        <div className="shop-layout">
          <Facets filters={filters} setFilters={setFilters} resultCount={filtered.length} />
          <div>
            <div className="results-bar">
              <span>{filtered.length} of {PRODUCTS.length} ingredients</span>
            </div>
            {filtered.length===0 ? (
              <div className="empty-state">
                <h3>Nothing matches yet</h3>
                <p>Try clearing a filter or two — your ideal ingredient is probably one click away.</p>
              </div>
            ) : (
              <div className="grid">
                {filtered.map(p=> <ProductCard key={p.id} p={p} onAdd={addToCart} onFilterOrigin={filterByOrigin} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="section">
        <div className="founder">
          <div className="avatar">👩🏽‍🌾</div>
          <div>
            <blockquote>"I started Larder because the spice aisle at my grocery store tasted like nothing. Every ingredient here, I've either sourced myself or trust the person who did."</blockquote>
            <cite>— Ivan, Founder of Larder</cite>
          </div>
        </div>
      </div>

      <Survey highlighted={surveyHighlight} formRef={surveyRef} />

      <footer>
        <div className="footer-inner">
          <div className="fcol">
            <div className="logo" style={{fontSize:20, marginBottom:10}}><span className="seed">●</span> LARDER</div>
            <div style={{maxWidth:220}}>Single-origin pantry goods, sourced directly and sold honestly.</div>
          </div>
          <div className="fcol">
            <h4>Shop</h4>
            <div>Spices<br/>Oils<br/>Grains<br/>Sauces & Condiments</div>
          </div>
          <div className="fcol">
            <h4>Larder</h4>
            <div>Our Farms<br/>Founder's Notes<br/>Tell Us Something</div>
          </div>
          <div className="fcol">
            <h4>Say Hello</h4>
            <div>Cooking something with a Larder ingredient? Tag us — we love seeing what ends up on your table.</div>
          </div>
        </div>
      </footer>

      {drawerOpen && (
        <CartDrawer cart={cart} setCart={setCart} onClose={()=>setDrawerOpen(false)}
          onCheckout={()=>{ setDrawerOpen(false); setCheckoutOpen(true); }} />
      )}
      {checkoutOpen && (
        <CheckoutModal cart={cart} setCart={setCart}
          onClose={()=>setCheckoutOpen(false)}
          onOrderPlaced={()=>{ setCheckoutOpen(false); setSurveyHighlight(true); scrollTo(surveyRef); setTimeout(()=>setSurveyHighlight(false), 2500); }} />
      )}
    </React.Fragment>
  );
}
