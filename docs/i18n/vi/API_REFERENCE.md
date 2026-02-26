# Tham chiếu API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Tham chiếu đầy đủ cho tất cả các điểm cuối API OmniRoute.

---

## Mục lục

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Hoàn thành cuộc trò chuyện

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Tiêu đề tùy chỉnh

| Tiêu đề                  | Hướng    | Mô tả                                           |
| ------------------------ | -------- | ----------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Yêu cầu  | Đặt thành `true` để bỏ qua bộ đệm               |
| `X-OmniRoute-Progress`   | Yêu cầu  | Đặt thành `true` cho các sự kiện tiến trình     |
| `Idempotency-Key`        | Yêu cầu  | Khóa khấu trừ (cửa sổ 5s)                       |
| `X-Request-Id`           | Yêu cầu  | Khóa khấu trừ thay thế                          |
| `X-OmniRoute-Cache`      | Phản hồi | `HIT` hoặc `MISS` (không phát trực tuyến)       |
| `X-OmniRoute-Idempotent` | Phản hồi | `true` nếu được loại bỏ trùng lặp               |
| `X-OmniRoute-Progress`   | Phản hồi | `enabled` nếu bật tính năng theo dõi tiến trình |

---

## Nhúng

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Các nhà cung cấp hiện có: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Tạo hình ảnh

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Các nhà cung cấp hiện có: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Danh sách mô hình

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Điểm cuối tương thích

| Phương pháp | Đường dẫn                   | Định dạng              |
| ----------- | --------------------------- | ---------------------- |
| ĐĂNG        | `/v1/chat/completions`      | OpenAI                 |
| ĐĂNG        | `/v1/messages`              | Nhân chủng học         |
| ĐĂNG        | `/v1/responses`             | Phản hồi OpenAI        |
| ĐĂNG        | `/v1/embeddings`            | OpenAI                 |
| ĐĂNG        | `/v1/images/generations`    | OpenAI                 |
| NHẬN        | `/v1/models`                | OpenAI                 |
| ĐĂNG        | `/v1/messages/count_tokens` | Nhân chủng học         |
| NHẬN        | `/v1beta/models`            | Song Tử                |
| ĐĂNG        | `/v1beta/models/{...path}`  | Gemini generateContent |
| ĐĂNG        | `/v1/api/chat`              | Olama                  |

### Tuyến đường dành riêng cho nhà cung cấp

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Tiền tố nhà cung cấp được tự động thêm vào nếu thiếu. Các mô hình không khớp trả về `400`.

---

## Bộ đệm ngữ nghĩa

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Ví dụ phản hồi:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Bảng điều khiển & Quản lý

### Xác thực

| Điểm cuối                     | Phương pháp | Mô tả                        |
| ----------------------------- | ----------- | ---------------------------- |
| `/api/auth/login`             | ĐĂNG        | Đăng nhập                    |
| `/api/auth/logout`            | ĐĂNG        | Đăng xuất                    |
| `/api/settings/require-login` | NHẬN/ĐẶT    | Chuyển đổi yêu cầu đăng nhập |

### Quản lý nhà cung cấp

| Điểm cuối                    | Phương pháp   | Mô tả                           |
| ---------------------------- | ------------- | ------------------------------- |
| `/api/providers`             | NHẬN/ĐĂNG     | Liệt kê/tạo nhà cung cấp        |
| `/api/providers/[id]`        | NHẬN/ĐẶT/XÓA  | Quản lý nhà cung cấp            |
| `/api/providers/[id]/test`   | ĐĂNG          | Kết nối nhà cung cấp thử nghiệm |
| `/api/providers/[id]/models` | NHẬN          | Liệt kê mô hình nhà cung cấp    |
| `/api/providers/validate`    | ĐĂNG          | Xác thực cấu hình nhà cung cấp  |
| `/api/provider-nodes*`       | Khác nhau     | Quản lý nút nhà cung cấp        |
| `/api/provider-models`       | NHẬN/ĐĂNG/XÓA | Mô hình tùy chỉnh               |

### Luồng OAuth

| Điểm cuối                        | Phương pháp | Mô tả                             |
| -------------------------------- | ----------- | --------------------------------- |
| `/api/oauth/[provider]/[action]` | Khác nhau   | OAuth dành riêng cho nhà cung cấp |

### Định tuyến & Cấu hình

| Điểm cuối             | Phương pháp | Mô tả                                       |
| --------------------- | ----------- | ------------------------------------------- |
| `/api/models/alias`   | NHẬN/ĐĂNG   | Bí danh mẫu                                 |
| `/api/models/catalog` | NHẬN        | Tất cả các mô hình theo nhà cung cấp + loại |
| `/api/combos*`        | Khác nhau   | Quản lý kết hợp                             |
| `/api/keys*`          | Khác nhau   | Quản lý khóa API                            |
| `/api/pricing`        | NHẬN        | Giá mẫu                                     |

