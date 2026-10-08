import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { audiences } from "@/lib/content";
import type { Audience } from "@/lib/downloads";
import { AppMockup } from "@/components/app-mockup";
import { Eyebrow, Icon, SectionHeading, TextLink } from "@/components/ui";
import { StoreButtons, DownloadCTA } from "@/components/downloads";
import { EcosystemSection } from "@/components/sections";

function isAudience(value: string): value is Audience { return value === "user" || value === "driver" || value === "merchant"; }
export function generateStaticParams() { return Object.keys(audiences).map((audience) => ({ audience })); }
export async function generateMetadata({ params }: { params: Promise<{ audience: string }> }): Promise<Metadata> {
  const { audience } = await params;
  if (!isAudience(audience)) return {};
  return { title: `iMove ${audiences[audience].label}`, description: audiences[audience].description };
}
export default async function AudiencePage({ params }: { params: Promise<{ audience: string }> }) {
  const { audience } = await params;
  if (!isAudience(audience)) notFound();
  const data = audiences[audience];
  return <><section className="container page-hero page-hero-split"><div><Eyebrow>IMOVE {data.label.toUpperCase()} · {data.subtitle.toUpperCase()}</Eyebrow><h1>{data.title.split("\n").map((line, i) => i === 0 ? <span key={line} className="!text-ink">{line}<br /></span> : <span key={line}>{line}</span>)}</h1><p>{data.description}</p><StoreButtons audience={audience} /><div className="link-status"><Icon name="clock" size={18} /><span>Liên kết tải chính thức đang được cập nhật. <TextLink href="/tai-ung-dung">Xem các ứng dụng</TextLink></span></div></div><AppMockup audience={audience} /></section><section className="content-band"><div className="container"><SectionHeading eyebrow={`TRẢI NGHIỆM DÀNH CHO ${data.label.toUpperCase()}`} title="Riêng vai trò. Trọn trải nghiệm." /><div className="feature-grid !grid-cols-1 sm:!grid-cols-3">{data.benefits.map((benefit, i) => <article className="feature-item" key={benefit} data-reveal><span className="icon-tile"><Icon name={i === 0 ? "network" : i === 1 ? "smartphone" : "route"} /></span><h3>{benefit}</h3><p>Một phần trong trải nghiệm được định hướng cho ứng dụng iMove {data.label}.</p></article>)}</div></div></section><section className="section container"><SectionHeading eyebrow="BƯỚC ĐẦU KẾT NỐI" title={`Bắt đầu cùng iMove ${data.label}.`} /><div className="role-steps">{data.steps.map((step, i) => <div className="role-step" key={step} data-reveal><span>0{i + 1}</span><h3>{step}</h3><p>{i === 0 ? "Chọn thông tin phù hợp với nhu cầu và vai trò của bạn." : i === 1 ? "Thực hiện theo các bước trên ứng dụng chính thức khi phát hành." : "Kiểm tra thông tin trước khi bắt đầu sử dụng dịch vụ."}</p></div>)}</div></section><EcosystemSection /><DownloadCTA /><div className="pb-20" /></>;
}

