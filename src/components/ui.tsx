import Link from "next/link";
import { ArrowUpRight, ArrowRight, Bike, CarFront, Package, Route, Smartphone, ShieldCheck, Network, Check, MapPin, Store, Download, Navigation, Heart, Leaf, Clock3, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import type { ReactNode } from "react";
const icons = { bike: Bike, car: CarFront, package: Package, route: Route, smartphone: Smartphone, shield: ShieldCheck, network: Network, check: Check, pin: MapPin, store: Store, download: Download, navigation: Navigation, heart: Heart, leaf: Leaf, clock: Clock3, food: UtensilsCrossed, shopping: ShoppingBag };
export type IconName = keyof typeof icons;
export function Icon({ name, size = 22, className = "" }: { name: IconName; size?: number; className?: string }) {
  const Component = icons[name];
  return <Component size={size} strokeWidth={1.7} aria-hidden="true" className={className} />;
}
export function Brand({ footer = false, onNavigate }: { footer?: boolean; onNavigate?: () => void }) {
  return <Link href="/" onClick={onNavigate} aria-label="TH79 iMove — Trang chủ" className={`brand ${footer ? "brand-footer" : ""}`}><span className="brand-word">i<span>Move</span><span className="brand-dot">.</span></span><span className="brand-family">BY TH79</span></Link>;
}
export function ButtonLink({ href, children, secondary = false, className = "", arrow = true }: { href: string; children: ReactNode; secondary?: boolean; className?: string; arrow?: boolean }) {
  return <Button asChild variant={secondary ? "outline" : "default"} className={`button ${secondary ? "button-secondary" : "button-primary"} ${className}`}><Link href={href}>{children}{arrow && <ArrowUpRight size={19} aria-hidden="true" />}</Link></Button>;
}
export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link className="text-link" href={href}>{children}<ArrowRight size={18} aria-hidden="true" /></Link>;
}
export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</p>;
}
export function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: ReactNode; description?: string }) {
  return <div className="section-heading" data-reveal><div><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2></div>{description && <p className="section-description">{description}</p>}</div>;
}
