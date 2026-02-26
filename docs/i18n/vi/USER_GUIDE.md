🌐 **Languages:** 🇺🇸 [English](../../USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/USER_GUIDE.md) | 🇪🇸 [Español](../es/USER_GUIDE.md) | 🇫🇷 [Français](../fr/USER_GUIDE.md) | 🇮🇹 [Italiano](../it/USER_GUIDE.md) | 🇷🇺 [Русский](../ru/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../zh-CN/USER_GUIDE.md) | 🇩🇪 [Deutsch](../de/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../in/USER_GUIDE.md) | 🇹🇭 [ไทย](../th/USER_GUIDE.md) | 🇺🇦 [Українська](../uk-UA/USER_GUIDE.md) | 🇸🇦 [العربية](../ar/USER_GUIDE.md) | 🇯🇵 [日本語](../ja/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../vi/USER_GUIDE.md) | 🇧🇬 [Български](../bg/USER_GUIDE.md) | 🇩🇰 [Dansk](../da/USER_GUIDE.md) | 🇫🇮 [Suomi](../fi/USER_GUIDE.md) | 🇮🇱 [עברית](../he/USER_GUIDE.md) | 🇭🇺 [Magyar](../hu/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../id/USER_GUIDE.md) | 🇰🇷 [한국어](../ko/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../ms/USER_GUIDE.md) | 🇳🇱 [Nederlands](../nl/USER_GUIDE.md) | 🇳🇴 [Norsk](../no/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../pt/USER_GUIDE.md) | 🇷🇴 [Română](../ro/USER_GUIDE.md) | 🇵🇱 [Polski](../pl/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../sk/USER_GUIDE.md) | 🇸🇪 [Svenska](../sv/USER_GUIDE.md) | 🇵🇭 [Filipino](../phi/USER_GUIDE.md)

#Hướng dẫn sử dụng

Hướng dẫn đầy đủ về cách định cấu hình nhà cung cấp, tạo tổ hợp, tích hợp công cụ CLI và triển khai OmniRoute.

---

## Mục lục

