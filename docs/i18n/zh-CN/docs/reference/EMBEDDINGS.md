# Embeddings client runbook (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

当 OmniRoute 位于 Hindsight 0.9.1（仅文本的 `encode(list[str])`）和 Memorix 1.6.0（Jina 媒体门控）前端时，以下是针对 `POST /v1/embeddings` 的运维说明。已于 2026-08-17 针对位于 `https://omniroute.jaguar-fish.ts.net/v1` 的 OmniRoute 3.8.49 进行在线验证。下文不包含任何密钥。

## 可用的模型 ID

| 客户端 ID                                      | HTTP | 向量       | 维度    | 备注                                    |
| ---------------------------------------------- | ---- | ---------- | ------- | --------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 批量 2 → 2 | 3072    | 无需原生 Gemini 密钥即可使用            |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 批量 2 → 2 | 3072    | 与非预览版 ID 使用相同的向量空间        |
| `openrouter/google/gemini-embedding-001`       | 200  | 批量 2 → 2 | 3072    | 已列在 `GET /v1/embeddings` 中          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 批量 2 → 2 | 1024    | 规范的 Jina omni ID                     |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 批量 2 → 2 | 1024    | 别名；响应中的 `model` 为 `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | 批量 2 → 2 | 1024    | 裸 ID 也可解析                          |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | 与 small 使用不同的向量空间             |

`GET /v1/models` 和 `GET /v1/embeddings` 列出了
`jina-ai/jina-embeddings-v5-omni-small`（1024）、
`jina-ai/jina-embeddings-v5-omni-nano`（768）以及
`openrouter/google/gemini-embedding-001`。它们**没有**列出
`openrouter/google/gemini-embedding-2`，尽管该 ID 已经可以提供服务。

不要在同一个索引中混用 nano（768 维）和 small（1024 维）。它们不可比较。

## 无效或有误导性的 ID

### 原生 Gemini Embedding 2

请求：

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

实际结果（2026-08-17）：HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` 返回相同的 400。除非某个自定义提供者节点使用 `google` 前缀，否则 `google/gemini-embedding-2` 会返回 HTTP **400** `Unknown embedding provider: google`。

预期结果：使用 `gemini` 提供者上的 Google AI Studio 密钥执行原生 Gemini 嵌入，或者返回一个指明可用 OpenRouter ID 的 400。

复现方式（请隐去 bearer）：

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

可用的替代方式：

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

仅靠 GitOps 无法使原生 `gemini-embedding-2` 成功运行。必须将 Google AI Studio 密钥添加为 `gemini` 提供者连接（通过控制面板，或将 `GEMINI_API_KEY` 导入 OmniRoute）。此仓库中不包含该密钥。

### Jina 多模态路径

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

在别名可用之前，请使用 `POST /v1/embeddings`。

### Jina / Memorix 图像对象

OmniRoute 规范图像项（28×28 PNG，784 像素——Jina 会拒绝 1×1 图像）：

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

实际结果：HTTP **200**，1 个向量，1024 维。

Memorix 1.6.0 / Jina 原生格式：

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

实际结果：HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

将 `{ "text": "..." }` 与 `{ "image": "data:..." }` 混合使用也会返回相同的 400。

## 客户端说明

### Hindsight 0.9.1

Hindsight 嵌入仅支持文本（`encode(list[str])`）。它不会发送图像对象。请将 Hindsight 的 OpenAI 兼容嵌入基础 URL 指向 OmniRoute `/v1`，并使用上表中的可用 ID（`jina-ai/jina-embeddings-v5-omni-small` 或 `openrouter/google/gemini-embedding-2`）。除非网关上存在 `gemini` API 密钥，否则不要将模型设置为裸 `gemini-embedding-2`。

### Memorix 1.6.0

仅当 `baseUrl` 匹配 `/jina\.ai/i` 时，Memorix 才会将其视为原生媒体接口。即使模型是 Jina omni，OmniRoute URL 仍会使用纯文本路径。该门控是 Memorix 客户端的问题。除此之外，即使门控已开启，OmniRoute 仍会拒绝 Memorix 将发送的 Jina `{image: "data:..."}` 请求体，因此如果不使用规范的 `{type,source}` 模式，兼容 Jina 的客户端就无法通过 OmniRoute 嵌入图像。

文本请使用 `jina-ai/jina-embeddings-v5-omni-small`。不要将 Memorix 的 `base_url` 指向 `https://api.jina.ai`——请将 OmniRoute 保持为唯一中转。
