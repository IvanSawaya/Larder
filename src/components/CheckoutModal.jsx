import React, { useState } from "react";
import { CloseX, Chevron, Check } from "./Icons";
import { money } from "../data/products";

const STEPS = ["Cart","Shipping","Payment","Confirmation"];

function Stepper({step}){
  return (
    <div className="stepper">
      {STEPS.map((s,i)=>{
        const idx = i+1;
        const cls = idx<step ? "done" : idx===step ? "current" : "";
        return (
          <div className={"step " + cls} key={s}>
            <div className="dot">{idx<step ? <Check/> : idx}</div>
            <span className="slabel">{s}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function CheckoutModal({cart, setCart, onClose, onOrderPlaced}){
  const [step, setStep] = useState(1);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [shipping, setShipping] = useState({name:"", email:"", address:"", city:"", postal:"", country:"Canada"});
  const [payment, setPayment] = useState({card:"", expiry:"", cvv:""});
  const [orderId] = useState(()=> "LDR-" + Math.floor(100000 + Math.random()*899999));

  const items = Object.values(cart);
  let subtotal = items.reduce((s,i)=> s + (i.p.sale||i.p.price)*i.qty, 0);
  const discount = promoApplied ? subtotal*0.15 : 0;
  const shippingCost = subtotal - discount > 40 ? 0 : 5.5;
  const total = subtotal - discount + shippingCost;

  const canShip = shipping.name && shipping.email && shipping.address && shipping.city && shipping.postal;
  const canPay = payment.card.length>=12 && payment.expiry && payment.cvv.length>=3;

  const placeOrder = () => {
    setStep(4);
    setCart({});
  };

  return (
    <div className="modal-wrap" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
          <h2 style={{fontSize:22, margin:0}}>Checkout</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close checkout"><CloseX/></button>
        </div>
        <p style={{color:"var(--muted)", fontSize:13.5, marginTop:0, marginBottom:24}}>
          {step<4 ? `Step ${step} of 4 — ${STEPS[step-1]}. ${step===1?"Review what's in your basket.":step===2?"Tell us where to send your order.":"Add payment details to complete your purchase."}` : "You're all set!"}
        </p>
        <Stepper step={step} />

        {step===1 && (
          <div>
            {items.map(({p,qty})=>(
              <div className="cart-item" key={p.id}>
                <div className="cimg">{p.icon}</div>
                <div className="cinfo">
                  <div style={{fontWeight:600, fontSize:14}}>{p.name} <span className="mono" style={{color:"var(--muted)", fontWeight:400}}>× {qty}</span></div>
                  <div className="mono" style={{fontSize:13}}>{money((p.sale||p.price)*qty)}</div>
                </div>
              </div>
            ))}
            <div className="promo-note" style={{marginTop:16}}>
              🎉 <strong>First order?</strong> Use code <span className="mono">WELCOME15</span> for 15% off — you won't want to cook without this pantry again.
            </div>
            <div style={{display:"flex", gap:10, marginBottom:16}}>
              <input placeholder="Promo code" value={promo} onChange={e=>setPromo(e.target.value)} style={{flex:1, padding:"10px 12px", border:"1px solid var(--line)", borderRadius:3}}/>
              <button className="btn btn-ghost" onClick={()=>setPromoApplied(promo.trim().toUpperCase()==="WELCOME15")}>Apply</button>
            </div>
            {promoApplied && <p style={{color:"var(--teal)", fontSize:13, marginTop:-8}}>✓ Code applied — 15% off your order.</p>}
            <div className="subtotal-row"><span>Subtotal</span><span className="mono">{money(subtotal)}</span></div>
            {promoApplied && <div className="subtotal-row"><span>Discount</span><span className="mono">−{money(discount)}</span></div>}
            <div className="subtotal-row"><span>Shipping</span><span className="mono">{shippingCost===0?"Free":money(shippingCost)}</span></div>
            <div className="subtotal-row" style={{fontWeight:700, fontSize:17}}><span>Total</span><span className="mono">{money(total)}</span></div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={onClose}>Keep Shopping</button>
              <button className="btn btn-primary" disabled={items.length===0} onClick={()=>setStep(2)}>Continue to Shipping <Chevron/></button>
            </div>
          </div>
        )}

        {step===2 && (
          <div>
            <div className="form-row"><label>Full name</label><input value={shipping.name} onChange={e=>setShipping({...shipping,name:e.target.value})} placeholder="Jordan Rivera"/></div>
            <div className="form-row"><label>Email</label><input type="email" value={shipping.email} onChange={e=>setShipping({...shipping,email:e.target.value})} placeholder="you@example.com"/></div>
            <div className="form-row"><label>Street address</label><input value={shipping.address} onChange={e=>setShipping({...shipping,address:e.target.value})} placeholder="123 Sussex Drive"/></div>
            <div className="form-grid2">
              <div className="form-row"><label>City</label><input value={shipping.city} onChange={e=>setShipping({...shipping,city:e.target.value})} placeholder="Ottawa"/></div>
              <div className="form-row"><label>Postal code</label><input value={shipping.postal} onChange={e=>setShipping({...shipping,postal:e.target.value})} placeholder="K1A 0B1"/></div>
            </div>
            <div className="form-row">
              <label>Country</label>
              <select value={shipping.country} onChange={e=>setShipping({...shipping,country:e.target.value})}>
                <option>Canada</option><option>United States</option><option>United Kingdom</option><option>France</option>
              </select>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={()=>setStep(1)}>Back to Cart</button>
              <button className="btn btn-primary" disabled={!canShip} onClick={()=>setStep(3)}>Continue to Payment <Chevron/></button>
            </div>
          </div>
        )}

        {step===3 && (
          <div>
            <div className="form-row"><label>Card number</label><input value={payment.card} onChange={e=>setPayment({...payment,card:e.target.value})} placeholder="4111 1111 1111 1111"/></div>
            <div className="form-grid2">
              <div className="form-row"><label>Expiry</label><input value={payment.expiry} onChange={e=>setPayment({...payment,expiry:e.target.value})} placeholder="MM/YY"/></div>
              <div className="form-row"><label>CVV</label><input value={payment.cvv} onChange={e=>setPayment({...payment,cvv:e.target.value})} placeholder="123"/></div>
            </div>
            <p style={{fontSize:12, color:"var(--muted)"}}>This is a prototype — no real payment is processed and no card data leaves this page.</p>
            <div className="subtotal-row" style={{fontWeight:700, fontSize:17}}><span>Total due</span><span className="mono">{money(total)}</span></div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={()=>setStep(2)}>Back to Shipping</button>
              <button className="btn btn-gold" disabled={!canPay} onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        )}

        {step===4 && (
          <div className="confirm-wrap">
            <div className="big-check"><Check/></div>
            <h3 style={{margin:"0 0 6px"}}>Thank you, {shipping.name.split(" ")[0] || "friend"}!</h3>
            <p style={{color:"var(--muted)", maxWidth:380, margin:"0 auto"}}>Your pantry is on its way. We'll email {shipping.email || "you"} a tracking link the moment it leaves our warehouse.</p>
            <div className="order-id mono">{orderId}</div>
            <div className="modal-actions" style={{justifyContent:"center"}}>
              <button className="btn btn-primary" onClick={()=>{ onOrderPlaced(); }}>Got a second? Share your feedback <Chevron/></button>
            </div>
            <div style={{marginTop:10}}>
              <button className="clear-link" onClick={onClose}>Close and keep browsing</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