- [Pricing at a Glance](#-pricing-at-a-glance)
- [Use Cases](#-use-cases)
- [Provider Setup](#-provider-setup)
- [CLI Integration](#-cli-integration)
- [Deployment](#-deployment)
- [Available Models](#-available-models)
- [Advanced Features](#-advanced-features)

---

## 💰 Sơ lược về giá

| Bậc             | Nhà cung cấp        | Chi phí                      | Đặt lại hạn ngạch     | Tốt nhất cho               |
| --------------- | ------------------- | ---------------------------- | --------------------- | -------------------------- |
| **💳 ĐĂNG KÝ**  | Mã Claude (Pro)     | $20/tháng                    | 5h + hàng tuần        | Đã đăng ký                 |
|                 | Codex (Plus/Pro)    | $20-200/tháng                | 5h + hàng tuần        | Người dùng OpenAI          |
|                 | Song Tử CLI         | **MIỄN PHÍ**                 | 180K/tháng + 1K/ngày  | Mọi người!                 |
|                 | Phi công phụ GitHub | $10-19/tháng                 | Hàng tháng            | Người dùng GitHub          |
| **🔑 KHÓA API** | DeepSeek            | Trả tiền cho mỗi lần sử dụng | Không có              | Lý luận giá rẻ             |
|                 | Groq                | Trả tiền cho mỗi lần sử dụng | Không có              | Suy luận cực nhanh         |
|                 | xAI (Grok)          | Trả tiền cho mỗi lần sử dụng | Không có              | Lý luận Grok 4             |
|                 | Mistral             | Trả tiền cho mỗi lần sử dụng | Không có              | Các mô hình do EU đăng cai |
|                 | Lúng túng           | Trả tiền cho mỗi lần sử dụng | Không có              | Tăng cường tìm kiếm        |
|                 | Cùng AI             | Trả tiền cho mỗi lần sử dụng | Không có              | Mô hình nguồn mở           |
|                 | Pháo hoa AI         | Trả tiền cho mỗi lần sử dụng | Không có              | Hình ảnh FLUX nhanh        |
|                 | Não                 | Trả tiền cho mỗi lần sử dụng | Không có              | Tốc độ quy mô wafer        |
|                 | Kết hợp             | Trả tiền cho mỗi lần sử dụng | Không có              | Lệnh R+ RAG                |
|                 | NVIDIA NIM          | Trả tiền cho mỗi lần sử dụng | Không có              | Mô hình doanh nghiệp       |
| **💰 RẺ**       | GLM-4.7             | 0,6 USD/1 triệu USD          | 10 giờ sáng hàng ngày | Dự phòng ngân sách         |
|                 | MiniMax M2.1        | 0,2 USD/1 triệu USD          | lăn 5 giờ             | Lựa chọn rẻ nhất           |
|                 | Kimi K2             | $9/tháng căn hộ              | 10 triệu token/tháng  | Chi phí dự đoán            |
| **🆓 MIỄN PHÍ** | iFlow               | $0                           | Không giới hạn        | 8 mẫu miễn phí             |
|                 | Qwen                | $0                           | Không giới hạn        | 3 mẫu miễn phí             |
|                 | Kiro                | $0                           | Không giới hạn        | Claude miễn phí            |

**💡 Mẹo chuyên nghiệp:** Bắt đầu với Gemini CLI (180K miễn phí/tháng) + combo iFlow (miễn phí không giới hạn) = chi phí $0!

---

## 🎯 Trường hợp sử dụng

### Trường hợp 1: "Tôi có đăng ký Claude Pro"

**Vấn đề:** Hạn ngạch hết hạn không được sử dụng, giới hạn tốc độ trong quá trình mã hóa nặng

```
Combo: "maximize-claude"
  1. cc/claude-opus-4-6        (use subscription fully)
  2. glm/glm-4.7               (cheap backup when quota out)
  3. if/kimi-k2-thinking       (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration
```

### Trường hợp 2: "Tôi muốn chi phí bằng 0"

**Vấn đề:** Không đủ khả năng đăng ký, cần mã hóa AI đáng tin cậy

```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
```

### Trường hợp 3: "Tôi cần code 24/7, không bị gián đoạn"

**Vấn đề:** Thời hạn, không đủ khả năng cho thời gian ngừng hoạt động

```
Combo: "always-on"
  1. cc/claude-opus-4-6        (best quality)
  2. cx/gpt-5.2-codex          (second subscription)
  3. glm/glm-4.7               (cheap, resets daily)
  4. minimax/MiniMax-M2.1      (cheapest, 5h reset)
  5. if/kimi-k2-thinking       (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)
```

### Trường hợp 4: "Tôi muốn AI MIỄN PHÍ trong OpenClaw"

**Vấn đề:** Cần trợ lý AI trong ứng dụng nhắn tin, hoàn toàn miễn phí

```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
```

---

## 📖 Thiết lập nhà cung cấp

### 🔐 Nhà cung cấp đăng ký

#### Mã Claude (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Mẹo chuyên nghiệp:** Sử dụng Opus cho các tác vụ phức tạp, Sonnet cho tốc độ. OmniRoute theo dõi hạn ngạch cho mỗi mô hình!

#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (MIỄN PHÍ 180K/tháng!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Giá trị tốt nhất:** Cấp miễn phí rất lớn! Sử dụng điều này trước các bậc trả phí.

#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

### 💰 Nhà cung cấp giá rẻ

#### GLM-4.7 (Đặt lại hàng ngày, 0,6 USD/1 triệu USD)

1. Đăng ký: [Zhipu AI](https://open.bigmodel.cn/)
2. Nhận khóa API từ Gói mã hóa
3. Bảng điều khiển → Thêm khóa API: Nhà cung cấp: `glm`, Khóa API: `your-key`

**Sử dụng:** `glm/glm-4.7` — **Mẹo chuyên nghiệp:** Gói mã hóa cung cấp hạn ngạch 3× với chi phí 1/7! Đặt lại vào 10:00 sáng hàng ngày.

#### MiniMax M2.1 (đặt lại 5 giờ, 0,20 USD/1 triệu)

1. Đăng ký: [MiniMax](https://www.minimax.io/)
2. Nhận khóa API → Bảng điều khiển → Thêm khóa API

**Sử dụng:** `minimax/MiniMax-M2.1` — **Mẹo chuyên nghiệp:** Tùy chọn rẻ nhất cho bối cảnh dài (1 triệu mã thông báo)!

#### Kimi K2 ($9/tháng cố định)

1. Đăng ký: [Moonshot AI](https://platform.moonshot.ai/)
2. Nhận khóa API → Bảng điều khiển → Thêm khóa API

**Sử dụng:** `kimi/kimi-latest` — **Mẹo chuyên nghiệp:** Đã sửa lỗi 9 USD/tháng cho 10 triệu mã thông báo = 0,90 USD/1 triệu chi phí hiệu quả!

### 🆓 Nhà cung cấp MIỄN PHÍ

#### iFlow (8 mẫu MIỄN PHÍ)

```bash
Dashboard → Connect iFlow → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 mẫu MIỄN PHÍ)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude MIỄN PHÍ)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combo

### Ví dụ 1: Tối đa hóa đăng ký → Sao lưu giá rẻ

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Ví dụ 2: Chỉ miễn phí (Không mất phí)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 Tích hợp CLI

### IDE con trỏ

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Mã Claude

Chỉnh sửa `~/.claude/config.json`:

```json
{
  "anthropic_api_base": "http://localhost:20128/v1",
  "anthropic_api_key": "your-omniroute-api-key"
}
```

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

Chỉnh sửa `~/.openclaw/openclaw.json`:

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/glm-4.7" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
      }
    }
  }
}
```

**Hoặc sử dụng Bảng điều khiển:** Công cụ CLI → OpenClaw → Tự động cấu hình

### Cline / Tiếp tục / RooCode

```
Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6
```

---

## 🚀 Triển khai

### Triển khai VPS

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# Or: pm2 start npm --name omniroute -- start
```

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

Để biết chế độ tích hợp máy chủ với các tệp nhị phân CLI, hãy xem phần Docker trong tài liệu chính.

### Biến môi trường

| Biến                  | Mặc định                             | Mô tả                                                      |
| --------------------- | ------------------------------------ | ---------------------------------------------------------- |
| `JWT_SECRET`          | `omniroute-default-secret-change-me` | Bí mật ký kết JWT (**thay đổi trong sản xuất**)            |
| `INITIAL_PASSWORD`    | `123456`                             | Mật khẩu đăng nhập lần đầu                                 |
| `DATA_DIR`            | `~/.omniroute`                       | Thư mục dữ liệu (db, cách sử dụng, nhật ký)                |
| `PORT`                | mặc định khung                       | Cổng dịch vụ (`20128` trong ví dụ)                         |
| `HOSTNAME`            | mặc định khung                       | Máy chủ liên kết (Docker mặc định là `0.0.0.0`)            |
| `NODE_ENV`            | mặc định thời gian chạy              | Đặt `production` để triển khai                             |
| `BASE_URL`            | `http://localhost:20128`             | URL cơ sở nội bộ phía máy chủ                              |
| `CLOUD_URL`           | `https://omniroute.dev`              | URL cơ sở điểm cuối đồng bộ hóa đám mây                    |
| `API_KEY_SECRET`      | `endpoint-proxy-api-key-secret`      | Bí mật HMAC cho các khóa API được tạo                      |
| `REQUIRE_API_KEY`     | `false`                              | Thực thi khóa API Bearer trên `/v1/*`                      |
| `ENABLE_REQUEST_LOGS` | `false`                              | Bật nhật ký yêu cầu/phản hồi                               |
| `AUTH_COOKIE_SECURE`  | `false`                              | Buộc `Secure` cookie xác thực (đằng sau proxy ngược HTTPS) |

Để biết tham chiếu đầy đủ về biến môi trường, hãy xem [README](../README.md).

---

## 📊 Mẫu có sẵn

<details>
<summary><b>Xem tất cả các mẫu có sẵn</b></summary>

**Mã Claude (`cc/`)** — Pro/Max: `cc/claude-opus-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex (`cx/`)** — Plus/Pro: `cx/gpt-5.2-codex`, `cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)** — MIỄN PHÍ: `gc/gemini-3-flash-preview`, `gc/gemini-2.5-pro`

**GitHub Copilot (`gh/`)**: `gh/gpt-5`, `gh/claude-4.5-sonnet`

**GLM (`glm/`)** — 0,6 USD/1 triệu: `glm/glm-4.7`

**MiniMax (`minimax/`)** — 0,2 USD/1 triệu: `minimax/MiniMax-M2.1`

**iFlow (`if/`)** — MIỄN PHÍ: `if/kimi-k2-thinking`, `if/qwen3-coder-plus`, `if/deepseek-r1`

**Qwen (`qw/`)** — MIỄN PHÍ: `qw/qwen3-coder-plus`, `qw/qwen3-coder-flash`

**Kiro (`kr/`)** — MIỄN PHÍ: `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`

**DeepSeek (`ds/`)**: `ds/deepseek-chat`, `ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`, `groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`, `xai/grok-4-0709-fast-reasoning`, `xai/grok-code-mini`

**Mistral (`mistral/`)**: `mistral/mistral-large-2501`, `mistral/codestral-2501`

**Bối rối (`pplx/`)**: `pplx/sonar-pro`, `pplx/sonar`

**Cùng AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Pháo hoa AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**Não (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`

</details>

---

## 🧩 Tính năng nâng cao

### Mẫu tùy chỉnh

Thêm bất kỳ ID mẫu nào vào bất kỳ nhà cung cấp nào mà không cần chờ cập nhật ứng dụng:

```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
```

Hoặc sử dụng Trang tổng quan: **Nhà cung cấp → [Nhà cung cấp] → Mô hình tùy chỉnh**.

### Tuyến đường dành riêng cho nhà cung cấp

Định tuyến các yêu cầu trực tiếp đến một nhà cung cấp cụ thể với xác thực mô hình:

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

Tiền tố nhà cung cấp được tự động thêm vào nếu thiếu. Các mô hình không khớp trả về `400`.

### Cấu hình proxy mạng

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**Ưu tiên:** Dành riêng cho khóa → Dành riêng cho tổ hợp → Dành riêng cho nhà cung cấp → Toàn cầu → Môi trường.

### API danh mục mẫu

```bash
curl http://localhost:20128/api/models/catalog
```

Trả về các mô hình được nhóm theo nhà cung cấp với các loại (`chat`, `embedding`, `image`).

### Đồng bộ đám mây

- Đồng bộ hóa nhà cung cấp, combo và cài đặt trên các thiết bị
- Đồng bộ hóa nền tự động với thời gian chờ + không nhanh
- Ưu tiên phía máy chủ `BASE_URL`/`CLOUD_URL` phía máy chủ trong sản xuất

### LLM Gateway Intelligence (Giai đoạn 9)

- **Bộ nhớ đệm ngữ nghĩa** — Tự động lưu vào bộ nhớ đệm khi không phát trực tuyến, phản hồi nhiệt độ=0 (bỏ qua bằng `X-OmniRoute-No-Cache: true`)
- **Yêu cầu Idempotency** — Loại bỏ các yêu cầu trùng lặp trong vòng 5 giây thông qua tiêu đề `Idempotency-Key` hoặc `X-Request-Id`
- **Theo dõi tiến trình** — Chọn tham gia các sự kiện SSE `event: progress` qua tiêu đề `X-OmniRoute-Progress: true`

---

### Sân chơi dịch thuật

Truy cập qua **Bảng điều khiển → Trình dịch**. Gỡ lỗi và trực quan hóa cách OmniRoute dịch các yêu cầu API giữa các nhà cung cấp.

| Chế độ                        | Mục đích                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------- |
| **Sân chơi**                  | Chọn định dạng nguồn/đích, dán yêu cầu và xem bản dịch ngay lập tức                            |
| **Người kiểm tra trò chuyện** | Gửi tin nhắn trò chuyện trực tiếp qua proxy và kiểm tra toàn bộ chu trình yêu cầu/phản hồi     |
| **Bàn thử nghiệm**            | Chạy thử nghiệm hàng loạt trên nhiều kết hợp định dạng để xác minh tính chính xác của bản dịch |
| **Màn hình trực tiếp**        | Xem các bản dịch theo thời gian thực khi các yêu cầu chuyển qua proxy                          |

**Trường hợp sử dụng:**

- Gỡ lỗi tại sao kết hợp khách hàng/nhà cung cấp cụ thể không thành công
- Xác minh rằng thẻ tư duy, lệnh gọi công cụ và lời nhắc hệ thống được dịch chính xác
- So sánh sự khác biệt về định dạng giữa các định dạng API OpenAI, Claude, Gemini và Responses

---

### Chiến lược định tuyến

Định cấu hình qua **Bảng điều khiển → Cài đặt → Định tuyến**.

| Chiến lược                          | Mô tả                                                                                                                 |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Điền đầu tiên**                   | Sử dụng các tài khoản theo thứ tự ưu tiên - tài khoản chính xử lý tất cả các yêu cầu cho đến khi không có sẵn         |
| **Vòng tròn**                       | Xoay vòng qua tất cả các tài khoản với giới hạn cố định có thể định cấu hình (mặc định: 3 cuộc gọi cho mỗi tài khoản) |
| **P2C (Sức mạnh của hai lựa chọn)** | Chọn 2 tài khoản ngẫu nhiên và hướng đến tài khoản lành mạnh hơn — cân bằng tải trọng với nhận thức về sức khỏe       |
| **Ngẫu nhiên**                      | Chọn ngẫu nhiên một tài khoản cho mỗi yêu cầu bằng cách sử dụng tính năng ngẫu nhiên Fisher-Yates                     |
| **Ít sử dụng nhất**                 | Định tuyến tới tài khoản có dấu thời gian `lastUsedAt` cũ nhất, phân bổ lưu lượng truy cập đồng đều                   |
| **Tối ưu hóa chi phí**              | Định tuyến đến tài khoản có giá trị ưu tiên thấp nhất, tối ưu hóa cho nhà cung cấp có chi phí thấp nhất               |

#### Bí danh mô hình ký tự đại diện

Tạo các mẫu ký tự đại diện để ánh xạ lại tên mô hình:

```
Pattern: claude-sonnet-*     →  Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-*               →  Target: gh/gpt-5.1-codex
```

Hỗ trợ ký tự đại diện `*` (bất kỳ ký tự nào) và `?` (ký tự đơn).

#### Chuỗi dự phòng

Xác định chuỗi dự phòng toàn cầu áp dụng cho tất cả các yêu cầu:

```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
```

---

### Khả năng phục hồi & Bộ ngắt mạch

Định cấu hình qua **Bảng điều khiển → Cài đặt → Khả năng phục hồi**.

OmniRoute triển khai khả năng phục hồi cấp nhà cung cấp với bốn thành phần:

1. **Hồ sơ nhà cung cấp** — Cấu hình cho mỗi nhà cung cấp cho:
   - Ngưỡng thất bại (có bao nhiêu lần thất bại trước khi mở)
   - Thời gian hồi chiêu
   - Độ nhạy phát hiện giới hạn tốc độ
   - Thông số backoff theo cấp số nhân

2. **Giới hạn tỷ lệ có thể chỉnh sửa** — Giá trị mặc định ở cấp hệ thống có thể định cấu hình trong trang tổng quan:
   - **Số yêu cầu mỗi phút (RPM)** — Số yêu cầu tối đa mỗi phút cho mỗi tài khoản
   - **Thời gian tối thiểu giữa các yêu cầu** — Khoảng cách tối thiểu tính bằng mili giây giữa các yêu cầu
   - **Số yêu cầu đồng thời tối đa** — Số yêu cầu đồng thời tối đa cho mỗi tài khoản
   - Nhấp vào **Chỉnh sửa** để sửa đổi, sau đó nhấp vào **Lưu** hoặc **Hủy**. Các giá trị vẫn tồn tại thông qua API khả năng phục hồi.

3. **Bộ ngắt mạch** — Theo dõi lỗi của mỗi nhà cung cấp và tự động mở mạch khi đạt đến ngưỡng:
   - **ĐÓNG** (Khỏe mạnh) — Yêu cầu diễn ra bình thường
   - **OPEN** — Nhà cung cấp bị chặn tạm thời sau nhiều lần thất bại
   - **HALF_OPEN** — Kiểm tra xem nhà cung cấp đã phục hồi chưa

4. **Chính sách & Mã định danh bị khóa** — Hiển thị trạng thái cầu dao và mã định danh bị khóa với khả năng buộc mở khóa.

5. **Tự động phát hiện giới hạn tốc độ** — Giám sát các tiêu đề `429` và `Retry-After` để chủ động tránh chạm tới giới hạn tốc độ của nhà cung cấp.

**Mẹo chuyên nghiệp:** Sử dụng nút **Đặt lại tất cả** để xóa tất cả cầu dao và thời gian hồi chiêu khi nhà cung cấp khôi phục sau khi ngừng hoạt động.

---

### Xuất/Nhập cơ sở dữ liệu

Quản lý sao lưu cơ sở dữ liệu trong **Bảng điều khiển → Cài đặt → Hệ thống & Bộ lưu trữ**.

| Hành động                 | Mô tả                                                                                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Xuất cơ sở dữ liệu**    | Tải xuống cơ sở dữ liệu SQLite hiện tại dưới dạng tệp `.sqlite`                                                                                         |
| **Xuất tất cả (.tar.gz)** | Tải xuống kho lưu trữ sao lưu đầy đủ bao gồm: cơ sở dữ liệu, cài đặt, tổ hợp, kết nối nhà cung cấp (không có thông tin xác thực), siêu dữ liệu khóa API |
| **Nhập cơ sở dữ liệu**    | Tải tệp `.sqlite` lên để thay thế cơ sở dữ liệu hiện tại. Bản sao lưu trước khi nhập được tự động tạo                                                   |

```bash
# API: Export database
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**Xác thực nhập:** Tệp đã nhập được xác thực về tính toàn vẹn (kiểm tra pragma SQLite), các bảng bắt buộc (`provider_connections`, `provider_nodes`, `combos`, `api_keys`) và kích thước (tối đa 100MB).

**Trường hợp sử dụng:**

- Di chuyển OmniRoute giữa các máy
- Tạo bản sao lưu bên ngoài để khắc phục thảm họa
- Chia sẻ cấu hình giữa các thành viên trong nhóm (xuất tất cả → chia sẻ kho lưu trữ)

---

### Bảng điều khiển cài đặt

Trang cài đặt được tổ chức thành 5 tab để dễ dàng điều hướng:

| Tab                   | Nội dung                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| **An ninh**           | Cài đặt đăng nhập/mật khẩu, Kiểm soát truy cập IP, xác thực API cho `/models` và Chặn nhà cung cấp            |
| **Định tuyến**        | Chiến lược định tuyến toàn cầu (6 tùy chọn), bí danh mô hình ký tự đại diện, chuỗi dự phòng, mặc định kết hợp |
| **Khả năng phục hồi** | Hồ sơ nhà cung cấp, giới hạn tỷ lệ có thể chỉnh sửa, trạng thái ngắt mạch, chính sách và số nhận dạng bị khóa |
| **AI**                | Suy nghĩ về cấu hình ngân sách, tiêm nhắc hệ thống toàn cầu, thống kê bộ nhớ đệm nhanh chóng                  |
| **Nâng cao**          | Cấu hình proxy toàn cầu (HTTP/SOCKS5)                                                                         |

---

### Quản lý chi phí & ngân sách

Truy cập qua **Bảng điều khiển → Chi phí**.

| Tab           | Mục đích                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| **Ngân sách** | Đặt giới hạn chi tiêu cho mỗi khóa API với ngân sách hàng ngày/hàng tuần/hàng tháng và theo dõi thời gian thực  |
| **Giá**       | Xem và chỉnh sửa các mục định giá mô hình — chi phí cho mỗi 1K mã thông báo đầu vào/đầu ra cho mỗi nhà cung cấp |

```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
```

**Theo dõi chi phí:** Mọi yêu cầu đều ghi lại việc sử dụng mã thông báo và tính toán chi phí bằng bảng giá. Xem thông tin chi tiết trong **Trang tổng quan → Mức sử dụng** theo nhà cung cấp, kiểu máy và khóa API.

---

### Phiên âm âm thanh

OmniRoute hỗ trợ sao chép âm thanh thông qua điểm cuối tương thích với OpenAI:

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

Các nhà cung cấp hiện có: **Deepgram** (`deepgram/`), **AssemblyAI** (`assemblyai/`).

Các định dạng âm thanh được hỗ trợ: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

### Chiến lược cân bằng kết hợp

Định cấu hình cân bằng trên mỗi kết hợp trong **Bảng điều khiển → Tổ hợp → Tạo/Chỉnh sửa → Chiến lược**.

| Chiến lược               | Mô tả                                                                       |
| ------------------------ | --------------------------------------------------------------------------- |
| **Vòng tròn**            | Xoay qua các mô hình một cách tuần tự                                       |
| **Ưu tiên**              | Luôn thử mẫu đầu tiên; chỉ quay lại khi có lỗi                              |
| **Ngẫu nhiên**           | Chọn một mô hình ngẫu nhiên từ combo cho mỗi yêu cầu                        |
| **Có trọng số**          | Các tuyến đường tương ứng dựa trên trọng số được chỉ định cho mỗi mô hình   |
| **Ít được sử dụng nhất** | Định tuyến đến mô hình có ít yêu cầu gần đây nhất (sử dụng số liệu kết hợp) |
| **Tối ưu hóa chi phí**   | Hướng đến mô hình có sẵn rẻ nhất (sử dụng bảng giá)                         |

Mặc định kết hợp chung có thể được đặt trong **Bảng điều khiển → Cài đặt → Định tuyến → Mặc định kết hợp**.

---

### Bảng thông tin sức khỏe

Truy cập qua **Bảng điều khiển → Sức khỏe**. Tổng quan về tình trạng hệ thống theo thời gian thực với 6 thẻ:

| Thẻ                           | Nó hiển thị những gì                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| **Trạng thái hệ thống**       | Thời gian hoạt động, phiên bản, mức sử dụng bộ nhớ, thư mục dữ liệu                   |
| **Sức khỏe của nhà cung cấp** | Trạng thái ngắt mạch của mỗi nhà cung cấp (Đóng/Mở/Nửa mở)                            |
| **Giới hạn tỷ lệ**            | Thời gian hồi chiêu giới hạn tốc độ kích hoạt cho mỗi tài khoản với thời gian còn lại |
| **Khóa hoạt động**            | Nhà cung cấp bị chặn tạm thời bởi chính sách khóa                                     |
| **Bộ nhớ đệm chữ ký**         | Số liệu thống kê bộ đệm chống trùng lặp (khóa hoạt động, tỷ lệ truy cập)              |
| **Từ xa độ trễ**              | tổng hợp độ trễ p50/p95/p99 cho mỗi nhà cung cấp                                      |

**Mẹo chuyên nghiệp:** Trang Sức khỏe tự động làm mới sau mỗi 10 giây. Sử dụng thẻ ngắt mạch để xác định nhà cung cấp nào đang gặp sự cố.