### Cách sử dụng & Phân tích

| Điểm cuối                   | Phương pháp | Mô tả                        |
| --------------------------- | ----------- | ---------------------------- |
| `/api/usage/history`        | NHẬN        | Lịch sử sử dụng              |
| `/api/usage/logs`           | NHẬN        | Nhật ký sử dụng              |
| `/api/usage/request-logs`   | NHẬN        | Nhật ký cấp yêu cầu          |
| `/api/usage/[connectionId]` | NHẬN        | Mức sử dụng trên mỗi kết nối |

### Cài đặt

| Điểm cuối                       | Phương pháp | Mô tả                                |
| ------------------------------- | ----------- | ------------------------------------ |
| `/api/settings`                 | NHẬN/ĐẶT    | Cài đặt chung                        |
| `/api/settings/proxy`           | NHẬN/ĐẶT    | Cấu hình proxy mạng                  |
| `/api/settings/proxy/test`      | ĐĂNG        | Kiểm tra kết nối proxy               |
| `/api/settings/ip-filter`       | NHẬN/ĐẶT    | Danh sách cho phép/danh sách chặn IP |
| `/api/settings/thinking-budget` | NHẬN/ĐẶT    | Lập luận về ngân sách mã thông báo   |
| `/api/settings/system-prompt`   | NHẬN/ĐẶT    | Lời nhắc hệ thống toàn cầu           |

### Giám sát

| Điểm cuối                | Phương pháp | Mô tả                            |
| ------------------------ | ----------- | -------------------------------- |
| `/api/sessions`          | NHẬN        | Theo dõi phiên hoạt động         |
| `/api/rate-limits`       | NHẬN        | Giới hạn tỷ lệ cho mỗi tài khoản |
| `/api/monitoring/health` | NHẬN        | Kiểm tra sức khỏe                |
| `/api/cache`             | NHẬN/XÓA    | Thống kê bộ nhớ đệm / xóa        |

### Sao lưu & Xuất/Nhập

| Điểm cuối                   | Phương pháp | Mô tả                                                      |
| --------------------------- | ----------- | ---------------------------------------------------------- |
| `/api/db-backups`           | NHẬN        | Liệt kê các bản sao lưu có sẵn                             |
| `/api/db-backups`           | ĐƯA         | Tạo bản sao lưu thủ công                                   |
| `/api/db-backups`           | ĐĂNG        | Khôi phục từ bản sao lưu cụ thể                            |
| `/api/db-backups/export`    | NHẬN        | Tải xuống cơ sở dữ liệu dưới dạng tệp .sqlite              |
| `/api/db-backups/import`    | ĐĂNG        | Tải lên tệp .sqlite để thay thế cơ sở dữ liệu              |
| `/api/db-backups/exportAll` | NHẬN        | Tải xuống bản sao lưu đầy đủ dưới dạng kho lưu trữ .tar.gz |

### Đồng bộ đám mây

| Điểm cuối              | Phương pháp | Mô tả                         |
| ---------------------- | ----------- | ----------------------------- |
| `/api/sync/cloud`      | Khác nhau   | Hoạt động đồng bộ hóa đám mây |
| `/api/sync/initialize` | ĐĂNG        | Khởi tạo đồng bộ hóa          |
| `/api/cloud/*`         | Khác nhau   | Quản lý đám mây               |

### Công cụ CLI

| Điểm cuối                          | Phương pháp | Mô tả                    |
| ---------------------------------- | ----------- | ------------------------ |
| `/api/cli-tools/claude-settings`   | NHẬN        | Trạng thái Claude CLI    |
| `/api/cli-tools/codex-settings`    | NHẬN        | Trạng thái CLI của Codex |
| `/api/cli-tools/droid-settings`    | NHẬN        | Trạng thái CLI của Droid |
| `/api/cli-tools/openclaw-settings` | NHẬN        | Trạng thái CLI OpenClaw  |
| `/api/cli-tools/runtime/[toolId]`  | NHẬN        | Thời gian chạy CLI chung |

Phản hồi CLI bao gồm: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Khả năng phục hồi và giới hạn tỷ lệ

| Điểm cuối               | Phương pháp | Mô tả                                       |
| ----------------------- | ----------- | ------------------------------------------- |
| `/api/resilience`       | NHẬN/ĐẶT    | Nhận/cập nhật hồ sơ khả năng phục hồi       |
| `/api/resilience/reset` | ĐĂNG        | Đặt lại bộ ngắt mạch                        |
| `/api/rate-limits`      | NHẬN        | Trạng thái giới hạn tỷ lệ cho mỗi tài khoản |
| `/api/rate-limit`       | NHẬN        | Cấu hình giới hạn tốc độ toàn cầu           |

