import type { Metadata, Viewport } from "next";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "./globals.css";
import "./quality.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMotion } from "@/components/motion";
export const metadata: Metadata = {
  title: { default: "TH79 iMove — Một chạm. Mọi hành trình.", template: "%s | TH79 iMove" },
  description: "Khám phá TH79 iMove: hệ sinh thái kết nối nhu cầu di chuyển, giao nhận và cửa hàng. Ứng dụng riêng cho User, Driver và Merchant.",
  applicationName: "TH79 iMove",
  openGraph: { title: "TH79 iMove — Một chạm. Mọi hành trình.", description: "Kết nối những hành trình. Chuyển động cùng cuộc sống.", type: "website", locale: "vi_VN" },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#faf9f6" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="vi"><body><a href="#main" className="skip-link">Đến nội dung chính</a><SiteHeader /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /><PageMotion /></body></html>;
}
