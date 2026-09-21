# Resilience Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute có ba cơ chế phục hồi riêng biệt nhưng có liên quan với nhau. Mỗi cơ chế có phạm vi và mục đích khác nhau. Hãy phân biệt rõ chúng khi gỡ lỗi hành vi định tuyến.

![Mô hình phục hồi 3 lớp](../diagrams/exported/resilience-3layers.svg)

> Nguồn: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Bộ ngắt mạch nhà cung cấp

**Phạm vi:** toàn bộ nhà cung cấp (ví dụ: `glm`, `openai`, `anthropic`).

**Mục đích:** ngừng gửi lưu lượng đến một nhà cung cấp liên tục gặp lỗi ở cấp dịch vụ/thượng nguồn.

**Triển khai:**

- Lớp cốt lõi: `src/shared/utils/circuitBreaker.ts`
- Kết nối: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API trạng thái: `GET /api/monitoring/health`
- API đặt lại: `POST /api/resilience/reset`
- Lớp bao: `open-sse/services/accountFallback.ts`
- Bảng cơ sở dữ liệu: `domain_circuit_breakers`

**Trạng thái:**

- `CLOSED` — cho phép lưu lượng bình thường
- `DEGRADED` — vẫn cho phép lưu lượng, nhưng các lỗi gia tăng của nhà cung cấp đang được theo dõi
- `OPEN` — nhà cung cấp tạm thời bị chặn; định tuyến tổ hợp sẽ bỏ qua nhà cung cấp đó
- `HALF_OPEN` — thời gian chờ đặt lại đã hết; cho phép yêu cầu thăm dò

**Giá trị mặc định có thể cấu hình (`open-sse/config/constants.ts`, được hiển thị trong Bảng điều khiển → Cài đặt → Khả năng phục hồi):**

| Loại    | Suy giảm tại | Mở tại | Thời gian chờ đặt lại |
| ------- | ------------ | ------ | --------------------- |
| OAuth   | 5 lỗi        | 8 lỗi  | 60s                   |
| API-key | 7 lỗi        | 12 lỗi | 30s                   |
| Cục bộ  | được suy ra  | 2 lỗi  | 15s                   |

`degradationThreshold` kiểm soát thời điểm một nhà cung cấp chuyển sang `DEGRADED`; `failureThreshold` kiểm soát thời điểm mạch mở và nhà cung cấp bị bỏ qua. Các hồ sơ nhà cung cấp cục bộ hiện chưa được hiển thị trên trang cài đặt Khả năng phục hồi.

**Mã kích hoạt:** chỉ các trạng thái cấp nhà cung cấp `[408, 500, 502, 503, 504]`. KHÔNG kích hoạt đối với lỗi cấp tài khoản (phần lớn lỗi 401/403/429 — các lỗi này thuộc cơ chế tạm ngưng hoặc khóa).

**Phục hồi lười:** khi trạng thái `OPEN` hết hạn, `getStatus()`, `canExecute()`, `getRetryAfterMs()` sẽ làm mới trạng thái thành `HALF_OPEN`. Không cần bộ hẹn giờ chạy nền.

---

### Cơ chế tạm ngưng nhà cung cấp toàn cục tùy chọn (cổng cửa sổ)

Lớp thứ tư, **tùy chọn bật** (`PROVIDER_COOLDOWN_ENABLED`, mặc định **tắt**), duy trì
bộ nhớ xuyên yêu cầu về các nhà cung cấp gặp lỗi trong
`open-sse/services/providerCooldownTracker.ts`; bộ nhớ này được tham chiếu khi phân giải mục tiêu tổ hợp
để các yêu cầu tổ hợp liên tiếp ngừng thử lại một nhà cung cấp vừa gặp lỗi.
Các mục cấp nhà cung cấp tuân theo cổng cửa sổ `PROVIDER_PROFILES`:

| Hồ sơ    | kích hoạt sau (`providerFailureThreshold`) | trong khoảng (`providerFailureWindowMs`) | tạm ngưng trong (`providerCooldownMs`) |
| -------- | -----------------------------------------: | ---------------------------------------: | -------------------------------------: |
| OAuth    |                                       `10` |                                  `15min` |                                 `5min` |
| Khóa API |                                       `15` |                                  `30min` |                                `10min` |

Khi chưa đạt ngưỡng, nhà cung cấp **không** được coi là đang tạm ngưng; một lần thành công sẽ xóa
cửa sổ. Thay vào đó, các mục cấp kết nối (`provider:connectionId`) giữ nguyên
cơ chế lùi theo cấp số nhân `minRetryCooldownMs → maxRetryCooldownMs`. Các giá trị ghi đè:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Biện pháp bảo vệ chống hồi quy: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Thời gian chờ kết nối

**Phạm vi:** một kết nối/tài khoản/khóa của nhà cung cấp.

**Mục đích:** bỏ qua một khóa gặp lỗi trong khi các kết nối khác của cùng nhà cung cấp vẫn tiếp tục phục vụ.

**Triển khai:**

- Đánh dấu không khả dụng: `src/sse/services/auth.ts::markAccountUnavailable()`
- Lựa chọn: `getProviderCredentials*` trong cùng tệp
- Tính thời gian chờ: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Cài đặt: `src/lib/resilience/settings.ts`

**Các trường cho mỗi kết nối:**

- `rateLimitedUntil` — dấu thời gian cho đến khi thời gian chờ kết thúc
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — bộ đếm thời gian chờ lũy tiến theo hàm mũ

**Thời gian chờ mặc định:**

- OAuth cơ sở: 5 giây
- API-key cơ sở: 3 giây
- API-key 429: ưu tiên `Retry-After`/tiêu đề đặt lại/văn bản đặt lại có thể phân tích được từ thượng nguồn
- Thời gian chờ lũy tiến: `baseCooldownMs * 2 ** failureIndex`

**Cơ chế chống hiệu ứng đám đông:** ngăn các lỗi đồng thời kéo dài thời gian chờ quá mức hoặc tăng `backoffLevel` hai lần.

**Trạng thái cuối (KHÔNG phải thời gian chờ):**

- `banned` — được thiết lập khi phát hiện từ khóa bị cấm/lệnh cấm tài khoản (xem [BAN_DETECTION](../security/BAN_DETECTION.md)) và sau ba lần từ chối liên tiếp theo từng yêu cầu từ thượng nguồn (`request_rejected`, ví dụ: Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); một lần từ chối đơn lẻ chỉ đưa kết nối vào thời gian chờ
- `expired` (chuyển sang trạng thái cuối sau số lần thử lại hữu hạn — `EXPIRED_RETRY_MAX = 3` với thời gian chờ lũy tiến theo hàm mũ — để các lỗi OAuth tạm thời có thể tự khắc phục trước khi tài khoản bị vô hiệu hóa vĩnh viễn)
- `credits_exhausted`

Các trạng thái này được duy trì cho đến khi thông tin xác thực thay đổi hoặc người vận hành đặt lại. Không ghi đè trạng thái cuối bằng trạng thái chờ tạm thời.

