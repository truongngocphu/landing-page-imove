"use client";
import { useRef, useState } from "react";
import { audiences } from "@/lib/content";
import type { Audience } from "@/lib/downloads";
import { AppMockup } from "./app-mockup";
import { ButtonLink, Icon } from "./ui";
const roles: Audience[] = ["user", "driver", "merchant"];
export function Ecosystem() {
  const [active, setActive] = useState<Audience>("user");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const data = audiences[active];
  return <div className="ecosystem-panel" data-reveal><div className="ecosystem-tabs" role="tablist" aria-label="Khám phá vai trò trong hệ sinh thái">{roles.map((role, index) => <button key={role} ref={(element) => { tabs.current[index] = element; }} id={`tab-${role}`} role="tab" tabIndex={active === role ? 0 : -1} aria-selected={active === role} aria-controls="ecosystem-content" onClick={() => setActive(role)} onKeyDown={(event) => {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 3;
    else if (event.key === "ArrowLeft") next = (index + 2) % 3;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else return;
    event.preventDefault(); setActive(roles[next]); tabs.current[next]?.focus();
  }}><Icon name={role === "user" ? "smartphone" : role === "driver" ? "car" : "store"} size={20} /><span>iMove {audiences[role].label}</span></button>)}</div><div id="ecosystem-content" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0} className={`ecosystem-content role-${active}`}><div className="ecosystem-copy"><span className="small-label">{data.subtitle}</span><h3>{data.title.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h3><p>{data.description}</p><ul className="check-list">{data.benefits.map((benefit) => <li key={benefit}><span><Icon name="check" size={14} /></span>{benefit}</li>)}</ul><ButtonLink href={`/he-sinh-thai/${active}`}>Khám phá iMove {data.label}</ButtonLink></div><div className="ecosystem-visual"><div className="visual-ring" /><AppMockup audience={active} /></div></div></div>;
}
