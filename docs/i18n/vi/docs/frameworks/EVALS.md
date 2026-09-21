# Evaluations (Evals) (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Nguồn tham chiếu chính xác:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute cung cấp một framework đánh giá tổng quát mà bạn có thể sử dụng để đo kiểm các cấu hình định tuyến, từng nhà cung cấp/mô hình riêng lẻ hoặc các bộ kiểm thử "golden set" đi kèm. Hãy sử dụng framework này để xác minh các thay đổi về định tuyến, kiểm định nhà cung cấp mới và thiết lập cổng kiểm soát cho các bản phát hành trước khi đưa chúng vào lưu lượng production.

Framework này được triển khai dưới dạng:

- Một trình chạy thuần túy (`src/lib/evals/evalRunner.ts`) đăng ký các bộ kiểm thử tích hợp sẵn trong bộ nhớ, đánh giá đầu ra theo các tiêu chí kỳ vọng và tổng hợp bảng điểm.
- Một lớp lưu trữ (`src/lib/db/evals.ts`) dành cho các bộ kiểm thử tùy chỉnh (do người dùng định nghĩa) và lịch sử các lần chạy trong SQLite.
- Một lớp điều phối (`src/lib/evals/runtime.ts`) thực thi từng trường hợp bằng cách gửi các lệnh gọi thực tế đến `POST /v1/chat/completions`, ghi nhận độ trễ và đầu ra, đồng thời lưu trữ lần chạy.
- Các endpoint REST trong `/api/evals/*` (chỉ dành cho người dùng đã xác thực quyền quản lý).
- Một giao diện dashboard tại `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Khái niệm

### Bộ kiểm thử

Bộ kiểm thử là một tập hợp có tên gồm các trường hợp kiểm thử, kèm theo một `description` và một hoặc nhiều trường hợp. Các bộ kiểm thử đến từ hai nguồn:

| Nguồn      | Nơi định nghĩa                                     | Có thể thay đổi trong thời gian chạy?  |
| ---------- | -------------------------------------------------- | -------------------------------------- |
| `built-in` | Được đăng ký qua `registerSuite()` khi khởi động   | Không (được định nghĩa trong mã nguồn) |
| `custom`   | Được lưu trong SQLite `eval_suites` + `eval_cases` | Có (qua API/UI)                        |

Các bộ kiểm thử tích hợp sẵn hiện tại (xem `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 trường hợp cơ sở bao gồm chào hỏi/toán học/dịch thuật/an toàn
- `coding-proficiency` — Python/JS/SQL/TS/phát hiện lỗi
- `reasoning-logic` — tam đoạn luận, bài toán có lời văn, nhận dạng quy luật
- `multilingual` — dịch thuật và nhận diện ngôn ngữ
- `safety-guardrails` — PII, jailbreak, từ chối, nhận thức về thiên kiến
- `instruction-following` — chỉ JSON, danh sách đánh số, ràng buộc ngôn ngữ
- `codex-comparison` — các tác vụ lập trình đối đầu trực tiếp dành cho chế độ so sánh

### Trường hợp

Mỗi trường hợp bao gồm:

