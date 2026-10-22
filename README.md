# TH79 iMove — Website giới thiệu ứng dụng

Mã nguồn **React + Vite** được dựng theo 6 ảnh tham khảo iMove. Hình ảnh hero, dịch vụ và mã QR được lưu tại `public/assets`, không cần tải ảnh từ máy chủ bên ngoài.

## Các trang có sẵn

- `/` — Trang chủ: hero 3D, dịch vụ (5 danh mục), tính năng, chọn vai trò User/Driver/Merchant, cơ hội đối tác, quy trình, tải ứng dụng, FAQ.
- `/tai-ung-dung` — Trang lựa chọn 3 ứng dụng.
- `/user` — Giới thiệu ứng dụng khách hàng.
- `/driver` — Giới thiệu ứng dụng tài xế.
- `/merchant` — Giới thiệu ứng dụng đối tác cửa hàng.
- `/privacy`, `/terms` — Bố cục trang chính sách/điều khoản **mẫu**, phải bổ sung nội dung được phê duyệt trước khi công bố.

## Chạy trên máy Windows / VS Code

Yêu cầu Node.js 20 trở lên.

```powershell
cd imove_website
npm install
npm run dev
```

Truy cập http://localhost:5173

## Build production

```powershell
npm run build
npm run preview
```

Thư mục thành phẩm là `dist/`. Có thể upload nội dung `dist/` lên VPS/Nginx hoặc BKHOST, hoặc đưa toàn bộ dự án lên Vercel (có `vercel.json`).

**Nginx:** dùng quy tắc `try_files $uri $uri/ /index.html` để các đường dẫn `/user`, `/merchant`, ... hoạt động khi tải trực tiếp. Có mẫu ở `nginx.conf.example`.

## Cấu hình quan trọng

Sửa `src/config.js`:

```js
export const APP_LINKS = {
  user: { ios: 'LINK_APP_STORE_USER', android: 'LINK_CH_PLAY_USER' },
  driver: { ios: 'LINK_APP_STORE_DRIVER', android: 'LINK_CH_PLAY_DRIVER' },
  merchant: { ios: 'LINK_APP_STORE_MERCHANT', android: 'LINK_CH_PLAY_MERCHANT' },
};
```

Chỉ điền URL chính thức đã phát hành. Nếu để trống, nút Store sẽ mở hộp thông báo rõ tình trạng, không chuyển sang link sai. Cập nhật thêm `CONTACT.socialFacebook` và `CONTACT.socialTiktok` nếu có trang chính thức.

QR hiện tại dẫn đến `https://imove.daututh79.com/tai-ung-dung`; nếu dùng domain khác, hãy thay `public/assets/website-qr.png` bằng QR thích hợp.

## Tùy chỉnh UI

- Toàn bộ bố cục, nội dung và các thao tác nằm ở `src/App.jsx`.
- Màu sắc/kiểu chữ/hiệu ứng/responsive nằm ở `src/styles.css`. Biến màu chính: `--red`.
- Ảnh tạo mẫu nằm trong `public/assets`: `hero-isometric.webp`, `city-sunset.webp`, `service-*.webp`.
- Font sử dụng Google Fonts (DM Sans + Playfair Display). Nếu khách truy cập không tải được font, giao diện sẽ dùng font hệ thống.
- FAQ mở/đóng, thẻ dịch vụ và 3 tab ứng dụng hoạt động phía client; không cần backend.

## Lưu ý trước khi triển khai thật

Website là **landing page frontend**, không phải hệ thống đặt xe/đăng ký tài xế hay quản lý đơn hàng. Các thao tác đặt đơn và tải app thực cần link phát hành hoặc API thực tế từ hệ thống TH79 iMove. Không có API nội bộ giả, không lưu dữ liệu người dùng. Các nội dung chính sách bảo mật và điều khoản ở đây chỉ là mẫu trình bày, không được dùng như văn bản pháp lý đã ban hành.
