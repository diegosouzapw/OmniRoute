<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — Cổng AI miễn phí

### Không bao giờ ngừng viết mã. Định tuyến thông minh tới **Mô hình AI MIỄN PHÍ và chi phí thấp** với tính năng dự phòng tự động.

_Proxy API phổ quát của bạn — một điểm cuối, hơn 36 nhà cung cấp, không có thời gian ngừng hoạt động._

**Hoàn thành cuộc trò chuyện • Nhúng • Tạo hình ảnh • Âm thanh • Sắp xếp lại • 100% TypeScript**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Nhà cung cấp AI miễn phí cho các tác nhân mã hóa yêu thích của bạn

_Kết nối mọi công cụ IDE hoặc CLI được hỗ trợ bởi AI thông qua OmniRoute — cổng API miễn phí để mã hóa không giới hạn._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Tất cả đại lý kết nối qua <code>http://localhost:20128/v1</code> hoặc <code>http://cloud.omniroute.online/v1</code> — một cấu hình, số mô hình và hạn ngạch không giới hạn</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 Tại sao lại là OmniRoute?

**Ngưng lãng phí tiền và đạt đến giới hạn:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Hạn mức đăng ký hết hạn không được sử dụng hàng tháng
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Giới hạn tốc độ khiến bạn không thể viết mã giữa chừng
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> API đắt tiền ($20-50/tháng cho mỗi nhà cung cấp)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Chuyển đổi thủ công giữa các nhà cung cấp

**OmniRoute giải quyết vấn đề này:**

- ✅ **Tối đa hóa số lượt đăng ký** - Theo dõi hạn ngạch, sử dụng từng bit trước khi đặt lại
- ✅ **Tự động dự phòng** - Đăng ký → Khóa API → Giá rẻ → Miễn phí, không có thời gian ngừng hoạt động
- ✅ **Nhiều tài khoản** - Luân chuyển giữa các tài khoản cho mỗi nhà cung cấp
- ✅ **Universal** - Hoạt động với Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, mọi công cụ CLI

---

## 📧 Hỗ trợ

> 💬 **Tham gia cộng đồng của chúng tôi!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Nhận trợ giúp, chia sẻ mẹo và luôn cập nhật.

- **Trang web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Vấn đề**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Dự án gốc**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 Nó hoạt động như thế nào

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 OmniRoute giải quyết được gì — 30 điểm khó thực sự và trường hợp sử dụng

> **Mọi nhà phát triển sử dụng công cụ AI đều phải đối mặt với những vấn đề này hàng ngày.** OmniRoute được xây dựng để giải quyết tất cả — từ chi phí vượt mức cho đến chặn khu vực, từ luồng OAuth bị hỏng đến hoạt động giao thức và khả năng quan sát của doanh nghiệp.

<details>
<summary><b>💸 1. "Tôi trả tiền cho một thuê bao đắt tiền nhưng vẫn bị gián đoạn bởi các giới hạn"</b></summary>

Các nhà phát triển trả 20–200 USD/tháng cho Claude Pro, Codex Pro hoặc GitHub Copilot. Ngay cả khi trả tiền, hạn ngạch vẫn có mức trần - 5 giờ sử dụng, giới hạn hàng tuần hoặc giới hạn tốc độ mỗi phút. Giữa phiên mã hóa, nhà cung cấp ngừng phản hồi và nhà phát triển mất đi dòng chảy và năng suất.

**Cách OmniRoute giải quyết vấn đề này:**

- **Dự phòng 4 tầng thông minh** — Nếu hết hạn ngạch đăng ký, tự động chuyển hướng đến Khóa API → Giá rẻ → Miễn phí mà không cần can thiệp thủ công
- **Theo dõi hạn ngạch theo thời gian thực** — Hiển thị mức tiêu thụ mã thông báo trong thời gian thực với tính năng đếm ngược đặt lại (5 giờ, hàng ngày, hàng tuần)
- **Hỗ trợ nhiều tài khoản** — Nhiều tài khoản cho mỗi nhà cung cấp với tính năng tự động quay vòng — khi hết một tài khoản, hãy chuyển sang tài khoản tiếp theo
- **Combo tùy chỉnh** — Chuỗi dự phòng có thể tùy chỉnh với 6 chiến lược cân bằng (điền trước, quay vòng, P2C, ngẫu nhiên, ít sử dụng nhất, tối ưu hóa chi phí)
- **Hạn ngạch kinh doanh Codex** — Giám sát hạn ngạch không gian làm việc của Doanh nghiệp/Nhóm trực tiếp trong bảng điều khiển

</details>

<details>
<summary><b>🔌 2. "Tôi cần sử dụng nhiều nhà cung cấp nhưng mỗi nhà cung cấp có một API khác nhau"</b></summary>

OpenAI sử dụng một định dạng, Claude (Anthropic) sử dụng một định dạng khác, Gemini lại sử dụng một định dạng khác. Nếu nhà phát triển muốn thử nghiệm các mô hình từ các nhà cung cấp khác nhau hoặc dự phòng giữa các nhà cung cấp đó, họ cần phải định cấu hình lại SDK, thay đổi điểm cuối, xử lý các định dạng không tương thích. Các nhà cung cấp tùy chỉnh (FriendLI, NIM) có các điểm cuối mô hình không chuẩn.

**Cách OmniRoute giải quyết vấn đề này:**

- **Điểm cuối hợp nhất** — Một `http://localhost:20128/v1` duy nhất đóng vai trò là proxy cho tất cả hơn 36 nhà cung cấp
- **Dịch định dạng** — Tự động và minh bạch: OpenAI ↔ Claude ↔ Gemini ↔ API phản hồi
- **Sạch hóa phản hồi** — Loại bỏ các trường không chuẩn (`x_groq`, `usage_breakdown`, `service_tier`) phá vỡ OpenAI SDK v1.83+
- **Chuẩn hóa vai trò** — Chuyển đổi `developer` → `system` cho các nhà cung cấp không thuộc OpenAI; `system` → `user` cho GLM/ERNIE
- **Think Tag Extraction** — Trích xuất các khối `<think>` từ các mô hình như DeepSeek R1 thành `reasoning_content` được tiêu chuẩn hóa
- **Đầu ra có cấu trúc cho Gemini** — `json_schema` → `responseMimeType`/`responseSchema` chuyển đổi tự động
- **`stream` mặc định là `false`** — Phù hợp với thông số OpenAI, tránh SSE không mong muốn trong SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Nhà cung cấp AI của tôi chặn khu vực/quốc gia của tôi"</b></summary>

Các nhà cung cấp như OpenAI/Codex chặn quyền truy cập từ các khu vực địa lý nhất định. Người dùng gặp phải các lỗi như `unsupported_country_region_territory` trong quá trình kết nối OAuth và API. Điều này đặc biệt gây khó chịu cho các nhà phát triển từ các nước đang phát triển.

**Cách OmniRoute giải quyết vấn đề này:**

- **Cấu hình proxy 3 cấp** — Proxy có thể định cấu hình ở 3 cấp độ: toàn cầu (tất cả lưu lượng truy cập), mỗi nhà cung cấp (chỉ một nhà cung cấp) và mỗi kết nối/khóa
- **Huy hiệu proxy được mã hóa màu** — Chỉ báo trực quan: 🟢 proxy toàn cầu, 🟡 proxy nhà cung cấp, 🔵 proxy kết nối, luôn hiển thị IP
- **Trao đổi mã thông báo OAuth thông qua proxy** — Luồng OAuth cũng đi qua proxy, giải quyết `unsupported_country_region_territory`
- **Kiểm tra kết nối qua Proxy** — Kiểm tra kết nối sử dụng proxy đã định cấu hình (không cần bỏ qua trực tiếp nữa)
- **Hỗ trợ SOCKS5** — Hỗ trợ proxy SOCKS5 đầy đủ cho định tuyến đi
- **Giả mạo dấu vân tay TLS** — Dấu vân tay TLS giống trình duyệt thông qua `wreq-js` để vượt qua khả năng phát hiện bot

</details>

<details>
<summary><b>🆓 4. "Tôi muốn sử dụng AI để viết mã nhưng tôi không có tiền"</b></summary>

Không phải ai cũng có thể trả 20–200 USD/tháng để đăng ký AI. Sinh viên, nhà phát triển từ các quốc gia mới nổi, những người có sở thích và người làm nghề tự do cần được tiếp cận với các mô hình chất lượng với chi phí bằng 0.

**Cách OmniRoute giải quyết vấn đề này:**

