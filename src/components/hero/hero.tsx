"use client";

import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight, Bike, CarFront, MapPin, Package, Smartphone, Store } from "lucide-react";
import { ButtonLink } from "../ui";
import { CityIllustration } from "../illustrations";

const CityScene = dynamic(() => import("./scene"), {
  ssr: false,
  loading: () => <div className="scene-fallback"><CityIllustration /></div>,
});

export function Hero() {
  return (
    <section className="hero" id="ve-imove" aria-labelledby="hero-heading">
      <div className="hero-coordinate" aria-hidden="true">TH79 / CONNECTED LIVING</div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="hero-status"><span className="status-dot" /> MỘT HỆ SINH THÁI. MỌI HÀNH TRÌNH.</div>
          <h1 id="hero-heading">Một chạm.<br />Cả thành phố<br /><span className="hero-red">chuyển động.</span></h1>
          <p className="hero-description">Đi nơi bạn muốn. Nhận điều bạn cần.<br />Từ những chuyến xe đến bữa ăn yêu thích,<br className="desktop-break" /> iMove kết nối nhịp sống của bạn.</p>
          <div className="hero-actions">
            <ButtonLink href="/tai-ung-dung">Khám phá ứng dụng</ButtonLink>
            <ButtonLink href="#dich-vu" secondary arrow={false}>Khám phá iMove <ArrowDown size={17} aria-hidden="true" /></ButtonLink>
          </div>
          <div className="hero-proof">
            <div className="proof-icons" aria-hidden="true"><span><Smartphone size={15} /></span><span><CarFront size={15} /></span><span><Store size={15} /></span></div>
            <span>Khách hàng. Tài xế. Cửa hàng.<br /><strong>Cùng một nhịp kết nối.</strong></span>
          </div>
        </div>
        <div className="hero-stage">
          <div className="hero-halo" /><div className="hero-grid-pattern" />
          <span className="stage-orbit" aria-hidden="true" />
          <div className="scene-area"><CityScene /></div>
          <div className="floating-badge badge-top" data-parallax>
            <span className="badge-icon"><MapPin size={18} aria-hidden="true" /></span>
            <span><strong>Mọi điểm đến. Một kết nối.</strong><small>TH79 iMove · nhịp sống trong tay</small></span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </div>
          <div className="floating-badge badge-bottom" data-parallax>
            <span className="badge-icon"><Package size={18} aria-hidden="true" /></span>
            <span><strong>Đi. Gửi. Ăn. Mua.</strong><small>Liền mạch trong một hệ sinh thái</small></span>
          </div>
          <span className="scene-annotation" aria-hidden="true">01 — THE CONNECTED CITY</span>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="container hero-bottom-inner">
          <span className="hero-bottom-intro">CUỘC SỐNG KHÔNG DỪNG LẠI.<br /><strong>IMOVE CHUYỂN ĐỘNG CÙNG BẠN.</strong></span>
          <div className="hero-benefits"><span><Bike size={20} aria-hidden="true" /> Di chuyển</span><span><Package size={20} aria-hidden="true" /> Giao nhận</span><span><Store size={20} aria-hidden="true" /> Ăn uống & mua sắm</span></div>
          <a href="#dich-vu" className="scroll-note">CUỘN ĐỂ KHÁM PHÁ <ArrowDown size={15} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}
