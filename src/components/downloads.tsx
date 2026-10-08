"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Smartphone, ArrowUpRight, Clock3, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { downloads, getVerifiedDownload, type Audience } from "@/lib/downloads";
import { audiences } from "@/lib/content";
import { ButtonLink, Eyebrow } from "./ui";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "./ui/dialog";

const subscribeOrigin = () => () => {};

export function DownloadQR({ audience, compact = false }: { audience: Audience; compact?: boolean }) {
  const origin = useSyncExternalStore(subscribeOrigin, () => window.location.origin, () => "");
  return <div className={`download-qr ${compact ? "qr-compact" : ""}`}>
    <div className="qr-code" role="img" aria-label={`QR mở trang TH79 iMove ${audiences[audience].label} trên website này`}>
      {origin ? <QRCodeSVG aria-hidden="true" value={origin + "/tai-ung-dung#" + audience} size={compact ? 70 : 94} level="M" marginSize={2} bgColor="#ffffff" fgColor="#242625" /> : <QrCode size={compact ? 70 : 94} aria-hidden="true" />}
    </div>
    <div><strong>Mở trang ứng dụng</strong><span>TH79 iMove {audiences[audience].label}</span>{origin.includes("127.0.0.1") || origin.includes("localhost") ? <small>QR bản xem trước, dùng trên máy này.</small> : <small>Quét để xem thông tin phát hành.</small>}</div>
  </div>;
}

function StoreMark({ apple }: { apple: boolean }) {
  return apple ? <svg width="22" height="25" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true"><path d="M17.3 4.2c1-1.2 1.7-2.9 1.5-4.2-1.5.1-3.2 1-4.2 2.2-.9 1-1.7 2.7-1.5 4.1 1.6.1 3.2-.8 4.2-2.1ZM21.1 13.8c0-3.2 2.6-4.7 2.7-4.8-1.5-2.2-3.8-2.5-4.6-2.5-2-.2-3.9 1.2-4.9 1.2s-2.6-1.2-4.3-1.1C7.8 6.6 5.7 8 4.6 10c-2.3 4-.6 10 1.7 13.3 1.1 1.6 2.4 3.3 4.1 3.2 1.7-.1 2.3-1.1 4.3-1.1s2.6 1.1 4.3 1.1c1.8 0 2.9-1.6 4-3.2 1.3-1.8 1.8-3.5 1.8-3.6-.1 0-3.7-1.4-3.7-5.9Z" transform="translate(-2 -1) scale(.9)" /></svg> : <svg width="22" height="25" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true"><path d="m2 1 14 12L2 25V1Zm2-1 15 9-3 3L4 0Zm15 10 5 3-5 3-3-3 3-3ZM4 26l12-12 3 3L4 26Z" /></svg>;
}
export function StoreButtons({ audience }: { audience: Audience }) {
  return <div className="store-buttons">{(["ios", "android"] as const).map((platform) => {
    const record = downloads.find((item) => item.audience === audience && item.platform === platform)!;
    const href = getVerifiedDownload(record);
    const name = platform === "ios" ? "App Store" : "Google Play";
    const content = <><StoreMark apple={platform === "ios"} /><span><small>{href ? "Tải ứng dụng trên" : "Sắp có trên"}</small><strong>{name}</strong></span>{href && <ArrowUpRight size={16} aria-hidden="true" />}</>;
    return href ? <a key={platform} className="store-button" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Tải TH79 iMove ${audiences[audience].label} trên ${name}`}>{content}</a> :
      <Dialog key={platform}><DialogTrigger asChild><button type="button" className="store-button" aria-label={`Thông tin TH79 iMove ${audiences[audience].label} trên ${name}`}>{content}<ArrowUpRight size={16} aria-hidden="true" /></button></DialogTrigger>
        <DialogContent><span className="release-icon"><Clock3 size={25} aria-hidden="true" /></span>
          <DialogTitle className="dialog-title">Hành trình mới<br />đang được chuẩn bị.</DialogTitle>
          <DialogDescription className="dialog-description">TH79 iMove {audiences[audience].label} chưa có liên kết chính thức trên {name}. Trang này sẽ cập nhật khi ứng dụng được phát hành.</DialogDescription>
          <div className="release-role"><Smartphone size={20} aria-hidden="true" /><div><strong>TH79 iMove {audiences[audience].label}</strong><span>{audiences[audience].subtitle}</span></div><span className="release-state">Đang chuẩn bị</span></div>
          <DialogClose asChild><Link href={`/he-sinh-thai/${audience}`} className="button button-primary">Tìm hiểu ứng dụng <ArrowUpRight size={17} aria-hidden="true" /></Link></DialogClose>
        </DialogContent>
      </Dialog>;
  })}</div>;
}
export function DownloadCTA() {
  return <section className="container download-section" id="tai-ung-dung"><div className="download-banner" data-reveal><div><Eyebrow light>THÀNH PHỐ TRONG TẦM TAY</Eyebrow><h2>Một chạm hôm nay.<br />Một hành trình mới.</h2><p>Khám phá iMove User dành cho bạn.<br />Thông tin tải ứng dụng sẽ được cập nhật khi phát hành.</p><StoreButtons audience="user" /><div className="download-more"><ButtonLink href="/tai-ung-dung" className="button-white">Xem cả ba ứng dụng</ButtonLink></div></div><div className="download-right"><div className="download-orbit" aria-hidden="true"><span className="orbit-ring" /><span className="orbit-ring second" /><div className="app-icon">iM<span>.</span></div><span className="orbit-label orbit-user"><Smartphone size={18} /> User</span><span className="orbit-label orbit-driver">Driver <ArrowUpRight size={16} /></span><span className="orbit-label orbit-merchant">Merchant <ArrowUpRight size={16} /></span></div><DownloadQR audience="user" compact /></div></div></section>;
}
