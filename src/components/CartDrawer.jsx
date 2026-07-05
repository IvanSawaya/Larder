import React from "react";
import { CloseX } from "./Icons";
import { Chevron } from "./Icons";
import { money } from "../data/products";

export default function CartDrawer({cart, setCart, onClose, onCheckout}){
  const items = Object.values(cart);
  const subtotal = items.reduce((s,i)=> s + (i.p.sale||i.p.price)*i.qty, 0);
  const updateQty = (id, delta) => {
    setCart(c => {
      const next = {...c};
      const item = next[id];
      if(!item) return c;
      const q = item.qty + delta;
      if(q<=0){ delete next[id]; } else { next[id] = {...item, qty:q}; }
      return next;
    });
  };
  const remove = (id) => setCart(c => { const n={...c}; delete n[id]; return n; });

  return (
    <div className="overlay" onClick={onClose}>
      <div className="drawer" onClick={e=>e.stopPropagation()}>
        <div className="drawer-head">
          <strong style={{fontSize:18}}>Your Cart ({items.reduce((s,i)=>s+i.qty,0)})</strong>
          <button className="icon-btn" onClick={onClose} aria-label="Close cart"><CloseX/></button>
        </div>
        <div className="drawer-body">
          {items.length===0 && (
            <div className="empty-state">
              <h3>Your cart is empty</h3>
              <p>Browse the shop and add something delicious.</p>
            </div>
          )}
          {items.map(({p,qty})=>(
            <div className="cart-item" key={p.id}>
              <div className="cimg">{p.icon}</div>
              <div className="cinfo">
                <div style={{fontWeight:600, fontSize:14}}>{p.name}</div>
                <div className="mono" style={{fontSize:13}}>{money(p.sale||p.price)}</div>
                <div className="qty-ctrl">
                  <button onClick={()=>updateQty(p.id,-1)} aria-label="Decrease quantity">–</button>
                  <span className="mono">{qty}</span>
                  <button onClick={()=>updateQty(p.id,1)} aria-label="Increase quantity">+</button>
                </div>
                <button className="remove-link" onClick={()=>remove(p.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {items.length>0 && (
          <div className="drawer-foot">
            <div className="subtotal-row"><span>Subtotal</span><strong className="mono">{money(subtotal)}</strong></div>
            <button className="btn btn-primary btn-block" onClick={onCheckout}>Proceed to Checkout <Chevron/></button>
          </div>
        )}
      </div>
    </div>
  );
}
