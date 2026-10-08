import type { Audience } from "./downloads";

export const navigation = [
  { label: "Về iMove", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Tính năng", href: "/tinh-nang" },
  { label: "Hệ sinh thái", href: "/#he-sinh-thai" },
];
export const services = [
  { id: "bike", number: "01", name: "iMove Bike", tag: "LINH HOẠT MỖI NGÀY", description: "Len qua phố đông, đến nơi bạn cần. Một lựa chọn gọn nhẹ cho những chuyến đi thường nhật.", icon: "bike" as const },
  { id: "car", number: "02", name: "iMove Car", tag: "THOẢI MÁI TRÊN MỌI CHẶNG", description: "Một không gian riêng cho hành trình của bạn. Từ cuộc hẹn gần nhà đến chuyến đi cùng người thân.", icon: "car" as const },
  { id: "delivery", number: "03", name: "iMove Delivery", tag: "KẾT NỐI NHỮNG ĐIỀU NHỎ", description: "Gửi món đồ, trao lời quan tâm. Kết nối nhu cầu giao nhận với đối tác trên cùng một nền tảng.", icon: "package" as const },
  { id: "food", number: "04", name: "iMove Food", tag: "BỮA NGON, NGAY GẦN BẠN", description: "Tìm một món ngon cho ngày bận rộn. Kết nối nhà hàng, quán ăn và đối tác giao nhận.", icon: "food" as const },
  { id: "shopping", number: "05", name: "iMove Mua hộ", tag: "THÊM THỜI GIAN CHO BẠN", description: "Những món đồ cần thiết, một kết nối thuận tiện. Khám phá trải nghiệm mua hộ trong hệ sinh thái.", icon: "shopping" as const },
];
export const audiences: Record<Audience, {
  label: string; subtitle: string; title: string; description: string;
  benefits: string[]; steps: string[]; accent: string;
}> = {
  user: {
    label: "User", subtitle: "Dành cho khách hàng", title: "Ngày của bạn,\nnhẹ nhàng hơn.",
    description: "Đi làm, gặp bạn bè hay gửi một món đồ. iMove kết nối những nhu cầu mỗi ngày trong một trải nghiệm liền mạch.",
    benefits: ["Chọn dịch vụ phù hợp với hành trình", "Theo dõi thông tin chuyến đi", "Kết nối với đối tác ngay trên ứng dụng"],
    steps: ["Chọn điểm đi và điểm đến", "Chọn dịch vụ phù hợp", "Kết nối đối tác và bắt đầu hành trình"], accent: "red",
  },
  driver: {
    label: "Driver", subtitle: "Dành cho đối tác tài xế", title: "Chủ động tay lái.\nMở thêm cơ hội.",
    description: "Ứng dụng riêng dành cho người cầm lái. Kết nối với khách hàng và sắp xếp hoạt động của bạn theo cách rõ ràng, thuận tiện.",
    benefits: ["Tiếp cận nhu cầu di chuyển và giao nhận", "Quản lý các chuyến đi trên ứng dụng", "Theo dõi hoạt động và lịch sử hành trình"],
    steps: ["Chuẩn bị thông tin và hồ sơ đối tác", "Đăng ký trên ứng dụng Driver khi mở", "Hoàn tất xác minh theo hướng dẫn"], accent: "green",
  },
  merchant: {
    label: "Merchant", subtitle: "Dành cho đối tác cửa hàng", title: "Cửa hàng của bạn.\nKết nối rộng hơn.",
    description: "Mang sản phẩm đến gần khách hàng hơn. iMove Merchant kết nối cửa hàng với người dùng và đối tác giao nhận trong cùng hệ sinh thái.",
    benefits: ["Giới thiệu cửa hàng và sản phẩm", "Sắp xếp thông tin đơn hàng", "Kết nối hoạt động giao nhận"],
    steps: ["Chuẩn bị thông tin cửa hàng", "Đăng ký trên ứng dụng Merchant khi mở", "Hoàn tất hồ sơ và thiết lập cửa hàng"], accent: "orange",
  },
};
export const features = [
  { icon: "route" as const, title: "Hành trình trong tầm tay", description: "Từ điểm đón đến điểm đến, thông tin hành trình được trình bày rõ ràng để bạn dễ theo dõi." },
  { icon: "smartphone" as const, title: "Đơn giản từ một chạm", description: "Chọn nhu cầu, kết nối đối tác và quản lý hoạt động ngay trên ứng dụng phù hợp với bạn." },
  { icon: "shield" as const, title: "Rõ ràng để an tâm", description: "Thông tin dịch vụ và đối tác giúp bạn chủ động hơn trước khi bắt đầu mỗi hành trình." },
  { icon: "network" as const, title: "Cùng nhau đi xa hơn", description: "Khách hàng, tài xế và cửa hàng cùng kết nối, cùng tạo nên giá trị trong hệ sinh thái TH79." },
];
export const faqs = [
  { question: "iMove dành cho những ai?", answer: "Hệ sinh thái iMove gồm ba nhóm: User dành cho khách hàng, Driver dành cho đối tác tài xế và Merchant dành cho đối tác cửa hàng. Mỗi nhóm có một ứng dụng riêng phù hợp với nhu cầu sử dụng." },
  { question: "Tôi có thể tải ứng dụng iMove ở đâu?", answer: "Truy cập trang Tải ứng dụng và chọn User, Driver hoặc Merchant. Hiện chưa có liên kết cửa hàng chính thức. Chạm App Store hoặc Google Play để xem thông tin phát hành; khi có liên kết được xác nhận, bạn có thể tải từ đúng cửa hàng." },
  { question: "Làm thế nào để tham gia với vai trò đối tác?", answer: "Xem trang Driver hoặc Merchant để tìm hiểu trải nghiệm dành cho đối tác. Khi ứng dụng chính thức có thể tải, hãy đăng ký và hoàn tất bước xác minh theo hướng dẫn trong ứng dụng." },
  { question: "Dịch vụ đã có ở khu vực của tôi chưa?", answer: "Phạm vi hoạt động và các dịch vụ khả dụng cần được kiểm tra trong ứng dụng chính thức khi phát hành. Website giới thiệu hệ sinh thái và không thực hiện đặt chuyến hay báo giá trực tiếp." },
];