**Khôi phục lười:** khi `rateLimitedUntil` đã qua, kết nối sẽ đủ điều kiện trở lại. Khi sử dụng thành công, `clearAccountError()` sẽ xóa tất cả các trường lỗi.

### Liên kết phiên (#7274)

**Phạm vi:** một phiên máy khách (tiêu đề `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) được ghim vào một kết nối, cho **bất kỳ** nhà cung cấp nào.

**Mục đích:** giữ một tác nhân nhiều lượt (Claude Code, aider, tác nhân tùy chỉnh) trên cùng một tài khoản qua nhiều yêu cầu, giảm tình trạng mất ngữ cảnh giữa các tài khoản và các lỗi 429 khi khởi động nguội lặp lại trên những nhà cung cấp có trạng thái phiên theo từng tài khoản.

**Triển khai:**

- Phân giải TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Lựa chọn/tạo ghim: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Trích xuất tiêu đề (chung, cho mọi nhà cung cấp): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Bảng ghim được lưu bền vững: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Cài đặt: `sessionAffinityTtlMs` (TTL toàn cục tính bằng mili giây, `0` để vô hiệu hóa) — `src/lib/db/settings.ts`. Được đổi tên từ `codexSessionAffinityTtlMs` vốn chỉ dành cho Codex thông qua bản di chuyển `124_generic_session_affinity_ttl.sql`, bản này chuyển mọi TTL Codex đã được cấu hình trước đó thành giá trị mặc định mới.

Trước #7274, `resolveSessionAffinityTtlMs()` lập tức trả về `0` cho mọi nhà cung cấp ngoại trừ `codex`, vì vậy cài đặt TTL (và các tiêu đề phiên) không có tác dụng ở bất kỳ nơi nào khác, mặc dù cơ chế ghim và trích xuất tiêu đề vốn đã không phụ thuộc vào nhà cung cấp. Bản sửa lỗi đã loại bỏ việc trả về sớm đó; TTL hiện được áp dụng đồng nhất cho mọi nhà cung cấp sau khi được đặt toàn cục thành giá trị lớn hơn `0`.

Ba tiêu đề liên kết phiên không bao giờ được chuyển tiếp lên thượng nguồn — các trình thực thi tự xây dựng tiêu đề thượng nguồn từ đầu thay vì chuyển tiếp tiêu đề máy khách, vì vậy chúng chỉ đóng vai trò là ID tương quan nội bộ.

### Quyền thuê kết nối phiên được quản lý độc quyền

**Phạm vi:** một máy khách/phiên HTTP được quản lý đang hoạt động sở hữu một kết nối OmniRoute đủ điều kiện.

**Mục đích:** cung cấp quyền sở hữu kết nối độc quyền bền vững cho các máy khách cần một hàng rào định tuyến cứng xuyên suốt các yêu cầu. Điều này khác với liên kết phiên, vốn là một ưu tiên mềm về tính liên tục: quyền thuê độc quyền lưu bền vững trạng thái vòng đời trong SQLite, thực thi tính duy nhất toàn cục của chủ sở hữu đang hoạt động và kết nối đang hoạt động, đồng thời từ chối một thế hệ lỗi thời trước khi chuyển yêu cầu đến nhà cung cấp.

Tính năng này được chọn bật theo từng khóa API. Một khóa được quản lý phải có phạm vi `lease:exclusive` và một danh sách `allowedConnections` rõ ràng, không rỗng. Bất kỳ máy khách HTTP nào cũng có thể sử dụng điểm cuối vòng đời; không yêu cầu tên máy khách, user-agent, nhà cung cấp, phương thức OAuth hay mô hình. Quyền thuê sở hữu một kết nối chứ không phải một mô hình, vì vậy việc thay đổi mô hình vẫn giữ nguyên liên kết miễn là kết nối còn đủ điều kiện theo cách thông thường. Các quy tắc thông thường về mô hình, hạn ngạch, tình trạng, thời gian chờ và danh sách cho phép vẫn có hiệu lực cao nhất và có thể chuyển cùng một thế hệ sang một kết nối đủ điều kiện khác đang rảnh.

Vòng đời sử dụng `POST /api/v1/session-leases` với các hành động JSON `acquire`, `renew` và `release`. Các yêu cầu suy luận được quản lý gửi giá trị `X-OmniRoute-Lease-Owner` không rõ nghĩa và giá trị chính xác `X-OmniRoute-Lease-Generation`. Giá trị chủ sở hữu sử dụng tiền tố `vlo_`, theo sau là 43 ký tự base64url; chỉ hàm băm SHA-256 của giá trị đó được lưu trữ. Mỗi hàng rào điều phối cuối cùng cũng liên kết ID khóa API đã xác thực và ID kết nối đang hoạt động. Các tiêu đề kiểm soát quyền thuê được loại bỏ khỏi nhật ký, ảnh chụp nhanh yêu cầu được lưu giữ và tiêu đề của trình thực thi thượng nguồn.

Nếu định tuyến thông thường có các ứng viên được quản lý đủ điều kiện nhưng mọi ứng viên đang rảnh đều bị một quyền thuê đang hoạt động của chủ sở hữu khác chiếm giữ, OmniRoute sẽ trả về HTTP `429`, mã không còn dung lượng quyền thuê, trạng thái đang chờ dung lượng và một giá trị `Retry-After` có giới hạn được suy ra từ thời điểm hết hạn liên quan sớm nhất. Trường hợp thông thường không có kết nối đủ điều kiện không phải là tranh chấp quyền thuê và vẫn giữ nguyên ngữ nghĩa lỗi định tuyến hiện có.

Các cơ chế liên quan vẫn tách biệt:

- Việc chiếm dụng phiên OAuth là cơ chế phân phối mềm cục bộ trong tiến trình dành cho các tài khoản OAuth.
- Semaphore tài khoản cấp quyền thực hiện yêu cầu đồng thời và kết thúc khi yêu cầu hoàn tất.
- Quyền thuê kết nối phiên được quản lý độc quyền là quyền sở hữu vòng đời bền vững với hàng rào thế hệ.

---

## 3. Khóa mô hình

**Phạm vi:** bộ ba nhà cung cấp + kết nối + mô hình.

**Phạm vi khóa theo trạng thái:** trạng thái lỗi quyết định khóa sẽ được ghi vào khóa nào
(`resolveLockoutScope()` trong `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — tín hiệu về hạn ngạch hoặc quyền sử dụng — khóa **nhóm hạn ngạch**:
  đối với codex là toàn bộ phạm vi `codex` / `spark` (mọi mô hình `gpt-5*` của
  kết nối), còn đối với các nhà cung cấp khác là `getQuotaScopedModelForProvider()`.
- `404` khóa mô hình cụ thể (`getModelLockKey()` thu hẹp phạm vi `not_found`).
- Bất kỳ trạng thái nào khác — lỗi truyền tải/máy chủ `5xx` và lỗi `502` do chính
  OmniRoute tổng hợp từ quá trình xác thực chất lượng — chỉ khóa **chính xác**
  bộ ba nhà cung cấp/kết nối/mô hình. Một luồng lỗi trên một mô hình không phải là
  bằng chứng về hạn ngạch của tài khoản; trước khi có quy tắc này, một phản hồi
  rỗng từ `codex/gpt-5.6-luna` sẽ loại bỏ mọi mô hình `gpt-5*` của kết nối đó khỏi
  quá trình định tuyến trong 2–30 phút (tăng dần), dù hạn ngạch của kết nối vẫn còn nguyên.
- Tùy chọn `scope` do bên gọi chỉ định rõ ràng luôn được ưu tiên (Antigravity truyền `"exact"`).

**Mục đích:** tránh vô hiệu hóa toàn bộ kết nối khi chỉ có một mô hình không khả dụng hoặc bị giới hạn hạn ngạch.

**Ví dụ:**

- Các nhà cung cấp hạn ngạch theo từng mô hình trả về 429
- Các nhà cung cấp cục bộ trả về 404 cho một mô hình bị thiếu
- Lỗi quyền đối với chế độ/mô hình cụ thể của nhà cung cấp (ví dụ: các chế độ Grok)

**Triển khai:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Bảng điều khiển thời gian chờ của mô hình (v3.8.0)

Giao diện người dùng: Cài đặt → Thời gian chờ của mô hình (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Liệt kê các khóa đang hoạt động với: nhà cung cấp, kết nối, mô hình, lý do, expiresAt. Người vận hành có thể bật lại mô hình theo cách thủ công từ thẻ này.

**REST API:**

- `GET /api/resilience/model-cooldowns` — liệt kê các khóa đang hoạt động
- `DELETE /api/resilience/model-cooldowns` — bật lại theo cách thủ công. Nội dung: `{provider, connection, model}`. Xác thực: quản trị.

### Giao diện cài đặt khóa + khôi phục bằng cơ chế suy giảm khi thành công (v3.8.23)

Khóa mô hình đã chuyển từ hành vi được mã hóa cứng và luôn bật thành một
tính năng hoàn toàn có thể cấu hình, được bật theo lựa chọn, với thẻ cài đặt
riêng và cơ chế khôi phục tự phục hồi.

**Thẻ cài đặt:** Cài đặt → Khóa mô hình
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Thẻ này **khác biệt** với `ModelCooldownsCard` chỉ đọc ở trên (thẻ đó chỉ
_liệt kê_ các khóa đang hoạt động) — thẻ mới _cấu hình các tham số_. Các giá trị mặc định
nằm trong `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Cài đặt                 | Mặc định                         | Ý nghĩa                                                            |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `enabled`               | `false`                          | Công tắc chính — khóa mô hình **mặc định bị tắt**.                 |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Các trạng thái từ thượng nguồn được tính là lỗi ở phạm vi mô hình. |
| `baseCooldownMs`        | `120_000` (120 giây)             | Thời lượng khóa ban đầu cho lỗi đầu tiên.                          |
| `maxCooldownMs`         | `1_800_000` (30 phút)            | Giới hạn trên của thời gian chờ tăng dần.                          |
| `maxBackoffSteps`       | `10`                             | Số bước tăng lùi theo cấp số nhân tối đa.                          |
| `useExponentialBackoff` | `true`                           | Có tăng thời gian chờ theo cấp số nhân khi lỗi lặp lại hay không.  |

Các cài đặt được duy trì thông qua kho cài đặt thông thường và được xác thực bằng
lược đồ cài đặt khả năng phục hồi; thẻ giới hạn `baseCooldownMs`/`maxCooldownMs`
(với `maxCooldownMs ≥ baseCooldownMs`) và `maxBackoffSteps`.

**Khôi phục bằng cơ chế suy giảm khi thành công:** việc khôi phục **không** chỉ dựa trên thời điểm bộ hẹn giờ hết hạn. Một
phản hồi bình thường sẽ giảm dần số lần lỗi của mô hình, để một mô hình đã phục hồi
giữa khoảng thời gian khóa ngừng tăng mức khóa (và được xóa khóa) trước khi bộ hẹn giờ kết thúc. Khi một
mục tiêu tổ hợp thành công, `open-sse/services/combo.ts` gọi `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), hàm này **giảm một nửa** giá trị
`failureCount` đã lưu (`Math.floor(failureCount / 2)`); khi giá trị đạt `0`, mục khóa
sẽ bị xóa hoàn toàn. Hàm đối ứng `recordModelLockoutFailure()`
tăng số đếm (và tăng thời gian chờ) khi xảy ra lỗi trong
khoảng thời gian tăng mức. Cơ chế suy giảm khi thành công này bổ sung cho việc bộ hẹn giờ hết hạn thông thường —
một trong hai cơ chế đều có thể bật lại mô hình.

**Trạng thái:** các khóa được lưu **trong bộ nhớ** (các `Map` theo từng tiến trình chứa
`ModelLockoutEntry`, được định danh bằng `provider:connectionId:model`; các khóa có phạm vi chính xác được định danh bằng
`provider:connectionId:exact:model`), không được lưu vào
DB — chúng sẽ mất khi khởi động lại. _Cài đặt_ được lưu bền vững; _trạng thái_ khóa đang hoạt động chỉ là tạm thời.

---

## 4. Kiểm soát đồng thời theo quota-share (v3.8.36)

Các tài khoản đăng ký (GLM, MiniMax, v.v.) thường chỉ chấp nhận khoảng 1–3 yêu cầu đồng thời; vượt quá giới hạn đó sẽ kích hoạt lỗi 429 và thời gian tạm ngưng. Vấn đề này đặc biệt nghiêm trọng với các tổ hợp **quota-share** (`qtSd/…`), trong đó nhiều khóa API dùng chung một tài khoản thượng nguồn. Ba lớp bảo vệ giúp ngăn tài khoản dùng chung bị quá tải.

### Giới hạn đồng thời cho mỗi kết nối (`max_concurrent`)

Mỗi kết nối nhà cung cấp có thể khai báo một mức trần `max_concurrent`
(`provider_connections.max_concurrent`, được thiết lập trong hộp thoại kết nối / API / DB).
Để trống nếu không muốn giới hạn. Đây là tham số duy nhất điều khiển lớp tuần tự hóa bên dưới — hãy đặt nó bằng mức đồng thời thực tế của tài khoản (ví dụ: GLM ~1, MiniMax ~2).

### Tuần tự hóa yêu cầu quota-share

Khi một lần điều phối quota-share nhắm đến kết nối khai báo `max_concurrent`
dương, các yêu cầu đồng thời tới **tài khoản** đó được tuần tự hóa thông qua một semaphore theo từng kết nối (khóa `qsconn:<connectionId>`): các yêu cầu vượt quá giới hạn sẽ **chờ trong hàng đợi** thay vì làm quá tải tài khoản. Cơ chế này là **fail-open** — khi hàng đợi bão hòa hoặc hết thời gian chờ, yêu cầu sẽ tiếp tục mà không cần giữ một suất, thay vì từ chối một yêu cầu có thể điều phối. Bật/tắt tại **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, mặc định
bật). Nếu không có giới hạn `max_concurrent`, hành vi không thay đổi.

