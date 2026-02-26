# Khắc phục sự cố

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Các vấn đề thường gặp và giải pháp cho OmniRoute.

---

## Sửa nhanh

| Vấn đề                                    | Giải pháp                                                         |
| ----------------------------------------- | ----------------------------------------------------------------- |
| Đăng nhập lần đầu không hoạt động         | Kiểm tra `INITIAL_PASSWORD` trong `.env` (mặc định: `123456`)     |
| Bảng điều khiển mở sai cổng               | Đặt `PORT=20128` và `NEXT_PUBLIC_BASE_URL=http://localhost:20128` |
| Không có nhật ký yêu cầu nào dưới `logs/` | Đặt `ENABLE_REQUEST_LOGS=true`                                    |
| EACCES: quyền bị từ chối                  | Đặt `DATA_DIR=/path/to/writable/dir` để ghi đè `~/.omniroute`     |
| Chiến lược định tuyến không tiết kiệm     | Cập nhật lên v1.4.11+ (Sửa lược đồ Zod để duy trì cài đặt)        |

---

## Vấn đề về nhà cung cấp

### "Mô hình ngôn ngữ không cung cấp thông báo"

**Nguyên nhân:** Đã hết hạn ngạch nhà cung cấp.

**Sửa chữa:**

1. Kiểm tra trình theo dõi hạn ngạch trên trang tổng quan
2. Sử dụng kết hợp với các tầng dự phòng
3. Chuyển sang cấp rẻ hơn/miễn phí

### Giới hạn tỷ lệ

**Lý do:** Đã hết hạn mức đăng ký.

**Sửa chữa:**

- Thêm dự phòng: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Sử dụng GLM/MiniMax làm bản sao lưu giá rẻ

### Mã thông báo OAuth đã hết hạn

OmniRoute tự động làm mới mã thông báo. Nếu vấn đề vẫn tiếp diễn:

1. Bảng điều khiển → Nhà cung cấp → Kết nối lại
2. Xóa và thêm lại kết nối nhà cung cấp

---

## Sự cố về đám mây

### Lỗi đồng bộ hóa đám mây

1. Xác minh `BASE_URL` trỏ tới phiên bản đang chạy của bạn (ví dụ: `http://localhost:20128`)
2. Xác minh `CLOUD_URL` trỏ đến điểm cuối đám mây của bạn (ví dụ: `https://omniroute.dev`)
3. Giữ các giá trị `NEXT_PUBLIC_*` được căn chỉnh với các giá trị phía máy chủ

### Đám mây `stream=false` Trả về 500

**Triệu chứng:** `Unexpected token 'd'...` trên điểm cuối đám mây đối với các cuộc gọi không phát trực tuyến.

**Lý do:** Ngược dòng trả về tải trọng SSE trong khi khách hàng mong đợi JSON.

**Giải pháp:** Sử dụng `stream=true` cho cuộc gọi trực tiếp qua đám mây. Thời gian chạy cục bộ bao gồm dự phòng SSE→JSON.

### Cloud cho biết Đã kết nối nhưng "Khóa API không hợp lệ"

1. Tạo khóa mới từ bảng điều khiển cục bộ (`/api/keys`)
2. Chạy đồng bộ đám mây: Bật Đám mây → Đồng bộ hóa ngay
3. Khóa cũ/không được đồng bộ hóa vẫn có thể trả về `401` trên đám mây

---

## Vấn đề về Docker

### Công cụ CLI hiển thị chưa được cài đặt

1. Kiểm tra các trường thời gian chạy: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Đối với chế độ di động: sử dụng mục tiêu hình ảnh `runner-cli` (CLI đi kèm)
3. Đối với chế độ gắn máy chủ: đặt `CLI_EXTRA_PATHS` và gắn thư mục bin máy chủ ở chế độ chỉ đọc
4. Nếu `installed=true` và `runnable=false`: đã tìm thấy nhị phân nhưng kiểm tra tình trạng không thành công

