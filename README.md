# 🛡️ AI CHECK JOB - ĐỒNG NAI
### Trợ Lý AI Phát Hiện Tin Tuyển Dụng Lừa Đảo Tại Các Khu Công Nghiệp Tỉnh Đồng Nai
> **Dự án ứng dụng Web hiện đại, chuẩn PWA, chạy 100% trên trình duyệt với CSDL IndexedDB, phục vụ sinh viên, người lao động và công nhân tại Đồng Nai.**

---

## 🌟 ĐIỂM NỔI BẬT CỦA PHIÊN BẢN 2.5 (NÂNG CẤP & TINH CHỈNH)

1. **Trang Mở Đầu (Welcome Hero & Onboarding) Thoáng Đãng, Hiện Đại**:
   - Lời chào cá nhân hóa theo tên người dùng: *"Xin chào [Bạn]! Chào mừng đến với AI CHECK JOB Đồng Nai"* (cho phép bấm vào để đổi tên ngay, tự động lưu vào Database).
   - Giới thiệu súc tích dưới 2 dòng: Trợ lý AI giúp sinh viên, người lao động và công nhân kiểm tra độ an toàn của tin tuyển dụng chỉ trong 3 giây.
   - 3 Thẻ tính năng (Visual Cards) trực quan với Icon lớn + tiêu đề ngắn gọn (< 8 từ/thẻ).
   - Nút hành động chính (CTA) phát sáng nổi bật: **"Bắt Đầu Kiểm Tra Tin Tuyển Dụng Ngay"** -> cuộn mượt xuống khu vực kiểm tra.

2. **Làm Gọn Giao Diện 4 Bước & Sửa Triệt Để Lỗi Tải Ảnh Ở Bước 2**:
   - Loại bỏ toàn bộ câu chữ thừa, tăng khoảng trắng (whitespace) và sử dụng các thẻ Badge, Icon hiện đại.
   - **Khắc phục dứt điểm lỗi tải ảnh**: Gắn thẻ `<input type="file" id="ocrFileInput" accept="image/*" class="hidden">` và bắt sự kiện click chính xác trên cả vùng Drag & Drop lẫn nút *"Chọn tệp từ máy"*. Khi chọn ảnh, lập tức hiển thị Preview, thanh tiến trình OCR và tự động điền chữ vào ô bên phải.
   - 2 nút bấm mẫu ảnh chụp lừa đảo Zalo/Telegram hoạt động tức thì chỉ với 1 chạm.

3. **Hệ Thống Database Thực Thụ Cho Người Dùng (IndexedDB + LocalStorage)**:
   - File `src/db/database.js` quản lý cơ sở dữ liệu `AICheckJobDB` gồm 4 Object Stores:
     - `user_profile`: Lưu tên người dùng, theme, API key.
     - `scan_history`: Lưu nhật ký các lần quét an ninh.
     - `enterprises_db`: CSDL 12+ doanh nghiệp lớn tại KCN Biên Hòa 1, 2, Amata, Long Thành, Nhơn Trạch, Giang Điền...
     - `community_reports`: Danh sách các phản ánh, tố giác từ cộng đồng.
   - Huy hiệu trạng thái trên thanh điều hướng: `Database: Đã kết nối (IndexedDB v1.0)`.
   - Nút **"Tải xuống dữ liệu đã lưu (.json)"** giúp người dùng xuất toàn bộ cơ sở dữ liệu ra máy tính trong 1 giây.

4. **Cấu Trúc Đa Định Dạng File Chuẩn Công Nghiệp**:
   - Đầy đủ các file cấu hình `manifest.json` (PWA), `package.json`, `.gitignore`.
   - Cặp file SQL `database/schema.sql` và `database/seed_data.sql` chuẩn cơ sở dữ liệu quan hệ.
   - Dữ liệu tĩnh JSON chuẩn `data/kcn_dongnai.json` và `data/scam_keywords.json`.
   - Mã nguồn chia thư mục chuẩn `src/db`, `src/js`, `src/css`.

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN

```
c:\DauTruongAI\
├── index.html                   # Giao diện chính SPA tích hợp Welcome Hero & 4 Bước kiểm tra
├── manifest.json                # Cấu hình Progressive Web App (PWA) cài đặt lên Mobile/PC
├── package.json                 # Khai báo thông tin dự án, scripts & dependencies
├── .gitignore                   # Loại trừ file tạm, cache
├── README.md                    # Tài liệu hướng dẫn chi tiết dự án & cơ sở dữ liệu
│
├── assets/
│   └── icons/
│       ├── icon-192.png         # Icon PWA 192x192
│       └── icon-512.png         # Icon PWA 512x512
│
├── data/
│   ├── kcn_dongnai.json         # Danh bạ 15 KCN & 12+ doanh nghiệp trọng điểm Đồng Nai
│   └── scam_keywords.json       # Từ điển bẫy lừa đảo lao động & trọng số rủi ro
│
├── database/
│   ├── schema.sql               # Cấu trúc 4 bảng SQL tham chiếu
│   └── seed_data.sql            # Dữ liệu mẫu khởi tạo ban đầu cho Database
│
└── src/
    ├── css/
    │   └── styles.css           # Glassmorphism, animations, whitespace, print layout
    ├── db/
    │   └── database.js          # Hệ thống IndexedDB v1.0 + LocalStorage wrapper
    └── js/
        ├── ocr.js               # Trích xuất chữ từ ảnh chụp màn hình (Fix dứt điểm click file)
        ├── aiScanner.js         # Bộ phân tích Hybrid AI (Rule-based NLP + Gemini API)
        └── app.js               # Điều phối Welcome Hero, Stepper 4 bước & CSDL
```

---

## 🗄️ THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

Dự án áp dụng mô hình lưu trữ cục bộ bảo mật cao (Client-Side Storage), sử dụng **IndexedDB** (`AICheckJobDB`) với 4 Object Stores:

| Tên Bảng (Store) | Khóa Chính | Chỉ Mục (Indexes) | Mục Đích Lưu Trữ |
|---|---|---|---|
| `user_profile` | `id` (int) | - | Lưu tên người dùng, giao diện Sáng/Tối, Gemini API Key |
| `scan_history` | `id` (string) | `risk_score`, `scanned_at` | Lưu nhật ký tin đã quét, điểm rủi ro, thời gian quét |
| `enterprises_db` | `id` (string) | `kcn`, `short_name` | Danh bạ doanh nghiệp chính thức tại KCN Đồng Nai |
| `community_reports` | `id` (string) | `reported_at` | Báo cáo tố giác lừa đảo do người lao động đóng góp |

---

## 🚀 HƯỚNG DẪN KHỞI CHẠY & TRẢI NGHIỆM

1. **Khởi chạy tức thì**:
   - Nhấp đúp vào tệp [index.html](file:///c:/DauTruongAI/index.html) để mở trực tiếp trong bất kỳ trình duyệt nào (Chrome, Edge, Firefox, Safari).
   - Không cần cài đặt Node.js hay máy chủ backend phức tạp.

2. **Quy trình trải nghiệm 1 chạm**:
   - **Trang mở đầu**: Bấm vào chữ *"Bạn"* trên lời chào để nhập tên của bạn.
   - Bấm nút **"Bắt Đầu Kiểm Tra Tin Tuyển Dụng Ngay"** để cuộn mượt xuống Bước 1.
   - Tại **Bước 1**: Bấm vào nút *"Mẫu Lừa CTV Chốt Đơn"* hoặc *"Mẫu Thu Phí Thẻ KCN"* -> Form tự điền trong 0.1 giây. Bấm *"Lưu & Tiếp Tục Sang Bước 2"*.
   - Tại **Bước 2**:
     - Bấm vào khung tải ảnh hoặc nút *"Chọn tệp từ máy"* để kiểm tra hộp thoại chọn file của Windows mở ra ngay lập tức.
     - Hoặc bấm nút *"Mẫu 1: Tin nhắn Zalo thu phí thẻ KCN"* để nạp ảnh + chạy OCR đọc chữ tức thì!
     - Bấm *"Lưu & Phân Tích Bằng AI (Sang Bước 3)"*.
   - Tại **Bước 3**: Xem hiệu ứng radar quét 2 giây, đồng hồ đo điểm rủi ro (Risk Score), các cụm từ bẫy lừa đảo được tô đỏ và kết quả đối chiếu CSDL doanh nghiệp KCN Đồng Nai.
   - Tại **Bước 4**: Bấm *"Lưu Vào Database Lịch Sử"* hoặc *"Xuất Phiếu Cảnh Báo (PDF/In)"* để in phiếu cảnh báo an ninh chuẩn A4.
   - Trên thanh điều hướng trên cùng, bấm nút **"Tải xuống dữ liệu (.json)"** để sao lưu toàn bộ dữ liệu IndexedDB về máy tính.

---

## 📞 THÔNG TIN ĐƯỜNG DÂY NÓNG CƠ QUAN CHỨC NĂNG

- **Công an Thành phố Đồng Nai**:
  - Hotline: `0251.3685134`
- **Ban Quản lý các KCN Đồng Nai (DIZA)**:
  - Hotline: `0251.3892378`
- **Trung tâm Dịch vụ Việc làm Đồng Nai**:
  - Hotline: `0251.8823445`