> Cổng định tuyến quota-share (`selectQuotaShareTarget`, DRR + P2C) bản thân nó
> cũng là fail-open và chỉ _giảm độ ưu tiên_ của một kết nối đã đạt giới hạn — với
> nhóm chỉ có một kết nối, nó không thể áp giới hạn cứng, vì vậy semaphore này mới là cơ chế thực sự
> kiểm soát lưu lượng dồn dập.

### Thử lại có nhận biết thời gian tạm ngưng của tổ hợp

Đối với mọi chiến lược tổ hợp (khi được bật), một yêu cầu có khả năng dẫn đến lỗi 429
do thời gian tạm ngưng tạm thời NGẮN sẽ chờ hết thời gian đó rồi điều phối lại thay vì
trả về lỗi 429 — cơ chế này bao phủ các cửa sổ TPM/RPM kiểu Gemini (retry-after khoảng 60 giây)
trên các tổ hợp nhiều mô hình, ví dụ: cả hai đích của một tổ hợp 2 mô hình đều chạm giới hạn tốc độ
theo từng mô hình. Được giới hạn bởi `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) trong **Settings → Resilience**. Cơ chế này không bao giờ chờ đối với `quota_exhausted`
(bị khóa cho đến nửa đêm) hoặc các nguyên nhân xác thực/không tìm thấy.

---

## 5. Kiểm soát tiếp nhận hàng đợi yêu cầu (v3.8.49 · issue #6593)

**Phạm vi**: hàng đợi giới hạn tốc độ cục bộ theo từng nhà cung cấp+kết nối (`open-sse/services/rateLimitManager.ts`,
được hỗ trợ bởi Bottleneck), nằm dưới ba cơ chế nêu trên một lớp.

**`maxWaitMs` là tên lưu trữ cũ dành cho thời hạn thực thi.**
`resilienceSettings.requestQueue.maxWaitMs` được truyền tới Bottleneck dưới dạng
`expiration` của một tác vụ, với bộ đếm thời gian chỉ bắt đầu sau khi điều phối. Do đó, nó giới hạn
thời gian thực thi do bộ giới hạn quản lý, chứ không phải thời gian nằm trong hàng đợi cục bộ. Việc hết hạn
được biểu thị dưới dạng `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` cục bộ đáng tin cậy (HTTP 504);
tên mã hết thời gian chờ trong hàng đợi trước đây chỉ được chấp nhận để đảm bảo khả năng tương thích ngược
nội bộ đáng tin cậy. Giá trị mặc định là 15000ms; ghi đè qua
`RATE_LIMIT_MAX_WAIT_MS` (env) hoặc bảng điều khiển (**Settings → Resilience**,
giới hạn giao diện người dùng là 1–30000ms). Thời gian lưu lại trong hàng đợi không có hạn chót; hãy dùng
`maxQueueDepth` bên dưới để giới hạn số bên gọi đang xếp hàng.

**`maxQueueDepth` — giới hạn tiếp nhận tùy chọn (mới).** `resilienceSettings.requestQueue.maxQueueDepth`
giới hạn số lượng yêu cầu có thể nằm trong hàng đợi (chưa được điều phối) đồng thời cho một
nhà cung cấp+kết nối. Khi hàng đợi đã chứa `maxQueueDepth`
yêu cầu, một yêu cầu mới sẽ bị từ chối nhanh với lỗi có kiểu
`code: "RATE_LIMIT_QUEUE_FULL"` **trước khi** nó đến được `limiter.schedule()`
— vì vậy việc từ chối có chi phí thấp và diễn ra trước mọi công việc
nén lời nhắc / dịch thuật ở hạ nguồn dành cho yêu cầu đó. Giá trị mặc định `0` =
vô hiệu hóa, duy trì hành vi hàng đợi không giới hạn hiện có; phạm vi giới hạn là 0–100000.
Ghi đè qua `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) hoặc
`resilienceSettings.requestQueue.maxQueueDepth` (bản vá qua bảng điều khiển/API).