### Xác thực thời gian chạy nhanh

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Vấn đề về chi phí

### Chi phí cao

1. Kiểm tra số liệu thống kê sử dụng trong Bảng điều khiển → Mức sử dụng
2. Chuyển model chính sang GLM/MiniMax
3. Sử dụng bậc miễn phí (Gemini CLI, iFlow) cho các tác vụ không quan trọng
4. Đặt ngân sách chi phí cho mỗi khóa API: Bảng điều khiển → Khóa API → Ngân sách

---

## Gỡ lỗi

### Kích hoạt nhật ký yêu cầu

Đặt `ENABLE_REQUEST_LOGS=true` trong tệp `.env` của bạn. Nhật ký xuất hiện trong thư mục `logs/`.

### Kiểm tra sức khỏe nhà cung cấp

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Bộ nhớ thời gian chạy

- Trạng thái chính: `${DATA_DIR}/db.json` (nhà cung cấp, tổ hợp, bí danh, khóa, cài đặt)
- Cách sử dụng: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Nhật ký yêu cầu: `<repo>/logs/...` (khi `ENABLE_REQUEST_LOGS=true`)

---

## Sự cố ngắt mạch

### Nhà cung cấp bị kẹt ở trạng thái MỞ

Khi cầu dao của nhà cung cấp MỞ, các yêu cầu sẽ bị chặn cho đến khi hết thời gian hồi chiêu.

**Sửa chữa:**

1. Đi tới **Bảng điều khiển → Cài đặt → Khả năng phục hồi**
2. Kiểm tra thẻ cầu dao của nhà cung cấp bị ảnh hưởng
3. Nhấp vào **Đặt lại tất cả** để xóa tất cả các bộ ngắt hoặc đợi hết thời gian hồi chiêu
4. Xác minh nhà cung cấp thực sự có sẵn trước khi đặt lại

### Nhà cung cấp liên tục ngắt cầu dao

Nếu nhà cung cấp liên tục chuyển sang trạng thái MỞ:

1. Kiểm tra **Bảng điều khiển → Sức khỏe → Tình trạng nhà cung cấp** để biết kiểu lỗi
2. Đi tới **Cài đặt → Khả năng phục hồi → Hồ sơ nhà cung cấp** và tăng ngưỡng thất bại
3. Kiểm tra xem nhà cung cấp có thay đổi giới hạn API hay yêu cầu xác thực lại không
4. Xem lại phép đo từ xa về độ trễ - độ trễ cao có thể gây ra lỗi dựa trên thời gian chờ

---

## Sự cố phiên âm âm thanh

### Lỗi "Mẫu máy không được hỗ trợ"

- Đảm bảo bạn đang sử dụng đúng tiền tố: `deepgram/nova-3` hoặc `assemblyai/best`
- Xác minh nhà cung cấp được kết nối trong **Bảng điều khiển → Nhà cung cấp**

### Phiên âm trả về trống hoặc không thành công

- Kiểm tra các định dạng âm thanh được hỗ trợ: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Xác minh kích thước tệp nằm trong giới hạn của nhà cung cấp (thường < 25 MB)
- Kiểm tra tính hợp lệ của khóa API nhà cung cấp trong thẻ nhà cung cấp

---

## Gỡ lỗi trình dịch

Sử dụng **Trang tổng quan → Trình dịch** để gỡ lỗi các vấn đề dịch định dạng:

| Chế độ                        | Khi nào nên sử dụng                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Sân chơi**                  | So sánh các định dạng đầu vào/đầu ra cạnh nhau — dán một yêu cầu không thành công để xem nó dịch như thế nào |
| **Người kiểm tra trò chuyện** | Gửi tin nhắn trực tiếp và kiểm tra toàn bộ tải trọng yêu cầu/phản hồi bao gồm các tiêu đề                    |
| **Bàn thử nghiệm**            | Chạy thử nghiệm hàng loạt trên các kết hợp định dạng để tìm ra bản dịch nào bị lỗi                           |
| **Màn hình trực tiếp**        | Xem luồng yêu cầu theo thời gian thực để nắm bắt các vấn đề dịch thuật không liên tục                        |

