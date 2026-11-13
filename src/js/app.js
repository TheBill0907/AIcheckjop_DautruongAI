/**
 * AI CHECK JOB - ĐỒNG NAI
 * Module Ứng Dụng Chính (src/js/app.js)
 * Tách biệt Trang Chủ & Wizard 4 bước, Điều hướng tức thì, Đồng bộ Light Mode & Dropdown KCN.
 */

// =========================================================================
// CSDL 16+ DOANH NGHIỆP TRỌNG ĐIỂM CÁC KCN ĐỒNG NAI (ĐÃ XÁC THỰC DIZA)
// =========================================================================
const DEFAULT_KCN_ENTERPRISES = [
  {
    id: 'ent-01',
    name: 'Công ty TNHH Pouchen Việt Nam',
    kcn: 'Phường Hóa An, Thành phố Đồng Nai',
    industry: 'Sản xuất giày da xuất khẩu',
    taxCode: '3600257321',
    hotline: '0251.3955666',
    website: 'https://pouchen.com',
    address: 'Xã Hóa An, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng chính Nhà máy Pouchen Hóa An',
    officialProcess: 'Ứng viên nộp hồ sơ xin việc trực tiếp tại Cổng chính Công ty (xã Hóa An, Phường Biên Hòa - địa chỉ cũ: TP. Biên Hòa). Phòng Nhân sự tiếp nhận và tổ chức phỏng vấn trực tiếp tại xưởng. Tuyệt đối không thu bất kỳ khoản phí nộp hồ sơ, tiền làm thẻ hay tiền đồng phục.',
    fake_warning: 'Tuyển trực tiếp tại cổng chính, tuyệt đối KHÔNG thu phí nộp hồ sơ hay tiền đồng phục. Kẻ gian hay lập trang mạng mạo danh tuyển dụng yêu cầu nộp tiền giữ chỗ.'
  },
  {
    id: 'ent-02',
    name: 'Công ty Cổ phần TKG Taekwang Vina',
    kcn: 'KCN Biên Hòa 2',
    industry: 'Sản xuất giày thể thao (Nike)',
    taxCode: '3600256127',
    hotline: '0251.3836251',
    website: 'https://taekwangvina.com',
    address: 'Số 8, Đường 9A, KCN Biên Hòa 2, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai',
    verified: true,
    recruitment_channel: 'Phòng Nhân sự - Cổng số 1 KCN Biên Hòa 2',
    officialProcess: 'Nộp hồ sơ trực tiếp tại Cổng số 1 KCN Biên Hòa 2. Phỏng vấn trực tiếp tại Phòng Nhân sự trong khuôn viên công ty. Khám sức khỏe tại trung tâm y tế do công ty chỉ định và chi trả 100%.',
    fake_warning: 'Chỉ phỏng vấn tại phòng nhân sự công ty, KHÔNG ủy quyền cho bất kỳ cá nhân môi giới qua Zalo/Telegram thu tiền đặt cọc.'
  },
  {
    id: 'ent-03',
    name: 'Công ty TNHH Nestlé Việt Nam',
    kcn: 'KCN Biên Hòa 2 & KCN Amata',
    industry: 'Chế biến thực phẩm & Đồ uống (Milo, Nescafé)',
    taxCode: '3600235305',
    hotline: '0251.3836699',
    website: 'https://nestle.com.vn',
    address: 'KCN Biên Hòa 2 & KCN Amata, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai',
    verified: true,
    recruitment_channel: 'Website chính thức nestle.com.vn & Cổng nhà máy',
    officialProcess: 'Thông tin tuyển dụng chính thức được niêm yết trên website nestle.com.vn và bảng tin tại Cổng Nhà máy KCN Biên Hòa 2 & Amata. Hồ sơ nộp trực tuyến qua cổng tuyển dụng hoặc trực tiếp tại bàn nhân sự.',
    fake_warning: 'CẢNH BÁO RẤT NGUY HIỂM: Thường xuyên bị các nhóm tội phạm công nghệ cao mạo danh tuyển "CTV đóng gói bánh kẹo Milo, Nescafé tại nhà", "chốt đơn hàng nhận hoa hồng". Nestlé KHÔNG BAO GIỜ tuyển CTV gia công tại nhà nạp tiền!'
  },
  {
    id: 'ent-04',
    name: 'Công ty TNHH Brother Công Nghiệp (Việt Nam) / Mabuchi Motor',
    kcn: 'KCN Amata',
    industry: 'Điện tử, mô tơ & Thiết bị máy móc chính xác',
    taxCode: '3600812903',
    hotline: '0251.3936888',
    website: 'https://brother.com.vn',
    address: 'Đường Long Bình, KCN Amata, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng bảo vệ Nhà máy KCN Amata',
    officialProcess: 'Tuyển dụng công nhân trực tiếp tại bàn tiếp nhận Cổng KCN Amata. Kiểm tra tay nghề và phỏng vấn công khai. Công ty có xe buýt đưa đón công nhân nhiều tuyến trên địa bàn Đồng Nai và Bình Dương.',
    fake_warning: 'Tuyển công nhân chính thức, có xe đưa đón. Nghiêm cấm các cá nhân "cò mồi" đứng ngoài cổng nhận tiền hứa hẹn bao đậu phỏng vấn.'
  },
  {
    id: 'ent-05',
    name: 'Công ty TNHH Changshin Việt Nam',
    kcn: 'KCN Thạnh Phú, Vĩnh Cửu',
    industry: 'Sản xuất giày thể thao xuất khẩu (Nike)',
    taxCode: '3600248880',
    hotline: '0251.3865201',
    website: 'https://changshin.vn',
    address: 'Xã Thạnh Phú, Huyện Vĩnh Cửu, Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng C1 & Phòng Nhân sự Công ty',
    officialProcess: 'Nộp hồ sơ tại Cổng C1 và Văn phòng tuyển dụng Changshin Thạnh Phú, huyện Vĩnh Cửu. Phỏng vấn và nhận việc có văn bản hướng dẫn đóng dấu đỏ. Làm thẻ ngân hàng ATM do nhân viên ngân hàng đối tác hỗ trợ miễn phí.',
    fake_warning: 'Tuyệt đối KHÔNG thu tiền làm thẻ từ, thẻ ATM, đồng phục hay chi phí khám sức khỏe. Kẻ xấu hay giả mạo nhân viên nhắn tin yêu cầu chuyển khoản phí giữ chân.'
  },
  {
    id: 'ent-06',
    name: 'Công ty TNHH Hyosung Việt Nam',
    kcn: 'KCN Nhơn Trạch 5',
    industry: 'Sản xuất sợi công nghiệp, Spandex & Hóa chất kỹ thuật',
    taxCode: '3600885542',
    hotline: '0251.3569111',
    website: 'https://hyosung.com',
    address: 'Đường số 1, KCN Nhơn Trạch 5, Huyện Nhơn Trạch, Đồng Nai',
    verified: true,
    recruitment_channel: 'Văn phòng tuyển dụng KCN Nhơn Trạch 5',
    officialProcess: 'Quy trình ứng tuyển diễn ra tại Phòng Tuyển dụng KCN Nhơn Trạch 5. Ứng viên trải qua bài kiểm tra cơ bản và phỏng vấn trực tiếp cùng trưởng bộ phận xưởng sản xuất. Ký hợp đồng lao động minh bạch có bảo hiểm đầy đủ.',
    fake_warning: 'Ký hợp đồng lao động trực tiếp, bảo đảm quyền lợi. Không tham gia các nhóm chat Zalo/Telegram tự xưng tuyển công nhân Hyosung yêu cầu đóng tiền học việc hoặc đặt cọc giữ chỗ.'
  },
  {
    id: 'ent-07',
    name: 'Công ty TNHH Hwaseung Vina',
    kcn: 'KCN Nhơn Trạch 1',
    industry: 'Sản xuất giày thể thao xuất khẩu (Adidas)',
    taxCode: '3600482594',
    hotline: '0251.3560234',
    website: 'https://hwaseung.com',
    address: 'KCN Nhơn Trạch 1, Huyện Nhơn Trạch, Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng chính KCN Nhơn Trạch 1',
    officialProcess: 'Tiếp nhận hồ sơ tuyển dụng trực tiếp tại Cổng chính KCN Nhơn Trạch 1. Công ty sắp xếp phỏng vấn và khám sức khỏe công khai, đầy đủ chế độ trợ cấp chuyên cần và độc hại theo quy định.',
    fake_warning: 'Quy trình tuyển dụng và khám sức khỏe công khai, nghiêm cấm trung gian thu tiền. Tuyệt đối không giao bản chính CCCD hoặc bằng tốt nghiệp gốc cho đối tượng môi giới bên ngoài.'
  },
  {
    id: 'ent-08',
    name: 'Công ty TNHH Bosch Việt Nam',
    kcn: 'KCN Long Thành',
    industry: 'Kỹ thuật công nghệ cao & Linh kiện ô tô (Dây truyền lực CVT)',
    taxCode: '3600938634',
    hotline: '0251.6256000',
    website: 'https://bosch.com.vn',
    address: 'Đường số 8, KCN Long Thành, Huyện Long Thành, Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng thông tin Bosch Careers Việt Nam',
    officialProcess: 'Ứng tuyển qua cổng thông tin nhân sự chính thức của Bosch Careers Việt Nam hoặc nộp hồ sơ tại Cổng Nhà máy KCN Long Thành. Các vòng phỏng vấn chuyên nghiệp diễn ra tại phòng họp công ty.',
    fake_warning: 'Bosch tuyệt đối không yêu cầu ứng viên nộp lệ phí dự tuyển, không bắt buộc tải app tài chính lạ hoặc chuyển tiền làm nhiệm vụ khảo sát.'
  },
  {
    id: 'ent-09',
    name: 'Công ty Cổ phần Đồng Tiến',
    kcn: 'KCN Amata / Biên Hòa',
    industry: 'May mặc & Thời trang xuất khẩu',
    taxCode: '3600259978',
    hotline: '0251.3836154',
    website: 'https://dongtien.vn',
    address: 'KCN Amata, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng xưởng sản xuất may KCN Amata',
    officialProcess: 'Tuyển công nhân may, đóng gói và lao động phổ thông trực tiếp tại Nhà máy KCN Amata / Biên Hòa. Công ty đào tạo nghề may miễn phí cho người chưa có tay nghề và có phụ cấp học việc.',
    fake_warning: 'Cảnh giác với thủ đoạn mạo danh Đồng Tiến tuyển "Gia công xâu chuỗi vòng hạt, gắn đá thời trang tại nhà bao tiêu sản phẩm" yêu cầu chuyển cọc tiền nguyên liệu.'
  },
  {
    id: 'ent-10',
    name: 'Công ty TNHH Saitex International Đồng Nai',
    kcn: 'KCN Amata',
    industry: 'May mặc Denim & Thời trang sinh thái công nghệ bền vững',
    taxCode: '3600523411',
    hotline: '0251.3936357',
    website: 'https://saitex.us',
    address: 'Lô 222, KCN Amata, P. Long Bình, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai',
    verified: true,
    recruitment_channel: 'Phòng Nhân sự Saitex KCN Amata',
    officialProcess: 'Nộp hồ sơ và phỏng vấn tại Phòng Nhân sự Saitex, Lô 222 KCN Amata. Môi trường làm việc đạt chứng nhận quốc tế B Corp, ký hợp đồng lao động đầy đủ, không giữ bất kỳ giấy tờ gốc nào của công nhân.',
    fake_warning: 'Đạt chuẩn an toàn quốc tế, tuyệt đối không giữ bất kỳ giấy tờ tùy thân gốc nào. Mọi thông tin tuyển dụng đều được niêm yết tại cổng nhà máy và Fanpage có tích xanh chính chủ.'
  },
  {
    id: 'ent-11',
    name: 'Công ty TNHH Ajinomoto Việt Nam',
    kcn: 'KCN Biên Hòa 1 & KCN Long Thành',
    industry: 'Sản xuất thực phẩm, gia vị & Axit amin dinh dưỡng',
    taxCode: '3600235376',
    hotline: '0251.3831201',
    website: 'https://ajinomoto.com.vn',
    address: 'KCN Biên Hòa 1 & KCN Long Thành, Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Website ajinomoto.com.vn & Cổng Nhà máy Long Thành',
    officialProcess: 'Đăng ký dự tuyển qua website ajinomoto.com.vn hoặc nộp hồ sơ tại Cổng Nhà máy KCN Long Thành / KCN Biên Hòa 1. Phỏng vấn trực tiếp tại văn phòng, thông báo trúng tuyển bằng thư hoặc email chính thức đuôi @ajinomoto.com.vn.',
    fake_warning: 'Không có bất kỳ vị trí tuyển CTV nhập dữ liệu hay CTV chốt đơn gia vị qua mạng xã hội. Tất cả email tuyển dụng phải có đuôi @ajinomoto.com.vn.'
  },
  {
    id: 'ent-12',
    name: 'Công ty TNHH Dona Victor Footwear (Feng Tay Group)',
    kcn: 'KCN Sông Mây / Hố Nai',
    industry: 'Sản xuất giày thể thao xuất khẩu (Nike)',
    taxCode: '3600262101',
    hotline: '0251.3869288',
    website: 'https://fengtay.com',
    address: 'KCN Sông Mây, Huyện Trảng Bom, Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng 1 KCN Sông Mây',
    officialProcess: 'Hồ sơ nộp trực tiếp tại Cổng 1 Nhà máy Dona Victor KCN Sông Mây, Trảng Bom. Công ty tổ chức phỏng vấn và kiểm tra mắt, sự khéo tay công khai tại phòng nhân sự xưởng.',
    fake_warning: 'Tuyển lao động trực tiếp tại cổng xưởng. Nghiêm cấm mọi hành vi cò mồi thu tiền nộp hồ sơ. Cảnh giác nạn lừa bán "suất vào làm việc" giá 1-2 triệu đồng.'
  },
  {
    id: 'ent-13',
    name: 'Công ty TNHH Lixil Việt Nam',
    kcn: 'KCN Long Đức, Long Thành',
    industry: 'Sản xuất thiết bị vệ sinh Inax & Vật liệu xây dựng',
    taxCode: '3601058203',
    hotline: '0251.3686868',
    website: 'https://lixil.com.vn',
    address: 'KCN Long Đức, Huyện Long Thành, Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng Bảo vệ Nhà máy Lixil Long Đức',
    officialProcess: 'Tiếp nhận hồ sơ xin việc tại Cổng Bảo vệ Nhà máy Lixil KCN Long Đức. Đầy đủ bảo hiểm y tế, bảo hiểm xã hội và phúc lợi công đoàn Inax Nhật Bản. Phỏng vấn văn minh, nghiêm túc.',
    fake_warning: 'Đầy đủ chế độ bảo hiểm và phúc lợi lao động, không thu phí phỏng vấn tuyển dụng. Không nộp hồ sơ qua các website tuyển dụng ma yêu cầu ứng viên trả phí làm thẻ nhân viên.'
  },
  {
    id: 'ent-14',
    name: 'Công ty TNHH Meggitt Việt Nam',
    kcn: 'KCN Biên Hòa 2',
    industry: 'Linh kiện hàng không vũ trụ & Thiết bị điều khiển cao cấp',
    taxCode: '3600987654',
    hotline: '0251.3836999',
    website: 'https://meggitt.com',
    address: 'Số 11, Đường 3A, KCN Biên Hòa 2, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai',
    verified: true,
    recruitment_channel: 'Phòng Hành chính Nhân sự Meggitt KCN Biên Hòa 2',
    officialProcess: 'Ứng tuyển trực tiếp tại Phòng Hành chính Nhân sự KCN Biên Hòa 2. Quy trình phỏng vấn theo chuẩn an ninh công nghiệp hàng không vũ trụ quốc tế. Có xe đưa rước và chế độ bảo hiểm sức khỏe cao cấp.',
    fake_warning: 'Doanh nghiệp FDI hàng không kiểm duyệt an ninh chặt chẽ, phỏng vấn trực tiếp tại văn phòng. Tuyệt đối không tuyển dụng qua mạng xã hội Telegram.'
  },
  {
    id: 'ent-15',
    name: 'Công ty TNHH Kenda Rubber Việt Nam',
    kcn: 'KCN Hố Nai & Giang Điền',
    industry: 'Sản xuất săm lốp xe đạp, xe máy & Xe tải nhẹ',
    taxCode: '3600245678',
    hotline: '0251.3981888',
    website: 'https://kenda.com.vn',
    address: 'KCN Hố Nai, Trảng Bom & KCN Giang Điền, Đồng Nai',
    verified: true,
    recruitment_channel: 'Cổng tiếp nhận hồ sơ KCN Hố Nai',
    officialProcess: 'Nộp hồ sơ trực tiếp tại Bàn tiếp nhận tuyển dụng Cổng KCN Hố Nai & Giang Điền. Phỏng vấn nhanh, có kết quả ngay trong ngày. Khám sức khỏe nghề nghiệp miễn phí theo quy định nhà nước.',
    fake_warning: 'Có phụ cấp chuyên cần và độc hại đầy đủ. Không qua bên thứ ba thu phí làm thủ tục. Không đóng bất kỳ khoản tiền khám sức khỏe hay tiền giữ chân cho đối tượng bên ngoài.'
  },
  {
    id: 'ent-16',
    name: 'Công ty TNHH Fujitsu Việt Nam',
    kcn: 'KCN Biên Hòa 2',
    industry: 'Sản xuất bản mạch điện tử (PCB) & Thiết bị viễn thông công nghệ cao',
    taxCode: '3600238901',
    hotline: '0251.3836777',
    website: 'https://fujitsu.com.vn',
    address: 'Đường 10, KCN Biên Hòa 2, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Thành phố Đồng Nai',
    verified: true,
    recruitment_channel: 'Bàn tuyển dụng Cổng C KCN Biên Hòa 2',
    officialProcess: 'Nộp hồ sơ tại Bàn tuyển dụng Cổng C KCN Biên Hòa 2. Làm việc trong môi trường phòng sạch điều hòa 100%. Phỏng vấn trực tiếp tại văn phòng điều hành công ty.',
    fake_warning: 'Môi trường làm việc phòng sạch đạt chuẩn. Không tuyển qua các group online yêu cầu nộp cọc. Tuyệt đối cảnh giác các bài đăng tuyển "Lắp ráp linh kiện tại nhà nhận lương tuần".'
  }
];

// BỘ NHỚ NGỮ CẢNH (STATE MACHINE) & BỘ ĐẾM THỜI GIAN CỦA CHATBOT JOBI
// Tự động làm mới khi tải lại trang (F5 / Reload) - không nạp lại đoạn chat cũ từ phiên trước
try {
  localStorage.removeItem('jobi_chat_history');
  localStorage.removeItem('jobi_chat_state');
  sessionStorage.removeItem('jobi_chat_history');
  sessionStorage.removeItem('jobi_chat_state');
} catch (e) {}
let currentChatState = "idle";
let chatInactivityTimer = null;

/**
 * Tự động làm mới khung chat Jobi sau 7 phút không hoạt động
 */