Bản thân phép kiểm tra tiếp nhận là một hàm thuần
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), vì vậy
có thể kiểm thử đơn vị mà không cần một bộ giới hạn Bottleneck thực.

> RFC khởi tạo #6593 cũng đề xuất một cờ `bypassCompressionOnRateLimit`.
> Pipeline `open-sse/services/compression/` của repo này thực hiện
> nén lời nhắc/ngữ cảnh trên yêu cầu LLM gửi đi (`chatCore.ts`,
> quanh khối `resolveCompressionSettings`/`selectCompressionStrategy`),
> chứ không phải nén phản hồi HTTP trên các nội dung phản hồi 429 được tạo ra — không có
> đường dẫn mã tương ứng cho một cờ bỏ qua theo nghĩa đen. Bước nén lời nhắc đó
> hiện cũng chạy _trước_ `withRateLimit()` trong pipeline yêu cầu, vì vậy
> việc sắp xếp lại để bỏ qua bước này khi xảy ra từ chối do hàng đợi đầy là một thay đổi riêng biệt và lớn hơn
> so với phạm vi của issue này; thay đổi đó đã được chủ ý **không** triển khai
> tại đây và được để lại cho một công việc tiếp theo nếu lợi ích tiết kiệm CPU xứng đáng với
> rủi ro do sắp xếp lại.

---

## 6. Cơ chế giám sát thông lượng luồng chậm (#9709)

