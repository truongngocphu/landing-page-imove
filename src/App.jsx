import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BellRing, Bike, Box, CalendarCheck,
  CarFront, Check, CheckCircle2, ChevronDown, CircleHelp, Clock3, Copy,
  CreditCard, Gift, Globe2, Headphones, Heart, LocateFixed, Map, MapPin,
  Menu, Minus, MousePointerClick, Navigation2, Package, Play, Plus, RouteIcon,
  ShieldCheck, ShoppingBag, Smartphone, Sparkles, Store, ThumbsUp, Truck,
  UtensilsCrossed, Wallet, X, Facebook, Music2, ScanQrCode, Send, MoveRight,
  Search, Languages, Newspaper, BookOpen, UserRoundPlus, Info, ChevronRight, LifeBuoy,
  ExternalLink, FileText, Home, Grid2X2
} from './icons';
import { APP_LINKS, CONTACT } from './config';

const A = '/assets/';
const appLogoPath = role => `${A}app-logo-${role}.png`;
// Trang chọn ứng dụng + thẻ tải riêng cho từng vai trò.
const appDownloadPath = role => `/tai-ung-dung#app-${role}`;
const roles = {
  user: {
    key: 'user', label: 'iMove User', short: 'User', subtitle: 'Dành cho khách hàng',
    eyebrow: 'iMOVE USER · DÀNH CHO KHÁCH HÀNG',
    titleA: 'Ngày của bạn,', titleB: 'Nhẹ nhàng hơn.',
    intro: 'Đặt xe, giao hàng, mua hộ và khám phá ẩm thực — mọi tiện ích trong một trải nghiệm liền mạch.',
    action: 'Khám phá iMove User', icon: Smartphone,
    benefits: [
      { icon: MousePointerClick, title: 'Chọn dịch vụ phù hợp với hành trình', text: 'Từ di chuyển, giao hàng tới món ngon, lựa chọn đúng nhu cầu trong vài chạm.' },
      { icon: RouteIcon, title: 'Theo dõi thông tin chuyến đi', text: 'Xem thông tin đơn hàng, cập nhật hành trình và trạng thái ngay trên ứng dụng.' },
      { icon: BadgeCheck, title: 'Kết nối với đối tác ngay trên ứng dụng', text: 'Kết nối cùng tài xế, cửa hàng và các dịch vụ trong hệ sinh thái.' },
    ],
    steps: [
      ['Chọn điểm đi và điểm đến', 'Nhập vị trí, tìm địa điểm phù hợp với nhu cầu.'],
      ['Chọn dịch vụ phù hợp', 'Chọn hình thức di chuyển hoặc tiện ích mà bạn muốn.'],
      ['Kết nối đối tác và bắt đầu hành trình', 'Kiểm tra thông tin, xác nhận và theo dõi trạng thái.'],
    ],
    cardDesc: 'Đặt xe, đặt món, giao hàng, mua hộ — nhiều tiện ích trong một ứng dụng.',
  },
  driver: {
    key: 'driver', label: 'iMove Driver', short: 'Driver', subtitle: 'Dành cho đối tác tài xế',
    eyebrow: 'iMOVE DRIVER · DÀNH CHO ĐỐI TÁC TÀI XẾ',
    titleA: 'Chủ động tay lái.', titleB: 'Mở thêm cơ hội.',
    intro: 'Chủ động nhận đơn, quản lý hành trình và kết nối với nhu cầu di chuyển, giao nhận trên cùng nền tảng.',
    action: 'Khám phá iMove Driver', icon: CarFront,
    benefits: [
      { icon: MousePointerClick, title: 'Tiếp cận nhu cầu di chuyển và giao nhận', text: 'Nhận thông tin đơn phù hợp với dịch vụ, phương tiện và khu vực hoạt động.' },
      { icon: Smartphone, title: 'Quản lý các chuyến đi trên ứng dụng', text: 'Xem yêu cầu, trạng thái chuyến và lịch sử hoạt động trong một giao diện.' },
      { icon: BadgeCheck, title: 'Theo dõi hoạt động và lịch sử hành trình', text: 'Minh bạch hơn trong việc quản lý hoạt động và thông tin giao dịch.' },
    ],
    steps: [
      ['Chuẩn bị thông tin và hồ sơ đối tác', 'Chuẩn bị giấy tờ theo yêu cầu đăng ký của nền tảng.'],
      ['Đăng ký trên ứng dụng Driver khi mở', 'Điền thông tin tài khoản và hồ sơ phương tiện.'],
      ['Hoàn tất xác minh theo yêu cầu', 'Chờ phê duyệt và bắt đầu kết nối với các đơn phù hợp.'],
    ],
    cardDesc: 'Chủ động hành trình, tiếp cận nhu cầu và theo dõi hoạt động thuận tiện.',
  },
  merchant: {
    key: 'merchant', label: 'iMove Merchant', short: 'Merchant', subtitle: 'Dành cho đối tác cửa hàng',
    eyebrow: 'iMOVE MERCHANT · DÀNH CHO ĐỐI TÁC CỬA HÀNG',
    titleA: 'Cửa hàng của bạn.', titleB: 'Kết nối rộng hơn.',
    intro: 'Mang cửa hàng đến gần khách hàng hơn. Quản lý đơn hàng, danh mục sản phẩm và hoạt động kinh doanh.',
    action: 'Khám phá iMove Merchant', icon: Store,
    benefits: [
      { icon: MousePointerClick, title: 'Giới thiệu cửa hàng và sản phẩm', text: 'Hiển thị món ăn, hàng hóa và dịch vụ trong trải nghiệm mua sắm thuận tiện.' },
      { icon: Smartphone, title: 'Sắp xếp thông tin đơn hàng', text: 'Tập trung yêu cầu, trạng thái xử lý và thông tin đơn trong một nơi.' },
      { icon: BadgeCheck, title: 'Kết nối hoạt động giao nhận', text: 'Tạo sự liền mạch giữa cửa hàng, khách hàng và hoạt động giao nhận.' },
    ],
    steps: [
      ['Chuẩn bị thông tin và địa chỉ cửa hàng', 'Thông tin liên hệ, địa chỉ, danh mục sản phẩm hoặc thực đơn.'],
      ['Đăng ký trên ứng dụng Merchant khi mở', 'Tạo tài khoản và cập nhật hồ sơ cửa hàng.'],
      ['Hoàn tất hồ sơ và thiết lập hoạt động', 'Đợi xét duyệt, thiết lập sản phẩm và sẵn sàng nhận đơn.'],
    ],
    cardDesc: 'Đưa sản phẩm đến gần khách hàng, quản lý đơn hàng trong tầm tay.',
  },
};
const rolesEn = {
  user: { subtitle:'For customers', eyebrow:'iMOVE USER · FOR CUSTOMERS', titleA:'Your everyday life,', titleB:'Made easier.', intro:'Book rides, send parcels, shop and explore food options in one connected experience.', action:'Explore iMove User',cardDesc:'Rides, food, deliveries and errands in one app.',benefits:[['Choose the right service','Explore rides, delivery and food in just a few steps.'],['Stay up to date','Check trip and order details as they change.'],['Connect with partners','Find drivers, stores and services in one ecosystem.']],steps:[['Choose locations','Enter pickup and destination details.'],['Choose a service','Pick the ride or service you need.'],['Confirm and track','Review details and follow your trip or order.']]},
  driver: { subtitle:'For driver partners', eyebrow:'iMOVE DRIVER · FOR DRIVER PARTNERS',titleA:'Own your journey.',titleB:'Find more opportunities.',intro:'Manage trips, review requests and stay connected with delivery and transport demand through one platform.',action:'Explore iMove Driver',cardDesc:'Manage your activity and trip opportunities.',benefits:[['Find matching requests','View eligible ride and delivery requests in your area.'],['Manage trips','Keep track of trip status and history.'],['Track your activity','Stay informed about your account and transactions.']],steps:[['Prepare your documents','Gather the necessary driver and vehicle details.'],['Register in the app','Create a profile when registration is available.'],['Complete verification','Wait for approval before accepting orders.']]},
  merchant: {subtitle:'For store partners',eyebrow:'iMOVE MERCHANT · FOR STORES',titleA:'Grow your store.',titleB:'Connect with more people.',intro:'Reach customers and manage orders, menus and store operations from a single app.',action:'Explore iMove Merchant',cardDesc:'Bring products closer to customers and manage orders.',benefits:[['Showcase your business','List products, menus and your store.'],['Stay on top of orders','Manage order requests and processing.'],['Coordinate deliveries','Connect store operations and delivery partners.']],steps:[['Prepare store details','Gather contact and business information.'],['Create a merchant profile','Register in the Merchant app when available.'],['Submit for approval','Complete onboarding and prepare products.']]},
};
function localizedRole(key,language){
  const original=roles[key];
  if(language!=='en')return original;
  const en=rolesEn[key];
  return {...original,...en,benefits:original.benefits.map((value,i)=>({...value,title:en.benefits[i][0],text:en.benefits[i][1]}))};
}
const englishFaqs = [
 ['Where is iMove available?','Service coverage depends on local rollout and active partners. Check the app for availability in your area.'],
 ['What payment options are available?','Available payment methods appear when confirming a trip or order and may vary by service or location.'],
 ['How can I become an iMove driver?','Open the Driver registration page and follow the official profile and verification requirements.'],
 ['What do Merchant partners need?','Stores may need business information and documents as required during registration and review.'],
 ['How do I track trips and orders?','Use the trips or orders section of the relevant app to check available status updates.'],
];
const serviceList = [
  { key:'bike', name:'iMove Bike', subtitle:'Di chuyển linh hoạt, nhanh chóng, tiết kiệm.', img:'service-bike.webp', icon:Bike, details:'Phù hợp với các quãng đường hằng ngày, nhu cầu đi lại cá nhân.' },
  { key:'car', name:'iMove Car', subtitle:'Xe 4 chỗ, 7 chỗ an toàn, tiện nghi.', img:'service-car.webp', icon:CarFront, details:'Lựa chọn di chuyển phù hợp khi đi cùng gia đình, bạn bè hoặc đồng nghiệp.' },
  { key:'delivery', name:'iMove Delivery', subtitle:'Giao hàng tận nơi nhanh chóng, thuận tiện.', img:'service-delivery.webp', icon:Truck, details:'Hỗ trợ kết nối nhu cầu giao nhận hàng hóa với đối tác vận chuyển.' },
  { key:'food', name:'iMove Food', subtitle:'Khám phá món ngon từ các cửa hàng, quán ăn.', img:'service-food.webp', icon:UtensilsCrossed, details:'Khám phá món ăn và theo dõi thông tin đặt hàng ngay trong ứng dụng.' },
  { key:'shopping', name:'iMove Mua hộ', subtitle:'Mua gì cũng có, tiện lợi và nhanh chóng.', img:'service-shopping.webp', icon:ShoppingBag, details:'Thêm tiện ích mua sắm, giúp bạn chủ động hơn trong những việc thường ngày.' },
];
const faqs = [
  ['iMove hoạt động ở những khu vực nào?', 'Phạm vi phục vụ phụ thuộc vào tình trạng triển khai và số lượng đối tác tại từng địa phương. Hãy mở ứng dụng để xem dịch vụ khả dụng tại khu vực của bạn.'],
  ['Tôi có thể thanh toán bằng những hình thức nào?', 'Hình thức thanh toán được hiển thị tại bước xác nhận đơn và có thể thay đổi theo dịch vụ hoặc khu vực. Vui lòng kiểm tra thông tin trước khi đặt đơn.'],
  ['Làm thế nào để trở thành tài xế iMove?', 'Truy cập trang iMove Driver, cài đặt ứng dụng khi có đường dẫn phát hành và thực hiện các bước đăng ký, bổ sung hồ sơ, xác minh theo hướng dẫn.'],
  ['Đối tác Merchant cần những điều kiện gì?', 'Cửa hàng cần cung cấp hồ sơ và thông tin hoạt động phù hợp. Yêu cầu cụ thể sẽ được hiển thị trong quy trình đăng ký và xét duyệt của ứng dụng Merchant.'],
  ['Làm sao để theo dõi chuyến đi hoặc đơn hàng?', 'Bạn có thể kiểm tra trạng thái trong mục chuyến đi hoặc đơn hàng của ứng dụng tương ứng. Các cập nhật tùy thuộc vào tình trạng hoạt động thực tế của hệ thống.'],
];

