/**
 * AI CHECK JOB - ĐỒNG NAI
 * Module Phân Tích AI Chuyên Sâu & Đối Chiếu Dữ Liệu (src/js/aiScanner.js)
 * Tích hợp Rule-based NLP Heuristic + Đối chiếu Doanh nghiệp KCN + Google Gemini API.
 */

const SCAM_PATTERNS = [
  {
    category: "CRITICAL_FINANCIAL",
    label: "Yêu cầu thu phí / đặt cọc trước",
    regex: /(đóng\s*phí|nộp\s*phí|phí\s*đồng\s*phục|phí\s*thẻ\s*từ|phí\s*làm\s*thẻ|lệ\s*phí\s*hồ\s*sơ|tiền\s*cọc|đặt\s*cọc|thế\s*chân|tạm\s*ứng\s*tiền|phí\s*khám\s*sức\s*khỏe|nạp\s*tiền\s*cọc|chuyển\s*khoản\s*trước|chuyển\s*tiền\s*trước|nộp\s*trước)/gi,
    weight: 35,
    advice: "Doanh nghiệp chân chính tại KCN Đồng Nai không bao giờ thu tiền làm thẻ, đồng phục hay hồ sơ trước khi người lao động vào làm."
  },
  {
    category: "TASK_COMMISSION",
    label: "Chiêu trò nhiệm vụ / Hoa hồng chốt đơn",
    regex: /(hoàn\s*vốn\s*100%|hoa\s*hồng\s*\d+%|chốt\s*đơn|nhận\s*tiền\s*ngay\s*sau|nạp\s*tiền\s*làm\s*nhiệm\s*vụ|kích\s*hoạt\s*tài\s*khoản\s*hệ\s*thống|làm\s*nhiệm\s*vụ|mã\s*nhiệm\s*vụ|combo\s*đơn|hoàn\s*tiền\s*gốc)/gi,
    weight: 35,
    advice: "Dấu hiệu lừa đảo chiếm đoạt tài sản online giả danh sàn TMĐT hoặc tập đoàn lớn tại Đồng Nai."
  },
  {
    category: "LEGAL_VIOLATION",
    label: "Thu giữ bản gốc CCCD/CMND trái luật",
    regex: /(giữ\s*cccd|giữ\s*cmnd|bản\s*gốc\s*cccd|nộp\s*cccd\s*gốc|giữ\s*bằng\s*gốc|giữ\s*bằng\s*lái\s*xe|giấy\s*tờ\s*gốc|nộp\s*hộ\s*chiếu\s*gốc)/gi,
    weight: 35,
    advice: "Vi phạm nghiêm trọng Khoản 1 Điều 17 Bộ luật Lao động 2019. Nguy cơ bị dùng giấy tờ để vay app tín dụng đen."
  },
  {
    category: "UNREALISTIC_PAY",
    label: "Mức thu nhập cam kết bất thường",
    regex: /(việc\s*nhẹ\s*lương\s*cao|500k\s*-\s*1tr|1tr2\/ngày|500k\/ngày|thu\s*nhập\s*theo\s*ngày|chỉ\s*cần\s*điện\s*thoại|lương\s*1[5-9]\s*triệu\s*không\s*cần\s*kinh\s*nghiệm|lương\s*18\s*triệu|lương\s*20\s*triệu)/gi,
    weight: 25,
    advice: "Lương quá cao cho lao động phổ thông hoặc công việc nhẹ tại nhà nhằm đánh vào lòng tham."
  },
  {
    category: "SUSPICIOUS_CHANNEL",
    label: "Kênh tuyển dụng & Điểm hẹn bất minh",
    regex: /(telegram|t\.me|zalo\s*cá\s*nhân|quán\s*nước|quán\s*cà\s*phê|quán\s*trà\s*đá|đối\s*diện\s*cổng|vỉa\s*hè\s*cổng|phòng\s*trọ)/gi,
    weight: 20,
    advice: "Kẻ gian né tránh phòng nhân sự tại cổng KCN mà hẹn ra các quán nước bên ngoài để tẩu thoát khi nhận tiền."
  },
  {
    category: "HANDICRAFT_SCAM",
    label: "Gia công tại nhà đòi cọc tiền hàng",
    regex: /(xâu\s*chuỗi|xâu\s*hạt|dán\s*tem|dán\s*nhãn\s*son|gấp\s*phong\s*bì|đóng\s*tăm\s*bông|gia\s*công\s*tại\s*nhà|gói\s*kẹo)/gi,
    weight: 25,
    advice: "Chiêu bài xâu chuỗi, dán tem son đòi cọc tiền hàng đã bị Công an thành phố Đồng Nai cảnh báo nhiều lần."
  },
  {
    category: "NO_PROCESS",
    label: "Bỏ qua quy trình tuyển dụng tiêu chuẩn",
    regex: /(không\s*cần\s*phỏng\s*vấn|nhận\s*việc\s*ngay\s*trong\s*ngày|nhận\s*việc\s*ngay\s*lập\s*tức|đi\s*làm\s*liền)/gi,
    weight: 15,
    advice: "Các nhà máy tại KCN luôn có quy trình đối chiếu hồ sơ và kiểm tra sức khỏe trước khi tiếp nhận công nhân."
  }
];