### Các vấn đề định dạng thường gặp

- **Thẻ tư duy không xuất hiện** — Kiểm tra xem nhà cung cấp mục tiêu có hỗ trợ tư duy và cài đặt ngân sách tư duy hay không
- **Giảm cuộc gọi công cụ** — Một số bản dịch định dạng có thể loại bỏ các trường không được hỗ trợ; xác minh ở chế độ Playground
- **Thiếu lời nhắc hệ thống** — Claude và Gemini xử lý lời nhắc hệ thống theo cách khác nhau; kiểm tra đầu ra bản dịch
- **SDK trả về chuỗi thô thay vì đối tượng** — Đã sửa trong v1.1.0: trình khử trùng phản hồi hiện loại bỏ các trường không chuẩn (`x_groq`, `usage_breakdown`, v.v.) gây ra lỗi xác thực OpenAI SDK Pydantic
- **GLM/ERNIE từ chối vai trò `system`** — Đã sửa trong v1.1.0: bộ chuẩn hóa vai trò tự động hợp nhất các thông báo hệ thống thành thông báo người dùng cho các kiểu máy không tương thích
- **`developer` vai trò không được nhận dạng** — Đã sửa trong v1.1.0: tự động chuyển đổi thành `system` cho các nhà cung cấp không phải OpenAI
- **`json_schema` không hoạt động với Gemini** — Đã sửa trong v1.1.0: `response_format` hiện được chuyển đổi thành `responseMimeType` + `responseSchema` của Gemini

---

## Cài đặt khả năng phục hồi

### Giới hạn tỷ lệ tự động không kích hoạt

- Giới hạn tỷ lệ tự động chỉ áp dụng cho nhà cung cấp khóa API (không phải OAuth/đăng ký)
- Xác minh **Cài đặt → Khả năng phục hồi → Hồ sơ nhà cung cấp** đã bật giới hạn tỷ lệ tự động
- Kiểm tra xem nhà cung cấp có trả về `429` mã trạng thái hoặc tiêu đề `Retry-After` không

### Điều chỉnh độ trễ theo cấp số nhân

Hồ sơ nhà cung cấp hỗ trợ các cài đặt này:

- **Độ trễ cơ bản** — Thời gian chờ ban đầu sau lần thất bại đầu tiên (mặc định: 1 giây)
- **Độ trễ tối đa** — Giới hạn thời gian chờ tối đa (mặc định: 30 giây)
- **Hệ số** — Độ trễ tăng lên bao nhiêu cho mỗi lần thất bại liên tiếp (mặc định: 2x)

### Đàn chống sấm sét

Khi nhiều yêu cầu đồng thời gặp phải một nhà cung cấp có tỷ lệ giới hạn, OmniRoute sử dụng mutex + giới hạn tốc độ tự động để tuần tự hóa các yêu cầu và ngăn chặn lỗi xếp tầng. Điều này là tự động đối với các nhà cung cấp khóa API.

---

## Vẫn bị kẹt?

- **Vấn đề về GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Kiến trúc**: Xem [**OMNI_TOKEN_55**](ARCHITECTURE.md) để biết chi tiết nội bộ
- **Tham khảo API**: Xem [**OMNI_TOKEN_56**](API_REFERENCE.md) để biết tất cả các điểm cuối
- **Bảng điều khiển sức khỏe**: Kiểm tra **Bảng điều khiển → Sức khỏe** để biết trạng thái hệ thống theo thời gian thực
- **Trình dịch**: Sử dụng **Bảng điều khiển → Trình dịch** để gỡ lỗi các vấn đề về định dạng
