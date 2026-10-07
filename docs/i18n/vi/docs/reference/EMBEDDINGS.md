# Embeddings client runbook (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Ghi chú vận hành cho `POST /v1/embeddings` khi OmniRoute đứng trước
Hindsight 0.9.1 (`encode(list[str])` chỉ hỗ trợ văn bản) và Memorix 1.6.0 (cổng
phương tiện Jina). Đã xác minh trực tiếp vào 2026-08-17 với OmniRoute 3.8.49 tại
`https://omniroute.jaguar-fish.ts.net/v1`. Không có thông tin bí mật nào bên dưới.

## Các id mô hình hoạt động

| Id phía máy khách                              | HTTP | Vector   | Số chiều | Ghi chú                                          |
| ---------------------------------------------- | ---- | -------- | -------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | lô 2 → 2 | 3072     | Hoạt động mà không cần khóa Gemini gốc           |
| `openrouter/google/gemini-embedding-2-preview` | 200  | lô 2 → 2 | 3072     | Cùng không gian với id không phải bản xem trước  |
| `openrouter/google/gemini-embedding-001`       | 200  | lô 2 → 2 | 3072     | Được liệt kê trong `GET /v1/embeddings`          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | lô 2 → 2 | 1024     | Id Jina omni chuẩn                               |
| `jina/jina-embeddings-v5-omni-small`           | 200  | lô 2 → 2 | 1024     | Bí danh; `model` trong phản hồi là `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | lô 2 → 2 | 1024     | Id trần cũng được phân giải                      |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1    | **768**  | Không gian vector khác với small                 |

`GET /v1/models` và `GET /v1/embeddings` đã liệt kê
`jina-ai/jina-embeddings-v5-omni-small` (1024) và
`jina-ai/jina-embeddings-v5-omni-nano` (768) cùng với
`openrouter/google/gemini-embedding-001`. Chúng **không** liệt kê
`openrouter/google/gemini-embedding-2` dù id đó đã có thể phục vụ.

Không trộn nano (768 chiều) và small (1024 chiều) trong cùng một chỉ mục. Chúng
không thể so sánh với nhau.

## Các id bị lỗi / gây hiểu lầm

### Gemini Embedding 2 gốc

Yêu cầu:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Thực tế (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` trả về cùng mã 400. `google/gemini-embedding-2`
trả về HTTP **400** `Unknown embedding provider: google` trừ khi một nút nhà
cung cấp tùy chỉnh sử dụng tiền tố `google`.

Kỳ vọng: hoặc một phép nhúng Gemini gốc với khóa Google AI Studio trên nhà
cung cấp `gemini`, hoặc mã 400 nêu rõ id OpenRouter đang hoạt động.

Cách tái hiện (che bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Phương án thay thế hoạt động:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` gốc không thể hoạt động chỉ bằng GitOps. Phải thêm khóa
Google AI Studio dưới dạng kết nối nhà cung cấp `gemini` (trang tổng quan hoặc
`GEMINI_API_KEY` được nhập vào OmniRoute). Thông tin bí mật đó không có trong repo này.

### Đường dẫn đa phương thức Jina

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

Sử dụng `POST /v1/embeddings` cho đến khi có bí danh.

### Đối tượng hình ảnh Jina / Memorix

Mục hình ảnh chuẩn của OmniRoute (PNG 28×28, 784 pixel — Jina từ chối 1×1):

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

Thực tế: HTTP **200**, 1 vector, 1024 chiều.

Định dạng gốc của Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Thực tế: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Việc trộn `{ "text": "..." }` với `{ "image": "data:..." }` cũng dẫn đến cùng mã 400.

## Ghi chú cho máy khách

### Hindsight 0.9.1

Các phép nhúng của Hindsight chỉ hỗ trợ văn bản (`encode(list[str])`). Nó không gửi
đối tượng hình ảnh. Trỏ URL cơ sở cho phép nhúng tương thích OpenAI của Hindsight đến
`/v1` của OmniRoute và sử dụng một id hoạt động trong bảng bên trên
(`jina-ai/jina-embeddings-v5-omni-small` hoặc
`openrouter/google/gemini-embedding-2`). Không đặt mô hình thành
`gemini-embedding-2` trần trừ khi cổng có khóa API `gemini`.

### Memorix 1.6.0

Memorix chỉ coi `baseUrl` khớp với `/jina\.ai/i` là phương tiện gốc. URL
OmniRoute vẫn đi theo đường dẫn chỉ hỗ trợ văn bản ngay cả khi mô hình là Jina omni.
Cổng đó là vấn đề của máy khách Memorix. Độc lập với vấn đề này, OmniRoute vẫn từ chối
phần thân Jina `{image: "data:..."}` mà Memorix sẽ gửi nếu cổng được
mở, vì vậy các máy khách tương thích Jina không thể nhúng hình ảnh thông qua OmniRoute
nếu không dùng lược đồ chuẩn `{type,source}`.

Sử dụng `jina-ai/jina-embeddings-v5-omni-small` cho văn bản. Không trỏ `base_url`
của Memorix đến `https://api.jina.ai` — hãy giữ OmniRoute là chặng trung gian duy nhất.