function Logo({ light=false }) {
  return <Link to="/" className={`logo ${light ? 'logo-light' : ''}`} aria-label="iMove trang chủ"><span className="logo-i">i</span>MOVE<span className="logo-dot">.</span></Link>;
}
function StoreBadge({ platform, onClick, compact=false }) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <button className={`store-badge ${compact ? 'store-badge-sm' : ''}`} type="button" onClick={onClick} aria-label={`Mở App Store hoặc Google Play: ${platform}`}>
    {platform === 'ios' ? <span className="apple-mark" aria-hidden="true"><svg width="25" height="28" viewBox="0 0 24 28" fill="currentColor"><path d="M17.6 6.5c-1.7-.1-2.8.9-4.1.9s-2.1-.9-3.9-.8C6.5 6.7 4 9.1 4 12.8 4 17 7.1 23.1 10 23.1c1.3 0 1.7-.8 3.4-.8 1.5 0 2 .8 3.3.8 2.6 0 5-5.2 5.4-6.5-2.5-1.1-3.9-2.8-3.9-5 0-2 1.1-3.7 2.9-4.7-1-.7-2.2-1.1-3.5-1.1zM15.8 4.6C17.1 3.1 17 1.3 17 .8c-2 0-4 1.4-4.3 3.7 1.1.1 2.2 0 3.1-.0z"/></svg></span> : <span className="play-mark" aria-hidden="true" />}
    <span className="store-badge-label"><small>{platform === 'ios' ? tx('Tải về trên','Download on the') : tx('TẢI ỨNG DỤNG TRÊN','GET IT ON')}</small><strong>{platform === 'ios' ? 'App Store' : 'Google Play'}</strong></span>
  </button>;
}
function StoreBadges({ role='user', onDownload, compact=false }) {
  return <div className="store-badges"><StoreBadge platform="ios" compact={compact} onClick={()=>onDownload(role,'ios')}/><StoreBadge platform="android" compact={compact} onClick={()=>onDownload(role,'android')}/></div>;
}
// Shared language state. Stored locally so the visitor keeps their chosen language.
const LanguageContext = React.createContext('vi');
function useLanguage(){ return React.useContext(LanguageContext); }
const localText = (language, vi, en) => language === 'en' ? en : vi;
const guideKinds = [
  {kind:'use', key:'user', path:'/huong-dan/su-dung/user', vi:'Sử dụng iMove User', en:'Using iMove User', descVi:'Đặt xe, món ăn và theo dõi đơn', descEn:'Book rides, food and track orders', icon:Smartphone},
  {kind:'use', key:'driver', path:'/huong-dan/su-dung/driver', vi:'Sử dụng iMove Driver', en:'Using iMove Driver', descVi:'Nhận chuyến và quản lý hoạt động', descEn:'Accept trips and manage activity', icon:CarFront},
  {kind:'use', key:'merchant', path:'/huong-dan/su-dung/merchant', vi:'Sử dụng iMove Merchant', en:'Using iMove Merchant', descVi:'Quản lý cửa hàng và đơn hàng', descEn:'Manage stores and orders', icon:Store},
  {kind:'register', key:'user', path:'/huong-dan/dang-ky/user', vi:'Đăng ký iMove User', en:'Register for iMove User', descVi:'Tạo tài khoản khách hàng', descEn:'Create a customer account', icon:Smartphone},
  {kind:'register', key:'driver', path:'/huong-dan/dang-ky/driver', vi:'Đăng ký iMove Driver', en:'Register for iMove Driver', descVi:'Hồ sơ tài xế và xác minh', descEn:'Driver documents and verification', icon:CarFront},
  {kind:'register', key:'merchant', path:'/huong-dan/dang-ky/merchant', vi:'Đăng ký iMove Merchant', en:'Register for iMove Merchant', descVi:'Hồ sơ cửa hàng và xét duyệt', descEn:'Store application and approval', icon:Store},
];
const knowledgeItems = [
  {id:'news', vi:'Tin tức & cập nhật', en:'News & updates', infoVi:'Các bài viết và thông báo dành cho hệ sinh thái',infoEn:'Articles and announcements about the ecosystem',path:'/tin-tuc',keywords:'thông báo cập nhật blog news update tin tức'},
  {id:'support', vi:'Chăm sóc khách hàng', en:'Customer support',infoVi:'Trợ giúp và hướng dẫn liên hệ',infoEn:'Help and contact guidance',path:'/cham-soc-khach-hang',keywords:'liên hệ hotline hỗ trợ khiếu nại ticket báo lỗi customer support'},
  {id:'apps',vi:'Danh sách ứng dụng',en:'All iMove apps',infoVi:'Chọn User, Driver hoặc Merchant',infoEn:'Choose User, Driver or Merchant',path:'/tai-ung-dung',keywords:'download tải app cửa hàng ứng dụng'},
  {id:'privacy',vi:'Chính sách bảo mật',en:'Privacy policy',infoVi:'Cách sử dụng và bảo vệ thông tin',infoEn:'Information and privacy',path:'/privacy',keywords:'privacy policy data thông tin bảo mật'},
  {id:'terms',vi:'Điều khoản sử dụng',en:'Terms of service',infoVi:'Thông tin sử dụng nền tảng',infoEn:'Rules for using the platform',path:'/terms',keywords:'terms điều khoản chính sách'},
];
const newsEntries = [
  {titleVi:'Bắt đầu với hệ sinh thái iMove', titleEn:'Get started with the iMove ecosystem',descVi:'Tìm hiểu ba ứng dụng và vai trò của từng thành viên.',descEn:'Meet the three apps and what each one does.',path:'/tai-ung-dung',icon:Sparkles},
  {titleVi:'Hướng dẫn đăng ký đối tác tài xế',titleEn:'How to register as a driver partner',descVi:'Các bước chuẩn bị thông tin và hồ sơ tài xế.',descEn:'Information and documents to prepare.',path:'/huong-dan/dang-ky/driver',icon:CarFront},
  {titleVi:'Quản lý đơn hàng với iMove Merchant',titleEn:'Manage orders with iMove Merchant',descVi:'Các bước sử dụng ứng dụng dành cho cửa hàng.',descEn:'Getting started with the merchant app.',path:'/huong-dan/su-dung/merchant',icon:Store},
];
/**
 * Match one sidebar destination, including its hash.
 * React Router NavLink matches pathname only, so FAQ and support
 * were both active for /cham-soc-khach-hang#cau-hoi.
 */
