# 🚀 OmniRoute — Cổng AI miễn phí

### Không bao giờ ngừng viết mã. Định tuyến thông minh tới **Mô hình AI MIỄN PHÍ và chi phí thấp** với tính năng dự phòng tự động.

_Proxy API phổ quát của bạn — một điểm cuối, hơn 67 nhà cung cấp, không có thời gian ngừng hoạt động. Hiện có sự điều phối đại lý **MCP & A2A**._

**Hoàn thành cuộc trò chuyện • Nhúng · Tạo hình ảnh · Video · Âm nhạc · Âm thanh · Sắp xếp lại · **Tìm kiếm trên web** · Máy chủ MCP · Giao thức A2A · 100% TypeScript**

---

<div align="center">

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![npm downloads](https://img.shields.io/npm/dm/omniroute?color=cb3837&logo=npm&label=npm%20downloads)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![Docker Pulls](https://img.shields.io/docker/pulls/diegosouzapw/omniroute?logo=docker&color=2496ED&label=docker%20pulls)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

</div>

🌐 **Có sẵn tại:** 🇺🇸 [English](README.md) | 🇧🇷 [Português (Brasil)](docs/i18n/pt-BR/README.md) | 🇪🇸 [Español](docs/i18n/es/README.md) | 🇫🇷 [Français](docs/i18n/fr/README.md) | 🇮🇹 [Italiano](docs/i18n/it/README.md) | 🇷🇺 [Русский](docs/i18n/ru/README.md) | 🇨🇳 [中文 (简体)](docs/i18n/zh-CN/README.md) | 🇩🇪 [Deutsch](docs/i18n/de/README.md) | 🇮🇳 [हिन्दी](docs/i18n/in/README.md) | 🇹🇭 [ไทย](docs/i18n/th/README.md) | 🇺🇦 [Українська](docs/i18n/uk-UA/README.md) | 🇸🇦 [العربية](docs/i18n/ar/README.md) | 🇯🇵 [日本語](docs/i18n/ja/README.md) | 🇻🇳 [Tiếng Việt](docs/i18n/vi/README.md) | 🇧🇬 [Български](docs/i18n/bg/README.md) | 🇩🇰 [Dansk](docs/i18n/da/README.md) | 🇫🇮 [Suomi](docs/i18n/fi/README.md) | 🇮🇱 [עברית](docs/i18n/he/README.md) | 🇭🇺 [Magyar](docs/i18n/hu/README.md) | 🇮🇩 [Bahasa Indonesia](docs/i18n/id/README.md) | 🇰🇷 [한국어](docs/i18n/ko/README.md) | 🇲🇾 [Bahasa Melayu](docs/i18n/ms/README.md) | 🇳🇱 [Nederlands](docs/i18n/nl/README.md) | 🇳🇴 [Norsk](docs/i18n/no/README.md) | 🇵🇹 [Português (Portugal)](docs/i18n/pt/README.md) | 🇷🇴 [Română](docs/i18n/ro/README.md) | 🇵🇱 [Polski](docs/i18n/pl/README.md) | 🇸🇰 [Slovenčina](docs/i18n/sk/README.md) | 🇸🇪 [Svenska](docs/i18n/sv/README.md) | 🇵🇭 [Filipino](docs/i18n/phi/README.md) | 🇨🇿 [Čeština](docs/i18n/cs/README.md)

---

## 🆕 Có gì mới trong v3.0.0

> **Nâng cấp từ v2.9.5?** — Xem [full CHANGELOG](CHANGELOG.md#300--2026-03-22-release-candidate--not-yet-merged-to-main) để biết tất cả các thay đổi.

| Khu vực                            | Thay đổi                                                                                                                                                                                      |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🔒 **Bảo mật CodeQL**              | Đã sửa hơn 10 cảnh báo CodeQL: đa thức-redos, không an toàn-ngẫu nhiên, khắc phục bằng cách tiêm shell                                                                                        |
| ✅ **Xác thực lộ trình**           | Tất cả 176 tuyến API hiện đã được xác thực bằng lược đồ Zod + `validateBody()` — CI `check:route-validation:t06` vượt qua                                                                     |
| 🐛 **Rò rỉ thẻ omniModel**         | Thẻ `<omniModel>` nội bộ không còn bị rò rỉ tới máy khách trong phản hồi phát trực tuyến SSE (#585)                                                                                           |
| 🔑 **API khóa đã đăng ký**         | Tự động cung cấp khóa API thông qua `POST /api/v1/registered-keys` với việc thực thi hạn ngạch cho mỗi nhà cung cấp/tài khoản, tính tạm thời, bộ nhớ SHA-256 và báo cáo sự cố GitHub tùy chọn |
| 🎨 **Biểu tượng nhà cung cấp**     | Hơn 130 logo nhà cung cấp thông qua `@lobehub/icons` (SVG) với PNG → chuỗi dự phòng chung                                                                                                     |
| 🔄 **Tự động đồng bộ hóa mô hình** | Bộ lập lịch 24 giờ và chuyển đổi giao diện người dùng thủ công để đồng bộ hóa danh sách mô hình cho các nhà cung cấp tương thích OpenAI tích hợp và tùy chỉnh                                 |
| 🌐 **OpenCode Zen/Go**             | Hai nhà cung cấp mới từ @kang-heewon qua PR #530: bậc miễn phí + bậc đăng ký qua `OpencodeExecutor`                                                                                           |
| 🐛 **Gemini CLI OAuth**            | Lỗi có thể xử lý được khi thiếu `GEMINI_OAUTH_CLIENT_SECRET` trong Docker (là lỗi khó hiểu của Google)                                                                                        |
| 🐛 **Cấu hình OpenCode**           | `saveOpenCodeConfig()` hiện ghi TOML chính xác vào `XDG_CONFIG_HOME`                                                                                                                          |
| 🐛 **Ghi đè mô hình đã ghim**      | `body.model` được đặt chính xác thành `pinnedModel` về bảo vệ bộ nhớ đệm theo ngữ cảnh                                                                                                        |
| 🐛 **Vòng lặp Codex/Claude**       | Các khối `tool_result` hiện đã được chuyển đổi thành văn bản để dừng các vòng lặp vô hạn                                                                                                      |
| 🐛 **Chuyển hướng đăng nhập**      | Đăng nhập không còn bị treo sau khi bỏ qua thiết lập mật khẩu                                                                                                                                 |
| 🐛 **Đường dẫn Windows**           | Đường dẫn MSYS2/Git-Bash (`/c/...`) được chuẩn hóa tự động thành `C:\...`                                                                                                                     |

---

## 🖼️ Bảng điều khiển chính

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
</div>

---

## 📸 Xem trước bảng điều khiển

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
| **Điểm cuối**       | ![Endpoints](docs/screenshots/09-endpoint.png)    |

</details>

---

### 🤖 Nhà cung cấp AI miễn phí cho các tác nhân mã hóa yêu thích của bạn

_Kết nối mọi công cụ IDE hoặc CLI được hỗ trợ bởi AI thông qua OmniRoute — cổng API miễn phí để mã hóa không giới hạn._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/openclaw/openclaw">
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
- ✅ **Universal** - Hoạt động với Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, bất kỳ công cụ CLI nào

---

## 📧 Hỗ trợ

> 💬 **Tham gia cộng đồng của chúng tôi!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Nhận trợ giúp, chia sẻ mẹo và luôn cập nhật.

- **Trang web**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Vấn đề**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Đóng góp**: Xem [CONTRIBUTING.md](CONTRIBUTING.md), mở PR hoặc chọn `good first issue`
- **Dự án gốc**: [9router by decolua](https://github.com/decolua/9router)

### 🐛 Báo cáo lỗi?

Khi mở một vấn đề, vui lòng chạy lệnh system-info và đính kèm tệp được tạo:

```bash
npm run system-info
```

Điều này tạo ra `system-info.txt` với phiên bản Node.js, phiên bản OmniRoute, chi tiết hệ điều hành, các công cụ CLI đã cài đặt (iflow, gemini, claude, codex, antiGravity, droid, v.v.), trạng thái Docker/PM2 và các gói hệ thống — mọi thứ chúng tôi cần để tái tạo vấn đề của bạn một cách nhanh chóng. Đính kèm tệp trực tiếp vào vấn đề GitHub của bạn.

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

- **Điểm cuối hợp nhất** — Một `http://localhost:20128/v1` duy nhất đóng vai trò là proxy cho tất cả hơn 67 nhà cung cấp
- **Dịch định dạng** — Tự động và minh bạch: OpenAI ↔ Claude ↔ Gemini ↔ API phản hồi
- **Sạch hóa phản hồi** — Loại bỏ các trường không chuẩn (`x_groq`, `usage_breakdown`, `service_tier`) phá vỡ OpenAI SDK v1.83+
- **Chuẩn hóa vai trò** — Chuyển đổi `developer` → `system` cho các nhà cung cấp không phải OpenAI; `system` → `user` cho GLM/ERNIE
- **Think Tag Extraction** — Trích xuất `<think>` khối từ các mô hình như DeepSeek R1 thành `reasoning_content` được tiêu chuẩn hóa
- **Đầu ra có cấu trúc cho Gemini** — `json_schema` → `responseMimeType`/`responseSchema` chuyển đổi tự động
- **`stream` mặc định là `false`** — Căn chỉnh với thông số OpenAI, tránh SSE không mong muốn trong SDK Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Nhà cung cấp AI của tôi chặn khu vực/quốc gia của tôi"</b></summary>

Các nhà cung cấp như OpenAI/Codex chặn quyền truy cập từ các khu vực địa lý nhất định. Người dùng gặp phải các lỗi như `unsupported_country_region_territory` trong khi kết nối OAuth và API. Điều này đặc biệt gây khó chịu cho các nhà phát triển từ các nước đang phát triển.

**Cách OmniRoute giải quyết vấn đề này:**

- **Cấu hình proxy 3 cấp** — Proxy có thể định cấu hình ở 3 cấp độ: toàn cầu (tất cả lưu lượng truy cập), mỗi nhà cung cấp (chỉ một nhà cung cấp) và mỗi kết nối/khóa
- **Huy hiệu proxy được mã hóa màu** — Chỉ báo trực quan: 🟢 proxy toàn cầu, 🟡 proxy nhà cung cấp, 🔵 proxy kết nối, luôn hiển thị IP
- **Trao đổi mã thông báo OAuth thông qua proxy** — Luồng OAuth cũng đi qua proxy, giải quyết `unsupported_country_region_territory`
- **Kiểm tra kết nối qua Proxy** — Kiểm tra kết nối sử dụng proxy đã định cấu hình (không cần bỏ qua trực tiếp nữa)
- **Hỗ trợ SOCKS5** — Hỗ trợ proxy SOCKS5 đầy đủ cho định tuyến đi
- **Giả mạo dấu vân tay TLS** — Dấu vân tay TLS giống trình duyệt thông qua `wreq-js` để vượt qua khả năng phát hiện bot
- **🔏 Khớp dấu vân tay CLI** — Sắp xếp lại các tiêu đề và trường nội dung để khớp với chữ ký nhị phân CLI gốc, giảm đáng kể rủi ro gắn cờ tài khoản. IP proxy được giữ nguyên — bạn có được cả mặt nạ IP **và** ẩn cùng lúc

</details>

<details>
<summary><b>🆓 4. "Tôi muốn sử dụng AI để viết mã nhưng tôi không có tiền"</b></summary>

Không phải ai cũng có thể trả 20–200 USD/tháng để đăng ký AI. Sinh viên, nhà phát triển từ các quốc gia mới nổi, những người có sở thích và người làm việc tự do cần được tiếp cận với các mô hình chất lượng với chi phí bằng 0.

**Cách OmniRoute giải quyết vấn đề này:**

- **Tích hợp sẵn nhà cung cấp cấp miễn phí** — Hỗ trợ riêng cho nhà cung cấp miễn phí 100%: iFlow (5 mô hình không giới hạn qua OAuth: kimi-k2-thinking, qwen3-code-plus, deepseek-r1, minimax-m2, kimi-k2), Qwen (4 mô hình không giới hạn: qwen3-code-plus, qwen3-code-flash, qwen3-code-next, Vision-model), Kiro (Claude + AWS Builder ID miễn phí), Gemini CLI (miễn phí 180K token/tháng)
- **Ollama Cloud** — Các mô hình Ollama được lưu trữ trên đám mây tại `api.ollama.com` với bậc "Sử dụng nhẹ" miễn phí; sử dụng tiền tố `ollamacloud/<model>`
- **Combo chỉ miễn phí** — Chuỗi `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/tháng mà không có thời gian ngừng hoạt động
- **Truy cập miễn phí NVIDIA NIM** — ~40 RPM dành cho nhà phát triển - truy cập miễn phí vĩnh viễn vào hơn 70 mẫu tại build.nvidia.com (chuyển từ tín dụng sang giới hạn tỷ lệ thuần túy)
- **Chiến lược tối ưu hóa chi phí** — Chiến lược định tuyến tự động chọn nhà cung cấp sẵn có rẻ nhất

</details>

<details>
<summary><b>🔒 5. "Tôi cần bảo vệ cổng AI của mình khỏi bị truy cập trái phép"</b></summary>

Khi đưa cổng AI vào mạng (LAN, VPS, Docker), bất kỳ ai có địa chỉ đều có thể sử dụng mã thông báo/hạn ngạch của nhà phát triển. Nếu không có biện pháp bảo vệ, các API dễ bị lạm dụng, chèn ép và lạm dụng.

**Cách OmniRoute giải quyết vấn đề này:**

- **Quản lý khóa API** — Tạo, xoay vòng và xác định phạm vi cho mỗi nhà cung cấp bằng trang `/dashboard/api-manager` chuyên dụng
- **Quyền cấp mô hình** — Hạn chế khóa API đối với các mô hình cụ thể (`openai/*`, mẫu ký tự đại diện), bằng nút chuyển Cho phép tất cả/Hạn chế
- **Bảo vệ điểm cuối API** — Yêu cầu khóa cho `/v1/models` và chặn các nhà cung cấp cụ thể khỏi danh sách
- **Auth Guard + CSRF Protection** — Tất cả các tuyến trang tổng quan được bảo vệ bằng phần mềm trung gian `withAuth` + mã thông báo CSRF
- **Giới hạn tốc độ** — Giới hạn tốc độ trên mỗi IP với các cửa sổ có thể định cấu hình
- **Lọc IP** — Danh sách cho phép/danh sách chặn để kiểm soát truy cập
- **Prompt Tiêm Guard** — Khử trùng các mẫu nhắc nhở độc hại
- **Mã hóa AES-256-GCM** — Thông tin xác thực được mã hóa ở trạng thái lưu trữ

</details>

<details>
<summary><b>🛑 6. "Nhà cung cấp của tôi ngừng hoạt động và tôi mất luồng mã hóa"</b></summary>

Các nhà cung cấp AI có thể trở nên không ổn định, trả về lỗi 5xx hoặc đạt giới hạn tốc độ tạm thời. Nếu một nhà phát triển phụ thuộc vào một nhà cung cấp duy nhất thì họ sẽ bị gián đoạn. Nếu không có bộ ngắt mạch, việc thử lại nhiều lần có thể làm hỏng ứng dụng.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bộ ngắt mạch trên mỗi mô hình** — Tự động mở/đóng với các ngưỡng và thời gian hồi chiêu có thể định cấu hình (Đóng/Mở/Nửa mở), trong phạm vi mỗi mô hình để tránh xếp tầng
- **Thời gian chờ theo cấp số nhân** — Độ trễ thử lại lũy tiến
- **Bầy chống sấm sét** — Mutex + bảo vệ semaphore chống lại các cơn bão thử lại đồng thời
- **Chuỗi dự phòng kết hợp** — Nếu nhà cung cấp chính không thành công, nó sẽ tự động rơi qua chuỗi mà không cần can thiệp
- **Combo Circuit Breaker** — Tự động vô hiệu hóa các nhà cung cấp bị lỗi trong chuỗi kết hợp
- **Bảng thông tin sức khỏe** — Giám sát thời gian hoạt động, trạng thái ngắt mạch, khóa, số liệu thống kê bộ nhớ đệm, độ trễ p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Việc định cấu hình từng công cụ AI thật tẻ nhạt và lặp đi lặp lại"</b></summary>

Nhà phát triển sử dụng Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Mỗi công cụ cần một cấu hình khác nhau (điểm cuối API, khóa, mô hình). Việc cấu hình lại khi chuyển đổi nhà cung cấp hoặc mô hình là một sự lãng phí thời gian.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bảng điều khiển công cụ CLI** — Trang chuyên dụng với thiết lập bằng một cú nhấp chuột cho Claude Code, Codex CLI, OpenClaw, Kilo Code, AntiGravity, Cline
- **Trình tạo cấu hình đồng lái GitHub** — Tạo `chatLanguageModels.json` cho Mã VS với lựa chọn mô hình hàng loạt
- **Trình hướng dẫn tích hợp** — Thiết lập 4 bước có hướng dẫn cho người dùng lần đầu
- **Một điểm cuối, tất cả các mô hình** — Định cấu hình `http://localhost:20128/v1` một lần, truy cập hơn 67 nhà cung cấp

</details>

<details>
<summary><b>🔑 8. "Quản lý mã thông báo OAuth từ nhiều nhà cung cấp là địa ngục"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot — tất cả đều sử dụng OAuth 2.0 với các mã thông báo sắp hết hạn. Nhà phát triển cần liên tục xác thực lại, xử lý `client_secret is missing`, `redirect_uri_mismatch` và lỗi trên máy chủ từ xa. OAuth trên LAN/VPS đặc biệt có vấn đề.

**Cách OmniRoute giải quyết vấn đề này:**

- **Tự động làm mới mã thông báo** — Làm mới mã thông báo OAuth ở chế độ nền trước khi hết hạn
- **Tích hợp OAuth 2.0 (PKCE)** — Luồng tự động cho Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth nhiều tài khoản** — Nhiều tài khoản cho mỗi nhà cung cấp thông qua trích xuất mã thông báo JWT/ID
- **OAuth LAN/Remote Fix** — Phát hiện IP riêng cho `redirect_uri` + chế độ URL thủ công cho máy chủ từ xa
- **OAuth đằng sau Nginx** — Sử dụng `window.location.origin` để tương thích với proxy ngược
- **Hướng dẫn OAuth từ xa** — Hướng dẫn từng bước về thông tin đăng nhập Google Cloud trên VPS/Docker

</details>

<details>
<summary><b>📊 9. "Tôi không biết mình đang chi bao nhiêu và ở đâu"</b></summary>

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

Khi cuộc gọi không thành công, nhà phát triển không biết liệu đó có phải là do giới hạn tốc độ, mã thông báo đã hết hạn, sai định dạng hay lỗi của nhà cung cấp hay không. Nhật ký bị phân mảnh trên các thiết bị đầu cuối khác nhau. Nếu không có khả năng quan sát được thì việc gỡ lỗi chỉ là thử và sai.

**Cách OmniRoute giải quyết vấn đề này:**

- **Bảng điều khiển nhật ký hợp nhất** — 4 tab: Nhật ký yêu cầu, Nhật ký proxy, Nhật ký kiểm tra, Bảng điều khiển
- **Trình xem nhật ký bảng điều khiển** — Trình xem kiểu thiết bị đầu cuối thời gian thực với các cấp độ được mã hóa màu, tự động cuộn, tìm kiếm, lọc
- **Nhật ký proxy SQLite** — Nhật ký liên tục vẫn tồn tại khi máy chủ khởi động lại
- **Sân chơi dịch thuật** — 4 chế độ gỡ lỗi: Sân chơi (dịch định dạng), Trình kiểm tra trò chuyện (khứ hồi), Bàn thử nghiệm (hàng loạt), Giám sát trực tiếp (thời gian thực)
- **Yêu cầu đo từ xa** — độ trễ p50/p95/p99 + truy tìm X-Request-Id
- **Ghi nhật ký dựa trên tệp bằng xoay vòng** — Trình chặn chặn bảng điều khiển ghi lại mọi thứ vào nhật ký JSON bằng cách xoay vòng dựa trên kích thước
- **Báo cáo thông tin hệ thống** — `npm run system-info` tạo `system-info.txt` với môi trường đầy đủ của bạn (Phiên bản nút, phiên bản OmniRoute, HĐH, công cụ CLI, trạng thái Docker/PM2). Đính kèm nó khi báo cáo vấn đề để phân loại ngay lập tức.

</details>

<details>
<summary><b>🏗️ 11. "Việc triển khai và bảo trì cổng rất phức tạp"</b></summary>

Việc cài đặt, định cấu hình và duy trì proxy AI trên các môi trường khác nhau (cục bộ, VPS, Docker, đám mây) tốn nhiều công sức. Các vấn đề như đường dẫn được mã hóa cứng, `EACCES` trên thư mục, xung đột cổng và bản dựng đa nền tảng sẽ gây thêm xích mích.

**Cách OmniRoute giải quyết vấn đề này:**

- **npm cài đặt toàn cầu** — `npm install -g omniroute && omniroute` — xong
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
<summary><b>🔄 13. "Tôi cần nhiều hơn là trò chuyện — Tôi cần nội dung nhúng, hình ảnh, âm thanh"</b></summary>

AI không chỉ hoàn thành cuộc trò chuyện. Nhà phát triển cần tạo hình ảnh, phiên âm âm thanh, tạo phần nhúng cho RAG, sắp xếp lại tài liệu và kiểm duyệt nội dung. Mỗi API có điểm cuối và định dạng khác nhau.

**Cách OmniRoute giải quyết vấn đề này:**

- **Nhúng** — `/v1/embeddings` với 6 nhà cung cấp và hơn 9 mô hình
- **Tạo hình ảnh** — `/v1/images/generations` với 10 nhà cung cấp và hơn 20 mô hình (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, AntiGravity, SD WebUI, ComfyUI)
- **Chuyển văn bản thành video** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) và SD WebUI
- **Chuyển văn bản thành nhạc** — `/v1/music/generations` — ComfyUI (Mở âm thanh ổn định, MusicGen)
- **Phiên âm âm thanh** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Chuyển văn bản thành giọng nói** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, **Inworld**, **Cartesia**, **PlayHT**, + các nhà cung cấp hiện có
- **Kiểm duyệt** — `/v1/moderations` — Kiểm tra an toàn nội dung
- **Sắp xếp lại** — `/v1/rerank` — Sắp xếp lại mức độ liên quan của tài liệu
- **API phản hồi** — Hỗ trợ đầy đủ `/v1/responses` cho Codex

</details>

<details>
<summary><b>🧪 14. "Tôi không có cách nào để kiểm tra và so sánh chất lượng giữa các mẫu"</b></summary>

Các nhà phát triển muốn biết mô hình nào là tốt nhất cho trường hợp sử dụng của họ — mã, dịch thuật, lý luận — nhưng việc so sánh thủ công rất chậm. Không có công cụ đánh giá tích hợp nào tồn tại.

**Cách OmniRoute giải quyết vấn đề này:**

- **Đánh giá LLM** — Bộ thử nghiệm vàng với 10 trường hợp tải sẵn bao gồm lời chào, toán, địa lý, tạo mã, tuân thủ JSON, dịch thuật, đánh dấu, từ chối an toàn
- **4 Chiến lược kết hợp** — `exact`, `contains`, `regex`, `custom` (hàm JS)
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
- **Bộ định tuyến ký tự đại diện** — mẫu `provider/*` định tuyến động tới bất kỳ nhà cung cấp nào
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
- Tích hợp sẵn tính năng khởi động nhanh cho `omniroute --mcp` và quá trình giới thiệu ứng dụng khách

</details>

<details>
<summary><b>🧠 18. "Tôi cần phối hợp A2A với đường dẫn tác vụ đồng bộ hóa + truyền phát"</b></summary>

Quy trình làm việc của tổng đài viên cần cả phản hồi trực tiếp và thực thi theo luồng trong thời gian dài với tính năng kiểm soát vòng đời.

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
<summary><b>📋 20. "Tôi cần thực thi công cụ MCP có thể kiểm tra"</b></summary>

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
<summary><b>🔄 23. "Tôi cần khả năng hiển thị và hủy vòng đời nhiệm vụ A2A trực tiếp"</b></summary>

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
<summary><b>🪪 25. "Tôi cần khám phá tác nhân tiêu chuẩn cho khách hàng"</b></summary>

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

- Trang **Điểm cuối** được hợp nhất với các tab dành cho Điểm cuối Proxy, MCP, A2A và API
- Chuyển đổi trạng thái dịch vụ nội tuyến (Trực tuyến/Ngoại tuyến) cho MCP và A2A
- Liên kết từ tổng quan đến các tab quản lý chuyên dụng

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
3) Observe via /dashboard/endpoint (MCP and A2A tabs)
4) Toggle services via inline status controls
```

---

## 🆓 Bắt đầu miễn phí - Chi phí cấu hình bằng 0

> Thiết lập mã hóa AI trong vài phút với mức **$0/tháng**. Kết nối các tài khoản miễn phí này và sử dụng combo **Free Stack** tích hợp sẵn.

| Bước | Hành động                                            | Nhà cung cấp đã được mở khóa                                           |
| ---- | ---------------------------------------------------- | ---------------------------------------------------------------------- |
| 1    | Kết nối **Kiro** (ID AWS Builder OAuth)              | Claude Sonnet 4.5, Haiku 4.5 — **không giới hạn**                      |
| 2    | Kết nối **iFlow** (Google OAuth)                     | kimi-k2-thinking, qwen3-code-plus, deepseek-r1... — **không giới hạn** |
| 3    | Kết nối **Qwen** (Mã thiết bị)                       | qwen3-code-plus, qwen3-code-flash... — **không giới hạn**              |
| 4    | Kết nối **Gemini CLI** (Google OAuth)                | gemini-3-flash, gemini-2.5-pro — **180K/tháng miễn phí**               |
| 5    | `/dashboard/combos` → **Mẫu ngăn xếp miễn phí ($0)** | Tự động quay vòng tất cả các nhà cung cấp miễn phí                     |

**Trỏ bất kỳ IDE/CLI nào tới:** `http://localhost:20128/v1` · Khóa API: `any-string` · Xong.

> **Phạm vi phủ sóng bổ sung tùy chọn (cũng miễn phí):** Khóa API Groq (miễn phí 30 RPM), NVIDIA NIM (miễn phí 40 RPM, hơn 70 mẫu), Cerebras (1 triệu tok/ngày), khóa API LongCat (50 triệu mã thông báo/ngày!), Cloudflare Workers AI (10K nơ-ron/ngày, hơn 50 mô hình).

## ⚡ Bắt đầu nhanh

### 1) Cài đặt và chạy

```bash
npm install -g omniroute
omniroute
```

> **người dùng pnpm:** Chạy `pnpm approve-builds -g` sau khi cài đặt để bật tập lệnh bản dựng gốc được yêu cầu bởi `better-sqlite3` và `@swc/core`:
>
> ```bash
> pnpm install -g omniroute
> pnpm approve-builds -g   # Select all packages → approve
> omniroute
> ```

Trang tổng quan mở tại `http://localhost:20128` và URL cơ sở API là `http://localhost:20128/v1`.

| Lệnh                    | Mô tả                                                                       |
| ----------------------- | --------------------------------------------------------------------------- |
| `omniroute`             | Khởi động máy chủ (`PORT=20128`, API và bảng điều khiển trên cùng một cổng) |
| `omniroute --port 3000` | Đặt cổng chuẩn/API thành 3000                                               |
| `omniroute --mcp`       | Khởi động máy chủ MCP (stdio Transport)                                     |
| `omniroute --no-open`   | Không tự động mở trình duyệt                                                |
| `omniroute --help`      | Hiển thị trợ giúp                                                           |

Chế độ chia cổng tùy chọn:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

### 2) Kết nối nhà cung cấp và tạo khóa API của bạn

1. Mở Trang tổng quan → `Providers` và kết nối ít nhất một nhà cung cấp (khóa OAuth hoặc API).
2. Mở Trang tổng quan → `Endpoints` và tạo khóa API.
3. (Tùy chọn) Mở Trang tổng quan → `Combos` và đặt chuỗi dự phòng của bạn.

### 3) Trỏ công cụ mã hóa của bạn tới OmniRoute

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/kimi-k2-thinking (or any provider/model prefix)
```

Hoạt động với Claude Code, Codex CLI, Gemini CLI, Cursor, Cline, OpenClaw, OpenCode và SDK tương thích với OpenAI.

### 4) Kích hoạt và xác thực các giao thức (v2.0)

**MCP (đối với các hoạt động điều khiển bằng công cụ):**

```bash
omniroute --mcp
```

Sau đó kết nối ứng dụng khách MCP của bạn qua `stdio` và kiểm tra các công cụ như:

- `omniroute_get_health`
- `omniroute_list_combos`

**A2A (dành cho quy trình làm việc giữa các đại lý):**

```bash
curl http://localhost:20128/.well-known/agent.json
```

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

### 5) Xác thực mọi thứ từ đầu đến cuối (được khuyến nghị)

```bash
npm run test:protocols:e2e
```

Bộ phần mềm này xác thực các luồng ứng dụng khách MCP và A2A thực dựa trên ứng dụng đang chạy.

### Cách khác: chạy từ nguồn

```bash
cp .env.example .env
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
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

## 🖥️ Ứng dụng dành cho máy tính để bàn — Ngoại tuyến & Luôn bật

> 🆕 **MỚI!** OmniRoute hiện có sẵn dưới dạng **ứng dụng máy tính để bàn gốc** dành cho Windows, macOS và Linux.

Chạy OmniRoute dưới dạng một ứng dụng máy tính để bàn độc lập — không cần thiết bị đầu cuối, không cần trình duyệt, không cần Internet đối với các mô hình cục bộ. Ứng dụng dựa trên Electron bao gồm:

- 🖥️ **Cửa sổ gốc** — Cửa sổ ứng dụng chuyên dụng có tích hợp khay hệ thống
- 🔄 **Tự động khởi động** — Khởi chạy OmniRoute khi đăng nhập hệ thống
- 🔔 **Thông báo gốc** — Nhận thông báo về tình trạng cạn kiệt hạn ngạch hoặc các vấn đề về nhà cung cấp
- ⚡ **Cài đặt bằng một cú nhấp chuột** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Chế độ ngoại tuyến** — Hoạt động hoàn toàn ngoại tuyến với máy chủ đi kèm

### Bắt đầu nhanh

```bash
# Development mode
npm run electron:dev

# Build for your platform
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg) — x64 & arm64
npm run electron:build:linux   # Linux (.AppImage)
```

### Khay hệ thống

Khi được thu nhỏ, OmniRoute sẽ tồn tại trong khay hệ thống của bạn bằng các hành động nhanh chóng:

- Mở bảng điều khiển
- Thay đổi cổng máy chủ
- Thoát khỏi ứng dụng

📖 Tài liệu đầy đủ: [**OMNI_TOKEN_153**](electron/README.md)

---

## 💰 Sơ lược về giá

| Bậc             | Nhà cung cấp                | Chi phí                          | Đặt lại hạn ngạch      | Tốt nhất cho                              |
| --------------- | --------------------------- | -------------------------------- | ---------------------- | ----------------------------------------- |
| **💳 ĐĂNG KÝ**  | Mã Claude (Pro)             | $20/tháng                        | 5h + hàng tuần         | Đã đăng ký                                |
|                 | Codex (Plus/Pro)            | $20-200/tháng                    | 5h + hàng tuần         | Người dùng OpenAI                         |
|                 | Song Tử CLI                 | **MIỄN PHÍ**                     | 180K/tháng + 1K/ngày   | Mọi người!                                |
|                 | Phi công phụ GitHub         | $10-19/tháng                     | Hàng tháng             | Người dùng GitHub                         |
| **🔑 KHÓA API** | NVIDIA NIM                  | **MIỄN PHÍ** (dev mãi mãi)       | ~40 vòng/phút          | Hơn 70 mô hình mở                         |
|                 | Não                         | **MIỄN PHÍ** (1 triệu tok/ngày)  | 60K TPM / 30 vòng/phút | Nhanh nhất thế giới                       |
|                 | Groq                        | **MIỄN PHÍ** (30 vòng/phút)      | 14,4K RPD              | Llama/Gemma cực nhanh                     |
|                 | DeepSeek V3.2               | 0,27 USD/1,10 USD mỗi 1 triệu    | Không có               | Lý luận về giá/chất lượng tốt nhất        |
|                 | xAI Grok-4 Nhanh            | **$0,20/$0,50 mỗi 1 triệu** 🆕   | Không có               | Gọi công cụ + nhanh nhất, cực nhanh       |
|                 | xAI Grok-4 (tiêu chuẩn)     | 0,20 USD/1,50 USD mỗi 1 triệu 🆕 | Không có               | Lý luận hàng đầu từ xAI                   |
|                 | Mistral                     | Dùng thử miễn phí + trả phí      | Tỷ lệ giới hạn         | AI Châu Âu                                |
|                 | OpenRouter                  | Trả tiền cho mỗi lần sử dụng     | Không có               | Tổng hợp hơn 100 mô hình                  |
| **💰 RẺ**       | GLM-5 (thông qua Z.AI) 🆕   | 0,5 USD/1 triệu USD              | 10 giờ sáng hàng ngày  | Đầu ra 128K, chiếc hạm mới nhất           |
|                 | GLM-4.7                     | 0,6 USD/1 triệu USD              | 10 giờ sáng hàng ngày  | Dự phòng ngân sách                        |
|                 | MiniMax M2.5 🆕             | 0,3 USD/đầu vào 1 triệu USD      | lăn 5 giờ              | Lý luận + nhiệm vụ tác nhân               |
|                 | MiniMax M2.1                | 0,2 USD/1 triệu USD              | lăn 5 giờ              | Lựa chọn rẻ nhất                          |
|                 | Kimi K2.5 (API Moonshot) 🆕 | Trả tiền cho mỗi lần sử dụng     | Không có               | Truy cập API Moonshot trực tiếp           |
|                 | Kimi K2                     | $9/tháng căn hộ                  | 10 triệu token/tháng   | Chi phí dự đoán                           |
| **🆓 MIỄN PHÍ** | iFlow                       | **$0**                           | Không giới hạn         | 5 mẫu không giới hạn                      |
|                 | Qwen                        | **$0**                           | Không giới hạn         | 4 mẫu không giới hạn                      |
|                 | Kiro                        | **$0**                           | Không giới hạn         | Claude Sonnet/Haiku (Người xây dựng AWS)  |
|                 | LongCat Flash-Lite 🆕       | **$0** (50 triệu tok/ngày 🔥)    | 1 RPS                  | Hạn ngạch miễn phí lớn nhất trên Trái đất |
|                 | Thụ phấn AI 🆕              | **$0** (không cần chìa khóa)     | 1 yêu cầu/15 giây      | GPT-5, Claude, DeepSeek, Llama 4          |
|                 | Cloudflare Workers AI 🆕    | **$0** (10K nơ-ron/ngày)         | ~150 lần/ngày          | Hơn 50 mẫu, lợi thế toàn cầu              |
|                 | Đường quy mô AI 🆕          | **$0** (Tổng số 1 triệu token)   | Tỷ lệ giới hạn         | EU/GDPR, Qwen3 235B, Llama 70B            |

> 🆕 **Thêm các mẫu mới (tháng 3 năm 2026):** Dòng Grok-4 Fast ở mức 0,20 USD/0,50 USD/M (điểm chuẩn ở 1143 mili giây — nhanh hơn 30% so với Gemini 2.5 Flash), GLM-5 qua Z.AI với đầu ra 128K, lý luận MiniMax M2.5, giá cập nhật DeepSeek V3.2, Kimi K2.5 qua API trực tiếp Moonshot.

**💡 Ngăn xếp combo $0 — Thiết lập miễn phí hoàn chỉnh:**

```
# 🆓 Ultimate Free Stack 2026 — 11 Providers, $0 Forever
Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
Qwen (qw/)             → qwen3-coder-plus, qwen3-coder-flash, qwen3-coder-next UNLIMITED
Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free API key
Cloudflare AI (cf/)    → Llama 70B, Gemma 3, Mistral — 10K Neurons/day
Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
Groq (groq/)           → Llama/Gemma ultra-fast — 14.4K req/day
NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
```

** Không tốn phí. Không bao giờ ngừng mã hóa.** Định cấu hình tính năng này dưới dạng một tổ hợp OmniRoute và tất cả các dự phòng sẽ tự động diễn ra — không cần chuyển đổi thủ công.

---

---

## 🆓 Mô hình miễn phí — Những gì bạn thực sự nhận được

> Tất cả các mẫu bên dưới đều **miễn phí 100% và không cần thẻ tín dụng**. OmniRoute tự động định tuyến giữa chúng khi hết một hạn mức — kết hợp tất cả chúng để tạo thành một combo $0 không thể phá vỡ.

### 🔵 MÔ HÌNH CLAUDE (thông qua Kiro — ID AWS Builder)

| Người mẫu           | Tiền tố | Giới hạn           | Giới hạn tỷ lệ                           |
| ------------------- | ------- | ------------------ | ---------------------------------------- |
| `claude-sonnet-4.5` | `kr/`   | **Không giới hạn** | Không có giới hạn hàng ngày được báo cáo |
| `claude-haiku-4.5`  | `kr/`   | **Không giới hạn** | Không có giới hạn hàng ngày được báo cáo |
| `claude-opus-4.6`   | `kr/`   | **Không giới hạn** | Opus mới nhất qua Kiro                   |

### 🟢 MÔ HÌNH IFLOW (OAuth miễn phí - Không có thẻ tín dụng)

| Người mẫu          | Tiền tố | Giới hạn           | Giới hạn tỷ lệ                 |
| ------------------ | ------- | ------------------ | ------------------------------ |
| `kimi-k2-thinking` | `if/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `qwen3-coder-plus` | `if/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `deepseek-r1`      | `if/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `minimax-m2.1`     | `if/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `kimi-k2`          | `if/`   | **Không giới hạn** | Không có giới hạn được báo cáo |

### 🟡 MÔ HÌNH QWEN (Xác thực mã thiết bị)

| Người mẫu           | Tiền tố | Giới hạn           | Giới hạn tỷ lệ                 |
| ------------------- | ------- | ------------------ | ------------------------------ |
| `qwen3-coder-plus`  | `qw/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `qwen3-coder-flash` | `qw/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `qwen3-coder-next`  | `qw/`   | **Không giới hạn** | Không có giới hạn được báo cáo |
| `vision-model`      | `qw/`   | **Không giới hạn** | Đa phương thức (hình ảnh)      |

### 🟣 GEMINI CLI (Google OAuth)

| Người mẫu                | Tiền tố | Giới hạn                     | Giới hạn tỷ lệ     |
| ------------------------ | ------- | ---------------------------- | ------------------ |
| `gemini-3-flash-preview` | `gc/`   | **180K tok/tháng** + 1K/ngày | Đặt lại hàng tháng |
| `gemini-2.5-pro`         | `gc/`   | 180K/tháng (nhóm chung)      | Chất lượng cao     |

### ⚫ NVIDIA NIM (Khóa API miễn phí - build.nvidia.com)

| Bậc                       | Giới hạn hàng ngày             | Giới hạn tỷ lệ    | Ghi chú                                                               |
| ------------------------- | ------------------------------ | ----------------- | --------------------------------------------------------------------- |
| Miễn phí (Nhà phát triển) | Không có giới hạn mã thông báo | **~40 vòng/phút** | Hơn 70 mẫu; chuyển sang giới hạn lãi suất thuần túy vào giữa năm 2025 |

Các mẫu miễn phí phổ biến: `moonshotai/kimi-k2.5` (Kimi K2.5), `z-ai/glm4.7` (GLM 4.7), `deepseek-ai/deepseek-v3.2` (DeepSeek V3.2), `nvidia/llama-3.3-70b-instruct`, `deepseek/deepseek-r1`

### ⚪ CEREBRAS (Khóa API miễn phí — inference.cerebras.ai)

| Bậc      | Giới hạn hàng ngày     | Giới hạn tỷ lệ         | Ghi chú                                             |
| -------- | ---------------------- | ---------------------- | --------------------------------------------------- |
| Miễn phí | **1 triệu token/ngày** | 60K TPM / 30 vòng/phút | Suy luận LLM nhanh nhất thế giới; đặt lại hàng ngày |

Có sẵn miễn phí: `llama-3.3-70b`, `llama-3.1-8b`, `deepseek-r1-distill-llama-70b`

### 🔴 GROQ (Khóa API miễn phí — console.groq.com)

| Bậc      | Giới hạn hàng ngày | Giới hạn tỷ lệ           | Ghi chú                                                |
| -------- | ------------------ | ------------------------ | ------------------------------------------------------ |
| Miễn phí | **14,4K RPD**      | 30 vòng/phút cho mỗi mẫu | Không có thẻ tín dụng; Giới hạn 429, không bị tính phí |

Có sẵn miễn phí: `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b`, `whisper-large-v3`

### 🔴 LONGCAT AI (Khóa API miễn phí - longcat.chat) 🆕

| Người mẫu                     | Tiền tố | Hạn ngạch miễn phí hàng ngày | Ghi chú                                        |
| ----------------------------- | ------- | ---------------------------- | ---------------------------------------------- |
| `LongCat-Flash-Lite`          | `lc/`   | **50 triệu token** 🔥        | Hạn ngạch miễn phí lớn nhất từ ​​trước đến nay |
| `LongCat-Flash-Chat`          | `lc/`   | 500K token                   | Trò chuyện nhiều lượt                          |
| `LongCat-Flash-Thinking`      | `lc/`   | 500K token                   | Lý luận / CoT                                  |
| `LongCat-Flash-Thinking-2601` | `lc/`   | 500K token                   | Phiên bản tháng 1 năm 2026                     |
| `LongCat-Flash-Omni-2603`     | `lc/`   | 500K token                   | Đa phương thức                                 |

> Miễn phí 100% khi ở phiên bản beta công khai. Đăng ký tại [longcat.chat](https://longcat.chat) bằng email hoặc điện thoại. Đặt lại 00:00 UTC hàng ngày.

### 🟢 THỤ CẤP AI (Không cần khóa API) 🆕

| Người mẫu  | Tiền tố | Giới hạn tỷ lệ    | Nhà cung cấp đằng sau  |
| ---------- | ------- | ----------------- | ---------------------- |
| `openai`   | `pol/`  | 1 yêu cầu/15 giây | GPT-5                  |
| `claude`   | `pol/`  | 1 yêu cầu/15 giây | Claude nhân loại       |
| `gemini`   | `pol/`  | 1 yêu cầu/15 giây | Google Song Tử         |
| `deepseek` | `pol/`  | 1 yêu cầu/15 giây | DeepSeek V3            |
| `llama`    | `pol/`  | 1 yêu cầu/15 giây | Hướng đạo Meta Llama 4 |
| `mistral`  | `pol/`  | 1 yêu cầu/15 giây | AI của Mistral         |

> ✨ **Không ma sát:** Không cần đăng ký, không cần khóa API. Thêm nhà cung cấp Pollinations với trường khóa trống và nó sẽ hoạt động ngay lập tức.

### 🟠 NHÂN VIÊN CLOUDFLARE AI (Khóa API miễn phí - cloudflare.com) 🆕

| Bậc      | Tế bào thần kinh hàng ngày | Cách sử dụng tương đương                           | Ghi chú                   |
| -------- | -------------------------- | -------------------------------------------------- | ------------------------- |
| Miễn phí | **10.000**                 | ~150 LLM resp / âm thanh 500 giây / 15K lượt nhúng | Cạnh toàn cầu, hơn 50 mẫu |

Các mẫu miễn phí phổ biến: `@cf/meta/llama-3.3-70b-instruct`, `@cf/google/gemma-3-12b-it`, `@cf/openai/whisper-large-v3-turbo` (âm thanh miễn phí!), `@cf/qwen/qwen2.5-coder-15b-instruct`

> Yêu cầu Mã thông báo API + ID tài khoản từ [dash.cloudflare.com](https://dash.cloudflare.com). Lưu trữ ID tài khoản trong cài đặt nhà cung cấp.

### 🟣 SCALEWAY AI (Mã thông báo miễn phí 1 triệu —scaleway.com) 🆕

| Bậc      | Hạn ngạch miễn phí | Vị trí       | Ghi chú                               |
| -------- | ------------------ | ------------ | ------------------------------------- |
| Miễn phí | **1 triệu token**  | 🇫🇷 Paris, EU | Không cần thẻ tín dụng trong giới hạn |

Có sẵn miễn phí: `qwen3-235b-a22b-instruct-2507` (Qwen3 235B!), `llama-3.1-70b-instruct`, `mistral-small-3.2-24b-instruct-2506`, `deepseek-v3-0324`

> Tuân thủ EU/GDPR. Nhận khóa API tại [console.scaleway.com](https://console.scaleway.com).

> **💡 Kho miễn phí tối ưu (11 nhà cung cấp, $0 vĩnh viễn):**
>
> ```
> Kiro (kr/)             → Claude Sonnet/Haiku UNLIMITED
> iFlow (if/)            → kimi-k2-thinking, qwen3-coder-plus, deepseek-r1 UNLIMITED
> LongCat Lite (lc/)     → LongCat-Flash-Lite — 50M tokens/day 🔥
> Pollinations (pol/)    → GPT-5, Claude, DeepSeek, Llama 4 — no key needed
> Qwen (qw/)             → qwen3-coder models UNLIMITED
> Gemini (gemini/)       → Gemini 2.5 Flash — 1,500 req/day free
> Cloudflare AI (cf/)    → 50+ models — 10K Neurons/day
> Scaleway (scw/)        → Qwen3 235B, Llama 70B — 1M free tokens (EU)
> Groq (groq/)           → Llama/Gemma — 14.4K req/day ultra-fast
> NVIDIA NIM (nvidia/)   → 70+ open models — 40 RPM forever
> Cerebras (cerebras/)   → Llama/Qwen world-fastest — 1M tok/day
> ```

## 🎙️ Combo phiên âm miễn phí

> Phiên âm mọi âm thanh/video với giá **$0** — Deepgram dẫn đầu với 200 USD miễn phí, dự phòng AssemblyAI 50 USD, Groq Whisper làm bản sao lưu khẩn cấp không giới hạn.

| Nhà cung cấp       | Tín dụng miễn phí           | Người Mẫu Tốt Nhất                                | Giới hạn tỷ lệ                                  |
| ------------------ | --------------------------- | ------------------------------------------------- | ----------------------------------------------- |
| 🟢 **Deepgram**    | **$200 miễn phí** (đăng ký) | `nova-3` — độ chính xác tốt nhất, hơn 30 ngôn ngữ | Không có giới hạn RPM đối với tín dụng miễn phí |
| 🔵 **HộiAI**       | **$50 miễn phí** (đăng ký)  | `universal-3-pro` — chương, tình cảm, PII         | Không có giới hạn RPM đối với tín dụng miễn phí |
| 🔴 **Ngốc nghếch** | **Miễn phí mãi mãi**        | `whisper-large-v3` — Lời thì thầm của OpenAI      | 30 vòng/phút (tốc độ giới hạn)                  |

**Kết hợp được đề xuất trong `/dashboard/combos`:**

```
Name: free-transcription
Strategy: Priority
Nodes:
  [1] deepgram/nova-3          → uses $200 free first
  [2] assemblyai/universal-3-pro → fallback when Deepgram credits run out
  [3] groq/whisper-large-v3    → free forever, emergency fallback
```

Sau đó, trong tab `/dashboard/media` → **Phiên âm**: tải lên bất kỳ tệp âm thanh hoặc video nào → chọn điểm cuối kết hợp của bạn → nhận phiên âm ở các định dạng được hỗ trợ.

## 💡 Tính năng chính

OmniRoute v2.0 được xây dựng như một nền tảng hoạt động, không chỉ là proxy chuyển tiếp.

### 🆕 Mới — Cải tiến lấy cảm hứng từ ClawRouter (Tháng 3 năm 2026)

| Tính năng                                  | Nó làm gì                                                                                                       |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| ⚡ **Gia đình nhanh Grok-4**               | mô hình xAI ở mức 0,20 USD/0,50 USD/M — tốc độ chuẩn là 1143 mili giây (nhanh hơn 30% so với Gemini 2.5 Flash)  |
| 🧠 **GLM-5 qua Z.AI**                      | Bối cảnh đầu ra 128K, 0,5 USD/1 triệu USD — sản phẩm chủ lực mới nhất của dòng GLM                              |
| 🔮 **MiniMax M2.5**                        | Lý luận + nhiệm vụ tác nhân ở mức 0,30 USD/1 triệu — nâng cấp đáng kể từ M2.1                                   |
| 🎯 **công cụCờ gọi theo mẫu**              | Mỗi mô hình `toolCalling: true/false` trong sổ đăng ký — AutoCombo bỏ qua các mô hình không hỗ trợ công cụ      |
| 🌍 **Phát hiện ý định đa ngôn ngữ**        | Từ khóa PT/ZH/ES/AR trong tính điểm AutoCombo — lựa chọn mô hình tốt hơn cho nội dung không phải tiếng Anh      |
| 📊 **Dự phòng dựa trên điểm chuẩn**        | Độ trễ p95 thực từ tính điểm kết hợp nguồn cấp dữ liệu yêu cầu trực tiếp — AutoCombo học hỏi từ dữ liệu thực tế |
| 🔁 **Yêu cầu loại bỏ trùng lặp**           | Cửa sổ khấu trừ dựa trên hàm băm nội dung — an toàn cho nhiều tác nhân, ngăn chặn các khoản phí trùng lặp       |
| 🔌 **Chiến lược bộ định tuyến có thể cắm** | Giao diện `RouterStrategy` có thể mở rộng — thêm logic định tuyến tùy chỉnh làm plugin                          |

### 🚀 Phiên bản trước 2.0.9+ — Sân chơi, Dấu vân tay CLI & ACP

| Tính năng                                       | Nó làm gì                                                                                                                                                                                                                                                                     |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                         | Trang tổng quan để kiểm tra trực tiếp bất kỳ mô hình nào — bộ chọn nhà cung cấp/mô hình/điểm cuối, Trình chỉnh sửa Monaco, phát trực tuyến, hủy bỏ, tính thời gian                                                                                                            |
| 🔏 **Khớp vân tay CLI**                         | Thứ tự tiêu đề/nội dung của mỗi nhà cung cấp để khớp với chữ ký CLI gốc — chuyển đổi cho mỗi nhà cung cấp trong Cài đặt > Bảo mật. **IP proxy của bạn được giữ nguyên**                                                                                                       |
| 🤝 **Hỗ trợ ACP (Giao thức khách hàng đại lý)** | Khám phá tác nhân CLI (Codex, Claude, Goose, Gemini CLI, OpenClaw + 9 cái khác), trình sinh ra quy trình, điểm cuối `/api/acp/agents`                                                                                                                                         |
| 🤖 **Bảng thông tin đại lý ACP**                | Trang Gỡ lỗi > Tác nhân — lưới gồm 14 tác nhân với trạng thái cài đặt, phiên bản, biểu mẫu tác nhân tùy chỉnh cho bất kỳ công cụ CLI nào. **Người dùng OpenCode** nhận được nút "Tải xuống opencode.json" để tự động tạo cấu hình sẵn sàng sử dụng với tất cả các mẫu có sẵn. |
| 🔧 **Mô hình tùy chỉnh `apiFormat` Định tuyến** | Các mô hình tùy chỉnh với `apiFormat: "responses"` hiện định tuyến chính xác tới trình dịch API phản hồi                                                                                                                                                                      |
| 🏢 **Cách ly không gian làm việc Codex**        | Nhiều không gian làm việc Codex cho mỗi email - OAuth phân tách chính xác các kết nối theo ID không gian làm việc                                                                                                                                                             |
| 🔄 **Tự động cập nhật điện tử**                 | Ứng dụng máy tính để bàn kiểm tra các bản cập nhật + tự động cài đặt khi khởi động lại                                                                                                                                                                                        |

### 🤖 Hoạt động đại lý & giao thức (v2.0)

| Tính năng                                 | Nó làm gì                                                                                                                          |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 🔧 **Máy chủ MCP (16 công cụ)**           | Công cụ IDE/agent thông qua 3 phương thức truyền tải: stdio, SSE (`/api/mcp/sse`), HTTP có thể phát trực tuyến (`/api/mcp/stream`) |
| 🤝 **Máy chủ A2A (JSON-RPC + SSE)**       | Thực thi nhiệm vụ giữa các tác nhân với các luồng đồng bộ hóa và truyền phát                                                       |
| 🧭 **Trang điểm cuối tổng hợp**           | Trang quản lý theo thẻ với các tab Endpoint Proxy, MCP, A2A và API Endpoints                                                       |
| 🎚️ **Bật/Tắt dịch vụ**                    | Công tắc BẬT/TẮT cho MCP và A2A với khả năng duy trì cài đặt (mặc định: TẮT)                                                       |
| 🛰️ **Nhịp tim thời gian chạy MCP**        | Trạng thái quy trình thực (pid, thời gian hoạt động, tuổi nhịp tim, vận chuyển, chế độ phạm vi)                                    |
| 📋 **Dấu vết kiểm tra MCP**               | Nhật ký kiểm tra có thể lọc với thành công/thất bại và phân bổ chính                                                               |
| 🔐 **Thực thi phạm vi MCP**               | 9 quyền phạm vi chi tiết để truy cập công cụ được kiểm soát                                                                        |
| 📡 **Quản lý vòng đời nhiệm vụ A2A**      | Liệt kê/lọc nhiệm vụ, kiểm tra sự kiện/hiện vật, hủy nhiệm vụ đang chạy                                                            |
| 📋 **Khám phá thẻ đại lý**                | `/.well-known/agent.json` để tự động phát hiện ứng dụng khách                                                                      |
| 🧪 **Khai thác thử nghiệm giao thức E2E** | Luồng khách hàng A2A SDK + MCP SDK thực trong `test:protocols:e2e`                                                                 |
| ⚙️ **Kiểm soát hoạt động**                | Chuyển đổi tổ hợp, áp dụng cấu hình khả năng phục hồi, đặt lại bộ ngắt từ một bề mặt điều khiển                                    |

### 🧠 Định tuyến & Thông minh

| Tính năng                                       | Nó làm gì                                                                           |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| 🎯 **Dự phòng 4 tầng thông minh**               | Tự động định tuyến: Đăng ký → Khóa API → Giá rẻ → Miễn phí                          |
| 📊 **Theo dõi hạn ngạch theo thời gian thực**   | Số lượng mã thông báo trực tiếp + đếm ngược đặt lại cho mỗi nhà cung cấp            |
| 🔄 **Dịch định dạng**                           | OpenAI ↔ Claude ↔ Gemini ↔ Phản hồi bằng chuyển đổi an toàn lược đồ                 |
| 👥 **Hỗ trợ nhiều tài khoản**                   | Nhiều tài khoản cho mỗi nhà cung cấp với lựa chọn thông minh                        |
| 🔄 **Tự động làm mới mã thông báo**             | Mã thông báo OAuth tự động làm mới bằng thử lại                                     |
| 🎨 **Combo tùy chỉnh**                          | 6 chiến lược cân bằng + kiểm soát chuỗi dự phòng                                    |
| 🌐 **Bộ định tuyến ký tự đại diện**             | `provider/*` định tuyến động                                                        |
| 🧠 **Suy nghĩ về việc kiểm soát ngân sách**     | Giới hạn lý luận truyền qua, tự động, tùy chỉnh và thích ứng                        |
| 🔀 **Bí danh người mẫu**                        | Tích hợp sẵn + đặt bí danh mô hình tùy chỉnh và an toàn di chuyển                   |
| ⚡ **Xuống cấp nền**                            | Định tuyến các tác vụ nền có mức độ ưu tiên thấp tới các mô hình rẻ hơn             |
| 🧪 **Định tuyến thông minh nhận biết nhiệm vụ** | Tự động chọn mô hình theo loại nội dung (mã hóa/tầm nhìn/phân tích/tóm tắt)         |
| 💬 **Tiêm nhắc nhở hệ thống**                   | Kiểm soát hành vi toàn cầu được áp dụng nhất quán                                   |
| 📄 **Khả năng tương thích API phản hồi**        | Hỗ trợ đầy đủ `/v1/responses` cho Codex và quy trình làm việc của tác nhân nâng cao |

### 🎵 API đa phương thức

| Tính năng                             | Nó làm gì                                                                                                                                                                       |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Tạo hình ảnh**                   | `/v1/images/generations` với đám mây và phụ trợ cục bộ                                                                                                                          |
| 📐 **Nhúng**                          | `/v1/embeddings` cho đường dẫn tìm kiếm và RAG                                                                                                                                  |
| 🎤 **Phiên âm âm thanh**              | `/v1/audio/transcriptions` — 7 nhà cung cấp (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), phát hiện ngôn ngữ tự động, hỗ trợ MP4/MP3/WAV |
| 🔊 **Chuyển văn bản thành giọng nói** | `/v1/audio/speech` — 10 nhà cung cấp (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) với thông báo lỗi chính xác            |
| 🎬 **Tạo video**                      | `/v1/videos/generations` (Quy trình làm việc ComfyUI + SD WebUI)                                                                                                                |
| 🎵 **Thế hệ âm nhạc**                 | `/v1/music/generations` (Quy trình làm việc của ComfyUI)                                                                                                                        |
| 🛡️ **Kiểm duyệt**                     | `/v1/moderations` kiểm tra an toàn                                                                                                                                              |
| 🔀 **Sắp xếp lại**                    | `/v1/rerank` để chấm điểm mức độ liên quan                                                                                                                                      |
| 🔍 **Tìm kiếm trên web** 🆕           | `/v1/search` — 5 nhà cung cấp (Serper, Brave, Perplexity, Exa, Tavily), hơn 6.500 miễn phí/tháng, tự động chuyển đổi dự phòng, bộ đệm                                           |

### 🛡️ Khả năng phục hồi, bảo mật và quản trị

| Tính năng                              | Nó làm gì                                                                                   |
| -------------------------------------- | ------------------------------------------------------------------------------------------- |
| 🔌 **Bộ ngắt mạch**                    | Chuyến đi/khôi phục theo từng mô hình với các điều khiển ngưỡng                             |
| 🎯 **Mô hình nhận biết điểm cuối**     | Mô hình tùy chỉnh khai báo điểm cuối được hỗ trợ + định dạng API                            |
| 🛡️ **Bầy chống sấm sét**               | Bảo vệ Mutex + semaphore đối với các sự kiện thử lại/đánh giá                               |
| 🧠 **Bộ đệm ngữ nghĩa + chữ ký**       | Giảm chi phí/độ trễ với hai lớp bộ đệm                                                      |
| ⚡ **Yêu cầu quyền bình đẳng**         | Cửa sổ bảo vệ trùng lặp                                                                     |
| 🔒 **Giả mạo vân tay TLS**             | Dấu vân tay TLS giống trình duyệt — **giảm khả năng phát hiện bot và gắn cờ tài khoản**     |
| 🔏 **Khớp vân tay CLI**                | Phù hợp với chữ ký yêu cầu CLI gốc — **giảm rủi ro bị cấm trong khi vẫn bảo toàn IP proxy** |
| 🌐 **Lọc IP**                          | Kiểm soát danh sách cho phép/danh sách chặn đối với các triển khai được hiển thị            |
| 📊 **Giới hạn tỷ lệ có thể chỉnh sửa** | Giới hạn cấp độ nhà cung cấp/toàn cầu có thể định cấu hình với tính bền bỉ                  |
| 🔑 **Quản lý khóa API + Phạm vi**      | Bảo mật việc phát hành/xoay vòng khóa và kiểm soát mô hình/nhà cung cấp                     |
| 🛡️ **Được bảo vệ `/models`**           | Tùy chọn xác thực và ẩn nhà cung cấp cho danh mục mô hình                                   |

### 📊 Khả năng quan sát & phân tích

| Tính năng                               | Nó làm gì                                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| 📝 **Yêu cầu + Ghi nhật ký proxy**      | Yêu cầu/phản hồi đầy đủ và ghi nhật ký proxy                                 |
| 📋 **Bảng điều khiển nhật ký hợp nhất** | Chế độ xem yêu cầu, proxy, kiểm tra và bảng điều khiển trong một trang       |
| 🔍 **Yêu cầu đo từ xa**                 | độ trễ p50/p95/p99 và theo dõi yêu cầu                                       |
| 🏥 **Bảng thông tin sức khỏe**          | Thời gian hoạt động, trạng thái ngắt, khóa, số liệu thống kê bộ đệm          |
| 💰 **Theo dõi chi phí**                 | Kiểm soát ngân sách và khả năng hiển thị giá theo từng mô hình               |
| 📈 **Trực quan hóa phân tích**          | Thông tin chi tiết về cách sử dụng mô hình/nhà cung cấp và lượt xem xu hướng |
| 🧪 **Khung đánh giá**                   | Thử nghiệm bộ vàng với các chiến lược kết hợp có thể định cấu hình           |

### ☁️ Triển khai & Nền tảng

| Tính năng                          | Nó làm gì                                                                  |
| ---------------------------------- | -------------------------------------------------------------------------- |
| 🌐 **Triển khai mọi nơi**          | Localhost, VPS, Docker, Môi trường đám mây                                 |
| 💾 **Đồng bộ đám mây**             | Đồng bộ cấu hình qua Cloud Worker                                          |
| 🔄 **Sao lưu/Khôi phục**           | Luồng xuất/nhập khẩu và khắc phục thảm họa                                 |
| 🧙 **Trình hướng dẫn giới thiệu**  | Thiết lập có hướng dẫn lần đầu                                             |
| 🔧 **Bảng điều khiển công cụ CLI** | Thiết lập bằng một cú nhấp chuột cho các công cụ mã hóa phổ biến           |
| 🎮 **Sân chơi kiểu mẫu**           | Kiểm tra bất kỳ nhà cung cấp/mô hình/điểm cuối nào từ bảng thông tin       |
| 🔏 **Chuyển đổi vân tay CLI**      | So khớp dấu vân tay của mỗi nhà cung cấp trong Cài đặt > Bảo mật           |
| 🌐 **i18n (30 ngôn ngữ)**          | Hỗ trợ ngôn ngữ tài liệu + bảng điều khiển đầy đủ với phạm vi bảo hiểm RTL |
| 🧹 **Xóa tất cả các mẫu**          | Xóa danh sách mô hình bằng một cú nhấp chuột trong chi tiết nhà cung cấp   |
| 📋 **Mẫu vấn đề**                  | Mẫu GitHub được chuẩn hóa cho các lỗi và tính năng                         |
| 📂 **Thư mục dữ liệu tùy chỉnh**   | `DATA_DIR` ghi đè vị trí lưu trữ                                           |

### Tính năng Tìm hiểu sâu

#### Dự phòng thông minh với khả năng kiểm soát chi phí thiết thực

```txt
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6
  2. nvidia/llama-3.3-70b
  3. glm/glm-4.7
  4. if/kimi-k2-thinking
```

Khi hạn ngạch, tỷ lệ hoặc tình trạng không thành công, OmniRoute sẽ tự động chuyển sang ứng viên tiếp theo mà không cần chuyển đổi thủ công.

#### Quản lý giao thức hiển thị và có thể hoạt động

- MCP + A2A có thể được tìm thấy trong giao diện người dùng và tài liệu (không bị ẩn)
- API trạng thái giao thức hiển thị dữ liệu hoạt động trực tiếp (`/api/mcp/*`, `/api/a2a/*`)
- Bảng điều khiển bao gồm các hành động cho hoạt động ngày thứ 2 (chuyển đổi kết hợp, đặt lại bộ ngắt, hủy tác vụ)

#### Trình dịch + quy trình xác thực

Khu vực dịch thuật bao gồm:

- **Sân chơi**: yêu cầu kiểm tra chuyển đổi
- **Bộ kiểm tra trò chuyện**: toàn bộ yêu cầu/phản hồi khứ hồi
- **Băng thử nghiệm**: nhiều trường hợp trong một lần chạy
- **Giám sát trực tiếp**: chế độ xem giao thông theo thời gian thực

Cộng thêm xác thực giao thức với khách hàng thực thông qua `npm run test:protocols:e2e`.

> 📖 **[MCP Server README](open-sse/mcp-server/README.md)** — Tham khảo công cụ, cấu hình IDE và ví dụ ứng dụng khách
>
> 📖 **[A2A Server README](src/lib/a2a/README.md)** — Kỹ năng, phương pháp JSON-RPC, phát trực tuyến và vòng đời tác vụ

## 🧪 Đánh giá (Evals)

OmniRoute bao gồm khung đánh giá tích hợp để kiểm tra chất lượng phản hồi LLM dựa trên bộ vàng. Truy cập thông qua **Analytics → Đánh giá** trong bảng điều khiển.

### Bộ vàng tích hợp

"Bộ vàng OmniRoute" được tải sẵn chứa các trường hợp thử nghiệm cho:

- Lời chào, toán, địa lý, tạo mã
- Tuân thủ định dạng JSON, dịch thuật, tạo đánh dấu
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

### Thiết lập giao thức (MCP + A2A)

<details>
<summary><b>🧩 Thiết lập MCP (Giao thức ngữ cảnh mô hình)</b></summary>

Bắt đầu vận chuyển MCP ở chế độ stdio:

```bash
omniroute --mcp
```

Luồng xác thực được đề xuất:

1. Kết nối máy khách MCP của bạn qua stdio.
2. Chạy `omniroute_get_health`.
3. Chạy `omniroute_list_combos`.
4. Mở `/dashboard/mcp` để xác nhận nhịp tim, hoạt động và kiểm tra.

Các API hữu ích cho tự động hóa:

- `GET /api/mcp/status`
- `GET /api/mcp/tools`
- `GET /api/mcp/audit`
- `GET /api/mcp/audit/stats`

</details>

<details>
<summary><b>🤝 Thiết lập A2A (Agent2Agent)</b></summary>

Khám phá đại lý:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Gửi một nhiệm vụ:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"setup-a2a","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Summarize quota status."}]}}'
```

Quản lý vòng đời:

- `GET /api/a2a/status`
- `GET /api/a2a/tasks`
- `GET /api/a2a/tasks/:id`
- `POST /api/a2a/tasks/:id/cancel`

Giao diện người dùng hoạt động:

- `/dashboard/a2a` để biết khả năng quan sát nhiệm vụ/trạng thái/luồng và hành động khói

</details>

<details>
<summary><b>🧪 Xác thực giao thức end-to-end</b></summary>

Xác thực cả hai giao thức với máy khách thực:

```bash
npm run test:protocols:e2e
```

Điều này xác minh:

- Kết nối/danh sách/cuộc gọi máy khách MCP SDK
- Khám phá/gửi/truyền phát/nhận/hủy A2A
- Kiểm tra chéo dữ liệu trong kiểm tra MCP và API quản lý tác vụ A2A

</details>

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

#### Quản lý giới hạn tài khoản Codex (5h + Hàng tuần)

Mỗi tài khoản Codex hiện có các chuyển đổi chính sách trong `Dashboard -> Providers`:

- `5h` (BẬT/TẮT): thực thi chính sách ngưỡng cửa sổ 5 giờ.
- `Weekly` (BẬT/TẮT): thực thi chính sách ngưỡng cửa sổ hàng tuần.
- Hành vi ngưỡng: khi một cửa sổ được bật đạt mức sử dụng >=90%, tài khoản đó sẽ bị bỏ qua.
- Hành vi luân chuyển: OmniRoute tự động định tuyến đến tài khoản Codex đủ điều kiện tiếp theo.
- Đặt lại hành vi: khi hết thời gian `resetAt` của nhà cung cấp, tài khoản sẽ tự động đủ điều kiện trở lại.

Kịch bản:

- `5h ON` + `Weekly ON`: tài khoản bị bỏ qua khi một trong hai cửa sổ đạt đến ngưỡng.
- `5h OFF` + `Weekly ON`: chỉ sử dụng hàng tuần mới có thể chặn tài khoản.
- `5h ON` + `Weekly OFF`: chỉ sử dụng 5 tiếng là có thể khóa tài khoản.
- `resetAt` đã vượt qua: tài khoản tự động quay lại vòng quay (không kích hoạt lại thủ công).

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

### NVIDIA NIM (Quyền truy cập MIỄN PHÍ dành cho nhà phát triển - hơn 70 kiểu máy)

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

**Mẫu mã:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Mẹo chuyên nghiệp:** Suy luận cực nhanh — tốt nhất cho mã hóa thời gian thực!

### OpenRouter (Hơn 100 mẫu)

1. Đăng ký: [openrouter.ai](https://openrouter.ai)
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

1. Subscribe: [Moonshot AI](https://platform.moonshot.ai/)
2. Nhận khóa API
3. Bảng điều khiển → Thêm khóa API

**Sử dụng:** `kimi/kimi-latest`

**Mẹo chuyên nghiệp:** Đã sửa lỗi 9 USD/tháng cho 10 triệu mã thông báo = 0,90 USD/1 triệu chi phí hiệu quả!

</details>

<details>
<summary><b>🆓 Nhà cung cấp MIỄN PHÍ (Dự phòng khẩn cấp)</b></summary>

### iFlow (5 mô hình MIỄN PHÍ qua OAuth)

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

### Qwen (4 mẫu MIỄN PHÍ qua Mã thiết bị)

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

### Ví dụ 2: Chỉ miễn phí (Không mất phí)

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

> **Lưu ý:** OpenClaw chỉ hoạt động với OmniRoute cục bộ. Use `127.0.0.1` instead of `localhost` to avoid IPv6 resolution issues.

### Cline / Tiếp tục / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

### Mã mở

**Bước 1:** Thêm OmniRoute làm nhà cung cấp tùy chỉnh:

```bash
opencode
/connect
# Select "Other" → Enter ID: "omniroute" → Enter your OmniRoute API key
```

**Bước 2:** Tạo/chỉnh sửa `opencode.json` trong thư mục gốc dự án của bạn:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1"
      },
      "models": {
        "cc/claude-sonnet-4-20250514": { "name": "Claude Sonnet 4" },
        "gg/gemini-2.5-pro": { "name": "Gemini 2.5 Pro" },
        "if/kimi-k2-thinking": { "name": "Kimi K2 (Free)" }
      }
    }
  }
}
```

**Bước 3:** Chọn model trong OpenCode:

```bash
/models
# Select any OmniRoute model from the list
```

> **Mẹo:** Thêm bất kỳ mô hình nào có sẵn trong điểm cuối OmniRoute `/v1/models` của bạn vào phần `models`. Sử dụng định dạng `provider/model-id` từ bảng điều khiển OmniRoute của bạn.

</details>

---

## 🐛 Khắc phục sự cố

<details>
<summary><b>Nhấp để mở rộng hướng dẫn khắc phục sự cố</b></summary>

**"Language model did not provide messages"**

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

**Cổng bảng điều khiển/API bị sai**

- `PORT` là cổng cơ sở chuẩn (và cổng API theo mặc định)
- `API_PORT` chỉ ghi đè trình nghe API tương thích với OpenAI
- `DASHBOARD_PORT` chỉ ghi đè bảng điều khiển/trình nghe Next.js
- Đặt `NEXT_PUBLIC_BASE_URL` thành trang tổng quan/URL công khai của bạn (đối với lệnh gọi lại OAuth)

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

### 🔐 OAuth trên Máy chủ từ xa

<a name="oauth-on-a-remote-server"></a>
<a name="oauth-em-servidor-remoto"></a>

> **⚠️ Quan trọng đối với người dùng chạy OmniRoute trên VPS, Docker hoặc bất kỳ máy chủ từ xa nào**

#### Tại sao AntiGravity / Gemini CLI OAuth không thành công trên máy chủ từ xa?

Các nhà cung cấp **AntiGravity** và **Gemini CLI** sử dụng **Google OAuth 2.0**. Google yêu cầu `redirect_uri` trong luồng OAuth phải khớp chính xác với một trong các URI đã đăng ký trước trong Google Cloud Console của ứng dụng.

Thông tin xác thực OAuth đi kèm trong OmniRoute được đăng ký **chỉ dành cho `localhost`**. Khi bạn truy cập OmniRoute trên máy chủ từ xa (ví dụ: `https://omniroute.myserver.com`), Google sẽ từ chối xác thực bằng:

```
Error 400: redirect_uri_mismatch
```

#### Giải pháp: Định cấu hình thông tin xác thực OAuth của riêng bạn

Bạn cần tạo **ID ứng dụng khách OAuth 2.0** trong Google Cloud Console bằng URI máy chủ của bạn.

#### Từng bước một

**1. Mở Bảng điều khiển đám mây của Google**

Đi tới: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Tạo ID ứng dụng khách OAuth 2.0 mới**

- Nhấp vào **"+ Tạo thông tin xác thực"** → **"ID khách hàng OAuth"**
- Loại ứng dụng: **"Ứng dụng web"**
- Tên: bất cứ thứ gì bạn thích (ví dụ `OmniRoute Remote`)

**3. Thêm URI chuyển hướng được ủy quyền**

Trong trường **"URI chuyển hướng được ủy quyền"**, hãy thêm:

```
https://your-server.com/callback
```

> Thay thế `your-server.com` bằng miền hoặc IP máy chủ của bạn (bao gồm cổng nếu cần, ví dụ: `http://45.33.32.156:20128/callback`).

**4. Lưu và sao chép thông tin đăng nhập**

Sau khi tạo, Google sẽ hiển thị **ID khách hàng** và **Bí mật khách hàng**.

**5. Đặt biến môi trường**

Trong `.env` (hoặc biến môi trường Docker):

```bash
# For Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-your-secret

# For Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-your-secret
```

**6. Khởi động lại OmniRoute**

```bash
# npm:
npm run dev

# Docker:
docker restart omniroute
```

**7. Hãy thử kết nối lại**

Bảng điều khiển → Nhà cung cấp → Anti Gravity (hoặc Gemini CLI) → OAuth

Bây giờ Google sẽ chuyển hướng chính xác tới `https://your-server.com/callback`.

---

#### Cách giải quyết tạm thời (không có thông tin xác thực tùy chỉnh)

Nếu không muốn thiết lập thông tin xác thực của riêng mình ngay bây giờ, bạn vẫn có thể sử dụng **luồng URL thủ công**:

1. OmniRoute mở URL ủy quyền của Google
2. Sau khi ủy quyền, Google sẽ cố gắng chuyển hướng đến `localhost` (không thành công trên máy chủ từ xa)
3. **Sao chép URL đầy đủ** từ thanh địa chỉ trình duyệt của bạn (ngay cả khi trang không tải)
4. Dán URL đó vào trường hiển thị trong phương thức kết nối OmniRoute
5. Nhấp vào **"Kết nối"**

> Điều này có tác dụng vì mã ủy quyền trong URL hợp lệ bất kể trang chuyển hướng có được tải hay không.

---

<details>
<summary><b>🇧🇷 Phiên bản tiếng Bồ Đào Nha</b></summary>

#### Vì bạn muốn OAuth làm AntiGravity / Gemini CLI có bị ảnh hưởng bởi các dịch vụ điều khiển từ xa không?

Os đã được chứng minh **AntiGravity** e **Gemini CLI** sử dụng **Google OAuth 2.0** để xác thực. O Google exige que a `redirect_uri` usada no fluxo OAuth seja **exatamente** một das URI trước cadastradas no Google Cloud Console để ứng dụng.

Vì các thông tin xác thực OAuth không có OmniRoute estão cadastradas **apenas para `localhost`**. Bạn có thể truy cập OmniRoute bằng cách điều khiển lại máy chủ (ví dụ: `https://omniroute.meuservidor.com`), hoặc Google đưa ra xác thực với:

```
Error 400: redirect_uri_mismatch
```

#### Giải pháp: Định cấu hình thông tin đăng nhập OAuth

Bạn nên chú ý **OAuth 2.0 Client ID** không có Google Cloud Console vì URI làm dịch vụ của bạn.

#### Vượt qua một lần nữa

**1. Truy cập vào Google Cloud Console**

Abra: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. Hãy yêu cầu ID ứng dụng khách OAuth 2.0 mới**

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

Agora hoặc Google chuyển hướng điều chỉnh cho `https://seu-servidor.com/callback` và một chức năng xác thực.

---

#### Thời gian giải quyết (sem configurar credenciais próprias)

Nếu không có câu hỏi nào về thông tin xác thực trước đây, bạn có thể sử dụng thông tin **hướng dẫn sử dụng URL**:

1. O OmniRoute tìm kiếm URL tự động của Google
2. Sau khi bạn tự động đăng ký, hoặc chuyển hướng Google sang `localhost` (bạn không thể điều chỉnh lại dịch vụ)
3. **Sao chép một URL hoàn chỉnh** da cuối cùng của trình duyệt của bạn (mesmo que a página not carregue)
4. URL này không có khả năng xuất hiện không có phương thức kết nối nào với OmniRoute
5. Kết nối với nhau **"Kết nối"**

> Chức năng giải pháp này có thể giúp tự động cấp quyền cho URL và có thể chuyển hướng độc lập đến mục tiêu hoặc không.

</details>

---

</details>

## 🛠️ Ngăn xếp công nghệ

<details>
<summary><b>Nhấp để mở rộng chi tiết về ngăn xếp công nghệ</b></summary>

- **Thời gian chạy**: Node.js 18–22 LTS (⚠️ Node.js 24+ **không được hỗ trợ** — `better-sqlite3` nhị phân gốc không tương thích)
- **Ngôn ngữ**: TypeScript 5.9 — **100% TypeScript** trên `src/` và `open-sse/` (không `any` trong các mô-đun lõi kể từ phiên bản 2.0)
- **Khung**: Next.js 16 + React 19 + Tailwind CSS 4
- **Cơ sở dữ liệu**: LowDB (JSON) + SQLite (trạng thái miền + nhật ký proxy + kiểm tra MCP + quyết định định tuyến)
- **Lược đồ**: Zod (xác thực I/O công cụ MCP, hợp đồng API)
- **Giao thức**: MCP (stdio/HTTP) + A2A v0.3 (JSON-RPC 2.0 + SSE)
- **Truyền phát**: Sự kiện do máy chủ gửi (SSE)
- **Xác thực**: OAuth 2.0 (PKCE) + JWT + Khóa API + Ủy quyền trong phạm vi MCP
- **Thử nghiệm**: Trình chạy thử nghiệm Node.js + Vitest (hơn 900 thử nghiệm bao gồm đơn vị, tích hợp, E2E)
- **CI/CD**: GitHub Actions (tự động xuất bản npm + Docker Hub khi phát hành)
- **Trang web**: [omniroute.online](https://omniroute.online)
- **Gói**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Khả năng phục hồi**: Ngắt mạch, lùi theo cấp số nhân, chống sấm sét bầy đàn, giả mạo TLS, tự động kết hợp tự phục hồi

</details>

---

## 📖 Tài liệu

| Tài liệu                                       | Mô tả                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)               | Nhà cung cấp, combo, tích hợp CLI, triển khai                    |
| [API Reference](docs/API_REFERENCE.md)         | Tất cả các điểm cuối có ví dụ                                    |
| [MCP Server](open-sse/mcp-server/README.md)    | 16 công cụ MCP, cấu hình IDE, máy khách Python/TS/Go             |
| [A2A Server](src/lib/a2a/README.md)            | Giao thức JSON-RPC 2.0, kỹ năng, phát trực tuyến, quản lý tác vụ |
| [Auto-Combo Engine](docs/auto-combo.md)        | Chấm điểm 6 yếu tố, gói chế độ, tự phục hồi                      |
| [Troubleshooting](docs/TROUBLESHOOTING.md)     | Các vấn đề thường gặp và giải pháp                               |
| [Architecture](docs/ARCHITECTURE.md)           | Kiến trúc hệ thống và nội bộ                                     |
| [Contributing](CONTRIBUTING.md)                | Thiết lập và hướng dẫn phát triển                                |
| [OpenAPI Spec](docs/openapi.yaml)              | Đặc tả OpenAPI 3.0                                               |
| [Security Policy](SECURITY.md)                 | Báo cáo lỗ hổng bảo mật và thực hành bảo mật                     |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md)   | Hướng dẫn đầy đủ: Thiết lập VM + nginx + Cloudflare              |
| [Features Gallery](docs/FEATURES.md)           | Tham quan bảng điều khiển trực quan với ảnh chụp màn hình        |
| [Release Checklist](docs/RELEASE_CHECKLIST.md) | Các bước xác thực trước khi phát hành                            |

---

## 🗺️ Lộ trình

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

> 📝 Thông số kỹ thuật đầy đủ tính năng có sẵn trong [**OMNI_TOKEN_342**](docs/new-features/) (217 thông số kỹ thuật chi tiết)

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
gh release create v2.0.0 --title "v2.0.0" --generate-notes
```

---

## 📊 Lịch sử ngôi sao

## Nhà chiêm tinh theo thời gian

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
<!-- Thảo luận GitHub được bật cho phần Hỏi đáp cộng đồng -->