Cơ chế bảo vệ tùy chọn `resilienceSettings.streamRecovery.throughputWatchdog` phát hiện
một upstream vẫn đang gửi các chunk nhưng tạo ra đầu ra của trợ lý thấp hơn
tốc độ đầu ra hữu ích đã cấu hình. Cơ chế này được chủ ý tách biệt với thời gian chờ khi không hoạt động:
heartbeat và metadata không đặt lại bộ đếm thời gian nào và cũng không được tính là tiến triển. Cơ chế này cũng
tách biệt với hạn chót cứng của lần thử (#9153), vốn vẫn là giới hạn an toàn
tuyệt đối bất kể chất lượng đầu ra.

Cơ chế giám sát yêu cầu một khoảng thời gian khởi động, sau đó là một cửa sổ cuộn hoàn chỉnh trước khi
có thể hủy. Nó đếm các delta văn bản từ các sự kiện đầu ra của Chat Completions và Responses API
(một phép xấp xỉ thận trọng theo byte UTF-8), bỏ qua các sự kiện chỉ chứa usage và các sự kiện rỗng, đồng thời
tạm dừng đánh giá trong khi các sự kiện gọi công cụ hoặc suy luận đang diễn ra. Cơ chế này bị vô hiệu hóa
theo mặc định và có thể được bật bằng `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
cửa sổ, thời gian khởi động, tốc độ tối thiểu và đầu ra tối thiểu có thể đo được đều bị giới hạn bởi
lớp chuẩn hóa thông thường của resilience settings.

Khi được bật, thao tác hủy của cơ chế giám sát chỉ được áp dụng cho lần thử upstream đang hoạt động. Trước khi
có bất kỳ byte nào hiển thị với client, đường dẫn phục hồi sớm hiện có trong cùng tài khoản có thể mở lại
lần thử. Sau khi commit, luồng không bao giờ được phát lại một cách mù quáng; chỉ hợp đồng
tiếp tục giữa luồng an toàn hiện có mới có thể ghép nối một hậu tố. Quá trình hoàn tất vẫn
chỉ diễn ra một lần, vì vậy việc hạch toán usage và giải phóng semaphore không bị lặp lại.

---

## 7. Điều chỉnh lại trạng thái upstream (lỗi hạn ngạch bị báo sai)

**Phạm vi:** một gateway upstream báo cáo tình trạng tạm thời cạn hạn ngạch bằng trạng thái HTTP không chính xác.

**Mục đích:** sửa trạng thái gây hiểu nhầm TRƯỚC KHI phân loại, để các thành phần tiêu thụ phía downstream (fallback engine, quá trình tổng hợp combo, phản hồi gửi tới client) nhận biết đúng bản chất có thể thử lại của lỗi.

Một số gateway báo hiệu tình trạng TẠM THỜI cạn hạn ngạch bằng một trạng thái HTTP
không thể thử lại. `agentrouter.org` trả về `403` (đôi khi là `400`) với nội dung tiếng Trung
(`用户额度不足` / `额度不足`) thay vì `429` tiêu chuẩn. Các client như Claude
Code coi `403` là lỗi vĩnh viễn và hủy phiên; nếu không được sửa,
fallback engine sẽ phân loại lỗi này là `AUTH_ERROR` thay vì một sự kiện
hạn ngạch.

**Triển khai:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — một
  danh sách quy tắc theo từng provider (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), được đối sánh thông qua `applyStatusRestatement()`.
- Vị trí gọi: khối `providerFailure:` trong `open-sse/handlers/chatCore.ts`
  (khoảng dòng 3654), ngay sau khi `parseUpstreamError()` phân tích một phản hồi
  upstream có trạng thái HTTP lỗi (`!providerResponse.ok`) và trước khi bất kỳ
  quá trình phân loại nào chạy, để mọi thành phần tiêu thụ downstream đều nhận được
  trạng thái đã sửa. Các lỗi được nhúng bên trong luồng SSE `200` đi theo một
  đường dẫn phân tích luồng riêng biệt và muộn hơn, nên **không** được hook này xử lý ở thời điểm hiện tại — đây là một
  hạn chế đã biết nhưng chưa cần thiết đối với trạng thái sai của agentrouter (vốn
  xuất hiện dưới dạng trạng thái HTTP lỗi).
- Điều kiện đủ để thử lại: `429` nằm trong `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), vì vậy một lỗi đã được điều chỉnh trạng thái
  sẽ mang theo cửa sổ thử lại thực sự thay vì xuất hiện dưới dạng một lỗi `403` không thể tiếp tục.
