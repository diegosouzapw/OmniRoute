# CLAUDE.md (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Tệp này cung cấp hướng dẫn cho Claude Code (claude.ai/code) khi làm việc với mã trong kho lưu trữ này.

## Bắt đầu nhanh

```bash
npm install                    # Cài đặt deps (tự động tạo .env từ .env.example)
npm run dev                    # Máy chủ phát triển tại http://localhost:20128
npm run build                  # Xây dựng sản phẩm (Next.js 16 độc lập)
npm run lint                   # ESLint (0 lỗi mong đợi; cảnh báo là có sẵn trước)
npm run typecheck:core         # Kiểm tra TypeScript (nên sạch)
npm run typecheck:noimplicit:core  # Kiểm tra nghiêm ngặt (không có implicit any)
npm run test:coverage          # Kiểm tra đơn vị + cổng độ phủ (75/75/75/70 — câu lệnh/dòng/chức năng/nhánh)
npm run check                  # lint + kiểm tra kết hợp
npm run check:cycles           # Phát hiện phụ thuộc vòng
```

### Chạy kiểm tra

```bash
# Tệp kiểm tra đơn (trình chạy kiểm tra gốc của Node.js — hầu hết các bài kiểm tra)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (máy chủ MCP, autoCombo, cache)
npm run test:vitest

# Tất cả các bộ
npm run test:all
```

Để biết ma trận kiểm tra đầy đủ, xem `CONTRIBUTING.md` → "Chạy kiểm tra". Để biết kiến trúc sâu, xem `AGENTS.md`.

---

## Dự án tổng quan

**OmniRoute** — proxy/router AI thống nhất. Một điểm cuối, 160+ nhà cung cấp LLM, tự động chuyển tiếp.

| Lớp           | Vị trí                  | Mục đích                                                                  |
| ------------- | ----------------------- | ------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — điểm vào                                             |
| Handlers      | `open-sse/handlers/`    | Xử lý yêu cầu (chat, nhúng, v.v.)                                         |
| Executors     | `open-sse/executors/`   | Phân phối HTTP theo nhà cung cấp                                          |
| Translators   | `open-sse/translator/`  | Chuyển đổi định dạng (OpenAI↔Claude↔Gemini)                               |
| Transformer   | `open-sse/transformer/` | API phản hồi ↔ Hoàn thành trò chuyện                                      |
| Services      | `open-sse/services/`    | Định tuyến kết hợp, giới hạn tỷ lệ, bộ nhớ đệm, v.v.                      |
| Database      | `src/lib/db/`           | Các mô-đun miền SQLite (45+ tệp, 55 di chuyển)                            |
| Domain/Policy | `src/domain/`           | Bộ máy chính sách, quy tắc chi phí, logic chuyển tiếp                     |
| MCP Server    | `open-sse/mcp-server/`  | 37 công cụ (30 cơ bản + 3 bộ nhớ + 4 kỹ năng), 3 phương tiện, ~13 phạm vi |
| A2A Server    | `src/lib/a2a/`          | Giao thức đại lý JSON-RPC 2.0                                             |
| Skills        | `src/lib/skills/`       | Khung kỹ năng có thể mở rộng                                              |
| Memory        | `src/lib/memory/`       | Bộ nhớ hội thoại bền vững                                                 |

Monorepo: `src/` (ứng dụng Next.js 16), `open-sse/` (nơi làm việc của động cơ streaming), `electron/` (ứng dụng máy tính để bàn), `tests/`, `bin/` (điểm vào CLI).

---

## Pipeline Yêu Cầu

```
Client → /v1/chat/completions (route Next.js)
  → CORS → xác thực Zod → xác thực? → kiểm tra chính sách → bảo vệ tiêm prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → kiểm tra bộ nhớ đệm → giới hạn tần suất → định tuyến combo?
      → resolveComboTargets() → handleSingleModel() cho từng mục tiêu
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → thử lại với backoff
    → dịch phản hồi → luồng SSE hoặc JSON
    → Nếu Responses API: responsesTransformer.ts TransformStream
```

Các route API tuân theo một mẫu nhất quán: `Route → CORS preflight → xác thực body Zod → xác thực tùy chọn (extractApiKey/isValidApiKey) → thực thi chính sách API key → ủy quyền Handler (open-sse)`. Không có middleware Next.js toàn cục — việc chặn là cụ thể cho route.

