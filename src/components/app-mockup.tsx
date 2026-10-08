import { ArrowUpRight, Bike, CarFront, MapPin, Navigation, Package, ShoppingBag, Store, UtensilsCrossed } from "lucide-react";
import type { Audience } from "@/lib/downloads";

export function AppMockup({ audience }: { audience: Audience }) {
  return <div className={`app-showcase mockup-${audience}`}>
    <div className="showcase-cross cross-one" aria-hidden="true">+</div><div className="showcase-cross cross-two" aria-hidden="true">+</div>
    <div className="phone-mockup" aria-hidden="true">
      <div className="phone-screen">
        <div className="phone-status"><span>9:41</span><span className="phone-notch" /><span>••• ▰</span></div>
        <div className="phone-brand"><span>iMove<span>.</span></span><span className="phone-avatar">{audience === "user" ? "U" : audience === "driver" ? "D" : "M"}</span></div>
        <p className="phone-greeting">{audience === "user" ? "Một ngày tốt lành." : audience === "driver" ? "Ngày mới. Hành trình mới." : "Cửa hàng của bạn."}</p>
        <h4>{audience === "user" ? "Hôm nay, đi đâu?" : audience === "driver" ? "Chủ động mỗi chuyến đi." : "Mọi đơn hàng, rõ ràng."}</h4>
        {audience !== "merchant" ? <div className="phone-map">
          <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
          <div className="map-block block-one" /><div className="map-block block-two" /><div className="map-block block-three" />
          <svg className="map-route" viewBox="0 0 240 200" fill="none"><path d="M49 164 66 86 139 97 168 34" stroke="#d92736" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><circle cx="49" cy="164" r="8" fill="#d92736" stroke="white" strokeWidth="3" /><circle cx="168" cy="34" r="8" fill="#d92736" stroke="white" strokeWidth="3" /></svg>
          <span className="phone-map-label"><MapPin size={12} />Hành trình trong tầm tay</span>
          <span className="phone-map-car"><CarFront size={21} /></span>
        </div> : <div className="merchant-preview">
          <div className="merchant-cover"><Store size={39} /><span>Kết nối cửa hàng<br /><strong>Cùng iMove Merchant</strong></span></div>
          <div className="merchant-row"><span><UtensilsCrossed size={18} /></span><div>Thực đơn của bạn<small>Quản lý món ăn và sản phẩm</small></div><ArrowUpRight size={15} /></div>
          <div className="merchant-row"><span><Package size={18} /></span><div>Đơn hàng<small>Sắp xếp trong một không gian</small></div><ArrowUpRight size={15} /></div>
          <div className="merchant-row"><span><ShoppingBag size={18} /></span><div>Cửa hàng<small>Thông tin và hoạt động</small></div><ArrowUpRight size={15} /></div>
        </div>}
        {audience === "user" ? <><div className="phone-services">{[{Icon:Bike,label:"Đi xe"},{Icon:Package,label:"Giao hàng"},{Icon:UtensilsCrossed,label:"Đồ ăn"},{Icon:ShoppingBag,label:"Mua hộ"}].map(({Icon,label}) => <div key={label}><span><Icon size={18} /></span>{label}</div>)}</div><div className="phone-search"><MapPin size={16} /><span>Bạn muốn đến đâu?</span><ArrowUpRight size={16} /></div></> : <div className="phone-partner-status"><span className="status-dot" /><div>{audience === "driver" ? "Bạn chọn khi nào bắt đầu" : "Sẵn sàng kết nối"}<small>{audience === "driver" ? "Linh hoạt theo lịch trình của bạn" : "Khách hàng · cửa hàng · giao nhận"}</small></div></div>}
        <div className="phone-primary">{audience === "user" ? "Khám phá dịch vụ" : audience === "driver" ? "Bắt đầu kết nối" : "Khám phá cửa hàng"}<Navigation size={16} /></div>
        <div className="phone-home-indicator" />
      </div>
    </div>
    <div className="mockup-chip"><span className="status-dot" /> TH79 iMove {audience === "user" ? "User" : audience === "driver" ? "Driver" : "Merchant"}</div>
    <p className="mockup-caption">Giao diện minh họa ý tưởng ứng dụng</p>
  </div>;
}
