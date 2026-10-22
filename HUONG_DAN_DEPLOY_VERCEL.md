# TRIỂN KHAI TH79 iMOVE TRÊN VERCEL — ĐÃ SỬA NEXT_NO_VERSION

## Vì sao lỗi?
Website được viết bằng **React + Vite**, không dùng Next.js. Bản ZIP cũ có hai lớp thư mục `imove_website/imove_website` và chứa `node_modules` của Windows. Nếu Vercel dùng preset Next.js hoặc root sai sẽ báo `[NEXT_NO_VERSION]`.

## Bản đã sửa
- Đã làm phẳng thư mục: **package.json nằm ngay thư mục gốc**.
- `vercel.json` khai báo preset **Vite**, build `npm run build`, output `dist`.
- Có quy tắc rewrite React Router giúp truy cập trực tiếp `/tai-ung-dung`, `/user`, `/driver`, `/merchant`, v.v.
- Không đóng gói `node_modules`; Vercel cài thư viện mới bằng `npm ci` cho đúng Linux.
- Không can thiệp giao diện hay logic website.

## Nếu triển khai lại bằng GitHub
1. Giải nén ZIP, đưa **các file trong thư mục** này lên **gốc repository** (không tạo thêm lớp thư mục imove_website).
2. Vercel → Project → **Settings → Build and Deployment**:
   - Framework Preset: **Vite** (KHÔNG dùng Next.js).
   - Root Directory: **`./`** (tức thư mục chứa `package.json`).
   - Build Command: `npm run build` (hoặc để Vercel đọc từ `vercel.json`).
   - Output Directory: `dist`.
   - Install Command: `npm ci`.
3. Nếu cài đặt cũ bị lưu, xóa override sai, lưu lại, vào Deployments → Redeploy, chọn **không dùng build cache** nếu vẫn còn lỗi.
4. Thử truy cập trực tiếp trang `/tai-ung-dung` và reload (không được 404).

## Nếu tạo Vercel Project mới
Import repository mới; Root Directory là thư mục đang có `package.json` và `vercel.json`. Framework: Vite. Deploy.

## Kiểm tra trên máy (Node.js 20+)
```powershell
npm ci
npm run build
npm run preview
```
Lệnh build phải tạo `dist/index.html`.

**Quan trọng:** Chỉ chỉnh `vercel.json` không giải quyết được Root Directory sai trong Dashboard nếu project vẫn trỏ đến một thư mục cha hoặc con. Hãy đặt đường dẫn Root Directory đúng `package.json`.
