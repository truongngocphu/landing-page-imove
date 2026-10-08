import { ArrowUpRight, CarFront, Route, Store } from "lucide-react";
import Link from "next/link";
import { Eyebrow } from "./ui";

export function PartnersSection() {
  return <section className="partners-section" id="doi-tac">
    <div className="container">
      <div className="partners-heading" data-reveal><div><Eyebrow light>NHỮNG NGƯỜI TẠO NÊN CHUYỂN ĐỘNG</Eyebrow><h2>Cùng một hướng.<br /><span>Nhiều cơ hội hơn.</span></h2></div><p>Mỗi chuyến xe, mỗi cửa hàng đều là một phần của nhịp sống thành phố. Cùng iMove mở ra những kết nối mới.</p></div>
      <div className="partners-grid">
        <Link href="/he-sinh-thai/driver" className="partner-card" data-reveal><div className="partner-card-top"><span>01 / ĐỐI TÁC TÀI XẾ</span><CarFront size={31} strokeWidth={1.3} aria-hidden="true" /></div><h3>Chủ động hành trình.<br />Chuyển động theo cách bạn.</h3><p>Kết nối nhu cầu di chuyển và giao nhận. Khám phá ứng dụng dành riêng cho người cầm lái.</p><span className="partner-link">Khám phá iMove Driver <ArrowUpRight size={19} aria-hidden="true" /></span></Link>
        <Link href="/he-sinh-thai/merchant" className="partner-card" data-reveal><div className="partner-card-top"><span>02 / NHÀ HÀNG & CỬA HÀNG</span><Store size={31} strokeWidth={1.3} aria-hidden="true" /></div><h3>Món ngon của bạn.<br />Gần thêm những khách hàng.</h3><p>Một không gian kết nối cửa hàng, nhà hàng và đối tác giao nhận. Khám phá iMove Merchant.</p><span className="partner-link">Khám phá iMove Merchant <ArrowUpRight size={19} aria-hidden="true" /></span></Link>
      </div>
      <div className="partners-line"><Route size={18} aria-hidden="true" /><span>USER <i /> DRIVER <i /> MERCHANT</span><span>CÙNG KẾT NỐI. CÙNG ĐI XA.</span></div>
    </div>
  </section>;
}