- **Tích hợp sẵn nhà cung cấp cấp miễn phí** — Hỗ trợ riêng cho các nhà cung cấp miễn phí 100%: iFlow (8 mẫu không giới hạn), Qwen (3 mẫu không giới hạn), Kiro (Claude miễn phí), Gemini CLI (miễn phí 180K/tháng)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combo chỉ miễn phí** — Chuỗi `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/tháng mà không có thời gian ngừng hoạt động
- **Tín dụng miễn phí NVIDIA NIM** — Tích hợp 1000 tín dụng miễn phí
- **Chiến lược tối ưu hóa chi phí** — Chiến lược định tuyến tự động chọn nhà cung cấp sẵn có rẻ nhất

</details>

<details>
<summary><b>🔒 5. "Tôi cần bảo vệ cổng AI của mình khỏi bị truy cập trái phép"</b></summary>

Khi đưa cổng AI vào mạng (LAN, VPS, Docker), bất kỳ ai có địa chỉ đều có thể sử dụng mã thông báo/hạn ngạch của nhà phát triển. Nếu không có biện pháp bảo vệ, các API dễ bị lạm dụng, chèn ép và lạm dụng.

**Cách OmniRoute giải quyết vấn đề này:**

- **Quản lý khóa API** — Tạo, xoay vòng và xác định phạm vi cho mỗi nhà cung cấp bằng trang `/dashboard/api-manager` chuyên dụng
- **Quyền cấp mô hình** — Hạn chế khóa API đối với các mô hình cụ thể (`openai/*`, mẫu ký tự đại diện), với nút chuyển đổi Cho phép tất cả/Hạn chế
- **Bảo vệ điểm cuối API** — Yêu cầu khóa cho `/v1/models` và chặn các nhà cung cấp cụ thể khỏi danh sách
- **Auth Guard + CSRF Protection** — Tất cả các tuyến bảng điều khiển được bảo vệ bằng phần mềm trung gian `withAuth` + mã thông báo CSRF
- **Giới hạn tốc độ** — Giới hạn tốc độ trên mỗi IP với các cửa sổ có thể định cấu hình
- **Lọc IP** — Danh sách cho phép/danh sách chặn để kiểm soát truy cập
- **Prompt Tiêm Guard** — Khử trùng các mẫu nhắc nhở độc hại
- **Mã hóa AES-256-GCM** — Thông tin xác thực được mã hóa ở trạng thái lưu trữ

</details>

<details>
<summary><b>🛑 6. "Nhà cung cấp của tôi ngừng hoạt động và tôi mất luồng mã hóa"</b></summary>

Các nhà cung cấp AI có thể trở nên không ổn định, trả về lỗi 5xx hoặc đạt giới hạn tốc độ tạm thời. Nếu một nhà phát triển phụ thuộc vào một nhà cung cấp duy nhất thì họ sẽ bị gián đoạn. Nếu không có bộ ngắt mạch, việc thử lại nhiều lần có thể làm hỏng ứng dụng.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bộ ngắt mạch cho mỗi nhà cung cấp** — Tự động mở/đóng với ngưỡng có thể định cấu hình và thời gian hồi chiêu (Đóng/Mở/Nửa mở)
- **Thời gian chờ theo cấp số nhân** — Độ trễ thử lại lũy tiến
- **Bầy chống sấm sét** — Mutex + bảo vệ semaphore chống lại các cơn bão thử lại đồng thời
- **Chuỗi dự phòng kết hợp** — Nếu nhà cung cấp chính không thành công, nó sẽ tự động rơi qua chuỗi mà không cần can thiệp
- **Combo Circuit Breaker** — Tự động vô hiệu hóa các nhà cung cấp bị lỗi trong chuỗi kết hợp
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **Bảng thông tin sức khỏe** — Giám sát thời gian hoạt động, trạng thái ngắt mạch, khóa, số liệu thống kê bộ nhớ đệm, độ trễ p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Cấu hình từng công cụ AI thật tẻ nhạt và lặp đi lặp lại"</b></summary>

Nhà phát triển sử dụng Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Mỗi công cụ cần một cấu hình khác nhau (điểm cuối API, khóa, mô hình). Việc cấu hình lại khi chuyển đổi nhà cung cấp hoặc mô hình là một sự lãng phí thời gian.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bảng điều khiển công cụ CLI** — Trang chuyên dụng với thiết lập bằng một cú nhấp chuột cho Claude Code, Codex CLI, OpenClaw, Kilo Code, AntiGravity, Cline
- **Trình tạo cấu hình GitHub Copilot** — Tạo `chatLanguageModels.json` cho Mã VS với lựa chọn mô hình hàng loạt
- **Trình hướng dẫn tích hợp** — Thiết lập 4 bước có hướng dẫn cho người dùng lần đầu
- **Một điểm cuối, tất cả các kiểu máy** — Định cấu hình `http://localhost:20128/v1` một lần, truy cập hơn 36 nhà cung cấp

</details>

<details>
<summary><b>🔑 8. "Quản lý mã thông báo OAuth từ nhiều nhà cung cấp là địa ngục"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — tất cả đều sử dụng OAuth 2.0 với các mã thông báo sắp hết hạn. Các nhà phát triển cần liên tục xác thực lại, xử lý `client_secret is missing`, `redirect_uri_mismatch` và các lỗi trên máy chủ từ xa. OAuth trên LAN/VPS đặc biệt có vấn đề.

**Cách OmniRoute giải quyết vấn đề này:**

- **Tự động làm mới mã thông báo** — Làm mới mã thông báo OAuth ở chế độ nền trước khi hết hạn
- **Tích hợp OAuth 2.0 (PKCE)** — Luồng tự động cho Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth nhiều tài khoản** — Nhiều tài khoản cho mỗi nhà cung cấp thông qua trích xuất mã thông báo JWT/ID
- **OAuth LAN/Remote Fix** — Phát hiện IP riêng cho `redirect_uri` + chế độ URL thủ công cho máy chủ từ xa
- **OAuth đằng sau Nginx** — Sử dụng `window.location.origin` để tương thích với proxy ngược
- **Hướng dẫn OAuth từ xa** — Hướng dẫn từng bước về thông tin đăng nhập Google Cloud trên VPS/Docker

</details>

<details>
<summary><b>📊 9. "Tôi không biết mình đang chi bao nhiêu hay ở đâu"</b></summary>

Các nhà phát triển sử dụng nhiều nhà cung cấp trả phí nhưng không có quan điểm thống nhất về chi tiêu. Mỗi nhà cung cấp có trang tổng quan thanh toán riêng nhưng không có chế độ xem tổng hợp. Chi phí bất ngờ có thể chồng chất.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bảng thông tin phân tích chi phí** — Theo dõi chi phí mỗi mã thông báo và quản lý ngân sách cho mỗi nhà cung cấp
- **Giới hạn ngân sách cho mỗi cấp** — Mức chi tiêu trần cho mỗi cấp kích hoạt dự phòng tự động
- **Cấu hình định giá theo mẫu** — Giá có thể định cấu hình cho mỗi mẫu
- **Thống kê sử dụng trên mỗi khóa API** — Số lượng yêu cầu và dấu thời gian được sử dụng lần cuối trên mỗi khóa
- **Bảng thông tin phân tích** — Thẻ thống kê, biểu đồ sử dụng mô hình, bảng nhà cung cấp với tỷ lệ thành công và độ trễ

</details>

<details>
<summary><b>🐛 10. "Tôi không thể chẩn đoán lỗi và sự cố trong cuộc gọi AI"</b></summary>

Khi cuộc gọi không thành công, nhà phát triển không biết liệu đó có phải là giới hạn tốc độ, mã thông báo đã hết hạn, sai định dạng hay lỗi nhà cung cấp hay không. Nhật ký bị phân mảnh trên các thiết bị đầu cuối khác nhau. Nếu không có khả năng quan sát được thì việc gỡ lỗi chỉ là thử và sai.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bảng điều khiển nhật ký hợp nhất** — 4 tab: Nhật ký yêu cầu, Nhật ký proxy, Nhật ký kiểm tra, Bảng điều khiển
- **Trình xem nhật ký bảng điều khiển** — Trình xem kiểu thiết bị đầu cuối thời gian thực với các cấp độ được mã hóa màu, tự động cuộn, tìm kiếm, lọc
- **Nhật ký proxy SQLite** — Nhật ký liên tục vẫn tồn tại khi máy chủ khởi động lại
- **Sân chơi dịch thuật** — 4 chế độ gỡ lỗi: Sân chơi (dịch định dạng), Trình kiểm tra trò chuyện (khứ hồi), Bàn thử nghiệm (hàng loạt), Giám sát trực tiếp (thời gian thực)
- **Yêu cầu đo từ xa** — độ trễ p50/p95/p99 + truy tìm X-Request-Id
- **Ghi nhật ký dựa trên tệp bằng xoay vòng** — Trình chặn chặn bảng điều khiển ghi lại mọi thứ vào nhật ký JSON bằng cách xoay vòng dựa trên kích thước

</details>

<details>
<summary><b>🏗️ 11. "Việc triển khai và bảo trì cổng rất phức tạp"</b></summary>

Việc cài đặt, định cấu hình và duy trì proxy AI trên các môi trường khác nhau (cục bộ, VPS, Docker, đám mây) tốn nhiều công sức. Các vấn đề như đường dẫn được mã hóa cứng, `EACCES` trên thư mục, xung đột cổng và các bản dựng đa nền tảng sẽ gây thêm rắc rối.

**Cách OmniRoute giải quyết vấn đề này:**

- **npm cài đặt toàn cầu** — `npm install -g omniroute && omniroute` — đã xong
- **Docker Đa nền tảng** — AMD64 + ARM64 gốc (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Hồ sơ soạn thảo Docker** — `base` (không có công cụ CLI) và `cli` (với Claude Code, Codex, OpenClaw)
- **Ứng dụng máy tính để bàn điện tử** — Ứng dụng gốc dành cho Windows/macOS/Linux với khay hệ thống, tự động khởi động, chế độ ngoại tuyến
- **Chế độ chia cổng** — API và Bảng điều khiển trên các cổng riêng biệt cho các tình huống nâng cao (proxy ngược, mạng vùng chứa)
- **Cloud Sync** — Đồng bộ hóa cấu hình giữa các thiết bị thông qua Cloudflare Workers
- **Sao lưu DB** — Tự động sao lưu, khôi phục, xuất và nhập tất cả cài đặt

</details>

<details>
<summary><b>🌍 12. "Giao diện chỉ có tiếng Anh và nhóm của tôi không nói được tiếng Anh"</b></summary>

Các đội ở các quốc gia không nói tiếng Anh, đặc biệt là ở Châu Mỹ Latinh, Châu Á và Châu Âu, gặp khó khăn với giao diện chỉ có tiếng Anh. Rào cản ngôn ngữ làm giảm khả năng tiếp nhận và tăng lỗi cấu hình.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bảng điều khiển i18n — 30 ngôn ngữ** — Tất cả hơn 500 phím được dịch bao gồm tiếng Ả Rập, tiếng Bungari, tiếng Đan Mạch, tiếng Đức, tiếng Tây Ban Nha, tiếng Phần Lan, tiếng Pháp, tiếng Do Thái, tiếng Hindi, tiếng Hungary, tiếng Indonesia, tiếng Ý, tiếng Nhật, tiếng Hàn, tiếng Mã Lai, tiếng Hà Lan, tiếng Na Uy, tiếng Ba Lan, tiếng Bồ Đào Nha (PT/BR), tiếng Rumani, tiếng Nga, tiếng Slovak, tiếng Thụy Điển, tiếng Thái, tiếng Ukraina, tiếng Việt, tiếng Trung, tiếng Philipin, tiếng Anh
- **Hỗ trợ RTL** — Hỗ trợ từ phải sang trái cho tiếng Ả Rập và tiếng Do Thái
- **README đa ngôn ngữ** — 30 bản dịch tài liệu hoàn chỉnh
- **Bộ chọn ngôn ngữ** — Biểu tượng quả cầu trong tiêu đề để chuyển đổi theo thời gian thực

</details>

<details>
<summary><b>🔄 13. "Tôi cần nhiều hơn là trò chuyện - tôi cần nội dung nhúng, hình ảnh, âm thanh"</b></summary>

AI không chỉ hoàn thành cuộc trò chuyện. Nhà phát triển cần tạo hình ảnh, phiên âm âm thanh, tạo phần nhúng cho RAG, sắp xếp lại tài liệu và kiểm duyệt nội dung. Mỗi API có điểm cuối và định dạng khác nhau.

**Cách OmniRoute giải quyết vấn đề này:**

- **Nhúng** — `/v1/embeddings` với 6 nhà cung cấp và hơn 9 mẫu máy
- **Tạo hình ảnh** — `/v1/images/generations` với 10 nhà cung cấp và hơn 20 mô hình (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, AntiGravity, SD WebUI, ComfyUI)
- **Chuyển văn bản thành video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) và SD WebUI
- **Chuyển văn bản thành nhạc** — `/v1/music/generations` — ComfyUI (Mở âm thanh ổn định, MusicGen)
- **Phiên âm âm thanh** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Chuyển văn bản thành giọng nói** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT, + các nhà cung cấp hiện có
- **Kiểm duyệt** — `/v1/moderations` — Kiểm tra an toàn nội dung
- **Sắp xếp lại** — `/v1/rerank` — Sắp xếp lại mức độ liên quan của tài liệu
- **API phản hồi** — Hỗ trợ đầy đủ `/v1/responses` cho Codex

</details>

<details>
<summary><b>🧪 14. "Tôi không có cách nào để kiểm tra và so sánh chất lượng giữa các mẫu"</b></summary>

Các nhà phát triển muốn biết mô hình nào là tốt nhất cho trường hợp sử dụng của họ — mã, dịch thuật, lý luận — nhưng việc so sánh thủ công rất chậm. Không có công cụ đánh giá tích hợp nào tồn tại.

**Cách OmniRoute giải quyết vấn đề này:**

- **Đánh giá LLM** — Bộ thử nghiệm vàng với 10 trường hợp tải sẵn bao gồm lời chào, toán, địa lý, tạo mã, tuân thủ JSON, dịch thuật, đánh dấu, từ chối an toàn
- **4 Chiến lược kết hợp** — `exact`, `contains`, `regex`, `custom` (chức năng JS)
- **Băng thử nghiệm sân chơi dịch giả** — Thử nghiệm hàng loạt với nhiều đầu vào và đầu ra dự kiến, so sánh giữa các nhà cung cấp
- **Trình kiểm tra trò chuyện** — Toàn bộ chuyến đi với kết xuất phản hồi trực quan
- **Live Monitor** — Luồng thời gian thực của tất cả các yêu cầu truyền qua proxy

</details>

<details>
<summary><b>📈 15. "Tôi cần mở rộng quy mô mà không làm giảm hiệu suất"</b></summary>

Khi khối lượng yêu cầu tăng lên mà không lưu vào bộ nhớ đệm thì các câu hỏi tương tự sẽ tạo ra chi phí trùng lặp. Nếu không có tính tạm thời, các yêu cầu trùng lặp sẽ bị lãng phí. Giới hạn tỷ lệ cho mỗi nhà cung cấp phải được tôn trọng.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bộ nhớ đệm ngữ nghĩa** — Bộ nhớ đệm hai tầng (chữ ký + ngữ nghĩa) giúp giảm chi phí và độ trễ
- **Yêu cầu Idempotency** — Khoảng thời gian loại bỏ trùng lặp 5 giây cho các yêu cầu giống hệt nhau
- **Phát hiện giới hạn tỷ lệ** — RPM của mỗi nhà cung cấp, khoảng cách tối thiểu và theo dõi đồng thời tối đa
- **Giới hạn tỷ lệ có thể chỉnh sửa** — Giá trị mặc định có thể định cấu hình trong Cài đặt → Khả năng phục hồi với tính bền bỉ
- **Bộ đệm xác thực khóa API** — Bộ đệm 3 tầng cho hiệu suất sản xuất
- **Bảng thông tin sức khỏe với phép đo từ xa** — độ trễ p50/p95/p99, số liệu thống kê bộ nhớ đệm, thời gian hoạt động

</details>

<details>
<summary><b>🤖 16. "Tôi muốn kiểm soát hành vi của mô hình trên toàn cầu"</b></summary>

Các nhà phát triển muốn tất cả phản hồi bằng một ngôn ngữ cụ thể, với giọng điệu cụ thể hoặc muốn giới hạn các mã thông báo lý luận. Việc định cấu hình điều này trong mọi công cụ/yêu cầu là không thực tế.

**Cách OmniRoute giải quyết vấn đề này:**

- **Tiêm nhắc nhở hệ thống** — Lời nhắc chung được áp dụng cho tất cả các yêu cầu
- **Xác thực ngân sách tư duy** — Kiểm soát phân bổ mã thông báo hợp lý cho mỗi yêu cầu (chuyển qua, tự động, tùy chỉnh, thích ứng)
- **6 Chiến lược định tuyến** — Chiến lược toàn cầu xác định cách phân phối yêu cầu
- **Bộ định tuyến ký tự đại diện** — Các mẫu `provider/*` tự động định tuyến tới bất kỳ nhà cung cấp nào
- **Bật/Tắt kết hợp chuyển đổi** — Chuyển đổi kết hợp trực tiếp từ bảng điều khiển
- **Chuyển đổi nhà cung cấp** — Bật/tắt tất cả kết nối cho nhà cung cấp chỉ bằng một cú nhấp chuột
- **Nhà cung cấp bị chặn** — Loại trừ các nhà cung cấp cụ thể khỏi danh sách `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Tôi cần các công cụ MCP làm khả năng của sản phẩm hạng nhất"</b></summary>

Nhiều cổng AI chỉ hiển thị MCP dưới dạng chi tiết triển khai ẩn. Các nhóm cần một lớp hoạt động rõ ràng và dễ quản lý.

**Cách OmniRoute giải quyết vấn đề này:**

- MCP xuất hiện trong tab điều hướng bảng điều khiển và giao thức điểm cuối
- Trang quản lý MCP chuyên dụng với quy trình, công cụ, phạm vi và kiểm tra
- Tích hợp tính năng khởi động nhanh cho `omniroute --mcp` và quá trình cài đặt ứng dụng khách

</details>

<details>
<summary><b>🧠 18. "Tôi cần phối hợp A2A với đường dẫn tác vụ đồng bộ hóa + truyền phát"</b></summary>

Quy trình làm việc của tổng đài viên cần cả phản hồi trực tiếp và thực thi theo luồng trong thời gian dài với khả năng kiểm soát vòng đời.

**Cách OmniRoute giải quyết vấn đề này:**

- Điểm cuối JSON-RPC A2A (`POST /a2a`) với `message/send` và `message/stream`
- Truyền phát SSE với sự lan truyền trạng thái đầu cuối
- API vòng đời tác vụ cho `tasks/get` và `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Tôi cần tình trạng quy trình MCP thực sự, trạng thái không đoán được"</b></summary>

Các nhóm vận hành cần biết liệu MCP có thực sự tồn tại hay không, chứ không chỉ là liệu API có thể truy cập được hay không.

**Cách OmniRoute giải quyết vấn đề này:**

- Tệp nhịp tim thời gian chạy với PID, dấu thời gian, vận chuyển, số lượng công cụ và chế độ phạm vi
- API trạng thái MCP kết hợp nhịp tim + hoạt động gần đây
- Thẻ trạng thái giao diện người dùng về độ mới của quy trình/thời gian hoạt động/nhịp tim

</details>

<details>
<summary><b>📋 20. "Tôi cần thực thi công cụ MCP có thể kiểm tra được"</b></summary>

Khi các công cụ thay đổi cấu hình hoặc kích hoạt các hành động vận hành, các nhóm cần truy xuất nguồn gốc pháp lý.

**Cách OmniRoute giải quyết vấn đề này:**

- Ghi nhật ký kiểm tra được hỗ trợ bởi SQLite cho các lệnh gọi công cụ MCP
- Bộ lọc theo công cụ, thành công/thất bại, khóa API và phân trang
- Bảng kiểm tra bảng điều khiển + điểm cuối thống kê để tự động hóa

</details>

<details>
<summary><b>🔐 21. "Tôi cần quyền MCP trong phạm vi cho mỗi lần tích hợp"</b></summary>

Các khách hàng khác nhau phải có quyền truy cập ít đặc quyền nhất vào các danh mục công cụ.

**Cách OmniRoute giải quyết vấn đề này:**

- 9 phạm vi MCP chi tiết để truy cập công cụ được kiểm soát
- Thực thi phạm vi và khả năng hiển thị trong giao diện người dùng quản lý MCP
- Tư thế mặc định an toàn cho dụng cụ vận hành

</details>

<details>
<summary><b>⚙️ 22. "Tôi cần kiểm soát hoạt động mà không cần triển khai lại"</b></summary>

Các nhóm cần thay đổi thời gian chạy nhanh trong các sự cố hoặc sự kiện tốn kém.

**Cách OmniRoute giải quyết vấn đề này:**

- Chuyển đổi kích hoạt kết hợp trực tiếp từ bảng điều khiển MCP
- Áp dụng hồ sơ khả năng phục hồi từ các gói chính sách được xác định trước
- Đặt lại trạng thái ngắt mạch từ cùng bảng vận hành

</details>

<details>
<summary><b>🔄 23. "Tôi cần khả năng hiển thị và hủy trực tiếp trong vòng đời nhiệm vụ A2A"</b></summary>

Nếu không có khả năng hiển thị vòng đời, các sự cố trong nhiệm vụ sẽ khó phân loại.

**Cách OmniRoute giải quyết vấn đề này:**

- Liệt kê/lọc nhiệm vụ theo trạng thái/kỹ năng với phân trang
- Xem chi tiết về siêu dữ liệu, sự kiện và hiện vật của nhiệm vụ
- Điểm cuối hủy tác vụ và hành động UI có xác nhận

</details>

<details>
<summary><b>🌊 24. "Tôi cần số liệu luồng hoạt động cho tải A2A"</b></summary>

Luồng công việc phát trực tuyến yêu cầu hiểu biết sâu sắc về hoạt động đồng thời và kết nối trực tiếp.

**Cách OmniRoute giải quyết vấn đề này:**

- Bộ đếm luồng hoạt động được tích hợp vào trạng thái A2A
- Dấu thời gian nhiệm vụ cuối cùng và số lượng trên mỗi trạng thái
- Thẻ bảng điều khiển A2A để theo dõi hoạt động theo thời gian thực

</details>

<details>
<summary><b>🪪 25. "Tôi cần phát hiện đại lý tiêu chuẩn cho khách hàng"</b></summary>

Máy khách và người điều phối bên ngoài cần siêu dữ liệu có thể đọc được bằng máy để triển khai.

**Cách OmniRoute giải quyết vấn đề này:**

- Thẻ đại lý bị lộ tại `/.well-known/agent.json`
- Khả năng và kỹ năng thể hiện trong UI quản lý
- API trạng thái A2A bao gồm siêu dữ liệu khám phá để tự động hóa

</details>

<details>
<summary><b>🧭 26. "Tôi cần khả năng khám phá giao thức trong UX sản phẩm"</b></summary>

Nếu người dùng không thể khám phá các bề mặt giao thức, chất lượng chấp nhận và hỗ trợ sẽ giảm.

**Cách OmniRoute giải quyết vấn đề này:**

- Các mục thanh bên cho MCP và A2A
- Tab Giao thức của trang điểm cuối với trạng thái và khởi động nhanh
- Liên kết từ tổng quan đến bảng điều khiển quản lý chuyên dụng

</details>

<details>
<summary><b>🧪 27. "Tôi cần xác thực giao thức end-to-end với khách hàng thực"</b></summary>

Các thử nghiệm mô phỏng không đủ để xác thực tính tương thích của giao thức trước khi phát hành.

**Cách OmniRoute giải quyết vấn đề này:**

- Bộ E2E khởi động ứng dụng và sử dụng vận chuyển máy khách MCP SDK thực
- Máy khách A2A kiểm tra các luồng khám phá, gửi, truyền phát, nhận và hủy
- Kiểm tra chéo các xác nhận đối với kiểm tra MCP và API nhiệm vụ A2A

</details>

<details>
<summary><b>📡 28. "Tôi cần khả năng quan sát thống nhất trên tất cả các giao diện"</b></summary>

Việc phân chia khả năng quan sát theo giao thức sẽ tạo ra các điểm mù và MTTR dài hơn.

**Cách OmniRoute giải quyết vấn đề này:**

- Bảng điều khiển/nhật ký/phân tích thống nhất trong một sản phẩm
- Sức khỏe + kiểm toán + yêu cầu đo từ xa trên các lớp OpenAI, MCP và A2A
- API hoạt động cho trạng thái và tự động hóa

</details>

<details>
<summary><b>💼 29. "Tôi cần một thời gian chạy cho proxy + công cụ + điều phối tác nhân"</b></summary>

Việc chạy nhiều dịch vụ riêng biệt làm tăng chi phí vận hành và các chế độ lỗi.

**Cách OmniRoute giải quyết vấn đề này:**

- Proxy tương thích với OpenAI, máy chủ MCP và máy chủ A2A trong một ngăn xếp
- Chia sẻ xác thực, khả năng phục hồi, lưu trữ dữ liệu và khả năng quan sát
- Mô hình chính sách nhất quán trên tất cả các bề mặt tương tác

</details>

<details>
<summary><b>🚀 30. "Tôi cần gửi quy trình công việc tổng thể mà không cần sử dụng quá nhiều mã keo"</b></summary>

Các nhóm bị mất tốc độ khi kết hợp nhiều dịch vụ và tập lệnh đặc biệt.

**Cách OmniRoute giải quyết vấn đề này:**

- Chiến lược điểm cuối thống nhất cho khách hàng và đại lý
- Giao diện người dùng quản lý giao thức tích hợp và đường dẫn xác thực khói
- Nền tảng sẵn sàng sản xuất (bảo mật, ghi nhật ký, khả năng phục hồi, sao lưu)

</details>

### Sách hướng dẫn ví dụ (Trường hợp sử dụng tích hợp)

**Playbook A: Tối đa hóa đăng ký trả phí + dự phòng giá rẻ**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: Ngăn xếp mã hóa không tốn phí**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: chuỗi dự phòng luôn hoạt động 24/7**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: Tác nhân hoạt động với MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Bắt đầu nhanh

**1. Cài đặt trên toàn cầu:**

```bash
npm install -g omniroute
omniroute
```

🎉 Trang tổng quan mở lúc `http://localhost:20128`

| Lệnh                    | Mô tả                                   |
| ----------------------- | --------------------------------------- |
| `omniroute`             | Máy chủ khởi động (cổng mặc định 20128) |
| `omniroute --port 3000` | Sử dụng cổng tùy chỉnh                  |
| `omniroute --no-open`   | Không tự động mở trình duyệt            |
| `omniroute --help`      | Hiển thị trợ giúp                       |

**2. Kết nối nhà cung cấp MIỄN PHÍ:**

Bảng điều khiển → Nhà cung cấp → Kết nối **Mã Claude** hoặc **AntiGravity** → Đăng nhập OAuth → Xong!

**3. Sử dụng trong công cụ CLI của bạn:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**Chỉ vậy thôi!** Bắt đầu viết mã với các mô hình AI MIỄN PHÍ.

**Thay thế - chạy từ nguồn:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute có sẵn dưới dạng hình ảnh Docker công khai trên [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Chạy nhanh:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Với tệp môi trường:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Sử dụng Docker Compose:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| Hình ảnh                 | Gắn thẻ  | Kích thước | Mô tả                          |
| ------------------------ | -------- | ---------- | ------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB     | Bản phát hành ổn định mới nhất |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB     | Phiên bản hiện tại             |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 Sơ lược về giá

| Bậc             | Nhà cung cấp        | Chi phí                      | Đặt lại hạn ngạch     | Tốt nhất cho            |
| --------------- | ------------------- | ---------------------------- | --------------------- | ----------------------- |
| **💳 ĐĂNG KÝ**  | Mã Claude (Pro)     | $20/tháng                    | 5h + hàng tuần        | Đã đăng ký              |
|                 | Codex (Plus/Pro)    | $20-200/tháng                | 5h + hàng tuần        | Người dùng OpenAI       |
|                 | Song Tử CLI         | **MIỄN PHÍ**                 | 180K/tháng + 1K/ngày  | Mọi người!              |
|                 | Phi công phụ GitHub | $10-19/tháng                 | Hàng tháng            | Người dùng GitHub       |
| **🔑 KHÓA API** | NVIDIA NIM          | **MIỄN PHÍ** (1000 tín dụng) | Một lần               | Kiểm tra bậc miễn phí   |
|                 | DeepSeek            | Trả tiền cho mỗi lần sử dụng | Không có              | Giá/chất lượng tốt nhất |
|                 | Groq                | Cấp miễn phí + trả phí       | Tỷ lệ giới hạn        | Suy luận cực nhanh      |
|                 | xAI (Grok)          | Trả tiền cho mỗi lần sử dụng | Không có              | Mô hình Grok            |
|                 | Mistral             | Cấp miễn phí + trả phí       | Tỷ lệ giới hạn        | AI Châu Âu              |
|                 | OpenRouter          | Trả tiền cho mỗi lần sử dụng | Không có              | Hơn 100 mẫu             |
| **💰 RẺ**       | GLM-4.7             | 0,6 USD/1 triệu USD          | 10 giờ sáng hàng ngày | Dự phòng ngân sách      |
|                 | MiniMax M2.1        | 0,2 USD/1 triệu USD          | lăn 5 giờ             | Lựa chọn rẻ nhất        |
|                 | Kimi K2             | $9/tháng căn hộ              | 10 triệu token/tháng  | Chi phí dự đoán         |
| **🆓 MIỄN PHÍ** | iFlow               | $0                           | Không giới hạn        | 8 mẫu miễn phí          |
|                 | Qwen                | $0                           | Không giới hạn        | 3 mẫu miễn phí          |
|                 | Kiro                | $0                           | Không giới hạn        | Claude miễn phí         |

**💡 Mẹo chuyên nghiệp:** Bắt đầu với Gemini CLI (180K miễn phí/tháng) + combo iFlow (miễn phí không giới hạn) = chi phí $0!

---

## 💡 Tính năng chính

### 🧠 Định tuyến lõi & thông minh

| Tính năng                                     | Nó làm gì                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| 🎯 **Dự phòng 4 tầng thông minh**             | Tự động định tuyến: Đăng ký → Khóa API → Giá rẻ → Miễn phí                                |
| 📊 **Theo dõi hạn ngạch theo thời gian thực** | Số lượng mã thông báo trực tiếp + đếm ngược đặt lại cho mỗi nhà cung cấp                  |
| 🔄 **Dịch định dạng**                         | OpenAI ↔ Claude ↔ Gemini ↔ Con trỏ ↔ Kiro liền mạch + vệ sinh phản hồi                    |
| 👥 **Hỗ trợ nhiều tài khoản**                 | Nhiều tài khoản cho mỗi nhà cung cấp với lựa chọn thông minh                              |
| 🔄 **Tự động làm mới mã thông báo**           | Mã thông báo OAuth tự động làm mới bằng thử lại                                           |
| 🎨 **Combo tùy chỉnh**                        | 6 chiến lược: điền trước, quay vòng, p2c, ngẫu nhiên, ít sử dụng nhất, tối ưu hóa chi phí |
| 🧩 **Mẫu tùy chỉnh**                          | Thêm bất kỳ ID mẫu nào vào bất kỳ nhà cung cấp nào                                        |
| 🌐 **Bộ định tuyến ký tự đại diện**           | Định tuyến động các mẫu `provider/*` tới bất kỳ nhà cung cấp nào                          |
| 🧠 **Ngân sách suy nghĩ**                     | Các chế độ truyền qua, tự động, tùy chỉnh và thích ứng cho các mô hình lý luận            |
| 🔀 **Model Aliases**                          | Auto-forward deprecated model IDs to current replacements (built-in + custom)             |
| ⚡ **Background Degradation**                 | Auto-route background tasks (titles, summaries) to cheaper models                         |
| 💬 **Tiêm nhắc nhở hệ thống**                 | Lời nhắc hệ thống toàn cầu được áp dụng cho tất cả các yêu cầu                            |
| 📄 **API phản hồi**                           | Hỗ trợ đầy đủ API phản hồi OpenAI (`/v1/responses`) cho Codex                             |

### 🎵 API đa phương thức

| Tính năng                             | Nó làm gì                                                                                                                                                                  |
| ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Tạo hình ảnh**                   | `/v1/images/generations` — 4 nhà cung cấp, hơn 9 mô hình                                                                                                                   |
| 📐 **Nhúng**                          | `/v1/embeddings` — 6 nhà cung cấp, hơn 9 mô hình                                                                                                                           |
| 🎤 **Phiên âm âm thanh**              | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Chuyển văn bản thành giọng nói** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Kiểm duyệt**                     | `/v1/moderations` — Kiểm tra an toàn nội dung                                                                                                                              |
| 🔀 **Sắp xếp lại**                    | `/v1/rerank` — Sắp xếp lại mức độ liên quan của tài liệu                                                                                                                   |

### 🛡️ Khả năng phục hồi và bảo mật

| Tính năng                              | Nó làm gì                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| 🔌 **Ngắt mạch**                       | Tự động mở/đóng theo từng nhà cung cấp với các ngưỡng có thể định cấu hình             |
| 🛡️ **Bầy chống sấm sét**               | Mutex + giới hạn tốc độ semaphore cho nhà cung cấp khóa API                            |
| 🧠 **Bộ đệm ngữ nghĩa**                | Bộ đệm hai lớp (chữ ký + ngữ nghĩa) giảm chi phí và độ trễ                             |
| ⚡ **Yêu cầu quyền bình đẳng**         | Khoảng thời gian loại trừ 5 giây đối với các yêu cầu trùng lặp                         |
| 🔒 **Giả mạo vân tay TLS**             | Bỏ qua việc phát hiện bot dựa trên TLS thông qua wreq-js                               |
| 🌐 **Lọc IP**                          | Danh sách cho phép/danh sách chặn để kiểm soát truy cập API                            |
| 📊 **Giới hạn tỷ lệ có thể chỉnh sửa** | RPM có thể định cấu hình, khoảng cách tối thiểu và đồng thời tối đa ở cấp hệ thống     |
| 💾 **Rate Limit Persistence**          | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness           |
| 🔄 **Token Refresh Resilience**        | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt                 |
| 🛡 **Bảo vệ điểm cuối API**            | Kiểm soát xác thực + chặn nhà cung cấp cho điểm cuối `/models`                         |
| 🔒 **Khả năng hiển thị proxy**         | Huy hiệu được mã hóa màu: 🟢 toàn cầu, 🟡 nhà cung cấp, 🔵 mỗi kết nối với màn hình IP |
| 🌐 **Cấu hình proxy 3 cấp**            | Định cấu hình proxy ở cấp độ toàn cầu, theo nhà cung cấp hoặc theo từng kết nối        |

### 📊 Khả năng quan sát & phân tích

| Tính năng                                | Nó làm gì                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------- |
| 📝 **Yêu cầu ghi nhật ký**               | Chế độ gỡ lỗi với nhật ký yêu cầu/phản hồi đầy đủ                                             |
| 💾 **Nhật ký proxy SQLite**              | Nhật ký proxy liên tục vẫn tồn tại khi khởi động lại máy chủ                                  |
| 📊 **Bảng thông tin phân tích**          | Recharts-Powered: thẻ thống kê, biểu đồ sử dụng mô hình, bảng nhà cung cấp                    |
| 📈 **Theo dõi tiến độ**                  | Chọn tham gia các sự kiện tiến trình SSE để phát trực tuyến                                   |
| 🧪 **Đánh giá LLM**                      | Thử nghiệm set vàng với 4 chiến thuật trận đấu                                                |
| 🔍 **Yêu cầu đo từ xa**                  | tổng hợp độ trễ p50/p95/p99 + theo dõi X-Request-Id                                           |
| 📋 **Bảng điều khiển nhật ký**           | Trang 4 tab hợp nhất: Nhật ký yêu cầu, Nhật ký proxy, Nhật ký kiểm tra, Bảng điều khiển       |
| 🖥️ **Trình xem nhật ký bảng điều khiển** | Trình xem kiểu thiết bị đầu cuối thời gian thực với bộ lọc cấp độ, tìm kiếm, tự động cuộn     |
| 📑 **Ghi nhật ký dựa trên tệp**          | Trình chặn chặn của bảng điều khiển ghi lại tất cả đầu ra vào tệp nhật ký JSON bằng cách xoay |
| 🏥 **Bảng thông tin sức khỏe**           | Thời gian hoạt động của hệ thống, trạng thái ngắt mạch, khóa, số liệu thống kê bộ đệm         |
| 💰 **Theo dõi chi phí**                  | Quản lý ngân sách + cấu hình giá theo từng mô hình                                            |

### ☁️ Triển khai & đồng bộ

| Tính năng                          | Nó làm gì                                                                               |
| ---------------------------------- | --------------------------------------------------------------------------------------- |
| 💾 **Đồng bộ đám mây**             | Đồng bộ hóa cấu hình trên các thiết bị thông qua Cloudflare Workers                     |
| 🌐 **Triển khai mọi nơi**          | Localhost, VPS, Docker, Công nhân Cloudflare                                            |
| 🔑 **Quản lý khóa API**            | Tạo, xoay vòng và phạm vi khóa API cho mỗi nhà cung cấp                                 |
| 🧙 **Trình hướng dẫn giới thiệu**  | Thiết lập có hướng dẫn 4 bước cho người dùng lần đầu                                    |
| 🔧 **Bảng điều khiển công cụ CLI** | Định cấu hình bằng một cú nhấp chuột Claude, Codex, Cline, OpenClaw, Kilo, AntiGravity  |
| 🔄 **Sao lưu DB**                  | Tự động sao lưu, khôi phục, xuất và nhập cho tất cả cài đặt                             |
| 🌐 **Quốc tế hóa**                 | I18n đầy đủ với hỗ trợ next-intl — Tiếng Anh + Tiếng Bồ Đào Nha (Brazil)                |
| 🌍 **Bộ chọn ngôn ngữ**            | Biểu tượng quả địa cầu trong tiêu đề để chuyển đổi ngôn ngữ theo thời gian thực (🇺🇸/🇧🇷) |
| 📂 **Thư mục dữ liệu tùy chỉnh**   | `DATA_DIR` env var để ghi đè đường dẫn lưu trữ `~/.omniroute` mặc định                  |

<details>
<summary><b>📖 Chi tiết tính năng</b></summary>

### 🎯 Dự phòng 4 tầng thông minh

Tạo combo với dự phòng tự động:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 Theo dõi hạn ngạch theo thời gian thực

- Tiêu thụ mã thông báo trên mỗi nhà cung cấp
- Đặt lại đếm ngược (5 giờ, hàng ngày, hàng tuần)
- Ước tính chi phí cho các bậc trả phí
- Báo cáo chi tiêu hàng tháng

### 🔄 Dịch định dạng

Dịch liền mạch giữa các định dạng:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **Phản hồi của OpenAI**
- Công cụ CLI của bạn gửi định dạng OpenAI → OmniRoute dịch → Nhà cung cấp nhận định dạng gốc
- Hoạt động với mọi công cụ hỗ trợ điểm cuối OpenAI tùy chỉnh
- **Sạch hóa phản hồi** — Loại bỏ các trường không chuẩn để tương thích nghiêm ngặt với OpenAI SDK
- **Chuẩn hóa vai trò** — `developer` → `system` đối với non-OpenAI; `system` → `user` dành cho kiểu máy GLM/ERNIE
- **Trích xuất thẻ suy nghĩ** — `<think>` khối → `reasoning_content` cho các mô hình tư duy
- **Đầu ra có cấu trúc** — `json_schema` → `responseMimeType`/`responseSchema` của Gemini

### 👥 Hỗ trợ nhiều tài khoản

- Thêm nhiều tài khoản cho mỗi nhà cung cấp
- Tự động định tuyến vòng tròn hoặc dựa trên mức độ ưu tiên
- Dự phòng tài khoản tiếp theo khi đạt hạn ngạch

### 🔄 Tự động làm mới mã thông báo

- Mã thông báo OAuth tự động làm mới trước khi hết hạn
- Không cần xác thực lại thủ công
- Trải nghiệm liền mạch trên tất cả các nhà cung cấp

### 🎨 Combo tùy chỉnh

- Tạo kết hợp mô hình không giới hạn
- 6 chiến lược: điền trước, quay vòng, sức mạnh của hai lựa chọn, ngẫu nhiên, ít sử dụng nhất, tối ưu hóa chi phí
- Chia sẻ combo trên các thiết bị với Cloud Sync

### 🏥 Bảng thông tin sức khỏe

- Trạng thái hệ thống (thời gian hoạt động, phiên bản, mức sử dụng bộ nhớ)
- Trạng thái ngắt mạch của mỗi nhà cung cấp (Đóng/Mở/Nửa mở)
- Trạng thái giới hạn tỷ lệ và khóa hoạt động
- Thống kê bộ đệm chữ ký
- Đo từ xa độ trễ (p50/p95/p99) + bộ đệm nhắc nhở
- Đặt lại tình trạng sức khỏe chỉ bằng một cú nhấp chuột

### 🔧 Sân chơi dịch thuật

OmniRoute bao gồm Sân chơi dịch thuật tích hợp mạnh mẽ với **4 chế độ** để gỡ lỗi, kiểm tra và giám sát các bản dịch API:

| Chế độ                           | Mô tả                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻Sân chơi**                   | Dịch định dạng trực tiếp - dán bất kỳ nội dung yêu cầu API nào và xem ngay cách OmniRoute dịch nó giữa các định dạng nhà cung cấp (OpenAI ↔ Claude ↔ Gemini ↔ API phản hồi). Bao gồm các mẫu ví dụ và tự động phát hiện định dạng. |
| **💬 Trình kiểm tra trò chuyện** | Gửi các yêu cầu trò chuyện thực tế thông qua OmniRoute và xem toàn bộ hành trình: thông tin đầu vào của bạn, yêu cầu được dịch, phản hồi của nhà cung cấp và phản hồi được dịch lại. Vô giá để xác nhận định tuyến kết hợp.        |
| **🧪 Ghế thử nghiệm**            | Chế độ thử nghiệm hàng loạt - xác định nhiều trường hợp thử nghiệm với đầu vào và đầu ra dự kiến ​​khác nhau, chạy tất cả chúng cùng một lúc và so sánh kết quả giữa các nhà cung cấp và mô hình.                                  |
| **📱 Giám sát trực tiếp**        | Giám sát yêu cầu theo thời gian thực — xem các yêu cầu đến khi chúng truyền qua OmniRoute, xem các bản dịch định dạng đang diễn ra trực tiếp và xác định các vấn đề ngay lập tức.                                                  |

**Truy cập:** Bảng điều khiển → Trình dịch (thanh bên)

### 💾 Đồng bộ đám mây

- Đồng bộ hóa nhà cung cấp, combo và cài đặt trên các thiết bị
- Đồng bộ nền tự động
- Lưu trữ được mã hóa an toàn

</details>

## 🧪 Đánh giá (Evals)

OmniRoute bao gồm khung đánh giá tích hợp để kiểm tra chất lượng phản hồi LLM dựa trên bộ vàng. Truy cập thông qua **Analytics → Đánh giá** trong bảng điều khiển.

### Bộ vàng tích hợp

"Bộ vàng OmniRoute" được tải sẵn chứa 10 trường hợp thử nghiệm bao gồm:

- Lời chào, toán, địa lý, tạo mã
- Tuân thủ định dạng JSON, dịch thuật, đánh dấu
- Từ chối an toàn (nội dung có hại), đếm, logic boolean

### Chiến lược đánh giá

| Chiến lược | Mô tả                                                           | Ví dụ                            |
| ---------- | --------------------------------------------------------------- | -------------------------------- |
| `exact`    | Đầu ra phải khớp chính xác                                      | `"4"`                            |
| `contains` | Đầu ra phải chứa chuỗi con (không phân biệt chữ hoa chữ thường) | `"Paris"`                        |
| `regex`    | Đầu ra phải khớp với mẫu biểu thức chính quy                    | `"1.*2.*3"`                      |
| `custom`   | Hàm JS tùy chỉnh trả về true/false                              | `(output) => output.length > 10` |

---

## 📖 Hướng dẫn thiết lập

<details>
<summary><b>💳 Nhà cung cấp đăng ký</b></summary>

### Mã Claude (Pro/Max)

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

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (MIỄN PHÍ 180K/tháng!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Giá trị tốt nhất:** Cấp miễn phí rất lớn! Sử dụng điều này trước các bậc trả phí.

### Phi công phụ GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Nhà cung cấp khóa API</b></summary>

### NVIDIA NIM (1000 tín dụng MIỄN PHÍ!)

1. Đăng ký: [build.nvidia.com](https://build.nvidia.com)
2. Nhận khóa API miễn phí (bao gồm 1000 tín dụng suy luận)
3. Bảng điều khiển → Thêm nhà cung cấp → NVIDIA NIM:
   - Khóa API: `nvapi-your-key`

**Mẫu máy:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` và hơn 50 mẫu khác

**Mẹo chuyên nghiệp:** API tương thích với OpenAI — hoạt động trơn tru với tính năng dịch định dạng của OmniRoute!

### Tìm kiếm sâu

1. Đăng ký: [platform.deepseek.com](https://platform.deepseek.com)
2. Nhận khóa API
3. Trang tổng quan → Thêm nhà cung cấp → DeepSeek

**Mẫu xe:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (Có sẵn bậc miễn phí!)

1. Đăng ký: [console.groq.com](https://console.groq.com)
2. Nhận khóa API (bao gồm bậc miễn phí)
3. Bảng điều khiển → Thêm nhà cung cấp → Groq

**Mẫu xe:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Mẹo chuyên nghiệp:** Suy luận cực nhanh — tốt nhất cho mã hóa thời gian thực!

### OpenRouter (Hơn 100 mẫu)

1. Sign up: [openrouter.ai](https://openrouter.ai)
2. Nhận khóa API
3. Bảng điều khiển → Thêm nhà cung cấp → OpenRouter

**Mô hình:** Truy cập hơn 100 mô hình từ tất cả các nhà cung cấp chính thông qua một khóa API duy nhất.

</details>

<details>
<summary><b>💰 Nhà cung cấp giá rẻ (Dự phòng)</b></summary>

### GLM-4.7 (Đặt lại hàng ngày, 0,6 USD/1 triệu)

1. Đăng ký: [Zhipu AI](https://open.bigmodel.cn/)
2. Nhận khóa API từ Gói mã hóa
3. Bảng điều khiển → Thêm khóa API:
   - Nhà cung cấp: `glm`
   - Khóa API: `your-key`

**Sử dụng:** `glm/glm-4.7`

**Mẹo chuyên nghiệp:** Gói mã hóa cung cấp hạn ngạch 3× với chi phí 1/7! Đặt lại vào 10:00 sáng hàng ngày.

### MiniMax M2.1 (đặt lại 5 giờ, 0,20 USD/1M)

1. Đăng ký: [MiniMax](https://www.minimax.io/)
2. Nhận khóa API
3. Bảng điều khiển → Thêm khóa API

**Sử dụng:** `minimax/MiniMax-M2.1`

**Mẹo chuyên nghiệp:** Tùy chọn rẻ nhất cho ngữ cảnh dài (1 triệu mã thông báo)!

### Kimi K2 ($9/tháng cố định)

1. Đăng ký: [Moonshot AI](https://platform.moonshot.ai/)
2. Nhận khóa API
3. Bảng điều khiển → Thêm khóa API

**Sử dụng:** `kimi/kimi-latest`

**Mẹo chuyên nghiệp:** Đã sửa lỗi 9 USD/tháng cho 10 triệu mã thông báo = 0,90 USD/1 triệu chi phí hiệu quả!

</details>

<details>
<summary><b>🆓 Nhà cung cấp MIỄN PHÍ (Dự phòng khẩn cấp)</b></summary>

### iFlow (8 mẫu MIỄN PHÍ)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 mẫu MIỄN PHÍ)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude MIỄN PHÍ)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Tạo Combo</b></summary>

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

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>🔧 Tích hợp CLI</b></summary>

### IDE con trỏ

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### Mã Claude

Sử dụng trang **Công cụ CLI** trong trang tổng quan để định cấu hình bằng một cú nhấp chuột hoặc chỉnh sửa `~/.claude/settings.json` theo cách thủ công.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Tùy chọn 1 — Trang tổng quan (được khuyến nghị):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**Tùy chọn 2 — Thủ công:** Chỉnh sửa `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Lưu ý:** OpenClaw chỉ hoạt động với OmniRoute cục bộ. Sử dụng `127.0.0.1` thay vì `localhost` để tránh các vấn đề về độ phân giải IPv6.

### Cline / Tiếp tục / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Khắc phục sự cố

<details>
<summary><b>Nhấp để mở rộng hướng dẫn khắc phục sự cố</b></summary>

**"Mô hình ngôn ngữ không cung cấp tin nhắn"**

- Đã hết hạn ngạch nhà cung cấp → Kiểm tra trình theo dõi hạn ngạch bảng điều khiển
- Giải pháp: Sử dụng combo dự phòng hoặc chuyển sang tầng rẻ hơn

**Giới hạn tỷ lệ**

- Hết hạn ngạch đăng ký → Dự phòng sang GLM/MiniMax
- Thêm tổ hợp: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Mã thông báo OAuth đã hết hạn**

- Tự động làm mới bởi OmniRoute
- Nếu sự cố vẫn tiếp diễn: Bảng điều khiển → Nhà cung cấp → Kết nối lại

**Chi phí cao**

- Kiểm tra số liệu thống kê sử dụng trong Bảng điều khiển → Chi phí
- Chuyển mô hình chính sang GLM/MiniMax
- Sử dụng bậc miễn phí (Gemini CLI, iFlow) cho các tác vụ không quan trọng

**Bảng điều khiển mở sai cổng**

- Đặt `PORT=20128` và `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Lỗi đồng bộ hóa đám mây**

- Xác minh `BASE_URL` trỏ tới phiên bản đang chạy của bạn
- Xác minh `CLOUD_URL` điểm tới điểm cuối đám mây dự kiến của bạn
- Giữ các giá trị `NEXT_PUBLIC_*` được căn chỉnh với các giá trị phía máy chủ

**Đăng nhập lần đầu không hoạt động**

- Kiểm tra `INITIAL_PASSWORD` trong `.env`
- Nếu không được đặt, mật khẩu dự phòng là `123456`

**Không có nhật ký yêu cầu**

- Đặt `ENABLE_REQUEST_LOGS=true` trong `.env`

**Kiểm tra kết nối cho thấy "Không hợp lệ" đối với các nhà cung cấp tương thích với OpenAI**

- Nhiều nhà cung cấp không hiển thị điểm cuối `/models`
- OmniRoute v1.0.6+ bao gồm xác thực dự phòng thông qua hoàn thành trò chuyện
- Đảm bảo URL cơ sở bao gồm hậu tố `/v1`

### 🔐 OAuth

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ QUAN TRỌNG đối với người sử dụng OmniRoute trên VPS/Docker/servidor remoto**

### OAuth

Os đã được chứng minh **AntiGravity** e **Gemini CLI** sử dụng **Google OAuth 2.0** để xác thực. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** một trong các URI trước khi lập danh sách trên Google Cloud Console để ứng dụng.

Vì các thông tin xác thực OAuth không có OmniRoute estão cadastradas **apenas para `localhost`**. Bạn có thể truy cập OmniRoute bằng cách điều khiển lại máy chủ (ví dụ: `https://omniroute.meuservidor.com`), hoặc Google sẽ cung cấp thông tin xác thực với:

```
Error 400: redirect_uri_mismatch
```

### Giải pháp: Định cấu hình thông tin đăng nhập OAuth

Bạn nên chú ý **OAuth 2.0 Client ID** không có Google Cloud Console vì URI làm dịch vụ của bạn.

#### Vượt qua một lần nữa

**1. Truy cập vào Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Hãy yêu cầu ID khách hàng OAuth 2.0 mới**

- Nhấn vào **"+ Tạo thông tin xác thực"** → **"ID khách hàng OAuth"**
- Mẹo ứng dụng: **"Ứng dụng web"**
- Tên: escolha qualquer nome (ví dụ: `OmniRoute Remote`)

**3. Adicione dưới dạng URI chuyển hướng được ủy quyền**

Không có quảng cáo **"URI chuyển hướng được ủy quyền"**, khuyến cáo:

```
https://seu-servidor.com/callback
```

> Thay thế `seu-servidor.com` từ địa chỉ IP hoặc dịch vụ IP của bạn (bao gồm một cổng cần thiết, ví dụ: `http://45.33.32.156:20128/callback`).

**4. Lưu và sao chép dưới dạng uy tín**

Sau đó, Google đã đăng trên **ID khách hàng** và **Bí mật khách hàng**.

**5. Định cấu hình theo các biến thể của môi trường**

Không có `.env` (hoặc có nhiều biến thể môi trường xung quanh Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. Reinicie hoặc OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. Lều kết nối mới lạ**

Bảng điều khiển → Nhà cung cấp → Anti Gravity (hoặc Gemini CLI) → OAuth

Google đã chuyển hướng điều chỉnh cho `https://seu-servidor.com/callback` và một chức năng xác thực.

---

### Thời gian giải quyết (sem configurar credenciais próprias)

Nếu không có câu hỏi nào về thông tin xác thực trước đây, bạn có thể sử dụng thông tin **hướng dẫn sử dụng URL**:

1. O OmniRoute tìm kiếm URL tự động của Google
2. Sau khi bạn tự động đăng ký, hoặc chuyển hướng Google sang `localhost` (bạn không thể điều chỉnh lại dịch vụ)
3. **Sao chép một URL hoàn chỉnh** da cuối cùng của trình duyệt của bạn (mesmo que a página not carregue)
4. URL này không có khả năng xuất hiện không có phương thức kết nối nào với OmniRoute
5. Kết nối với nhau **"Kết nối"**

> Chức năng giải pháp này có thể giúp tự động cấp quyền cho URL và có thể chuyển hướng độc lập đến mục tiêu hoặc không.

</details>

---

## 🛠️

- **Thời gian chạy**: Node.js 18–22 LTS (⚠️ Node.js 24+ **không được hỗ trợ** — `better-sqlite3` các tệp nhị phân gốc không tương thích)
- **Ngôn ngữ**: TypeScript 5.9 — **100% TypeScript** trên `src/` và `open-sse/` (v1.0.6)
- **Khung**: Next.js 16 + React 19 + Tailwind CSS 4
- **Cơ sở dữ liệu**: LowDB (JSON) + SQLite (trạng thái miền + nhật ký proxy)
- **Truyền phát**: Sự kiện do máy chủ gửi (SSE)
- **Xác thực**: OAuth 2.0 (PKCE) + JWT + Khóa API
- **Thử nghiệm**: Trình chạy thử nghiệm Node.js (hơn 368 bài kiểm tra đơn vị)
- **CI/CD**: GitHub Actions (tự động xuất bản npm + Docker Hub khi phát hành)
- **Trang web**: [omniroute.online](https://omniroute.online)
- **Gói**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Khả năng phục hồi**: Ngắt mạch, lùi theo cấp số nhân, chống sét bầy đàn, giả mạo TLS

---

## 📖 Tài liệu

| Tài liệu                                     | Mô tả                                                     |
| -------------------------------------------- | --------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | Nhà cung cấp, combo, tích hợp CLI, triển khai             |
| [API Reference](docs/API_REFERENCE.md)       | Tất cả các điểm cuối có ví dụ                             |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | Các vấn đề thường gặp và giải pháp                        |
| [Architecture](docs/ARCHITECTURE.md)         | Kiến trúc hệ thống và nội bộ                              |
| [Contributing](CONTRIBUTING.md)              | Thiết lập và hướng dẫn phát triển                         |
| [OpenAPI Spec](docs/openapi.yaml)            | Đặc tả OpenAPI 3.0                                        |
| [Security Policy](SECURITY.md)               | Báo cáo lỗ hổng bảo mật và thực hành bảo mật              |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | Hướng dẫn đầy đủ: Thiết lập VM + nginx + Cloudflare       |
| [Features Gallery](docs/FEATURES.md)         | Tham quan bảng điều khiển trực quan với ảnh chụp màn hình |

### 📸 Xem trước bảng điều khiển

<details>
<summary><b>Nhấp để xem ảnh chụp màn hình trang tổng quan</b></summary>

| Trang               | Ảnh chụp màn hình                                 |
| ------------------- | ------------------------------------------------- |
| **Nhà cung cấp**    | ![Providers](docs/screenshots/01-providers.png)   |
| **Combo**           | ![Combos](docs/screenshots/02-combos.png)         |
| **Phân tích**       | ![Analytics](docs/screenshots/03-analytics.png)   |
| **Sức khỏe**        | ![Health](docs/screenshots/04-health.png)         |
| **Người dịch**      | ![Translator](docs/screenshots/05-translator.png) |
| **Cài đặt**         | ![Settings](docs/screenshots/06-settings.png)     |
| **Công cụ CLI**     | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **Nhật ký sử dụng** | ![Usage](docs/screenshots/08-usage.png)           |
| **Điểm cuối**       | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute có **210+ tính năng được lên kế hoạch** qua nhiều giai đoạn phát triển. Dưới đây là các lĩnh vực chính:

| Danh mục                       | Tính năng dự kiến ​​ | Điểm nổi bật                                                                                                   |
| ------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| 🧠 **Định tuyến & thông minh** | 25+                  | Định tuyến có độ trễ thấp nhất, định tuyến dựa trên thẻ, ưu tiên hạn ngạch, chọn tài khoản P2C                 |
| 🔒 **Bảo mật & Tuân thủ**      | 20+                  | Tăng cường SSRF, che giấu thông tin xác thực, giới hạn tốc độ cho mỗi điểm cuối, phạm vi khóa quản lý          |
| 📊 **Khả năng quan sát**       | 15+                  | Tích hợp OpenTelemetry, giám sát hạn ngạch thời gian thực, theo dõi chi phí trên mỗi mô hình                   |
| 🔄 **Tích hợp nhà cung cấp**   | 20+                  | Đăng ký mô hình động, thời gian hồi chiêu của nhà cung cấp, Codex nhiều tài khoản, phân tích hạn ngạch Copilot |
| ⚡ **Hiệu suất**               | 15+                  | Lớp bộ đệm kép, bộ đệm nhắc nhở, bộ đệm phản hồi, lưu giữ luồng, API hàng loạt                                 |
| 🌐 **Hệ sinh thái**            | 10+                  | API WebSocket, cấu hình tải lại nóng, kho cấu hình phân tán, chế độ thương mại                                 |

### 🔜 Sắp ra mắt

- 🔗 **Tích hợp OpenCode** — Hỗ trợ của nhà cung cấp gốc cho IDE mã hóa OpenCode AI
- 🔗 **Tích hợp TRAE** — Hỗ trợ đầy đủ cho khung phát triển TRAE AI
- 📦 **Batch API** — Xử lý hàng loạt không đồng bộ cho các yêu cầu hàng loạt
- 🎯 **Định tuyến dựa trên thẻ** — Định tuyến các yêu cầu dựa trên thẻ và siêu dữ liệu tùy chỉnh
- 💰 **Chiến lược chi phí thấp nhất** — Tự động chọn nhà cung cấp có sẵn rẻ nhất

> 📝 Thông số kỹ thuật đầy đủ tính năng có sẵn trong [link](docs/new-features/) (217 thông số kỹ thuật chi tiết)

---

## 👥 Người đóng góp

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Cách đóng góp

1. Phân nhánh kho lưu trữ
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/amazing-feature`)
3. Cam kết thay đổi của bạn (`git commit -m 'Add amazing feature'`)
4. Đẩy vào nhánh (`git push origin feature/amazing-feature`)
5. Mở yêu cầu kéo

Xem [CONTRIBUTING.md](CONTRIBUTING.md) để biết hướng dẫn chi tiết.

### Phát hành phiên bản mới

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Lịch sử ngôi sao

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Lời cảm ơn

Đặc biệt cảm ơn **[9router](https://github.com/decolua/9router)** của **[decolua](https://github.com/decolua)** — dự án ban đầu đã truyền cảm hứng cho đợt phân nhánh này. OmniRoute được xây dựng dựa trên nền tảng đáng kinh ngạc đó với các tính năng bổ sung, API đa phương thức và viết lại TypeScript đầy đủ.

Đặc biệt cảm ơn **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — cách triển khai Go ban đầu đã truyền cảm hứng cho cổng JavaScript này.

---

## 📄 Giấy phép

Giấy phép MIT - xem [LICENSE](LICENSE) để biết chi tiết.

---

<div align="center">
  <sub>Được xây dựng với ❤️ dành cho nhà phát triển viết mã 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
