# Homologation Suite (`npm run homolog`) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Xác thực E2E trong môi trường thực cho bản triển khai OmniRoute đang chạy trên VPS homologation
(`HOMOLOG_BASE_URL`, ví dụ: `http://192.168.0.15:20128`). Một lệnh duy nhất thay thế danh sách kiểm tra
STOP #2 thủ công khi phát hành bằng một lượt chạy tự động có tạo bằng chứng.

## Phạm vi kiểm tra

| Tầng                     | Nội dung kiểm tra                                                                                                                                                                                            | Triển khai                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| L0 — sức khỏe/tương đồng | `/api/monitoring/health` phản hồi `200` với `status: "healthy"` và phiên bản dự kiến                                                                                                                         | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — khóa tạm thời      | Đăng nhập quản trị viên → `POST /api/keys` tạo một khóa API có phạm vi cho lượt chạy, sau đó thu hồi (`DELETE /api/keys/:id`) trong khối `finally` bất kể kết quả                                            | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — bề mặt API         | Danh mục `/v1/models`, một yêu cầu hoàn tất trò chuyện thực tế không truyền luồng (mô hình trọng yếu theo tầng, `max_tokens: 5`), phản hồi `401` cho khóa không hợp lệ và `/api/monitoring/health` công khai | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — truyền luồng SSE   | Yêu cầu hoàn tất trò chuyện truyền luồng thực tế; xác nhận `text/event-stream`, có ít nhất một delta nội dung và dấu kết thúc `[DONE]`                                                                       | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — nhà cung cấp thực   | Một yêu cầu trò chuyện với chi phí tối thiểu cho mỗi nhà cung cấp trọng yếu có trong danh mục `/v1/models` trực tiếp, được tạo tức thời qua promptfoo                                                        | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — xác thực UI        | Đăng nhập một lần qua biểu mẫu đăng nhập thực tế và tái sử dụng phiên (`storageState`) trên toàn bộ tầng UI                                                                                                  | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — các tuyến UI       | Mọi `page.tsx` tĩnh trong `src/app/(dashboard)/dashboard` (được phát hiện từ hệ thống tệp, bỏ qua các tuyến động `[param]`) đều tải mà không có lỗi HTTP, lỗi trang hoặc ranh giới lỗi Next.js               | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — luồng UI trọng yếu | Tạo một khóa API thông qua UI bảng điều khiển rồi thu hồi khóa đó (không để lại dữ liệu dư thừa trên VPS)                                                                                                    | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — báo cáo hợp nhất    | Hợp nhất httpYac (qua `junit-to-ctrf`), bộ chuyển đổi promptfoo→CTRF và trình báo cáo CTRF của Playwright thành một `homolog-ctrf.json`, cùng với `homolog-report/summary.md` dễ đọc                         | `scripts/homolog/run.mjs`                                                     |

Không có sự tham gia của LLM trong chính quá trình chạy lại — đây là một bộ kiểm thử hồi quy có tính xác định,
không phải một bài đánh giá. AI chỉ được sử dụng trong công việc bảo trì trong tương lai (xem Lộ trình bên dưới).

## Điều kiện tiên quyết

1. Sao chép `.env.homolog.example` thành `.env.homolog` (được gitignore — tuyệt đối không commit tệp này) và điền:
   - `HOMOLOG_BASE_URL` — bản triển khai đích, ví dụ: `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — mật khẩu quản trị dashboard của bản triển khai đó.
   - `HOMOLOG_CRITICAL_PROVIDERS` — các tiền tố provider được phân tách bằng dấu phẩy sẽ nhận một yêu cầu smoke chat thực
     (ví dụ: `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — để trống trong các lần chạy thông thường; bộ kiểm thử sẽ tạo và thu hồi
     khóa tạm thời của riêng nó. Chỉ thiết lập biến này để gỡ lỗi riêng một lớp độc lập.
2. Chạy `npm install` trong repo (các dependency của bộ kiểm thử — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — là các devDependencies thông thường).
3. Chạy `npx playwright install` nếu chưa có các tệp nhị phân của trình duyệt.

## Cách chạy

