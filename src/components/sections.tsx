import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { services, faqs, features } from "@/lib/content";
import { CityIllustration } from "./illustrations";
import { Icon, SectionHeading, Eyebrow, TextLink } from "./ui";
import { Ecosystem } from "./ecosystem";

export function ServiceCards() {
  return <div className="service-grid">{services.map((service) => <Link key={service.id} href={`/dich-vu#${service.id}`} className={`service-card service-${service.id}`} data-reveal><div className="service-card-top"><span className="service-number">/{service.number}</span><span className="circle-arrow"><ArrowUpRight size={20} aria-hidden="true" /></span></div><div className="service-art"><CityIllustration type={service.icon} /></div><div className="service-copy"><span className="small-label">{service.tag}</span><h3>{service.name}</h3><p>{service.description}</p></div></Link>)}</div>;
}
export function ServicesSection() {
  return <section className="section container" id="dich-vu"><SectionHeading eyebrow="CHO MỌI NHU CẦU MỖI NGÀY" title={<>Đi đâu, gửi gì.<br /><span className="muted-heading">Đã có iMove.</span></>} description="Từ những chuyến đi quen thuộc đến những món đồ cần trao gửi. Một hệ sinh thái, nhiều cách kết nối." /><ServiceCards /></section>;
}
export function FeaturesSection() {
  return <section className="feature-section"><div className="container"><div className="feature-intro" data-reveal><div><Eyebrow>THIẾT KẾ VÌ BẠN</Eyebrow><h2>Ít thao tác hơn.<br /><span className="muted-heading">Nhiều trải nghiệm hơn.</span></h2></div><TextLink href="/tinh-nang">Khám phá tính năng</TextLink></div><div className="feature-grid">{features.map((feature) => <div className="feature-item" key={feature.title} data-reveal><span className="icon-tile"><Icon name={feature.icon} size={25} /></span><h3>{feature.title}</h3><p>{feature.description}</p></div>)}</div></div></section>;
}
export function EcosystemSection() {
  return <section className="section container" id="he-sinh-thai"><SectionHeading eyebrow="MỘT HỆ SINH THÁI. NHIỀU CƠ HỘI." title={<>Mỗi người một vai trò.<br /><span className="muted-heading">Cùng một nhịp chuyển động.</span></>} description="Bạn là người trải nghiệm, người cầm lái hay người kinh doanh? iMove có một không gian riêng dành cho bạn." /><Ecosystem /></section>;
}
export function JourneySection() {
  return <section className="container journey-section"><div className="journey-intro" data-reveal><Eyebrow>BẮT ĐẦU THẬT ĐƠN GIẢN</Eyebrow><h2>Hành trình mới.<br />Chỉ vài bước nhỏ.</h2><p>Chọn ứng dụng phù hợp với bạn.<br />Phần còn lại, cùng iMove khám phá.</p><TextLink href="/tai-ung-dung">Tìm ứng dụng của bạn</TextLink></div><div className="journey-steps">{[{ title: "Chọn vai trò của bạn", text: "Khách hàng, tài xế hay cửa hàng — mỗi vai trò có ứng dụng riêng.", icon: "smartphone" as const }, { title: "Thiết lập tài khoản", text: "Tạo tài khoản và hoàn tất thông tin theo hướng dẫn trong ứng dụng.", icon: "shield" as const }, { title: "Kết nối và chuyển động", text: "Khám phá dịch vụ hoặc bắt đầu hành trình cùng cộng đồng đối tác.", icon: "navigation" as const }].map((step, i) => <div className="journey-step" key={step.title} data-reveal><span className="step-number">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p></div><Icon name={step.icon} /></div>)}</div></section>;
}
export function FAQSection() {
  return <section className="section container faq-section" id="cau-hoi"><div data-reveal><Eyebrow>BẠN HỎI, IMOVE TRẢ LỜI</Eyebrow><h2>Thêm một chút<br />thông tin hữu ích.</h2><p>Mọi hành trình tốt đều bắt đầu<br />từ những điều rõ ràng.</p></div><div className="faq-list">{faqs.map((faq) => <details key={faq.question} className="faq-item"><summary>{faq.question}<Plus size={20} aria-hidden="true" /></summary><p>{faq.answer}</p></details>)}</div></section>;
}
