-- ============================================================
-- AI CHECK JOB - ĐỒNG NAI: DATABASE SCHEMA
-- Cấu trúc tham chiếu cho cơ sở dữ liệu IndexedDB phía Client
-- Phiên bản: 2.5.0 | Cập nhật: 2026-11-07
-- ============================================================

-- Bảng 1: Hồ sơ Người dùng (Lưu tên gọi và tùy chọn cá nhân)
CREATE TABLE IF NOT EXISTS user_profile (
    id              INTEGER PRIMARY KEY DEFAULT 1,
    display_name    VARCHAR(100) DEFAULT 'Bạn',
    theme           VARCHAR(10)  DEFAULT 'dark',
    gemini_api_key  TEXT         DEFAULT '',
    ai_model        VARCHAR(50)  DEFAULT 'gemini-2.0-flash',
    created_at      DATETIME     DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 2: Lịch sử Quét tin tuyển dụng
CREATE TABLE IF NOT EXISTS scan_history (
    id              VARCHAR(30) PRIMARY KEY,
    company_name    VARCHAR(200) NOT NULL,
    kcn             VARCHAR(100),
    position        VARCHAR(200),
    salary          VARCHAR(100),
    contact         VARCHAR(200),
    raw_content     TEXT,
    risk_score      INTEGER      DEFAULT 0,
    risk_level      VARCHAR(20),
    risk_label      VARCHAR(100),
    risk_summary    TEXT,
    key_flags       TEXT,
    verification    VARCHAR(100),
    matched_bl      VARCHAR(200),
    scanned_at      DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- Bảng 3: Danh mục Doanh nghiệp KCN Đồng Nai (Dữ liệu tĩnh nạp từ JSON)
CREATE TABLE IF NOT EXISTS enterprises_db (
    id              VARCHAR(20)  PRIMARY KEY,
    name            VARCHAR(200) NOT NULL,
    short_name      VARCHAR(100),
    kcn             VARCHAR(100),
    address         VARCHAR(300),
    tax_code        VARCHAR(20),
    industry        VARCHAR(200),
    workforce       INTEGER      DEFAULT 0,
    hotline         VARCHAR(30),
    email           VARCHAR(100),
    website         VARCHAR(100),
    verified        BOOLEAN      DEFAULT TRUE,
    note            TEXT,
    keywords        TEXT
);

-- Bảng 4: Báo cáo Cộng đồng (Đóng góp từ người lao động)
CREATE TABLE IF NOT EXISTS community_reports (
    id              VARCHAR(30)  PRIMARY KEY,
    reporter_name   VARCHAR(100) DEFAULT 'Ẩn danh',
    target_company  VARCHAR(200) NOT NULL,
    phone_reported  VARCHAR(50),
    kcn             VARCHAR(100),
    loss_amount     VARCHAR(100),
    description     TEXT         NOT NULL,
    upvotes         INTEGER      DEFAULT 1,
    status          VARCHAR(50)  DEFAULT 'ĐANG CHỜ XÁC MINH',
    reported_at     DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- Index tăng tốc tra cứu
CREATE INDEX idx_scan_risk   ON scan_history(risk_score);
CREATE INDEX idx_scan_date   ON scan_history(scanned_at);
CREATE INDEX idx_ent_kcn     ON enterprises_db(kcn);
CREATE INDEX idx_ent_name    ON enterprises_db(short_name);
CREATE INDEX idx_report_date ON community_reports(reported_at);