```bash
npm run homolog
```

Để xác thực với một bản triển khai có phiên bản không khớp với `package.json` cục bộ
(ví dụ: một máy homologation vẫn đang ở bản vá trước đó), hãy ghi đè phiên bản mong đợi
một cách rõ ràng:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Lần chạy sẽ thoát với mã khác 0 nếu bất kỳ lớp nào thất bại và luôn cố gắng thu hồi khóa
API tạm thời đã tạo, ngay cả khi có lỗi (khối `finally` trong `scripts/homolog/run.mjs`).

## Đọc báo cáo

Toàn bộ đầu ra được lưu trong `homolog-report/` (được gitignore):

- `summary.md` — cùng bảng được in ra stdout, mỗi lớp một hàng (✅/❌ + chi tiết).
- `homolog-ctrf.json` — báo cáo CTRF hợp nhất (kết hợp kết quả API/SSE, provider-smoke và
  UI) — đây là artifact cần đính kèm vào checklist STOP #2 của một bản phát hành.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — các
  báo cáo thô/trung gian của từng lớp.
- `promptfooconfig.yaml`, `provider-misses.json` — cấu hình promptfoo được tạo cho
  lần chạy hiện tại và mọi provider trọng yếu bị thiếu trong danh mục đang hoạt động.

L0 thất bại sẽ hủy ngay lập tức (không tạo khóa tạm thời), vì phiên bản/trạng thái
sức khỏe không khớp đồng nghĩa với việc mọi lớp tiếp theo sẽ xác thực nhầm bản triển khai.

## Thiết lập lại baseline khi UI thay đổi hợp lệ

L4b (smoke tuyến) và L4c (luồng UI của khóa API) được điều khiển bằng các locator DOM thực,
không phải snapshot, vì vậy phần lớn thay đổi UI hợp lệ không yêu cầu cập nhật bộ kiểm thử. Khi một thay đổi
làm hỏng locator (ví dụ: nhãn nút được đổi tên hoặc trang cài đặt được chuyển vị trí):

1. Xác nhận lại locator dựa trên mã nguồn hiện tại (các spec đã ghi rõ từng locator được xác nhận
   dựa trên tệp/dòng nào — hãy làm theo cùng mẫu đó, đừng phỏng đoán).
2. Cập nhật spec trong `tests/homolog/ui/`.
3. Chạy lại `npm run homolog` (hoặc chỉ spec Playwright bị ảnh hưởng) với VPS để
   xác nhận bản sửa lỗi, sau đó commit.

Bộ kiểm thử này không có baseline hình ảnh/pixel (F1) — xem Lộ trình để biết thêm.

## Lộ trình (F2 / F3)

Thiết kế và quá trình triển khai theo từng giai đoạn nằm trong spec lập kế hoạch nội bộ
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (không có liên kết — artifact
nội bộ trong `_tasks/`, không thuộc tài liệu được theo dõi của repo này). Tóm tắt:

- **F2** — ghi lại toàn bộ quy trình hướng dẫn → Playwright Test Agents (`planner`/`generator`)
  chuyển quy trình đó thành các flow spec (tạo combo, kiểm thử provider, chỉnh sửa cài đặt, công cụ MCP) +
  baseline hồi quy hình ảnh (Lost Pixel) với các vùng che trên dữ liệu động (số liệu,
  dấu thời gian, nhật ký) + quy trình bảo trì `healer` cho mỗi bản phát hành.
- **F3** — phạm vi kiểm thử khả năng phục hồi/hợp đồng/kết nối: toxiproxy + một provider giả lập tương thích OpenAI
  trên devbox, một combo `homolog-resilience` trên VPS trỏ đến provider đó
  (chèn timeout → xác nhận fallback + circuit breaker mở/đóng thông qua
  `/api/monitoring/health`); kiểm thử hợp đồng Schemathesis có kiểm soát dựa trên
  `docs/openapi.yaml` (`--max-examples` thấp, seed cố định, chỉ các endpoint không dùng LLM); và
  tích hợp `npm run homolog` cùng `summary.md` của nó vào giai đoạn STOP #2 của `/generate-release`.