### Đánh giá

| Điểm cuối    | Phương pháp | Mô tả                                   |
| ------------ | ----------- | --------------------------------------- |
| `/api/evals` | NHẬN/ĐĂNG   | Liệt kê các bộ đánh giá / đánh giá chạy |

### Chính sách

| Điểm cuối       | Phương pháp   | Mô tả                         |
| --------------- | ------------- | ----------------------------- |
| `/api/policies` | NHẬN/ĐĂNG/XÓA | Quản lý chính sách định tuyến |

### Tuân thủ

| Điểm cuối                   | Phương pháp | Mô tả                                   |
| --------------------------- | ----------- | --------------------------------------- |
| `/api/compliance/audit-log` | NHẬN        | Nhật ký kiểm tra tuân thủ (N cuối cùng) |

### v1beta (Tương thích với Gemini)

| Điểm cuối                  | Phương pháp | Mô tả                                  |
| -------------------------- | ----------- | -------------------------------------- |
| `/v1beta/models`           | NHẬN        | Liệt kê các mô hình ở định dạng Gemini |
| `/v1beta/models/{...path}` | ĐĂNG        | Điểm cuối Gemini `generateContent`     |

Các điểm cuối này phản ánh định dạng API của Gemini dành cho những khách hàng mong đợi khả năng tương thích SDK Gemini gốc.

### API nội bộ/hệ thống

| Điểm cuối       | Phương pháp | Mô tả                                                             |
| --------------- | ----------- | ----------------------------------------------------------------- |
| `/api/init`     | NHẬN        | Kiểm tra khởi tạo ứng dụng (được sử dụng trong lần chạy đầu tiên) |
| `/api/tags`     | NHẬN        | Thẻ mô hình tương thích với Ollama (dành cho khách hàng Ollama)   |
| `/api/restart`  | ĐĂNG        | Kích hoạt khởi động lại máy chủ duyên dáng                        |
| `/api/shutdown` | ĐĂNG        | Kích hoạt tắt máy chủ duyên dáng                                  |

> **Lưu ý:** Các điểm cuối này được hệ thống sử dụng nội bộ hoặc để tương thích với máy khách Ollama. Chúng thường không được người dùng cuối gọi.

---

## Phiên âm âm thanh

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Phiên âm các tệp âm thanh bằng Deepgram hoặc AssemblyAI.

**Yêu cầu:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Trả lời:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Nhà cung cấp được hỗ trợ:** `deepgram/nova-3`, `assemblyai/best`.

**Các định dạng được hỗ trợ:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Khả năng tương thích của Ollama

Đối với khách hàng sử dụng định dạng API của Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Các yêu cầu được dịch tự động giữa Ollama và các định dạng nội bộ.

---

## Đo từ xa

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Trả lời:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Ngân sách

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Mẫu có sẵn

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Xử lý yêu cầu

1. Khách hàng gửi yêu cầu tới `/v1/*`
2. Lệnh gọi trình xử lý tuyến `handleChat`, `handleEmbedding`, `handleAudioTranscription` hoặc `handleImageGeneration`
3. Mô hình đã được giải quyết (nhà cung cấp/mô hình trực tiếp hoặc bí danh/combo)
4. Thông tin xác thực được chọn từ DB cục bộ với tính năng lọc tính khả dụng của tài khoản
5. Để trò chuyện: `handleChatCore` — phát hiện định dạng, dịch, kiểm tra bộ đệm, kiểm tra idempotency
6. Người thực thi nhà cung cấp gửi yêu cầu ngược dòng
7. Phản hồi được dịch trở lại định dạng máy khách (trò chuyện) hoặc trả về nguyên trạng (nhúng/hình ảnh/âm thanh)
8. Việc sử dụng/ghi nhật ký được ghi lại
9. Dự phòng áp dụng cho các lỗi theo quy tắc kết hợp

Tham khảo kiến trúc đầy đủ: [link](ARCHITECTURE.md)

---

## Xác thực

- Các tuyến trên trang tổng quan (`/dashboard/*`) sử dụng cookie `auth_token`
- Đăng nhập sử dụng hàm băm mật khẩu đã lưu; dự phòng cho `INITIAL_PASSWORD`
- `requireLogin` có thể chuyển đổi qua `/api/settings/require-login`
- Các tuyến `/v1/*` tùy chọn yêu cầu khóa API Bearer khi `REQUIRE_API_KEY=true`