**Định tuyến combo** (`open-sse/services/combo.ts`): 14 chiến lược (ưu tiên, trọng số, điền trước, vòng tròn, P2C, ngẫu nhiên, ít sử dụng nhất, tối ưu chi phí, nhận thức reset, ngẫu nhiên nghiêm ngặt, tự động, lkgp, tối ưu ngữ cảnh, chuyển tiếp ngữ cảnh). Mỗi mục tiêu gọi `handleSingleModel()` bao bọc `handleChatCore()` với xử lý lỗi theo từng mục tiêu và kiểm tra cầu dao. Xem `docs/routing/AUTO-COMBO.md` cho điểm số Auto-Combo 9 yếu tố và `docs/architecture/RESILIENCE_GUIDE.md` cho 3 lớp độ bền.

---

## Trạng Thái Thời Gian Chạy Độ Bền

OmniRoute có ba cơ chế tạm thời liên quan nhưng khác biệt về lỗi. Giữ cho phạm vi của chúng tách biệt khi gỡ lỗi hành vi định tuyến. Xem
[biểu đồ độ bền 3 lớp](./docs/diagrams/exported/resilience-3layers.svg)
(nguồn: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
để có cái nhìn tổng quan.

### Cầu Dao Nhà Cung Cấp

**Phạm vi**: toàn bộ nhà cung cấp, ví dụ: `glm`, `openai`, `anthropic`.

**Mục đích**: ngừng gửi lưu lượng đến một nhà cung cấp đang liên tục thất bại ở
cấp upstream/dịch vụ, để một nhà cung cấp không khỏe mạnh không làm chậm mọi yêu cầu.

**Triển khai**:

- Lớp cốt lõi: `src/shared/utils/circuitBreaker.ts`
- Kết nối gate/thực thi chat: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API trạng thái thời gian chạy: `src/app/api/monitoring/health/route.ts`
- Các wrapper chia sẻ: `open-sse/services/accountFallback.ts`
- Bảng trạng thái đã lưu: `domain_circuit_breakers`

**Trạng thái**:

- `CLOSED`: lưu lượng bình thường được phép.
- `OPEN`: nhà cung cấp bị chặn tạm thời; người gọi nhận phản hồi nhà cung cấp-circuit-open
  hoặc định tuyến combo bỏ qua đến một mục tiêu khác.
- `HALF_OPEN`: thời gian reset đã trôi qua; cho phép một yêu cầu kiểm tra. Thành công đóng
  cầu dao, thất bại mở lại nó.

**Mặc định** (`open-sse/config/constants.ts`):

- Nhà cung cấp OAuth: ngưỡng `3`, thời gian reset `60s`.
- Nhà cung cấp API-key: ngưỡng `5`, thời gian reset `30s`.
- Nhà cung cấp địa phương: ngưỡng `2`, thời gian reset `15s`.

Chỉ các trạng thái lỗi cấp nhà cung cấp mới nên kích hoạt cầu dao nhà cung cấp:

```ts
(408, 500, 502, 503, 504);
```

Không kích hoạt cầu dao toàn bộ nhà cung cấp cho các lỗi tài khoản/key/model bình thường như hầu hết
các trường hợp `401`, `403`, hoặc `429`. Những trường hợp đó thường thuộc về thời gian làm mát kết nối hoặc khóa model. Một nhà cung cấp API-key chung `403` nên có thể phục hồi trừ khi nó được phân loại
là lỗi nhà cung cấp/tài khoản cuối cùng.

Cầu dao sử dụng phục hồi lười biếng, không phải bộ đếm thời gian nền. Khi `OPEN` hết hạn, các
đọc như `getStatus()`, `canExecute()`, và `getRetryAfterMs()` làm mới trạng thái thành
`HALF_OPEN`, để các bảng điều khiển và các trình tạo ứng viên combo không liên tục loại trừ một
nhà cung cấp đã hết hạn mãi mãi.

### Thời Gian Làm Mát Kết Nối

**Phạm vi**: một kết nối/tài khoản/key nhà cung cấp.

**Mục đích**: tạm thời bỏ qua một key/tài khoản xấu trong khi cho phép các kết nối khác cho
cùng một nhà cung cấp tiếp tục phục vụ yêu cầu.

**Triển khai**:

- Đường dẫn ghi/cập nhật: `src/sse/services/auth.ts::markAccountUnavailable()`
- Lựa chọn/lọc tài khoản: `src/sse/services/auth.ts::getProviderCredentials...`
- Tính toán thời gian làm mát: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Cài đặt: `src/lib/resilience/settings.ts`

Các trường quan trọng trên các kết nối nhà cung cấp:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Trong quá trình lựa chọn tài khoản, một kết nối bị bỏ qua trong khi:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Thời gian làm mát cũng lười biếng: khi `rateLimitedUntil` ở trong quá khứ, kết nối trở nên
đủ điều kiện một lần nữa. Khi sử dụng thành công, `clearAccountError()` xóa `testStatus`,
`rateLimitedUntil`, các trường lỗi, và `backoffLevel`.

Hành vi thời gian làm mát kết nối mặc định:

- Thời gian làm mát cơ bản OAuth: `5s`.
- Thời gian làm mát cơ bản API-key: `3s`.
- API-key `429` nên ưu tiên các gợi ý thử lại upstream (`Retry-After`, tiêu đề reset, hoặc
  văn bản reset có thể phân tích) khi có sẵn.
- Các lỗi phục hồi lặp lại sử dụng backoff theo cấp số nhân:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Bảo vệ chống lại thundering-herd ngăn chặn các lỗi đồng thời trên cùng một kết nối từ
việc liên tục kéo dài thời gian làm mát hoặc tăng gấp đôi `backoffLevel`.

Các trạng thái cuối cùng không phải là thời gian làm mát. `banned`, `expired`, và `credits_exhausted` được
thiết kế để giữ không khả dụng cho đến khi thông tin xác thực/cài đặt thay đổi hoặc một người điều hành đặt lại
chúng. Không ghi đè các trạng thái cuối cùng bằng trạng thái làm mát tạm thời.

### Khóa Model

**Phạm vi**: nhà cung cấp + kết nối + model.

**Mục đích**: tránh vô hiệu hóa toàn bộ kết nối khi chỉ một model không khả dụng hoặc
bị giới hạn hạn ngạch cho kết nối đó.

Ví dụ:

- Các nhà cung cấp hạn ngạch theo model trả về `429`.
- Các nhà cung cấp địa phương trả về `404` cho một model bị thiếu.
- Các lỗi quyền hạn chế theo chế độ/model cụ thể của nhà cung cấp như các chế độ Grok đã chọn.

Khóa model sống trong `open-sse/services/accountFallback.ts` và cho phép cùng một
kết nối tiếp tục phục vụ các model khác.

### Hướng Dẫn Gỡ Lỗi

- Nếu tất cả các key cho một nhà cung cấp bị bỏ qua, hãy kiểm tra cả trạng thái cầu dao nhà cung cấp và từng
  `rateLimitedUntil`/`testStatus` của kết nối.
- Nếu một nhà cung cấp dường như bị loại trừ vĩnh viễn sau cửa sổ reset, hãy kiểm tra xem mã
  có đang đọc `state` thô thay vì sử dụng `getStatus()`/`canExecute()`.
- Nếu một key nhà cung cấp thất bại nhưng những key khác nên hoạt động, hãy ưu tiên thời gian làm mát kết nối hơn
  cầu dao nhà cung cấp.
- Nếu chỉ một model thất bại, hãy ưu tiên khóa model hơn thời gian làm mát kết nối.
- Nếu một trạng thái nên tự phục hồi, nó nên có một dấu thời gian/reset timeout trong tương lai và một
  đường dẫn đọc làm mới trạng thái đã hết hạn. Các trạng thái vĩnh viễn yêu cầu thay đổi thông tin xác thực
  hoặc cấu hình thủ công.

## Các Quy Ước Chính

### Phong Cách Mã

- **2 khoảng trắng**, dấu chấm phẩy, dấu nháy kép, chiều rộng 100 ký tự, dấu phẩy cuối es5 (được thực thi bởi lint-staged thông qua Prettier)
- **Nhập khẩu**: bên ngoài → bên trong (`@/`, `@omniroute/open-sse`) → tương đối
- **Đặt tên**: tệp=camelCase/kebab, thành phần=PascalCase, hằng số=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = lỗi ở mọi nơi; `no-explicit-any` = cảnh báo trong `open-sse/` và `tests/`
- **TypeScript**: `strict: false`, mục tiêu ES2022, mô-đun esnext, phân giải bundler. Ưu tiên kiểu rõ ràng.

### Cơ Sở Dữ Liệu

- **Luôn** đi qua các mô-đun miền `src/lib/db/` — **không bao giờ** viết SQL thô trong các tuyến đường hoặc trình xử lý
- **Không bao giờ** thêm logic vào `src/lib/localDb.ts` (chỉ là lớp xuất lại)
- **Không bao giờ** nhập khẩu từ `localDb.ts` — thay vào đó hãy nhập khẩu các mô-đun cụ thể `db/`
- Singleton DB: `getDbInstance()` từ `src/lib/db/core.ts` (ghi nhật ký WAL)
- Di chuyển: `src/lib/db/migrations/` — tệp SQL có phiên bản, idempotent, chạy trong giao dịch

### Xử Lý Lỗi

- try/catch với các loại lỗi cụ thể, ghi lại với ngữ cảnh pino
- Không bao giờ nuốt lỗi trong các luồng SSE — sử dụng tín hiệu hủy để dọn dẹp
- Trả về mã trạng thái HTTP thích hợp (4xx/5xx)

### Bảo Mật

- **Không bao giờ** sử dụng `eval()`, `new Function()`, hoặc eval ngụ ý
- Xác thực tất cả các đầu vào với các sơ đồ Zod
- Mã hóa thông tin xác thực khi nghỉ (AES-256-GCM)
- Danh sách từ chối tiêu đề upstream: `src/shared/constants/upstreamHeaders.ts` — giữ cho việc làm sạch, các sơ đồ Zod và các bài kiểm tra đơn vị đồng bộ khi chỉnh sửa
- **Thông tin xác thực công khai upstream** (client_id/secret OAuth kiểu Gemini/Antigravity/Windsurf + các khóa Web Firebase được trích xuất từ các CLI công khai): **PHẢI** được nhúng thông qua `resolvePublicCred()` từ `open-sse/utils/publicCreds.ts` — **không bao giờ** dưới dạng chuỗi văn bản. Xem `docs/security/PUBLIC_CREDS.md` để biết mẫu bắt buộc.
- **Phản hồi lỗi** (HTTP / SSE / trình thực thi / trình xử lý MCP): **PHẢI** đi qua `buildErrorBody()` hoặc `sanitizeErrorMessage()` từ `open-sse/utils/error.ts` — **không bao giờ** đưa `err.stack` hoặc `err.message` thô vào thân phản hồi. Xem `docs/security/ERROR_SANITIZATION.md`.
- **Lệnh shell được xây dựng từ các biến**: khi gọi `exec()`/`spawn()` với một tập lệnh cần các giá trị thời gian chạy, hãy truyền chúng qua tùy chọn `env` (tự động được thoát shell) — **không bao giờ** nội suy chuỗi các đường dẫn không đáng tin cậy/external vào thân tập lệnh. Tham khảo: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Thư viện bảo mật theo mặc định** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): ưu tiên Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink hơn các triển khai tùy chỉnh bất cứ khi nào thêm các bề mặt nhạy cảm với bảo mật mới.

