import type { Metadata } from "next";
import { audiences } from "@/lib/content";
import type { Audience } from "@/lib/downloads";
import { Eyebrow, Icon, TextLink } from "@/components/ui";
import { StoreButtons, DownloadQR } from "@/components/downloads";
import { FAQSection } from "@/components/sections";
export const metadata: Metadata = { title: "Tải ứng dụng", description: "Chọn ứng dụng TH79 iMove User, Driver hoặc Merchant. Chỉ sử dụng liên kết tải chính thức đã được xác minh." };
export default function DownloadsPage() {
  return <><section className="container page-hero"><Eyebrow>MỘT ỨNG DỤNG PHÙ HỢP VỚI BẠN</Eyebrow><h1>Chọn vai trò của bạn.<br /><span>Bắt đầu cùng iMove.</span></h1><p>Ba ứng dụng riêng, cùng một hệ sinh thái. Chọn đúng ứng dụng để khám phá trải nghiệm dành cho bạn.</p><div className="link-status"><Icon name="clock" size={19} /><span>Ứng dụng đang được chuẩn bị phát hành. Chạm App Store hoặc Google Play để xem thông tin. Mã QR mở trang ứng dụng trên website này.</span></div></section><section className="container app-download-grid" aria-label="Ứng dụng iMove">{(Object.keys(audiences) as Audience[]).map((audience) => { const data = audiences[audience]; return <article id={audience} className={`app-download-card role-${audience}`} key={audience} data-reveal><div className="role-app-icon">iM.</div><div className="app-card-copy"><span className="small-label">{data.subtitle}</span><h2>iMove {data.label}</h2><p>{data.description}</p><StoreButtons audience={audience} /><DownloadQR audience={audience} /><TextLink href={`/he-sinh-thai/${audience}`}>Tìm hiểu ứng dụng</TextLink></div></article>; })}</section><FAQSection /></>;
}