- Giá trị `60s` tổng hợp của `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  chỉ là thông tin mà phản hồi đã điều chỉnh trạng thái cho **client** biết; bản thân nó không phải
  thời lượng cooldown/lockout nội bộ của kết nối — thời lượng đó được chi phối
  riêng bởi cơ chế thực sự xử lý lỗi đã điều chỉnh trạng thái
  (backoff tăng dần của Connection Cooldown, §2, với giá trị cơ sở `3s` dành cho các provider
  dùng API key; hoặc Model Lockout, §3, dành cho các provider áp dụng hạn ngạch theo model như
  agentrouter). Router có thể đủ điều kiện thử lại nội bộ sớm hơn
  cửa sổ 60s mà nó thông báo cho client — đây là khoảng đệm có chủ đích,
  không phải lỗi.

Các lỗi vĩnh viễn (`无权访问模型` của agentrouter — không có quyền truy cập model này)
KHÔNG BAO GIỜ được điều chỉnh trạng thái: `excludeMarkers` phủ quyết quy tắc ngay cả khi `textMarkers` khớp,
do đó lỗi vẫn giữ nguyên trạng thái ban đầu và không có cơ chế nào thử lại lỗi đó vô thời hạn. Quy tắc
phân loại provider tương ứng
(`agentrouter-model-access-denied` trong `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown cơ sở được khai báo là `6h`) được
`checkFallbackError` (`open-sse/services/accountFallback.ts`) tham chiếu
_trước_ nhánh trả về sớm `FORBIDDEN` chung cho danh mục apikey, được kiểm soát bởi
`honorsRuleLockScope(provider)` (#10334 — hiện chỉ dành riêng cho agentrouter thông qua
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong
`providerErrorRules.ts`). Cooldown 6h được khai báo trong quy tắc được truyền qua dưới dạng
`fallbackResult.baseCooldownMs`, nhưng vẫn đi vào đường dẫn lockout
hạn ngạch theo model có sẵn (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, không thay đổi bởi #10334 ngoại trừ nguồn cooldown):
nó bị giới hạn xuống mức `mlSettings.maxCooldownMs` của operator
(mặc định `1_800_000ms` / 30min), giống như mọi lockout model khác, và
_lý do lockout được lưu bền vững_ vẫn là giá trị `"forbidden"` được hardcode từ trước,
không phải `"auth_error"` của quy tắc — chỉ thời lượng cooldown được tôn trọng
xuyên suốt toàn bộ quy trình, không phải chuỗi lý do. Bản thân kết nối vẫn hoạt động;
các model ngang hàng trên cùng kết nối không bị ảnh hưởng.

Các lỗi hạn mức được diễn giải lại (`额度不足`) khớp với một quy tắc nhà cung cấp trong môi trường production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, không tự khai báo thời gian chờ — áp dụng giá trị mặc định
scaled backoff của tầng lưu trữ). Kể từ #10334, `scope` trên
`ProviderErrorRuleMatch` ĐƯỢC sử dụng xuyên suốt toàn bộ luồng, nhưng **chỉ**
đối với các nhà cung cấp nằm trong allowlist
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
hiện chỉ có `"agentrouter"`, được kiểm soát qua `honorsRuleLockScope()`).
Đối với mọi nhà cung cấp khác, `scope` vẫn chỉ mang tính thông tin, hoàn toàn
giống như trước #10334. `checkFallbackError` cung cấp scope của quy tắc khớp
dưới dạng `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) là guard dùng chung để xác nhận rằng một
`ruleScope` thực sự an toàn khi được coi là tín hiệu có phạm vi toàn bộ kết nối
và có khả năng tự phục hồi (scope `"connection"`, reason `quota_exhausted`,
không bao giờ là `permanent`, không bao giờ là `creditsExhausted` — một biện
pháp phòng vệ trước khả năng trong tương lai có quy tắc ghép scope
`"connection"` với trạng thái tài khoản vĩnh viễn). Hai consumer gọi guard này:

- **Tầng lưu trữ** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  thay vì rơi vào nhánh khóa **theo từng model** của nhà cung cấp passthrough
  (agentrouter có `passthroughModels: true` → `hasPerModelQuota()` trả về
  `true`), nó áp dụng **thời gian chờ kết nối tạm thời** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, không bao giờ là trạng thái
  kết thúc (`credits_exhausted`/`banned`/`expired`) — để kết nối tự phục hồi
  sau khi thời gian chờ kết thúc, thay vì yêu cầu đặt lại thông tin xác thực
  theo cách thủ công. Bỏ qua đối với các kết nối có `disableCooling: true`
  (#2997): lựa chọn không tham gia này sẽ rơi xuống nhánh khóa theo từng model
  thay thế (một sự đánh đổi đã được ghi lại — xem chú thích mã phía trên nhánh).
- **Định tuyến combo trong cùng yêu cầu** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): cùng guard đó đánh dấu kết nối
  vào tập hợp `exhaustedConnections` trong bộ nhớ, với khóa
  `${provider}:${connectionId}`. Cơ chế này chỉ bỏ qua một target CÙNG-YÊU-CẦU
  còn lại nếu _chính target đó đã mang đúng `connectionId` ấy_ trên đối tượng
  target của nó (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` trước khi tra cứu `exhaustedConnections`) — một combo danh sách
  model thông thường, trong đó các target ngang hàng không mang
  `connectionId` được ghim riêng và chỉ được phân giải theo từng lần điều phối
  từ header `X-OmniRoute-Selected-Connection-Id` của phản hồi, sẽ không bao giờ
  khớp khóa đó. Trong trường hợp phổ biến này, cơ chế bảo vệ thực sự ngăn một
  nhánh còn lại tái sử dụng tài khoản vừa cạn hạn mức KHÔNG phải là Set này —
  mà là tầng lưu trữ nêu trên (`rateLimitedUntil` của kết nối hiện nằm trong
  tương lai) kết hợp với việc cùng guard này ngăn thêm
  `transientRateLimitedProviders` cho lỗi đó (xem "Thiết kế hai giai đoạn" và
  chú thích mã trên nhánh `isAgentrouterConnectionQuotaScope` trong
  `targetExhaustion.ts`): do Set đó không được đánh dấu, cơ chế force-allow
  `allowRateLimitedConnection` của `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) KHÔNG được kích hoạt
  cho các nhánh còn lại của nhà cung cấp, vì vậy bộ lọc `rateLimitedUntil` của
  quá trình chọn thông tin xác thực (`src/sse/services/auth.ts:1238`) vẫn được
  tuân thủ bình thường và một nhánh còn lại sẽ chọn một kết nối agentrouter
  khác vẫn đủ điều kiện hoặc thất bại do không có thông tin xác thực khả dụng —
  nó không tự ép quay lại kết nối mà nhánh này vừa đặt vào thời gian chờ.

### Thiết kế hai giai đoạn: diễn giải lại trạng thái, sau đó phân loại

Cơ chế diễn giải lại trạng thái (`upstreamStatusRestatement.ts`) và các quy tắc
phân loại nhà cung cấp (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) là hai registry riêng biệt, cả hai đều sử dụng id nhà
cung cấp và các dấu hiệu văn bản làm khóa, nhưng chúng chạy ở những vị trí khác
nhau và phục vụ các mục đích khác nhau: cơ chế diễn giải lại sẽ ghi lại trạng
thái HTTP từ sớm trong `chatCore.ts`; các quy tắc phân loại chọn `reason`
fallback và `scope` khóa (`model` / `provider` / `connection`) bên trong
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Các quy tắc phân loại chỉ thấy toàn bộ **văn bản** lỗi (cần thiết để khớp các
dấu hiệu trong body như `额度不足`) đối với các nhà cung cấp được liệt kê trong
allowlist `FULL_TEXT_RULE_PROVIDERS` trong `providerErrorRules.ts` — hiện chỉ
có `"agentrouter"`. Đối với mọi nhà cung cấp **trong catalog tích hợp sẵn**
khác, `checkFallbackError` chỉ chuyển lỗi có cấu trúc (`{code, type}`) cho
`getProviderErrorRuleMatch`; dữ liệu này đủ cho các quy tắc dựa trên
header/trạng thái/mã lỗi nhưng không thể thấy các dấu hiệu trong văn bản body.
Helper `resolveRuleMatchBody()` thực hiện việc lựa chọn này: toàn bộ văn bản
lỗi cho các nhà cung cấp trong allowlist, còn lỗi có cấu trúc cho các nhà cung
cấp khác. Việc thêm một nhà cung cấp **tích hợp sẵn** vào
`FULL_TEXT_RULE_PROVIDERS` là lựa chọn tham gia rõ ràng theo từng nhà cung cấp —
cơ chế này tồn tại để đường dẫn mặc định cho mọi nhà cung cấp không có trong
danh sách vẫn giữ nguyên từng byte.

`scope` của một quy tắc (`model` / `provider` / `connection`) là một lựa chọn
tham gia riêng biệt với `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` chỉ
cung cấp nó dưới dạng `fallbackResult.ruleScope`, và các consumer phía sau chỉ
tôn trọng nó như một giá trị không chỉ mang tính thông tin đối với các nhà cung
cấp nằm trong allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong cùng file
(`được kiểm soát qua honorsRuleLockScope()` — hiện chỉ có `"agentrouter"`).
Xem phần "Các lỗi hạn mức được diễn giải lại" ở trên để biết một kết quả khớp
`scope: "connection"` thực sự làm gì sau khi một nhà cung cấp được đưa vào
allowlist đó.

**#11104 — các quy tắc do operator khai báo bỏ qua cả hai allowlist.** Một operator có thể
khai báo quy tắc riêng cho từng provider trong thời gian chạy thông qua `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
mà không cần chỉnh sửa tệp này. Việc đặt một quy tắc của operator phía sau
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — các allowlist
nhằm bảo vệ hành vi **mặc định** của các quy tắc catalog tích hợp — sẽ
khiến cơ chế settings không có tác dụng đối với mọi provider ngoại trừ những provider đã
được liệt kê ở đó, vì việc khai báo quy tắc vốn đã là hành động opt-in rõ ràng
của operator. `resolveRuleMatchBody()` và `honorsRuleLockScope()` đều kiểm tra
`hasOperatorRuleForProvider()` trước: một provider có quy tắc của operator sẽ nhận
văn bản lỗi thô và `scope` đã khai báo của quy tắc đó được tôn trọng, bất kể
provider đó có xuất hiện trong một trong hai allowlist hay không.

**Khoảng trống đã biết — `providerRuleRegistry` không bao giờ được tham vấn đối với HTTP 400.**
Nhánh `BAD_REQUEST` của `checkFallbackError` phân loại hoàn toàn trạng thái 400
thông qua các mảng pattern riêng (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, v.v. trong `accountFallback.ts`) và trả về trước khi
đi tới nhánh `configuredRule`/`getProviderErrorRuleMatch` ở phía trên.
Một quy tắc catalog tích hợp (hoặc quy tắc của operator) có `status: 400`
hợp lệ về mặt cú pháp nhưng sẽ không bao giờ được kích hoạt. Hiện không có quy tắc nào nhắm tới 400,
vì vậy không có gì trong môi trường production bị ảnh hưởng — nhưng một quy tắc 400 trong tương lai cần
sửa nhánh này trước, đây là thay đổi lớn hơn việc thêm một quy tắc (nó
phân loại lại 400 cho mọi provider đang phụ thuộc vào hành vi của mảng pattern)
và nằm ngoài phạm vi của việc bổ sung quy tắc cho một provider duy nhất.