---

## Các Tình Huống Sửa Đổi Thông Thường

### Thêm Một Nhà Cung Cấp Mới

1. Đăng ký trong `src/shared/constants/providers.ts` (được xác thực bằng Zod khi tải)
2. Thêm trình thực thi trong `open-sse/executors/` nếu cần logic tùy chỉnh (mở rộng `BaseExecutor`)
3. Thêm trình dịch trong `open-sse/translator/` nếu định dạng không phải OpenAI
4. Thêm cấu hình OAuth trong `src/lib/oauth/constants/oauth.ts` nếu dựa trên OAuth — nếu CLI upstream cung cấp client_id/secret công khai, hãy nhúng thông qua `resolvePublicCred()` (xem `docs/security/PUBLIC_CREDS.md`), **không bao giờ** dưới dạng văn bản
5. Đăng ký các mô hình trong `open-sse/config/providerRegistry.ts`
6. Viết các bài kiểm tra trong `tests/unit/` (bao gồm xác nhận hình dạng publicCreds nếu bạn đã thêm một mặc định nhúng mới)

### Thêm Một Tuyến Đường API Mới

1. Tạo thư mục dưới `src/app/api/v1/your-route/`
2. Tạo `route.ts` với các trình xử lý `GET`/`POST`
3. Theo mẫu: CORS → xác thực thân Zod → xác thực tùy chọn → ủy quyền trình xử lý
4. Trình xử lý nằm trong `open-sse/handlers/` (nhập từ đó, không nội tuyến)
5. Phản hồi lỗi sử dụng `buildErrorBody()` / `errorResponse()` từ `open-sse/utils/error.ts` (tự động được làm sạch — không bao giờ đưa `err.stack` hoặc `err.message` thô vào thân). Xem `docs/security/ERROR_SANITIZATION.md`.
6. Thêm các bài kiểm tra — bao gồm ít nhất một xác nhận rằng các phản hồi lỗi không rò rỉ dấu vết ngăn xếp (`!body.error.message.includes("at /")`)