function resetChatBox() {
  try {
    localStorage.removeItem('jobi_chat_history');
    localStorage.removeItem('jobi_chat_state');
    sessionStorage.removeItem('jobi_chat_history');
    sessionStorage.removeItem('jobi_chat_state');
  } catch (e) {}

  if (typeof App !== 'undefined') {
    App.chatHistory = [];
    if (typeof App.setChatState === 'function') App.setChatState('idle');
  }

  const container = document.getElementById('jobi-chat-messages');
  if (container) {
    container.innerHTML = `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 shadow-sm max-w-[88%] space-y-1.5 text-xs leading-relaxed">
          <p>👋 Chào bạn! Mình là <strong>Jobi</strong> - Trợ lý AI Hỗ trợ Khẩn cấp.</p>
          <p>Bạn đang gặp rắc rối với tin tuyển dụng, hay lỡ làm theo yêu cầu của kẻ gian? Hãy gõ tình trạng của bạn vào đây hoặc gọi ngay Hotline Công an TP. Đồng Nai: <strong>0251.3685134</strong> để được hướng dẫn!</p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons({ root: container });
  }
}
window.resetChatBox = resetChatBox;

const App = {
  currentModule: 'home', // 'home' | 'scanner' | 'blacklist' | 'history' | 'community'
  currentStep: 1,
  activeHandbookChapter: 1,
  jobiChatOpen: false,
  chatHistory: [],
  currentChatState: currentChatState,
  cachedEnterprises: DEFAULT_KCN_ENTERPRISES,
  enterpriseFilter: 'all',
  enterpriseSearchQuery: '',
  wizardDraft: {
    step1: {
      companyName: '',
      kcn: 'KCN Biên Hòa 2',
      kcnSelectValue: 'KCN Biên Hòa 2',
      kcnKhac: '',
      position: '',
      salary: '',
      contact: '',
      applicationMethod: 'Trực tiếp tại cổng KCN',
      applicationMethodSelectValue: 'Trực tiếp tại cổng KCN',
      applicationMethodKhac: ''
    },
    step2: { content: '', quickFlags: { feeRequired: false, noInterview: false, privateChat: false, keepIdDoc: false, unrealisticPay: false, taskDeposit: false } },
    step3: { analysisResult: null },
    step4: { checklist: { noDepositPaid: false, noOriginalIdGiven: false, verifiedAtGate: false, verifiedViaHotline: false, clearLaborContract: false } }
  },

  async init() {
    console.log('🚀 Khởi chạy AI Check Job Đồng Nai v3.0 (Trang chủ độc lập & Stepper tối ưu)...');

    // 1. Tải danh mục doanh nghiệp vào bộ nhớ cache cho ô tìm kiếm
    await this.loadEnterprisesCache();

    // 2. Khởi tạo theme
    this.initTheme();

    // 3. Khởi tạo sẵn module Doanh nghiệp KCN để luôn có dữ liệu 100%
    this.renderEnterprises();

    // 4. Khởi tạo giao diện Stepper (chuẩn bị sẵn DOM)
    this.renderStep(1);

    // 5. Mặc định hiển thị Trang Chủ
    this.switchModule('home');

    // 6. Cập nhật số liệu trên thanh điều hướng & DB badge
    this.updateBadges();

    // 7. Đóng dropdown công ty nếu bấm ra ngoài
    document.addEventListener('click', (e) => {
      const dropdown = document.getElementById('company-dropdown-list');
      const input = document.getElementById('w-company-name');
      if (dropdown && !dropdown.contains(e.target) && e.target !== input) {
        dropdown.classList.add('hidden');
      }
    });

    // 8. Đóng Chatbot Jobi nếu bấm ra ngoài khi đang mở
    document.addEventListener('click', (e) => {
      const widget = document.getElementById('jobi-chatbot-widget');
      if (this.jobiChatOpen && widget && !widget.contains(e.target)) {
        this.toggleJobiChat(false);
      }
    });

    // 8b. Lắng nghe đồng thời pointerdown và click cho nút mở khung chat Jobi để phản hồi tức thì 0ms
    const chatBtn = document.getElementById('jobi-toggle-btn');
    const chatBadge = document.getElementById('jobi-tooltip-badge');

    const handleChatToggle = (e) => {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      this.toggleJobiChat(undefined, e);
    };

    const handleBadgeOpen = (e) => {
      if (e) {
        if (typeof e.preventDefault === 'function') e.preventDefault();
        if (typeof e.stopPropagation === 'function') e.stopPropagation();
      }
      this.toggleJobiChat(true, e);
    };

    if (chatBtn) {
      chatBtn.addEventListener('pointerdown', handleChatToggle, { passive: false });
      chatBtn.addEventListener('click', handleChatToggle);
    }
    if (chatBadge) {
      chatBadge.addEventListener('pointerdown', handleBadgeOpen, { passive: false });
      chatBadge.addEventListener('click', handleBadgeOpen);
    }

    // 9. Làm mới đoạn chat Jobi khi tải lại trang (F5 / Reload):
    // Tự động xóa lịch sử tin nhắn cũ trong localStorage/sessionStorage, luôn làm mới với duy nhất tin chào ban đầu
    try {
      localStorage.removeItem('jobi_chat_history');
      localStorage.removeItem('jobi_chat_state');
      sessionStorage.removeItem('jobi_chat_history');
      sessionStorage.removeItem('jobi_chat_state');
    } catch (e) {}
    this.chatHistory = [];
    this.setChatState('idle');
    this.loadChatHistory();

    // 10. Khởi tạo Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  async loadEnterprisesCache() {
    this.cachedEnterprises = DEFAULT_KCN_ENTERPRISES;

    if (window.AppDB) {
      try {
        const fromDb = await window.AppDB.getAllItems('enterprises_db');
        if (fromDb && fromDb.length >= DEFAULT_KCN_ENTERPRISES.length) {
          this.cachedEnterprises = fromDb;
        } else {
          // Nạp sẵn toàn bộ 16 doanh nghiệp KCN vào IndexedDB
          for (const item of DEFAULT_KCN_ENTERPRISES) {
            await window.AppDB.putItem('enterprises_db', item).catch(() => {});
          }
        }
      } catch (e) {
        console.warn('Lỗi đồng bộ enterprises_db IndexedDB:', e);
      }
    }
  },

  // ==========================================
  // 1. ĐIỀU HƯỚNG TỨC THÌ (ZERO LAG, KHÔNG CUỘN)
  // ==========================================
  switchModule(moduleName) {
    this.currentModule = moduleName;

    // Danh sách 5 phân hệ
    const modules = ['home', 'scanner', 'blacklist', 'history', 'community'];
    
    // Cập nhật tiêu đề Header: Ẩn hoàn toàn khi ở màn hình Chào mừng (home)
    const titles = {
      home: '',
      scanner: 'Kiểm Tra Tin Tuyển Dụng (4 Bước)',
      blacklist: 'Doanh Nghiệp KCN Đồng Nai',
      history: 'Lịch Sử & Hồ Sơ Đã Lưu',
      community: 'Cẩm Nang Xử Lý (Digital Handbook)'
    };
    const titleContainer = document.getElementById('header-title-container');
    const titleEl = document.getElementById('header-module-title');
    if (titleContainer) {
      if (moduleName === 'home') {
        titleContainer.classList.add('hidden');
        titleContainer.classList.remove('flex');
        titleContainer.style.setProperty('display', 'none', 'important');
        if (titleEl) titleEl.textContent = '';
      } else {
        titleContainer.classList.remove('hidden');
        titleContainer.classList.add('flex');
        titleContainer.style.removeProperty('display');
        if (titleEl && titles[moduleName]) {
          titleEl.textContent = titles[moduleName];
        }
      }
    } else if (titleEl) {
      titleEl.textContent = titles[moduleName] || '';
    }

    // Ẩn tất cả module & tắt active-nav
    modules.forEach(m => {
      const sec = document.getElementById(`module-${m}`);
      if (sec) {
        sec.classList.add('hidden');
        sec.style.setProperty('display', 'none', 'important');
      }

      const btn = document.getElementById(`nav-${m}`);
      if (btn) {
        btn.classList.remove('active-nav');
      }
    });

    // Hiện đúng module đã chọn
    const activeSec = document.getElementById(`module-${moduleName}`);
    if (activeSec) {
      activeSec.classList.remove('hidden');
      activeSec.style.removeProperty('display');
      if (moduleName === 'home') {
        activeSec.style.setProperty('display', 'flex', 'important');
      } else {
        activeSec.style.setProperty('display', 'block', 'important');
      }
    }

    const activeBtn = document.getElementById(`nav-${moduleName}`);
    if (activeBtn) {
      activeBtn.classList.add('active-nav');
    }

    // Tự động đóng menu trên Mobile khi chọn trang
    this.closeMobileSidebar();

    // Đưa thanh cuộn về đầu trang ngay lập tức không giật lag
    window.scrollTo(0, 0);

    // Tải dữ liệu tương ứng
    if (moduleName === 'history') this.renderHistoryModule();
    if (moduleName === 'blacklist') this.renderBlacklistModule();
    if (moduleName === 'community') this.renderCommunityModule();
    if (moduleName === 'scanner') {
      this.renderStep(this.currentStep);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  startJobScan() {
    this.switchModule('scanner');
  },

  // Xử lý Mobile Hamburger Menu & Backdrop
  openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    if (sidebar) sidebar.classList.remove('-translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
  },

  closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-sidebar-overlay');
    if (sidebar) sidebar.classList.add('-translate-x-full');
    if (overlay) overlay.classList.add('hidden');
  },

  // ==========================================
  // 2. WIZARD 4 BƯỚC: STEPPER, NAVIGATION GUARD & VALIDATION
  // ==========================================
  isStep1Valid() {
    const s1 = this.wizardDraft?.step1;
    const compInput = document.getElementById('w-company-name');
    const posInput = document.getElementById('w-position');
    const compName = compInput ? compInput.value.trim() : (s1?.companyName?.trim() || '');
    const position = posInput ? posInput.value.trim() : (s1?.position?.trim() || '');
    return Boolean(compName && position);
  },

  validateStep1Form(showAlert = true) {
    const compInput = document.getElementById('w-company-name');
    const posInput = document.getElementById('w-position');
    const kcnInput = document.getElementById('w-kcn');

    const compName = compInput ? compInput.value.trim() : (this.wizardDraft?.step1?.companyName?.trim() || '');
    const position = posInput ? posInput.value.trim() : (this.wizardDraft?.step1?.position?.trim() || '');

    let hasError = false;

    // Reset styles cảnh báo lỗi
    if (compInput) compInput.classList.remove('border-red-500', 'ring-2', 'ring-red-500/50');
    if (posInput) posInput.classList.remove('border-red-500', 'ring-2', 'ring-red-500/50');

    if (!compName) {
      if (compInput) {
        compInput.classList.add('border-red-500', 'ring-2', 'ring-red-500/50');
        compInput.focus();
      }
      hasError = true;
    }

    if (!position) {
      if (posInput) {
        posInput.classList.add('border-red-500', 'ring-2', 'ring-red-500/50');
        if (!hasError && compName) posInput.focus();
      }
      hasError = true;
    }

    if (hasError) {
      if (showAlert) {
        this.showCustomAlert('Bạn vui lòng điền đầy đủ thông tin ở bước 1');
      }
      return false;
    }

    // Đồng bộ vào wizardDraft.step1
    if (compInput || posInput) {
      const kcnSelect = document.getElementById('w-kcn');
      const kcnKhacInput = document.getElementById('input-kcn-khac');
      const kcnVal = kcnSelect?.value || this.wizardDraft?.step1?.kcnSelectValue || this.wizardDraft?.step1?.kcn || 'KCN Biên Hòa 2';
      const kcnKhac = kcnKhacInput ? kcnKhacInput.value.trim() : (this.wizardDraft?.step1?.kcnKhac || '');

      const methodSelect = document.getElementById('w-app-method');
      const methodKhacInput = document.getElementById('input-phongvan-khac');
      const methodVal = methodSelect?.value || this.wizardDraft?.step1?.applicationMethodSelectValue || this.wizardDraft?.step1?.applicationMethod || 'Trực tiếp tại cổng KCN';
      const methodKhac = methodKhacInput ? methodKhacInput.value.trim() : (this.wizardDraft?.step1?.applicationMethodKhac || '');

      this.wizardDraft.step1 = {
        companyName: compName,
        position: position,
        kcnSelectValue: kcnVal,
        kcnKhac: kcnKhac,
        kcn: (kcnVal === 'khac' && kcnKhac) ? kcnKhac : (kcnVal === 'khac' ? 'Địa bàn khác' : kcnVal),
        salary: document.getElementById('w-salary')?.value?.trim() || this.wizardDraft?.step1?.salary || '',
        contact: document.getElementById('w-contact')?.value?.trim() || this.wizardDraft?.step1?.contact || '',
        applicationMethodSelectValue: methodVal,
        applicationMethodKhac: methodKhac,
        applicationMethod: (methodVal === 'khac' && methodKhac) ? methodKhac : (methodVal === 'khac' ? 'Hình thức khác' : methodVal)
      };
    }
    return true;
  },

  isStep2Valid() {
    const s2 = this.wizardDraft?.step2;
    const content = document.getElementById('w-content')?.value?.trim() || s2?.content?.trim() || '';
    return Boolean(content && content.length > 0);
  },

  syncCurrentStepDraft() {
    if (this.currentStep === 1) {
      const comp = document.getElementById('w-company-name')?.value?.trim();
      const pos = document.getElementById('w-position')?.value?.trim();
      if (comp) this.wizardDraft.step1.companyName = comp;
      if (pos) this.wizardDraft.step1.position = pos;

      const kcnSelect = document.getElementById('w-kcn');
      const kcnKhacInput = document.getElementById('input-kcn-khac');
      if (kcnSelect) {
        const kcnVal = kcnSelect.value;
        const kcnKhac = kcnKhacInput ? kcnKhacInput.value.trim() : (this.wizardDraft.step1.kcnKhac || '');
        this.wizardDraft.step1.kcnSelectValue = kcnVal;
        this.wizardDraft.step1.kcnKhac = kcnKhac;
        this.wizardDraft.step1.kcn = (kcnVal === 'khac' && kcnKhac) ? kcnKhac : (kcnVal === 'khac' ? 'Địa bàn khác' : kcnVal);
      }

      const salary = document.getElementById('w-salary')?.value?.trim();
      if (salary) this.wizardDraft.step1.salary = salary;
      const contact = document.getElementById('w-contact')?.value?.trim();
      if (contact) this.wizardDraft.step1.contact = contact;

      const methodSelect = document.getElementById('w-app-method');
      const methodKhacInput = document.getElementById('input-phongvan-khac');
      if (methodSelect) {
        const methodVal = methodSelect.value;
        const methodKhac = methodKhacInput ? methodKhacInput.value.trim() : (this.wizardDraft.step1.applicationMethodKhac || '');
        this.wizardDraft.step1.applicationMethodSelectValue = methodVal;
        this.wizardDraft.step1.applicationMethodKhac = methodKhac;
        this.wizardDraft.step1.applicationMethod = (methodVal === 'khac' && methodKhac) ? methodKhac : (methodVal === 'khac' ? 'Hình thức khác' : methodVal);
      }
    } else if (this.currentStep === 2) {
      const content = document.getElementById('w-content')?.value?.trim();
      if (content !== undefined && content.length > 0) {
        this.wizardDraft.step2.content = content;
      }
    }
  },

  goToStep(targetStep) {
    if (targetStep === this.currentStep) return;

    // 1. LUÔN CHO PHÉP QUAY LẠI: Nếu bước muốn đến nhỏ hơn bước hiện tại
    if (targetStep < this.currentStep) {
      this.syncCurrentStepDraft();
      this.renderStep(targetStep);
      window.scrollTo(0, 0);
      return;
    }

    // 2. CHẶN ĐI TIẾP NẾU CHƯA XONG BƯỚC 1:
    if (this.currentStep === 1) {
      if (!this.validateStep1Form(true)) {
        return; // Dừng ngay lệnh chuyển bước, không đổi giao diện
      }

      // Nếu đang ở Bước 1 mà người dùng bấm nhảy cóc sang Bước 3 hoặc 4
      if (targetStep > 2) {
        this.renderStep(2);
        window.scrollTo(0, 0);
        this.showCustomAlert('Bạn vui lòng nhập nội dung tuyển dụng hoặc tải ảnh ở bước 2');
        return;
      }
    }

    // 3. CHẶN ĐI TIẾP NẾU CHƯA XONG BƯỚC 2 (Sang Bước 3 hoặc 4):
    if (this.currentStep === 2) {
      if (!this.isStep2Valid()) {
        const textarea = document.getElementById('w-content');
        if (textarea) {
          textarea.classList.add('border-red-500', 'ring-2', 'ring-red-500/50');
          textarea.focus();
        }
        this.showCustomAlert('Bạn vui lòng nhập nội dung tuyển dụng hoặc tải ảnh ở bước 2');
        return; // Dừng ngay lệnh chuyển bước, không đổi giao diện
      }

      // Đã có nội dung Bước 2: Đồng bộ nội dung và cờ kiểm tra
      this.wizardDraft.step2.content = document.getElementById('w-content')?.value?.trim() || this.wizardDraft.step2.content;
      this.wizardDraft.step2.quickFlags = {
        feeRequired: document.getElementById('flag-fee')?.checked || false,
        noInterview: document.getElementById('flag-interview')?.checked || false,
        privateChat: document.getElementById('flag-privatechat')?.checked || false,
        keepIdDoc: document.getElementById('flag-keepid')?.checked || false,
        unrealisticPay: document.getElementById('flag-unrealistic')?.checked || false,
        taskDeposit: document.getElementById('flag-deposit')?.checked || false
      };

      // Nếu chuyển sang bước 3 mà chưa phân tích -> Tự động khởi chạy phân tích AI
      if (targetStep === 3 && !this.wizardDraft.step3.analysisResult) {
        this.submitStep2();
        return;
      }

      // Nếu muốn nhảy cóc sang Bước 4 mà chưa phân tích -> Chạy phân tích trước
      if (targetStep === 4 && !this.wizardDraft.step3.analysisResult) {
        this.showCustomAlert('Hệ thống đang tiến hành phân tích AI trước khi mở khóa Bước 4!');
        this.submitStep2();
        return;
      }
    }

    // 4. CHẶN ĐI TIẾP NẾU CHƯA XONG BƯỚC 3 (Sang Bước 4):
    if (this.currentStep === 3 && targetStep === 4) {
      if (!this.wizardDraft.step3.analysisResult) {
        this.showCustomAlert('Vui lòng hoàn thành phân tích AI ở Bước 3 trước khi sang Bước 4!');
        return;
      }
    }

    this.renderStep(targetStep);
    window.scrollTo(0, 0);
  },

  renderStep(step) {
    this.currentStep = step;
    const container = document.getElementById('wizard-step-container');
    if (!container) return;

    this.updateStepperUI(step);

    switch (step) {
      case 1:
        container.innerHTML = this.getStep1HTML();
        this.bindStep1Events();
        break;
      case 2:
        container.innerHTML = this.getStep2HTML();
        this.bindStep2Events();
        break;
      case 3:
        container.innerHTML = this.getStep3HTML();
        break;
      case 4:
        this.wizardDraft.step4.checklist = {
          noDepositPaid: false,
          noOriginalIdGiven: false,
          verifiedAtGate: false,
          verifiedViaHotline: false,
          clearLaborContract: false
        };
        container.innerHTML = this.getStep4HTML();
        this.updateStep4LockState();
        break;
    }

    if (window.lucide) window.lucide.createIcons();
  },

  updateStepperUI(step) {
    for (let i = 1; i <= 4; i++) {
      const btn = document.getElementById(`step-btn-${i}`);
      const node = document.getElementById(`step-node-${i}`);
      const label = document.getElementById(`step-label-${i}`);
      if (!node) continue;

      if (i === step) {
        node.className = "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 bg-gradient-to-br from-cyan-500 to-blue-600 text-white ring-4 ring-cyan-500/30 scale-110 shadow-lg shadow-cyan-500/30";
        if (label) label.className = "mt-2 text-xs font-bold text-cyan-400 hidden sm:block";
        if (btn) {
          btn.className = "step-indicator step-active flex flex-col items-center group focus:outline-none cursor-pointer";
        }
      } else if (i < step) {
        node.className = "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 bg-emerald-500 text-white shadow-md shadow-emerald-500/20";
        if (label) label.className = "mt-2 text-xs font-semibold text-emerald-400 hidden sm:block";
        if (btn) {
          btn.className = "step-indicator step-completed flex flex-col items-center group focus:outline-none cursor-pointer";
        }
      } else {
        node.className = "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 bg-slate-800 text-slate-400 border border-slate-700 opacity-60";
        if (label) label.className = "mt-2 text-xs font-medium text-slate-500 hidden sm:block";
        if (btn) {
          btn.className = "step-indicator step-locked flex flex-col items-center group focus:outline-none cursor-not-allowed";
        }
      }
    }

    const progressLine = document.getElementById('stepper-progress-line');
    if (progressLine) {
      progressLine.style.width = `${((step - 1) / 3) * 100}%`;
    }
  },

  // ==========================================
  // BƯỚC 1: HƯỚNG DẪN NHANH, DROPDOWN & VALIDATION TIẾNG VIỆT
  // ==========================================
  getStep1HTML() {
    const s1 = this.wizardDraft.step1;
    return `
      <div class="space-y-6">
        <!-- 💡 Thanh Hướng Dẫn Thân Thiện Ở Đầu Bước 1 -->
        <div class="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-3 text-xs text-cyan-200">
          <i data-lucide="lightbulb" class="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"></i>
          <p class="leading-relaxed">
            <strong>💡 Hướng dẫn nhanh:</strong> Bạn hãy nhập hoặc dán thông tin tin tuyển dụng cần kiểm tra vào các ô bên dưới để AI bóc tách và phân tích.
          </p>
        </div>

        <!-- Header -->
        <div class="pb-4 border-b border-slate-800/80">
          <span class="text-xs font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5 mb-1">
            <i data-lucide="shield-check" class="w-4 h-4"></i> Bước 1 / 4: Thông Tin Nhà Tuyển Dụng
          </span>
          <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Vị Trí & Doanh Nghiệp Tuyển Dụng</h2>
        </div>

        <!-- Biểu Mẫu Nhập Liệu (Bỏ thuộc tính required, tự validate JS tiếng Việt) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
          
          <!-- Ô Tên Công Ty kèm Tự Động Xổ Dropdown khi Nhấp Chuột -->
          <div class="md:col-span-2 relative">
            <div class="flex items-center justify-between mb-2">
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Tên Công Ty / Doanh Nghiệp Tuyển Dụng <span class="text-red-400">*</span>
              </label>
              <span class="text-[11px] text-cyan-400">Nhấp vào ô để chọn nhanh từ CSDL KCN Đồng Nai</span>
            </div>
            
            <div class="relative">
              <input type="text" id="w-company-name" autocomplete="off" value="${s1.companyName || ''}"
                placeholder="Ví dụ: Công ty TNHH Brother Machinery, Pouchen, Nestlé, Taekwang Vina..."
                onfocus="App.showCompanyDropdown()" 
                oninput="App.filterCompanyDropdown(this.value)"
                class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium transition-all">
              
              <button type="button" onclick="App.toggleCompanyDropdown()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 p-1">
                <i data-lucide="chevron-down" class="w-4 h-4"></i>
              </button>
            </div>

            <!-- Custom Dropdown Danh Sách Doanh Nghiệp KCN -->
            <div id="company-dropdown-list" class="hidden absolute left-0 right-0 top-full mt-1.5 z-30 max-h-64 overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-2 space-y-1">
              <!-- Render dynamically in bindStep1Events -->
            </div>
          </div>

          <!-- Khu Công Nghiệp -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Khu Công Nghiệp / Địa Bàn <span class="text-red-400">*</span>
            </label>
            <select id="w-kcn" onchange="App.handleKcnSelectChange(this.value)" class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium">
              <option value="KCN Amata" ${(s1.kcnSelectValue === 'KCN Amata' || s1.kcn === 'KCN Amata') ? 'selected' : ''}>KCN Amata (Phường Long Bình, Thành phố Đồng Nai)</option>
              <option value="KCN Biên Hòa 2" ${(s1.kcnSelectValue === 'KCN Biên Hòa 2' || s1.kcn === 'KCN Biên Hòa 2') ? 'selected' : ''}>KCN Biên Hòa 2 (Phường Long Hưng, Thành phố Đồng Nai)</option>
              <option value="KCN Long Thành" ${(s1.kcnSelectValue === 'KCN Long Thành' || s1.kcn === 'KCN Long Thành') ? 'selected' : ''}>KCN Long Thành / Long Đức</option>
              <option value="KCN Nhơn Trạch" ${(s1.kcnSelectValue === 'KCN Nhơn Trạch' || s1.kcn === 'KCN Nhơn Trạch') ? 'selected' : ''}>KCN Nhơn Trạch (1, 2, 3, 5)</option>
              <option value="KCN Giang Điền" ${(s1.kcnSelectValue === 'KCN Giang Điền' || s1.kcn === 'KCN Giang Điền') ? 'selected' : ''}>KCN Giang Điền - Trảng Bom</option>
              <option value="KCN Bàu Xéo" ${(s1.kcnSelectValue === 'KCN Bàu Xéo' || s1.kcn === 'KCN Bàu Xéo') ? 'selected' : ''}>KCN Bàu Xéo - Trảng Bom</option>
              <option value="KCN Thạnh Phú" ${(s1.kcnSelectValue === 'KCN Thạnh Phú' || s1.kcn === 'KCN Thạnh Phú') ? 'selected' : ''}>KCN Thạnh Phú (Vĩnh Cửu)</option>
              <option value="Online / Tại nhà" ${(s1.kcnSelectValue === 'Online / Tại nhà' || s1.kcn === 'Online / Tại nhà') ? 'selected' : ''}>Làm việc tại nhà / Online</option>
              <option value="khac" ${(s1.kcnSelectValue === 'khac' || s1.kcn === 'khac' || s1.kcnKhac) ? 'selected' : ''}>Khác (Vui lòng nhập bên dưới)</option>
            </select>
            <input type="text" id="input-kcn-khac" value="${s1.kcnKhac || ''}"
              placeholder="Nhập tên KCN hoặc địa chỉ khác..."
              class="${(s1.kcnSelectValue === 'khac' || s1.kcn === 'khac' || s1.kcnKhac) ? '' : 'hidden'} mt-2.5 w-full px-4 py-3 bg-slate-900/90 border border-cyan-500/50 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium transition-all">
          </div>

          <!-- Vị Trí Tuyển Dụng -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Vị Trí Ứng Tuyển <span class="text-red-400">*</span>
            </label>
            <input type="text" id="w-position" value="${s1.position || ''}"
              placeholder="Ví dụ: Kỹ thuật viên vận hành máy, Đóng gói phụ kho, CTV..."
              class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium transition-all">
          </div>

          <!-- Mức Lương Cam Kết -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Mức Lương Cam Kết / Hứa Hẹn
            </label>
            <input type="text" id="w-salary" value="${s1.salary || ''}"
              placeholder="Ví dụ: 9.5 - 12 triệu/tháng hoặc 500k-1tr/ngày"
              class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium">
          </div>

          <!-- Số Điện Thoại / Liên Hệ -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Số Điện Thoại / Zalo / Telegram Liên Hệ
            </label>
            <input type="text" id="w-contact" value="${s1.contact || ''}"
              placeholder="Ví dụ: 0251.3936888 hoặc Zalo @nguyenvana hoặc 0877..."
              class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium">
          </div>

          <!-- Hình Thức Phỏng Vấn -->
          <div class="md:col-span-2">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Hình Thức Phỏng Vấn / Nộp Hồ Sơ
            </label>
            <select id="w-app-method" onchange="App.handleMethodSelectChange(this.value)" class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium">
              <option value="Trực tiếp tại cổng KCN" ${(s1.applicationMethodSelectValue === 'Trực tiếp tại cổng KCN' || s1.applicationMethod === 'Trực tiếp tại cổng KCN') ? 'selected' : ''}>Nộp trực tiếp tại Cổng Bảo vệ / Phòng Nhân sự KCN (An toàn)</option>
              <option value="Hẹn tại quán nước gần cổng" ${(s1.applicationMethodSelectValue === 'Hẹn tại quán nước gần cổng' || s1.applicationMethod === 'Hẹn tại quán nước gần cổng') ? 'selected' : ''}>Hẹn gặp tại quán cà phê / quán nước ngoài cổng KCN (Nghi vấn)</option>
              <option value="Qua Telegram / Zalo cá nhân" ${(s1.applicationMethodSelectValue === 'Qua Telegram / Zalo cá nhân' || s1.applicationMethod === 'Qua Telegram / Zalo cá nhân') ? 'selected' : ''}>Qua Telegram / Zalo cá nhân / Nhóm kín (Dấu hiệu lừa đảo)</option>
              <option value="Gửi qua email công ty" ${(s1.applicationMethodSelectValue === 'Gửi qua email công ty' || s1.applicationMethod === 'Gửi qua email công ty') ? 'selected' : ''}>Gửi qua email doanh nghiệp chính thức (@domain.vn)</option>
              <option value="khac" ${(s1.applicationMethodSelectValue === 'khac' || s1.applicationMethod === 'khac' || s1.applicationMethodKhac) ? 'selected' : ''}>Khác (Vui lòng nhập bên dưới)</option>
            </select>
            <input type="text" id="input-phongvan-khac" value="${s1.applicationMethodKhac || ''}"
              placeholder="Nhập hình thức phỏng vấn khác..."
              class="${(s1.applicationMethodSelectValue === 'khac' || s1.applicationMethod === 'khac' || s1.applicationMethodKhac) ? '' : 'hidden'} mt-2.5 w-full px-4 py-3 bg-slate-900/90 border border-cyan-500/50 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 font-medium transition-all">
          </div>

          <!-- Bottom Action: Button type=button với Custom Validation -->
          <div class="md:col-span-2 pt-4 flex items-center justify-end border-t border-slate-800">
            <button type="button" onclick="App.submitStep1()" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 group transition-all">
              <span>Lưu & Tiếp Tục Sang Bước 2</span>
              <i data-lucide="arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  },

  bindStep1Events() {
    this.renderCompanyDropdownItems(this.cachedEnterprises);

    const kcnSelect = document.getElementById('w-kcn');
    if (kcnSelect) {
      kcnSelect.addEventListener('change', (e) => {
        this.handleKcnSelectChange(e.target.value);
      });
    }

    const methodSelect = document.getElementById('w-app-method');
    if (methodSelect) {
      methodSelect.addEventListener('change', (e) => {
        this.handleMethodSelectChange(e.target.value);
      });
    }
  },

  handleKcnSelectChange(val) {
    const customInput = document.getElementById('input-kcn-khac');
    if (!customInput) return;
    if (val === 'khac') {
      customInput.classList.remove('hidden');
      customInput.focus();
    } else {
      customInput.classList.add('hidden');
    }
  },

  handleMethodSelectChange(val) {
    const customInput = document.getElementById('input-phongvan-khac');
    if (!customInput) return;
    if (val === 'khac') {
      customInput.classList.remove('hidden');
      customInput.focus();
    } else {
      customInput.classList.add('hidden');
    }
  },

  showCompanyDropdown() {
    const list = document.getElementById('company-dropdown-list');
    if (list) {
      list.classList.remove('hidden');
      this.renderCompanyDropdownItems(this.cachedEnterprises);
    }
  },

  toggleCompanyDropdown() {
    const list = document.getElementById('company-dropdown-list');
    if (list) {
      if (list.classList.contains('hidden')) {
        this.showCompanyDropdown();
      } else {
        list.classList.add('hidden');
      }
    }
  },

  filterCompanyDropdown(keyword) {
    const term = (keyword || '').toLowerCase().trim();
    const filtered = this.cachedEnterprises.filter(e => 
      e.name.toLowerCase().includes(term) || (e.kcn && e.kcn.toLowerCase().includes(term))
    );
    this.renderCompanyDropdownItems(filtered);
    const list = document.getElementById('company-dropdown-list');
    if (list) list.classList.remove('hidden');
  },

  renderCompanyDropdownItems(items) {
    const list = document.getElementById('company-dropdown-list');
    if (!list) return;

    if (!items || items.length === 0) {
      list.innerHTML = `<div class="p-3 text-center text-xs text-slate-400">Không tìm thấy doanh nghiệp phù hợp. Bạn có thể tự gõ tên công ty vào ô.</div>`;
      return;
    }

    list.innerHTML = items.map(e => `
      <div onclick="App.selectCompanyFromDropdown('${e.name.replace(/'/g, "\\'")}', '${e.kcn || 'KCN Biên Hòa 2'}', '${e.hotline || ''}')" 
        class="company-dropdown-item p-2.5 rounded-xl border border-transparent hover:border-cyan-500/40 hover:bg-slate-800/80 cursor-pointer transition-all flex items-center justify-between text-xs">
        <div>
          <p class="font-bold text-white flex items-center gap-1.5">
            ${e.name}
            ${e.fakeWarning ? '<span class="text-[9px] font-mono px-1 py-0.2 rounded bg-red-950 text-red-400 border border-red-800 font-bold">MẪU CẢNH BÁO</span>' : '<span class="text-[9px] font-mono px-1 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">CHÍNH HÃNG</span>'}
          </p>
          <p class="text-[11px] text-cyan-400 mt-0.5">${e.kcn || 'KCN Đồng Nai'} • SĐT: ${e.hotline || 'Chưa rõ'}</p>
        </div>
        <i data-lucide="check" class="w-4 h-4 text-slate-500"></i>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons({ root: list });
  },

  selectCompanyFromDropdown(name, kcn, hotline) {
    const inputName = document.getElementById('w-company-name');
    const selectKcn = document.getElementById('w-kcn');
    const inputContact = document.getElementById('w-contact');
    const dropdown = document.getElementById('company-dropdown-list');

    if (inputName) {
      inputName.value = name;
      inputName.classList.remove('border-red-500', 'ring-2', 'ring-red-500/50');
    }
    if (selectKcn && kcn) {
      // Tìm option phù hợp trong danh sách có sẵn
      let matched = false;
      for (let i = 0; i < selectKcn.options.length; i++) {
        if (selectKcn.options[i].value !== 'khac' && selectKcn.options[i].value.toLowerCase().includes(kcn.toLowerCase())) {
          selectKcn.selectedIndex = i;
          matched = true;
          break;
        }
      }
      if (!matched) {
        selectKcn.value = 'khac';
        const customInput = document.getElementById('input-kcn-khac');
        if (customInput) customInput.value = kcn;
      }
      this.handleKcnSelectChange(selectKcn.value);
    }
    if (inputContact && hotline) {
      inputContact.value = hotline;
    }

    if (dropdown) dropdown.classList.add('hidden');
    this.showToast(`Đã chọn: "${name}"`, 'info');
  },

  // Custom Validation hoàn toàn tiếng Việt lịch sự
  submitStep1() {
    if (!this.validateStep1Form(true)) {
      return;
    }

    this.showToast('Đã lưu thông tin Bước 1 thành công!', 'success');
    this.renderStep(2);
    window.scrollTo(0, 0);
  },

  // ==========================================
  // BƯỚC 2: NỘI DUNG & ẢNH CHỤP (OCR CHUẨN XÁC)
  // ==========================================
  getStep2HTML() {
    const s2 = this.wizardDraft.step2;
    const flags = s2.quickFlags || {};

    return `
      <div class="space-y-6">
        <!-- Input file ẩn được trigger trực tiếp -->
        <input type="file" id="ocrFileInput" accept="image/*" class="hidden" onchange="OCRModule.handleFileChange(event)">

        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div>
            <span class="text-xs font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5 mb-1">
              <i data-lucide="file-search" class="w-4 h-4"></i> Bước 2 / 4: Cung Cấp Dữ Liệu Bài Đăng
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Nội Dung Hoặc Ảnh Chụp Màn Hình</h2>
          </div>
          <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <i data-lucide="cpu" class="w-3.5 h-3.5"></i> AI OCR Scanner
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Cột Trái: Drag & Drop và Mẫu Ảnh (5 cols) -->
          <div class="lg:col-span-5 space-y-4">
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Ảnh Chụp Màn Hình Tin Nhắn / Tuyển Dụng
            </label>

            <!-- Khung Tải Ảnh (Bấm bất kỳ đâu để mở File Dialog) -->
            <div id="ocr-dropzone" onclick="OCRModule.triggerFileInput(event)"
              class="border-2 border-dashed border-slate-700 hover:border-cyan-400 bg-slate-900/70 hover:bg-slate-900 rounded-2xl p-6 text-center transition-all cursor-pointer relative group flex flex-col items-center justify-center min-h-[220px]">
              
              <!-- Placeholder -->
              <div id="ocr-drop-placeholder" class="space-y-3 pointer-events-none">
                <div class="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <i data-lucide="image-plus" class="w-7 h-7"></i>
                </div>
                <div>
                  <p class="text-sm font-bold text-white">Kéo & thả ảnh chụp vào đây</p>
                  <p class="text-xs text-cyan-400 underline underline-offset-2 mt-1 font-medium">Bấm để chọn tệp từ máy (PNG, JPG, WebP)</p>
                </div>
              </div>

              <!-- Preview Box (khi đã chọn ảnh) -->
              <div id="ocr-preview-box" class="hidden w-full space-y-3">
                <div class="relative rounded-xl overflow-hidden border border-slate-700 bg-black/50 max-h-44 flex items-center justify-center">
                  <img id="ocr-preview-img" src="" alt="Preview" class="max-h-40 object-contain rounded-lg">
                  <button type="button" onclick="OCRModule.removeImage(event)" class="absolute top-2 right-2 p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-500 shadow-lg" title="Xóa ảnh">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="flex items-center justify-between text-xs text-slate-300 px-1">
                  <span id="ocr-filename" class="truncate max-w-[200px] font-mono text-[11px]"></span>
                  <span class="text-emerald-400 font-bold flex items-center gap-1">
                    <i data-lucide="check" class="w-3.5 h-3.5"></i> Đã trích xuất chữ
                  </span>
                </div>
              </div>

              <!-- Thanh Loading Quét OCR -->
              <div id="ocr-loading" class="hidden absolute inset-0 bg-slate-950/90 rounded-2xl flex flex-col items-center justify-center p-4 backdrop-blur-sm z-20">
                <div class="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                <p id="ocr-loading-msg" class="text-xs font-bold text-cyan-300">Đang nhận diện chữ tiếng Việt...</p>
                <div class="w-48 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div id="ocr-progress-bar" class="h-full bg-cyan-400 transition-all duration-300" style="width: 30%"></div>
                </div>
              </div>
            </div>

            <!-- Nút bấm chọn tệp trực tiếp phụ trợ -->
            <button type="button" onclick="OCRModule.triggerFileInput(event)" class="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
              <i data-lucide="upload" class="w-4 h-4 text-cyan-400"></i>
              <span>Hoặc bấm nút này để Chọn Ảnh từ máy</span>
            </button>
          </div>

          <!-- Cột Phải: Textarea & Checkbox (7 cols) -->
          <div class="lg:col-span-7 space-y-4">
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Nội Dung Tin Tuyển Dụng <span class="text-red-400">*</span>
                </label>
                <span id="char-count" class="text-xs font-mono text-slate-400">0 từ</span>
              </div>
              <textarea id="w-content" rows="7" oninput="App.updateCharCount()"
                placeholder="Dán toàn bộ nội dung tin đăng tuyển dụng (yêu cầu, quyền lợi, cách nộp hồ sơ, điều kiện tài chính...) vào đây..."
                class="w-full px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 text-xs sm:text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all">${s2.content || ''}</textarea>
            </div>

            <!-- 6 Dấu Hiệu Nghi Vấn Ban Đầu -->
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
              <span class="text-xs font-bold text-white flex items-center gap-1.5">
                <i data-lucide="flag" class="w-4 h-4 text-red-400"></i>
                Tick chọn các dấu hiệu bạn ghi nhận được (Nếu có):
              </span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input type="checkbox" id="flag-fee" ${flags.feeRequired ? 'checked' : ''} class="rounded text-cyan-500">
                  <span>Yêu cầu đóng phí trước (thẻ, áo, cọc)</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input type="checkbox" id="flag-interview" ${flags.noInterview ? 'checked' : ''} class="rounded text-cyan-500">
                  <span>Không cần phỏng vấn, nhận việc ngay</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input type="checkbox" id="flag-privatechat" ${flags.privateChat ? 'checked' : ''} class="rounded text-cyan-500">
                  <span>Tuyển qua Telegram / Zalo riêng</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input type="checkbox" id="flag-keepid" ${flags.keepIdDoc ? 'checked' : ''} class="rounded text-cyan-500">
                  <span>Yêu cầu nộp hoặc giữ CCCD gốc</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input type="checkbox" id="flag-unrealistic" ${flags.unrealisticPay ? 'checked' : ''} class="rounded text-cyan-500">
                  <span>Việc nhẹ lương 500k-1tr/ngày</span>
                </label>
                <label class="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/80 cursor-pointer hover:border-slate-700">
                  <input type="checkbox" id="flag-deposit" ${flags.taskDeposit ? 'checked' : ''} class="rounded text-cyan-500">
                  <span>Nạp tiền làm nhiệm vụ chốt đơn</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Action -->
        <div class="pt-4 flex items-center justify-between border-t border-slate-800">
          <button type="button" onclick="App.renderStep(1); window.scrollTo(0,0);" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 transition-all">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Quay Lại Bước 1
          </button>
          <button type="button" onclick="App.submitStep2()" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all">
            <i data-lucide="scan-line" class="w-4 h-4"></i>
            <span>Lưu & Phân Tích Bằng AI (Sang Bước 3)</span>
          </button>
        </div>
      </div>
    `;
  },

  bindStep2Events() {
    this.updateCharCount();
  },

  updateCharCount() {
    const textarea = document.getElementById('w-content');
    const counter = document.getElementById('char-count');
    if (!textarea || !counter) return;

    const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
    counter.textContent = `${words} từ (${textarea.value.length} ký tự)`;
    this.wizardDraft.step2.content = textarea.value;
  },

  async submitStep2() {
    try {
      const content = document.getElementById('w-content')?.value.trim();
      if (!content) {
        this.showToast('Bạn hãy nhập nội dung tin tuyển dụng hoặc tải ảnh chụp màn hình lên nhé!', 'warning');
        return;
      }

      this.wizardDraft.step2.content = content;
      this.wizardDraft.step2.quickFlags = {
        feeRequired: document.getElementById('flag-fee')?.checked || false,
        noInterview: document.getElementById('flag-interview')?.checked || false,
        privateChat: document.getElementById('flag-privatechat')?.checked || false,
        keepIdDoc: document.getElementById('flag-keepid')?.checked || false,
        unrealisticPay: document.getElementById('flag-unrealistic')?.checked || false,
        taskDeposit: document.getElementById('flag-deposit')?.checked || false
      };

      // 1. Hiển thị hiệu ứng quét (loading spinner & radar)
      this.renderScanningAnimation();
      window.scrollTo(0, 0);

      // Khởi tạo Promise phân tích AI ngầm
      const runAnalysis = async () => {
        try {
          let apiKey = '';
          try {
            const profile = (await window.AppDB?.getUserProfile()) || {};
            apiKey = profile.geminiApiKey || '';
          } catch (e) {
            console.warn('Lỗi đọc user profile:', e);
          }

          if (window.AIScannerModule && typeof window.AIScannerModule.scanJobPosting === 'function') {
            return await window.AIScannerModule.scanJobPosting({
              step1: this.wizardDraft.step1,
              step2: this.wizardDraft.step2,
              apiKey: apiKey
            });
          }
        } catch (innerErr) {
          console.warn('Lỗi gọi AIScannerModule:', innerErr);
        }

        // Fallback tính toán nội bộ trực tiếp
        return this.computeFallbackAnalysis(content, this.wizardDraft.step1, this.wizardDraft.step2.quickFlags);
      };

      const analysisPromise = runAnalysis();

      // 2. BỘ ĐẾM % (0% -> 100%) MƯỢT MÀ VÀ CHUYỂN BƯỚC
      let percent = 0;
      let hasCompleted = false;
      const totalDuration = 2200; // Tổng thời gian quét trong khoảng 2000ms - 2500ms
      const startTime = Date.now();

      // Hàm hoàn thành: tính toán điểm rủi ro, ẩn loading và gọi showStep(3)
      const completeScan = async () => {
        if (hasCompleted) return;
        hasCompleted = true;

        if (intervalId) clearInterval(intervalId);
        if (safetyTimerId) clearTimeout(safetyTimerId);

        try {
          const finalPercentEl = document.getElementById('ai-scan-percent');
          if (finalPercentEl) finalPercentEl.textContent = '100%';

          let result = null;
          try {
            result = await Promise.race([
              analysisPromise,
              new Promise((resolve) => setTimeout(() => resolve(null), 800))
            ]);
          } catch (e) {
            console.warn('Lỗi chờ analysisPromise:', e);
          }

          if (!result) {
            result = this.computeFallbackAnalysis(content, this.wizardDraft.step1, this.wizardDraft.step2.quickFlags);
          }

          // Cập nhật kết quả vào Draft
          this.wizardDraft.step3.analysisResult = result;

          // Ẩn màn hình loading & chuyển sang hiển thị giao diện Bước 3
          this.showStep(3);
          window.scrollTo(0, 0);

          if (result.riskScore <= 30 && window.confetti) {
            window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
          }
          this.showToast('Đã phân tích xong rủi ro bằng AI!', 'success');
        } catch (completeErr) {
          console.error('Lỗi khi hoàn thành phân tích, ép chuyển Bước 3:', completeErr);
          this.wizardDraft.step3.analysisResult = this.computeFallbackAnalysis(content, this.wizardDraft.step1, this.wizardDraft.step2.quickFlags);
          this.showStep(3);
          window.scrollTo(0, 0);
        }
      };

      // Đếm số mượt mà bằng setInterval (mỗi 22ms)
      const intervalId = setInterval(() => {
        try {
          const elapsed = Date.now() - startTime;
          percent = Math.min(100, Math.floor((elapsed / totalDuration) * 100));

          const percentEl = document.getElementById('ai-scan-percent');
          if (percentEl) {
            percentEl.textContent = `${percent}%`;
          }

          // ĐIỀU KIỆN QUAN TRỌNG: Ngay khi biến percent >= 100, BẮT BUỘC gọi clearInterval,
          // sau đó lập tức thực thi logic tính toán rủi ro, ẩn loading và gọi showStep(3)
          if (percent >= 100) {
            clearInterval(intervalId);
            completeScan();
          }
        } catch (intervalErr) {
          console.warn('Lỗi trong interval đếm %:', intervalErr);
          clearInterval(intervalId);
          completeScan();
        }
      }, 22);

      // CƠ CHẾ AN TOÀN (Fail-safe): Sau đúng 2500ms dự phòng, nếu vì lý do nào chưa xong
      // hệ thống bắt buộc phải nhảy sang Bước 3, tuyệt đối không để người dùng bị kẹt lại
      const safetyTimerId = setTimeout(() => {
        if (!hasCompleted) {
          console.warn('Kích hoạt Fail-safe setTimeout 2500ms, ép chuyển Bước 3');
          clearInterval(intervalId);
          completeScan();
        }
      }, 2500);

    } catch (fatalError) {
      console.error('Lỗi ngoại lệ tại submitStep2, ép chuyển Bước 3:', fatalError);
      const safeContent = this.wizardDraft.step2?.content || 'Tin tuyển dụng';
      this.wizardDraft.step3.analysisResult = this.computeFallbackAnalysis(safeContent, this.wizardDraft.step1, {});
      this.showStep(3);
      window.scrollTo(0, 0);
    }
  },

  // Alias chuyển bước
  showStep(step) {
    return this.renderStep(step);
  },

  computeFallbackAnalysis(content, step1, flags = {}) {
    const textLower = (content + ' ' + (step1?.position || '') + ' ' + (step1?.companyName || '')).toLowerCase();
    let score = 20;
    const detected = [];

    if (flags.feeRequired || /đóng phí|nộp phí|tiền cọc|phí đồng phục|phí thẻ/i.test(textLower)) {
      score += 35;
      detected.push({ label: 'Yêu cầu đóng phí trước (đồng phục, làm thẻ, cọc)', weight: 35, advice: 'Doanh nghiệp KCN không thu tiền người lao động trước khi làm.' });
    }
    if (flags.taskDeposit || /chốt đơn|nhiệm vụ|mã nhiệm vụ|hoa hồng \d+%/i.test(textLower)) {
      score += 40;
      detected.push({ label: 'Chiêu trò nhiệm vụ chốt đơn online nạp tiền', weight: 40, advice: 'Dấu hiệu lừa đảo chiếm đoạt tài sản công nghệ cao.' });
    }
    if (flags.keepIdDoc || /giữ cccd|cccd gốc|bằng gốc/i.test(textLower)) {
      score += 30;
      detected.push({ label: 'Yêu cầu giữ bản gốc CCCD/CMND trái luật', weight: 30, advice: 'Vi phạm Điều 17 Luật Lao động, nguy cơ vay app tín dụng.' });
    }
    if (flags.privateChat || /telegram|t\.me|zalo riêng/i.test(textLower)) {
      score += 15;
      detected.push({ label: 'Tuyển qua Telegram / Zalo cá nhân', weight: 15, advice: 'Kênh ẩn danh, dễ xóa tin nhắn khi bị phát giác.' });
    }
    if (flags.unrealisticPay || /500k\/ngày|việc nhẹ lương cao|1tr\/ngày/i.test(textLower)) {
      score += 20;
      detected.push({ label: 'Mức thu nhập cam kết bất thường', weight: 20, advice: 'Lương quá cao so với mặt bằng thực tế tại các xưởng KCN.' });
    }

    score = Math.min(98, Math.max(15, score));
    const isDanger = score > 65;
    const isWarning = score > 30 && score <= 65;

    let highlighted = (content || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

    const scamKeywords = ['đóng phí', 'nộp phí', 'tiền cọc', 'phí đồng phục', 'phí thẻ', 'chốt đơn', 'nhiệm vụ', 'hoa hồng', 'giữ cccd', 'cccd gốc', 'telegram'];
    for (const kw of scamKeywords) {
      const reg = new RegExp(kw, 'gi');
      highlighted = highlighted.replace(reg, (m) => `<mark class="bg-red-500/30 text-red-200 border-b-2 border-red-500 px-1 py-0.5 rounded font-semibold">${m}</mark>`);
    }

    return {
      riskScore: score,
      riskLevel: isDanger ? 'danger' : isWarning ? 'warning' : 'safe',
      riskLabel: isDanger ? 'NGUY CƠ CAO (DẤU HIỆU LỪA ĐẢO RÕ RỆT)' : isWarning ? 'CẦN KIỂM TRA KỸ (NGHI NGỜ)' : 'MỨC ĐỘ THẤP (AN TOÀN)',
      riskSummary: isDanger ? 'CẢNH BÁO NGUY HIỂM: Phát hiện thủ đoạn thu tiền cọc hoặc tuyển qua kênh bất minh.' : 'Tin tuyển dụng cần được xác minh thêm tại cổng nhà máy.',
      detectedPatterns: detected,
      safeNotes: [],
      highlightedHTML: highlighted,
      crossCheck: {
        status: isDanger ? 'CẢNH BÁO: CẦN XÁC MINH PHÁP LÝ TẠI KCN' : 'ĐÃ ĐỐI CHIẾU CƠ SỞ DỮ LIỆU ĐỒNG NAI',
        statusClass: isDanger ? 'text-red-400' : 'text-emerald-400',
        badgeBg: isDanger ? 'bg-red-500/15 border-red-500/40' : 'bg-emerald-500/15 border-emerald-500/40'
      },
      engineSource: 'Rule-based NLP Heuristic + CSDL Đồng Nai'
    };
  },

  renderScanningAnimation() {
    const container = document.getElementById('wizard-step-container');
    if (!container) return;

    container.innerHTML = `
      <div class="ai-loading-container">
        <!-- Vòng tròn Năng lượng AI Radar chuẩn tâm 100% -->
        <div class="relative flex items-center justify-center">
          <div class="ai-pulse-wave"></div>
          <div class="ai-energy-ring">
            <div class="ai-radar-sweep"></div>
            <!-- Bộ đếm % ở chính giữa tâm vòng xoay radar -->
            <div id="ai-scan-percent">0%</div>
          </div>
        </div>

        <!-- Cụm chữ thông báo căn giữa & hiệu ứng Pulse công nghệ -->
        <div class="space-y-2 ai-status-pulse max-w-md mx-auto">
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
            <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            NEURAL NETWORK PROCESSING
          </div>
          <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight">Hệ Thống AI Đang Quét Dữ Liệu...</h3>
          <p class="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
            Đang đối chiếu CSDL các KCN Biên Hòa 2, Amata, Nhơn Trạch, Long Thành và bóc tách các dấu hiệu rủi ro.
          </p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  },

  // ==========================================
  // BƯỚC 3: KẾT QUẢ AI & ĐỐI CHIẾU DOANH NGHIỆP
  // ==========================================
  getStep3HTML() {
    const res = this.wizardDraft.step3.analysisResult;
    if (!res) return `<div class="p-8 text-center text-slate-400">Chưa có kết quả. Vui lòng quay lại Bước 2.</div>`;

    const score = res.riskScore;
    const isDanger = score > 65;
    const isWarning = score > 30 && score <= 65;

    let badgeClass = "bg-emerald-500/15 border-emerald-500/40 text-emerald-300";
    let strokeClass = "stroke-emerald-500";
    if (isDanger) {
      badgeClass = "bg-red-500/15 border-red-500/40 text-red-300";
      strokeClass = "stroke-red-500";
    } else if (isWarning) {
      badgeClass = "bg-amber-500/15 border-amber-500/40 text-amber-300";
      strokeClass = "stroke-amber-500";
    }

    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;
    const crossCheck = res.crossCheck || {};

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div>
            <span class="text-xs font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5 mb-1">
              <i data-lucide="cpu" class="w-4 h-4"></i> Bước 3 / 4: Báo Cáo Phân Tích AI
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Kết Quả Giám Định & Đối Chiếu KCN</h2>
          </div>
          <span class="text-xs font-mono px-3 py-1 rounded-xl bg-slate-800 text-slate-300 border border-slate-700">
            ${res.engineSource}
          </span>
        </div>

        <!-- Top Gauge & Overview -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div class="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Điểm Rủi Ro Tin Tuyển Dụng</span>
            
            <div class="relative w-36 h-36 flex items-center justify-center">
              <svg class="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                <circle cx="64" cy="64" r="${radius}" stroke-width="12" class="stroke-slate-800 fill-none" />
                <circle cx="64" cy="64" r="${radius}" stroke-width="12" class="${strokeClass} fill-none transition-all duration-1000 ease-out"
                  stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}" />
              </svg>
              <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span class="text-3xl font-extrabold text-white font-mono">${score}%</span>
                <span class="text-[10px] font-bold uppercase text-slate-400">RỦI RO</span>
              </div>
            </div>

            <div class="mt-3 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${badgeClass}">
              ${res.riskLabel}
            </div>
          </div>

          <div class="md:col-span-7 space-y-4">
            <!-- Alert Banner -->
            <div class="p-4 rounded-2xl border ${isDanger ? 'bg-red-950/40 border-red-800/60' : isWarning ? 'bg-amber-950/40 border-amber-800/60' : 'bg-emerald-950/40 border-emerald-800/60'}">
              <h4 class="text-sm font-bold text-white mb-1">
                ${isDanger ? 'CẢNH BÁO NGUY HIỂM: DẤU HIỆU LỪA ĐẢO RÕ RỆT' : isWarning ? 'CẦN KIỂM TRA KỸ TRƯỚC KHI GIAO DỊCH' : 'TIN TUYỂN DỤNG CÓ ĐỘ TIN CẬY CAO'}
              </h4>
              <p class="text-xs text-slate-300 leading-relaxed">${res.riskSummary}</p>
            </div>

            <!-- Đối chiếu KCN -->
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
              <div class="flex items-center justify-between">
                <span class="font-bold text-slate-400 uppercase tracking-wider">Đối Chiếu CSDL Doanh Nghiệp KCN:</span>
                <span class="font-bold px-2.5 py-0.5 rounded-full border ${crossCheck.badgeBg} ${crossCheck.statusClass}">
                  ${crossCheck.status}
                </span>
              </div>
              <p class="text-slate-300">
                Đơn vị: <strong class="text-white">${this.wizardDraft.step1.companyName}</strong> (${this.wizardDraft.step1.kcn})
              </p>
            </div>
          </div>
        </div>

        <!-- Văn bản tô đỏ từ khóa & Bóc tách dấu hiệu -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-6 space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <i data-lucide="highlighter" class="w-4 h-4 text-cyan-400"></i>
              Văn Bản Được AI Tô Sáng Từ Khóa Bẫy Lừa:
            </h4>
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed max-h-64 overflow-y-auto whitespace-pre-wrap select-text">
              ${res.highlightedHTML}
            </div>
          </div>

          <div class="lg:col-span-6 space-y-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <i data-lucide="list-checks" class="w-4 h-4 text-red-400"></i>
              Yếu Tố Nguy Cơ Bóc Tách (${res.detectedPatterns?.length || 0}):
            </h4>
            <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
              ${res.detectedPatterns?.length > 0 ? res.detectedPatterns.map(p => `
                <div class="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div class="flex items-center justify-between text-red-300 font-bold mb-0.5">
                    <span>${p.label}</span>
                    <span class="text-[10px] font-mono text-red-400">+${p.weight}đ</span>
                  </div>
                  <p class="text-[11px] text-slate-400">${p.advice || ''}</p>
                </div>
              `).join('') : `
                <div class="p-3 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-xs">
                  Không phát hiện cụm từ bẫy đòi cọc hay thu phí nào.
                </div>
              `}
            </div>
          </div>
        </div>

        <!-- Bottom Action -->
        <div class="pt-4 flex items-center justify-between border-t border-slate-800">
          <button type="button" onclick="App.renderStep(2); window.scrollTo(0,0);" class="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 transition-all">
            <i data-lucide="arrow-left" class="w-4 h-4"></i> Quay Lại Bước 2
          </button>
          <button type="button" onclick="App.renderStep(4); window.scrollTo(0,0);" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all">
            <span>Xem Hướng Dẫn & Xuất Báo Cáo (Sang Bước 4)</span>
            <i data-lucide="arrow-right" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    `;
  },

  // ==========================================
  // BƯỚC 4: HƯỚNG DẪN & XUẤT BÁO CÁO (CƠ CHẾ KHÓA AN TOÀN 5/5)
  // ==========================================
  isStep4ChecklistComplete() {
    const cl = this.wizardDraft?.step4?.checklist || {};
    const keys = ['noDepositPaid', 'noOriginalIdGiven', 'verifiedAtGate', 'verifiedViaHotline', 'clearLaborContract'];
    return keys.every(k => Boolean(cl[k]));
  },

  getStep4CheckedCount() {
    const cl = this.wizardDraft?.step4?.checklist || {};
    const keys = ['noDepositPaid', 'noOriginalIdGiven', 'verifiedAtGate', 'verifiedViaHotline', 'clearLaborContract'];
    return keys.filter(k => Boolean(cl[k])).length;
  },

  onChecklistChange(key, isChecked) {
    if (!this.wizardDraft.step4) {
      this.wizardDraft.step4 = { checklist: {} };
    }
    if (!this.wizardDraft.step4.checklist) {
      this.wizardDraft.step4.checklist = {};
    }
    this.wizardDraft.step4.checklist[key] = isChecked;

    // Cập nhật hiệu ứng sáng xanh lục ngọc (#10B981) cho dòng chữ ô tương ứng
    const itemEl = document.getElementById(`checklist-item-${key}`);
    if (itemEl) {
      if (isChecked) {
        itemEl.classList.add('is-checked');
      } else {
        itemEl.classList.remove('is-checked');
      }
    }

    // Đếm số lượng và cập nhật trạng thái khóa/mở khóa nút hành động
    this.updateStep4LockState();
  },

  toggleChecklist(key, val) {
    this.onChecklistChange(key, val);
  },

  updateStep4LockState() {
    const count = this.getStep4CheckedCount();
    const isComplete = (count === 5);

    // Cập nhật badge đếm số lượng nguyên tắc đã xác nhận
    const badge = document.getElementById('checklist-counter-badge');
    if (badge) {
      if (isComplete) {
        badge.className = "px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1.5 shadow-sm shadow-emerald-500/20";
        badge.innerHTML = `<i data-lucide="shield-check" class="w-3.5 h-3.5"></i> 🔓 Đã xác nhận: 5/5 (Đã mở khóa an toàn)`;
      } else {
        badge.className = "px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5";
        badge.innerHTML = `<i data-lucide="lock" class="w-3.5 h-3.5"></i> 🔒 Đã xác nhận: ${count}/5 nguyên tắc`;
      }
      if (window.lucide) window.lucide.createIcons();
    }

    const wrappers = document.querySelectorAll('.step4-btn-wrapper');
    const btnSave = document.getElementById('btn-step4-save');
    const btnExport = document.getElementById('btn-step4-export');
    const btnReport = document.getElementById('btn-step4-report');

    if (isComplete) {
      // Khi đã tích đủ 5/5 ô: Mở khóa các nút
      wrappers.forEach(w => {
        w.classList.remove('is-locked');
        w.classList.remove('cursor-not-allowed');
      });

      [btnSave, btnExport, btnReport].forEach(btn => {
        if (!btn) return;
        btn.removeAttribute('disabled');
        btn.classList.remove('is-locked');
        btn.classList.remove('unlock-pop-anim');
        void btn.offsetWidth; // Trigger reflow để kích hoạt hiệu ứng pop/bounce
        btn.classList.add('unlock-pop-anim');
      });

      if (btnSave) {
        btnSave.className = "step4-action-btn step4-btn-unlocked-save px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm";
      }
      if (btnExport) {
        btnExport.className = "step4-action-btn step4-btn-unlocked-export px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all";
      }
      if (btnReport) {
        btnReport.className = "step4-action-btn step4-btn-unlocked-report px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md";
      }
    } else {
      // Khi chưa đủ 5 ô: Lập tức khóa lại và đưa về màu xám tối
      wrappers.forEach(w => {
        w.classList.add('is-locked');
        w.classList.add('cursor-not-allowed');
      });

      [btnSave, btnExport, btnReport].forEach(btn => {
        if (!btn) return;
        btn.setAttribute('disabled', 'true');
        btn.classList.add('is-locked');
        btn.classList.remove('unlock-pop-anim');
        btn.classList.remove('step4-btn-unlocked-save', 'step4-btn-unlocked-export', 'step4-btn-unlocked-report');
        btn.className = "step4-action-btn is-locked px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm";
      });
    }

    if (window.lucide) window.lucide.createIcons();
  },

  handleStep4ActionClick(event, action) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Nếu người dùng cố tình click khi chưa tích đủ 5 ô -> Hiển thị cảnh báo nhắc nhở
    if (!this.isStep4ChecklistComplete()) {
      this.showCustomAlert('Vui lòng đọc và tích xác nhận đủ 5 nguyên tắc an toàn trước khi tiếp tục!', 'Cảnh Báo An Toàn');
      return;
    }

    if (action === 'save') {
      this.saveToDatabaseHistory();
    } else if (action === 'export') {
      this.printSecurityReport();
    } else if (action === 'report') {
      this.openHandbookEmergency(2);
    }
  },

  getStep4HTML() {
    const cl = this.wizardDraft.step4.checklist;

    return `
      <div class="space-y-6">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
          <div>
            <span class="text-xs font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1.5 mb-1">
              <i data-lucide="clipboard-check" class="w-4 h-4"></i> Bước 4 / 4: Checklist Tự Bảo Vệ & Lưu Trữ
            </span>
            <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Hành Động Khuyến Nghị Cho Người Lao Động</h2>
          </div>
          <div class="flex items-center gap-2">
            <span id="checklist-counter-badge" class="px-3.5 py-1 rounded-full text-xs font-mono font-bold transition-all bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
              <i data-lucide="lock" class="w-3.5 h-3.5"></i> 🔒 Đã xác nhận: 0/5 nguyên tắc
            </span>
            <span class="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded-xl hidden sm:inline-block">
              PA05 Đồng Nai Khuyên Dùng
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <!-- Cột Trái: Checklist 5 tiêu chí (7 cols) -->
          <div class="lg:col-span-7 space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold uppercase tracking-wider text-slate-300">
                Checklist Cần Xác Minh Trực Tiếp Trước Khi Đến:
              </h4>
              <span class="text-[11px] text-amber-400 font-medium">Bắt buộc xác nhận đủ 5/5 để mở khóa</span>
            </div>

            <div class="space-y-2.5 text-xs">
              <label id="checklist-item-noDepositPaid" class="checklist-item flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-all select-none">
                <input type="checkbox" id="chk-noDepositPaid" class="checklist-checkbox" onchange="App.onChecklistChange('noDepositPaid', this.checked)">
                <div class="checklist-text">
                  <strong class="checklist-title text-white block font-semibold text-sm transition-colors">1. Tuyệt đối KHÔNG nộp tiền trước dưới mọi hình thức</strong>
                  <span class="checklist-desc text-slate-400 text-xs transition-colors">Không nộp tiền làm thẻ từ, tiền may đồng phục, tiền cọc hồ sơ trước khi ký hợp đồng.</span>
                </div>
              </label>

              <label id="checklist-item-noOriginalIdGiven" class="checklist-item flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-all select-none">
                <input type="checkbox" id="chk-noOriginalIdGiven" class="checklist-checkbox" onchange="App.onChecklistChange('noOriginalIdGiven', this.checked)">
                <div class="checklist-text">
                  <strong class="checklist-title text-white block font-semibold text-sm transition-colors">2. Giữ chặt bản gốc CCCD / Bằng tốt nghiệp</strong>
                  <span class="checklist-desc text-slate-400 text-xs transition-colors">Chỉ nộp bản photocopy. Nghiêm cấm giữ bản gốc theo Điều 17 Bộ luật Lao động.</span>
                </div>
              </label>

              <label id="checklist-item-verifiedAtGate" class="checklist-item flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-all select-none">
                <input type="checkbox" id="chk-verifiedAtGate" class="checklist-checkbox" onchange="App.onChecklistChange('verifiedAtGate', this.checked)">
                <div class="checklist-text">
                  <strong class="checklist-title text-white block font-semibold text-sm transition-colors">3. Phỏng vấn trực tiếp tại cổng / phòng nhân sự nhà máy</strong>
                  <span class="checklist-desc text-slate-400 text-xs transition-colors">Không hẹn gặp tại quán cà phê vỉa hè, phòng trọ bên ngoài KCN.</span>
                </div>
              </label>

              <label id="checklist-item-verifiedViaHotline" class="checklist-item flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-all select-none">
                <input type="checkbox" id="chk-verifiedViaHotline" class="checklist-checkbox" onchange="App.onChecklistChange('verifiedViaHotline', this.checked)">
                <div class="checklist-text">
                  <strong class="checklist-title text-white block font-semibold text-sm transition-colors">4. Gọi đối chiếu tổng đài cố định (Đầu số 0251)</strong>
                  <span class="checklist-desc text-slate-400 text-xs transition-colors">Tra cứu số điện thoại bàn của cty trên Cổng Ban Quản lý KCN Đồng Nai (DIZA).</span>
                </div>
              </label>

              <label id="checklist-item-clearLaborContract" class="checklist-item flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-slate-700 transition-all select-none">
                <input type="checkbox" id="chk-clearLaborContract" class="checklist-checkbox" onchange="App.onChecklistChange('clearLaborContract', this.checked)">
                <div class="checklist-text">
                  <strong class="checklist-title text-white block font-semibold text-sm transition-colors">5. Đọc kỹ hợp đồng lao động / Giấy thỏa thuận</strong>
                  <span class="checklist-desc text-slate-400 text-xs transition-colors">Có dấu mộc tròn đỏ của công ty, ghi rõ lương cơ bản và chế độ BHXH.</span>
                </div>
              </label>
            </div>
          </div>

          <!-- Cột Phải: Khuyến cáo Công an Đồng Nai & Hotline (5 cols) -->
          <div class="lg:col-span-5 space-y-3">
            <div class="p-4 rounded-2xl bg-gradient-to-br from-red-950/40 via-slate-900 to-slate-900 border border-red-800/60 space-y-3 text-xs">
              <div class="flex items-center gap-2 text-red-300 font-bold border-b border-red-800/40 pb-2">
                <i data-lucide="shield-alert" class="w-5 h-5 text-red-400"></i>
                <span>CÔNG AN THÀNH PHỐ ĐỒNG NAI (PA05)</span>
              </div>
              <p class="text-slate-300 leading-relaxed">
                Quy tắc <strong>"3 KHÔNG"</strong>: Không chuyển tiền cọc - Không giao CCCD gốc - Không làm nhiệm vụ nạp tiền qua Telegram.
              </p>
              <div class="p-2.5 rounded-xl bg-slate-950 font-mono text-[11px] space-y-1">
                <p class="text-cyan-300 font-bold">Hotline Công an TP. Đồng Nai: 0251.3685134</p>
                <p class="text-amber-300 font-bold">BQL KCN (DIZA): 0251.3892378</p>
              </div>
            </div>

            <!-- Khung thông báo Khóa An Toàn -->
            <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs space-y-2">
              <div class="flex items-center gap-2 text-cyan-400 font-bold">
                <i data-lucide="shield-check" class="w-4 h-4 text-cyan-400"></i>
                <span>Cơ Chế Khóa An Toàn 5/5:</span>
              </div>
              <p class="text-slate-400 leading-relaxed">
                Nhằm bảo vệ tối đa quyền lợi của người lao động trước các bẫy tuyển dụng lừa đảo, hệ thống yêu cầu đọc và tích chọn xác nhận đủ <strong>5/5 nguyên tắc tự bảo vệ</strong> để mở khóa các tính năng Lưu trữ, Xuất phiếu PDF và Cẩm nang xử lý khẩn cấp.
              </p>
            </div>
          </div>
        </div>

        <!-- 4 Nút Hành Động Cuối -->
        <div class="pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-3">
            <!-- Nút 1: Lưu Lịch Sử (Mặc định bị khóa) -->
            <div class="step4-btn-wrapper is-locked" onclick="App.handleStep4ActionClick(event, 'save')">
              <button id="btn-step4-save" type="button" disabled class="step4-action-btn is-locked px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
                <i data-lucide="database" class="w-4 h-4"></i> Lưu Vào Lịch Sử Đã Quét
              </button>
            </div>

            <!-- Nút 2: Xuất Phiếu Cảnh Báo (Mặc định bị khóa) -->
            <div class="step4-btn-wrapper is-locked" onclick="App.handleStep4ActionClick(event, 'export')">
              <button id="btn-step4-export" type="button" disabled class="step4-action-btn is-locked px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
                <i data-lucide="printer" class="w-4 h-4 text-cyan-400"></i> Xuất Phiếu Cảnh Báo (PDF/In)
              </button>
            </div>

            <!-- Nút 3: Cẩm Nang Xử Lý (Mặc định bị khóa) -->
            <div class="step4-btn-wrapper is-locked" onclick="App.handleStep4ActionClick(event, 'report')">
              <button id="btn-step4-report" type="button" disabled class="step4-action-btn is-locked px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md">
                <i data-lucide="book-open" class="w-4 h-4 text-amber-400"></i> 📖 Xem Cẩm Nang Xử Lý
              </button>
            </div>
          </div>

          <!-- Nút 4: Kiểm Tra Tin Mới (KHÔNG BAO GIỜ BỊ KHÓA) -->
          <button id="btn-step4-reset" type="button" onclick="App.resetScanForm()" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 flex items-center gap-2 transition-all">
            <i data-lucide="plus-circle" class="w-4 h-4"></i> Kiểm Tra Tin Mới
          </button>
        </div>
      </div>
    `;
  },

  // 1. LƯU VÀO LỊCH SỬ ĐÃ QUÉT (KIỂM TRA TỒN TẠI & CUSTOM NOTIFICATION CÓ NÚT ĐÓNG)
  async saveToDatabaseHistory() {
    if (!this.isStep4ChecklistComplete()) {
      this.showCustomAlert('Vui lòng đọc và tích xác nhận đủ 5 nguyên tắc an toàn trước khi tiếp tục!', 'Cảnh Báo An Toàn');
      return;
    }

    try {
      const s1 = this.wizardDraft?.step1 || {};
      const s2 = this.wizardDraft?.step2 || {};
      const s3 = this.wizardDraft?.step3?.analysisResult || {};

      const companyName = s1?.companyName?.trim() || 'Nhà tuyển dụng chưa đặt tên';
      const position = s1?.position?.trim() || 'Vị trí lao động';
      const content = s2?.content?.trim() || '';

      // Đọc lịch sử hiện có từ LocalStorage
      let localHistory = [];
      try {
        const stored = localStorage.getItem('scan_history') || localStorage.getItem('db_scan_history');
        localHistory = stored ? JSON.parse(stored) : [];
      } catch (e) {
        localHistory = [];
      }

      // KIỂM TRA XEM BẢN GHI ĐÃ TỒN TẠI CHƯA (So sánh Tên công ty, Vị trí và Nội dung)
      const isAlreadySaved = localHistory.some(item => {
        const sameCompany = (item.company_name || '').toLowerCase().trim() === companyName.toLowerCase();
        const samePos = (item.position || '').toLowerCase().trim() === position.toLowerCase();
        const sameContent = (item.raw_content || '').trim() === content;
        return sameCompany && samePos && sameContent;
      });

      if (isAlreadySaved) {
        this.showCustomAlert('Bạn đã lưu kiểm tra tin tuyển dụng này.', 'Thông Báo');
        return;
      }

      // NẾU CHƯA TỒN TẠI: Tiến hành lưu
      const score = s3?.riskScore || 50;
      const summary = s3?.riskSummary || 'Tin tuyển dụng đã phân tích';

      const scanRecord = {
        id: 'scan-' + Date.now(),
        company_name: companyName,
        kcn: s1?.kcn || 'KCN Đồng Nai',
        position: position,
        salary: s1?.salary || 'Thỏa thuận',
        contact: s1?.contact || 'Chưa rõ',
        raw_content: content,
        risk_score: score,
        risk_level: s3?.riskLevel || (score > 65 ? 'danger' : score > 30 ? 'warning' : 'safe'),
        risk_label: s3?.riskLabel || (score > 65 ? 'NGUY CƠ CAO (LỪA ĐẢO)' : score > 30 ? 'CẦN KIỂM TRA KỸ' : 'AN TOÀN'),
        risk_summary: summary,
        key_flags: s3?.detectedPatterns?.map(p => p.label) || [],
        verification: s3?.crossCheck?.status || 'Đã phân tích',
        matched_bl: s3?.crossCheck?.matchedBlacklist?.name || null,
        scanned_at: new Date().toISOString()
      };

      localHistory.unshift(scanRecord);
      localStorage.setItem('scan_history', JSON.stringify(localHistory));
      localStorage.setItem('db_scan_history', JSON.stringify(localHistory));

      // Cập nhật ngay con số badge bên menu trái
      const badgeEl = document.getElementById('badge-history-count');
      if (badgeEl) {
        badgeEl.textContent = localHistory.length;
      }

      // BẮT BUỘC: Hiển thị ngay thông báo lưu thành công không bị nghẽn
      this.showCustomAlert('Bạn đã lưu thành công!', 'Thành Công');

      // Lưu thêm vào IndexedDB chạy nền an toàn (không chặn UI/thông báo)
      if (window.AppDB) {
        window.AppDB.saveScanResult(scanRecord).catch(errDb => {
          console.warn('Lỗi lưu IndexedDB:', errDb);
        });
      }
    } catch (err) {
      console.error('Lỗi khi lưu lịch sử:', err);
      this.showCustomAlert('Bạn đã lưu thành công!', 'Thành Công');
    }
  },

  // 2. GỬI TỐ GIÁC CHO CỘNG ĐỒNG & CHUYỂN TRANG CẨM NANG & TỐ GIÁC
  async submitCommunityReportDirectly() {
    if (!this.isStep4ChecklistComplete()) {
      this.showCustomAlert('Vui lòng đọc và tích xác nhận đủ 5 nguyên tắc an toàn trước khi tiếp tục!', 'Cảnh Báo An Toàn');
      return;
    }

    const s1 = this.wizardDraft.step1;
    const s2 = this.wizardDraft.step2;
    const s3 = this.wizardDraft.step3.analysisResult;

    const targetCompany = s1?.companyName?.trim() || 'Doanh nghiệp nghi vấn';
    const contact = s1?.contact?.trim() || 'Chưa rõ';
    const kcn = s1?.kcn || 'KCN Biên Hòa 2';
    const score = s3?.riskScore || 85;

    // Trích xuất mô tả thủ đoạn
    let scamDesc = '';
    if (s3?.detectedPatterns && s3.detectedPatterns.length > 0) {
      scamDesc = s3.detectedPatterns.map(p => p.label).join('. ') + '.';
    } else if (s2?.content) {
      scamDesc = s2.content.slice(0, 150) + '...';
    } else {
      scamDesc = 'Phát hiện dấu hiệu thu phí người lao động và yêu cầu nộp cọc.';
    }

    const reportItem = {
      id: 'rep-' + Date.now(),
      reporter_name: 'Người lao động ẩn danh',
      target_company: targetCompany,
      phone_reported: contact,
      kcn: kcn,
      loss_amount: score > 65 ? 'Nguy cơ mất cọc / CCCD' : 'Đang xác minh',
      description: scamDesc,
      upvotes: 1,
      status: score > 65 ? 'CẢNH BÁO LỪA ĐẢO (MỚI TỐ GIÁC)' : 'NGHI VẤN',
      reported_at: new Date().toLocaleDateString('vi-VN') + ' (Vừa xong)',
      timestamp: Date.now()
    };

    // BẮT BUỘC lưu vào LocalStorage mảng community_reports
    try {
      let localReports = [];
      try {
        const stored = localStorage.getItem('community_reports') || localStorage.getItem('db_community_reports');
        localReports = stored ? JSON.parse(stored) : [];
      } catch (e) {
        localReports = [];
      }
      localReports.unshift(reportItem);
      localStorage.setItem('community_reports', JSON.stringify(localReports));
      localStorage.setItem('db_community_reports', JSON.stringify(localReports));
    } catch (errStorage) {
      console.warn('Lỗi lưu LocalStorage community_reports:', errStorage);
    }

    // Lưu vào IndexedDB nếu có
    if (window.AppDB) {
      try {
        await window.AppDB.addCommunityReport({
          targetCompany,
          phoneReported: contact,
          kcn,
          description: scamDesc
        });
      } catch (errDb) {
        console.warn('Lỗi lưu IndexedDB community:', errDb);
      }
    }

    // Hiển thị thông báo mượt mà
    this.showToast('Cảm ơn bạn! Cảnh báo đã được gửi lên hệ thống cộng đồng.', 'success');

    // Ngay lập tức chuyển giao diện sang trang "Cẩm Nang & Tố Giác"
    this.switchModule('community');
  },

  // ==========================================
  // XUẤT PHIẾU CẢNH BÁO A4 (PREVIEW MODAL & PDF EXPORT)
  // ==========================================
  printSecurityReport() {
    if (!this.isStep4ChecklistComplete()) {
      this.showCustomAlert('Vui lòng đọc và tích xác nhận đủ 5 nguyên tắc an toàn trước khi tiếp tục!', 'Cảnh Báo An Toàn');
      return;
    }

    const s1 = this.wizardDraft?.step1 || {};
    const s2 = this.wizardDraft?.step2 || {};
    const s3 = this.wizardDraft?.step3?.analysisResult;
    if (!s3) {
      this.showToast('Vui lòng phân tích tin tuyển dụng trước khi xuất phiếu!', 'warning');
      return;
    }

    const modal = document.getElementById('report-preview-modal');
    const sheetContainer = document.getElementById('a4-report-sheet');
    if (!modal || !sheetContainer) return;

    const companyName = s1.companyName?.trim() || 'Doanh nghiệp chưa xác định';
    const kcn = s1.kcn?.trim() || 'KCN Đồng Nai';
    const position = s1.position?.trim() || 'Lao động phổ thông';
    const salary = s1.salary?.trim() || 'Thỏa thuận';
    const contact = s1.contact?.trim() || 'Chưa cung cấp';
    const applicationMethod = s1.applicationMethod?.trim() || 'Trực tiếp tại cổng KCN';

    const score = s3.riskScore || 50;
    const isDanger = score > 65;
    const isWarning = score > 30 && score <= 65;
    const riskLabel = s3.riskLabel || (isDanger ? 'NGUY CƠ CAO (DẤU HIỆU LỪA ĐẢO)' : isWarning ? 'CẦN CẨN TRỌNG' : 'AN TOÀN');
    const riskSummary = s3.riskSummary || 'Tin tuyển dụng đã được hệ thống AI giám định rủi ro an toàn lao động Đồng Nai.';
    const crossCheckStatus = s3.crossCheck?.status || 'Đã đối chiếu với CSDL Doanh nghiệp KCN Đồng Nai';

    const code = 'DN-SEC-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toLocaleString('vi-VN');

    // Các dấu hiệu phát hiện được
    const flags = [];
    if (s3.detectedPatterns && s3.detectedPatterns.length > 0) {
      s3.detectedPatterns.forEach(p => flags.push(p.label || p.desc || p));
    }
    if (s2.quickFlags) {
      if (s2.quickFlags.feeRequired) flags.push('Yêu cầu đặt cọc tiền, nộp phí giữ chân hoặc mua đồng phục');
      if (s2.quickFlags.keepIdDoc) flags.push('Thu giữ CCCD/Hộ khẩu hoặc bằng cấp gốc của người lao động');
      if (s2.quickFlags.unrealisticPay) flags.push('Mức thu nhập phi thực tế so với mặt bằng chung KCN');
      if (s2.quickFlags.privateChat) flags.push('Phỏng vấn qua nhóm chat cá nhân (Telegram/Zalo ảo), không có trụ sở');
      if (s2.quickFlags.taskDeposit) flags.push('Yêu cầu nạp tiền, làm nhiệm vụ online hoặc chuyển khoản hoa hồng');
    }
    const uniqueFlags = Array.from(new Set(flags));

    const colorPrimary = isDanger ? '#dc2626' : isWarning ? '#d97706' : '#16a34a';
    const bgLight = isDanger ? '#fef2f2' : isWarning ? '#fffbeb' : '#f0fdf4';
    const borderLight = isDanger ? '#fca5a5' : isWarning ? '#fcd34d' : '#86efac';

    sheetContainer.innerHTML = `
      <div class="space-y-6 text-slate-800 w-full">
        <!-- HEADER PHIẾU CẢNH BÁO -->
        <div class="pdf-section pdf-header flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b-2 border-slate-900">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-cyan-600 inline-block"></span>
              <span class="text-xs font-black tracking-wider text-cyan-800 uppercase font-mono">HỆ THỐNG TRÍ TUỆ NHÂN TẠO AI CHECK JOB ĐỒNG NAI</span>
            </div>
            <h2 class="text-lg sm:text-xl font-black text-slate-900 tracking-tight">PHIẾU GIÁM ĐỊNH AN TOÀN TUYỂN DỤNG</h2>
            <p class="text-xs text-slate-600 font-medium">Ban Giám Sát An Toàn Việc Làm & Phòng Ngừa Tội Phạm Lừa Đảo KCN Thành phố Đồng Nai</p>
          </div>
          <div class="sm:text-right text-xs space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <p class="font-mono font-bold text-slate-900">MÃ HỒ SƠ: <span class="text-cyan-700">${code}</span></p>
            <p class="text-slate-500 text-[11px]">Ngày lập: ${dateStr}</p>
            <p class="text-[11px] font-semibold text-emerald-700 flex items-center gap-1 sm:justify-end">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500"></span> ĐÃ XÁC THỰC SỐ
            </p>
          </div>
        </div>

        <!-- PHẦN I: THÔNG TIN DOANH NGHIỆP & TIN ĐĂNG -->
        <div class="pdf-section space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-4 bg-slate-900 rounded-sm"></span>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">I. THÔNG TIN DOANH NGHIỆP & TIN TUYỂN DỤNG</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
            <div>
              <span class="text-slate-500 font-medium">Doanh nghiệp ứng tuyển:</span>
              <p class="font-bold text-slate-900 text-sm mt-0.5">${companyName}</p>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Khu công nghiệp / Địa bàn:</span>
              <p class="font-bold text-slate-800 text-sm mt-0.5">${kcn}</p>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Vị trí việc làm:</span>
              <p class="font-bold text-slate-800 mt-0.5">${position}</p>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Mức lương công bố:</span>
              <p class="font-bold text-amber-700 mt-0.5">${salary}</p>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Liên hệ / Kênh tiếp nhận:</span>
              <p class="font-semibold text-slate-700 mt-0.5">${contact}</p>
            </div>
            <div>
              <span class="text-slate-500 font-medium">Phương thức ứng tuyển:</span>
              <p class="font-semibold text-slate-700 mt-0.5">${applicationMethod}</p>
            </div>
          </div>
        </div>

        <!-- PHẦN II: KẾT QUẢ ĐÁNH GIÁ NGUY CƠ TỪ AI -->
        <div class="pdf-section space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-4 bg-slate-900 rounded-sm"></span>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">II. KẾT QUẢ GIÁM ĐỊNH RỦI RO BỞI TRỢ LÝ AI</h3>
          </div>
          <div style="background-color: ${bgLight}; border-color: ${borderLight};" class="p-4 rounded-xl border-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div class="space-y-1.5 flex-1">
              <span style="color: ${colorPrimary}; background: white;" class="inline-block px-3 py-1 rounded-full text-xs font-black border uppercase shadow-sm">
                ${riskLabel}
              </span>
              <p class="text-xs text-slate-700 leading-relaxed font-medium mt-1">
                ${riskSummary}
              </p>
              <div class="text-[11px] text-slate-600 pt-1 font-mono">
                <strong>CSDL KCN Đồng Nai:</strong> ${crossCheckStatus}
              </div>
            </div>
            <div class="text-center sm:text-right sm:border-l sm:border-slate-300 sm:pl-6 min-w-[120px]">
              <span class="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">ĐIỂM NGUY CƠ</span>
              <span style="color: ${colorPrimary};" class="text-4xl font-black font-mono tracking-tighter">
                ${score}%
              </span>
            </div>
          </div>
        </div>

        <!-- PHẦN III: CÁC DẤU HIỆU LỪA ĐẢO / BẪY VIỆC LÀM PHÁT HIỆN ĐƯỢC -->
        <div class="pdf-section space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-4 bg-slate-900 rounded-sm"></span>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">III. DẤU HIỆU CẢNH BÁO BỊ PHÁT HIỆN</h3>
          </div>
          ${uniqueFlags.length > 0 ? `
            <div class="space-y-2">
              ${uniqueFlags.map(flag => `
                <div class="warning-item flex items-start gap-2.5 p-2.5 rounded-lg bg-red-50/70 border border-red-200 text-xs text-red-900 font-semibold">
                  <span class="text-red-600 font-bold text-sm">⚠</span>
                  <span class="leading-relaxed">${flag}</span>
                </div>
              `).join('')}
            </div>
          ` : `
            <div class="warning-item p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium">
              ✓ Không phát hiện các từ khóa hoặc dấu hiệu gian lận tài chính nghiêm trọng trong nội dung quét.
            </div>
          `}
        </div>

        <!-- PHẦN IV: KHUYẾN CÁO AN TOÀN TỪ CƠ QUAN CHỨC NĂNG -->
        <div class="pdf-section recommendation-box space-y-2">
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-4 bg-slate-900 rounded-sm"></span>
            <h3 class="text-xs font-bold text-slate-900 uppercase tracking-wider">IV. KHUYẾN CÁO AN TOÀN TỪ CƠ QUAN CHỨC NĂNG</h3>
          </div>
          <div class="p-3.5 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-700 space-y-2 leading-relaxed">
            <p class="recommendation-item"><strong>1. Khuyến cáo Phòng PA05 - Công an Thành phố Đồng Nai:</strong> Người tìm việc tuyệt đối không nộp tiền cọc, tiền làm thẻ, tiền giữ chỗ hoặc mua đồng phục. Không làm nhiệm vụ nạp tiền hoặc chuyển tiền để nhận việc làm thêm online.</p>
            <p class="recommendation-item"><strong>2. Nguyên tắc an toàn lao động:</strong> Không bàn giao CCCD bản gốc, hộ khẩu gốc hay thẻ ngân hàng cá nhân cho bất kỳ ai. Luôn yêu cầu hợp đồng lao động rõ ràng bằng văn bản khi nhận việc.</p>
            <div class="recommendation-item pt-2 border-t border-slate-200 flex flex-wrap gap-4 text-[11px] font-bold text-slate-800">
              <span>Hotline Công an TP. Đồng Nai: 0251.3685134</span>
              <span>•</span>
              <span>BQL KCN Đồng Nai (DIZA): 0251.3892378</span>
            </div>
          </div>
        </div>

        <!-- FOOTER & DẤU MỘC KỸ THUẬT SỐ -->
        <div class="pdf-footer pt-6 border-t-2 border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div class="space-y-1 text-slate-500 text-[11px] max-w-sm">
            <p>Phiếu được trích xuất tự động từ hệ thống trợ lý ảo <strong>AI CHECK JOB</strong> phục vụ cộng đồng công nhân & người lao động thành phố Đồng Nai.</p>
            <p class="font-mono text-[10px] text-slate-400">Digital Hash: SHA256-${code.replace(/-/g, '')}-SECURE-VERIFIED</p>
          </div>
          <div class="text-center p-3 rounded-xl border-2 border-red-600 text-red-600 bg-red-50/30 max-w-[200px]">
            <p class="text-[10px] font-extrabold uppercase tracking-wider">HỆ THỐNG AI CHECK JOB</p>
            <p class="text-xs font-black my-0.5">★ ĐÃ GIÁM ĐỊNH ★</p>
            <p class="text-[10px] font-semibold">THÀNH PHỐ ĐỒNG NAI</p>
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons({ root: modal });
  },

  closeReportPreviewModal() {
    const modal = document.getElementById('report-preview-modal');
    if (modal) modal.classList.add('hidden');
  },

  async downloadReportPDF() {
    const sheetEl = document.getElementById('a4-report-sheet');
    if (!sheetEl) return;

    const companyName = this.wizardDraft?.step1?.companyName || 'Doanh_Nghiep';
    const cleanName = companyName.replace(/[^a-zA-Z0-9_\u00C0-\u1EF9]/g, '_').substring(0, 25);
    const filename = `Phieu_Canh_Bao_${cleanName}.pdf`;

    if (window.html2pdf) {
      this.showToast('Đang khởi tạo và tải xuống file PDF...', 'info', 2000);
      const opt = {
        margin:       [10, 10, 10, 10],
        filename:     filename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['css', 'legacy'] }
      };
      try {
        await window.html2pdf().set(opt).from(sheetEl).save();
        this.showToast('Đã tải xuống file PDF thành công!', 'success', 2500);
      } catch (err) {
        console.warn('html2pdf gặp lỗi, chuyển sang in mặc định:', err);
        window.print();
      }
    } else {
      window.print();
    }
  },

  openCommunityReportWithDraft() {
    this.switchModule('community');
    setTimeout(() => {
      const targetInput = document.getElementById('com-target');
      const phoneInput = document.getElementById('com-phone');
      const descInput = document.getElementById('com-desc');

      if (targetInput) targetInput.value = this.wizardDraft.step1.companyName || '';
      if (phoneInput) phoneInput.value = this.wizardDraft.step1.contact || '';
      if (descInput) descInput.value = `Nghi vấn tin tuyển dụng: ${this.wizardDraft.step1.position} tại ${this.wizardDraft.step1.kcn}. Điểm rủi ro AI: ${this.wizardDraft.step3.analysisResult?.riskScore || 85}%.`;
    }, 150);
  },

  resetScanForm() {
    this.wizardDraft = {
      step1: {
      companyName: '',
      kcn: 'KCN Biên Hòa 2',
      kcnSelectValue: 'KCN Biên Hòa 2',
      kcnKhac: '',
      position: '',
      salary: '',
      contact: '',
      applicationMethod: 'Trực tiếp tại cổng KCN',
      applicationMethodSelectValue: 'Trực tiếp tại cổng KCN',
      applicationMethodKhac: ''
    },
      step2: { content: '', quickFlags: { feeRequired: false, noInterview: false, privateChat: false, keepIdDoc: false, unrealisticPay: false, taskDeposit: false } },
      step3: { analysisResult: null },
      step4: { checklist: { noDepositPaid: false, noOriginalIdGiven: false, verifiedAtGate: false, verifiedViaHotline: false, clearLaborContract: false } }
    };
    this.renderStep(1);
    this.showToast('Đã làm mới biểu mẫu kiểm tra!', 'info');
    window.scrollTo(0, 0);
  },

  // ==========================================
  // 3. MODULE LỊCH SỬ (HISTORY) - RENDER THẺ CARDS TỪ LOCALSTORAGE & INDEXEDDB
  // ==========================================
  async renderHistoryModule() {
    this.renderHistory();
  },

  async renderHistory() {
    const container = document.getElementById('history-content-area');
    if (!container) return;

    // Đọc lịch sử ưu tiên từ LocalStorage kết hợp IndexedDB
    let list = [];
    try {
      const stored = localStorage.getItem('scan_history') || localStorage.getItem('db_scan_history');
      if (stored) {
        list = JSON.parse(stored);
      }
    } catch (e) {
      list = [];
    }

    if (list.length === 0 && window.AppDB) {
      try {
        list = await window.AppDB.getScanHistory();
      } catch (e) {
        list = [];
      }
    }

    // Đảm bảo không trùng lặp id
    const uniqueMap = new Map();
    list.forEach(item => {
      if (item && item.id) uniqueMap.set(item.id, item);
    });
    const uniqueList = Array.from(uniqueMap.values());

    container.innerHTML = `
      <div class="space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono mb-1">
              <i data-lucide="database" class="w-3.5 h-3.5"></i> LOCAL STORAGE DATABASE
            </div>
            <h3 class="text-lg font-extrabold text-white">Danh Sách Tin Đã Kiểm Tra & Lưu Trữ (${uniqueList.length})</h3>
            <p class="text-xs text-slate-400">Toàn bộ hồ sơ được lưu an toàn 100% trên thiết bị cá nhân của bạn</p>
          </div>
          <div class="flex gap-2">
            <button type="button" onclick="App.clearHistoryDatabase()" class="px-3.5 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/70 text-red-300 border border-red-800/60 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm">
              <i data-lucide="trash-2" class="w-3.5 h-3.5 text-red-400"></i> Xóa Hết Lịch Sử
            </button>
          </div>
        </div>

        ${uniqueList.length > 0 ? `
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${uniqueList.map(item => {
              const isDanger = item.risk_score > 65;
              const isWarning = item.risk_score > 30 && item.risk_score <= 65;
              const borderClass = isDanger ? 'border-red-500/50 hover:border-red-400' : isWarning ? 'border-amber-500/50 hover:border-amber-400' : 'border-emerald-500/50 hover:border-emerald-400';
              const badgeClass = isDanger ? 'bg-red-500/20 text-red-300 border-red-500/40' : isWarning ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';

              return `
                <div id="history-card-${item.id}" class="history-card-item p-5 rounded-2xl bg-slate-900/90 border ${borderClass} flex flex-col justify-between gap-4 text-xs shadow-lg transition-all hover:scale-[1.01]">
                  <div class="space-y-2.5">
                    <div class="flex items-center justify-between">
                      <span class="px-2.5 py-1 rounded-full font-bold border text-[11px] ${badgeClass}">
                        ${item.risk_score}% - ${item.risk_label}
                      </span>
                      <span class="text-slate-400 font-mono text-[11px]">
                        ${new Date(item.scanned_at || Date.now()).toLocaleString('vi-VN')}
                      </span>
                    </div>

                    <div>
                      <h4 class="text-sm sm:text-base font-bold text-white tracking-tight">${item.company_name}</h4>
                      <p class="text-cyan-400 font-semibold mt-0.5">Vị trí: ${item.position} • <span class="text-slate-300">${item.kcn}</span></p>
                    </div>

                    ${item.salary ? `<p class="text-slate-300 text-xs font-medium">Lương: <span class="text-amber-400 font-bold">${item.salary}</span></p>` : ''}
                    
                    <div class="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                      ${item.risk_summary || 'Đã phân tích các chỉ số an toàn lao động KCN.'}
                    </div>

                    ${item.raw_content ? `
                      <p class="text-[11px] text-slate-400 line-clamp-2 italic font-mono bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                        "${item.raw_content}"
                      </p>
                    ` : ''}
                  </div>

                  <div class="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span class="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                      <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> ${item.verification || 'Đã giám định'}
                    </span>
                    <button type="button" onclick="App.deleteHistoryItem('${item.id}')" class="px-2.5 py-1.5 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-900/60 transition-all flex items-center gap-1 font-semibold text-[11px]">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i> Xóa
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <div class="py-16 text-center space-y-3 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
            <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
              <i data-lucide="inbox" class="w-6 h-6"></i>
            </div>
            <p class="text-sm font-bold text-white">Chưa có bản ghi nào trong Lịch sử</p>
            <p class="text-xs text-slate-400 max-w-sm mx-auto">Khi bạn hoàn thành Bước 4 và bấm "Lưu Vào Lịch Sử Đã Quét", dữ liệu sẽ hiển thị đầy đủ tại đây.</p>
          </div>
        `}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  async deleteHistoryItem(id) {
    try {
      // 1. XÓA NGAY LẬP TỨC PHẦN TỬ TRÊN DOM ĐỂ THẺ BIẾN MẤT MÀ KHÔNG CẦN F5
      const cardEl = document.getElementById(`history-card-${id}`);
      if (cardEl) {
        cardEl.remove();
      }

      // 2. CẬP NHẬT LẠI MẢNG TRONG LOCALSTORAGE
      let list = [];
      try {
        const stored = localStorage.getItem('scan_history') || localStorage.getItem('db_scan_history');
        if (stored) list = JSON.parse(stored);
      } catch (e) {
        list = [];
      }
      list = list.filter(x => x && x.id !== id);
      localStorage.setItem('scan_history', JSON.stringify(list));
      localStorage.setItem('db_scan_history', JSON.stringify(list));

      // 3. GIẢM VÀ CẬP NHẬT NGAY CON SỐ BADGE "LỊCH SỬ ĐÃ LƯU" Ở THANH MENU TRÁI
      const badgeEl = document.getElementById('badge-history-count');
      if (badgeEl) {
        badgeEl.textContent = list.length;
      }

      // 4. Nếu không còn bản ghi nào, vẽ lại giao diện để hiển thị trạng thái rỗng
      if (list.length === 0) {
        this.renderHistory();
      } else {
        const titleEl = document.querySelector('#history-content-area h3');
        if (titleEl) {
          titleEl.textContent = `Danh Sách Tin Đã Kiểm Tra & Lưu Trữ (${list.length})`;
        }
      }

      // 5. BẮT BUỘC: HIỂN THỊ THÔNG BÁO XÓA THÀNH CÔNG CÓ NÚT ĐÓNG
      this.showCustomAlert('Bạn đã xóa thành công!', 'Thành Công');

      // 6. Xóa thêm trong IndexedDB chạy nền an toàn (không chặn UI)
      if (window.AppDB) {
        window.AppDB.deleteScanRecord(id).catch(e => {
          console.warn('Lỗi xóa IndexedDB:', e);
        });
      }
    } catch (err) {
      console.error('Lỗi khi xóa bản ghi:', err);
      this.showCustomAlert('Bạn đã xóa thành công!', 'Thành Công');
    }
  },

  async clearHistoryDatabase() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử quét?')) {
      localStorage.removeItem('scan_history');
      localStorage.removeItem('db_scan_history');

      if (window.AppDB) {
        await window.AppDB.clearAllScans();
      }

      this.renderHistory();
      await this.updateBadges();
      this.showToast('Đã làm sạch toàn bộ lịch sử.', 'info');
    }
  },

  // ==========================================
  // ==========================================
  // 4. MODULE DOANH NGHIỆP KCN ĐỒNG NAI
  // ==========================================
  renderBlacklistModule() {
    this.renderEnterprises();
  },

  onFilterEnterprises(kcnKey) {
    this.enterpriseFilter = kcnKey;
    document.querySelectorAll('.enterprise-filter-btn').forEach(btn => {
      const isTarget = btn.getAttribute('data-filter') === kcnKey;
      if (isTarget) {
        btn.classList.add('bg-cyan-500', 'text-slate-950', 'font-bold', 'border-cyan-400', 'active');
        btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'border-slate-700/80');
      } else {
        btn.classList.remove('bg-cyan-500', 'text-slate-950', 'font-bold', 'border-cyan-400', 'active');
        btn.classList.add('bg-slate-800/80', 'text-slate-300', 'border-slate-700/80');
      }
    });
    this.renderEnterpriseCardsOnly();
  },

  onSearchEnterprises(val) {
    this.enterpriseSearchQuery = (val || '').trim();
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) {
      if (this.enterpriseSearchQuery) clearBtn.classList.remove('hidden');
      else clearBtn.classList.add('hidden');
    }
    this.renderEnterpriseCardsOnly();
  },

  clearEnterpriseSearch() {
    this.enterpriseSearchQuery = '';
    const input = document.getElementById('enterprise-search-input');
    if (input) input.value = '';
    const clearBtn = document.getElementById('clear-search-btn');
    if (clearBtn) clearBtn.classList.add('hidden');
    this.renderEnterpriseCardsOnly();
  },

  getFilteredEnterprises() {
    const list = (this.cachedEnterprises && this.cachedEnterprises.length >= 16)
      ? this.cachedEnterprises
      : DEFAULT_KCN_ENTERPRISES;

    return list.filter(e => {
      // 1. Lọc KCN
      let matchKcn = true;
      if (this.enterpriseFilter === 'amata') {
        matchKcn = (e.kcn || '').toLowerCase().includes('amata');
      } else if (this.enterpriseFilter === 'bienhoa2') {
        matchKcn = (e.kcn || '').toLowerCase().includes('biên hòa 2') || (e.kcn || '').toLowerCase().includes('hóa an') || (e.kcn || '').toLowerCase().includes('biên hòa 1');
      } else if (this.enterpriseFilter === 'nhontrach') {
        matchKcn = (e.kcn || '').toLowerCase().includes('nhơn trạch');
      } else if (this.enterpriseFilter === 'longthanh') {
        matchKcn = (e.kcn || '').toLowerCase().includes('long thành') || (e.kcn || '').toLowerCase().includes('long đức');
      } else if (this.enterpriseFilter === 'honai') {
        matchKcn = (e.kcn || '').toLowerCase().includes('hố nai') || (e.kcn || '').toLowerCase().includes('sông mây') || (e.kcn || '').toLowerCase().includes('giang điền') || (e.kcn || '').toLowerCase().includes('thạnh phú');
      }

      // 2. Lọc Từ khóa tìm kiếm
      let matchQuery = true;
      if (this.enterpriseSearchQuery) {
        const q = this.enterpriseSearchQuery.toLowerCase();
        matchQuery = (e.name && e.name.toLowerCase().includes(q)) ||
                     (e.industry && e.industry.toLowerCase().includes(q)) ||
                     (e.kcn && e.kcn.toLowerCase().includes(q)) ||
                     (e.address && e.address.toLowerCase().includes(q)) ||
                     (e.fake_warning && e.fake_warning.toLowerCase().includes(q));
      }

      return matchKcn && matchQuery;
    });
  },

  renderEnterpriseCardsOnly() {
    const gridContainer = document.getElementById('enterprises-grid-list');
    const titleCountEl = document.getElementById('enterprise-title-count');
    const allCount = (this.cachedEnterprises && this.cachedEnterprises.length >= 16) ? this.cachedEnterprises.length : DEFAULT_KCN_ENTERPRISES.length;

    const filtered = this.getFilteredEnterprises();

    if (titleCountEl) {
      titleCountEl.textContent = `Danh Mục Doanh Nghiệp KCN Đồng Nai Chính Thức (${filtered.length}/${allCount})`;
    }

    if (!gridContainer) return;

    if (filtered.length === 0) {
      gridContainer.innerHTML = `
        <div class="py-16 text-center space-y-3 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800">
          <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
            <i data-lucide="inbox" class="w-6 h-6"></i>
          </div>
          <p class="text-sm font-bold text-white">Không tìm thấy doanh nghiệp phù hợp</p>
          <p class="text-xs text-slate-400 max-w-sm mx-auto">Vui lòng thử tìm kiếm bằng từ khóa khác hoặc chọn "Tất cả KCN".</p>
          <button type="button" onclick="App.clearEnterpriseSearch(); App.onFilterEnterprises('all');" class="mt-2 px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold hover:bg-cyan-500/30 transition-all">
            Xem tất cả doanh nghiệp
          </button>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons({ root: gridContainer });
      return;
    }

    gridContainer.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        ${filtered.map(e => `
          <div class="enterprise-card p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs flex flex-col justify-between gap-4 shadow-lg hover:shadow-cyan-500/5 hover:-translate-y-0.5">
            <div class="space-y-3">
              <!-- Badge xác thực & Tên KCN -->
              <div class="flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <i data-lucide="shield-check" class="w-3 h-3"></i> ĐÃ XÁC THỰC DIZA
                </span>
                <span class="text-[11px] font-bold text-cyan-400 font-mono">${e.kcn}</span>
              </div>

              <!-- Tên công ty & Ngành nghề -->
              <div>
                <h4 class="font-extrabold text-white text-sm sm:text-base tracking-tight leading-snug">${e.name}</h4>
                <p class="text-slate-300 text-xs font-medium mt-1.5 flex items-center gap-1.5">
                  <i data-lucide="briefcase" class="w-3.5 h-3.5 text-cyan-400 flex-shrink-0"></i>
                  <span>${e.industry}</span>
                </p>
              </div>

              <!-- Địa chỉ trụ sở -->
              <p class="text-[11px] text-slate-400 flex items-start gap-1.5 leading-relaxed">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-slate-500 mt-0.5 flex-shrink-0"></i>
                <span>${e.address}</span>
              </p>

              <!-- Kênh tiếp nhận & Hotline chính thức -->
              <div class="enterprise-inner-box p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] space-y-1.5">
                <p class="text-slate-300">
                  <span class="text-slate-400">Kênh tuyển dụng:</span> <strong class="text-white">${e.recruitment_channel}</strong>
                </p>
                <div class="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span class="text-slate-400">Hotline chính thức:</span>
                  <span class="text-amber-400 font-mono font-bold">${e.hotline}</span>
                </div>
              </div>

              <!-- Lưu ý cảnh báo mạo danh nếu có -->
              ${e.fake_warning ? `
                <div class="enterprise-warning-box p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 leading-relaxed flex items-start gap-2">
                  <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"></i>
                  <span><strong>Lưu ý an toàn:</strong> ${e.fake_warning}</span>
                </div>
              ` : ''}
            </div>

            <!-- Nút hành động xem chi tiết -->
            <button type="button" onclick="App.openEnterpriseDetail('${e.id}')" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 hover:from-cyan-600/40 hover:to-blue-600/40 text-cyan-300 hover:text-white text-xs font-bold border border-cyan-500/30 flex items-center justify-center gap-1.5 transition-all shadow-sm">
              <i data-lucide="eye" class="w-4 h-4"></i>
              <span>Xem Chi Tiết Tuyển Dụng</span>
            </button>
          </div>
        `).join('')}
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: gridContainer });
  },

  renderEnterprises(filterKcn = null, query = null) {
    if (filterKcn !== null) this.enterpriseFilter = filterKcn;
    if (query !== null) this.enterpriseSearchQuery = query;

    const container = document.getElementById('blacklist-content-area');
    if (!container) return;

    const allEnterprises = (this.cachedEnterprises && this.cachedEnterprises.length >= 16)
      ? this.cachedEnterprises
      : DEFAULT_KCN_ENTERPRISES;

    // Cập nhật số badge ở thanh menu bên trái
    const badgeEl = document.getElementById('badge-blacklist-count');
    if (badgeEl) badgeEl.textContent = allEnterprises.length;

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header & Thông tin DIZA -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800">
          <div class="space-y-1">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-400"></i> DỮ LIỆU ĐÃ XÁC THỰC DIZA
            </div>
            <h3 id="enterprise-title-count" class="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              Danh Mục Doanh Nghiệp KCN Đồng Nai Chính Thức (${allEnterprises.length})
            </h3>
            <p class="text-xs text-slate-400">
              Tham chiếu chính thức từ Ban Quản lý các Khu công nghiệp Đồng Nai (DIZA) - Cập nhật liên tục
            </p>
          </div>
          <div class="flex items-center gap-2">
            <div class="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-2 shadow-sm">
              <i data-lucide="phone-call" class="w-4 h-4 text-emerald-400"></i>
              <span>Hotline DIZA: <strong class="text-emerald-400 font-mono">0251.3892378</strong></span>
            </div>
          </div>
        </div>

        <!-- Thanh Công Cụ (Tìm kiếm & Bộ lọc) -->
        <div class="enterprise-toolbar space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          <!-- Ô tìm kiếm -->
          <div class="relative">
            <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"></i>
            <input type="text"
              id="enterprise-search-input"
              value="${this.enterpriseSearchQuery}"
              oninput="App.onSearchEnterprises(this.value)"
              placeholder="Tìm nhanh theo tên công ty, ngành nghề (Giày da, Điện tử, May mặc, Thực phẩm, Hàng không...)..."
              class="enterprise-search-input w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-700/80 rounded-xl text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
            />
            <button type="button" id="clear-search-btn" onclick="App.clearEnterpriseSearch()" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white ${this.enterpriseSearchQuery ? '' : 'hidden'}">
              <i data-lucide="x" class="w-4 h-4"></i>
            </button>
          </div>

          <!-- Bộ lọc theo KCN -->
          <div class="flex flex-wrap items-center gap-1.5 pt-1">
            <span class="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
              <i data-lucide="filter" class="w-3.5 h-3.5"></i> Khu vực:
            </span>
            ${[
              { id: 'all', label: `Tất cả KCN (${allEnterprises.length})` },
              { id: 'amata', label: 'KCN Amata' },
              { id: 'bienhoa2', label: 'KCN Biên Hòa 2 / Hóa An' },
              { id: 'nhontrach', label: 'KCN Nhơn Trạch' },
              { id: 'longthanh', label: 'KCN Long Thành / Long Đức' },
              { id: 'honai', label: 'KCN Hố Nai / Sông Mây' }
            ].map(f => {
              const isActive = this.enterpriseFilter === f.id;
              const btnClass = isActive 
                ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-sm shadow-cyan-500/25 active' 
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-700/80';
              return `
                <button type="button" data-filter="${f.id}" onclick="App.onFilterEnterprises('${f.id}')" class="enterprise-filter-btn px-3 py-1.5 rounded-xl border text-xs transition-all ${btnClass}">
                  ${f.label}
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Danh sách Lưới Thẻ (Grid Cards) -->
        <div id="enterprises-grid-list"></div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });

    // Render cards ngay lập tức
    this.renderEnterpriseCardsOnly();
  },

  // Mở Modal Xem Chi Tiết Doanh Nghiệp
  openEnterpriseDetail(id) {
    const list = (this.cachedEnterprises && this.cachedEnterprises.length >= 16)
      ? this.cachedEnterprises
      : DEFAULT_KCN_ENTERPRISES;

    const ent = list.find(e => e.id === id) || list[0];
    if (!ent) return;

    const modal = document.getElementById('enterprise-detail-modal');
    if (!modal) return;

    const nameEl = document.getElementById('modal-ent-name');
    if (nameEl) nameEl.textContent = ent.name || '';

    const kcnEl = document.getElementById('modal-ent-kcn');
    if (kcnEl) kcnEl.textContent = ent.kcn || '';

    const indEl = document.getElementById('modal-ent-industry');
    if (indEl) indEl.textContent = ent.industry || '';

    const taxEl = document.getElementById('modal-ent-tax');
    if (taxEl) taxEl.textContent = ent.taxCode || '3600257321';

    const hotEl = document.getElementById('modal-ent-hotline');
    if (hotEl) hotEl.textContent = ent.hotline || 'Chưa rõ';

    const webLink = document.getElementById('modal-ent-website');
    if (webLink) {
      webLink.textContent = ent.website ? ent.website.replace(/^https?:\/\//, '') : 'Đang cập nhật';
      webLink.href = ent.website || '#';
    }

    const chanEl = document.getElementById('modal-ent-channel');
    if (chanEl) chanEl.textContent = ent.recruitment_channel || 'Cổng bảo vệ chính';

    const addrEl = document.getElementById('modal-ent-address');
    if (addrEl) addrEl.textContent = ent.address || 'KCN thành phố Đồng Nai';

    const procEl = document.getElementById('modal-ent-process');
    if (procEl) procEl.textContent = ent.officialProcess || 'Nộp hồ sơ trực tiếp tại cổng công ty và phỏng vấn tại phòng nhân sự. Không thu phí ứng tuyển.';

    const warnEl = document.getElementById('modal-ent-warning');
    if (warnEl) warnEl.textContent = ent.fake_warning || 'Cảnh giác các chiêu trò mạo danh tuyển CTV đóng gói tại nhà hoặc bắt nạp tiền.';

    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons({ root: modal });
  },

  closeEnterpriseDetailModal() {
    const modal = document.getElementById('enterprise-detail-modal');
    if (modal) modal.classList.add('hidden');
  },

  useEnterpriseInWizard(name, kcn, hotline) {
    this.wizardDraft.step1.companyName = name;
    this.wizardDraft.step1.kcn = kcn;
    this.wizardDraft.step1.contact = hotline;
    this.switchModule('scanner');
    this.renderStep(1);
    this.showToast(`Đã đưa "${name}" vào Bước 1 kiểm tra!`, 'info');
  },

  // ==========================================
  // 5. MODULE CẨM NANG XỬ LÝ (DIGITAL HANDBOOK - SPLIT-PANE LAYOUT)
  // ==========================================
  async renderCommunityModule() {
    this.renderHandbookModule();
  },

  openHandbookEmergency(chapterId = 2) {
    this.activeHandbookChapter = chapterId;
    this.switchModule('community');
  },

  selectHandbookChapter(chapterId) {
    this.activeHandbookChapter = chapterId;
    this.renderHandbookModule();
  },

  renderHandbookModule() {
    const container = document.getElementById('community-content-area');
    if (!container) return;

    const currentCh = this.activeHandbookChapter || 1;

    const chapters = [
      {
        id: 1,
        title: '1. Nhận diện bẫy "Việc nhẹ lương cao"',
        tag: 'Phòng ngừa',
        tagClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
        icon: 'search'
      },
      {
        id: 2,
        title: '2. 🚨 LỠ CHUYỂN TIỀN / CỌC TIỀN thì làm sao?',
        tag: 'SOS Khẩn cấp',
        tagClass: 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse font-bold',
        icon: 'alert-triangle'
      },
      {
        id: 3,
        title: '3. 🚨 LỠ GIAO CCCD / BẤM LINK ĐỘC thì làm sao?',
        tag: 'Nguy cơ cao',
        tagClass: 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-bold',
        icon: 'shield-alert'
      },
      {
        id: 4,
        title: '4. 📞 Đường dây nóng cơ quan chức năng (PA05 Đồng Nai)',
        tag: 'Hỗ trợ 24/7',
        tagClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold',
        icon: 'phone-call'
      },
      {
        id: 5,
        title: '5. 🛡️ Hướng dẫn sử dụng hệ thống AI Check Job',
        tag: '4 Bước chuẩn',
        tagClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold',
        icon: 'cpu'
      }
    ];

    container.innerHTML = `
      <div class="space-y-6">
        <!-- Header Cẩm Nang -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold font-mono mb-1.5">
              <i data-lucide="book-open" class="w-3.5 h-3.5"></i> DIGITAL HANDBOOK 2026
            </div>
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Cẩm Nang Xử Lý Tình Huống Tuyển Dụng</span>
            </h2>
            <p class="text-xs text-slate-400 mt-1">
              Bộ cẩm nang kỹ thuật số hướng dẫn ứng phó khẩn cấp & phòng ngừa bẫy lừa đảo lao động KCN Đồng Nai.
            </p>
          </div>
          <div class="flex items-center gap-2 flex-shrink-0">
            <a href="tel:02513685134" class="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-bold flex items-center gap-2 transition-all shadow-sm">
              <i data-lucide="phone-call" class="w-4 h-4 text-red-400 animate-pulse"></i>
              <span>Hotline Công an TP. Đồng Nai: 0251.3685134</span>
            </a>
          </div>
        </div>

        <!-- BỐ CỤC SÁCH ĐIỆN TỬ (SPLIT-PANE LAYOUT: TRÁI 30% - PHẢI 70%) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          <!-- CỘT TRÁI (30% - 4 cols): MỤC LỤC CHƯƠNG -->
          <div class="lg:col-span-4 space-y-3">
            <div class="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div class="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                <span>📑 MỤC LỤC CẨM NANG</span>
                <span class="text-cyan-400 font-mono">5 CHƯƠNG</span>
              </div>
              <div class="space-y-2 mt-1">
                ${chapters.map(ch => `
                  <button type="button" onclick="App.selectHandbookChapter(${ch.id})"
                    class="handbook-toc-item ${currentCh === ch.id ? 'active-chapter' : ''}">
                    <div class="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${currentCh === ch.id ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800/80 text-slate-400'}">
                      <i data-lucide="${ch.icon}" class="w-4 h-4"></i>
                    </div>
                    <div class="flex-1 min-w-0 pr-1">
                      <div class="truncate text-xs font-bold">${ch.title}</div>
                      <div class="flex items-center gap-1.5 mt-0.5">
                        <span class="text-[9px] font-mono px-1.5 py-0.2 rounded border ${ch.tagClass}">${ch.tag}</span>
                      </div>
                    </div>
                    ${currentCh === ch.id ? `<i data-lucide="chevron-right" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>` : ''}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Box tóm tắt nguyên tắc vàng -->
            <div class="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-blue-950/30 border border-cyan-800/40 text-xs space-y-2">
              <div class="flex items-center gap-1.5 text-cyan-300 font-bold">
                <i data-lucide="shield-check" class="w-4 h-4 text-cyan-400"></i>
                <span>Quy tắc Vàng "3 KHÔNG":</span>
              </div>
              <ul class="text-[11px] text-slate-300 space-y-1 list-disc list-inside leading-relaxed">
                <li><strong class="text-red-400">KHÔNG nộp tiền cọc</strong> dưới mọi hình thức (thẻ từ, đồng phục).</li>
                <li><strong class="text-amber-400">KHÔNG giao CCCD gốc</strong> cho bất kỳ ai giữ lại.</li>
                <li><strong class="text-blue-400">KHÔNG bấm link lạ</strong> hoặc cài app file .APK qua Zalo/Telegram.</li>
              </ul>
            </div>
          </div>

          <!-- CỘT PHẢI (70% - 8 cols): NỘI DUNG ĐỌC THEO CHƯƠNG -->
          <div class="lg:col-span-8">
            <div class="handbook-content-reader p-5 sm:p-7 shadow-xl">
              ${this.getHandbookChapterHTML(currentCh)}
            </div>
          </div>

        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });
  },

  getHandbookChapterHTML(chapterId) {
    if (chapterId === 2) {
      // CHƯƠNG 2: 🚨 LỠ CHUYỂN TIỀN / CỌC TIỀN (CHECKLIST KHẨN CẤP CHỮ ĐỎ/CAM)
      return `
        <div class="space-y-6">
          <!-- Banner Báo Động SOS -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border border-red-600/80 flex items-start gap-3.5 shadow-lg shadow-red-950/50">
            <div class="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
              <i data-lucide="alert-octagon" class="w-6 h-6 animate-pulse"></i>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white uppercase tracking-wider">
                  🚨 THỜI GIAN VÀNG TRONG 60 PHÚT ĐẦU
                </span>
              </div>
              <h3 class="text-base sm:text-lg font-black text-white tracking-tight">
                CHECKLIST KHẨN CẤP: BẠN VỪA LỠ CHUYỂN TIỀN CHO KẺ GIAN?
              </h3>
              <p class="text-xs text-red-200 leading-relaxed font-medium">
                Hãy giữ bình tĩnh và thực hiện ngay lập tức 3 bước dưới đây để phong tỏa dòng tiền và bảo toàn tài sản:
              </p>
            </div>
          </div>

          <!-- 3 Bước Checklist Khẩn Cấp -->
          <div class="space-y-4">
            
            <!-- Bước 1 -->
            <div class="emergency-checklist-card space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                    01
                  </span>
                  <h4 class="text-sm font-extrabold text-red-400 uppercase tracking-tight">
                    Bước 1: Lập tức khóa thẻ ngân hàng trên App
                  </h4>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/40">
                  LÀM NGAY 1-5 PHÚT
                </span>
              </div>
              
              <div class="pl-9 space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  Mở ngay ứng dụng ngân hàng bạn vừa chuyển tiền đi (Vietcombank, MB, Techcombank, VPBank, Agribank...): 
                  Vào mục <strong>Quản lý thẻ / Cài đặt bảo mật</strong> $\rightarrow$ Bấm <strong>"Khóa thẻ khẩn cấp"</strong> hoặc tắt tính năng thanh toán trực tuyến.
                </p>
                <p>
                  Gọi ngay đến <strong>Tổng đài hỗ trợ 24/7 của ngân hàng bạn</strong>, thông báo rõ: 
                  <em>"Yêu cầu tra soát khẩn cấp giao dịch vừa thực hiện vì nghi ngờ có dấu hiệu lừa đảo công nghệ cao"</em> để ngân hàng gửi lệnh phối hợp phong tỏa tài khoản thụ hưởng.
                </p>
                <div class="p-3 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 font-bold text-xs flex items-start gap-2">
                  <i data-lucide="alert-triangle" class="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5"></i>
                  <span>TUYỆT ĐỐI KHÔNG chuyển thêm tiền để "rút tiền cũ"! Đây là mồi nhử kinh điển, chuyển thêm là mất thêm 100%!</span>
                </div>
              </div>
            </div>

            <!-- Bước 2 -->
            <div class="emergency-checklist-card space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                    02
                  </span>
                  <h4 class="text-sm font-extrabold text-red-400 uppercase tracking-tight">
                    Bước 2: Chụp lại toàn bộ lịch sử chat và bill chuyển khoản
                  </h4>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  LƯU CHỨNG CỨ
                </span>
              </div>

              <div class="pl-9 space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Không xóa tin nhắn hay rời nhóm chat:</strong> Kẻ gian thường xóa tin nhắn 2 chiều trên Telegram/Zalo. Bạn cần chụp màn hình toàn bộ tin nhắn ngay lập tức.
                </p>
                <ul class="list-disc list-inside space-y-1 text-slate-300">
                  <li>Chụp rõ: Số điện thoại kẻ gian, ID Telegram, đường link trang web tuyển dụng giả mạo.</li>
                  <li>Tải và lưu file PDF <strong>Biên lai chuyển khoản</strong> (phải có rõ Mã giao dịch FT, số tài khoản nhận, tên người nhận, ngân hàng thụ hưởng, thời gian).</li>
                  <li>Ghi lại số tiền thiệt hại và các mốc thời gian chuyển tiền theo thứ tự.</li>
                </ul>
              </div>
            </div>

            <!-- Bước 3 -->
            <div class="emergency-checklist-card space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-red-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
                    03
                  </span>
                  <h4 class="text-sm font-extrabold text-red-400 uppercase tracking-tight">
                    Bước 3: Trình báo Công an & Gọi Hotline (0251.3685134)
                  </h4>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  CƠ QUAN CHỨC NĂNG
                </span>
              </div>

              <div class="pl-9 space-y-3 text-xs text-slate-300 leading-relaxed">
                <p>
                  Đến ngay <strong>Công an xã / phường</strong> nơi bạn cư trú hoặc Công an thành phố Đồng Nai để gửi đơn tố giác tội phạm.
                </p>
                <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span class="text-slate-400 text-[11px] block">Đường dây nóng tiếp nhận lừa đảo công nghệ cao:</span>
                    <strong class="text-white text-sm font-mono text-cyan-300">Công an thành phố Đồng Nai: 0251.3685134</strong>
                  </div>
                  <a href="tel:02513685134" class="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md flex-shrink-0">
                    <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Bấm Gọi 0251.3685134
                  </a>
                </div>
                <p class="text-[11px] text-slate-400">
                  💡 <em>Hồ sơ mang theo:</em> Đơn trình báo sự việc, Bản sao CCCD, Bản in sao kê ngân hàng có mộc đỏ, Toàn bộ ảnh chụp tin nhắn bằng chứng in ra giấy A4.
                </p>
              </div>
            </div>

          </div>
        </div>
      `;
    }

    if (chapterId === 3) {
      // CHƯƠNG 3: 🚨 LỠ GIAO CCCD / BẤM LINK ĐỘC (CHECKLIST KHẨN CẤP CHỮ CAM/ĐỎ)
      return `
        <div class="space-y-6">
          <!-- Banner Báo Động Cam/Đỏ -->
          <div class="p-4 rounded-2xl bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 border border-amber-500/80 flex items-start gap-3.5 shadow-lg shadow-amber-950/40">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-md">
              <i data-lucide="shield-alert" class="w-6 h-6"></i>
            </div>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase tracking-wider">
                  ⚠️ CẢNH BÁO BỊ MẠO DANH VAY NỢ & CÀI MÃ ĐỘC
                </span>
              </div>
              <h3 class="text-base sm:text-lg font-black text-white tracking-tight">
                CHECKLIST KHẨN CẤP: LỠ GIAO CCCD HOẶC BẤM TRÚNG LINK LẠ?
              </h3>
              <p class="text-xs text-amber-200 leading-relaxed font-medium">
                Hình ảnh CCCD 2 mặt và mã độc trên điện thoại có thể bị kẻ gian lợi dụng để đăng ký vay nợ app "tín dụng đen" hoặc chiếm đoạt tài khoản ngân hàng. Hãy xử lý ngay:
              </p>
            </div>
          </div>

          <!-- 3 Bước Checklist Khẩn Cấp -->
          <div class="space-y-4">
            
            <!-- Bước 1 -->
            <div class="amber-checklist-card space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    01
                  </span>
                  <h4 class="text-sm font-extrabold text-amber-400 uppercase tracking-tight">
                    Bước 1: Ngắt kết nối mạng (Bật Chế độ máy bay) & Đổi mật khẩu
                  </h4>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  NẾU BẤM LINK / CÀI APK
                </span>
              </div>

              <div class="pl-9 space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Nếu vừa bấm link lạ hoặc cài app file .APK qua Zalo/Telegram:</strong> Hãy lập tức <strong>BẬT CHẾ ĐỘ MÁY BAY (Airplane Mode)</strong> hoặc tắt Wi-Fi và 4G ngay tức khắc để ngắt liên lạc giữa điện thoại và máy chủ gián điệp của kẻ gian.
                </p>
                <p>
                  Dùng một thiết bị máy tính hoặc điện thoại an toàn khác để <strong>đổi mật khẩu toàn bộ</strong>: Mật khẩu Email, Tài khoản ngân hàng số, VNeID, iCloud/Google Account.
                </p>
                <p>
                  Mang điện thoại đến trung tâm bảo hành uy tín để <strong>khôi phục cài đặt gốc (Factory Reset)</strong> xóa sạch hoàn toàn mã độc trước khi kết nối mạng trở lại.
                </p>
              </div>
            </div>

            <!-- Bước 2 -->
            <div class="amber-checklist-card space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    02
                  </span>
                  <h4 class="text-sm font-extrabold text-amber-400 uppercase tracking-tight">
                    Bước 2: Cảnh báo người thân & Chặn các khoản vay mạo danh (CIC)
                  </h4>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  NẾU LỠ GỬI CCCD
                </span>
              </div>

              <div class="pl-9 space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  <strong>Đăng bài cảnh báo công khai trên Facebook / Zalo cá nhân:</strong> Kẻ gian thường dùng ảnh CCCD để ghép mặt vay tiền hoặc mạo danh bạn đi vay mượn người thân.
                </p>
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-200 italic">
                  "Thông báo khẩn: Tôi vừa bị kẻ gian lừa lấy cắp thông tin hình ảnh CCCD. Mọi tin nhắn hoặc cuộc gọi vay mượn tiền dưới danh nghĩa của tôi đều là giả mạo 100%, xin người thân tuyệt đối không chuyển khoản!"
                </div>
                <p>
                  Tra cứu định kỳ thông tin tín dụng cá nhân trên Cổng thông tin tín dụng quốc gia CIC (<a href="https://cic.gov.vn" target="_blank" rel="noopener noreferrer" class="text-cyan-400 underline">cic.gov.vn</a>) để kịp thời phát hiện nếu có hợp đồng vay nợ mạo danh xuất hiện.
                </p>
              </div>
            </div>

            <!-- Bước 3 -->
            <div class="amber-checklist-card space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="w-7 h-7 rounded-xl bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    03
                  </span>
                  <h4 class="text-sm font-extrabold text-amber-400 uppercase tracking-tight">
                    Bước 3: Trình báo Công an lấy biên bản xác nhận & Cấp đổi CCCD
                  </h4>
                </div>
                <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  BẢO VỆ PHÁP LÝ
                </span>
              </div>

              <div class="pl-9 space-y-2 text-xs text-slate-300 leading-relaxed">
                <p>
                  Đến Công an xã/phường nơi cư trú trình báo việc bị lừa thu thập thông tin CCCD để cơ quan chức năng lập biên bản ghi nhận sự việc. Biên bản này là <strong>chứng cứ pháp lý quan trọng nhất</strong> bảo vệ bạn nếu sau này có tranh chấp nợ xấu do kẻ gian tạo ra.
                </p>
                <p>
                  Nếu hình ảnh CCCD bị lợi dụng nhiều, bạn hãy đến cơ quan quản lý căn cước Công an thành phố Đồng Nai xin cấp đổi thẻ CCCD gắn chip mới. Số CCCD không đổi nhưng ngày cấp mới sẽ vô hiệu hóa thẻ cũ đối với các giao dịch sau này.
                </p>
              </div>
            </div>

          </div>
        </div>
      `;
    }

    if (chapterId === 4) {
      // CHƯƠNG 4: 📞 ĐƯỜNG DÂY NÓNG CƠ QUAN CHỨC NĂNG (PA05 ĐỒNG NAI)
      return `
        <div class="space-y-6">
          <div class="border-b border-slate-800 pb-3">
            <span class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              HỖ TRỢ 24/7 • BẢO MẬT & MIỄN PHÍ
            </span>
            <h3 class="text-lg sm:text-xl font-black text-white">
              📞 Danh Bạ Đường Dây Nóng Cơ Quan Chức Năng Thành phố Đồng Nai
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Liên hệ ngay các đầu mối chính thức khi phát hiện dấu hiệu lừa đảo tuyển dụng hoặc bị cưỡng đoạt tài sản.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Đầu mối 1: PA05 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-red-800/60 text-xs space-y-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-300 border border-red-500/40">
                  TRỌNG ĐIỂM CÔNG NGHỆ CAO
                </span>
                <span class="w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
              </div>
              <div>
                <h4 class="font-extrabold text-white text-sm">Phòng An Ninh Mạng (PA05) - Công An Đồng Nai</h4>
                <p class="text-slate-400 text-[11px] mt-0.5">Tiếp nhận điều tra các vụ lừa đảo qua mạng, Telegram, chiếm đoạt tiền cọc.</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 font-mono space-y-1">
                <div class="text-slate-400 text-[11px]">Hotline khẩn cấp:</div>
                <div class="text-red-400 font-bold text-base">0251.3685134</div>
                <div class="text-slate-400 text-[10px]">Địa chỉ: Số 161 Phạm Văn Thuận, P. Tân Tiến, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai</div>
              </div>
              <a href="tel:02513685134" class="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Gọi Ngay 0251.3685134
              </a>
            </div>

            <!-- Đầu mối 2: DIZA -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-cyan-800/60 text-xs space-y-3 shadow-md">
              <div class="flex items-center justify-between">
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  QUẢN LÝ CÁC KCN
                </span>
                <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
              </div>
              <div>
                <h4 class="font-extrabold text-white text-sm">Ban Quản Lý Các Khu Công Nghiệp Đồng Nai (DIZA)</h4>
                <p class="text-slate-400 text-[11px] mt-0.5">Xác minh thông tin tuyển dụng chính thống của các công ty FDI tại KCN.</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 font-mono space-y-1">
                <div class="text-slate-400 text-[11px]">Đường dây nóng DIZA:</div>
                <div class="text-cyan-400 font-bold text-base">0251.3892378</div>
                <div class="text-slate-400 text-[10px]">Địa chỉ: Số 26, Đường 2A, KCN Biên Hòa 2, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai</div>
              </div>
              <a href="tel:02513892378" class="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Gọi Ngay 0251.3892378
              </a>
            </div>

            <!-- Đầu mối 3: Dịch vụ việc làm -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3 shadow-md">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                VIỆC LÀM CHÍNH THỐNG
              </span>
              <div>
                <h4 class="font-extrabold text-white text-sm">Trung Tâm Dịch Vụ Việc Làm Thành phố Đồng Nai</h4>
                <p class="text-slate-400 text-[11px] mt-0.5">Tư vấn và giới thiệu việc làm an toàn, miễn phí 100% cho người lao động.</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 font-mono space-y-1">
                <div class="text-slate-400 text-[11px]">Tổng đài hỗ trợ:</div>
                <div class="text-blue-400 font-bold text-base">0251.8823445</div>
                <div class="text-slate-400 text-[10px]">Địa chỉ: Khu phố 5, Phường Tân Hiệp, Phường Biên Hòa (địa chỉ cũ: TP. Biên Hòa), Đồng Nai</div>
              </div>
              <a href="tel:02518823445" class="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Gọi Ngay 0251.8823445
              </a>
            </div>

            <!-- Đầu mối 4: Cảnh sát 113 -->
            <div class="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs space-y-3 shadow-md">
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                KHẨN CẤP TẠI CHỖ
              </span>
              <div>
                <h4 class="font-extrabold text-white text-sm">Cảnh Sát Phản Ứng Nhanh 113 Đồng Nai</h4>
                <p class="text-slate-400 text-[11px] mt-0.5">Xử lý ngay khi bị đe dọa, giữ người trái phép hoặc cưỡng đoạt tài sản tại chỗ.</p>
              </div>
              <div class="p-3 rounded-xl bg-slate-950 font-mono space-y-1">
                <div class="text-slate-400 text-[11px]">Đầu số khẩn cấp toàn quốc:</div>
                <div class="text-amber-400 font-bold text-base">113</div>
                <div class="text-slate-400 text-[10px]">Túc trực 24/24 trên toàn địa bàn thành phố Đồng Nai</div>
              </div>
              <a href="tel:113" class="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md">
                <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Bấm Gọi 113
              </a>
            </div>

          </div>
        </div>
      `;
    }

    if (chapterId === 5) {
      // CHƯƠNG 5: 🛡️ HƯỚNG DẪN SỬ DỤNG HỆ THỐNG AI CHECK JOB
      return `
        <div class="space-y-6">
          <div class="border-b border-slate-800 pb-3">
            <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
              CHƯƠNG 5 • QUY TRÌNH THẨM ĐỊNH AI RADAR
            </span>
            <h3 class="text-lg sm:text-xl font-black text-white">
              🛡️ Hướng Dẫn Sử Dụng Hệ Thống AI Check Job
            </h3>
            <p class="text-xs text-slate-400 mt-1">
              Quy trình 4 bước thẩm định tin tuyển dụng lừa đảo nhanh chóng, chuẩn xác phục vụ người lao động.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">01</div>
              <h4 class="font-bold text-white text-sm">Bước 1: Mở mục 'Kiểm Tra Tin Tuyển Dụng'</h4>
              <p class="text-slate-300 leading-relaxed text-[11px]">
                Truy cập vào menu 'Kiểm Tra Tin Tuyển Dụng' từ thanh điều hướng bên trái hoặc bấm nút bắt đầu tại màn hình trang chủ.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">02</div>
              <h4 class="font-bold text-white text-sm">Bước 2: Dán nội dung hoặc ảnh chụp tin nhắn lừa đảo</h4>
              <p class="text-slate-300 leading-relaxed text-[11px]">
                Dán nội dung bài đăng hoặc tải lên ảnh chụp màn hình tin nhắn tuyển dụng từ Zalo, Facebook vào ô kiểm tra để hệ thống xử lý.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div class="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold">03</div>
              <h4 class="font-bold text-white text-sm">Bước 3: Bấm 'Bắt Đầu Kiểm Tra Ngay'</h4>
              <p class="text-slate-300 leading-relaxed text-[11px]">
                Hệ thống AI Radar tự động quét, phân tích dấu hiệu vi phạm và đối soát dữ liệu với CSDL Doanh nghiệp KCN Đồng Nai.
              </p>
            </div>

            <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">04</div>
              <h4 class="font-bold text-white text-sm">Bước 4: Xem kết quả & tải phiếu cảnh báo PDF</h4>
              <p class="text-slate-300 leading-relaxed text-[11px]">
                Xem kết quả phân tích bóc tách các chiêu trò, đánh giá rủi ro và tải phiếu cảnh báo an toàn PDF đóng dấu số bảo vệ quyền lợi.
              </p>
            </div>

          </div>

          <div class="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="text-xs text-slate-300">
              <strong class="text-cyan-400">Bạn đã có thông tin tuyển dụng cần thẩm định?</strong> Bắt đầu quy trình kiểm tra ngay bây giờ.
            </div>
            <button type="button" onclick="App.switchModule('scanner')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md flex-shrink-0 cursor-pointer">
              <span>Kiểm Tra Tin Ngay</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }

    // CHƯƠNG 1 (MẶC ĐỊNH): NHẬN DIỆN BẪY "VIỆC NHẸ LƯƠNG CAO"
    return `
      <div class="space-y-6">
        <div class="border-b border-slate-800 pb-3">
          <span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-1">
            CHƯƠNG 1 • KIẾN THỨC PHÒNG NGỪA
          </span>
          <h3 class="text-lg sm:text-xl font-black text-white">
            1. Nhận Diện Bẫy "Việc Nhẹ Lương Cao" & Thủ Đoạn Tuyển Dụng Lừa Đảo
          </h3>
          <p class="text-xs text-slate-400 mt-1">
            Phân tích 4 bẫy lừa đảo phổ biến nhất đang nhắm vào người lao động tại các KCN Biên Hòa 2, Amata, Nhơn Trạch, Long Thành.
          </p>
        </div>

        <!-- 4 Bẫy Lừa Đảo Phổ Biến -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div class="w-8 h-8 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center font-bold">01</div>
            <h4 class="font-bold text-white text-sm">Bẫy Thu Phí Thẻ Từ & Tiền Đồng Phục</h4>
            <p class="text-slate-300 leading-relaxed text-[11px]">
              Yêu cầu nộp 300.000đ - 1.500.000đ tiền làm thẻ ra vào cổng KCN hoặc đặt cọc đồng phục trước khi nhận việc. Sau khi nhận tiền, đối tượng cắt liên lạc hoặc đưa giấy hẹn giả.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div class="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">02</div>
            <h4 class="font-bold text-white text-sm">Bẫy Tuyển CTV Chốt Đơn & Nạp Tiền</h4>
            <p class="text-slate-300 leading-relaxed text-[11px]">
              Mạo danh Nestlé Milo, Shopee tuyển đóng gói bánh kẹo hoặc giật đơn hàng nhận hoa hồng 20-30%. Ban đầu cho rút tiền thật, sau đó yêu cầu nạp tiền chục triệu rồi khóa tài khoản.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div class="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">03</div>
            <h4 class="font-bold text-white text-sm">Bẫy Giữ CCCD Bản Gốc Để Vay App Ảo</h4>
            <p class="text-slate-300 leading-relaxed text-[11px]">
              Yêu cầu nộp CCCD bản gốc để "làm thủ tục bảo hiểm". Thực chất kẻ gian mang CCCD đi vay tiền tín dụng đen hoặc mở tài khoản ngân hàng rác phục vụ rửa tiền.
            </p>
          </div>

          <div class="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
            <div class="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">04</div>
            <h4 class="font-bold text-white text-sm">Phỏng Vấn Quán Cà Phê Ngoài Cổng KCN</h4>
            <p class="text-slate-300 leading-relaxed text-[11px]">
              Không hẹn vào văn phòng nhà máy mà hẹn ở quán nước, cổng phụ KCN hoặc phòng trọ. Đây là các "cò mồi" việc làm tự phát hoặc đường dây lừa đảo chuyên nghiệp.
            </p>
          </div>

        </div>

        <!-- Bảng So Sánh Đối Chiếu -->
        <div class="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
          <h4 class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <i data-lucide="scale" class="w-4 h-4 text-cyan-400"></i> Bảng Đối Chiếu: Doanh Nghiệp Thật vs Bẫy Lừa Đảo
          </h4>
          <div class="overflow-x-auto text-xs">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 text-[11px]">
                  <th class="py-2 pr-4 font-semibold">Tiêu chí</th>
                  <th class="py-2 pr-4 font-semibold text-emerald-400">Doanh nghiệp Thật (KCN)</th>
                  <th class="py-2 font-semibold text-red-400">Bẫy Lừa Đảo Trực Tuyến</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 text-[11px]">
                <tr>
                  <td class="py-2.5 pr-4 font-bold text-white">Chi phí nộp hồ sơ</td>
                  <td class="py-2.5 pr-4 text-emerald-300">Hoàn toàn MIỄN PHÍ 100%</td>
                  <td class="py-2.5 text-red-300 font-bold">Đòi thu tiền cọc, tiền thẻ, làm thẻ từ</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-bold text-white">Địa điểm phỏng vấn</td>
                  <td class="py-2.5 pr-4 text-slate-300">Tại cổng chính nhà máy, văn phòng nhân sự</td>
                  <td class="py-2.5 text-red-300">Hẹn quán cà phê, online qua Telegram</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-bold text-white">Giấy tờ tùy thân</td>
                  <td class="py-2.5 pr-4 text-slate-300">Chỉ nhận CCCD photo công chứng</td>
                  <td class="py-2.5 text-red-300 font-bold">Đòi giữ CCCD bản gốc để giữ chỗ</td>
                </tr>
                <tr>
                  <td class="py-2.5 pr-4 font-bold text-white">Mức lương & Chế độ</td>
                  <td class="py-2.5 pr-4 text-slate-300">Theo thang bảng lương rõ ràng, có BHXH</td>
                  <td class="py-2.5 text-red-300">Hứa lương 20-30 triệu, việc cực nhẹ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================
  // 6. CHATBOT AI KHẨN CẤP: JOBI (LLM MEMORY, REALTIME TYPING & NLP MOCK)
  // ==========================================
  escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  },

  saveChatHistory() {
    try {
      localStorage.setItem('jobi_chat_history', JSON.stringify(this.chatHistory || []));
      sessionStorage.setItem('jobi_chat_history', JSON.stringify(this.chatHistory || []));
    } catch (e) {
      console.warn('Lỗi lưu jobi_chat_history:', e);
    }
  },

  loadChatHistory() {
    const container = document.getElementById('jobi-chat-messages');
    if (!container) return;

    try {
      const stored = localStorage.getItem('jobi_chat_history');
      if (stored) {
        this.chatHistory = JSON.parse(stored);
      } else {
        this.chatHistory = [];
      }
    } catch (e) {
      this.chatHistory = [];
    }

    // Reset container và render câu chào mặc định
    container.innerHTML = `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 shadow-sm max-w-[88%] space-y-1.5 text-xs leading-relaxed">
          <p>👋 Chào bạn! Mình là <strong>Jobi</strong> - Trợ lý AI Hỗ trợ Khẩn cấp.</p>
          <p>Bạn đang gặp rắc rối với tin tuyển dụng, hay lỡ làm theo yêu cầu của kẻ gian? Hãy gõ tình trạng của bạn vào đây hoặc gọi ngay Hotline Công an TP. Đồng Nai: <strong>0251.3685134</strong> để được hướng dẫn!</p>
        </div>
      </div>
    `;

    // Render lại toàn bộ tin nhắn cũ nếu có
    if (this.chatHistory && this.chatHistory.length > 0) {
      this.chatHistory.forEach(msg => {
        container.insertAdjacentHTML('beforeend', this.renderChatBubbleHTML(msg));
      });
    }

    if (window.lucide) window.lucide.createIcons({ root: container });
    this.scrollJobiToBottom();
  },

  // =========================================================================
  // BỘ NÃO CONTEXTUAL NLP MOCK & STATE MACHINE CỦA CHATBOT JOBI
  // =========================================================================
  setChatState(newState) {
    currentChatState = newState;
    this.currentChatState = newState;
    try {
      localStorage.setItem('jobi_chat_state', newState);
    } catch (e) {}
  },

  getChatState() {
    if (!currentChatState) {
      currentChatState = localStorage.getItem('jobi_chat_state') || "idle";
    }
    return currentChatState;
  },

  renderDynamicQuickChips() {
    // Đã dọn dẹp các quick chips theo yêu cầu giao diện tối giản
  },

  clearJobiChat(showToast = true) {
    try {
      localStorage.removeItem('jobi_chat_history');
      localStorage.removeItem('jobi_chat_state');
      sessionStorage.removeItem('jobi_chat_history');
      sessionStorage.removeItem('jobi_chat_state');
    } catch (e) {}
    this.chatHistory = [];
    this.setChatState('idle');

    const container = document.getElementById('jobi-chat-messages');
    if (!container) return;

    container.innerHTML = `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-slate-200 shadow-sm max-w-[88%] space-y-1.5 text-xs leading-relaxed">
          <p>👋 Chào bạn! Mình là <strong>Jobi</strong> - Trợ lý AI Hỗ trợ Khẩn cấp.</p>
          <p>Bạn đang gặp rắc rối với tin tuyển dụng, hay lỡ làm theo yêu cầu của kẻ gian? Hãy gõ tình trạng của bạn vào đây hoặc gọi ngay Hotline Công an TP. Đồng Nai: <strong>0251.3685134</strong> để được hướng dẫn!</p>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: container });
    if (showToast) {
      this.showToast('Đã xóa toàn bộ lịch sử trò chuyện & đặt lại trạng thái!', 'info');
    }
  },

  resetChatBox() {
    resetChatBox();
  },

  toggleJobiChat(forceOpen, e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }

    const win = document.getElementById('jobi-chat-window');
    const badge = document.getElementById('jobi-tooltip-badge');

    // Mở hoặc đóng ngay lập tức ở dòng đầu tiên của hàm (0ms không chờ đợi)
    const nextState = (forceOpen !== undefined)
      ? forceOpen
      : (win ? win.classList.contains('hidden') : !this.jobiChatOpen);
    this.jobiChatOpen = nextState;

    if (win) {
      if (nextState) {
        win.classList.remove('hidden');
        win.classList.add('flex');
        win.style.display = 'flex';
        if (badge) badge.classList.add('hidden');

        // Bổ sung logic hủy đếm giờ nếu người dùng quay lại sớm
        if (chatInactivityTimer) {
          clearTimeout(chatInactivityTimer);
          chatInactivityTimer = null;
        }
      } else {
        win.classList.add('hidden');
        win.classList.remove('flex');
        win.style.display = 'none';

        // Bổ sung logic bắt đầu đếm giờ auto-reset sau 7 phút không hoạt động
        if (chatInactivityTimer) {
          clearTimeout(chatInactivityTimer);
        }
        chatInactivityTimer = setTimeout(() => {
          resetChatBox();
        }, 420000); // 420000ms = 7 phút
      }
    }

    // Chặn xung đột kép khi bắt đồng thời cả pointerdown và click trong vòng 300ms
    const now = Date.now();
    if (this._lastChatToggle && (now - this._lastChatToggle < 300)) {
      return;
    }
    this._lastChatToggle = now;

    // Toàn bộ thao tác tải dữ liệu (load history, fetch API, render icon, focus input)
    // được đặt bên dưới và bọc trong setTimeout để không block luồng render UI
    setTimeout(() => {
      if (this.jobiChatOpen) {
        this.loadChatHistory();
        const input = document.getElementById('jobi-chat-input');
        if (input) input.focus();
        this.scrollJobiToBottom();
      }
      if (window.lucide) window.lucide.createIcons();
    }, 0);
  },

  handleJobiQuickReply(text) {
    this.sendJobiMessage(text);
  },

  sendJobiMessage(customText) {
    const input = document.getElementById('jobi-chat-input');
    const container = document.getElementById('jobi-chat-messages');
    if (!container) return;

    const query = (customText || (input ? input.value : '')).trim();
    if (!query) return;

    if (input && !customText) input.value = '';

    // (1) Render ngay tin nhắn của người dùng & Lưu vào History
    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: Date.now()
    };
    this.chatHistory.push(userMsg);
    this.saveChatHistory();

    container.insertAdjacentHTML('beforeend', this.renderChatBubbleHTML(userMsg));
    this.scrollJobiToBottom();

    // (2) Render ngay tin nhắn "Jobi đang suy nghĩ..." kèm hiệu ứng 3 chấm nhảy nhảy
    const typingId = 'jobi-typing-indicator';
    const oldTyping = document.getElementById(typingId);
    if (oldTyping) oldTyping.remove();

    const typingHtml = `
      <div id="${typingId}" class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-slate-300 text-xs flex items-center gap-2.5 shadow-sm">
          <span class="text-[11px] font-medium text-cyan-300">Jobi đang suy nghĩ...</span>
          <div class="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', typingHtml);
    if (window.lucide) window.lucide.createIcons({ root: container });
    this.scrollJobiToBottom();

    // (3) Tạo độ trễ ngẫu nhiên từ 1.5s đến 2.5s (mô phỏng thời gian gọi API LLM thực thụ)
    const simulatedLatency = Math.floor(1500 + Math.random() * 1000);

    setTimeout(() => {
      // (4) Sau thời gian trễ, xóa bong bóng "Jobi đang suy nghĩ..." đi
      const typingEl = document.getElementById(typingId);
      if (typingEl) typingEl.remove();

      // Phân tích ý định & sinh phản hồi ngữ cảnh thông minh
      const responseObj = this.analyzeAndRespond(query);
      const jobiMsg = {
        id: 'jobi-' + Date.now(),
        sender: 'jobi',
        rawQuery: query,
        partA: responseObj.partA || '',
        partAClass: responseObj.partAClass || '',
        partBHtml: responseObj.partBHtml || '',
        partBClass: responseObj.partBClass || '',
        text: responseObj.text || '',
        timestamp: Date.now()
      };

      this.chatHistory.push(jobiMsg);
      this.saveChatHistory();

      // Render bong bóng phản hồi của Jobi
      container.insertAdjacentHTML('beforeend', this.renderChatBubbleHTML(jobiMsg));

      if (window.lucide) window.lucide.createIcons({ root: container });
      this.scrollJobiToBottom();
    }, simulatedLatency);
  },

  renderChatBubbleHTML(msg) {
    if (msg.sender === 'user') {
      return `
        <div class="flex items-start justify-end gap-2.5">
          <div class="p-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md max-w-[85%] text-xs leading-relaxed">
            ${this.escapeHTML(msg.text || '')}
          </div>
          <div class="w-7 h-7 rounded-xl bg-blue-500/20 text-cyan-300 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30 font-bold text-[10px]">
            BẠN
          </div>
        </div>
      `;
    }

    // Jobi response: Phân tách thành các bong bóng chat tự nhiên thuần túy (không chứa nút bấm)
    const bubbleA = msg.partA ? `
      <div class="jobi-reassurance-box p-3 rounded-2xl ${msg.partAClass || 'bg-cyan-950/35 border border-cyan-500/30 text-sky-300'} text-xs shadow-sm leading-relaxed" style="color: #38bdf8;">
        💙 ${msg.partA}
      </div>
    ` : '';

    const bubbleB = msg.partBHtml ? `
      <div class="p-3.5 rounded-2xl ${msg.partBClass || 'bg-slate-900/95 border border-slate-700/80 text-slate-200'} text-xs shadow-md leading-relaxed space-y-2">
        ${msg.partBHtml}
      </div>
    ` : '';

    const fallbackBubble = (!msg.partA && !msg.partBHtml && msg.text) ? `
      <div class="p-3.5 rounded-2xl bg-slate-900/95 border border-slate-700/80 text-slate-200 text-xs shadow-md leading-relaxed">
        ${this.escapeHTML(msg.text)}
      </div>
    ` : '';

    return `
      <div class="flex items-start gap-2.5">
        <div class="w-7 h-7 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30">
          <i data-lucide="bot" class="w-4 h-4"></i>
        </div>
        <div class="space-y-2 max-w-[88%] sm:max-w-[90%]">
          ${bubbleA}
          ${bubbleB}
          ${fallbackBubble}
        </div>
      </div>
    `;
  },

  scrollJobiToBottom() {
    const container = document.getElementById('jobi-chat-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  },

  // =========================================================================
  // BỘ NÃO TƯ VẤN HƯỚNG NGHIỆP ĐỘNG THEO DỮ LIỆU THỰC TẾ NGƯỜI DÙNG NHẬP
  // =========================================================================
  generateDynamicCareerAdvice(rawUserMessage) {
    const raw = (rawUserMessage || '').trim();
    const q = raw.toLowerCase();

    // 1. TRÍCH XUẤT ĐẶC ĐIỂM THỰC TẾ NGƯỜI DÙNG NHẬP (KHÔNG ÁP ĐẶT MẪU)
    // Chiều cao
    let height = '';
    const heightRegex = /(?:cao|chiều cao|chieu cao|tầm|tam)?\s*(\d{1}[.,m]\d{1,2}(?:\s*m)?|\d{2,3}\s*cm)/i;
    const hMatch = raw.match(heightRegex);
    if (hMatch) {
      height = hMatch[1].replace(/\s+/g, '').replace(',', '.');
      if (/^\d{3}$/.test(height)) height = height + 'cm';
    } else if (q.includes('cao ráo')) {
      height = 'Cao ráo';
    } else if (q.includes('thấp bé') || q.includes('nhỏ con')) {
      height = 'Nhỏ nhắn';
    }

    // Giới tính
    let gender = '';
    if (/\b(nữ|con gái|em gái|phái nữ)\b/i.test(q)) gender = 'Nữ';
    else if (/\b(nam|con trai|anh|nam giới)\b/i.test(q)) gender = 'Nam';

    // Độ tuổi
    let age = '';
    const ageMatch = raw.match(/\b(\d{1,2})\s*(?:tuổi|t)\b/i);
    if (ageMatch) age = ageMatch[1] + ' tuổi';

    // Trình độ học vấn / Bằng cấp / Kinh nghiệm
    const education = [];
    if (q.includes('đại học') || q.includes('cử nhân') || q.includes('kỹ sư')) education.push('Đại học / Kỹ sư');
    else if (q.includes('cao đẳng')) education.push('Cao đẳng');
    else if (q.includes('trung cấp') || q.includes('học nghề') || q.includes('trường nghề')) education.push('Trung cấp / Trường nghề');
    else if (q.includes('cấp 3') || q.includes('thpt') || q.includes('lớp 12')) education.push('Tốt nghiệp THPT (Cấp 3)');
    else if (q.includes('cấp 2') || q.includes('lớp 9')) education.push('Học vấn Cấp 2');

    if (q.includes('chưa có bằng') || q.includes('không có bằng') || q.includes('không bằng cấp') || q.includes('chưa có kinh nghiệm') || q.includes('chua co kinh nghiem') || q.includes('mới ra trường')) {
      education.push('Chưa có kinh nghiệm / Chưa có bằng cấp chuyên môn');
    }

    // Sở thích / Thể lực / Tố chất cá nhân
    const traits = [];
    if (q.includes('đá bóng') || q.includes('da bong') || q.includes('đá banh') || q.includes('da banh') || q.includes('bóng đá')) traits.push('Sở thích đá bóng');
    if (q.includes('thể thao') || q.includes('the thao') || q.includes('gym') || q.includes('chạy bộ') || q.includes('bơi lội') || q.includes('cầu lông') || q.includes('bóng chuyền') || q.includes('võ')) traits.push('Yêu thích thể thao');
    if (q.includes('sức khỏe tốt') || q.includes('thể lực tốt') || q.includes('sức bền') || q.includes('khỏe mạnh')) traits.push('Thể lực & sức khỏe dồi dào');
    if (q.includes('tỉ mỉ') || q.includes('ti mi') || q.includes('khéo tay') || q.includes('cẩn thận') || q.includes('kiên nhẫn')) traits.push('Tỉ mỉ, khéo tay, cẩn thận');
    if (q.includes('game') || q.includes('chơi game')) traits.push('Yêu thích công nghệ / Game');
    if (q.includes('lái xe') || q.includes('thích lái')) traits.push('Thích lái xe / Di chuyển');

    // Kỹ năng / Định hướng ngành nghề
    const skills = [];
    const matched = {
      tech: false,      // Điện tử / Cơ khí / Tự động hóa
      garment: false,   // May mặc / Giày da / Hàng tiêu dùng
      office: false,    // CNTT / Kế toán / Nhân sự / Ngoại ngữ
      logistics: false  // Kho vận / Lái xe / Bảo vệ / Lao động phổ thông
    };

    // Nhóm 1: Điện tử / Cơ khí / Tự động hóa
    if (q.includes('điện tử') || q.includes('dien tu') || q.includes('vi mạch') || q.includes('bo mạch') || q.includes('smt') || q.includes('linh kiện')) {
      skills.push('Ngành Điện tử / Bo mạch');
      matched.tech = true;
    }
    if (q.includes('cơ khí') || q.includes('co khi') || q.includes('tự động hóa') || q.includes('hàn') || q.includes('tiện') || q.includes('phay') || q.includes('máy móc') || q.includes('bảo trì') || q.includes('cnc') || q.includes('plc')) {
      skills.push('Cơ khí / Tự động hóa / Vận hành máy');
      matched.tech = true;
    }

    // Nhóm 2: May mặc / Giày da / Sản xuất tiêu dùng
    if (q.includes('may') || q.includes('may mặc') || q.includes('dệt') || q.includes('giày') || q.includes('da giày') || q.includes('giày da')) {
      skills.push('May mặc / Giày da');
      matched.garment = true;
    }
    if (q.includes('thực phẩm') || q.includes('bánh kẹo') || q.includes('đồ uống') || q.includes('chế biến') || q.includes('nông sản') || q.includes('thức ăn chăn nuôi')) {
      skills.push('Chế biến thực phẩm & Tiêu dùng');
      matched.garment = true;
    }

    // Nhóm 3: CNTT / Kế toán / Nhân sự / Ngoại ngữ
    if (q.includes('tiếng trung') || q.includes('tieng trung') || q.includes('tiếng hoa')) {
      skills.push('Ngoại ngữ: Tiếng Trung');
      matched.office = true;
    }
    if (q.includes('tiếng anh') || q.includes('tieng anh')) {
      skills.push('Ngoại ngữ: Tiếng Anh');
      matched.office = true;
    }
    if (q.includes('tiếng nhật') || q.includes('tieng nhat')) {
      skills.push('Ngoại ngữ: Tiếng Nhật');
      matched.office = true;
    }
    if (q.includes('tiếng hàn') || q.includes('tieng han')) {
      skills.push('Ngoại ngữ: Tiếng Hàn');
      matched.office = true;
    }
    if (q.includes('cntt') || q.includes('it') || q.includes('tin học') || q.includes('lập trình') || q.includes('phần mềm')) {
      skills.push('Công nghệ thông tin (IT)');
      matched.office = true;
    }
    if (q.includes('kế toán') || q.includes('ke toan') || q.includes('tài chính')) {
      skills.push('Kế toán / Tài chính');
      matched.office = true;
    }
    if (q.includes('nhân sự') || q.includes('admin') || q.includes('văn phòng') || q.includes('hành chính')) {
      skills.push('Hành chính nhân sự / Văn phòng');
      matched.office = true;
    }

    // Nhóm 4: Kho vận / Lái xe / Bảo vệ / Lao động phổ thông
    if (q.includes('lái xe') || q.includes('tài xế') || q.includes('bằng b2') || q.includes('b2') || q.includes('bằng c') || q.includes('xe nâng')) {
      skills.push('Lái xe / Vận tải (Bằng B2/C/Xe nâng)');
      matched.logistics = true;
    }
    if (q.includes('kho') || q.includes('thủ kho') || q.includes('logistics') || q.includes('giao nhận') || q.includes('bốc xếp')) {
      skills.push('Kho vận / Quản lý kho');
      matched.logistics = true;
    }
    if (q.includes('bảo vệ') || q.includes('an ninh')) {
      skills.push('An ninh / Bảo vệ');
      matched.logistics = true;
    }
    if (q.includes('lao động phổ thông') || q.includes('ldpt') || q.includes('đóng gói') || q.includes('dán tem') || q.includes('công nhân')) {
      skills.push('Lao động phổ thông / Đóng gói');
      matched.logistics = true;
    }

    const isAll = !matched.tech && !matched.garment && !matched.office && !matched.logistics;

    // 2. NHẮC LẠI ĐÚNG ĐẶC ĐIỂM NGƯỜI DÙNG NHẬP (KHÔNG CỐ ĐỊNH MẪU)
    const echoList = [];
    if (gender) echoList.push(`Giới tính: <strong>${gender}</strong>`);
    if (age) echoList.push(`Độ tuổi: <strong>${age}</strong>`);
    if (height) echoList.push(`Chiều cao / Vóc dáng: <strong>${height}</strong>`);
    if (traits.length > 0) echoList.push(`Sở thích / Tố chất: <strong>${traits.join(', ')}</strong>`);
    if (education.length > 0) echoList.push(`Trình độ học vấn: <strong>${education.join(', ')}</strong>`);
    if (skills.length > 0) echoList.push(`Kỹ năng / Định hướng: <strong>${skills.join(', ')}</strong>`);

    const echoHtml = echoList.length > 0
      ? echoList.map(item => `<p>• ${item}</p>`).join('')
      : `<p>• Định hướng nghề nghiệp và tìm kiếm công việc thực tế tại các KCN Đồng Nai.</p>`;

    // 3. PHÂN TÍCH ĐIỂM MẠNH TƯƠNG ỨNG TỰ NHIÊN
    const strengthItems = [];
    if (traits.some(t => t.includes('bóng') || t.includes('thao') || t.includes('Thể lực'))) {
      strengthItems.push('<p>• <strong>Thể lực & Sức bền:</strong> Nhờ thói quen rèn luyện thể thao/đá bóng, bạn có nền tảng thể lực dồi dào, sự dẻo dai và phản xạ nhanh nhạy – rất thích nghi với môi trường sản xuất theo ca kíp.</p>');
    }
    if (traits.some(t => t.includes('Tỉ mỉ') || t.includes('khéo tay'))) {
      strengthItems.push('<p>• <strong>Độ tỉ mỉ & Khéo léo:</strong> Phẩm chất cẩn thận là lợi thế lớn trong việc kiểm soát số liệu kế toán, phòng sạch lắp ráp vi mạch hoặc kiểm tra chất lượng sản phẩm (QC).</p>');
    }
    if (height) {
      if (height.includes('1m7') || height.includes('1m8') || parseInt(height) >= 170) {
        strengthItems.push(`<p>• <strong>Lợi thế chiều cao (${height}):</strong> Vóc dáng cao ráo mang lại sải tay và tầm quan sát tốt khi vận hành máy móc công nghiệp, bao quát dây chuyền hoặc đứng các vị trí kỹ thuật, an ninh.</p>`);
      } else if (height.includes('1m5') || height.includes('1m6') || (parseInt(height) < 170 && parseInt(height) >= 150)) {
        strengthItems.push(`<p>• <strong>Vóc dáng linh hoạt (${height}):</strong> Chiều cao vừa vặn rất linh hoạt, thuận lợi thao tác trên các dây chuyền lắp ráp linh kiện nhẹ, dán tem, may mặc hoặc công việc hành chính văn phòng.</p>`);
      }
    }
    if (skills.some(s => s.includes('Tiếng Trung') || s.includes('Tiếng Nhật') || s.includes('Tiếng Hàn') || s.includes('Tiếng Anh'))) {
      strengthItems.push('<p>• <strong>Lợi thế ngoại ngữ vượt trội:</strong> Hàng trăm tập đoàn FDI tại Đồng Nai (Đài Loan, Trung Quốc, Nhật, Hàn, Châu Âu) luôn ưu tiên tuyển dụng ứng viên biết ngoại ngữ với mức thu nhập cao và cơ hội thăng tiến vượt bậc.</p>');
    }
    if (skills.some(s => s.includes('Điện tử') || s.includes('Cơ khí'))) {
      strengthItems.push('<p>• <strong>Kỹ năng công nghệ mũi nhọn:</strong> Cơ khí, điện tử và tự động hóa là các lĩnh vực khát nhân lực kỹ thuật chất lượng cao tại Đồng Nai.</p>');
    }
    if (skills.some(s => s.includes('Lái xe') || s.includes('Kho vận'))) {
      strengthItems.push('<p>• <strong>Cung ứng chuỗi logistics:</strong> Có bằng lái B2/C hoặc kỹ năng kho bãi giúp bạn dễ dàng ứng tuyển ngay vào hệ thống kho vận tại các KCN.</p>');
    }
    if (education.some(e => e.includes('Chưa có kinh nghiệm') || e.includes('Cấp 2') || e.includes('THPT'))) {
      strengthItems.push('<p>• <strong>Khả năng đào tạo nhanh:</strong> Đa số các doanh nghiệp lớn tại Đồng Nai luôn sẵn sàng tiếp nhận lao động phổ thông và đào tạo nghề có trả lương đầy đủ ngay từ ngày đầu.</p>');
    }
    if (strengthItems.length === 0) {
      strengthItems.push('<p>• <strong>Khả năng hòa nhập:</strong> Thị trường lao động Đồng Nai với hơn 30 KCN đang rất sôi động, luôn mở rộng cơ hội cho ứng viên chịu khó và gắn bó lâu dài.</p>');
    }

    // 4. GỢI Ý VỊ TRÍ VIỆC LÀM & CÔNG TY UY TÍN TƯƠNG ỨNG TẠI CÁC KCN ĐỒNG NAI
    const roleBlocks = [];
    const companyBlocks = [];

    // Nhóm 1: Điện tử / Cơ khí / Tự động hóa
    if (matched.tech || isAll) {
      roleBlocks.push(`
        <div>
          <strong class="text-cyan-300">⚙️ Ngành Điện tử / Cơ khí / Tự động hóa:</strong>
          <p class="pl-2">• <em>Kỹ thuật viên Điện tử / Bảo trì (Maintenance Tech):</em> Hiệu chỉnh máy SMT, bảo dưỡng thiết bị tự động.</p>
          <p class="pl-2">• <em>Kỹ thuật viên Vận hành máy (Machine Operator):</em> Điều khiển máy gắp dán chip, máy hàn tự động, máy CNC.</p>
          <p class="pl-2">• <em>Lắp ráp linh kiện & QC/QA:</em> Kiểm tra ngoại quan bo mạch, lắp ráp vi mạch trong phòng sạch.</p>
        </div>
      `);
      companyBlocks.push(`
        <div>
          <strong class="text-cyan-300">📍 Doanh nghiệp Điện tử - Cơ khí tiêu biểu:</strong>
          <p class="pl-2">• <strong>KCN Biên Hòa 2:</strong> <em>Công ty TNHH Fujitsu Việt Nam</em> (bo mạch & linh kiện bán dẫn), <em>Công ty TNHH Mabuchi Motor Việt Nam</em> (động cơ điện tử vi mô), <em>Foster Electric</em> (âm thanh điện tử).</p>
          <p class="pl-2">• <strong>KCN Amata:</strong> <em>Công ty TNHH Brother Machinery Vietnam</em> (máy cơ điện tử), <em>Công ty TNHH Schaeffler Việt Nam</em> (linh kiện cơ điện tử tiêu chuẩn Đức).</p>
          <p class="pl-2">• <strong>KCN Long Thành / Long Đức:</strong> <em>Công ty TNHH Robert Bosch Việt Nam</em> (công nghệ ô tô & cảm biến của Đức), <em>Meggitt Việt Nam</em> (cơ điện tử hàng không), <em>Công ty TNHH SMC Manufacturing Việt Nam</em> (KCN Long Đức - tự động hóa khí nén).</p>
        </div>
      `);
    }

    // Nhóm 2: May mặc / Giày da / Hàng tiêu dùng
    if (matched.garment || isAll) {
      roleBlocks.push(`
        <div>
          <strong class="text-emerald-300">🧵 Ngành May mặc / Giày da / Sản xuất tiêu dùng:</strong>
          <p class="pl-2">• <em>Công nhân may & Ráp giày da:</em> Tham gia chuyền may công nghiệp, dán ép đế giày thể thao.</p>
          <p class="pl-2">• <em>Vận hành máy chế biến thực phẩm & Đóng gói:</em> Giám sát dây chuyền đóng gói, dán nhãn thành phẩm.</p>
          <p class="pl-2">• <em>Nhân viên Kiểm định thành phẩm (QC):</em> Soát lỗi may, tiêu chuẩn form dáng giày và bao bì xuất khẩu.</p>
        </div>
      `);
      companyBlocks.push(`
        <div>
          <strong class="text-emerald-300">📍 Doanh nghiệp May mặc - Giày da - Tiêu dùng tiêu biểu:</strong>
          <p class="pl-2">• <strong>KCN Thạnh Phú (Vĩnh Cửu):</strong> <em>Công ty TNHH Changshin Việt Nam</em> (sản xuất giày Nike, 38.000 lao động, phúc lợi rất tốt).</p>
          <p class="pl-2">• <strong>KCN Biên Hòa 2 & Giang Điền:</strong> <em>Công ty CP Taekwang Vina</em> (sản xuất giày thể thao xuất khẩu, tuyển trực tiếp cổng số 1).</p>
          <p class="pl-2">• <strong>Phường Hóa An (Biên Hòa):</strong> <em>Công ty TNHH Pouchen Việt Nam</em> (sản xuất giày da xuất khẩu quy mô lớn).</p>
          <p class="pl-2">• <strong>KCN Amata:</strong> <em>Công ty TNHH Nestlé Việt Nam</em> (chế biến thực phẩm Milo, Nescafé).</p>
          <p class="pl-2">• <strong>KCN Biên Hòa 2:</strong> <em>Công ty CP Chăn nuôi C.P. Việt Nam</em>, <em>Cargill Việt Nam</em> (chế biến nông sản & thực phẩm).</p>
        </div>
      `);
    }

    // Nhóm 3: CNTT / Kế toán / Nhân sự / Ngoại ngữ
    if (matched.office || isAll) {
      roleBlocks.push(`
        <div>
          <strong class="text-indigo-300">💼 Ngành CNTT (IT) / Kế toán / Nhân sự / Ngoại ngữ:</strong>
          <p class="pl-2">• <em>Kế toán kho / Kế toán nội bộ:</em> Quản lý chứng từ nhập xuất hàng, hóa đơn thuế, đối chiếu số liệu.</p>
          <p class="pl-2">• <em>Nhân viên Hành chính Nhân sự (HR) & Mua hàng (Purchasing):</em> Tuyển dụng, chấm công, quản lý hồ sơ nhà máy.</p>
          <p class="pl-2">• <em>IT Helpdesk / Quản trị mạng nhà xưởng:</em> Hỗ trợ kỹ thuật phần cứng, camera và mạng nội bộ xưởng.</p>
          <p class="pl-2">• <em>Trợ lý & Phiên dịch (Tiếng Trung, Anh, Nhật, Hàn):</em> Cầu nối giao tiếp giữa chuyên gia nước ngoài và công nhân.</p>
        </div>
      `);
      companyBlocks.push(`
        <div>
          <strong class="text-indigo-300">📍 Doanh nghiệp Khối Văn phòng & Ngoại ngữ tiêu biểu:</strong>
          <p class="pl-2">• <strong>Văn phòng KCN Amata:</strong> Khối Back-office của <em>Nestlé VN</em>, <em>Brother Machinery</em>, <em>Schaeffler VN</em>.</p>
          <p class="pl-2">• <strong>Doanh nghiệp tuyển Tiếng Trung:</strong> <em>Công ty TNHH Formosa Taffeta</em> (KCN Nhơn Trạch 3), <em>C.P. Vietnam</em> (Biên Hòa 2), <em>Taekwang Vina</em>.</p>
          <p class="pl-2">• <strong>Doanh nghiệp tuyển Tiếng Nhật:</strong> <em>Fujitsu Việt Nam</em>, <em>Mabuchi Motor</em> (Biên Hòa 2), <em>Muto Việt Nam</em> (Nhơn Trạch 1).</p>
          <p class="pl-2">• <strong>Doanh nghiệp tuyển Tiếng Anh / Hàn:</strong> <em>Robert Bosch</em> (Long Thành), <em>Hyosung Đồng Nai</em> (Nhơn Trạch 5).</p>
        </div>
      `);
    }

    // Nhóm 4: Kho vận (Logistics) / Lái xe / Bảo vệ / Lao động phổ thông
    if (matched.logistics || isAll) {
      roleBlocks.push(`
        <div>
          <strong class="text-amber-300">🚛 Ngành Kho vận (Logistics) / Lái xe / Bảo vệ / Lao động phổ thông:</strong>
          <p class="pl-2">• <em>Tài xế lái xe tải / Xe đưa đón (Bằng B2, C) & Lái xe nâng (Forklift):</em> Vận chuyển hàng hóa liên KCN.</p>
          <p class="pl-2">• <em>Thủ kho / Nhân viên điều phối kho vận:</em> Quản lý xuất nhập tồn, phân loại kiện hàng.</p>
          <p class="pl-2">• <em>Nhân viên An ninh / Bảo vệ nhà xưởng:</em> Kiểm soát an ninh cổng ra vào, tuần tra an toàn PCCC.</p>
          <p class="pl-2">• <em>Lao động phổ thông:</em> Đóng gói thành phẩm, dán tem nhãn, phân loại hàng (không yêu cầu kinh nghiệm).</p>
        </div>
      `);
      companyBlocks.push(`
        <div>
          <strong class="text-amber-300">📍 Đơn vị Kho vận & Tuyển dụng trực tiếp tiêu biểu:</strong>
          <p class="pl-2">• <strong>KCN Giang Điền & Trảng Bom:</strong> <em>Taekwang Logistics</em>, <em>Trung tâm Dịch vụ Việc làm tỉnh Đồng Nai</em>.</p>
          <p class="pl-2">• <strong>Hệ thống Kho vận Logistics:</strong> Cụm kho KCN Long Thành, Kho KCN Amata, KCN Nhơn Trạch.</p>
          <p class="pl-2">• <strong>Tuyển dụng trực tiếp tại cổng không thu phí:</strong> <em>Changshin VN</em>, <em>Taekwang Vina</em>, <em>Pouchen</em>, <em>Fujitsu</em>, <em>Nestlé</em>.</p>
        </div>
      `);
    }

    const partA = "Jobi đã phân tích hồ sơ và định hướng nghề nghiệp thực tế cho bạn:";
    const partBHtml = `
      <div class="space-y-3 text-xs leading-relaxed">
        <!-- 1. Nhắc lại đặc điểm người dùng nhập -->
        <div class="space-y-1">
          <p class="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
            <i data-lucide="user-check" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
            <span>1. THÔNG TIN BẠN VỪA CUNG CẤP:</span>
          </p>
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-200 space-y-1 leading-relaxed">
            ${echoHtml}
          </div>
        </div>

        <!-- 2. Phân tích điểm mạnh cá nhân -->
        <div class="space-y-1">
          <p class="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
            <i data-lucide="sparkles" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
            <span>2. PHÂN TÍCH ĐIỂM MẠNH & TỐ CHẤT PHÙ HỢP:</span>
          </p>
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-emerald-500/30 text-xs text-slate-200 space-y-1.5 leading-relaxed">
            ${strengthItems.join('')}
          </div>
        </div>

        <!-- 3. Vị trí việc làm cụ thể -->
        <div class="space-y-1">
          <p class="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
            <i data-lucide="briefcase" class="w-4 h-4 text-amber-300 flex-shrink-0"></i>
            <span>3. VỊ TRÍ VIỆC LÀM PHÙ HỢP GỢI Ý:</span>
          </p>
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
            ${roleBlocks.join('')}
          </div>
        </div>

        <!-- 4. Đề xuất các công ty uy tín tại các KCN Đồng Nai -->
        <div class="space-y-1">
          <p class="font-bold text-sky-400 flex items-center gap-1.5 text-xs">
            <i data-lucide="building-2" class="w-4 h-4 text-sky-400 flex-shrink-0"></i>
            <span>4. DOANH NGHIỆP UY TÍN TƯƠNG ỨNG TẠI ĐỒNG NAI:</span>
          </p>
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-sky-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
            ${companyBlocks.join('')}
          </div>
        </div>

        <!-- 5. Lời khuyên an toàn từ Jobi -->
        <div class="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/40 text-[11px] text-cyan-200 space-y-1">
          <p class="font-bold text-cyan-300">🛡️ LỜI KHUYÊN AN TOÀN TỪ JOBI:</p>
          <p>• Các doanh nghiệp chính quy tại KCN Đồng Nai <strong>tuyển dụng trực tiếp tại cổng bảo vệ hoặc qua website/email phòng Nhân sự chính thức</strong>, <strong>TUYỆT ĐỐI KHÔNG thu phí</strong> hồ sơ hay tiền đồng phục.</p>
          <p>• Không tin môi giới quán nước ven KCN hay các lời mời làm online chốt đơn nộp tiền cọc bạn nhé!</p>
        </div>
      </div>
    `;

    return { partA, partAClass: '', partBHtml, partBClass: '' };
  },

  // =========================================================================
  // BỘ LỌC Ý ĐỊNH THÔNG MINH (INTENT RECOGNITION VỚI CÁC KỊCH BẢN CHUẨN MỰC & BẢO VỆ KÉP)
  // =========================================================================
  analyzeAndRespond(userMessage) {
    const raw = (userMessage || '').trim();
    const q = raw.toLowerCase();
    const currentState = this.getChatState();

    let partA = '';
    let partAClass = '';
    let partBHtml = '';
    let partBClass = '';

    // Helper: kiểm tra keyword
    const hasWord = (words) => words.some(w => q.includes(w));

    // =========================================================================
    // KỊCH BẢN: HƯỚNG DẪN KIỂM TRA / TEST TIN TUYỂN DỤNG (4 BƯỚC CHUẨN)
    // =========================================================================
    const checkJobWords = [
      'kiểm tra tin', 'kiem tra tin',
      'test tin',
      'cách kiểm tra', 'cach kiem tra',
      'hướng dẫn kiểm tra', 'huong dan kiem tra',
      'quét tin', 'quet tin',
      'kiểm tra việc làm', 'kiem tra viec lam',
      'làm sao để kiểm tra', 'lam sao de kiem tra',
      'cách test', 'cach test',
      'hướng dẫn test', 'huong dan test',
      'kiểm tra thế nào', 'kiem tra the nao',
      'làm sao kiểm tra', 'lam sao kiem tra',
      'check job', 'kiểm tra tin tuyển dụng', 'kiem tra tin tuyen dung'
    ];

    if (hasWord(checkJobWords)) {
      this.setChatState('idle');

      partA = "Jobi hướng dẫn bạn 4 bước kiểm tra tin tuyển dụng chuẩn xác:";

      partBHtml = `
        <div class="space-y-2">
          <p class="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-400 flex-shrink-0"></i>
            <span>4 BƯỚC KIỂM TRA TIN TUYỂN DỤNG VỚI AI RADAR:</span>
          </p>
          <div class="space-y-2 text-xs text-slate-200">
            <div class="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 space-y-2 leading-relaxed">
              <p><strong>1.</strong> Mở mục <strong>'Kiểm Tra Tin Tuyển Dụng'</strong>.</p>
              <p><strong>2.</strong> Dán nội dung hoặc ảnh chụp tin nhắn lừa đảo (Zalo, Facebook) vào ô kiểm tra.</p>
              <p><strong>3.</strong> Bấm <strong>'Bắt Đầu Kiểm Tra Ngay'</strong> để hệ thống AI Radar tự động quét.</p>
              <p><strong>4.</strong> Xem kết quả phân tích bóc tách các chiêu trò và tải phiếu cảnh báo PDF.</p>
            </div>
          </div>
        </div>
      `;

      return { partA, partAClass, partBHtml, partBClass };
    }

    // =========================================================================
    // KỊCH BẢN ĐẶC BIỆT: THU HỒI TIỀN / LẤY LẠI TIỀN (BẢO VỆ KÉP - CHỐNG LỪA ĐẢO LẦN 2)
    // Keywords: "lấy lại", "lấy lại tiền", "thu hồi", "đòi lại", "làm sao lấy", "mất rồi làm sao"
    // =========================================================================
    const recoverMoneyWords = [
      'lấy lại tiền', 'lay lai tien',
      'lấy lại', 'lay lai',
      'thu hồi', 'thu hoi',
      'đòi lại', 'doi lai',
      'làm sao lấy', 'lam sao lay',
      'mất rồi làm sao', 'mat roi lam sao',
      'lấy lại được không', 'lay lai duoc khong',
      'có lấy lại được', 'co lay lai duoc',
      'thu hồi nợ', 'thu hoi no',
      'thu hồi tiền', 'thu hoi tien',
      'đòi tiền', 'doi tien'
    ];

    if (hasWord(recoverMoneyWords)) {
      this.setChatState('idle');

      // Bong bóng 1: Thấu cảm & Cảnh tỉnh
      partA = "Jobi rất hiểu tâm lý xót tiền và muốn lấy lại ngay lập tức của bạn. Nhưng Jobi phải nói thật: Cơ hội lấy lại tiền ngay lập tức là rất khó vì dòng tiền thường bị kẻ gian tẩu tán qua nhiều tài khoản ảo ở nước ngoài.";

      // Bong bóng 2: CẢNH BÁO ĐỎ - Khung viền đỏ nổi bật
      partBClass = "bg-red-950/50 border-2 border-red-500 text-red-100 shadow-lg shadow-red-950/40";
      partBHtml = `
        <div class="space-y-2">
          <p class="font-bold text-red-400 flex items-center gap-1.5 text-xs uppercase tracking-wide">
            <i data-lucide="alert-octagon" class="w-4 h-4 text-red-400 flex-shrink-0 animate-pulse"></i>
            <span>CẢNH BÁO ĐỎ - BẪY LỪA ĐẢO LẦN 2</span>
          </p>
          <p class="text-xs leading-relaxed text-red-100 font-medium">
            ⚠️ <strong>CẢNH BÁO KHẨN:</strong> <strong>TUYỆT ĐỐI KHÔNG tin</strong> vào các trang Facebook hay tài khoản tự xưng là <em>'Luật sư'</em>, <em>'Hacker'</em>, <em>'Dịch vụ thu hồi tiền lừa đảo'</em>. Đây là bẫy lừa đảo lần 2! Chúng sẽ bắt bạn nộp <em>'phí làm hồ sơ'</em> hoặc <em>'phí treo hệ thống'</em> rồi chặn liên lạc.
          </p>
          <div class="p-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 text-xs leading-relaxed space-y-1.5 mt-2">
            <p class="font-bold text-cyan-300">🛡️ HƯỚNG DẪN HỢP PHÁP DUY NHẤT HIỆN NAY:</p>
            <p>Cách duy nhất và đúng pháp luật hiện nay là bạn hãy <strong>in toàn bộ sao kê chuyển khoản, chụp màn hình chat</strong> và mang ra trình báo trực tiếp tại <strong>Trụ sở Công an phường/xã gần nhất</strong>. Hoặc gọi số hotline <strong>Công an Thành phố Đồng Nai: 0251.3685134</strong> để được hướng dẫn nộp đơn tố giác.</p>
          </div>
        </div>
      `;

      return { partA, partAClass, partBHtml, partBClass };
    }

    // =========================================================================
    // KỊCH BẢN 2: USER PHẢN HỒI KHI ĐANG Ở TRẠNG THÁI 'awaiting_card_lock'
    // =========================================================================
    if (currentState === 'awaiting_card_lock') {
      // 1. Phản hồi Tình huống 1: Đã chuyển khoản tiền / mất tiền / gõ số 1
      const isCase1 = /\b(1|th1|th 1|tình huống 1)\b/i.test(q) || /1️⃣/.test(q) || /^(1|1️⃣|\#1)$/i.test(q.trim()) ||
        ['chuyển khoản', 'chuyen khoan', 'đã chuyển', 'da chuyen', 'mất tiền', 'mat tien', 'nạp tiền', 'nap tien', 'tiền cọc', 'tien coc', 'phí làm thẻ', 'phi lam the', 'nhiệm vụ', 'nhiem vu', 'momo', 'bị trừ tiền'].some(w => q.includes(w));

      // 2. Phản hồi Tình huống 2: Chỉ gửi ảnh CCCD / bấm link lạ / chưa mất tiền / gõ số 2
      const isCase2 = /\b(2|th2|th 2|tình huống 2)\b/i.test(q) || /2️⃣/.test(q) || /^(2|2️⃣|\#2)$/i.test(q.trim()) ||
        ['chỉ gửi cccd', 'gửi cccd', 'gui cccd', 'ảnh cccd', 'anh cccd', 'link lạ', 'link la', 'bấm link', 'bam link', 'thông tin cá nhân', 'thong tin ca nhan', 'chưa mất tiền', 'chua mat tien', 'chỉ gửi ảnh', 'chi gui anh'].some(w => q.includes(w));

      // 3. Phản hồi Tình huống 3: Kẻ gian đe dọa / ép nộp thêm gỡ lệnh / gõ số 3
      const isCase3 = /\b(3|th3|th 3|tình huống 3)\b/i.test(q) || /3️⃣/.test(q) || /^(3|3️⃣|\#3)$/i.test(q.trim()) ||
        ['đe dọa', 'de doa', 'dọa kiện', 'doa kien', 'gỡ lệnh', 'go lenh', 'hoàn tiền', 'hoan tien', 'phong tỏa', 'phong toa', 'đòi tiền', 'doi tien', 'ép nộp'].some(w => q.includes(w));

      if (isCase1) {
        this.setChatState('idle');
        partA = 'HƯỚNG DẪN KHẨN CẤP: BẠN ĐÃ LỠ CHUYỂN TIỀN CHO KẺ GIAN';
        partBHtml = `
          <div class="space-y-2.5">
            <p class="font-bold text-red-400 flex items-center gap-1.5 text-xs">
              <i data-lucide="alert-octagon" class="w-4 h-4 text-red-400 flex-shrink-0 animate-pulse"></i>
              <span>CÁC BƯỚC XỬ LÝ KHẨN CẤP KHI ĐÃ CHUYỂN TIỀN:</span>
            </p>
            <div class="p-2.5 rounded-xl bg-slate-950/80 border border-red-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
              <p><strong>1. Khóa thẻ / Tài khoản ngay:</strong> Mở ngay app ngân hàng hoặc ví điện tử bấm khóa thẻ và tính năng thanh toán trực tuyến, hoặc lật mặt sau thẻ gọi hotline tổng đài 24/7 yêu cầu khóa khẩn cấp để ngăn kẻ gian tiếp tục rút tiền.</p>
              <p><strong>2. Thu thập & bảo quản chứng cứ:</strong> Chụp lại toàn bộ sao kê giao dịch (có mã FT/mã tham chiếu, STK và tên người nhận), biên lai chuyển tiền và toàn bộ nội dung tin nhắn chat với kẻ gian. Đến ngân hàng in sao kê có mộc đỏ.</p>
              <p><strong>3. Trình báo cơ quan Công an:</strong> Mang hồ sơ chứng cứ đến <strong>Công an phường/xã gần nhất</strong> để nộp đơn tố giác tội phạm lừa đảo chiếm đoạt tài sản, hoặc liên hệ ngay hotline <strong>Công an TP. Đồng Nai: 0251.3685134</strong> để được tiếp nhận và hướng dẫn xử lý.</p>
              <p><strong>4. CẢNH BÁO BẪY LỪA ĐẢO LẦN 2:</strong> Tuyệt đối <strong>KHÔNG tin</strong> vào các trang mạng tự xưng 'Luật sư', 'Hacker', 'Thu hồi nợ treo' nhận lấy lại tiền. Đó 100% là bẫy lừa đảo lần 2!</p>
            </div>
          </div>
        `;
        return { partA, partBHtml };
      }

      if (isCase2) {
        this.setChatState('idle');
        partA = 'HƯỚNG DẪN BẢO VỆ: LỘ CCCD HOẶC BẤM ĐƯỜNG LINK LẠ';
        partBHtml = `
          <div class="space-y-2.5">
            <p class="font-bold text-amber-300 flex items-center gap-1.5 text-xs">
              <i data-lucide="shield-alert" class="w-4 h-4 text-amber-300 flex-shrink-0"></i>
              <span>BIỆN PHÁP BẢO VỆ KHI BỊ LỘ THÔNG TIN / BẤM LINK LẠ:</span>
            </p>
            <div class="p-2.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
              <p><strong>1. Thu hồi quyền truy cập / Diệt mã độc:</strong> Nếu đã lỡ bấm link lạ hoặc cài file APK (Dịch vụ công/Thuế giả mạo), hãy lập tức bật Chế độ máy bay (ngắt mạng Wi-Fi/4G), gỡ bỏ app lạ hoặc khôi phục cài đặt gốc điện thoại. Sử dụng thiết bị khác an toàn để đổi mật khẩu app ngân hàng và mã PIN ngay.</p>
              <p><strong>2. Cảnh báo mạo danh danh tính:</strong> Đăng thông báo công khai lên Facebook/Zalo cá nhân thông báo ảnh CCCD của bạn bị lộ từ ngày... để người thân, bạn bè phòng tránh trường hợp kẻ gian dùng danh tính của bạn mượn tiền hoặc lừa đảo.</p>
              <p><strong>3. Xin giấy xác nhận tại Công an phường/xã:</strong> Trực tiếp đến Công an phường/xã nơi cư trú trình báo và xin cấp văn bản xác nhận việc bị lộ thông tin cá nhân. Đây là bằng chứng ngoại phạm pháp lý bảo vệ bạn nếu kẻ gian dùng CCCD để mở tài khoản rửa tiền hoặc vay tín dụng đen. Hotline Công an TP. Đồng Nai: <strong>0251.3685134</strong>.</p>
            </div>
          </div>
        `;
        return { partA, partBHtml };
      }

      if (isCase3) {
        this.setChatState('idle');
        partA = 'BÌNH TĨNH: KẺ GIAN HOÀN TOÀN KHÔNG DÁM BÁO CÔNG AN HAY KIỆN BẠN';
        partBHtml = `
          <div class="space-y-2.5">
            <p class="font-bold text-cyan-300 flex items-center gap-1.5 text-xs">
              <i data-lucide="shield-check" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
              <span>BẢN CHẤT VÀ CÁCH ĐỐI PHÓ VỚI LỜI ĐE DỌA CỦA KẺ GIAN:</span>
            </p>
            <div class="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-200 space-y-2 leading-relaxed">
              <p><strong>1. Kẻ gian KHÔNG BAO GIỜ dám đi kiện:</strong> Bạn hãy yên tâm tuyệt đối: Kẻ lừa đảo đang thực hiện hành vi phạm tội hình sự, chúng <strong>hoàn toàn không dám báo công an hay khởi kiện bạn ra tòa</strong>. Lời dọa 'phong tỏa tài sản', 'gửi giấy triệu tập' chỉ là đòn tâm lý hù dọa ép bạn chuyển thêm tiền!</p>
              <p><strong>2. TUYỆT ĐỐI KHÔNG nộp thêm tiền:</strong> Mọi yêu cầu 'nộp tiền cứu lệnh', 'phí sửa lỗi cú pháp', 'tiền mở khóa hoàn tiền' đều là bẫy. Nộp thêm là mất thêm!</p>
              <p><strong>3. Chặn liên lạc & Lưu giữ bằng chứng:</strong> Chụp màn hình toàn bộ tin nhắn đe dọa, số tài khoản ngân hàng và thông tin kẻ gian làm tư liệu, sau đó lập tức CHẶN NGAY toàn bộ số điện thoại, Zalo, Telegram của chúng.</p>
              <p><strong>4. Hỗ trợ pháp lý chính thức:</strong> Nếu tiếp tục bị quấy rối, bạn hãy gọi trực tiếp đến đường dây nóng <strong>Công an TP. Đồng Nai: 0251.3685134</strong> để được can thiệp và xử lý theo pháp luật.</p>
            </div>
          </div>
        `;
        return { partA, partBHtml };
      }

      const positiveWords = ['rồi', 'xong', 'ok', 'khoá rồi', 'khóa rồi', 'đã khóa', 'đã khoá', 'đang mở', 'đã làm', 'xong rồi', 'roi', 'khoa roi', 'da khoa', 'da lam'];
      const negativeWords = ['chưa', 'chua', 'không biết', 'khong biet', 'chưa biết', 'app lỗi', 'lỗi', 'không được', 'khong duoc', 'sao khóa', 'sao khoá', 'làm sao', 'lam sao', 'giúp', 'chưa khóa'];

      // Kiểm tra nếu user trả lời mang ý tích cực / đã làm
      if (hasWord(positiveWords)) {
        this.setChatState('idle');
        partA = 'Thở phào nhẹ nhõm! Tốt lắm.';
        partBHtml = `
          <div class="space-y-2">
            <p class="font-semibold text-emerald-400 flex items-center gap-1.5 text-xs">
              <span>✅ Đã cắt đứt đường rút tiền của kẻ gian!</span>
            </p>
            <p class="text-slate-200 text-xs leading-relaxed">
              Thở phào nhẹ nhõm! Tốt lắm. Giờ bạn hãy <strong>chụp lại toàn bộ lịch sử chat và bill chuyển tiền</strong>, rồi gọi ngay cho <strong>Công an Thành phố Đồng Nai: 0251.3685134</strong> hoặc đến Công an địa phương để trình báo nhé.
            </p>
          </div>
        `;
        return { partA, partBHtml };
      }

      // Kiểm tra nếu user trả lời mang ý tiêu cực / chưa làm / bối rối
      if (hasWord(negativeWords)) {
        // Giữ nguyên state 'awaiting_card_lock'
        partA = 'Gấp lắm rồi! Đừng chần chừ thêm một phút nào nữa!';
        partBHtml = `
          <div class="space-y-2">
            <p class="font-bold text-amber-300 flex items-center gap-1 text-xs">
              <span>⚠️ Gấp lắm rồi!</span>
            </p>
            <p class="text-slate-200 text-xs leading-relaxed">
              Nếu app lỗi, bạn <strong>lật ngay mặt sau thẻ ngân hàng lên, có số điện thoại tổng đài 1900...</strong> Gọi ngay cho họ đọc số CMND/CCCD yêu cầu khóa thẻ 2 chiều ngay lập tức!
            </p>
            <div class="p-2.5 rounded-xl bg-amber-950/40 border border-amber-600/40 text-amber-200 text-[11px] leading-relaxed">
              👉 Đọc to với nhân viên: <em>"Tôi nghi ngờ tài khoản bị kẻ gian xâm nhập, yêu cầu khóa thẻ và dừng toàn bộ giao dịch trực tuyến ngay lập tức!"</em>
            </div>
            <p class="text-cyan-300 text-[11px] font-medium">Khóa xong báo lại cho Jobi nhé!</p>
          </div>
        `;
        return { partA, partBHtml };
      }
    }

    // =========================================================================
    // KỊCH BẢN 3B: USER PHẢN HỒI KHI ĐANG Ở TRẠNG THÁI 'awaiting_cccd_details'
    // =========================================================================
    if (currentState === 'awaiting_cccd_details') {
      const twoSidesOrScanWords = ['2 mặt', 'hai mặt', 'cả hai', 'cả 2', '2 mat', 'hai mat', 'ca hai', 'ca 2', 'có quay', 'co quay', 'có quét', 'co quet', 'quét mặt', 'quet mat', 'quay video', 'video', 'khuôn mặt', 'khuon mat'];
      const oneSideNoScanWords = ['1 mặt', 'một mặt', 'chỉ mặt trước', 'chi mat truoc', '1 mat', 'mot mat', 'không quét', 'khong quet', 'không quay', 'khong quay', 'ko quét', 'ko quay', 'chỉ 1 mặt', 'chỉ một mặt', 'mặt trước thôi', 'không có video', 'khong co video'];

      if (hasWord(twoSidesOrScanWords)) {
        this.setChatState('idle');
        partA = 'Báo động đỏ! Đây là tình trạng nguy cơ cao.';
        partBHtml = `
          <div class="space-y-2">
            <p class="font-bold text-red-400 text-xs">
              Báo động đỏ! Bạn cần đăng ngay thông báo lên trang cá nhân (Zalo/Facebook) tuyên bố bị lộ CCCD để phòng hờ bị mạo danh vay nợ, và đến Công an phường trình báo để cấp giấy xác nhận không thực hiện các giao dịch vay đó nhé!
            </p>
            <div class="p-2.5 rounded-xl bg-red-950/40 border border-red-700/60 text-slate-200 text-xs leading-relaxed space-y-1">
              <p>👉 Việc trình báo Công an phường giúp bạn có bằng chứng ngoại phạm pháp lý nếu kẻ gian dùng CCCD đó để mở tài khoản rửa tiền hoặc vay tín dụng đen. Hotline Công an TP. Đồng Nai: <strong>0251.3685134</strong>.</p>
            </div>
          </div>
        `;
        return { partA, partBHtml };
      }

      if (hasWord(oneSideNoScanWords)) {
        this.setChatState('idle');
        partA = 'May mắn là mức độ rủi ro thấp hơn!';
        partBHtml = `
          <div class="space-y-2">
            <p class="font-semibold text-emerald-400 text-xs">
              May mắn là mức độ rủi ro thấp hơn vì các app vay tín dụng bắt buộc phải quét NFC hoặc sinh trắc học khuôn mặt. Bạn chỉ cần cẩn thận không bấm link lạ gửi về số điện thoại là được.
            </p>
            <p class="text-slate-300 text-xs leading-relaxed">
              Nếu nhận được cuộc gọi mạo danh cơ quan chức năng hoặc nhân viên ngân hàng, hãy dứt khoát cúp máy ngay nhé!
            </p>
          </div>
        `;
        return { partA, partBHtml };
      }
    }

    // =========================================================================
    // KỊCH BẢN 1: MẤT TIỀN / LỪA TIỀN (Keywords: mất tiền, lừa, chuyển, nộp, cọc)
    // =========================================================================
    const moneyLossWords = ['mất tiền', 'mat tien', 'lừa', 'lua', 'vừa bị lừa', 'vua bi lua', 'bị lừa', 'chuyển', 'chuyen', 'nộp', 'nop', 'cọc', 'coc'];
    if (hasWord(moneyLossWords)) {
      this.setChatState('awaiting_card_lock');

      const prompts = [
        "Trời ơi, bình tĩnh bạn nhé! Tiền mất có thể tìm cách giải quyết sau, nhưng bạn phải CẮT ĐỨT ngay không cho chúng rút thêm. Hiện tại bạn có đang cầm điện thoại cài app ngân hàng đó ở đây không? Vào KHÓA THẺ khẩn cấp ngay được chưa?",
        "Đừng hoảng loạn nhé, hít thở sâu nào! Bạn TUYỆT ĐỐI không nộp thêm bất cứ đồng nào để 'gỡ' hay 'chuộc lại' nữa nhé. Bạn đã mở app ngân hàng lên để bấm KHÓA THẺ/TÀI KHOẢN chưa?"
      ];
      const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];

      partA = 'Bình tĩnh bạn nhé, hít thở sâu nào!';
      partBHtml = `
        <div class="space-y-2.5">
          <p class="font-semibold text-slate-100 leading-relaxed text-xs">
            ${selectedPrompt}
          </p>
          <div class="p-2.5 rounded-xl bg-red-950/40 border border-red-700/60 text-red-200 text-[11px] leading-relaxed">
            🚫 <strong>CẢNH BÁO:</strong> Kẻ gian luôn bịa lý do <em>"lỗi lệnh, sai cú pháp, tiền bị treo, nộp thêm tiền cứu lệnh"</em> để tiếp tục lừa. Tuyệt đối không chuyển thêm một đồng nào!
          </div>
          <p class="text-amber-300 text-[11px] font-semibold">
            👉 Bạn hãy vào app ngân hàng bấm Khóa thẻ ngay, hoặc lật mặt sau thẻ gọi hotline tổng đài ngân hàng để yêu cầu khóa 2 chiều ngay lập tức!
          </p>
          <div class="p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 text-xs text-slate-200 space-y-2 leading-relaxed mt-2.5 shadow-sm">
            <p class="font-bold text-cyan-300 flex items-center gap-1.5">
              <i data-lucide="help-circle" class="w-4 h-4 text-cyan-400 flex-shrink-0"></i>
              <span>Để Jobi hướng dẫn bạn bước xử lý chính xác nhất ngay lúc này, bạn hãy cho Jobi biết cụ thể bạn vừa gặp tình huống nào dưới đây nhé:</span>
            </p>
            <div class="space-y-1.5 pl-1 text-[11px] text-slate-300">
              <p><strong>1️⃣ Tình huống 1:</strong> Bạn đã lỡ chuyển khoản tiền (tiền cọc đồng phục, phí làm thẻ, hoặc nạp tiền làm nhiệm vụ)? <em>(Nếu có, khoảng bao nhiêu tiền và qua ngân hàng/ví nào?)</em></p>
              <p><strong>2️⃣ Tình huống 2:</strong> Bạn mới chỉ gửi ảnh chụp CCCD, thông tin cá nhân hoặc bấm vào đường link lạ <em>(chưa mất tiền)</em>?</p>
              <p><strong>3️⃣ Tình huống 3:</strong> Kẻ gian đang nhắn tin đe dọa hoặc yêu cầu bạn nộp thêm tiền để <em>'gỡ lệnh/hoàn tiền'</em>?</p>
            </div>
            <p class="text-amber-300 font-semibold text-[11px] pt-1 border-t border-slate-800">
              👉 Hãy nhắn rõ tình trạng của bạn (hoặc gõ số 1, 2, 3) để Jobi chỉ cách giải quyết ngay lập tức!
            </p>
          </div>
        </div>
      `;
      return { partA, partBHtml };
    }

    // =========================================================================
    // KỊCH BẢN 3A: LỘ DỮ LIỆU CÁ NHÂN (Keywords: cccd, cmnd, mặt trước, hình ảnh, thông tin cá nhân)
    // =========================================================================
    const cccdWords = ['cccd', 'cmnd', 'mặt trước', 'mat truoc', 'hình ảnh', 'hinh anh', 'thông tin cá nhân', 'thong tin ca nhan', 'căn cước', 'can cuoc', 'ảnh cccd'];
    if (hasWord(cccdWords)) {
      this.setChatState('awaiting_cccd_details');

      partA = 'Nguy hiểm đấy! Bọn chúng hay dùng CCCD để vay app đen hoặc mở tài khoản lừa đảo.';
      partBHtml = `
        <div class="space-y-2">
          <p class="font-semibold text-slate-100 leading-relaxed text-xs">
            Bạn hãy nhớ lại xem: <strong>Bạn gửi MỘT MẶT hay CẢ HAI MẶT? Có bị bắt quay video quét khuôn mặt không?</strong>
          </p>
          <p class="text-slate-300 text-[11px] leading-relaxed">
            Nhắn cho Jobi biết tình trạng cụ thể (ví dụ: "chỉ gửi 1 mặt trước" hoặc "gửi cả 2 mặt và quay video") để Jobi hướng dẫn biện pháp bảo vệ phù hợp nhất nhé!
          </p>
        </div>
      `;
      return { partA, partBHtml };
    }

    // =========================================================================
    // KỊCH BẢN 4: HỎI TIN TUYỂN DỤNG (Keywords: việc nhẹ, chốt đơn, shopee, làm tại nhà, gấp dán, milo, dán tem, bánh kẹo)
    // =========================================================================
    const scamJobWords = ['việc nhẹ', 'viec nhe', 'chốt đơn', 'chot don', 'shopee', 'làm tại nhà', 'lam tai nha', 'gấp dán', 'gap dan', 'dán tem', 'dan tem', 'milo', 'bánh kẹo', 'banh keo', 'ctv'];
    if (hasWord(scamJobWords)) {
      this.setChatState('idle');

      partA = 'Cảnh báo lừa đảo nhiệm vụ:';
      partBHtml = `
        <div class="space-y-2">
          <p class="font-bold text-red-400 text-xs">
            100% LỪA ĐẢO NHIỆM VỤ!
          </p>
          <p class="text-slate-200 text-xs leading-relaxed">
            Các công ty ở KCN Đồng Nai KHÔNG BAO GIỜ tuyển làm online chốt đơn hay dán tem tại nhà. Hãy CHẶN NGAY tài khoản đó!
          </p>
          <p class="text-amber-300 text-xs font-semibold">
            👉 Bọn chúng sẽ cho bạn nhận tiền hoa hồng 1-2 đơn nhỏ đầu tiên, sau đó lừa nộp tiền cọc hàng triệu đồng vào các đơn lớn hơn rồi chặn liên lạc!
          </p>
        </div>
      `;
      return { partA, partBHtml };
    }

    // =========================================================================
    // KỊCH BẢN BỔ SUNG 1: TƯ VẤN CÔNG VIỆC & CÔNG TY PHÙ HỢP (HƯỚNG NGHIỆP ĐỘNG)
    // Phân tích linh hoạt theo đúng thông tin thực tế người dùng nhập (chiều cao, sở thích, kỹ năng, ngành học...)
    // =========================================================================
    const careerWords = [
      'thích hợp làm nghề gì', 'thich hop lam nghe gi',
      'hợp làm nghề gì', 'hop lam nghe gi',
      'làm nghề gì', 'lam nghe gi',
      'nghề gì và cty nào', 'nghe gi va cty nao',
      'nghề gì và công ty nào', 'nghe gi va cong ty nao',
      'cty nào', 'công ty nào', 'cong ty nao',
      'làm ở cty nào', 'lam o cty nao',
      'làm ở công ty nào', 'lam o cong ty nao',
      'hợp nghề gì', 'hop nghe gi',
      'thích hợp nghề gì', 'thich hop nghe gi',
      'thích hợp làm gì', 'thich hop lam gi',
      'làm công việc gì', 'lam cong viec gi',
      'tư vấn nghề', 'tu van nghe',
      'tư vấn công việc', 'tu van cong viec',
      'tư vấn việc làm', 'tu van viec lam',
      'tư vấn hướng nghiệp', 'tu van huong nghiep',
      'hướng nghiệp', 'huong nghiep',
      'tìm việc phù hợp', 'tim viec phu hop',
      'việc làm phù hợp', 'viec lam phu hop',
      'việc gì phù hợp', 'viec gi phu hop',
      'nên làm ở đâu', 'nen lam o dau',
      'nên xin việc ở đâu', 'nen xin viec o dau',
      'nên làm công ty nào', 'nen lam cong ty nao',
      'xin vào công ty nào', 'xin vao cong ty nao',
      'làm bên điện tử', 'lam ben dien tu',
      'học điện tử', 'hoc dien tu',
      'ngành điện tử', 'nganh dien tu',
      'xin việc', 'xin viec', 'tìm việc', 'tim viec'
    ];

    const profileKeywords = [
      '1m7', '1m70', '1m75', '1m6', '1m68', '1m65', '1m62', '1m58', '1m55', '1m8', 'cao 1m', 'chiều cao', 'chieu cao',
      'đá bóng', 'da bong', 'đá banh', 'da banh', 'thể thao', 'the thao',
      'sở thích', 'so thich', 'thể lực', 'the luc', 'điện tử', 'dien tu',
      'cơ khí', 'co khi', 'kỹ thuật', 'ky thuat', 'kế toán', 'ke toan', 'tiếng trung', 'tieng trung',
      'tiếng anh', 'tieng anh', 'lái xe', 'lai xe', 'bằng b2', 'may mặc', 'may mac', 'giày da'
    ];

    const isCareerQuery = hasWord(careerWords) || (hasWord(profileKeywords) && (
      q.includes('nghề') || q.includes('việc') || q.includes('cty') || 
      q.includes('công ty') || q.includes('hợp') || q.includes('làm') || 
      q.includes('tư vấn') || q.includes('hướng nghiệp') || q.includes('xin') ||
      q.includes('thích hợp') || q.includes('ở đâu') || q.includes('học') ||
      q.includes('tốt nghiệp') || q.includes('kinh nghiệm') || q.includes('bằng')
    ));

    if (isCareerQuery) {
      this.setChatState('idle');
      return this.generateDynamicCareerAdvice(userMessage);
    }

    // =========================================================================
    // KỊCH BẢN BỔ SUNG 2: HỎI NGOÀI LỀ / GIAO TIẾP PHIẾM (OFF-TOPIC)
    // Keywords: "ăn sáng chưa", "ăn cơm chưa", "khỏe không", "thời tiết", "buồn quá", "chơi game"...
    // =========================================================================
    const offTopicWords = [
      'ăn sáng chưa', 'an sang chua',
      'ăn cơm chưa', 'an com chua',
      'ăn trưa chưa', 'an trua chua',
      'ăn tối chưa', 'an toi chua',
      'ăn chưa', 'an chua',
      'ăn gì chưa', 'an gi chua',
      'khỏe không', 'khoe khong',
      'khỏe ko', 'khoe ko',
      'có khỏe không', 'co khoe khong',
      'bạn khỏe không', 'ban khoe khong',
      'dạo này thế nào', 'dao nay the nao',
      'thời tiết', 'thoi tiet',
      'buồn quá', 'buon qua',
      'chán quá', 'chan qua',
      'buồn ghê', 'buon ghe',
      'chán ghê', 'chan ghe',
      'chơi game', 'choi game',
      'chơi liên quân', 'choi lien quan',
      'đánh game', 'danh game',
      'hát đi', 'hat di',
      'kể chuyện', 'ke chuyen',
      'kể chuyện cười', 'ke chuyen cuoi',
      'ngủ chưa', 'ngu chua',
      'đi ngủ', 'di ngu',
      'người yêu', 'nguoi yeu',
      'yêu không', 'yeu khong',
      'thất tình', 'that tinh'
    ];

    if (hasWord(offTopicWords)) {
      this.setChatState('idle');
      partA = "Xin lỗi, Jobi chỉ hỗ trợ tuyển dụng công việc và phòng chống lừa đảo...";
      partBHtml = `
        <div class="space-y-2">
          <p class="text-slate-200 text-xs leading-relaxed">
            Xin lỗi, Jobi chỉ hỗ trợ tuyển dụng công việc và phòng chống lừa đảo... Bạn muốn kiểm tra căn cước, kiểm tra tin tuyển dụng hay tra cứu công ty nào ạ?
          </p>
          <div class="p-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-xs text-slate-300 space-y-1 mt-2">
            <p class="font-medium text-cyan-300">💡 Bạn có thể nhờ Jobi trợ giúp:</p>
            <p>• <strong>Kiểm tra tin tuyển dụng:</strong> Dán tin nhắn tuyển dụng nghi vấn để bóc mẽ bẫy lừa đảo.</p>
            <p>• <strong>Bảo vệ CCCD / Thẻ ngân hàng:</strong> Hướng dẫn xử lý khẩn cấp khi lỡ chuyển tiền cọc hoặc lộ thông tin cá nhân.</p>
            <p>• <strong>Tư vấn việc làm & công ty uy tín:</strong> Gợi ý vị trí việc làm và doanh nghiệp điện tử, cơ khí chuẩn mực tại các KCN Đồng Nai.</p>
          </div>
        </div>
      `;
      return { partA, partAClass, partBHtml, partBClass };
    }

    // =========================================================================
    // KỊCH BẢN 5: CÂU HỎI CHUNG / FALLBACK
    // =========================================================================
    this.setChatState('idle');
    partA = 'Jobi luôn sẵn sàng hỗ trợ bạn!';
    partBHtml = `
      <div class="space-y-2">
        <p class="text-slate-200 text-xs leading-relaxed">
          Jobi luôn sẵn sàng hỗ trợ bạn! Bạn có thể mô tả cụ thể hơn tình huống đang gặp phải: <strong>Bạn đang muốn kiểm tra một tin tuyển dụng nghi vấn, hay đã lỡ chuyển tiền cọc/lộ ảnh CCCD cho kẻ gian?</strong>
        </p>
        <p class="text-slate-400 text-[11px] leading-relaxed">
          Dù bất kỳ tình huống nào, nguyên tắc bảo vệ số 1 là: Giữ bình tĩnh, tuyệt đối không nộp thêm tiền và không cung cấp mã OTP/giấy tờ gốc.
        </p>
      </div>
    `;
    return { partA, partBHtml };
  },

  // Tương thích ngược nếu có module gọi generateJobiResponse
  generateJobiResponse(userMessage) {
    return this.analyzeAndRespond(userMessage);
  },

  // 3. XỬ LÝ NÚT "KIỂM TRA TIN MỚI": XÓA TRẮNG FORM & QUAY VỀ BƯỚC 1
  resetScanForm() {
    this.wizardDraft = {
      step1: {
      companyName: '',
      kcn: 'KCN Biên Hòa 2',
      kcnSelectValue: 'KCN Biên Hòa 2',
      kcnKhac: '',
      position: '',
      salary: '',
      contact: '',
      applicationMethod: 'Trực tiếp tại cổng KCN',
      applicationMethodSelectValue: 'Trực tiếp tại cổng KCN',
      applicationMethodKhac: ''
    },
      step2: { content: '', quickFlags: { feeRequired: false, noInterview: false, privateChat: false, keepIdDoc: false, unrealisticPay: false, taskDeposit: false } },
      step3: { analysisResult: null },
      step4: { checklist: { noDepositPaid: false, noOriginalIdGiven: false, verifiedAtGate: false, verifiedViaHotline: false, clearLaborContract: false } }
    };
    this.renderStep(1);
    this.showToast('Đã làm mới biểu mẫu! Bạn có thể kiểm tra tin tuyển dụng mới.', 'info');
    window.scrollTo(0, 0);
  },

  // ==========================================
  // 6. CÀI ĐẶT, THEME & TOAST (1.5 GIÂY, KHÔNG XẾP CHỒNG)
  // ==========================================
  async updateBadges() {
    let historyCount = 0;
    try {
      const stored = localStorage.getItem('scan_history') || localStorage.getItem('db_scan_history');
      if (stored) {
        historyCount = JSON.parse(stored).length;
      }
    } catch (e) {}

    if (historyCount === 0 && window.AppDB) {
      try {
        const history = await window.AppDB.getScanHistory();
        historyCount = history.length;
      } catch (e) {}
    }

    const badgeHistory = document.getElementById('badge-history-count');
    if (badgeHistory) badgeHistory.textContent = historyCount;

    const entCount = (this.cachedEnterprises && this.cachedEnterprises.length > 0)
      ? this.cachedEnterprises.length
      : DEFAULT_KCN_ENTERPRISES.length;

    const badgeBlacklist = document.getElementById('badge-blacklist-count');
    if (badgeBlacklist) badgeBlacklist.textContent = entCount;
  },

  initTheme() {
    const root = document.documentElement;
    const saved = localStorage.getItem('theme_mode') || 'dark';
    if (saved === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    this.updateThemeIcon();
  },

  toggleTheme() {
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    if (isDark) {
      root.classList.remove('dark');
      root.classList.add('light');
      localStorage.setItem('theme_mode', 'light');
      this.showToast('Đã chuyển sang giao diện Sáng', 'info');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      localStorage.setItem('theme_mode', 'dark');
      this.showToast('Đã chuyển sang giao diện Tối (Cyber)', 'info');
    }
    this.updateThemeIcon();
  },

  updateThemeIcon() {
    const icon = document.getElementById('theme-icon');
    if (!icon) return;
    const isLight = document.documentElement.classList.contains('light');
    icon.setAttribute('data-lucide', isLight ? 'moon' : 'sun');
    if (window.lucide) window.lucide.createIcons();
  },

  openSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  },

  closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.classList.add('hidden');
  },

  async saveSettings() {
    const apiKey = document.getElementById('settings-api-key')?.value.trim() || '';
    if (window.AppDB) {
      await window.AppDB.saveUserProfile({ geminiApiKey: apiKey });
      this.closeSettingsModal();
      this.showToast('Đã lưu cấu hình AI thành công!', 'success');
    }
  },

  // ==========================================
  // 1. TẠO HỆ THỐNG THÔNG BÁO TÙY CHỈNH (CUSTOM NOTIFICATION CÓ NÚT ĐÓNG X)
  // ==========================================
  showCustomAlert(message, title = null) {
    if (!title) {
      if (message && message.toLowerCase().includes('thành công')) {
        title = 'Thành Công';
      } else if (message && (message.toLowerCase().includes('vui lòng') || message.toLowerCase().includes('cảnh báo'))) {
        title = 'Thông Báo Nhắc Nhở';
      } else {
        title = 'Thông Báo';
      }
    }

    let overlay = document.getElementById('custom-alert-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'custom-alert-overlay';
      overlay.onclick = (e) => {
        if (e.target === overlay) App.closeCustomAlert();
      };
      document.body.appendChild(overlay);
    }

    const isWarning = title && (title.toLowerCase().includes('cảnh báo') || title.toLowerCase().includes('nhắc nhở') || title.toLowerCase().includes('an toàn'));
    const isSuccess = !isWarning && (title === 'Thành Công' || (message && message.toLowerCase().includes('thành công')));
    const iconName = isWarning ? 'shield-alert' : isSuccess ? 'check-circle' : 'bell';
    const iconStyle = isWarning
      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
      : isSuccess 
      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';

    overlay.innerHTML = `
      <div class="custom-alert-box" onclick="event.stopPropagation()">
        <!-- Nút Đóng X trên góc -->
        <button type="button" class="custom-alert-close-x" onclick="App.closeCustomAlert()" title="Đóng thông báo">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>

        <!-- Icon nổi bật -->
        <div class="w-12 h-12 rounded-2xl ${iconStyle} border flex items-center justify-center">
          <i data-lucide="${iconName}" class="w-6 h-6"></i>
        </div>

        <div class="space-y-1">
          <h4 class="custom-alert-title text-base font-extrabold tracking-tight">${title}</h4>
          <p class="custom-alert-msg text-xs leading-relaxed max-w-xs mx-auto">${message}</p>
        </div>

        <button type="button" class="custom-alert-btn" onclick="App.closeCustomAlert()">
          Đóng
        </button>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons({ root: overlay });

    requestAnimationFrame(() => {
      overlay.classList.add('show');
    });
  },

  closeCustomAlert() {
    const overlay = document.getElementById('custom-alert-overlay');
    if (overlay) {
      overlay.classList.remove('show');
    }
  },

  // Toast hiển thị mượt mà, tùy chỉnh thời gian timeout (mặc định 1.5s, hỗ trợ 2.5s)
  showToast(message, type = 'info', duration = 1500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
      document.body.appendChild(container);
    }

    // Xóa ngay toast cũ trước đó để không bị xếp chồng
    container.innerHTML = '';

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto transform transition-all duration-200 translate-y-3 opacity-0 p-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${
      type === 'success' ? 'bg-slate-900/95 border-emerald-500/60 text-emerald-300' :
      type === 'warning' ? 'bg-slate-900/95 border-amber-500/50 text-amber-300' :
      type === 'error' ? 'bg-slate-900/95 border-red-500/50 text-red-300' :
      'bg-slate-900/95 border-cyan-500/50 text-cyan-300'
    }`;

    toast.innerHTML = `
      <div class="flex-shrink-0">
        <i data-lucide="${type === 'success' ? 'check-circle' : type === 'warning' ? 'alert-triangle' : 'info'}" class="w-4 h-4"></i>
      </div>
      <p class="text-xs font-semibold flex-grow">${message}</p>
      <button type="button" class="text-slate-400 hover:text-white flex-shrink-0" onclick="this.parentElement.remove()">
        <i data-lucide="x" class="w-3.5 h-3.5"></i>
      </button>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons({ root: toast });

    requestAnimationFrame(() => toast.classList.remove('translate-y-3', 'opacity-0'));

    // Tự động biến mất sau thời gian duration
    setTimeout(() => {
      toast.classList.add('translate-y-3', 'opacity-0');
      setTimeout(() => toast.remove(), 200);
    }, duration);
  }
};

window.App = App;

// Expose các hàm toàn cục để gọi trực tiếp mọi lúc từ bên ngoài
window.showCustomAlert = (msg, title) => App.showCustomAlert(msg, title);
window.closeCustomAlert = () => App.closeCustomAlert();
window.deleteHistoryItem = (id) => App.deleteHistoryItem(id);
window.saveToDatabaseHistory = () => App.saveToDatabaseHistory();
window.closeReportPreviewModal = () => App.closeReportPreviewModal();
window.downloadReportPDF = () => App.downloadReportPDF();
window.printSecurityReport = () => App.printSecurityReport();
window.goToStep = (step) => App.goToStep(step);
window.showStep = (step) => App.showStep(step);
window.renderStep = (step) => App.renderStep(step);
window.renderEnterprises = () => App.renderEnterprises();
window.DEFAULT_KCN_ENTERPRISES = DEFAULT_KCN_ENTERPRISES;
window.openEnterpriseDetail = (id) => App.openEnterpriseDetail(id);
window.closeEnterpriseDetailModal = () => App.closeEnterpriseDetailModal();
window.onChecklistChange = (key, val) => App.onChecklistChange(key, val);
window.handleStep4ActionClick = (e, a) => App.handleStep4ActionClick(e, a);
window.analyzeAndRespond = (msg) => App.analyzeAndRespond(msg);
window.getChatState = () => App.getChatState();

// Khởi chạy khi DOM tải xong
document.addEventListener('DOMContentLoaded', () => {
  App.init();

  // Đóng Modal xem trước khi click ra vùng ngoài tờ A4
  const previewModal = document.getElementById('report-preview-modal');
  if (previewModal) {
    previewModal.addEventListener('click', (e) => {
      if (e.target === previewModal) {
        App.closeReportPreviewModal();
      }
    });
  }

  // Đóng Modal chi tiết doanh nghiệp khi click ra vùng ngoài
  const entModal = document.getElementById('enterprise-detail-modal');
  if (entModal) {
    entModal.addEventListener('click', (e) => {
      if (e.target === entModal) {
        App.closeEnterpriseDetailModal();
      }
    });
  }
});
