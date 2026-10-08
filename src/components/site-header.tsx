"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Brand } from "./ui";
import { navigation } from "@/lib/content";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLElement>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 651px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);
  useEffect(() => {
    if (!open) return;
    const first = menu.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key === "Tab") {
        const links = Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
        const last = links.at(-1);
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); toggle.current?.focus(); }
        if (event.shiftKey && document.activeElement === toggle.current) { event.preventDefault(); last?.focus(); }
      }
    };
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, [open]);
  return <header className="site-header"><div className="container header-inner"><Brand onNavigate={() => setOpen(false)} /><nav aria-label="Điều hướng chính" className="desktop-nav">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav><Link className="button button-primary header-cta" href="/tai-ung-dung" onClick={() => setOpen(false)}>Tải ứng dụng<ArrowUpRight size={17} aria-hidden="true" /></Link><button ref={toggle} className="menu-toggle" aria-label={open ? "Đóng menu" : "Mở menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button></div>{open && <nav ref={menu} id="mobile-menu" aria-label="Điều hướng di động" className="mobile-nav">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={18} aria-hidden="true" /></Link>)}<Link href="/tai-ung-dung" onClick={() => setOpen(false)}>Tải ứng dụng<ArrowUpRight size={18} aria-hidden="true" /></Link></nav>}</header>;
}