### Thêm một gateway khai báo sai quota mới

1. Đăng ký một mảng quy tắc trong `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Giữ `textMarkers`
   dành riêng cho provider; tuyệt đối không tái sử dụng các cụm từ tiếng Anh chung có thể xung đột với
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`).
2. Có thể tùy chọn đăng ký các quy tắc phân loại trong
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) để chọn
   đúng phạm vi khóa (`connection` cho quota trên toàn tài khoản, `model` cho
   lỗi theo từng model). Bước này chỉ có hiệu lực trong môi trường production đối với
   các provider có quy tắc cần toàn bộ văn bản lỗi (các marker trong body): hãy thêm
   id của provider vào `FULL_TEXT_RULE_PROVIDERS` trong cùng tệp — nếu không,
   `checkFallbackError` sẽ chỉ chuyển cho quy tắc lỗi có cấu trúc
   `{code, type}` và một quy tắc dựa trên văn bản body sẽ không bao giờ khớp với lưu lượng thực tế.
   Các quy tắc chỉ khớp dựa trên `status`/`headers` (như của Opencode hoặc
   Minimax) không cần opt-in này. Riêng biệt, nếu quy tắc khai báo
   `scope: "connection"` và mục đích là tạo cooldown thực sự trên toàn connection
   cùng với việc bỏ qua combo trong cùng request (không chỉ là một nhãn cung cấp thông tin), hãy thêm
   id của provider vào `HONORS_RULE_LOCK_SCOPE_PROVIDERS` trong cùng tệp — đây
   là cơ chế kiểm soát việc sử dụng theo kiểu `isAgentrouterConnectionQuotaScope()` trong
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) và
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); nếu không có nó, `scope`
   vẫn được truyền qua `fallbackResult.ruleScope` nhưng không có gì xử lý giá trị đó.
3. Thêm các unit test tương tự `tests/unit/upstream-status-restatement.test.ts`
   và `tests/unit/agentrouter-error-rules.test.ts` (bao gồm các guard
   not-permanent / not-creditsExhausted và — nếu provider cần
   allowlist — một test xác nhận `resolveRuleMatchBody()` chỉ trả về
   toàn bộ văn bản cho provider đó).

Không cần thay đổi `chatCore.ts`, `classifyError` hoặc combo.

#### Khóa được phân nhóm theo egress (#10880)

