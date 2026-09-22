# Embeddings client runbook (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md)

---

當 OmniRoute 位於 Hindsight 0.9.1（僅文字的 `encode(list[str])`）和 Memorix 1.6.0（Jina 媒體閘道）前方時，關於 `POST /v1/embeddings` 的操作說明。已於 2026-08-17 針對 OmniRoute 3.8.49 在 `https://omniroute.jaguar-fish.ts.net/v1` 進行實際驗證。以下不含任何密鑰。

## 可用的模型 id

| 用戶端 id                                      | HTTP | 向量       | 維度    | 備註                                    |
| ---------------------------------------------- | ---- | ---------- | ------- | --------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 批次 2 → 2 | 3072    | 無需原生 Gemini 金鑰即可運作            |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 批次 2 → 2 | 3072    | 與非預覽版 id 使用相同的向量空間        |
| `openrouter/google/gemini-embedding-001`       | 200  | 批次 2 → 2 | 3072    | 列於 `GET /v1/embeddings` 中            |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 批次 2 → 2 | 1024    | 標準 Jina omni id                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 批次 2 → 2 | 1024    | 別名；回應中的 `model` 為 `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | 批次 2 → 2 | 1024    | 裸 id 也能解析                          |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | 與 small 使用不同的向量空間             |

`GET /v1/models` 和 `GET /v1/embeddings` 列出了
`jina-ai/jina-embeddings-v5-omni-small`（1024）、
`jina-ai/jina-embeddings-v5-omni-nano`（768），以及
`openrouter/google/gemini-embedding-001`。即使
`openrouter/google/gemini-embedding-2` 已可提供服務，它們也**沒有**列出該 id。

請勿在同一索引中混用 nano（768 維）與 small（1024 維）。兩者不可比較。

## 無法使用／具有誤導性的 id

### 原生 Gemini Embedding 2

請求：

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

實際結果（2026-08-17）：HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` 會傳回相同的 400。除非有自訂提供者節點使用 `google` 前綴，否則 `google/gemini-embedding-2` 會傳回 HTTP **400** `Unknown embedding provider: google`。

預期結果：使用 `gemini` 提供者上的 Google AI Studio 金鑰進行原生 Gemini 嵌入，或傳回一個指出可用 OpenRouter id 的 400。

重現方式（請遮蔽 bearer）：

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

可用的替代方案：

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

原生 `gemini-embedding-2` 無法僅透過 GitOps 成功執行。必須將 Google AI Studio 金鑰新增為 `gemini` 提供者連線（透過儀表板，或將 `GEMINI_API_KEY` 匯入 OmniRoute）。此儲存庫中不含該密鑰。

### Jina 多模態路徑

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

在別名可用之前，請使用 `POST /v1/embeddings`。

### Jina / Memorix 圖片物件

OmniRoute 標準圖片項目（28×28 PNG，784 個像素 — Jina 會拒絕 1×1）：

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

實際結果：HTTP **200**，1 個向量，1024 維。

Memorix 1.6.0 / Jina 原生格式：

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

實際結果：HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

將 `{ "text": "..." }` 與 `{ "image": "data:..." }` 混合使用時，也會得到相同的 400。

## 用戶端說明

### Hindsight 0.9.1

Hindsight 嵌入僅支援文字（`encode(list[str])`）。它不會傳送圖片物件。請將 Hindsight 的 OpenAI 相容嵌入基礎 URL 指向 OmniRoute `/v1`，並使用上表中的可用 id（`jina-ai/jina-embeddings-v5-omni-small` 或 `openrouter/google/gemini-embedding-2`）。除非閘道上已有 `gemini` API 金鑰，否則請勿將模型設為裸 `gemini-embedding-2`。

### Memorix 1.6.0

Memorix 只會將符合 `/jina\.ai/i` 的 `baseUrl` 視為原生媒體端點。即使模型是 Jina omni，OmniRoute URL 仍會使用僅文字的路徑。此閘道限制是 Memorix 用戶端的問題。除此之外，即使閘道開啟，OmniRoute 仍會拒絕 Memorix 所傳送的 Jina `{image: "data:..."}` 主體，因此若不採用標準 `{type,source}` 結構描述，Jina 相容用戶端就無法透過 OmniRoute 嵌入圖片。

文字請使用 `jina-ai/jina-embeddings-v5-omni-small`。請勿將 Memorix 的 `base_url` 指向 `https://api.jina.ai` — 請維持 OmniRoute 為唯一的中繼站。
