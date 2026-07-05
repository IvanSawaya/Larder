import React, { useState } from "react";
import { Check } from "./Icons";

export default function Survey({highlighted, formRef}){
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="section" id="survey" ref={formRef}>
      <div className="survey-card" style={highlighted ? {boxShadow:"0 0 0 3px var(--turmeric)"} : {}}>
        {!submitted ? (
          <>
            <span className="eyebrow">Tell us something</span>
            <h2 style={{margin:"0 0 8px"}}>How Was Your Time in the Larder?</h2>
            <p style={{color:"var(--muted)", margin:"0 auto", maxWidth:420}}>We read every single note that comes through here — good, bad, or "you should really carry saffron." Tell us what delighted you, or what we can do better.</p>
            <div className="stars">
              {[1,2,3,4,5].map(n=>(
                <button key={n} className={"star-btn " + ((hover||rating)>=n ? "on":"")}
                  onMouseEnter={()=>setHover(n)} onMouseLeave={()=>setHover(0)}
                  onClick={()=>setRating(n)} aria-label={n + " star"}>★</button>
              ))}
            </div>
            <textarea placeholder="What made your visit great — or what should we fix?" value={comment} onChange={e=>setComment(e.target.value)}></textarea>
            <div style={{marginTop:16}}>
              <button className="btn btn-primary" disabled={rating===0} onClick={()=>setSubmitted(true)}>Send Feedback</button>
            </div>
          </>
        ) : (
          <div className="survey-done">
            <div className="checkmark"><Check/></div>
            <h3 style={{margin:0}}>Thank you — truly.</h3>
            <p style={{color:"var(--muted)", margin:0}}>Your thoughts help us stock a better pantry for everyone who walks through our (digital) door.</p>
          </div>
        )}
      </div>
    </div>
  );
}
