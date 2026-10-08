# TH79 iMove

Website quảng cáo tiếng Việt cho hệ sinh thái TH79 iMove. Next.js App Router, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei và GSAP. Phông Be Vietnam Pro được phục vụ từ package nội bộ; mô hình 3D và hình minh họa được dựng trong mã nguồn, không cần tải model hoặc HDR bên ngoài.

## Mở website

Yêu cầu Node.js 22.18 trở lên để chạy cả kiểm tra TypeScript trực tiếp. Phiên triển khai hiện tại dùng Node.js 24. Trong PowerShell, dùng `npm.cmd` nếu chính sách hệ thống chặn `npm.ps1`.

```powershell
npm.cmd ci --cache .cache/npm
npm.cmd run dev
```

Mở http://127.0.0.1:3000. Nếu Next thông báo server đã chạy trong workspace, sử dụng URL của server đó. Thêm `-- --port 3001` để đổi cổng khi cần.

## Các trang

| Đường dẫn                | Nội dung                                                                         |
| ------------------------ | -------------------------------------------------------------------------------- |
| `/`                      | Hero 3D, dịch vụ, tính năng, tab hệ sinh thái, đối tác, hướng dẫn, ứng dụng, FAQ |
| `/gioi-thieu`            | Giới thiệu TH79 iMove                                                            |
| `/dich-vu`               | Các dịch vụ được định hướng cho hệ sinh thái                                     |
| `/tinh-nang`             | Giới thiệu tính năng                                                             |
| `/he-sinh-thai/user`     | Khách hàng                                                                       |
| `/he-sinh-thai/driver`   | Đối tác tài xế                                                                   |
| `/he-sinh-thai/merchant` | Đối tác cửa hàng                                                                 |
| `/tai-ung-dung`          | Ba ứng dụng và các nút iOS / Android riêng                                       |

## Design system và cấu trúc

`design-system/th79-imove/MASTER.md` lưu định hướng từ UI UX Pro Max. `src/app/globals.css` chứa token và layout; `src/app/quality.css` giới hạn kích thước icon trong mockup. `src/lib/content.ts` quản lý nội dung dịch vụ, tính năng, FAQ và vai trò. `src/components/hero` chứa mô hình, texture smartphone và scene; camera được GSAP ScrollTrigger điều khiển theo cuộn tự nhiên. Nút tạm dừng, `prefers-reduced-motion`, tab ẩn và vùng ngoài viewport dừng render liên tục. Khi WebGL không khả dụng hoặc mất context, SVG thay thế giữ nguyên nội dung website.

## Liên kết tải ứng dụng

Chưa có URL App Store / Google Play chính thức nào được xác minh đúng TH79 iMove. Các nút hiện mở hộp thông tin phát hành; chúng không chuyển sang cửa hàng hay ứng dụng khác. QR mở trang thông tin của đúng vai trò trên chính website này. QR dùng địa chỉ localhost chỉ hoạt động trên cùng máy xem trước.

Khi có URL chính thức, sửa `src/lib/downloads.ts`: điền đúng `audience`, `platform`, `url` và `verification` gồm vai trò, tên ứng dụng TH79 iMove, ngày xác minh và URL trang cửa hàng đã đối chiếu. `verification.source` phải trùng URL tải. Xác minh thủ công nhà phát hành và đúng ứng dụng trước khi thêm record; kiểm tra cú pháp trong code không thay thế bước xác minh danh tính. Các URL khác host, sai nền tảng, thiếu ID hoặc thiếu bằng chứng sẽ không được hiển thị như liên kết tải.

## Kiểm tra

```powershell
npm.cmd test
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run test:browser
npm.cmd run test:navigation
npm.cmd run test:quality
```

`test:browser` cần development server ở cổng 3000 và Google Chrome tại đường dẫn Windows trong `scripts/browser-check.mjs`. Có thể đổi URL bằng `TEST_BASE_URL`. Kiểm tra browser gồm canvas WebGL thật, frame render, camera cuộn, pause, giảm chuyển động, tabs/bàn phím, FAQ, menu di động, tất cả các trang, thông tin phát hành, QR, không tràn ngang tại 360–1440px, axe accessibility, fallback ban đầu và mất context khi đang chạy. Screenshot và báo cáo được lưu ở `artifacts/`, không đưa vào git.

`npm audit --omit=dev` không phát hiện lỗ hổng runtime tại thời điểm kiểm tra. Audit toàn bộ có 5 cảnh báo liên quan chuỗi dependency lint `eslint-config-next → fast-glob → micromatch → braces`; advisory GHSA-vfj7-8cjw-p6xm chưa có bản braces được vá. Không tự hạ Next.js hoặc lint xuống phiên bản cũ để làm sạch báo cáo. Chạy lại audit trước phát hành.

## Bản production để duyệt

```powershell
npm.cmd run build
npm.cmd run start -- --port 3001
```

Đây là chạy production **tại máy local**, không triển khai. Website hiện giới thiệu ý tưởng sản phẩm, không kết nối đặt chuyến, thanh toán hay backend. Nội dung dịch vụ/phạm vi hoạt động, tài sản nhận diện thương hiệu và liên kết ứng dụng cần chủ dự án duyệt trước khi xuất bản. Chưa xác minh tên miền, thông tin pháp nhân hay chính sách chính thức, nên không tự thêm dữ liệu giả. Không sửa các dự án iMove khác; không triển khai production trong phiên này.

## Phạm vi xác minh

`test:navigation` kiểm tra điều hướng logo/nút tải khi menu mobile mở, tám trang ở mobile/tablet/desktop/landscape, nội dung không lặp, axe trên từng trang và phục hồi qua trang 404. `test:quality` kiểm tra DPR 1 trên mobile mật độ cao và fallback khi WebGL bị từ chối.

Các script browser có thể dùng `CHROME_PATH` để chỉ định Chrome. Browser tests dùng Chrome headless với SwiftShader; đã xác minh render WebGL và tương tác, chưa đo hiệu suất trên GPU hoặc điện thoại thật. Kết quả axe tự động không phải chứng nhận accessibility.
