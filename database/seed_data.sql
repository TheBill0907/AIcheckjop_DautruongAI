-- ============================================================
-- AI CHECK JOB - ĐỒNG NAI: SEED DATA
-- Dữ liệu mẫu ban đầu nạp vào IndexedDB khi khởi tạo lần đầu
-- ============================================================

-- Hồ sơ người dùng mặc định
INSERT INTO user_profile (id, display_name, theme, gemini_api_key, ai_model)
VALUES (1, 'Bạn', 'dark', '', 'gemini-2.0-flash');

-- Dữ liệu mẫu lịch sử quét (3 bản ghi demo)
INSERT INTO scan_history (id, company_name, kcn, position, salary, contact, risk_score, risk_level, risk_label, risk_summary, key_flags, verification, scanned_at)
VALUES
('scan-demo-01', 'Tập đoàn Nestlé Đóng Gói Milo Online (Giả mạo)', 'Online / Tại nhà', 'CTV duyệt đơn online', '800k-1.2tr/ngày', 'Telegram: @nestle_milo_tuyendung', 94, 'danger', 'NGUY CƠ LỪA ĐẢO CỰC CAO', 'Mạo danh thương hiệu, yêu cầu nạp tiền nhiệm vụ, thu nhập phi lý', 'Bẫy nạp tiền,Thu nhập phi lý,Tuyển qua Telegram', 'TRÙNG KHỚP DANH SÁCH ĐEN', '2026-11-07 10:30:00'),
('scan-demo-02', 'Công ty TNHH Brother Machinery Vietnam', 'KCN Amata', 'KTV Vận hành Máy CNC', '9.5-12tr/tháng', '0251.3936888 / recruitment@brother.vn', 8, 'safe', 'AN TOÀN - CHÍNH THỐNG', 'Thông tin minh bạch, nộp trực tiếp tại cổng KCN, không thu phí', 'Minh bạch,Nộp tại cổng,Không thu phí', 'ĐÃ XÁC THỰC CHÍNH CHỦ', '2026-11-06 14:15:00'),
('scan-demo-03', 'Trung tâm Cung ứng Việc làm KCN Biên Hòa 2 (Giả)', 'KCN Biên Hòa 2', 'CN đóng gói linh kiện', '12tr/tháng', '0877.441.902', 82, 'danger', 'NGUY CƠ CAO - THU PHÍ BẤT CHÍNH', 'Thu tiền thẻ từ 350k, giữ CCCD gốc trái phép', 'Thu phí thẻ 350k,Giữ CCCD gốc', 'TRÙNG KHỚP DANH SÁCH ĐEN', '2026-11-05 09:45:00');

-- Dữ liệu mẫu báo cáo cộng đồng (4 bản ghi)
INSERT INTO community_reports (id, reporter_name, target_company, phone_reported, kcn, loss_amount, description, upvotes, status, reported_at)
VALUES
('rep-demo-01', 'Trần Minh T. (Biên Hòa)', 'Cty Tiếp vận Long Bình Tân (Giả Taekwang)', '0793.118.445', 'KCN Biên Hòa 2', '600.000 VNĐ', 'Hẹn nộp hồ sơ quán nước đối diện cổng 2, thu 350k thẻ từ + 250k áo. Hẹn thứ 2 đến cổng nhận việc, bảo vệ báo không có ai tên đó.', 38, 'ĐÃ XÁC THỰC LỪA ĐẢO', '2024-11-03'),
('rep-demo-02', 'Nguyễn Thị H. (Long Thành)', 'CTV Đóng Gói Túi Quà Nestlé Online', '0349.882.194', 'Online / Tại nhà', '3.250.000 VNĐ', 'Telegram bảo nạp cọc vật liệu. Lần 1 nạp 250k trả 320k. Lần 2 bảo nạp 3 triệu, nạp xong báo lỗi cú pháp bắt nạp thêm 6 triệu.', 54, 'ĐÃ XÁC THỰC LỪA ĐẢO', '2024-11-05'),
('rep-demo-03', 'Lê Văn D. (Nhơn Trạch)', 'Tuyển Phụ Xe Tải KCN Nhơn Trạch 1', '0766.529.110', 'KCN Nhơn Trạch 1', 'Mất CCCD gốc + 500k', 'Quảng cáo phụ xe 16 triệu, bắt nộp CCCD gốc. Thu thêm 500k bảo hiểm. Giờ đòi chuộc CCCD 2 triệu. Đã báo CA Nhơn Trạch.', 62, 'CẢNH BÁO NGUY CƠ CAO', '2024-10-29'),
('rep-demo-04', 'Phạm Hồng N. (Trảng Bom)', 'Xưởng Xâu Hạt Nhựa Bàu Xéo', '0908.431.290', 'KCN Bàu Xéo', '450.000 VNĐ', 'Chuyển cọc 450k tiền hàng nhận hạt về xâu chuỗi. Chờ cả tuần không gửi, gọi thì thuê bao, chặn Zalo.', 27, 'ĐÃ XÁC THỰC LỪA ĐẢO', '2024-11-01');
