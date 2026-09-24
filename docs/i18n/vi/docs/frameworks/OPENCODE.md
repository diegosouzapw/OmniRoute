# OpenCode Integration (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **Trạng thái:** Khả dụng rộng rãi.
> **Đối tượng:** Các nhà vận hành kết nối OpenCode với một bản triển khai OmniRoute.
> **Nguồn chính xác (schema cấu hình):** `src/shared/services/opencodeConfig.ts`
> **Nguồn chính xác (gói npm):** `@omniroute/opencode-provider/` (workspace có thể phát hành)

[OpenCode](https://opencode.ai) là một ứng dụng khách AI dạng CLI/desktop có khả năng tác tử. Ứng dụng đọc danh mục nhà cung cấp từ `~/.config/opencode/opencode.json` (hoặc `opencode.jsonc`) và tuân theo schema tại `https://opencode.ai/config.json`. OmniRoute tự cung cấp cho OpenCode dưới dạng một trong các nhà cung cấp đó — mọi yêu cầu đều đi qua bề mặt `/v1` tiêu chuẩn tương thích với OpenAI của OmniRoute, nhờ đó OpenCode tự động hưởng lợi từ tính năng định tuyến Auto-Combo, bộ ngắt mạch, chính sách khóa, khả năng quan sát, v.v.

Có **hai cách tích hợp được hỗ trợ**. Hãy chọn một — cả hai đều tạo ra cùng một cấu hình.

---

## Cách 1 — Trình tạo CLI (không cần cài đặt npm)

Khuyến nghị cho người dùng cuối. Được phân phối cùng OmniRoute. Ghi trực tiếp vào `opencode.json`.

```bash
# Sau khi cài đặt OmniRoute (npm i -g @omniroute/cli hoặc bản sao cục bộ)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

Ở hậu trường, CLI gọi `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`), vì vậy một tệp `opencode.json` hiện có vẫn giữ nguyên các nhà cung cấp và chú thích khác. Mục OmniRoute được thêm/thay thế theo cách nguyên tử.

Tệp kết quả (danh mục mô hình mặc định):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## Cách 2 — Gói npm `@omniroute/opencode-provider`

Khuyến nghị khi bạn tạo cấu hình bằng tập lệnh từ Node/TS (pipeline CI, monorepo, quy trình cài đặt tùy chỉnh).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // Tùy chọn: ghi đè danh mục mô hình được cung cấp cho OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

Để hợp nhất không phá hủy với một tệp hiện có, hãy mô phỏng lại `mergeOpenCodeConfigText()` từ `opencodeConfig.ts` hoặc gọi trình tạo CLI.

Xem [README của gói](../../@omniroute/opencode-provider/README.md) để biết API đầy đủ.

---

## Runtime thực sự làm gì

Cả hai cách đều tạo ra cùng một giá trị `provider.omniroute.npm: "@ai-sdk/openai-compatible"`. Trong thời gian chạy, OpenCode tải `@ai-sdk/openai-compatible` (vốn đã là một phần phụ thuộc bắc cầu của OpenCode) và cấu hình nó bằng `baseURL` + `apiKey`. Từ đó:

```
Giao diện/tác tử OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (bề mặt OpenAI của OmniRoute)
         → trình xử lý OmniRoute /v1/chat/completions (open-sse/handlers/chatCore.ts)
            → định tuyến combo / Auto-Combo / bộ thực thi
               → nhà cung cấp thượng nguồn
```

Plugin không bao giờ trực tiếp xử lý HTTP. Nó chỉ tạo ra cấu hình.

---

## Các giá trị mặc định của danh mục mô hình

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

Bạn có thể ghi đè thông qua `models: [...]`. Các mục bổ sung được khuyến nghị:

- `"auto"` — cung cấp bộ định tuyến không cần cấu hình [Auto-Combo](../routing/AUTO-COMBO.md) của OmniRoute. Cho phép OpenCode chọn "mô hình tốt nhất hiện có" mà không cần bạn mã hóa cứng danh mục.
- `"<combo-name>"` — bất kỳ combo nào bạn đã định nghĩa trong bảng điều khiển; OmniRoute sẽ phân giải combo đó một cách minh bạch.

---

## Chuẩn hóa URL

Trình trợ giúp chấp nhận cả hai dạng và chỉ tạo ra đúng một `/v1`:

| Đầu vào                        | Đầu ra (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

Việc loại bỏ trùng lặp này là **lỗi phổ biến nhất** gặp phải trong các cấu hình cũ. Nếu bạn có tệp `opencode.json` từ trước v3.8.0 trỏ đến `/v1/v1/...`, hãy chạy lại trình tạo hoặc gọi lại `createOmniRouteProvider`.

---

## Các chế độ xác thực

| Cài đặt OmniRoute                                        | Giá trị `apiKey` được khuyến nghị                                           |
| -------------------------------------------------------- | --------------------------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (mặc định cho môi trường cục bộ) | `sk_omniroute` (giá trị giữ chỗ theo nghĩa đen)                             |
| `REQUIRE_API_KEY=true`                                   | Khóa API thực dành riêng cho từng người dùng từ Bảng điều khiển → Khóa API. |

Đối với các máy khách kiểu Anthropic gửi `x-api-key` + `anthropic-version`, `extractApiKey` của OmniRoute cũng chấp nhận khóa từ `x-api-key`. OpenCode sử dụng giao diện OpenAI, vì vậy nó sẽ luôn gửi `Authorization: Bearer ${apiKey}` — trường hợp đặc biệt dành cho Anthropic không áp dụng ở đây.

---

## Khắc phục sự cố

| Triệu chứng                                              | Nguyên nhân                                                                        | Cách khắc phục                                                                                                              |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `404` cho mọi yêu cầu có URL chứa `/v1/v1/`              | Cấu hình cũ từ plugin trước v3.8 đã thêm hậu tố `/v1` hai lần.                     | Tạo lại thông qua Cách 1 hoặc 2.                                                                                            |
| `401 Invalid API key`                                    | OmniRoute có `REQUIRE_API_KEY=true` và khóa không được nhận diện.                  | Tạo khóa trong bảng điều khiển hoặc đặt `REQUIRE_API_KEY=false` (chỉ dành cho môi trường cục bộ) và sử dụng `sk_omniroute`. |
| Danh sách mô hình trống trong giao diện OpenCode         | Cả 4 mô hình mặc định đều bị ẩn trong cài đặt hiển thị nhà cung cấp của OmniRoute. | Truyền `models: ["auto", ...]` để hiển thị các mô hình bạn đã bật.                                                          |
| Lỗi 500 của OpenCode với `cannot read property 'models'` | OpenCode cũ (< 0.1.x) không chấp nhận `models` nội tuyến.                          | Nâng cấp OpenCode lên phiên bản tuân theo lược đồ v1 (`opencode.ai/config.json`).                                           |

---

## Xem thêm

- [Tài liệu tham khảo API](../reference/API_REFERENCE.md) — toàn bộ bề mặt REST của OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — ý nghĩa của `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- Mã nguồn: `src/shared/services/opencodeConfig.ts`, `src/lib/cli-helper/config-generator/opencode.ts`, `@omniroute/opencode-provider/src/index.ts`