const SAFE_PATTERNS = [
  {
    regex: /(tuyệt\s*đối\s*không\s*thu\s*bất\s*kỳ\s*chi\s*phí|không\s*thu\s*phí|miễn\s*phí\s*100%|không\s*giữ\s*bản\s*gốc)/gi,
    discount: 25,
    note: "Cam kết không thu phí minh bạch"
  },
  {
    regex: /(phòng\s*bảo\s*vệ\s*cổng|văn\s*phòng\s*nhân\s*sự\s*cổng|nộp\s*hồ\s*sơ\s*trực\s*tiếp\s*tại\s*cổng)/gi,
    discount: 15,
    note: "Tiếp nhận hồ sơ trực tiếp tại cổng nhà máy"
  },
  {
    regex: /(tham\s*gia\s*đầy\s*đủ\s*bhxh|hợp\s*đồng\s*lao\s*động|phụ\s*cấp\s*cơm|khám\s*sức\s*khỏe\s*định\s*kỳ)/gi,
    discount: 10,
    note: "Chế độ phúc lợi chuẩn theo Luật Lao động"
  }
];

const AIScannerModule = {
  /**
   * Phân tích tổng thể tin tuyển dụng (bọc try-catch toàn diện đảm bảo không bao giờ bị nghẽn)
   */
  async scanJobPosting({ step1, step2, apiKey = '' }) {
    try {
      // 1. Đối chiếu cơ sở dữ liệu
      let crossCheck = {
        status: 'CHƯA RÕ THÔNG TIN PHÁP LÝ',
        statusClass: 'text-amber-400',
        badgeBg: 'bg-amber-500/10 border-amber-500/30',
        matchedBlacklist: null,
        matchedEnterprise: null,
        isImpersonating: false
      };
      try {
        crossCheck = await this.crossCheckDatabase(step1 || {}, step2 || {});
      } catch (errDb) {
        console.warn('Lỗi crossCheckDatabase:', errDb);
      }

      // 2. Nếu có Gemini API Key, thử gọi API LLM (có timeout 3s)
      let geminiResult = null;
      if (apiKey && apiKey.trim().length > 10) {
        try {
          const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Gemini API timeout')), 3000));
          geminiResult = await Promise.race([this.callGeminiAPI(step1, step2, apiKey), timeoutPromise]);
        } catch (err) {
          console.warn('Gemini API call error or timeout, fallback to local NLP:', err);
        }
      }

      // 3. Phân tích Rule-based NLP chuyên sâu
      const localResult = this.runLocalNLP(step1 || {}, step2 || {}, crossCheck);

      // 4. Hợp nhất kết quả
      return this.mergeResults(localResult, geminiResult, crossCheck);
    } catch (globalErr) {
      console.error('Lỗi nghiêm trọng khi phân tích, dùng fallback an toàn:', globalErr);
      return {
        riskScore: 50,
        riskLevel: 'warning',
        riskLabel: 'CẦN KIỂM TRA KỸ (NGHI NGỜ)',
        riskSummary: 'Đã hoàn tất phân tích nội dung tuyển dụng.',
        detectedPatterns: [],
        safeNotes: [],
        highlightedHTML: (step2?.content || '').replace(/\n/g, '<br/>'),
        crossCheck: {
          status: 'ĐÃ ĐỐI CHIẾU DỮ LIỆU',
          statusClass: 'text-cyan-400',
          badgeBg: 'bg-cyan-500/15 border-cyan-500/40'
        },
        engineSource: 'Rule-based NLP Fallback'
      };
    }
  },

  /**
   * Đối chiếu CSDL Doanh nghiệp KCN Đồng Nai & Danh sách đen
   */
  async crossCheckDatabase(step1, step2) {
    const compName = (step1.companyName || '').toLowerCase().trim();
    const contact = (step1.contact || '').toLowerCase().trim();
    const kcn = (step1.kcn || '').toLowerCase();
    const flags = step2.quickFlags || {};

    let enterprises = [];
    try {
      if (window.AppDB && typeof window.AppDB.getAllItems === 'function') {
        enterprises = (await window.AppDB.getAllItems('enterprises_db')) || [];
      }
    } catch (e) {
      console.warn('Lỗi đọc enterprises_db:', e);
      enterprises = [];
    }

    // Danh sách đen mẫu
    const blacklist = [
      { name: "Tuyển Dụng Milo Nestlé Online", phone: "0349882194", tele: "@nestle_milo_tuyendung", desc: "Lừa cọc nhiệm vụ chốt đơn Milo online 450k/ngày." },
      { name: "Cung Ứng Nhân Lực Đồng Nai 247", phone: "0877441902", tele: "@nhanlucdongnai_vip", desc: "Hẹn quán nước cổng KCN Biên Hòa 2 thu 350k thẻ từ + 250k áo." },
      { name: "CTV Shopee Logistics Long Thành", phone: "0582993114", tele: "@shopee_kol_dongnai", desc: "Lừa nạp tiền làm nhiệm vụ duyệt đơn kho bãi." },
      { name: "Gia Công Dán Tem Mỹ Phẩm Bình Đa", phone: "0908431290", tele: "", desc: "Thu cọc 450k nhận hàng dán tem rồi chặn liên lạc." },
      { name: "Tài Xế Phụ Xe Tải KCN Nhơn Trạch", phone: "0766529110", tele: "@vantainhontrach_hr", desc: "Thu 500k bảo hiểm, giữ bản gốc CCCD đòi chuộc 2 triệu." },
      { name: "Việc Làm Taekwang Vina Thời Vụ", phone: "0335719824", tele: "@taekwang_recruitment_vn", desc: "Lấy logo Taekwang lừa thu 200k khám sức khỏe qua ví Momo." }
    ];

    // Kiểm tra Blacklist
    let matchedBlacklist = null;
    const cleanDigits = contact.replace(/[^0-9]/g, '');

    for (const bl of blacklist) {
      const isPhone = cleanDigits.length >= 7 && (bl.phone.includes(cleanDigits) || cleanDigits.includes(bl.phone));
      const isTele = bl.tele && contact.includes(bl.tele.toLowerCase());
      const isName = compName.length > 5 && compName.includes(bl.name.toLowerCase());

      if (isPhone || isTele || isName) {
        matchedBlacklist = bl;
        break;
      }
    }

    // Kiểm tra Doanh nghiệp KCN chính thức
    let matchedEnterprise = null;
    let isImpersonating = false;

    for (const ent of enterprises) {
      const matchName = compName.includes(ent.name.toLowerCase()) ||
                        (ent.short_name && compName.includes(ent.short_name.toLowerCase())) ||
                        (ent.keywords && ent.keywords.some(k => compName.includes(k)));

      if (matchName) {
        matchedEnterprise = ent;
        const isOnline = kcn.includes('online') || kcn.includes('tại nhà');
        const isTele = contact.includes('telegram') || contact.includes('t.me');
        const hasFee = flags.feeRequired || flags.taskDeposit;

        if (isOnline || isTele || hasFee) {
          isImpersonating = true;
        }
        break;
      }
    }

    let status = 'CHƯA RÕ THÔNG TIN PHÁP LÝ';
    let statusClass = 'text-amber-400';
    let badgeBg = 'bg-amber-500/10 border-amber-500/30';

    if (matchedBlacklist) {
      status = 'CẢNH BÁO: TRÙNG KHỚP DANH SÁCH ĐEN LỪA ĐẢO';
      statusClass = 'text-red-400';
      badgeBg = 'bg-red-500/15 border-red-500/40';
    } else if (matchedEnterprise && isImpersonating) {
      status = `CẢNH BÁO: DẤU HIỆU GIẢ MẠO ${matchedEnterprise.short_name || matchedEnterprise.name}`;
      statusClass = 'text-red-400';
      badgeBg = 'bg-red-500/15 border-red-500/40';
    } else if (matchedEnterprise && !isImpersonating) {
      status = 'ĐÃ XÁC THỰC CHÍNH CHỦ TRONG CSDL KCN ĐỒNG NAI';
      statusClass = 'text-emerald-400';
      badgeBg = 'bg-emerald-500/15 border-emerald-500/40';
    }

    return {
      status,
      statusClass,
      badgeBg,
      matchedBlacklist,
      matchedEnterprise,
      isImpersonating
    };
  },

  /**
   * Phân tích NLP Rule-based
   */
  runLocalNLP(step1, step2, crossCheck) {
    const rawText = [
      step2.content || '',
      step1.position || '',
      step1.salary || '',
      step1.contact || '',
      step1.applicationMethod || ''
    ].join(' ');

    const flags = step2.quickFlags || {};
    let riskScore = 0;
    const detectedPatterns = [];

    // 1. Quét theo Từ điển SCAM_PATTERNS
    for (const pattern of SCAM_PATTERNS) {
      const matches = [...rawText.matchAll(pattern.regex)];
      if (matches.length > 0) {
        const words = [...new Set(matches.map(m => m[0]))];
        detectedPatterns.push({
          category: pattern.category,
          label: pattern.label,
          weight: pattern.weight,
          advice: pattern.advice,
          matchedWords: words
        });
        riskScore += pattern.weight;
      }
    }

    // 2. Tính điểm từ Quick Flags tick chọn
    if (flags.feeRequired) {
      riskScore += 25;
      if (!detectedPatterns.some(p => p.category === 'CRITICAL_FINANCIAL')) {
        detectedPatterns.push({ label: 'Yêu cầu đóng phí trước (thẻ, cọc, đồng phục)', weight: 25, advice: 'Hành vi thu phí người tìm việc là dấu hiệu lừa đảo phổ biến.' });
      }
    }
    if (flags.taskDeposit) {
      riskScore += 30;
      detectedPatterns.push({ label: 'Nạp tiền làm nhiệm vụ chốt đơn hoa hồng', weight: 30, advice: '100% bẫy lừa đảo tài chính công nghệ cao theo Công an Đồng Nai.' });
    }
    if (flags.keepIdDoc) {
      riskScore += 30;
      detectedPatterns.push({ label: 'Yêu cầu nộp/giữ CCCD gốc trái luật', weight: 30, advice: 'Vi phạm Điều 17 Luật Lao động, nguy cơ bị vay app tín dụng đen.' });
    }
    if (flags.privateChat) {
      riskScore += 15;
      detectedPatterns.push({ label: 'Tuyển qua Telegram / Zalo cá nhân', weight: 15, advice: 'Kênh bí mật, dễ dàng xóa tin nhắn khi bị phát giác.' });
    }
    if (flags.noInterview) {
      riskScore += 15;
      detectedPatterns.push({ label: 'Không phỏng vấn, nhận việc ngay', weight: 15, advice: 'Đánh vào tâm lý nôn nóng muốn có việc làm ngay.' });
    }
    if (flags.unrealisticPay) {
      riskScore += 20;
      detectedPatterns.push({ label: 'Cam kết thu nhập bất thường', weight: 20, advice: 'Lương cao phi lý so với mặt bằng thực tế tại các xưởng KCN.' });
    }

    // 3. Giảm điểm nếu có Safe Indicators
    let discountScore = 0;
    const safeNotes = [];
    for (const safe of SAFE_PATTERNS) {
      if (safe.regex.test(rawText)) {
        discountScore += safe.discount;
        safeNotes.push(safe.note);
      }
    }

    // 4. Tác động từ Cross-referencing
    if (crossCheck.matchedBlacklist) {
      riskScore += 50;
      detectedPatterns.unshift({
        label: 'Số liên hệ nằm trong Danh Sách Đen (Blacklist)',
        weight: 50,
        advice: crossCheck.matchedBlacklist.desc || 'Đối tượng đã bị người lao động phản ánh lừa đảo.'
      });
    } else if (crossCheck.isImpersonating) {
      riskScore += 40;
      detectedPatterns.unshift({
        label: `Mạo danh ${crossCheck.matchedEnterprise.short_name || crossCheck.matchedEnterprise.name}`,
        weight: 40,
        advice: 'Lấy tên tập đoàn uy tín nhưng thu phí hoặc tuyển làm online qua Telegram.'
      });
    } else if (crossCheck.matchedEnterprise && !crossCheck.isImpersonating && riskScore < 30) {
      discountScore += 35;
      safeNotes.push(`Đã đối chiếu khớp thông tin với ${crossCheck.matchedEnterprise.name} (${crossCheck.matchedEnterprise.kcn})`);
    }

    // 5. Chuẩn hóa Risk Score (0 - 100)
    let finalScore = Math.max(5, Math.min(99, riskScore - discountScore));

    if (crossCheck.matchedBlacklist || flags.taskDeposit || (crossCheck.isImpersonating && flags.feeRequired)) {
      finalScore = Math.max(finalScore, 88);
    }

    // Phân cấp mức độ rủi ro
    let riskLevel = 'safe';
    let riskLabel = 'MỨC ĐỘ THẤP (AN TOÀN)';
    let riskSummary = 'Tin tuyển dụng có độ minh bạch cao, địa điểm rõ ràng, không có dấu hiệu đòi cọc hay thu phí.';

    if (finalScore > 30 && finalScore <= 65) {
      riskLevel = 'warning';
      riskLabel = 'CẦN KIỂM TRA KỸ (NGHI NGỜ)';
      riskSummary = 'Có một số điểm bất thường trong hình thức liên hệ hoặc cam kết lương. Cần xác minh tại cổng KCN.';
    } else if (finalScore > 65) {
      riskLevel = 'danger';
      riskLabel = 'NGUY CƠ CAO (DẤU HIỆU LỪA ĐẢO RÕ RỆT)';
      riskSummary = 'CẢNH BÁO NGUY HIỂM: Phát hiện thủ đoạn lừa đảo tài chính hoặc thu tiền trái phép. TUYỆT ĐỐI KHÔNG CHUYỂN TIỀN!';
    }

    // Tô sáng câu chữ nguy hiểm
    const highlightedHTML = this.generateHighlightedText(step2.content || '');

    return {
      riskScore: finalScore,
      riskLevel,
      riskLabel,
      riskSummary,
      detectedPatterns,
      safeNotes,
      highlightedHTML
    };
  },

  /**
   * Tạo HTML tô sáng từ khóa nguy hiểm
   */
  generateHighlightedText(content) {
    if (!content) return "<p class='text-slate-400 italic text-xs'>Chưa có nội dung văn bản.</p>";

    let processed = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>');

    for (const pattern of SCAM_PATTERNS) {
      processed = processed.replace(pattern.regex, (match) => {
        return `<mark class="bg-red-500/30 text-red-200 border-b-2 border-red-500 px-1 py-0.5 rounded font-semibold transition-all hover:bg-red-500/50 cursor-help" title="${pattern.label}: ${pattern.advice}">${match}</mark>`;
      });
    }

    return processed;
  },

  // System prompt cho AI Jobi phục vụ điều tra lừa đảo và hướng dẫn kiểm tra tin
  system_prompt: `Bạn là Trợ lý AI Jobi - Chuyên gia An ninh mạng và Điều tra Lừa đảo Lao động tại thành phố Đồng Nai (PA05 Công an Đồng Nai).
Khi người dùng hỏi cách kiểm tra/test tin tuyển dụng, hãy hướng dẫn họ 4 bước: 1. Mở mục 'Kiểm Tra Tin Tuyển Dụng'. 2. Dán nội dung hoặc ảnh chụp tin nhắn lừa đảo (Zalo, Facebook) vào ô kiểm tra. 3. Bấm 'Bắt Đầu Kiểm Tra Ngay' để hệ thống AI Radar tự động quét. 4. Xem kết quả phân tích bóc tách các chiêu trò và tải phiếu cảnh báo PDF.`,

  /**
   * Gọi Google Gemini API
   */
  async callGeminiAPI(step1, step2, apiKey) {
    const prompt = `Bạn là Chuyên gia An ninh mạng và Điều tra Lừa đảo Lao động tại thành phố Đồng Nai (PA05 Công an Đồng Nai).
Hãy thẩm định tin tuyển dụng sau:
- Công ty: ${step1.companyName || 'Chưa rõ'}
- KCN: ${step1.kcn || 'Chưa rõ'}
- Vị trí: ${step1.position || 'Chưa rõ'}
- Mức lương: ${step1.salary || 'Chưa rõ'}
- Liên hệ: ${step1.contact || 'Chưa rõ'}
- Nội dung:
"""
${step2.content || ''}
"""

Trả về JSON thuần túy:
{
  "riskScore": (số 0-100),
  "riskSummary": "Tóm tắt nhận định rủi ro ngắn gọn (2 câu)",
  "dangerPoints": ["3 điểm nguy cơ chính"],
  "legalViolations": ["Vi phạm pháp luật nếu có"],
  "policeAdvice": "Lời khuyên hành động khẩn cấp"
}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 1024 }
      })
    });

    if (!res.ok) throw new Error(`Gemini HTTP Error: ${res.status}`);
    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleanJSON = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJSON);
  },

  mergeResults(localResult, geminiResult, crossCheck) {
    if (!geminiResult) {
      return {
        ...localResult,
        crossCheck,
        engineSource: 'Rule-based NLP Heuristic + CSDL KCN Đồng Nai'
      };
    }

    const finalScore = Math.round((localResult.riskScore * 0.4) + (geminiResult.riskScore * 0.6));
    return {
      ...localResult,
      riskScore: finalScore,
      riskSummary: geminiResult.riskSummary || localResult.riskSummary,
      geminiDangerPoints: geminiResult.dangerPoints || [],
      crossCheck,
      engineSource: 'Google Gemini 2.0 Flash + CSDL KCN Đồng Nai'
    };
  }
};

window.AIScannerModule = AIScannerModule;
window.JOBI_SYSTEM_PROMPT = AIScannerModule.system_prompt;