### Thêm Một Mô-đun DB Mới

1. Tạo `src/lib/db/yourModule.ts` — nhập khẩu `getDbInstance` từ `./core.ts`
2. Xuất các hàm CRUD cho bảng miền của bạn
3. Thêm di chuyển trong `src/lib/db/migrations/` nếu cần bảng mới
4. Xuất lại từ `src/lib/localDb.ts` (chỉ thêm vào danh sách xuất lại)
5. Viết các bài kiểm tra

### Thêm Một Công Cụ MCP Mới

1. Thêm định nghĩa công cụ trong `open-sse/mcp-server/tools/` với sơ đồ đầu vào Zod + trình xử lý bất đồng bộ
2. Đăng ký trong bộ công cụ (được kết nối bởi `createMcpServer()`)
3. Gán cho các phạm vi thích hợp
4. Viết các bài kiểm tra (gọi công cụ được ghi lại vào bảng `mcp_audit`)

### Thêm Một Kỹ Năng A2A Mới

1. Tạo kỹ năng trong `src/lib/a2a/skills/` (đã có 5 kỹ năng: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Kỹ năng nhận ngữ cảnh nhiệm vụ (tin nhắn, siêu dữ liệu) → trả về kết quả có cấu trúc
3. Đăng ký trong `A2A_SKILL_HANDLERS` trong `src/lib/a2a/taskExecution.ts`
4. Phơi bày trong `src/app/.well-known/agent.json/route.ts` (Thẻ Đại lý)
5. Viết các bài kiểm tra trong `tests/unit/`
6. Tài liệu trong bảng kỹ năng `docs/frameworks/A2A-SERVER.md`

### Thêm Một Đại Lý Đám Mây Mới

1. Tạo lớp đại lý trong `src/lib/cloudAgent/agents/` mở rộng `CloudAgentBase` (đã có 3 đại lý: codex-cloud, devin, jules)
2. Thực hiện `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Đăng ký trong `src/lib/cloudAgent/registry.ts`
4. Thêm xử lý OAuth/thông tin xác thực nếu cần (`src/lib/oauth/providers/`)
5. Các bài kiểm tra + tài liệu trong `docs/frameworks/CLOUD_AGENT.md`

### Thêm Một Guardrail / Eval / Kỹ Năng / Sự Kiện Webhook Mới

- Guardrail: `src/lib/guardrails/` → tài liệu: `docs/security/GUARDRAILS.md`
- Bộ đánh giá: `src/lib/evals/` → tài liệu: `docs/frameworks/EVALS.md`
- Kỹ năng (sandbox): `src/lib/skills/` → tài liệu: `docs/frameworks/SKILLS.md`
- Sự kiện Webhook: `src/lib/webhookDispatcher.ts` → tài liệu: `docs/frameworks/WEBHOOKS.md`

## Tài liệu tham khảo

Đối với bất kỳ thay đổi nào không tầm thường, hãy đọc tài liệu sâu hơn tương ứng trước:

| Khu vực                                      | Tài liệu                                                          |
| -------------------------------------------- | ----------------------------------------------------------------- |
| Điều hướng repo                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| Kiến trúc                                    | `docs/architecture/ARCHITECTURE.md`                               |
| Tài liệu tham khảo kỹ thuật                  | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (điểm số 9 yếu tố, 14 chiến lược) | `docs/routing/AUTO-COMBO.md`                                      |
| Khả năng phục hồi (3 cơ chế)                 | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Phát lại lý do                               | `docs/routing/REASONING_REPLAY.md`                                |
| Khung kỹ năng                                | `docs/frameworks/SKILLS.md`                                       |
| Hệ thống bộ nhớ (FTS5 + Qdrant)              | `docs/frameworks/MEMORY.md`                                       |
| Đại lý đám mây                               | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Rào cản (PII / tiêm / tầm nhìn)              | `docs/security/GUARDRAILS.md`                                     |
| Thông tin xác thực công khai (Gemini/v.v.)   | `docs/security/PUBLIC_CREDS.md`                                   |
| Làm sạch thông báo lỗi                       | `docs/security/ERROR_SANITIZATION.md`                             |
| Đánh giá                                     | `docs/frameworks/EVALS.md`                                        |
| Tuân thủ / kiểm toán                         | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                     | `docs/frameworks/WEBHOOKS.md`                                     |
| Quy trình ủy quyền                           | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Tàng hình (TLS / dấu vân tay)                | `docs/security/STEALTH_GUIDE.md`                                  |
| Giao thức đại lý (A2A / ACP / Cloud)         | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Máy chủ MCP                                  | `docs/frameworks/MCP-SERVER.md`                                   |
| Máy chủ A2A                                  | `docs/frameworks/A2A-SERVER.md`                                   |
| Tài liệu tham khảo API + OpenAPI             | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Danh mục nhà cung cấp (tự động tạo)          | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Quy trình phát hành                          | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Kiểm tra

| Thông tin               | Lệnh                                                                        |
| ----------------------- | --------------------------------------------------------------------------- |
| Kiểm tra đơn vị         | `npm run test:unit`                                                         |
| Tệp đơn                 | `node --import tsx/esm --test tests/unit/file.test.ts`                      |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                       |
| E2E (Playwright)        | `npm run test:e2e`                                                          |
| Giao thức E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                |
| Hệ sinh thái            | `npm run test:ecosystem`                                                    |
| Cổng bao phủ            | `npm run test:coverage` (75/75/75/70 — statements/lines/functions/branches) |
| Báo cáo bao phủ         | `npm run coverage:report`                                                   |

**Quy tắc PR**: Nếu bạn thay đổi mã sản xuất trong `src/`, `open-sse/`, `electron/`, hoặc `bin/`, bạn phải bao gồm hoặc cập nhật các bài kiểm tra trong cùng một PR.

**Sở thích lớp kiểm tra**: kiểm tra đơn vị trước → tích hợp (nhiều mô-đun hoặc trạng thái DB) → e2e (chỉ UI/workflow). Mã hóa các bản tái hiện lỗi dưới dạng các bài kiểm tra tự động trước hoặc cùng với bản sửa lỗi.

**Chính sách bao phủ Copilot**: Khi một PR thay đổi mã sản xuất và bao phủ dưới 75% (statements/lines/functions) hoặc 70% (branches), không chỉ báo cáo — hãy thêm hoặc cập nhật các bài kiểm tra, chạy lại cổng bao phủ, sau đó yêu cầu xác nhận. Bao gồm các lệnh đã chạy, các tệp kiểm tra đã thay đổi và kết quả bao phủ cuối cùng trong báo cáo PR.

---

## Quy trình Git

```bash
# Không bao giờ cam kết trực tiếp vào nhánh chính
git checkout -b feat/your-feature
git commit -m "feat: mô tả thay đổi của bạn"
git push -u origin feat/your-feature
```

**Tiền tố nhánh**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Định dạng cam kết** (Cam kết thông thường): `feat(db): thêm bộ ngắt mạch` — phạm vi: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Môi trường

- **Thời gian chạy**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, mục tiêu ES2022, mô-đun esnext, giải quyết bundler
- **Biểu thức đường dẫn**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Cổng mặc định**: 20128 (API + bảng điều khiển trên cùng một cổng)
- **Thư mục dữ liệu**: biến môi trường `DATA_DIR`, mặc định là `~/.omniroute/`
- **Các biến môi trường chính**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Thiết lập: `cp .env.example .env` sau đó tạo `JWT_SECRET` (`openssl rand -base64 48`) và `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Quy tắc cứng

1. Không bao giờ cam kết bí mật hoặc thông tin xác thực
2. Không bao giờ thêm logic vào `localDb.ts`
3. Không bao giờ sử dụng `eval()` / `new Function()` / eval ngụ ý
4. Không bao giờ cam kết trực tiếp vào `main`
5. Không bao giờ viết SQL thô trong các tuyến đường — sử dụng các mô-đun trong `src/lib/db/`
6. Không bao giờ âm thầm nuốt lỗi trong các luồng SSE
7. Luôn xác thực đầu vào với các sơ đồ Zod
8. Luôn bao gồm các bài kiểm tra khi thay đổi mã sản xuất
9. Bao phủ phải giữ ≥75% (statements, lines, functions) / ≥70% (branches). Hiện tại đo được: ~82%.
10. Không bao giờ bỏ qua các hooks của Husky (`--no-verify`, `--no-gpg-sign`) mà không có sự chấp thuận rõ ràng từ người điều hành.
11. Không bao giờ nhúng client_id/secret OAuth công khai upstream hoặc các khóa Firebase Web dưới dạng chuỗi văn bản — luôn thông qua `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Xem `docs/security/PUBLIC_CREDS.md`.
12. Không bao giờ trả về `err.stack` / `err.message` thô trong phản hồi HTTP / SSE / executor — luôn định tuyến qua `buildErrorBody()` hoặc `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Xem `docs/security/ERROR_SANITIZATION.md`.
13. Không bao giờ nội suy chuỗi các đường dẫn bên ngoài hoặc giá trị thời gian chạy vào các tập lệnh shell được truyền cho `exec()`/`spawn()` — hãy truyền qua tùy chọn `env` thay vào đó. Tham khảo: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Không bao giờ bỏ qua một cảnh báo CodeQL / Secret-Scanning mà không (a) trước tiên kiểm tra tài liệu mẫu ở trên để xem liệu trợ giúp có áp dụng hay không, và (b) ghi lại lý do kỹ thuật trong bình luận từ chối. Tiền lệ: `js/stack-trace-exposure` được nêu trên các điểm gọi đã định tuyến qua `sanitizeErrorMessage()` là một giới hạn đã biết của CodeQL (các bộ làm sạch tùy chỉnh không được công nhận) — từ chối như là `false positive` tham chiếu `docs/security/ERROR_SANITIZATION.md`.
15. Không bao giờ tiết lộ các tuyến đường tạo ra các quy trình con (`/api/mcp/`, `/api/cli-tools/runtime/`) mà không có phân loại `isLocalOnlyPath()` trong `src/server/authz/routeGuard.ts`. Việc thực thi loopback xảy ra không điều kiện trước bất kỳ kiểm tra xác thực nào — JWT bị rò rỉ qua đường hầm không thể kích hoạt việc tạo quy trình. Xem `docs/security/ROUTE_GUARD_TIERS.md`.
16. Không bao giờ bao gồm các trailer `Co-Authored-By` ghi nhận trợ lý AI, LLM hoặc tài khoản tự động hóa (ví dụ tên chứa "Claude", "GPT", "Copilot", "Bot"; email tại `anthropic.com` / `openai.com` / địa chỉ `noreply.github.com` thuộc sở hữu của bot). Những trailer như vậy chuyển hướng attribution của commit đến tài khoản bot trên GitHub, ẩn tác giả thực (`diegosouzapw`) trong lịch sử PR. Các cộng tác viên là con người — bao gồm tác giả PR upstream và người báo cáo issue được port vào OmniRoute — CÓ THỂ và NÊN được ghi nhận bằng trailer chuẩn `Co-authored-by: Name <email>`; quy trình upstream-port (`/port-upstream-features`, `/port-upstream-issues`) phụ thuộc vào điều này.