function isSidebarDestinationCurrent(destination, currentLocation) {
  const [destinationPath, destinationHash = ''] = destination.split('#');
  const normalize = value => value === '/' ? '/' : value.replace(/\/+$/, '') || '/';
  const samePage = normalize(currentLocation.pathname) === normalize(destinationPath);
  if (!samePage) return false;
  const currentHash = (currentLocation.hash || '').replace(/^#/, '');
  // When an anchor destination exists, it is the selected item only if
  // the exact hash is active. The page-only item is inactive on any anchor.
  return destinationHash ? currentHash === destinationHash : currentHash === '';
}

function ExploreSidebar({open,onClose}) {
  const language = useLanguage();
  const location = useLocation();
  const tx = (vi,en) => localText(language,vi,en);
  const groups = [
    {title:tx('TỔNG QUAN','OVERVIEW'),items:[{path:'/',label:tx('Trang chủ','Homepage'),icon:Home},{path:'/tai-ung-dung',label:tx('Hệ sinh thái iMove','iMove ecosystem'),icon:Grid2X2}]},
    {title:tx('DANH SÁCH ĐĂNG KÝ','REGISTRATION'),mobileOnly:true,items:['user','driver','merchant'].map(key=>({path:appDownloadPath(key),label:tx(`Đăng ký ${roles[key].label}`,`Sign up for ${roles[key].label}`),icon:roles[key].icon}))},
    {title:tx('HƯỚNG DẪN SỬ DỤNG','APP USER GUIDES'),items:guideKinds.filter(x=>x.kind==='use').map(x=>({path:x.path,label:tx(x.vi,x.en),icon:x.icon}))},
    {title:tx('HƯỚNG DẪN ĐĂNG KÝ','REGISTRATION GUIDES'),items:guideKinds.filter(x=>x.kind==='register').map(x=>({path:x.path,label:tx(x.vi,x.en),icon:x.icon}))},
    {title:tx('TIN TỨC & HỖ TRỢ','NEWS & SUPPORT'),items:[{path:'/tin-tuc',label:tx('Tin tức & cập nhật','News & updates'),icon:Newspaper},{path:'/cham-soc-khach-hang',label:tx('Chăm sóc khách hàng','Customer support'),icon:Headphones},{path:'/cham-soc-khach-hang#cau-hoi',label:tx('Câu hỏi thường gặp','Frequently asked questions'),icon:CircleHelp}]},
    {title:tx('THÔNG TIN','INFORMATION'),items:[{path:'/privacy',label:tx('Chính sách bảo mật','Privacy policy'),icon:ShieldCheck},{path:'/terms',label:tx('Điều khoản sử dụng','Terms of service'),icon:FileText}]},
  ];
  const sidebarRef = useRef(null);
  useEffect(()=>{
    if(!open) return;
    const esc = e => {if(e.key==='Escape') onClose()};
    document.addEventListener('keydown',esc);
    document.body.classList.add('imove-drawer-locked');
    const focusId = window.setTimeout(()=>sidebarRef.current?.querySelector('button')?.focus(),50);
    return ()=>{document.removeEventListener('keydown',esc);document.body.classList.remove('imove-drawer-locked');clearTimeout(focusId)};
  },[open,onClose]);
  return <>
    {open && <div className="imove-sidebar-scrim" role="presentation" onPointerDown={onClose}/>}
    <aside ref={sidebarRef} id="imove-explore-sidebar" className={`imove-sidebar ${open?'is-active':''}`} aria-label={tx('Menu khám phá','Explore menu')} aria-hidden={!open} inert={!open ? true : undefined}>
      <div className="imove-sidebar-head"><div className="imove-sidebar-language"><LanguagePicker/></div><button className="imove-icon-button" type="button" aria-label={tx('Đóng menu','Close menu')} onClick={onClose}><X size={21}/></button></div>
      <div className="imove-sidebar-scroll">
        {groups.map(group=><div className={`imove-sidebar-group${group.mobileOnly?' imove-sidebar-mobile-only':''}`} key={group.title}><h3>{group.title}</h3>{group.items.map(({path,label,icon:Icon})=> {const current=isSidebarDestinationCurrent(path,location);return <Link key={path} to={path} onClick={onClose} aria-current={current?'page':undefined} className={`imove-sidebar-link${current?' is-current':''}`}><Icon size={18} aria-hidden="true"/><span>{label}</span><ChevronRight size={15} aria-hidden="true"/></Link>})}</div>)}
      </div>
      <div className="imove-sidebar-foot"><span className="imove-sidebar-status"/> TH79 iMove · Connected Living</div>
    </aside>
  </>;
}
function buildSearchItems(language) {
  const tx = (vi,en)=>localText(language,vi,en);
  return [
    ...serviceList.map(s=>({id:`service-${s.key}`,title:s.name,description:tx(s.subtitle,({bike:'Motorbike rides',car:'Comfortable car rides',delivery:'Fast parcel delivery',food:'Food ordering',shopping:'Shopping assistance'})[s.key]),path:`/?search_service=${s.key}#dich-vu`,icon:s.icon,keywords:`${s.name} ${s.subtitle} xe máy ô tô car bike delivery food mua hộ` })),
    ...guideKinds.map(g=>({id:`guide-${g.kind}-${g.key}`,title:tx(g.vi,g.en),description:tx(g.descVi,g.descEn),path:g.path,icon:g.icon,keywords:`${g.vi} ${g.en} ${g.descVi} ${g.descEn} register tutorial howto hướng dẫn`})),
    ...Object.values(roles).map(r=>({id:`app-${r.key}`,title:r.label,description:tx(r.subtitle,({user:'Customer app',driver:'Driver partner app',merchant:'Merchant partner app'})[r.key]),path:`/${r.key}`,icon:r.icon,keywords:`${r.label} ${r.intro} app`})),
    ...Object.values(roles).map(r=>({id:`sign-up-${r.key}`,title:tx(`Đăng ký ${r.label}`,`Sign up for ${r.label}`),description:tx(r.subtitle,'Download this app to register'),path:appDownloadPath(r.key),icon:r.icon,keywords:`register sign up hồ sơ tài khoản ${r.label}`})),
    ...knowledgeItems.map(k=>({id:k.id,title:tx(k.vi,k.en),description:tx(k.infoVi,k.infoEn),path:k.path,icon:Info,keywords:k.keywords})),
    ...faqs.map(([q,a],idx)=>({id:`faq-${idx}`,title:q,description:a,path:'/cham-soc-khach-hang#cau-hoi',icon:CircleHelp,keywords:`${q} ${a} faq support`})),
  ];
}
function normalizeSearch(value) {
  return (value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim();
}
function InstantSearch({navigationKey}) {
  const language=useLanguage();
  const navigate=useNavigate();
  const tx=(vi,en)=>localText(language,vi,en);
  const [query,setQuery]=useState('');
  const [open,setOpen]=useState(false);
  const [index,setIndex]=useState(0);
  const inputRef=useRef(null);
  const wrapRef=useRef(null);
  const all=React.useMemo(()=>buildSearchItems(language),[language]);
  const normalized=normalizeSearch(query);
  const words=normalized.split(/\s+/).filter(Boolean);
  const results=React.useMemo(()=> !normalized ? [] : all.map(item=>{
    const title=normalizeSearch(item.title), description=normalizeSearch(item.description), keywords=normalizeSearch(item.keywords);
    const match=words.every(word=>title.includes(word)||description.includes(word)||keywords.includes(word));
    const score=words.reduce((total,word)=>total+(title.includes(word)?9:0)+(description.includes(word)?3:0)+(keywords.includes(word)?1:0),0);
    return {...item,match,score};
  }).filter(item=>item.match).sort((a,b)=>b.score-a.score).slice(0,8),[all,normalized]);
  useEffect(()=>{setOpen(false);setQuery('');setIndex(0)},[navigationKey]);
  useEffect(()=>{setIndex(0)},[query,language]);
  useEffect(()=>{
    const outer=e=>{ if(!wrapRef.current?.contains(e.target))setOpen(false) };
    document.addEventListener('pointerdown',outer);
    return ()=>document.removeEventListener('pointerdown',outer);
  },[]);
  const choose=(item)=>{navigate(item.path);setOpen(false);setQuery('');inputRef.current?.blur()};
  const onKeyDown=e=>{
    if(e.key==='Escape'){setOpen(false);return}
    if(e.key==='ArrowDown'){e.preventDefault();setOpen(true);if(results.length)setIndex(i=>Math.min(i+1,results.length-1))}
    if(e.key==='ArrowUp'){e.preventDefault();setIndex(i=>Math.max(i-1,0))}
    if(e.key==='Enter'&&open&&results[index]){e.preventDefault();choose(results[index])}
  };
  return <div className={`imove-search ${open?'is-open':''}`} ref={wrapRef}>
    <button className="imove-search-mobile-trigger" type="button" aria-label={tx('Mở tìm kiếm','Open search')} onClick={()=>{if(open){setOpen(false);inputRef.current?.blur()}else{setOpen(true);setTimeout(()=>inputRef.current?.focus(),50)}}}><Search size={21}/></button>
    <div className="imove-search-box"><Search size={19}/><input ref={inputRef} value={query} onChange={e=>{setQuery(e.target.value);setOpen(true)}} onFocus={()=>setOpen(true)} onKeyDown={onKeyDown} type="search" placeholder={tx('Tìm dịch vụ, hướng dẫn...','Search services, guides...')} aria-label={tx('Tìm kiếm thông tin iMove','Search iMove website')} role="combobox" aria-autocomplete="list" aria-expanded={open&&!!query} aria-controls="imove-search-results" aria-activedescendant={open&&results[index]?`imove-result-${results[index].id}`:undefined} autoComplete="off"/>
      {query && <button type="button" className="imove-search-clear" aria-label={tx('Xóa tìm kiếm','Clear search')} onClick={()=>{setQuery('');inputRef.current?.focus()}}><X size={14}/></button>}
    </div>
    {open&&!!query.trim() && <div className="imove-search-results" id="imove-search-results" role="listbox"><div className="imove-search-results-label">{results.length?tx(`${results.length} kết quả phù hợp`,`${results.length} matching results`):tx('Không tìm thấy nội dung phù hợp','No matching results')}</div>
      {results.map((item,i)=><button type="button" role="option" aria-selected={index===i} key={item.id} id={`imove-result-${item.id}`} className={`imove-search-result ${index===i?'is-selected':''}`} onMouseEnter={()=>setIndex(i)} onClick={()=>choose(item)}><span className="imove-search-result-icon"><item.icon size={19}/></span><span><strong>{item.title}</strong><small>{item.description}</small></span><ArrowUpRight size={15}/></button>)}
      <div className="imove-search-tip">{tx('Tìm tức thời trong nội dung website • Enter để mở','Instant site search • Press Enter to open')}</div>
    </div>}
  </div>;
}
function NewHeader() {
  const navigate = useNavigate();
  const language=useLanguage();
  const tx=(vi,en)=>localText(language,vi,en);
  const {pathname,hash}=useLocation();
  const [sidebarOpen,setSidebarOpen]=useState(false);
  const [regOpen,setRegOpen]=useState(false);
  const registerRef=useRef(null);
  const regActive=pathname.startsWith('/dang-ky/') || (pathname==='/tai-ung-dung' && /^#app-(user|driver|merchant)$/.test(hash));
  useEffect(()=>{setSidebarOpen(false);setRegOpen(false)},[pathname,hash]);
  useEffect(()=>{
    if(!regOpen)return;
    const outside=e=>{if(!registerRef.current?.contains(e.target))setRegOpen(false)};
    const esc=e=>{if(e.key==='Escape')setRegOpen(false)};
    document.addEventListener('pointerdown',outside);document.addEventListener('keydown',esc);
    return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',esc)};
  },[regOpen]);
  return <>
    <header className="site-header imove-new-header"><div className="container nav-wrap imove-new-nav-wrap">
      <div className="imove-navbar-left"><button type="button" className={`imove-explore-button ${sidebarOpen?'is-active':''}`} aria-label={tx('Mở menu Khám phá','Open Explore menu')} aria-controls="imove-explore-sidebar" aria-expanded={sidebarOpen} onClick={()=>setSidebarOpen(true)}><Menu size={23}/><span>{tx('Khám phá','Explore')}</span></button><Logo/></div>
      <div className="imove-navbar-right">
        <InstantSearch navigationKey={pathname+hash}/>
        <div ref={registerRef} className={`imove-new-register nav-explore nav-register-menu ${regOpen?'is-open':''} ${regActive?'is-current':''}`}>
          <button type="button" className="nav-explore-trigger" aria-expanded={regOpen} aria-controls="imove-new-registration-menu" onClick={()=>setRegOpen(s=>!s)}><span className="imove-register-full">{tx('Danh sách đăng ký','Register')}</span><span className="imove-register-short">{tx('Đăng ký','Sign up')}</span><ChevronDown size={16}/></button>
          {regOpen&&<div className="nav-explore-panel" id="imove-new-registration-menu"><div className="nav-explore-items"><span className="nav-explore-caption">{tx('CHỌN LOẠI TÀI KHOẢN','CHOOSE AN ACCOUNT')}</span>{['user','driver','merchant'].map(key=><Link key={key} onClick={()=>setRegOpen(false)} to={appDownloadPath(key)} aria-current={pathname==='/tai-ung-dung' && hash===`#app-${key}`?'page':undefined} className={pathname==='/tai-ung-dung' && hash===`#app-${key}`?'is-current':''}>{React.createElement(roles[key].icon,{size:20})}<span><strong>{tx('Đăng ký','Register')} {roles[key].label}</strong><small>{tx(roles[key].subtitle,({user:'Customer account',driver:'Driver partner',merchant:'Store partner'})[key])}</small></span><ArrowUpRight size={15}/></Link>)}</div></div>}
        </div>
        <NavLink aria-label={tx('Chăm sóc khách hàng','Customer support')} className={({isActive})=>`imove-support-nav ${isActive?'is-current':''}`} to="/cham-soc-khach-hang"><Headphones size={18}/><span>{tx('Chăm sóc khách hàng','Customer support')}</span></NavLink>
        <LanguagePicker/>
        <NavLink
          to="/tai-ung-dung"
          className={({isActive})=>`pill-btn imove-nav-download ${isActive?'is-current':''}`}
          aria-label={tx('Tải ứng dụng iMove','Get iMove apps')}
          onClick={(event) => {
            // Preserve opening in a new tab and other native browser behaviors.
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            setRegOpen(false);
            setSidebarOpen(false);
            if (pathname === '/tai-ung-dung') {
              window.scrollTo({top: 0, behavior: 'smooth'});
            } else {
              navigate('/tai-ung-dung');
            }
          }}
        >
          <span>{tx('Tải ứng dụng','Get the apps')}</span><ArrowRight size={17}/>
        </NavLink>
      </div>
    </div></header>
    <ExploreSidebar open={sidebarOpen} onClose={()=>setSidebarOpen(false)}/>
  </>;
}
function LanguagePicker() {
  const language=useLanguage();
  const update=React.useContext(LanguageSetterContext);
  return <div className="imove-language-control" aria-label="Language selector"><Languages size={17}/><button type="button" className={language==='vi'?'is-active':''} aria-pressed={language==='vi'} onClick={()=>update('vi')}>VI</button><span aria-hidden="true">/</span><button type="button" className={language==='en'?'is-active':''} aria-pressed={language==='en'} onClick={()=>update('en')}>EN</button></div>;
}
const LanguageSetterContext=React.createContext(()=>{});

function GuidePage({kind,role}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const isRegister=kind==='register',r=roles[role];
  const items=isRegister?REGISTRATION_INFO[role].steps:r.steps.map(step=>step[0]);
  const englishUse={user:['Install and open iMove User when available.','Enter your pickup and destination, then choose a service.','Review details, confirm and track your trip or order.'],driver:['Install and sign in to iMove Driver.','Complete the required checks and enable your approved services.','Review, accept and manage trips in the app.'],merchant:['Install and sign in to iMove Merchant.','Set up store details, products and operating status.','Confirm incoming orders and update preparation status.']};
  const englishReg={user:['Provide your contact details.','Verify your phone using the official app flow.','Complete your account and start exploring.'],driver:['Submit your initial application.','Provide identity and vehicle documents for verification.','Wait for approval before taking orders.'],merchant:['Provide store information.','Submit any requested business documents.','Wait for approval and configure products.']};
  const enItems=isRegister?englishReg[role]:englishUse[role];
  const name=localText(language,isRegister?'Hướng dẫn đăng ký':'Hướng dẫn sử dụng',isRegister?'Registration guide':'User guide');
  return <main className="imove-info-page"><section className="imove-info-hero"><div className="container imove-info-hero-inner"><span className="eyebrow">iMOVE / {name.toUpperCase()}</span><h1>{name}<br/><em>{r.label}</em></h1><p>{tx(isRegister?'Các bước cơ bản để bắt đầu hồ sơ. Việc xác minh và phê duyệt thực hiện trên nền tảng chính thức.':'Tìm hiểu quy trình sử dụng ứng dụng qua các bước đơn giản. Giao diện thực tế có thể thay đổi theo phiên bản. ',isRegister?'Basic steps to start an application. Verification and approval take place through official systems.':'Follow these simple steps to get started. The app interface may change between versions.')}</p></div></section>
  <section className="container imove-guide-layout"><div className="imove-guide-main"><div className="imove-info-section-header"><span className="eyebrow">{tx('CÁC BƯỚC THỰC HIỆN','STEP BY STEP')}</span><h2>{tx('Bắt đầu chỉ với vài bước','Getting started')}</h2></div><div className="imove-guide-steps">{items.map((step,i)=><article key={i} className="imove-guide-step"><span>{String(i+1).padStart(2,'0')}</span><div><h3>{language==='en'?enItems[i]:step}</h3><p>{tx(isRegister?'Hoàn tất bước này theo yêu cầu xác thực và xét duyệt của iMove.':'Mở ứng dụng phù hợp và làm theo hướng dẫn trên màn hình. ',isRegister?'Complete this step according to iMove verification requirements.':'Open the corresponding app and follow its on-screen prompts.')}</p></div></article>)}</div><div className="imove-guide-note"><ShieldCheck size={21}/>{tx('Không cung cấp mật khẩu hoặc mã OTP cho người khác. Mọi thao tác xác thực cần được thực hiện trong ứng dụng hoặc kênh chính thức.','Never share passwords or OTP codes. Verify only inside the official app or an authorized channel.')}</div></div><aside className="imove-guide-side"><h3>{tx('Tiếp tục hành trình','What next?')}</h3><p>{tx('Tải ứng dụng phù hợp để đăng ký tài khoản, hoặc xem thêm thông tin về ứng dụng.','Download the appropriate app to register your account, or learn more about it.')}</p><Link to={appDownloadPath(role)} className="pill-btn">{tx('Tải app để đăng ký','Download to register')} <ArrowRight size={17}/></Link><Link className="imove-guide-secondary" to={`/${role}`}>{tx('Giới thiệu ứng dụng','About this app')} <ArrowUpRight size={16}/></Link><div className="imove-guide-side-bottom"><Headphones size={19}/><Link to="/cham-soc-khach-hang">{tx('Cần hỗ trợ? Liên hệ CSKH','Need help? Contact support')}</Link></div></aside></section></main>;
}
function NewsPage() {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <main className="imove-info-page"><section className="imove-info-hero"><div className="container imove-info-hero-inner"><span className="eyebrow">iMOVE / {tx('TIN TỨC','NEWS')}</span><h1>{tx('Tin tức','News')}<br/><em>& {tx('Thông tin mới','Updates')}</em></h1><p>{tx('Nội dung hướng dẫn và thông tin chung của hệ sinh thái iMove. Tin tức chính thức sẽ được cập nhật sau khi tích hợp hệ thống quản trị.','Guides and general information about iMove. Official news will be published after the content management system is connected.')}</p></div></section><section className="container imove-news-content"><div className="imove-info-section-header"><span className="eyebrow">{tx('BÀI VIẾT HỮU ÍCH','USEFUL ARTICLES')}</span><h2>{tx('Khám phá thông tin iMove','Discover iMove')}</h2></div><div className="imove-news-grid">{newsEntries.map(n=><Link to={n.path} className="imove-news-card" key={n.path}><div className="imove-news-icon"><n.icon size={30}/></div><span className="eyebrow">{tx('HƯỚNG DẪN','GUIDE')}</span><h3>{tx(n.titleVi,n.titleEn)}</h3><p>{tx(n.descVi,n.descEn)}</p><span>{tx('Xem bài viết','Read article')} <ArrowUpRight size={16}/></span></Link>)}</div><div className="imove-content-notice"><BellRing size={20}/>{tx('Chưa có nguồn tin tức động kết nối Admin/Backend. Các bài hiện tại là hướng dẫn tĩnh, không phải thông báo phát hành hoặc bản tin xác thực.','No live news feed is connected to Admin/Backend. These are static guides, not verified news announcements.')}</div></section></main>;
}
function SupportPage(){
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  // return <main className="imove-info-page"><section className="imove-info-hero"><div className="container imove-info-hero-inner"><span className="eyebrow">TH79 iMOVE / SUPPORT</span><h1>{tx('Chăm sóc','Customer')}<br/><em>{tx('khách hàng.','support.')}</em></h1><p>{tx('Tìm câu trả lời, chọn hướng dẫn phù hợp và xem các kênh liên hệ chính thức của iMove.','Find answers, explore guides and check the official iMove contact channels.')}</p></div></section><section className="container imove-support-content"><div className="imove-info-section-header"><span className="eyebrow">{tx('TRUNG TÂM TRỢ GIÚP','HELP CENTER')}</span><h2>{tx('Bạn cần hỗ trợ vấn đề gì?','How can we help?')}</h2></div><div className="imove-support-grid"><Link to="/huong-dan/su-dung/user" className="imove-support-card"><BookOpen size={28}/><h3>{tx('Hướng dẫn sử dụng','App user guides')}</h3><p>{tx('Các bước sử dụng User, Driver và Merchant.','How to use User, Driver and Merchant.')}</p><ArrowUpRight size={17}/></Link><Link to="/huong-dan/dang-ky/driver" className="imove-support-card"><UserRoundPlus size={28}/><h3>{tx('Hỗ trợ đăng ký','Registration help')}</h3><p>{tx('Quy trình hồ sơ và phê duyệt đối tác.','Application and approval guidance.')}</p><ArrowUpRight size={17}/></Link><a href={CONTACT.website} target="_blank" rel="noreferrer" className="imove-support-card"><Globe2 size={28}/><h3>{tx('Website đơn vị phát triển','Company website')}</h3><p>{tx('Xem thông tin liên hệ do TH79 công bố.','Visit TH79 for published contact details.')}</p><ExternalLink size={17}/></a></div><div id="cau-hoi"><FAQ/></div><div className="imove-content-notice"><Headphones size={20}/><span>{tx('Website chưa tích hợp live chat hoặc API tạo ticket. Khi cần gửi yêu cầu hỗ trợ trực tiếp, hãy sử dụng kênh CSKH đã được công bố trong ứng dụng iMove chính thức.','Live chat and support ticket APIs are not connected yet. For direct assistance, use the official contact channels published in the iMove app.')}</span></div></section></main>;
}

function ScrollBehavior() {
  const {pathname,hash}=useLocation();
  useEffect(()=>{
    let timer=setTimeout(()=>{
      if(hash){const el=document.getElementById(decodeURIComponent(hash.slice(1))); if(el)el.scrollIntoView({behavior:'smooth',block:'start'});else window.scrollTo(0,0)}
      else window.scrollTo({top:0,behavior:'instant'});
    },60);
    return ()=>clearTimeout(timer);
  },[pathname,hash]);
  useEffect(()=>{
    const titles = {'/':'Một hành trình, vạn kết nối','/tai-ung-dung':'Chọn ứng dụng phù hợp','/user':'iMove User','/driver':'iMove Driver','/merchant':'iMove Merchant','/privacy':'Chính sách bảo mật','/terms':'Điều khoản sử dụng','/tin-tuc':'Tin tức iMove','/cham-soc-khach-hang':'Chăm sóc khách hàng'};
    document.title=`${titles[pathname] || 'TH79 iMove'} | TH79 iMove`;
  },[pathname]);
  return null;
}
function SectionHead({ eyebrow, children, desc, action, actionTo, inverse=false }) {
  return <div className={`section-heading ${inverse?'section-heading-inverse':''}`}><div><span className="eyebrow">• {eyebrow}</span><h2>{children}</h2></div>{desc&&<div className="section-heading-side"><p>{desc}</p>{action&&<Link className="tiny-pill" to={actionTo||'/tai-ung-dung'}>{action}<ArrowRight size={14}/></Link>}</div>}</div>;
}
function FloatingPin({className=''}) {return <span aria-hidden="true" className={`floating-pin ${className}`}><MapPin size={22} fill="currentColor" stroke="white"/></span>}
function HomeHero({ onDownload }) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <section className="home-hero"><div className="container hero-inner"><div className="home-hero-copy reveal-in"><div className="hero-eyebrow"><span className="hero-line"/> {tx('MỘT ỨNG DỤNG, VẠN KẾT NỐI','ONE APP. ENDLESS CONNECTIONS.')}</div><h1>{tx('Một ngày một nhịp cầu.','One app for every day.')}<br/><em>{tx('Mỗi hành trình','Every journey,')}<br/>{tx('một kết nối.','one connection.')}</em></h1><p>{tx('Di chuyển, giao hàng, đặt món, mua hộ. Tất cả trong một trải nghiệm tiện lợi, linh hoạt và gần gũi hơn mỗi ngày.','Rides, delivery, food and shopping — everyday convenience in one connected experience.')}</p><div className="hero-buttons"><Link className="white-cta" to="/tai-ung-dung">{tx('Khám phá ứng dụng','Explore apps')} <ArrowUpRight size={18}/></Link><Link className="outline-light-cta" to="/#dich-vu">{tx('Xem dịch vụ','View services')} <ArrowRight size={16}/></Link></div><div className="hero-small-detail"><span className="icon-ping"><Navigation2 size={15}/></span> TH79 iMove — Connected Living</div></div><div className="hero-art-wrap" aria-label="iMove 3D illustration"><picture className="hero-art-picture"><source media="(max-width: 700px)" srcSet={`${A}hero-isometric-mobile.webp`}/><img src={`${A}hero-isometric.webp`} alt="Mô hình iMove với ô tô, xe máy, thành phố và điện thoại bản đồ" className="hero-art" loading="eager" decoding="async" fetchPriority="high"/></picture><div className="hero-stat stat-a"><CheckCircle2 size={17}/> {tx('Kết nối mọi hành trình','Connected journeys')}</div><div className="hero-stat stat-b"><MapPin size={17}/> {tx('Trải nghiệm đa tiện ích','Everyday services')}</div></div></div><div className="hero-bottom-accent"/></section>;
}
function Services() {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const subtitlesEn={bike:'Quick, flexible and affordable rides.',car:'Comfortable 4–7 seat car rides.',delivery:'Convenient door-to-door delivery.',food:'Explore food from local stores.',shopping:'Shopping help when you need it.'};
  const detailsEn={bike:'Motorbike rides for daily commuting.',car:'A practical choice for families and groups.',delivery:'Parcel deliveries with delivery partners.',food:'Explore meals and follow orders in the app.',shopping:'Support for shopping and errands.'};
  const location=useLocation();
  const serviceKey=new URLSearchParams(location.search).get('search_service');
  const [selected,setSelected]=useState(serviceList.some(item=>item.key===serviceKey)?serviceKey:null);
  useEffect(()=>{if(serviceKey && serviceList.some(item=>item.key===serviceKey))setSelected(serviceKey)},[serviceKey]);
  return <section className="section services-section" id="dich-vu"><div className="container"><SectionHead eyebrow={tx("DỊCH VỤ KẾT NỐI MỌI NHU CẦU","SERVICES FOR EVERYDAY LIFE")} desc={tx("Từ di chuyển, giao hàng đến món ngon, iMove hướng đến một điểm chạm cho nhiều nhu cầu hằng ngày.","Rides, delivery, food and shopping, all connected.")} action={tx("Khám phá ứng dụng","Explore apps")} actionTo="/tai-ung-dung">{tx("Đi đâu, gọi gì?","Where to next?")}<br/><em>{tx("Đã có","Try")} <span className="red-text">iMove.</span></em></SectionHead><div className="services-grid">{serviceList.map(s=><button key={s.key} type="button" className={`service-card ${selected===s.key?'selected':''}`} onClick={()=>setSelected(selected===s.key?null:s.key)} aria-pressed={selected===s.key}><span className="service-illustration"><img src={`${A}${s.img}`} alt={`Minh họa dịch vụ ${s.name}`} loading="lazy"/></span><span className="service-card-inner"><span className="service-name">{s.name}</span><span className="service-subtitle">{tx(s.subtitle,subtitlesEn[s.key])}</span><span className="service-more">{selected===s.key?tx('Thu gọn','Collapse'):tx('Xem chi tiết','View details')} <ArrowRight size={13}/></span></span></button>)}</div>{selected&&<div className="selected-service" role="status"><div className="selected-service-icon">{React.createElement(serviceList.find(s=>s.key===selected).icon,{size:22})}</div><p><strong>{serviceList.find(s=>s.key===selected).name}</strong> — {tx(serviceList.find(s=>s.key===selected).details,detailsEn[selected])}</p><Link to="/user">{tx("Tìm hiểu thêm","Learn more")} <ArrowRight size={15}/></Link></div>}</div></section>;
}
function Features() {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const list=[
    {icon:ThumbsUp,title:tx('Dễ sử dụng','Easy to use'),body:tx('Giao diện thân thiện, đặt dịch vụ chỉ với vài thao tác.','An intuitive interface for everyday tasks.')},
    {icon:Smartphone,title:tx('Theo dõi thời gian thực','Real-time tracking'),body:tx('Cập nhật vị trí và trạng thái hành trình ngay trên ứng dụng.','View trip and order status updates in the app.')},
    {icon:ShieldCheck,title:tx('An toàn & tin cậy','Security & trust'),body:tx('Thông tin minh bạch để bạn chủ động trong từng lựa chọn.','Clear information to help you make decisions.')},
    {icon:Gift,title:tx('Nhiều ưu đãi hấp dẫn','More benefits'),body:tx('Khám phá các chương trình và tiện ích trong hệ sinh thái.','Explore offers and useful services.')},
  ];
  return <section className="section features-section" id="tinh-nang"><div className="container"><SectionHead eyebrow={tx('VÌ SAO CHỌN iMOVE?','WHY iMOVE?')} desc={tx('Chúng tôi không chỉ mang đến dịch vụ, mà còn là một hệ sinh thái tiện ích cho cuộc sống hiện đại.','More than a single service — connected experiences for everyday life.')}>{tx('Ít thao tác.','Fewer steps.')}<br/><em>{tx('Nhiều trải nghiệm hơn.','More experiences.')}</em></SectionHead><div className="feature-grid">{list.map(f=><div className="feature-item" key={f.title}><div className="feature-icon"><f.icon size={34} strokeWidth={1.9}/></div><h3>{f.title}</h3><p>{f.body}</p></div>)}</div></div></section>;
}
function PhoneMockup({role='user',small=false}){
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const r=roles[role];
  return <div className={`phone-mockup ${small?'phone-small':''}`} aria-label={`Minh họa giao diện ứng dụng ${r.label}`}><div className="phone-camera"/><div className="phone-screen"><div className="phone-status"><span>9:41</span><span>●●◕</span></div><div className="phone-app-head"><span className="phone-app-logo"><img src="/favicon.png" alt="iMOVE"/></span><BellRing size={13}/></div>{role==='user'?<><div className="phone-greeting">{tx('Chào bạn!','Hello!')} <span>👋</span><strong>{tx('Mình đi đâu hôm nay?','Where to today?')}</strong></div><div className="phone-places"><div><span className="place-dot from"/> {tx('Vị trí hiện tại','Current location')}</div><div><span className="place-dot to"/> {tx('Bạn muốn đi đâu?','Your destination')}</div></div><div className="phone-map"><MiniMap/><span className="phone-map-chip"><LocateFixed size={9}/> {tx('Đã xác định vị trí','Location found')}</span></div><div className="phone-bottom-icons"><Bike/><CarFront/><Package/><UtensilsCrossed/></div></>:role==='driver'?<><div className="phone-greeting">{tx('Sẵn sàng nhận cuốc?','Ready for trips?')}<strong>{tx('Xin chào đối tác!','Hello partner!')}</strong></div><div className="driver-status"><span className="online-dot"/> {tx('Đang trực tuyến','Online')} <span>●</span></div><div className="phone-map phone-driver-map"><MiniMap/></div><div className="phone-driver-order"><span>{tx('Đơn hàng gần bạn','Nearby orders')}</span><strong>2.5 km <ArrowRight size={10}/></strong></div><div className="phone-bottom-icons"><Map/><Wallet/><CalendarCheck/><Smartphone/></div></>:<><div className="phone-greeting">{tx('Cửa hàng của bạn','Your store')} <strong>{tx('Quản lý dễ dàng hơn.','Manage with ease.')}</strong></div><div className="merchant-highlight"><span>{tx('Đơn hàng hôm nay','Orders today')}</span><strong>08</strong><small><span className="online-dot"/> {tx('Đang hoạt động','Active')}</small></div><div className="phone-merchant-orders"><span>{tx('Đơn hàng mới','New orders')}</span><div><UtensilsCrossed size={13}/> #IM2048 <strong>{tx('Mới','New')}</strong></div><div><ShoppingBag size={13}/> #IM2052 <strong>{tx('Đang xử lý','Preparing')}</strong></div><div><Package size={13}/> #IM2053 <strong>{tx('Giao hàng','Delivery')}</strong></div></div><div className="phone-bottom-icons"><Store/><ShoppingBag/><Wallet/><Smartphone/></div></>}</div></div>;
}
function MiniMap(){return <svg viewBox="0 0 220 180" className="mini-map-svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="220" height="180" fill="#f6f6f3"/><path d="M0 20L220 100M-10 100L198 -20M20 190L218 28M0 146L220 178" stroke="#fff" strokeWidth="16"/><path d="M70 -5L140 185M192 -4L16 185" stroke="#fff" strokeWidth="11"/><path d="M-5 40L220 115M-10 105L192 -20M20 190L218 28" stroke="#e5e7e7" strokeWidth="1"/><path d="M50 140 Q78 120 84 82 T155 45" stroke="#ef0916" strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="170"/><circle cx="51" cy="138" r="9" fill="#fff" stroke="#f10816" strokeWidth="5"/><path d="M155 29a13 13 0 0 1 13 13c0 10-13 23-13 23s-13-13-13-23a13 13 0 0 1 13-13z" fill="#ef0916"/><circle cx="155" cy="41" r="4" fill="#fff"/><rect x="5" y="18" width="23" height="12" rx="5" fill="#e7f0df"/><rect x="130" y="102" width="51" height="25" rx="6" fill="#e7f0df"/></svg>}
function Ecosystem({selectedRole,setSelectedRole}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en),role=localizedRole(selectedRole,language);
  return <section className="section ecosystem-section" id="he-sinh-thai"><div className="container"><SectionHead eyebrow={tx('MỘT HỆ SINH THÁI · NHIỀU ĐIỂM CHẠM','ONE ECOSYSTEM · THREE EXPERIENCES')} desc={tx('Ba ứng dụng, một hệ sinh thái — kết nối khách hàng, tài xế và cửa hàng.','Three apps connect customers, drivers and merchants.')}>{tx('Mỗi người một vai trò.','A role for everyone.')}<br/><em>{tx('Cùng một nhịp chuyển động.','Moving forward together.')}</em></SectionHead><div className="ecosystem-panel"><div className="role-tabs" role="tablist" aria-label="Choose app">{Object.values(roles).map(r=><button key={r.key} type="button" role="tab" aria-selected={selectedRole===r.key} className={`role-tab ${selectedRole===r.key?'active':''}`} onClick={()=>setSelectedRole(r.key)}><r.icon size={24}/><span>{r.label}</span></button>)}</div><div className="eco-copy" key={role.key}><span className="eyebrow">{tx('KHÁM PHÁ','EXPLORE')} {role.label.toUpperCase()}</span><h3>{role.titleA}<br/><em>{role.titleB}</em></h3><p>{role.intro}</p><div className="eco-bullets"><span><CheckCircle2/> {tx('Trải nghiệm tập trung','Unified experience')}</span><span><CheckCircle2/> {tx('Thiết kế tối ưu theo vai trò','Built for your role')}</span><span><CheckCircle2/> {tx('Kết nối cùng hệ sinh thái','Connected ecosystem')}</span></div><Link className="pill-btn" to={`/${role.key}`}>{role.action} <ArrowUpRight size={15}/></Link></div><div className="eco-phone-area"><span className="eco-orbit orbit-one"/><span className="eco-orbit orbit-two"/><PhoneMockup role={selectedRole}/><span className="eco-caption">TH79 iMove {role.short} <ArrowUpRight size={13}/></span></div></div></div></section>;
}
function Opportunity(){
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <section className="opportunity-section"><div className="container opportunity-layout"><div className="opportunity-intro"><span className="eyebrow">{tx('KHÁM PHÁ CƠ HỘI CÙNG iMOVE','OPPORTUNITIES WITH iMOVE')}</span><h2>{tx('Cùng một hướng.','One direction.')}<br/><em>{tx('Nhiều cơ hội hơn.','More opportunities.')}</em></h2><p>{tx('Không chỉ là hành trình của một người. Hệ sinh thái iMove kết nối nhiều vai trò trong cùng một chuyển động.','A connected ecosystem where customers, drivers and stores move together.')}</p><Link to="/tai-ung-dung" className="text-link-light">{tx('Khám phá hệ sinh thái','Explore the ecosystem')} <ArrowRight size={15}/></Link></div><Link to="/driver" className="opportunity-card opportunity-driver"><span>01 / iMOVE DRIVER</span><CarFront size={48} strokeWidth={1.5}/><h3>{tx('Chủ động hành trình.','Drive your journey.')}<br/>{tx('Chạm đến cơ hội.','Find opportunities.')}</h3><p>{tx('Dành cho đối tác tài xế muốn kết nối thêm nhu cầu di chuyển và giao nhận.','For driver partners looking to connect with ride and delivery requests.')}</p><span className="opportunity-more">{tx('Tìm hiểu thêm','Learn more')} <ArrowUpRight size={15}/></span></Link><Link to="/merchant" className="opportunity-card opportunity-merchant"><span>02 / iMOVE MERCHANT</span><Store size={48} strokeWidth={1.5}/><h3>{tx('Mở rộng kết nối.','Grow connections.')}<br/>{tx('Kinh doanh linh hoạt.','Run your store.')}</h3><p>{tx('Dành cho cửa hàng muốn tiếp cận khách hàng và quản lý hoạt động.','For stores wanting to reach customers and manage operations.')}</p><span className="opportunity-more">{tx('Tìm hiểu thêm','Learn more')} <ArrowUpRight size={15}/></span></Link></div></section>;
}
function Steps({role='user',home=false}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const data=home?(language==='en'?[['Choose your service','Enter a destination or request.'],['Find a partner and confirm','Review trip or order details.'],['Follow progress and finish','Track available updates.']]:[['Chọn dịch vụ và nhập điểm đến','Bắt đầu bằng nhu cầu phù hợp.'],['Tìm tài xế/đối tác và xác nhận đơn','Kiểm tra thông tin và xác nhận.'],['Theo dõi trực tuyến và hoàn thành chuyến','Chủ động xem trạng thái hành trình.']]):localizedRole(role,language).steps;
  return <section className={`section steps-section ${home?'steps-home':''}`}><div className="container"><SectionHead eyebrow={home?tx('HÀNH TRÌNH CÙNG iMOVE','HOW iMOVE WORKS'):tx(`BƯỚC KHỞI ĐẦU CÙNG ${roles[role].label.toUpperCase()}`,`GET STARTED WITH ${roles[role].label.toUpperCase()}`)}>{home?<>{tx('Hành trình mới.','Get started.')}<br/><em>{tx('Chỉ vài bước nhỏ.','Just a few steps.')}</em></>:<>{tx('Bắt đầu cùng','Start with')} <span className="red-text">{roles[role].label}.</span></>}</SectionHead><div className="steps-grid">{data.map((step,i)=><div className="step" key={i}><div className="step-number">{String(i+1).padStart(2,'0')}</div><h3>{step[0]}</h3><p>{step[1]}</p>{i<data.length-1&&<span className="step-arrow" aria-hidden="true"><ArrowRight size={20}/></span>}</div>)}</div></div></section>;
}
function DownloadBanner({onDownload,role='user'}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <section className="download-wrap" id="tai-app"><div className="container"><div className="download-banner"><div className="download-copy"><span className="eyebrow">• {tx('TẢI ỨNG DỤNG TH79 iMOVE NGAY','DISCOVER TH79 iMOVE APPS')}</span><h2>{tx('Một chạm hôm nay.','One tap today.')}<br/>{tx('Một hành trình mới.','A new journey.')}</h2><p>{tx('Khám phá thêm những tiện ích và cách kết nối trong hệ sinh thái iMove.','Find more ways to connect with the iMove ecosystem.')}</p></div><div className="download-store"><StoreBadges role={role} onDownload={onDownload}/><Link to="/tai-ung-dung" className="white-cta small">{tx('Xem các ứng dụng','Explore all apps')} <ArrowUpRight size={16}/></Link></div><div className="download-visual"><div className="download-rings"><span className="download-im"><img src="/favicon.png" alt="Logo iMOVE" loading="lazy" decoding="async"/></span></div><div className="download-qr"><img src={`${A}website-qr.png`} alt="iMove QR code"/><span>{tx('Quét QR để xem','Scan QR to see')}<br/>{tx('các ứng dụng','the apps')}</span></div></div></div></div></section>;
}
function FAQ({limit}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const [open,setOpen]=useState(-1);
  const items=(language==='en'?englishFaqs:faqs).slice(0,limit||faqs.length);
  return <section className="section faq-section" id="faq"><div className="container faq-layout"><div className="faq-intro"><span className="eyebrow">• {tx('BẠN HỎI, iMOVE TRẢ LỜI','FREQUENTLY ASKED QUESTIONS')}</span><h2>{tx('Thêm một chút','Some helpful')}<br/>{tx('thông tin hữu ích.','answers.')}</h2><p>{tx('Một vài câu hỏi thường gặp về iMove, các ứng dụng và cách bắt đầu.','Common questions about iMove and how to get started.')}</p></div><div className="faq-items">{items.map(([question,answer],i)=><div className={`faq-item ${i===open?'faq-open':''}`} key={question}><button type="button" className="faq-question" aria-expanded={i===open} onClick={()=>setOpen(open===i?-1:i)}><span>{question}</span>{i===open?<Minus size={18}/>:<Plus size={18}/>}</button>{i===open&&<div className="faq-answer">{answer}</div>}</div>)}</div></div></section>;
}
function Footer({onDownload,onSocial}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Logo/><p>{tx('Nền tảng kết nối di chuyển','A connected mobility platform')}<br/>{tx('thuộc hệ sinh thái TH79.','by TH79 ecosystem.')}<br/><strong>Connected Living.</strong></p><div className="footer-location"><MapPin size={14}/> {tx('Việt Nam','Vietnam')}</div><a className="footer-location" href={CONTACT.website} target="_blank" rel="noreferrer"><Globe2 size={14}/> daututh79.com</a><div className="footer-social"><button aria-label="Facebook" onClick={()=>onSocial('Facebook')}><Facebook size={15} fill="currentColor"/></button><button aria-label="TikTok" onClick={()=>onSocial('TikTok')}><Music2 size={15}/></button></div></div><div className="footer-group"><h4>{tx('Về iMove','About iMove')}</h4><Link to="/">{tx('Giới thiệu','Overview')}</Link><Link to="/#tinh-nang">{tx('Tính năng','Features')}</Link><Link to="/tai-ung-dung">{tx('Tuyển đối tác','Become a partner')}</Link><Link to="/cham-soc-khach-hang">{tx('Liên hệ','Contact')}</Link></div><div className="footer-group"><h4>{tx('Dịch vụ','Services')}</h4><Link to="/#dich-vu">{tx('Di chuyển','Rides')}</Link><Link to="/#dich-vu">{tx('Giao hàng','Delivery')}</Link><Link to="/#dich-vu">{tx('Đặt đồ ăn','Food')}</Link><Link to="/#dich-vu">{tx('Mua hộ','Shopping')}</Link></div><div className="footer-group"><h4>{tx('Ứng dụng','Apps')}</h4><Link to="/user">iMove User</Link><Link to="/driver">iMove Driver</Link><Link to="/merchant">iMove Merchant</Link><Link to="/tai-ung-dung">{tx('Tải ứng dụng','Get the apps')}</Link></div><div className="footer-group"><h4>{tx('Hỗ trợ','Support')}</h4><Link to="/cham-soc-khach-hang">{tx('Chăm sóc khách hàng','Customer support')}</Link><Link to="/cham-soc-khach-hang#cau-hoi">{tx('Câu hỏi thường gặp','FAQ')}</Link><Link to="/privacy">{tx('Chính sách bảo mật','Privacy policy')}</Link><Link to="/terms">{tx('Điều khoản sử dụng','Terms of service')}</Link></div></div><div className="footer-bottom"><div className="container footer-bottom-inner"><span>© {new Date().getFullYear()} TH79 iMove. All rights reserved.</span><span>{tx('Được phát triển bởi TH79','Developed by TH79')} <Heart size={14} fill="currentColor"/></span><div className="footer-store"><StoreBadge platform="ios" compact onClick={()=>onDownload('user','ios')}/><StoreBadge platform="android" compact onClick={()=>onDownload('user','android')}/></div></div></div></footer>;
}
function HomePage({onDownload}){
  const [selectedRole,setSelectedRole]=useState('user');
  return <main><HomeHero onDownload={onDownload}/><Services/><Features/><Ecosystem selectedRole={selectedRole} setSelectedRole={setSelectedRole}/><Opportunity/><Steps home/><DownloadBanner onDownload={onDownload}/><FAQ/></main>;
}
function CityHero({role='user',isSelection=false,onDownload}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const r=localizedRole(role,language);
  const heroImage=isSelection ? 'selection-hero-cars.webp' : 'city-sunset.webp';
  const gradient=isSelection
    ? 'linear-gradient(90deg,rgba(25,2,9,.66) 0%,rgba(30,3,10,.46) 34%,rgba(30,3,10,.08) 60%,transparent 80%)'
    : 'linear-gradient(90deg,rgba(25,4,10,.92) 0%,rgba(32,5,12,.79) 34%,rgba(45,9,14,.18) 76%)';
  return <section className={`city-hero ${isSelection?'selection-hero':''}`} style={{backgroundImage:`${gradient},url("${A}${heroImage}")`}}>
    <div className="container city-hero-inner">
      <div className="city-copy">
        <span className="hero-eyebrow"><span className="hero-line"/>{isSelection?tx('MỘT ỨNG DỤNG PHÙ HỢP VỚI BẠN','THE RIGHT APP FOR YOU'):r.eyebrow}</span>
        <h1>{isSelection?<>{tx('Chọn vai trò của bạn.','Choose your role.')}<br/><em>{tx('Bắt đầu cùng iMove.','Get started with iMove.')}</em></>:<>{r.titleA}<br/><em>{r.titleB}</em></>}</h1>
        <p>{isSelection?tx('Dù đang di chuyển, cộng tác hay kinh doanh, hãy chọn ứng dụng phù hợp và khám phá trải nghiệm dành riêng cho bạn.','Whether you are a customer, driver or merchant, choose the iMove app that fits you.'):r.intro}</p>
        {!isSelection&&<StoreBadges role={role} onDownload={onDownload}/>}
        <div className="city-small-note"><Clock3 size={16}/><span>{isSelection?tx('Ứng dụng đang được chuẩn bị phát hành. Liên kết App Store và Google Play sẽ được cập nhật khi sẵn sàng.','Official App Store and Google Play links will appear when available.'):tx('Liên kết phát hành sẽ được cập nhật theo từng ứng dụng.','App download links will be added when released.')}</span></div>
      </div>
      {!isSelection&&<div className="city-phone"><div className="phone-halo"/><PhoneMockup role={role}/><span className="city-phone-label">TH79 iMove {r.short}<ArrowUpRight size={13}/></span></div>}
    </div>
  </section>;
}
function BenefitStrip({role}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en),r=localizedRole(role,language);
  return <div className="container benefit-overlap"><div className="benefit-board"><div className="benefit-title"><span>{tx("TRẢI NGHIỆM DÀNH CHO","BUILT FOR")} {roles[role].short.toUpperCase()}</span><h2>{tx("Riêng vai trò. Trọn trải nghiệm.","Your role. Your experience.")}</h2></div><div className="benefit-items">{r.benefits.map(({icon:Icon,title,text})=><div className="benefit" key={title}><div className="benefit-top"><span className="benefit-icon"><Icon size={23}/></span><strong>{title}</strong></div><p>{text}</p></div>)}</div></div></div>;
}
function RolePage({role,onDownload}) {
  const [selectedRole,setSelectedRole]=useState(role);
  useEffect(()=>setSelectedRole(role),[role]);
  return <main><CityHero role={role} onDownload={onDownload}/><BenefitStrip role={role}/><Steps role={role}/><Ecosystem selectedRole={selectedRole} setSelectedRole={setSelectedRole}/><DownloadBanner role={role} onDownload={onDownload}/><FAQ/></main>;
}
function AppCard({role,onDownload}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en),r=localizedRole(role,language);
  const {pathname,hash}=useLocation();
  const chosen=pathname==='/tai-ung-dung' && hash===`#app-${role}`;
  return <article id={`app-${role}`} className={`app-card app-card-${role}${chosen?' app-card-chosen':''}`} aria-label={`${r.label} – ${tx('Tải ứng dụng','Download the app')}`}><div className="app-card-header"><div className="app-square-icon app-square-logo"><img src={appLogoPath(role)} alt={`Logo ${r.label}`}/></div><div><h3>{r.label}</h3><p>{r.subtitle}</p></div></div><p className="app-card-desc">{r.cardDesc}</p>{chosen&&<p className="app-card-register-hint"><CheckCircle2 size={17}/>{tx(`Tải ${r.label} để bắt đầu đăng ký tài khoản trong ứng dụng.`,`Download ${r.label} to create your account in the app.`)}</p>}<StoreBadges role={role} onDownload={onDownload} compact/><div className="app-card-art"><div className="app-card-phone"><PhoneMockup role={role} small/></div><div className="app-card-qr"><img src={`${A}website-qr.png`} alt="Mã QR dẫn tới trang ứng dụng iMove"/><span>{tx('Quét để xem thông tin','Scan for details')}</span></div></div><Link to={`/${role}`} className="app-more">{tx('Tìm hiểu ứng dụng','Learn about the app')} <ArrowUpRight size={16}/></Link></article>;
}
function AppSelectionPage({onDownload}) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  return <main><CityHero isSelection onDownload={onDownload}/><section className="section app-selection-section"><div className="container"><SectionHead eyebrow={tx("CHỌN ỨNG DỤNG DÀNH CHO BẠN","CHOOSE YOUR iMOVE APP")} desc={tx("Mỗi vai trò một trải nghiệm, tất cả kết nối trong hệ sinh thái iMove.","Three roles, one connected ecosystem.")}>{tx("Một hệ sinh thái.","One ecosystem.")}<br/><em>{tx("Ba cách đồng hành.","Three ways to connect.")}</em></SectionHead><div className="app-cards-grid">{Object.keys(roles).map(key=><AppCard key={key} role={key} onDownload={onDownload}/>)}</div></div></section><FAQ/></main>;
}
/**
 * Ba trang đăng ký bước đầu. Chỉ POST đến endpoint HTTPS do chủ dự án cấu hình.
 * Không tự tạo tài khoản, không thực hiện OTP/KYC giả và không lưu hồ sơ trong trình duyệt.
 * Các API này phải do backend iMove triển khai thực sự trước khi mở nhận đăng ký.
 */
