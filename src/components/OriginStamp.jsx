import React from "react";

export default function OriginStamp({p, onClick}){
  return (
    <button className="stamp" title={"Filter by " + p.origin} onClick={onClick} aria-label={"Filter by origin: " + p.origin}>
      <span className="flag">{p.flag}</span>
      <span className="country">{p.origin}</span>
    </button>
  );
}
