/**
 * AI CHECK JOB - ĐỒNG NAI
 * Module Cơ Sở Dữ Liệu Client-Side: IndexedDB kết hợp LocalStorage Fallback
 * Quản lý 4 Object Stores: user_profile, scan_history, enterprises_db, community_reports
 */

const DB_NAME = 'AICheckJobDB';
const DB_VERSION = 1;

class AppDatabase {
  constructor() {
    this.db = null;
    this.isReady = false;
    this.initPromise = this.init();
  }

  async init() {
    return new Promise((resolve) => {
      if (!window.indexedDB) {
        console.warn('IndexedDB không hỗ trợ, sử dụng LocalStorage fallback.');
        this.isReady = true;
        resolve(false);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // 1. Store: user_profile
        if (!db.objectStoreNames.contains('user_profile')) {
          db.createObjectStore('user_profile', { keyPath: 'id' });
        }

        // 2. Store: scan_history
        if (!db.objectStoreNames.contains('scan_history')) {
          const scanStore = db.createObjectStore('scan_history', { keyPath: 'id' });
          scanStore.createIndex('risk_score', 'risk_score', { unique: false });
          scanStore.createIndex('scanned_at', 'scanned_at', { unique: false });
        }

        // 3. Store: enterprises_db
        if (!db.objectStoreNames.contains('enterprises_db')) {
          const entStore = db.createObjectStore('enterprises_db', { keyPath: 'id' });
          entStore.createIndex('kcn', 'kcn', { unique: false });
          entStore.createIndex('short_name', 'short_name', { unique: false });
        }

        // 4. Store: community_reports
        if (!db.objectStoreNames.contains('community_reports')) {
          const repStore = db.createObjectStore('community_reports', { keyPath: 'id' });
          repStore.createIndex('reported_at', 'reported_at', { unique: false });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        this.isReady = true;
        console.log('✅ IndexedDB AICheckJobDB kết nối thành công (v' + DB_VERSION + ')');
        await this.seedInitialData();
        resolve(true);
      };

      request.onerror = (event) => {
        console.error('Lỗi khởi tạo IndexedDB:', event.target.error);
        this.isReady = true;
        resolve(false);
      };
    });
  }

  // --- SEED DỮ LIỆU BAN ĐẦU NẾU TRỐNG ---
  async seedInitialData() {
    // 1. Hồ sơ người dùng
    const profile = await this.getUserProfile();
    if (!profile) {
      await this.saveUserProfile({
        id: 1,
        displayName: 'Bạn',
        theme: 'dark',
        geminiApiKey: '',
        aiModel: 'gemini-2.0-flash',
        createdAt: new Date().toISOString()
      });
    }

    // 2. Doanh nghiệp KCN Đồng Nai (từ JSON hoặc fallback)
    const entCount = await this.countItems('enterprises_db');
    if (entCount === 0) {
      const defaultEnterprises = [
        { id: 'ent-01', name: 'Công ty TNHH Changshin Việt Nam', short_name: 'Changshin VN', kcn: 'KCN Thạnh Phú', address: 'Xã Thạnh Phú, Vĩnh Cửu, Đồng Nai', tax_code: '3600257321', industry: 'Sản xuất giày thể thao (Nike)', workforce: 38000, hotline: '0251.3865201', email: 'recruitment@changshin.vn', website: 'changshin.vn', verified: true, note: 'Tuyển trực tiếp tại cổng. KHÔNG thu bất kỳ chi phí nào.' },
        { id: 'ent-02', name: 'Công ty CP Taekwang Vina Industrial', short_name: 'Taekwang Vina', kcn: 'KCN Biên Hòa 2', address: 'Số 8, Đường 9A, KCN Biên Hòa 2, Biên Hòa', tax_code: '3600256127', industry: 'Sản xuất giày thể thao (Nike)', workforce: 35000, hotline: '0251.3836431', email: 'hr@tkvina.com', website: 'taekwangvina.com', verified: true, note: 'Nộp hồ sơ tại Cổng số 1. Không ủy quyền cá nhân qua Zalo.' },
        { id: 'ent-03', name: 'Công ty TNHH Nestlé Việt Nam', short_name: 'Nestlé VN', kcn: 'KCN Amata', address: 'KCN Amata, P. Long Bình, Biên Hòa', tax_code: '3600235305', industry: 'Thực phẩm & Đồ uống (Milo, Nescafé)', workforce: 2500, hotline: '0251.3836699', email: 'tuyendung@nestle.com.vn', website: 'nestle.com.vn', verified: true, note: 'Thường bị mạo danh tuyển CTV chốt đơn Milo online. Chỉ tuyển qua kênh chính thức.' },
        { id: 'ent-04', name: 'Công ty TNHH Robert Bosch Việt Nam', short_name: 'Bosch VN', kcn: 'KCN Long Thành', address: 'Đường số 1, KCN Long Thành, Long Thành', tax_code: '3600898522', industry: 'Linh kiện ô tô (Dây đai truyền động CVT)', workforce: 4000, hotline: '0251.6258000', email: 'careers.rbvh@vn.bosch.com', website: 'bosch.com.vn', verified: true, note: 'Quy trình tuyển dụng chuyên nghiệp qua website Bosch Careers.' },
        { id: 'ent-05', name: 'Công ty CP Chăn nuôi C.P. Việt Nam', short_name: 'C.P. Việt Nam', kcn: 'KCN Biên Hòa 2', address: 'Số 2, Đường 2A, KCN Biên Hòa 2, Biên Hòa', tax_code: '3600224423', industry: 'Chế biến thực phẩm & chăn nuôi', workforce: 20000, hotline: '0251.3836251', email: 'tuyendung@cp.com.vn', website: 'cp.com.vn', verified: true, note: 'Trụ sở chính tại Đồng Nai. Không thu tiền đồng phục hay thẻ từ.' },
        { id: 'ent-06', name: 'Công ty TNHH Brother Machinery Vietnam', short_name: 'Brother VN', kcn: 'KCN Amata', address: 'Lô 112/1, KCN Amata, Long Bình, Biên Hòa', tax_code: '3600845612', industry: 'Sản xuất máy may công nghiệp & máy CNC', workforce: 1800, hotline: '0251.3936888', email: 'recruitment@brother.vn', website: 'brother.com.vn', verified: true, note: 'Nộp hồ sơ trực tiếp phòng bảo vệ Cổng KCN Amata hoặc email @brother.vn.' },
        { id: 'ent-07', name: 'Công ty TNHH Ajinomoto Việt Nam', short_name: 'Ajinomoto VN', kcn: 'KCN Biên Hòa 1', address: 'Đường số 9, KCN Biên Hòa 1, Biên Hòa', tax_code: '3600235383', industry: 'Gia vị & thực phẩm (Bột ngọt, hạt nêm)', workforce: 2000, hotline: '0251.3836101', email: 'hr@ajinomoto.com.vn', website: 'ajinomoto.com.vn', verified: true, note: 'Thông tin đăng tải trên fanpage tích xanh Ajinomoto Việt Nam Tuyển Dụng.' },
        { id: 'ent-08', name: 'Công ty TNHH Hyosung Đồng Nai', short_name: 'Hyosung VN', kcn: 'KCN Nhơn Trạch 5', address: 'Đường số 1, KCN Nhơn Trạch 5, Nhơn Trạch', tax_code: '3603278912', industry: 'Sợi lốp xe, Spandex, hóa chất', workforce: 7500, hotline: '0251.3569100', email: 'recruiting@hyosung.com', website: 'hyosungvietnam.com', verified: true, note: 'Tuyển dụng tập trung lớn tại Nhơn Trạch. Phỏng vấn trực tiếp tại văn phòng cty.' },
        { id: 'ent-09', name: 'Công ty TNHH Formosa Taffeta Đồng Nai', short_name: 'Formosa Đồng Nai', kcn: 'KCN Nhơn Trạch 3', address: 'KCN Nhơn Trạch 3, Nhơn Trạch', tax_code: '3600465219', industry: 'Dệt sợi tổng hợp kỹ thuật cao', workforce: 5000, hotline: '0251.3560300', email: 'hr@ftdn.com.vn', website: 'ftc.com.tw', verified: true, note: 'Chế độ đầy đủ. Không giữ giấy tờ tùy thân gốc của công nhân.' },
        { id: 'ent-10', name: 'Công ty TNHH SMC Manufacturing Việt Nam', short_name: 'SMC VN', kcn: 'KCN Long Đức', address: 'Lô C2, KCN Long Đức, Long Thành', tax_code: '3603348123', industry: 'Thiết bị tự động hóa khí nén Nhật Bản', workforce: 3000, hotline: '0251.3681100', email: 'smc-hr@smcvn.com.vn', website: 'smcvn.com.vn', verified: true, note: 'Môi trường hiện đại. Tuyển dụng chính thống qua cổng công ty.' },
        { id: 'ent-11', name: 'Công ty TNHH Pouchen Việt Nam', short_name: 'Pouchen VN', kcn: 'P. Hóa An, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa)', address: 'Nguyễn Ái Quốc, P. Hóa An, Biên Hòa', tax_code: '3600257120', industry: 'Sản xuất giày xuất khẩu', workforce: 15000, hotline: '0251.3951234', email: 'pouchen.hr@pouchen.vn', website: 'pouchen.com', verified: true, note: 'Một trong những nhà máy lớn nhất Biên Hòa. Nhận hồ sơ tại cổng 1.' },
        { id: 'ent-12', name: 'Công ty CP TKG Taekwang Mộc Bài (CN Đồng Nai)', short_name: 'Taekwang Giang Điền', kcn: 'KCN Giang Điền', address: 'Đường số 3, KCN Giang Điền, Trảng Bom', tax_code: '3900451299-002', industry: 'Kho bãi logistics & giày da', workforce: 2200, hotline: '0251.3678999', email: 'tuyendung.gd@tkvina.com', website: 'taekwangvina.com', verified: true, note: 'Nộp hồ sơ cổng bảo vệ KCN Giang Điền. Miễn phí 100% tuyển dụng.' }
      ];
      for (const item of defaultEnterprises) {
        await this.putItem('enterprises_db', item);
      }
    }

    // 3. Lịch sử mẫu ban đầu
    const historyCount = await this.countItems('scan_history');
    if (historyCount === 0) {
      const demoScans = [
        {
          id: 'scan-demo-01',
          company_name: 'Tập đoàn Nestlé Đóng Gói Milo Online (Giả mạo)',
          kcn: 'Online / Tại nhà',
          position: 'CTV duyệt đơn online',
          salary: '800k - 1.2tr/ngày',
          contact: 'Telegram: @nestle_milo_tuyendung',
          risk_score: 94,
          risk_level: 'danger',
          risk_label: 'NGUY CƠ LỪA ĐẢO CỰC CAO',
          risk_summary: 'Mạo danh thương hiệu lớn, lừa cọc nhiệm vụ chốt đơn hoa hồng tài chính.',
          key_flags: ['Bẫy nạp tiền làm nhiệm vụ', 'Thu nhập phi lý', 'Tuyển qua Telegram'],
          verification: 'TRÙNG KHỚP DANH SÁCH ĐEN',
          scanned_at: new Date(Date.now() - 3600000 * 3).toISOString()
        },
        {
          id: 'scan-demo-02',
          company_name: 'Công ty TNHH Brother Machinery Vietnam',
          kcn: 'KCN Amata',
          position: 'Kỹ thuật viên Vận hành Máy CNC',
          salary: '9.5 - 12 triệu/tháng',
          contact: '0251.3936888 / recruitment@brother.vn',
          risk_score: 8,
          risk_level: 'safe',
          risk_label: 'AN TOÀN - CHÍNH THỐNG',
          risk_summary: 'Doanh nghiệp FDI uy tín tại KCN Amata. Không thu phí, nộp hồ sơ tại cổng.',
          key_flags: ['Minh bạch', 'Nộp tại cổng KCN', 'Không thu phí'],
          verification: 'ĐÃ XÁC THỰC CHÍNH CHỦ',
          scanned_at: new Date(Date.now() - 3600000 * 20).toISOString()
        },
        {
          id: 'scan-demo-03',
          company_name: 'Trung tâm Cung ứng Lao động KCN Biên Hòa 2 (Giả)',
          kcn: 'KCN Biên Hòa 2',
          position: 'Công nhân đóng gói linh kiện',
          salary: '12 triệu/tháng',
          contact: '0877.441.902',
          risk_score: 82,
          risk_level: 'danger',
          risk_label: 'NGUY CƠ CAO - THU PHÍ BẤT CHÍNH',
          risk_summary: 'Hẹn quán nước đối diện cổng thu 350k tiền thẻ từ + 250k đồng phục và giữ CCCD gốc.',
          key_flags: ['Thu phí thẻ từ 350k', 'Giữ CCCD gốc trái phép'],
          verification: 'TRÙNG KHỚP DANH SÁCH ĐEN',
          scanned_at: new Date(Date.now() - 3600000 * 48).toISOString()
        }
      ];
      for (const scan of demoScans) {
        await this.putItem('scan_history', scan);
      }
    }

    // 4. Báo cáo cộng đồng mẫu
    const reportCount = await this.countItems('community_reports');
    if (reportCount === 0) {
      const demoReports = [
        {
          id: 'rep-01',
          reporter_name: 'Trần Minh T. (Phường Biên Hòa - địa chỉ cũ: TP. Biên Hòa)',
          target_company: 'Cty Tiếp vận Long Bình Tân (Giả mạo Taekwang)',
          phone_reported: '0793.118.445',
          kcn: 'KCN Biên Hòa 2',
          loss_amount: '600.000 VNĐ',
          description: 'Hẹn nộp hồ sơ ở quán nước đối diện cổng 2 KCN Biên Hòa 2. Thu 350k thẻ từ + 250k áo đồng phục, thứ 2 đến bảo vệ báo không có ai tên đó.',
          upvotes: 38,
          status: 'ĐÃ XÁC THỰC LỪA ĐẢO',
          reported_at: '2024-11-03'
        },
        {
          id: 'rep-02',
          reporter_name: 'Nguyễn Thị H. (Huyện Long Thành)',
          target_company: 'Tuyển CTV Đóng Gói Túi Quà Nestlé Online',
          phone_reported: '0349.882.194',
          kcn: 'Online / Tại nhà',
          loss_amount: '3.250.000 VNĐ',
          description: 'Nhắn qua Telegram bảo nạp tiền cọc nguyên liệu. Lần 1 nạp 250k trả 320k. Lần 2 bảo nạp 3 triệu, nạp xong báo lỗi cú pháp bắt nạp thêm 6 triệu.',
          upvotes: 54,
          status: 'ĐÃ XÁC THỰC LỪA ĐẢO',
          reported_at: '2024-11-05'
        },
        {
          id: 'rep-03',
          reporter_name: 'Lê Văn D. (Huyện Nhơn Trạch)',
          target_company: 'Tuyển Phụ Xe Tải KCN Nhơn Trạch 1',
          phone_reported: '0766.529.110',
          kcn: 'KCN Nhơn Trạch 1',
          loss_amount: 'Giữ mất CCCD gốc + 500k',
          description: 'Rao phụ xe lương 16 triệu, bắt nộp bản gốc CCCD. Thu thêm 500k bảo hiểm. Giờ không trả lại CCCD bắt chuộc 2 triệu.',
          upvotes: 62,
          status: 'CẢNH BÁO NGUY CƠ CAO',
          reported_at: '2024-10-29'
        }
      ];
      for (const rep of demoReports) {
        await this.putItem('community_reports', rep);
      }
    }
  }

  // --- GENERIC INDEXEDDB OPERATIONS ---
  async putItem(storeName, item) {
    if (this.db) {
      return new Promise((resolve, reject) => {
        try {
          const tx = this.db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          const req = store.put(item);
          req.onsuccess = () => resolve(item);
          req.onerror = () => reject(req.error);
        } catch (e) {
          reject(e);
        }
      });
    } else {
      // LocalStorage fallback
      const list = this.getLocalStorageList(storeName);
      const idx = list.findIndex(x => x.id === item.id);
      if (idx >= 0) list[idx] = item;
      else list.push(item);
      localStorage.setItem(`db_${storeName}`, JSON.stringify(list));
      return item;
    }
  }

  async getItem(storeName, id) {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const req = store.get(id);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } catch (e) {
          resolve(null);
        }
      });
    } else {
      const list = this.getLocalStorageList(storeName);
      return list.find(x => x.id === id) || null;
    }
  }

  async getAllItems(storeName) {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const req = store.getAll();
          req.onsuccess = () => resolve(req.result || []);
          req.onerror = () => resolve([]);
        } catch (e) {
          resolve([]);
        }
      });
    } else {
      return this.getLocalStorageList(storeName);
    }
  }

  async deleteItem(storeName, id) {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(storeName, 'readwrite');
          const store = tx.objectStore(storeName);
          const req = store.delete(id);
          req.onsuccess = () => resolve(true);
          req.onerror = () => resolve(false);
        } catch (e) {
          resolve(false);
        }
      });
    } else {
      let list = this.getLocalStorageList(storeName);
      list = list.filter(x => x.id !== id);
      localStorage.setItem(`db_${storeName}`, JSON.stringify(list));
      return true;
    }
  }

  async countItems(storeName) {
    if (this.db) {
      return new Promise((resolve) => {
        try {
          const tx = this.db.transaction(storeName, 'readonly');
          const store = tx.objectStore(storeName);
          const req = store.count();
          req.onsuccess = () => resolve(req.result || 0);
          req.onerror = () => resolve(0);
        } catch (e) {
          resolve(0);
        }
      });
    } else {
      return this.getLocalStorageList(storeName).length;
    }
  }

  getLocalStorageList(storeName) {
    try {
      const data = localStorage.getItem(`db_${storeName}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  // --- CÁC HÀM NGHIỆP VỤ (BUSINESS LOGIC API) ---

  // 1. Hồ sơ người dùng (User Profile)
  async getUserProfile() {
    await this.initPromise;
    const profile = await this.getItem('user_profile', 1);
    if (!profile) {
      // Đọc từ localStorage nếu có
      const legacyName = localStorage.getItem('user_display_name') || 'Bạn';
      return { id: 1, displayName: legacyName, theme: 'dark', geminiApiKey: '', aiModel: 'gemini-2.0-flash' };
    }
    return profile;
  }

  async saveUserProfile(profile) {
    await this.initPromise;
    const current = (await this.getUserProfile()) || {};
    const updated = { ...current, ...profile, id: 1, updatedAt: new Date().toISOString() };
    await this.putItem('user_profile', updated);
    localStorage.setItem('user_display_name', updated.displayName || 'Bạn');
    return updated;
  }

  // 2. Lịch sử quét (Scan History)
  async getScanHistory() {
    await this.initPromise;
    const list = await this.getAllItems('scan_history');
    return list.sort((a, b) => new Date(b.scanned_at || 0) - new Date(a.scanned_at || 0));
  }

  async saveScanResult(scan) {
    await this.initPromise;
    const newRecord = {
      id: scan.id || 'scan-' + Date.now(),
      company_name: scan.companyName || scan.company_name || 'Chưa rõ',
      kcn: scan.kcn || 'Chưa rõ',
      position: scan.position || 'Chưa rõ',
      salary: scan.salary || '',
      contact: scan.contact || '',
      raw_content: scan.rawContent || scan.raw_content || '',
      risk_score: scan.riskScore !== undefined ? scan.riskScore : (scan.risk_score || 0),
      risk_level: scan.riskLevel || scan.risk_level || 'safe',
      risk_label: scan.riskLabel || scan.risk_label || '',
      risk_summary: scan.riskSummary || scan.risk_summary || '',
      key_flags: scan.keyFlags || scan.key_flags || [],
      verification: scan.verification || scan.verificationStatus || '',
      matched_bl: scan.matchedBlacklist || scan.matched_bl || null,
      scanned_at: scan.scannedAt || scan.scanned_at || new Date().toISOString()
    };
    await this.putItem('scan_history', newRecord);
    return newRecord;
  }

  async deleteScanRecord(id) {
    await this.initPromise;
    return await this.deleteItem('scan_history', id);
  }

  async clearAllScans() {
    await this.initPromise;
    const scans = await this.getScanHistory();
    for (const s of scans) {
      await this.deleteItem('scan_history', s.id);
    }
    return true;
  }

  // 3. Doanh nghiệp KCN Đồng Nai
  async getEnterprises(query = '', kcn = 'all') {
    await this.initPromise;
    const all = await this.getAllItems('enterprises_db');
    return all.filter(c => {
      const q = (query || '').toLowerCase().trim();
      const matchQ = !q || c.name.toLowerCase().includes(q) ||
                           (c.short_name && c.short_name.toLowerCase().includes(q)) ||
                           (c.tax_code && c.tax_code.includes(q)) ||
                           (c.industry && c.industry.toLowerCase().includes(q));
      const matchKcn = kcn === 'all' || (c.kcn && c.kcn.includes(kcn));
      return matchQ && matchKcn;
    });
  }

  // 4. Báo cáo cộng đồng
  async getCommunityReports() {
    await this.initPromise;
    const list = await this.getAllItems('community_reports');
    return list.sort((a, b) => new Date(b.reported_at || 0) - new Date(a.reported_at || 0));
  }

  async addCommunityReport(report) {
    await this.initPromise;
    const item = {
      id: 'rep-' + Date.now(),
      reporter_name: report.reporterName || report.reporter_name || 'Người lao động Đồng Nai (Ẩn danh)',
      target_company: report.targetCompany || report.target_company,
      phone_reported: report.phoneReported || report.phone_reported || 'Chưa cung cấp',
      kcn: report.kcn || 'KCN Biên Hòa 2',
      loss_amount: report.lossAmount || report.loss_amount || 'Chưa xác định',
      description: report.description,
      upvotes: 1,
      status: 'ĐANG CHỜ XÁC MINH',
      reported_at: new Date().toISOString().slice(0, 10)
    };
    await this.putItem('community_reports', item);
    return item;
  }

  async upvoteReport(id) {
    await this.initPromise;
    const report = await this.getItem('community_reports', id);
    if (report) {
      report.upvotes = (report.upvotes || 0) + 1;
      await this.putItem('community_reports', report);
      return report.upvotes;
    }
    return null;
  }

  // 5. Xuất toàn bộ dữ liệu ra tệp JSON
  async exportFullDatabaseAsJSON() {
    await this.initPromise;
    const [profile, history, enterprises, reports] = await Promise.all([
      this.getUserProfile(),
      this.getScanHistory(),
      this.getAllItems('enterprises_db'),
      this.getCommunityReports()
    ]);

    const exportData = {
      app: 'AI CHECK JOB - ĐỒNG NAI',
      version: '2.5.0',
      database: 'IndexedDB (AICheckJobDB)',
      exportedAt: new Date().toISOString(),
      metadata: {
        totalScans: history.length,
        totalEnterprises: enterprises.length,
        totalCommunityReports: reports.length
      },
      data: {
        userProfile: profile,
        scanHistory: history,
        enterprises: enterprises,
        communityReports: reports
      }
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `AICheckJob_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    return exportData;
  }

  // 6. Kiểm tra trạng thái DB hiển thị trên UI
  getDbStatus() {
    return {
      connected: this.isReady,
      engine: this.db ? 'IndexedDB v1.0' : 'LocalStorage Mode',
      dbName: DB_NAME
    };
  }
}

// Khởi tạo Singleton Database toàn cục
window.AppDB = new AppDatabase();
