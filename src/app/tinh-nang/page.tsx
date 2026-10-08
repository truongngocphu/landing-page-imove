import type { Metadata } from "next";
import { features } from "@/lib/content";
import { Eyebrow, Icon } from "@/components/ui";
import { JourneySection } from "@/components/sections";
import { DownloadCTA } from "@/components/downloads";
export const metadata: Metadata = { title: "Tính năng", description: "Trải nghiệm iMove với kết nối dịch vụ, thông tin hành trình và ứng dụng riêng cho từng vai trò." };
export default function Features() {
  return <><section className="container page-hero"><Eyebrow>TINH GỌN TRONG TỪNG TRẢI NGHIỆM</Eyebrow><h1>Công nghệ ở phía sau.<br /><span>Bạn ở vị trí trung tâm.</span></h1><p>Những tính năng được định hướng để giảm thao tác, làm rõ thông tin và giúp mỗi kết nối trở nên thuận tiện hơn.</p></section><section className="container feature-detail-grid" aria-label="Các tính năng iMove">{features.map((feature, i) => <article className="feature-detail" key={feature.title} data-reveal><span>/0{i + 1}</span><Icon name={feature.icon} size={35} className="text-brand" /><h2>{feature.title}</h2><p>{feature.description}</p></article>)}</section><JourneySection /><DownloadCTA /><div className="pb-20" /></>;
}