Các provider trong `EGRESS_BUCKETED_LOCK_PROVIDERS` (họ opencode) được xem
là upstream được phân nhóm theo IP (gói miễn phí của opencode được phân nhóm theo IP, không phải
theo tài khoản — xem #9611): trạng thái 429 được phân loại là `quota_exhausted`
**hoặc** `rate_limit_exceeded` sẽ áp dụng cooldown cho mọi connection thuộc họ được allowlist
có địa chỉ IP egress được biết gần nhất trùng với địa chỉ IP của connection gặp lỗi, trước khi
quá trình xoay vòng có thể thử chúng
— tránh N-1 lệnh gọi upstream chắc chắn thất bại (cùng mô hình với #10460/#10525).
`rate_limit_exceeded` được đưa vào có chủ đích: trên đường dẫn `markAccountUnavailable`,
các quy tắc dành riêng cho opencode không bao giờ khớp (không có headers/body nào được chuyển cho
`checkFallbackError`, opencode không nằm trong `FULL_TEXT_RULE_PROVIDERS`), vì vậy một lỗi 429
có body chứa văn bản quota đăng ký ("monthly usage limit
reached") được phân loại là `quota_exhausted` bởi fallback dựa trên văn bản quota
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1h) trước khi
quy tắc `status_429` có cơ hội được xử lý — trong khi lỗi 429 không có văn bản quota (chỉ là
giới hạn tốc độ thông thường) được phân loại thông qua quy tắc `status_429` thành `rate_limit_exceeded`
và vẫn áp dụng cooldown cho toàn bộ họ IP. Đối với một provider trong allowlist, giới hạn tốc độ
được phân nhóm theo IP là tín hiệu tương đương với quota đã cạn. Các giới hạn thực tế:

- **Nỗ lực tối đa**: khóa xác định `egress_ip` được biết gần nhất của kết nối
  từ `proxy_logs` (cửa sổ 24 giờ, đồng bộ, không có bộ nhớ đệm). Bộ nhớ đệm lạnh (IP
  egress chưa từng được thăm dò) hoặc không có hàng dữ liệu → kết nối bị lỗi vẫn được
  nhánh này đưa vào thời gian chờ (được ghi nhận như hiện tại), chỉ là không có kết nối cùng nhóm nào bị khóa.
- **Không bao giờ là trạng thái cuối**: thời gian chờ là một cửa sổ hạn ngạch được gia hạn
  (`testStatus: "unavailable"`); trạng thái vĩnh viễn không bao giờ được suy ra từ một
  tín hiệu cấp IP. Các kết nối `disableCooling` hoàn toàn bỏ qua nhánh này.
- **Độ chi tiết của khóa thay đổi đối với nhóm trong danh sách cho phép**: đây là thay đổi về phạm vi,
  không chỉ là một tối ưu hóa cho các kết nối cùng nhóm. opencode là một nhà cung cấp `passthroughModels`,
  vì vậy trước nhánh này, lỗi 429 tạo ra khóa theo từng MODEL; giờ đây
  nó tạo ra thời gian chờ cho kết nối — kể cả khi người vận hành chỉ chạy một
  kết nối duy nhất mà hoàn toàn không có kết nối cùng nhóm. Đây là độ chi tiết mà bảng quy tắc opencode
  đã xác định là chính xác (`scope: "connection"`,
  `providerErrorRules.ts`), nhưng cho đến nay chưa bao giờ được tuân thủ vì opencode không nằm trong
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Nhánh này tự ghi thời gian chờ +
  `backoffLevel` của kết nối bị lỗi, tương tự nhánh agentrouter có phạm vi
  kết nối, rồi trả về — khối theo từng model và
  luồng xử lý chung bên dưới sẽ không bao giờ được thực thi.
- **Bao gồm combo**: giống như nhánh agentrouter, phạm vi này chủ ý
  bỏ qua việc hạ cấp `persistUnavailableState`/`isCombo` mà một bên gọi combo
  áp dụng cho lỗi 429. Khóa theo từng model không phải là một dạng yếu hơn của phạm vi này,
  mà là sai đơn vị: nó không cho biết gì về IP đã cạn hạn ngạch, vì vậy quá trình xoay vòng
  combo sẽ tiếp tục lãng phí một lệnh gọi chắc chắn thất bại cho mỗi kết nối cùng nhóm.
- **An toàn cho kết nối cùng nhóm**: một kết nối cùng nhóm đã ở trạng thái cuối (banned/credits_exhausted)
  hoặc đã có thời gian chờ dài hơn sẽ không bao giờ bị ghi đè.
- **Danh sách cho phép độc quyền**: việc mở rộng `EGRESS_BUCKETED_LOCK_PROVIDERS` là một
  quyết định rõ ràng của chủ sở hữu; không có cơ chế đấu nối chung (mẫu #10334/#10419). Truy vấn
  kết nối cùng nhóm liên kết với chính danh sách cho phép đó thay vì lặp lại dưới dạng một chuỗi SQL
  cố định, do đó việc mở rộng danh sách vẫn chỉ cần thay đổi một dòng.
- **Xoay vòng IP egress theo cả hai hướng**: cửa sổ tra cứu (24 giờ) rộng hơn rất
  nhiều so với TTL của bộ nhớ đệm IP egress (5 phút), vì vậy "IP được biết gần nhất" là dữ liệu lịch sử,
  không phải trạng thái hiện tại. Nếu proxy của một kết nối đã xoay vòng trong cửa sổ này,
  khóa có thể **bỏ sót** một IP thực sự được dùng chung (IP được ghi nhận là IP mới,
  chưa cạn hạn ngạch) — và ngược lại, nó có thể **đưa một kết nối cùng nhóm đã
  chuyển khỏi IP đã cạn hạn ngạch vào thời gian chờ**. Trường hợp thứ hai khiến kết nối cùng nhóm đó chịu thêm một
  cửa sổ thời gian chờ; cả hai đều được chấp nhận như những giới hạn của cơ chế nỗ lực tối đa dựa trên
  dữ liệu lịch sử.
- **Chi phí**: hai lượt quét có giới hạn trên `proxy_logs` (được lọc theo cửa sổ thông qua
  `idx_pl_timestamp`), chỉ xảy ra với tần suất của lỗi 429. Không có chỉ mục mới (migration 134
  YAGNI). Đã đo trên bản sao DB có lưu lượng thực với quy mô vừa phải; một
  phiên bản có thông lượng cao sẽ chứa số lượng hàng lớn hơn tương ứng trong cùng cửa sổ.

---

## Các tính năng phục hồi khác

- **19 chiến lược định tuyến** (ưu tiên, có trọng số, luân phiên, chuyển tiếp ngữ cảnh, lấp đầy trước, p2c, ngẫu nhiên, ít được sử dụng nhất, tối ưu hóa chi phí, nhận biết thời điểm đặt lại, cửa sổ đặt lại, dung lượng dự phòng, ngẫu nhiên nghiêm ngặt, tự động, lkgp, tối ưu hóa ngữ cảnh, tối ưu hóa bộ nhớ đệm, hợp nhất, quy trình) — xem [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Định tuyến nhận biết thời điểm đặt lại** (v3.8.0) — ưu tiên các kết nối theo thời điểm đặt lại hạn ngạch.
- **Chuyển cấp chế độ nền** — `background: true` của Responses API được chuyển xuống chế độ đồng bộ kèm cảnh báo.
- **Phát hiện động giới hạn công cụ** — giảm tải cho các nhà cung cấp khi đạt đến giới hạn số lượng công cụ.
- **Phương án dự phòng khẩn cấp** — được kiểm soát bởi `OMNIROUTE_EMERGENCY_FALLBACK`; người vận hành có thể ghi đè thiết lập này từ trang Feature Flags mà không cần khởi động lại.

---

## Gỡ lỗi

- Combo có trọng số trả về `503 all_targets_cooling_down` (`Retry-After` được thiết lập, `diagnostics.excluded` liệt kê mọi mục tiêu với `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → nhóm đã được cấu hình và kết nối, nhưng mọi mục tiêu đều đang bị loại trừ bởi bộ hẹn giờ phục hồi; cảnh báo `[COMBO] Weighted selection: every target excluded before dispatch — …` nêu rõ lý do và số giây còn lại. Phản hồi `404 no_executable_targets` từ cùng combo có nghĩa là không có bộ hẹn giờ phục hồi nào liên quan (không có gì để chạy hoặc mọi tài khoản đều không vượt qua được phép dò tìm tính khả dụng). Được triển khai trong `open-sse/services/combo/pinRecovery.ts` từ các mục loại trừ được thu thập trong `targetResolution.ts`.
- Tất cả khóa của một nhà cung cấp đều bị bỏ qua → kiểm tra cả trạng thái bộ ngắt mạch VÀ `rateLimitedUntil`/`testStatus` của từng kết nối.
- Nhà cung cấp bị loại trừ vĩnh viễn sau cửa sổ đặt lại → mã đang đọc trực tiếp `state` thay vì `getStatus()`/`canExecute()`.
- Một khóa thất bại, các khóa khác vẫn nên hoạt động → ưu tiên thời gian chờ của kết nối hơn bộ ngắt mạch.
- Chỉ một mô hình thất bại → ưu tiên khóa mô hình hơn thời gian chờ của kết nối.
- Trạng thái lẽ ra phải tự phục hồi nhưng không xảy ra → kiểm tra dấu thời gian trong tương lai + đường dẫn đọc có làm mới trạng thái đã hết hạn hay không. Các trạng thái vĩnh viễn yêu cầu thay đổi thủ công.

---

## Dấu vân tay TLS & khả năng ẩn mình

Khả năng ẩn mình dành riêng cho từng nhà cung cấp (JA3/JA4, CCH, làm rối mã) được ghi lại riêng — xem `docs/security/STEALTH_GUIDE.md` (git; không được biên dịch vào `/docs`).

---

## Kiểm thử khả năng phục hồi (Giai đoạn 8 · Khối C)

Ngoài các kiểm thử đơn vị cho logic phục hồi, ba kiểm thử đánh giá môi trường chạy trong
điều kiện áp lực/sự cố thực tế (tất cả đều là kiểm thử tích hợp/hằng đêm — không kiểm thử nào chặn PR):

| Kiểm thử         | Nội dung                                                                                                                                                                                      | Cách chạy                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Hỗn loạn         | Nút upstream giả lập tạo ra độ trễ/đặt lại/hết thời gian chờ/503 thực tế; xác thực rằng bộ ngắt mạch mở/phục hồi và `checkFallbackError` phân loại 503 là phương án dự phòng có thể phục hồi. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Tăng trưởng heap | ~500 luồng cho mỗi `createSSEStream` khi dùng `--expose-gc`; thất bại nếu heap tăng vượt quá ngưỡng trần (cơ chế bảo vệ OOM #3069).                                                           | `npm run test:heap`                       |
| Ngâm tải k6      | Tải duy trì liên tục lên `/api/monitoring/health`; các ngưỡng p95/lỗi.                                                                                                                        | `k6 run tests/load/k6-soak.js` (hằng đêm) |

Được điều phối bởi `.github/workflows/nightly-resilience.yml` (cron + điều phối thủ công). Trong
`test:integration` mặc định, các kiểm thử hỗn loạn và heap tự bỏ qua (khi không có `RUN_CHAOS_INT`/`--expose-gc`).

---

## Xem thêm

- [Hướng dẫn kiến trúc](./ARCHITECTURE.md) — Kiến trúc hệ thống và cơ chế nội bộ
- [Hướng dẫn người dùng](../guides/USER_GUIDE.md) — Nhà cung cấp, tổ hợp, tích hợp CLI
- [Công cụ tổ hợp tự động](../routing/AUTO-COMBO.md) — Chấm điểm 16 yếu tố, gói chế độ
