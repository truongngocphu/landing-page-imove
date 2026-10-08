import type { Metadata } from "next";
import { services } from "@/lib/content";
import { CityIllustration } from "@/components/illustrations";
import { ButtonLink, Eyebrow } from "@/components/ui";
import { DownloadCTA } from "@/components/downloads";
export const metadata: Metadata = { title: "Dịch vụ", description: "Khám phá iMove Bike, iMove Car, iMove Delivery và kết nối cửa hàng trong hệ sinh thái TH79." };
const details = {
  bike: { title: "Gọn nhẹ,\nđi cùng nhịp phố.", benefits: ["Phù hợp những chuyến đi cá nhân", "Kết nối với đối tác xe máy", "Thông tin hành trình ngay trên ứng dụng"] },
  car: { title: "Thoải mái hơn,\ntrên từng chặng đường.", benefits: ["Một lựa chọn cho chuyến đi cùng người thân", "Kết nối với đối tác ô tô", "Chọn điểm đón và điểm đến thuận tiện"] },
  delivery: { title: "Gửi một món đồ.\nTrao một sự quan tâm.", benefits: ["Kết nối nhu cầu gửi và nhận hàng", "Thông tin giao nhận dễ theo dõi", "Gắn kết người gửi, người nhận và đối tác"] },
  food: { title: "Một bữa ăn ngon.\nThêm một ngày vui.", benefits: ["Khám phá nhà hàng và quán ăn", "Kết nối nhu cầu đặt và giao món", "Thông tin món ăn trên ứng dụng"] },
  shopping: { title: "Bạn cần một món đồ.\nGiữ thời gian cho điều khác.", benefits: ["Khám phá dịch vụ mua hộ", "Kết nối với đối tác phù hợp", "Theo dõi thông tin đơn hàng"] },
};
export default function Services() {
  return <><section className="container page-hero"><Eyebrow>DỊCH VỤ IMOVE</Eyebrow><h1>Mỗi ngày một nhu cầu.<br /><span>Mỗi hành trình một kết nối.</span></h1><p>Khám phá những cách iMove đồng hành với cuộc sống của bạn, từ di chuyển đến giao nhận và cửa hàng.</p><div className="page-intro-rule">DỊCH VỤ KHẢ DỤNG ĐƯỢC CẬP NHẬT TRONG ỨNG DỤNG CHÍNH THỨC.</div></section><div className="container">{services.map((service) => {
    const data = details[service.id as keyof typeof details];
    return <section id={service.id} className="service-detail" key={service.id}><div className="detail-art" data-reveal><CityIllustration type={service.icon} /></div><div className="detail-copy" data-reveal><Eyebrow>{service.name.toUpperCase()}</Eyebrow><h2>{data.title.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h2><p>{service.description}</p><ul className="check-list">{data.benefits.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul><ButtonLink href="/he-sinh-thai/user">Khám phá ứng dụng User</ButtonLink></div></section>;
  })}<section className="service-detail" id="merchant"><div className="detail-art" data-reveal><CityIllustration type="merchant" /></div><div className="detail-copy" data-reveal><Eyebrow>IMOVE MERCHANT</Eyebrow><h2>Đưa cửa hàng<br />gần khách hàng hơn.</h2><p>Một không gian riêng dành cho đối tác kinh doanh. Kết nối sản phẩm, khách hàng và giao nhận trên cùng hệ sinh thái iMove.</p><ul className="check-list"><li><span>✓</span>Giới thiệu cửa hàng và sản phẩm</li><li><span>✓</span>Quản lý thông tin đơn hàng</li><li><span>✓</span>Kết nối đối tác giao nhận</li></ul><ButtonLink href="/he-sinh-thai/merchant">Khám phá Merchant</ButtonLink></div></section></div><DownloadCTA /><div className="pb-20" /></>;
}