const REGISTRATION_ENDPOINTS = {
  user: import.meta.env.VITE_REGISTRATION_USER_URL || '',
  driver: import.meta.env.VITE_REGISTRATION_DRIVER_URL || '',
  merchant: import.meta.env.VITE_REGISTRATION_MERCHANT_URL || '',
};
const REGISTRATION_INFO = {
  user: {
    heading: 'Một tài khoản. Nhiều tiện ích.',
    description: 'Bắt đầu cùng iMove User để khám phá đặt xe, giao hàng, đặt món và mua hộ.',
    steps: ['Gửi thông tin liên hệ', 'Xác thực số điện thoại trên ứng dụng', 'Hoàn thiện tài khoản và trải nghiệm'],
    perks: ['Di chuyển và giao nhận', 'Theo dõi chuyến đi và đơn hàng', 'Kết nối cùng hệ sinh thái'],
  },
  driver: {
    heading: 'Đăng ký đối tác tài xế.',
    description: 'Bắt đầu hồ sơ dành cho đối tác tài xế, sau đó xác minh giấy tờ và phương tiện trong quy trình chính thức.',
    steps: ['Gửi thông tin ban đầu', 'Bổ sung hồ sơ và KYC theo hướng dẫn', 'Chờ phê duyệt trước khi hoạt động'],
    perks: ['Quản lý chuyến đi', 'Theo dõi điểm và hoạt động', 'Kết nối với nhu cầu di chuyển'],
  },
  merchant: {
    heading: 'Đưa cửa hàng lên iMove.',
    description: 'Giới thiệu cửa hàng của bạn và bắt đầu quy trình trở thành đối tác iMove Merchant.',
    steps: ['Gửi thông tin cửa hàng', 'Cung cấp hồ sơ kinh doanh theo hướng dẫn', 'Chờ xét duyệt và thiết lập sản phẩm'],
    perks: ['Tiếp cận khách hàng', 'Quản lý sản phẩm và đơn hàng', 'Kết nối giao nhận'],
  },
};
const REGISTRATION_INFO_EN={
  user:{heading:'One account. Everyday convenience.',description:'Start with iMove User to explore rides, delivery, food and shopping.',steps:['Submit contact information','Verify your phone in the official app','Complete your account'],perks:['Rides and deliveries','Trip and order tracking','Connected ecosystem']},
  driver:{heading:'Register as a driver partner.',description:'Prepare your driver information and finish document verification through the official flow.',steps:['Submit your initial details','Provide required documents and complete KYC','Wait for approval before accepting trips'],perks:['Manage rides','Track account activity','Connect with transport requests']},
  merchant:{heading:'Bring your store to iMove.',description:'Tell us about your store and start the Merchant onboarding process.',steps:['Submit store information','Provide required business documents','Wait for approval and list products'],perks:['Reach customers','Manage products and orders','Coordinate deliveries']},
};
const emptyRegistrationForm = { fullName: '', phone: '', email: '', city: '', vehicleType: '', shopName: '', shopType: '', consent: false };
function RegistrationPage({ role }) {
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const r = roles[role];
  const info = language==='en'?REGISTRATION_INFO_EN[role]:REGISTRATION_INFO[role];
  const endpoint = REGISTRATION_ENDPOINTS[role];
  const [form, setForm] = useState(emptyRegistrationForm);
  const [request, setRequest] = useState({state: 'idle', message: ''});
  const canSubmit = /^https:\/\//i.test(endpoint);
  const update = e => {
    const {name, value, type, checked} = e.target;
    setForm(current => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setRequest({state:'idle',message:''});
  };
  const submit = async e => {
    e.preventDefault();
    if (request.state === 'sending') return;
    if (!canSubmit) {
      setRequest({state:'error',message:'Chưa cấu hình API đăng ký chính thức. Không có thông tin nào được gửi đi.'});
      return;
    }
    if (!form.consent) {
      setRequest({state:'error',message:'Vui lòng xác nhận đồng ý được liên hệ về hồ sơ đăng ký.'});
      return;
    }
    const phone = form.phone.trim().replace(/[\s.-]/g,'');
    if (!/^(0\d{9}|\+84\d{9})$/.test(phone)) {
      setRequest({state:'error',message:'Vui lòng nhập số điện thoại Việt Nam hợp lệ.'});
      return;
    }
    const payload = {
      registrationType: role,
      fullName: form.fullName.trim(),
      phone,
      ...(form.email.trim() ? { email: form.email.trim() } : {}),
      ...(form.city.trim() ? { city: form.city.trim() } : {}),
      ...(role === 'driver' ? { vehicleType: form.vehicleType } : {}),
      ...(role === 'merchant' ? { shopName: form.shopName.trim(), shopType: form.shopType } : {}),
      consentToContact: true,
    };
    setRequest({state:'sending',message:'Đang gửi thông tin đăng ký…'});
    try {
      const response = await fetch(endpoint, {
        method: 'POST', headers: {'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setRequest({state:'success',message:'Hệ thống đã tiếp nhận thông tin. Vui lòng theo dõi hướng dẫn xác minh tiếp theo từ iMove.'});
      setForm(emptyRegistrationForm);
    } catch {
      setRequest({state:'error',message:'Chưa gửi được thông tin. Vui lòng kiểm tra kết nối hoặc thử lại sau.'});
    }
  };
  return <main className={`register-page register-${role}`}>
    <section className="register-hero">
      <div className="container register-hero-inner">
        <div className="register-intro">
          <span className="eyebrow">TH79 iMOVE / {tx('ĐĂNG KÝ TÀI KHOẢN','REGISTRATION')}</span>
          <h1>{tx('Đăng ký','Register')} <em>{r.label}.</em></h1>
          <h2>{info.heading}</h2>
          <p>{info.description}</p>
          <div className="register-switch" aria-label={tx('Chọn loại đăng ký','Choose registration type')}>
            {Object.values(roles).map(item => <NavLink key={item.key} to={`/dang-ky/${item.key}`} className={({isActive}) => `register-switch-link ${isActive?'active':''}`}><item.icon size={18}/>{item.short}</NavLink>)}
          </div>
        </div>
        <div className="register-icon-art" aria-hidden="true"><div className="register-icon-circle"><r.icon size={94} strokeWidth={1.3}/></div><div className="register-icon-outer"/></div>
      </div>
    </section>
    <section className="container register-content">
      <div className="register-detail">
        <span className="eyebrow">{tx('BẮT ĐẦU CÙNG','GET STARTED WITH')} {r.label.toUpperCase()}</span>
        <h2>{tx('Chỉ vài bước để','A few steps')}<br/><em>{tx('bắt đầu hành trình.','to get started.')}</em></h2>
        <div className="register-steps">{info.steps.map((step,i) => <div className="register-step" key={step}><span>{String(i+1).padStart(2,'0')}</span><p>{step}</p></div>)}</div>
        <div className="register-perks">{info.perks.map(perk => <div key={perk}><CheckCircle2 size={18}/>{perk}</div>)}</div>
        <div className="register-side-note"><ShieldCheck size={19}/><p>{tx('Form chỉ thu thập thông tin liên hệ ban đầu. OTP, KYC, xác thực tài khoản và xét duyệt phải thực hiện qua hệ thống iMove chính thức.','This form collects initial contact information only. OTP, identity verification and approvals must be handled through official iMove systems.')}</p></div>
      </div>
      <div className="register-form-shell">
        <span className="eyebrow">{tx('THÔNG TIN ĐĂNG KÝ','REGISTRATION DETAILS')}</span>
        <h2>{r.label}</h2>
        <p className="register-form-subtitle">{tx('Điền thông tin để bắt đầu tạo hồ sơ đối tác hoặc khách hàng.','Fill in your details to begin your application.')}</p>
        {!canSubmit && <div className="register-api-warning" role="status"><CircleHelp size={19}/><span>{tx('Chưa kết nối API đăng ký. Bạn có thể xem biểu mẫu, nhưng website chưa nhận hồ sơ thực tế.','Registration API is not connected. This form is currently a preview; no information can be submitted.')}</span></div>}
        <form onSubmit={submit} className="register-form">
          <label>{tx('Họ và tên','Full name')} <span>*</span><input name="fullName" value={form.fullName} onChange={update} required minLength={2} maxLength={100} autoComplete="name" placeholder={tx('Nhập họ và tên','Enter your full name')}/></label>
          <div className="register-form-row">
            <label>{tx('Số điện thoại','Phone number')} <span>*</span><input name="phone" type="tel" inputMode="tel" value={form.phone} onChange={update} required autoComplete="tel" placeholder="09xxxxxxxx" maxLength={18}/></label>
            <label>{tx('Email (không bắt buộc)','Email (optional)')}<input name="email" type="email" value={form.email} onChange={update} autoComplete="email" placeholder="email@example.com" maxLength={120}/></label>
          </div>
          <label>{tx('Tỉnh/Thành phố','Province / City')}<input name="city" value={form.city} onChange={update} maxLength={120} placeholder={tx('Khu vực hoạt động hoặc sinh sống','Your city or service area')}/></label>
          {role === 'driver' && <label>{tx('Loại phương tiện','Vehicle type')} <span>*</span><select name="vehicleType" value={form.vehicleType} onChange={update} required><option value="">{tx('Chọn loại phương tiện','Choose vehicle type')}</option><option value="motorbike">{tx('Xe máy','Motorbike')}</option><option value="car">{tx('Ô tô 4–7 chỗ','4–7 seat car')}</option><option value="mpv">MPV</option><option value="luxury">{tx('Xe cao cấp','Luxury car')}</option></select></label>}
          {role === 'merchant' && <><label>{tx('Tên cửa hàng','Store name')} <span>*</span><input name="shopName" value={form.shopName} onChange={update} required minLength={2} maxLength={120} placeholder={tx('Tên nhà hàng hoặc cửa hàng','Restaurant or store name')}/></label><label>{tx('Loại hình kinh doanh','Business category')} <span>*</span><select name="shopType" value={form.shopType} onChange={update} required><option value="">{tx('Chọn loại hình','Select category')}</option><option value="food">{tx('Nhà hàng / Ăn uống','Restaurant / Food')}</option><option value="grocery">{tx('Tạp hóa / Siêu thị','Grocery / Supermarket')}</option><option value="retail">{tx('Bán lẻ','Retail')}</option><option value="other">{tx('Khác','Other')}</option></select></label></>}
          <label className="register-consent"><input name="consent" type="checkbox" checked={form.consent} onChange={update} required/><span>{tx('Tôi đồng ý để TH79 iMove liên hệ về yêu cầu đăng ký này.','I agree to be contacted by TH79 iMove about this registration.')} <Link to="/privacy" target="_blank" rel="noreferrer">{tx('Xem chính sách bảo mật','Read privacy policy')}</Link>.</span></label>
          <button className="pill-btn register-submit" type="submit" disabled={!canSubmit || request.state==='sending'}>{request.state==='sending' ? tx('Đang gửi…','Submitting…') : tx('Gửi đăng ký','Submit registration')} <ArrowRight size={17}/></button>
          {request.message && <div role="status" className={`register-status register-status-${request.state}`}>{request.message}</div>}
          <p className="register-form-footnote">{tx('Chưa có API kết nối?','Not connected yet?')} <Link to="/tai-ung-dung">{tx('Xem các ứng dụng iMove','Explore iMove apps')} <ArrowUpRight size={14}/></Link></p>
        </form>
      </div>
    </section>
  </main>;
}
function LegalPage({type}){
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const privacy=type==='privacy';
  if(language==='en')return <main><section className="legal-top"><div className="container"><span className="eyebrow">• TH79 iMOVE · INFORMATION</span><h1>{privacy?'Privacy policy':'Terms of service'}</h1><p>This page is a content placeholder. Please publish the company's reviewed and approved legal documents before launch.</p></div></section><section className="container legal-content"><h2>{privacy?'Privacy and personal data':'Using iMove services'}</h2><p>This website introduces products and links to the iMove ecosystem. The information below is only a structural sample and is not an official policy or binding terms.</p><h3>1. Scope</h3><p>The official documents should clearly identify the provider, scope, covered users and effective date.</p><h3>2. User data</h3><p>The company should disclose collected data, purposes, retention periods, third parties and how users can exercise their rights.</p><h3>3. Contact and updates</h3><p>See the company's official information at <a href={CONTACT.website} target="_blank" rel="noreferrer">daututh79.com</a>. In production, connect this page to the official policy management service.</p><Link className="pill-btn" to="/">Back to homepage <ArrowRight size={15}/></Link></section></main>;
  return <main><section className="legal-top"><div className="container"><span className="eyebrow">• TH79 iMOVE · THÔNG TIN</span><h1>{privacy?tx('Chính sách bảo mật','Privacy policy'):tx('Điều khoản sử dụng','Terms of service')}</h1><p>Nội dung này là bố cục mẫu cho website giới thiệu. Vui lòng cập nhật bản chính thức đã được doanh nghiệp phê duyệt trước khi công bố.</p></div></section><section className="container legal-content"><h2>{privacy?'Thông tin và quyền riêng tư':'Sử dụng dịch vụ iMove'}</h2><p>Website giới thiệu sản phẩm và điều hướng tới các ứng dụng trong hệ sinh thái iMove. Các nội dung dưới đây chỉ có tính chất minh họa cấu trúc trang pháp lý, không thay thế chính sách và điều khoản được ban hành chính thức.</p><h3>1. Phạm vi áp dụng</h3><p>Chính sách và điều khoản chính thức cần xác định rõ chủ thể cung cấp dịch vụ, phạm vi áp dụng, đối tượng sử dụng và ngày có hiệu lực.</p><h3>2. Thông tin người dùng</h3><p>Doanh nghiệp cần công khai các nhóm dữ liệu thu thập, mục đích xử lý, thời hạn lưu trữ, các bên liên quan và cơ chế thực hiện quyền của người dùng.</p><h3>3. Liên hệ và cập nhật</h3><p>Vui lòng xem thông tin doanh nghiệp và kênh liên hệ chính thức trên <a href={CONTACT.website} target="_blank" rel="noreferrer">daututh79.com</a>. Khi triển khai thật, nên kết nối nội dung trang này với hệ thống quản trị điều khoản/chính sách.</p><Link className="pill-btn" to="/">Quay lại trang chủ <ArrowRight size={15}/></Link></section></main>;
}
function DownloadDialog({data,onClose}){
  const language=useLanguage(),tx=(vi,en)=>localText(language,vi,en);
  const r=roles[data.role]||roles.user;
  const name=data.platform==='ios'?'App Store':'Google Play';
  const closeRef=useRef(null);
  useEffect(()=>{closeRef.current?.focus();function esc(e){if(e.key==='Escape')onClose()}document.addEventListener('keydown',esc);document.body.style.overflow='hidden';return ()=>{document.removeEventListener('keydown',esc);document.body.style.overflow=''}},[onClose]);
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}} role="presentation"><div className="download-modal" role="dialog" aria-modal="true" aria-labelledby="modal-heading"><button className="modal-close" aria-label="Đóng" onClick={onClose} ref={closeRef}><X size={19}/></button><div className="modal-icon"><Smartphone size={28}/></div><span className="eyebrow">TH79 iMOVE · {tx('TẢI ỨNG DỤNG','GET THE APP')}</span><h2 id="modal-heading">{r.label}</h2><p>{tx('Liên kết tải ứng dụng trên','The official link on')} <strong>{name}</strong> {tx('đang chờ cập nhật.','is not available yet. When released')}.</p><div className="modal-qr"><img src={`${A}website-qr.png`} alt="Mã QR website ứng dụng"/><span>{tx('Quét mã để mở trang giới thiệu các ứng dụng.','Scan the code to open the app overview page.')}</span></div><div className="modal-actions"><Link className="pill-btn" to="/tai-ung-dung" onClick={onClose}>{tx('Xem các ứng dụng','Explore apps')} <ArrowRight size={16}/></Link><button className="ghost-btn" onClick={onClose}>{tx('Đóng','Close')}</button></div></div></div>;
}
function Toast({message}) {return <div className="toast-notice" role="status"><CircleHelp size={17}/>{message}</div>}
export default function App(){
  const [language,setLanguage]=useState(()=>{
    try { return localStorage.getItem('imove-language')==='en' ? 'en' : 'vi'; }
    catch { return 'vi'; }
  });
  useEffect(()=>{document.documentElement.lang=language;try{localStorage.setItem('imove-language',language)}catch{}},[language]);
  const [modal,setModal]=useState(null);
  const [toast,setToast]=useState('');
  const timeout=useRef(null);
  const showToast=(txt)=>{setToast(txt);clearTimeout(timeout.current);timeout.current=setTimeout(()=>setToast(''),3500)};
  const openDownload=(role,platform)=>{const url=APP_LINKS[role]?.[platform];if(url){window.open(url,'_blank','noopener,noreferrer')}else setModal({role,platform})};
  const onSocial=(name)=>{const url=name==='Facebook'?CONTACT.socialFacebook:CONTACT.socialTiktok;if(url)window.open(url,'_blank','noopener,noreferrer');else showToast(`Kênh ${name} chính thức đang được cập nhật.`)};
  return <LanguageContext.Provider value={language}><LanguageSetterContext.Provider value={setLanguage}><><ScrollBehavior/><NewHeader/><Routes><Route path="/" element={<HomePage onDownload={openDownload}/>}/><Route path="/tai-ung-dung" element={<AppSelectionPage onDownload={openDownload}/>}/><Route path="/user" element={<RolePage role="user" onDownload={openDownload}/>}/><Route path="/driver" element={<RolePage role="driver" onDownload={openDownload}/>}/><Route path="/merchant" element={<RolePage role="merchant" onDownload={openDownload}/>}/><Route path="/dang-ky/user" element={<Navigate to={appDownloadPath('user')} replace/>}/><Route path="/dang-ky/driver" element={<Navigate to={appDownloadPath('driver')} replace/>}/><Route path="/dang-ky/merchant" element={<Navigate to={appDownloadPath('merchant')} replace/>}/><Route path="/huong-dan/su-dung/user" element={<GuidePage kind="use" role="user"/>}/><Route path="/huong-dan/su-dung/driver" element={<GuidePage kind="use" role="driver"/>}/><Route path="/huong-dan/su-dung/merchant" element={<GuidePage kind="use" role="merchant"/>}/><Route path="/huong-dan/dang-ky/user" element={<GuidePage kind="register" role="user"/>}/><Route path="/huong-dan/dang-ky/driver" element={<GuidePage kind="register" role="driver"/>}/><Route path="/huong-dan/dang-ky/merchant" element={<GuidePage kind="register" role="merchant"/>}/><Route path="/tin-tuc" element={<NewsPage/>}/><Route path="/cham-soc-khach-hang" element={<SupportPage/>}/><Route path="/privacy" element={<LegalPage type="privacy"/>}/><Route path="/terms" element={<LegalPage type="terms"/>}/><Route path="*" element={<div className="not-found container"><h1>404</h1><h2>Không tìm thấy trang</h2><Link className="pill-btn" to="/">Về trang chủ <ArrowRight size={16}/></Link></div>}/></Routes><Footer onDownload={openDownload} onSocial={onSocial}/>{modal&&<DownloadDialog data={modal} onClose={()=>setModal(null)}/>} {toast&&<Toast message={toast}/>}</></LanguageSetterContext.Provider></LanguageContext.Provider>;
}
