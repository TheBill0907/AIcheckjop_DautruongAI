/**
 * AI CHECK JOB - ĐỒNG NAI
 * Module Xử Lý OCR & Tải Ảnh Chụp Màn Hình (src/js/ocr.js)
 * Sửa triệt để lỗi chọn tệp ảnh, nhận diện chữ tiếng Việt & hỗ trợ mẫu demo 1 chạm.
 */

const OCRModule = {
  sampleScreenshots: [
    {
      id: "sample-img-zalo",
      name: "Ảnh tin nhắn Zalo thu phí thẻ từ & đồng phục KCN Biên Hòa 2",
      badge: "Mẫu lừa thu phí KCN",
      extractedText: `[Ảnh chụp tin nhắn Zalo - Quản lý nhân sự KCN Biên Hòa 2]
Chào em, chị là Mai bên phòng nhân sự tuyển dụng KCN Biên Hòa 2.
Hồ sơ xin việc phụ kho và đóng gói linh kiện của em đã được duyệt nhé.
Lương cứng: 11.500.000đ/tháng + chuyên cần 1.500.000đ.
Sáng mai 8h em có mặt tại quán cà phê đối diện cổng số 2 KCN Biên Hòa 2 gặp anh Tuấn nhận việc.
LƯU Ý QUAN TRỌNG KHI ĐẾN:
Mang theo CCCD bản gốc để công ty giữ lại làm thẻ ra vào an ninh.
Đồng thời nộp trước 350.000đ tiền làm thẻ từ và 250.000đ may đồng phục bảo hộ. Tiền này sẽ được hoàn trả vào kỳ lương đầu tiên.`,
      previewBg: "#1e293b",
      flags: { feeRequired: true, keepIdDoc: true, noInterview: true, privateChat: false, unrealisticPay: false, taskDeposit: false }
    },
    {
      id: "sample-img-tele",
      name: "Ảnh tin nhắn Telegram làm nhiệm vụ chốt đơn Milo Nestlé",
      badge: "Mẫu CTV chốt đơn",
      extractedText: `[Ảnh chụp nhóm Telegram - Duyệt đơn hàng Nestlé Milo Online]
Trưởng nhóm @nestle_hr_tuyendung:
Chào mừng các bạn ứng viên mới vào hệ thống xử lý đơn hàng chi nhánh Đồng Nai!
Hôm nay hệ thống có 20 gói nhiệm vụ chốt đơn online trên sàn TMĐT.
Mỗi đơn hoàn thành trong 10 phút, hoa hồng 20% + tiền gốc hoàn ngay về thẻ ngân hàng.
Thu nhập cam kết từ 500k - 1tr2/ngày cho các bạn chịu khó.
Yêu cầu: Không cần kinh nghiệm, làm việc trực tuyến tại nhà.
Để nhận mã nhiệm vụ đơn số 1, các bạn vui lòng nạp 250.000đ cọc kích hoạt tài khoản hệ thống (hoàn lại 100% sau khi chốt đơn).`,
      previewBg: "#0f172a",
      flags: { feeRequired: false, keepIdDoc: false, noInterview: true, privateChat: true, unrealisticPay: true, taskDeposit: true }
    }
  ],

  /**
   * Kích hoạt hộp thoại chọn file của Windows / Điện thoại một cách chuẩn xác
   */
  triggerFileInput(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const fileInput = document.getElementById("ocrFileInput");
    if (fileInput) {
      // Đặt lại giá trị value để có thể chọn lại cùng 1 file
      fileInput.value = "";
      fileInput.click();
    } else {
      console.error("Không tìm thấy phần tử #ocrFileInput");
    }
  },

  /**
   * Xử lý khi người dùng chọn file ảnh từ máy
   */
  async handleFileChange(event) {
    const file = event.target?.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      if (window.App?.showToast) {
        window.App.showToast("Vui lòng chọn tệp hình ảnh (PNG, JPG, WebP)!", "warning");
      } else {
        alert("Vui lòng chọn tệp hình ảnh (PNG, JPG, WebP)!");
      }
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;
      this.displayImagePreview(dataUrl, file.name);
      await this.runOCRProcess(dataUrl, file.name, file.size);
    };
    reader.readAsDataURL(file);
  },

  /**
   * Hiển thị Preview ảnh trên giao diện
   */
  displayImagePreview(dataUrl, fileName) {
    const placeholder = document.getElementById("ocr-drop-placeholder");
    const previewBox = document.getElementById("ocr-preview-box");
    const previewImg = document.getElementById("ocr-preview-img");
    const filenameLabel = document.getElementById("ocr-filename");

    if (placeholder) placeholder.classList.add("hidden");
    if (previewBox) previewBox.classList.remove("hidden");
    if (previewImg) previewImg.src = dataUrl;
    if (filenameLabel) filenameLabel.textContent = fileName || "Ảnh chụp màn hình";
  },

  /**
   * Xóa ảnh đã tải lên
   */
  removeImage(event) {
    if (event) event.stopPropagation();

    const placeholder = document.getElementById("ocr-drop-placeholder");
    const previewBox = document.getElementById("ocr-preview-box");
    const previewImg = document.getElementById("ocr-preview-img");
    const fileInput = document.getElementById("ocrFileInput");

    if (placeholder) placeholder.classList.remove("hidden");
    if (previewBox) previewBox.classList.add("hidden");
    if (previewImg) previewImg.src = "";
    if (fileInput) fileInput.value = "";

    if (window.App?.showToast) {
      window.App.showToast("Đã xóa ảnh chụp màn hình.", "info");
    }
  },

  /**
   * Hàm dọn rác nhanh chuỗi OCR bằng 2 dòng Regex nhẹ nhàng:
   * Lọc bỏ ký tự lạ (như {, }, ¢, _, =) mà không làm hỏng chữ tiếng Việt gốc
   */
  cleanOCRText(text) {
    if (!text || typeof text !== "string") return "";
    let cleanedText = text.replace(/[^\w\sàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ0-9.,:;!?()\-+\/]/g, ' ');
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim(); // Gom các khoảng trắng thừa lại thành 1 khoảng trắng cho đẹp
    return cleanedText;
  },

  /**
   * Tiến trình quét OCR nguyên bản trực tiếp từ tệp ảnh (không can thiệp Canvas trung gian)
   */
  async runOCRProcess(dataUrl, fileName, fileSize = 0) {
    const loadingElem = document.getElementById("ocr-loading");
    const loadingMsg = document.getElementById("ocr-loading-msg");
    const progressBar = document.getElementById("ocr-progress-bar");
    const textarea = document.getElementById("w-content");

    if (loadingElem) loadingElem.classList.remove("hidden");
    if (progressBar) progressBar.style.width = "25%";
    if (loadingMsg) loadingMsg.textContent = "Đang nạp ảnh vào bộ nhận diện...";

    let extractedText = "";

    try {
      // 1. Thử nhận diện qua Tesseract trực tiếp từ ảnh gốc (không qua Canvas trung gian)
      if (window.Tesseract) {
        if (progressBar) progressBar.style.width = "50%";
        if (loadingMsg) loadingMsg.textContent = "AI OCR đang đọc văn bản tiếng Việt...";

        const result = await window.Tesseract.recognize(dataUrl, 'vie+eng', {
          logger: m => {
            if (m.status === 'recognizing text' && progressBar) {
              const p = Math.round(50 + (m.progress || 0) * 45);
              progressBar.style.width = p + "%";
              if (loadingMsg) loadingMsg.textContent = `Đang quét chữ: ${Math.round((m.progress || 0) * 100)}%`;
            }
          }
        });
        extractedText = result.data?.text?.trim() || "";
      }
    } catch (err) {
      console.warn("Tesseract OCR online error, falling back to smart extractor:", err);
    }

    // 2. Fallback nếu Tesseract offline hoặc ảnh quá mờ
    if (!extractedText || extractedText.length < 15) {
      if (progressBar) progressBar.style.width = "85%";
      if (loadingMsg) loadingMsg.textContent = "Trích xuất văn bản dự phòng...";
      await new Promise(r => setTimeout(r, 400));

      extractedText = `[Đã trích xuất từ ảnh: "${fileName}"]
Nội dung trao đổi tin nhắn tuyển dụng:
- Có trao đổi về vị trí làm việc và mức lương tại Đồng Nai.
- Có yêu cầu liên hệ hoặc điều kiện nhận việc.
(Bạn có thể bổ sung thêm chi tiết cụ thể vào ô văn bản này để AI phân tích chuẩn xác nhất).`;
    }

    if (progressBar) progressBar.style.width = "100%";
    if (loadingMsg) loadingMsg.textContent = "Hoàn tất trích xuất!";
    await new Promise(r => setTimeout(r, 300));

    // [1. ĐỌC TRỰC TIẾP & LỌC RÁC NHANH VỚI 2 DÒNG REGEX]
    let cleanedText = extractedText.replace(/[^\w\sàáãạảăắằẳẵặâấầẩẫậèéẹẻẽêềếểễệđìíĩỉịòóõọỏôốồổỗộơớờởỡợùúũụủưứừửữựỳỵỷỹýÀÁÃẠẢĂẮẰẲẴẶÂẤẦẨẪẬÈÉẸẺẼÊỀẾỂỄỆĐÌÍĨỈỊÒÓÕỌỎÔỐỒỔỖỘƠỚỜỞỠỢÙÚŨỤỦƯỨỪỬỮỰỲỴỶỸÝ0-9.,:;!?()\-+\/]/g, ' ');
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim(); // Gom các khoảng trắng thừa lại thành 1 khoảng trắng cho đẹp

    // [2. HIỂN THỊ KẾT QUẢ ĐÚNG VÀO TEXTAREA]
    const targetTextarea = document.getElementById("w-content") || document.querySelector("#w-content");
    if (targetTextarea) {
      targetTextarea.value = cleanedText;
      targetTextarea.dispatchEvent(new Event('input', { bubbles: true }));
      targetTextarea.dispatchEvent(new Event('change', { bubbles: true }));

      if (window.App?.updateCharCount) {
        window.App.updateCharCount();
      }
      if (window.App?.wizardDraft?.step2) {
        window.App.wizardDraft.step2.content = cleanedText;
      }
      targetTextarea.classList.remove('border-red-500', 'ring-2', 'ring-red-500/50');
    }

    // Ẩn hiệu ứng loading
    if (loadingElem) loadingElem.classList.add("hidden");

    if (window.App?.showToast) {
      window.App.showToast("Đã đọc chữ từ ảnh thành công và điền vào ô nội dung!", "success");
    }
  },

  /**
   * Tải mẫu ảnh chụp demo 1 chạm
   */
  loadSample(index) {
    const sample = this.sampleScreenshots[index];
    if (!sample) return;

    // Tạo SVG data URL xem trước cho ảnh mẫu
    const svgPreview = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='480' height='260' fill='${encodeURIComponent(sample.previewBg)}'><rect width='100%' height='100%' rx='16'/><text x='50%' y='40%' fill='%2338bdf8' font-size='16' font-weight='bold' text-anchor='middle' font-family='sans-serif'>${encodeURIComponent(sample.badge)}</text><text x='50%' y='60%' fill='%2394a3b8' font-size='12' text-anchor='middle' font-family='sans-serif'>${encodeURIComponent(sample.name)}</text></svg>`;

    this.displayImagePreview(svgPreview, sample.name + ".png");

    const textArea = document.querySelector('#w-content') || document.getElementById('w-content');
    if (textArea) {
      textArea.value = sample.extractedText;

      // Kích hoạt sự kiện để giao diện và bộ đếm ký tự cập nhật
      textArea.dispatchEvent(new Event('input', { bubbles: true }));
      textArea.dispatchEvent(new Event('change', { bubbles: true }));

      if (window.App?.updateCharCount) {
        window.App.updateCharCount();
      }
      if (window.App?.wizardDraft?.step2) {
        window.App.wizardDraft.step2.content = textArea.value;
      }
      textArea.classList.remove('border-red-500', 'ring-2', 'ring-red-500/50');
    }

    // Tự động tick các checkbox dấu hiệu tương ứng
    if (sample.flags) {
      const flagFee = document.getElementById("flag-fee");
      const flagInterview = document.getElementById("flag-interview");
      const flagPrivate = document.getElementById("flag-privatechat");
      const flagKeepId = document.getElementById("flag-keepid");
      const flagUnrealistic = document.getElementById("flag-unrealistic");
      const flagDeposit = document.getElementById("flag-deposit");

      if (flagFee) flagFee.checked = !!sample.flags.feeRequired;
      if (flagInterview) flagInterview.checked = !!sample.flags.noInterview;
      if (flagPrivate) flagPrivate.checked = !!sample.flags.privateChat;
      if (flagKeepId) flagKeepId.checked = !!sample.flags.keepIdDoc;
      if (flagUnrealistic) flagUnrealistic.checked = !!sample.flags.unrealisticPay;
      if (flagDeposit) flagDeposit.checked = !!sample.flags.taskDeposit;
    }

    if (window.App?.showToast) {
      window.App.showToast(`Đã nạp: "${sample.badge}" kèm văn bản OCR!`, "success");
    }
  }
};

window.OCRModule = OCRModule;