| Trường     | Mô tả                                                             |
| ---------- | ----------------------------------------------------------------- |
| `id`       | Mã định danh ổn định (dùng làm khóa cho đầu ra và chỉ số)         |
| `name`     | Nhãn dễ đọc                                                       |
| `model`    | Mô hình mặc định khi lần chạy sử dụng mục tiêu `suite-default`    |
| `input`    | `{ messages, max_tokens? }` — được gửi đến `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — tiêu chí chấm điểm (xem bên dưới)         |
| `tags`     | Các nhãn tùy chọn (ví dụ: `safety`, `pii`, `jailbreak`)           |

### Mục tiêu

Cùng một bộ kiểm thử có thể được chạy với nhiều mục tiêu khác nhau. Schema mục tiêu là `evalTargetSchema` trong `src/shared/validation/schemas.ts`:

| Loại mục tiêu   | `id`        | Hành vi                                                              |
| --------------- | ----------- | -------------------------------------------------------------------- |
| `suite-default` | `null`      | Mỗi trường hợp sử dụng trường `model` tích hợp sẵn của chính nó      |
| `model`         | tên mô hình | Buộc mọi trường hợp chạy qua một mô hình trực tiếp (ví dụ: `gpt-4o`) |
| `combo`         | tên combo   | Chạy mọi trường hợp qua một combo (kiểm thử công cụ định tuyến)      |

Đối với `model` và `combo`, trường `id` là bắt buộc (được Zod thực thi bằng `superRefine`). Khi cung cấp `compareTarget`, hai mục tiêu phải khác nhau — trình chạy lưu trữ cả hai lần chạy dưới cùng một `runGroupId` để so sánh A/B.

## Tiêu chí chấm điểm

Được triển khai trong `evaluateCase()` (evalRunner.ts):

| Chiến lược | Đạt khi…                                                                       |
| ---------- | ------------------------------------------------------------------------------ |
| `exact`    | `actualOutput === expected.value`                                              |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`            |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` trả về giá trị truthy          |
| `custom`   | `expected.fn(actualOutput, evalCase)` trả về giá trị truthy (chỉ tích hợp sẵn) |

**Lưu ý:** Việc chấm điểm bằng hàm tùy chỉnh chỉ dành cho các bộ kiểm thử được
định nghĩa bằng mã (tích hợp sẵn), vì các hàm không thể được tuần tự hóa thông
qua API. `evalCaseBuilderSchema` chỉ chấp nhận `contains | exact | regex` cho
các bộ kiểm thử do người dùng tạo.

Hiện tại không có trình chấm điểm dùng LLM làm giám khảo hoặc dựa trên độ tương
đồng embedding — đây sẽ là một điểm mở rộng hợp lý trong `evaluateCase()`.

## Lược đồ cơ sở dữ liệu

Ba bảng (các migration `030_create_eval_runs.sql` và
`031_create_eval_suites.sql`):

| Bảng          | Mục đích                                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Siêu dữ liệu của bộ kiểm thử tùy chỉnh (`id`, `name`, `description`)                                                                    |
| `eval_cases`  | Các trường hợp kiểm thử trong mỗi bộ — `input_json`, `expected_*`, `tags_json`                                                          |
| `eval_runs`   | Các lần chạy trong lịch sử — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Các bộ kiểm thử tích hợp sẵn **không** được lưu trong DB. Chúng tồn tại trong bộ
nhớ và được đăng ký lại mỗi khi `evalRunner.ts` được import.

## REST API

Tất cả endpoint đều yêu cầu xác thực quản trị (`requireManagementAuth`) — chúng
không thuộc bề mặt proxy công khai.

| Endpoint                      | Phương thức | Mô tả                                                                    |
| ----------------------------- | ----------- | ------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`       | Liệt kê các bộ kiểm thử + lần chạy gần đây + bảng điểm + mục tiêu + khóa |
| `/api/evals`                  | `POST`      | Chạy một bộ kiểm thử (đơn lẻ hoặc so sánh) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`       | Truy xuất một bộ kiểm thử (tích hợp sẵn hoặc tùy chỉnh)                  |
| `/api/evals/suites`           | `POST`      | Tạo bộ kiểm thử tùy chỉnh — schema `evalSuiteSaveSchema`                 |
| `/api/evals/suites/{suiteId}` | `GET`       | Truy xuất một bộ kiểm thử tùy chỉnh                                      |
| `/api/evals/suites/{suiteId}` | `PUT`       | Thay thế một bộ kiểm thử tùy chỉnh (các trường hợp được chèn lại)        |
| `/api/evals/suites/{suiteId}` | `DELETE`    | Xóa một bộ kiểm thử tùy chỉnh và các trường hợp của nó                   |

### Chạy một bộ kiểm thử

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Các trường tùy chọn:

- `outputs` — `Record<caseId, string>` chứa các đầu ra đã được tính toán trước.
  Khi được cung cấp, trình chạy **bỏ qua việc gửi yêu cầu** và chỉ chấm điểm
  các đầu ra đã lưu trong bộ nhớ đệm (hữu ích cho việc đánh giá ngoại tuyến).
- `compareTarget` — mục tiêu thứ hai để chạy song song; cả hai lần chạy dùng
  chung một `runGroupId` được tạo để xem kết quả đối đầu.
- `apiKeyId` — khóa API nội bộ dùng để xác thực các lệnh gọi
  `/v1/chat/completions` được gửi đi. Bắt buộc khi `REQUIRE_API_KEY` được bật.

### Tạo một bộ kiểm thử tùy chỉnh

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Quy trình điều phối

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Phân giải bộ kiểm thử (tích hợp sẵn hoặc tùy chỉnh).
2. Với mỗi trường hợp, tạo một `Request` đến `/v1/chat/completions` với
   `messages` của trường hợp đó, `model` đã phân giải, `stream: false` và `max_tokens: 512`
   (hoặc giá trị ghi đè của trường hợp).
3. Gọi trực tiếp trình xử lý chat (trong cùng tiến trình — không có thêm lượt HTTP).
4. Ghi nhận độ trễ và trích xuất văn bản từ `choices[0].message.content`
   hoặc payload `output[]` của Responses API.
5. Chấm điểm tất cả đầu ra thông qua `runSuite()`, sau đó lưu lại bằng `saveEvalRun()`.

Các trường hợp chạy **tuần tự**. Hiện chưa có cờ điều khiển đồng thời.

## Bảng điều khiển

Giao diện người dùng nằm tại `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Từ đó, bạn
có thể:

- Duyệt các bộ kiểm thử tích hợp sẵn và tùy chỉnh với bản xem trước theo từng trường hợp.
- Tạo/chỉnh sửa/xóa các bộ kiểm thử tùy chỉnh bằng trình tạo trường hợp.
- Chọn một đích (mặc định của bộ kiểm thử / mô hình / tổ hợp), tùy chọn thêm
  `compareTarget` thứ hai, tùy chọn khóa API, sau đó chạy theo yêu cầu.
- Kiểm tra lịch sử chạy, trạng thái đạt/không đạt của từng trường hợp, độ trễ và các đầu ra đã ghi nhận.
- Xem bảng điểm luân phiên được tổng hợp từ lần chạy gần nhất theo từng phạm vi
  `(suite, target)`.

## Mối quan hệ với RFC Tự động đánh giá

Một hệ thống đánh giá riêng biệt, có phạm vi hẹp hơn, nằm tại `src/domain/assessment/`
(xem thêm [AUTO-COMBO.md](../routing/AUTO-COMBO.md) để biết về công cụ chấm điểm trực tiếp).
Hệ thống con đó nhắm đến công cụ Auto Combo — tự động chấm điểm các nhà cung cấp và
mô hình để các tổ hợp có thể tự phục hồi khi hệ thống thượng nguồn gặp sự cố. Hệ thống này sử dụng trình chạy,
bộ phân loại và logic chấm điểm riêng.

Khung Evals được ghi lại ở đây là **bề mặt kiểm thử đa dụng, có phạm vi rộng hơn**.
Ưu tiên sử dụng khung này cho các bộ kiểm thử hồi quy tùy ý, so sánh A/B
và kiểm thử khói theo từng bản phát hành. Sử dụng hệ thống con Tự động đánh giá khi bạn cần
tình trạng nhà cung cấp theo thời gian thực tác động đến các quyết định định tuyến.

## Tích hợp CI

Hiện chưa có script npm `eval:ci` chuyên dụng. Có hai cách nếu bạn muốn
ràng buộc việc phát hành theo kết quả đánh giá:

- **Đường dẫn HTTP**: khởi động máy chủ, gọi `POST /api/evals` với
  `suiteId` + `target` đã biết, rồi xác nhận `runs[].summary.passRate >= N` trong
  phản hồi.
- **Đường dẫn trong cùng tiến trình**: nhập `runEvalSuiteAgainstTarget()` từ
  `@/lib/evals/runtime` trong một script, chạy với cơ sở dữ liệu kiểm thử và kiểm tra
  `PersistedEvalRun.summary` được trả về.

Các bài kiểm thử cho route và lịch sử nằm tại
`tests/unit/evals-route.test.ts` và `tests/unit/evals-history.test.ts`.

## Các điểm mở rộng

Các thay đổi phổ biến và vị trí thực hiện:

- **Chiến lược chấm điểm mới** — mở rộng khối `switch (evalCase.expected.strategy)`
  trong `evaluateCase()` (`evalRunner.ts`) và mở rộng `EvalCaseStrategy` trong
  `src/lib/db/evals.ts` cùng với `evalCaseBuilderSchema` trong `schemas.ts`.
- **Bộ kiểm thử tích hợp sẵn mới** — định nghĩa một đối tượng bộ kiểm thử và gọi `registerSuite()` ở
  cuối `evalRunner.ts`. Bộ kiểm thử sẽ được `listSuites()` tự động phát hiện.
- **Chạy đồng thời** — thay đổi vòng lặp `for` tuần tự trong
  `runEvalSuiteAgainstTarget()` thành `Promise.all` có giới hạn (hiện chưa có
  cơ chế kiểm soát đồng thời).
- **Các trường hợp phát luồng/gọi công cụ** — hiện tại trình chạy bắt buộc sử dụng `stream: false`.
  Việc đánh giá có hỗ trợ phát luồng hoặc nhận biết công cụ sẽ yêu cầu thay đổi trong `runtime.ts`
  (ghi nhận và tổng hợp các đoạn SSE trước khi chấm điểm).

## Xem thêm

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — hướng dẫn tổng quan về sản phẩm
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — tài liệu tham khảo về quy trình xử lý yêu cầu
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — công cụ chấm điểm Auto Combo (môi trường chạy trực tiếp)
- Mã nguồn: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Giao diện người dùng: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
