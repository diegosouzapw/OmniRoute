# Embeddings client runbook (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

ਜਦੋਂ OmniRoute, Hindsight 0.9.1 (ਕੇਵਲ-ਟੈਕਸਟ `encode(list[str])`) ਅਤੇ Memorix 1.6.0 (Jina ਮੀਡੀਆ ਗੇਟ) ਦੇ ਅੱਗੇ ਹੋਵੇ, ਤਾਂ `POST /v1/embeddings` ਲਈ ਓਪਰੇਟਰ ਨੋਟਸ। OmniRoute 3.8.49 ਦੇ ਵਿਰੁੱਧ `https://omniroute.jaguar-fish.ts.net/v1` ਉੱਤੇ 2026-08-17 ਨੂੰ ਲਾਈਵ ਤਸਦੀਕ ਕੀਤੀ ਗਈ। ਹੇਠਾਂ ਕੋਈ ਗੁਪਤ ਜਾਣਕਾਰੀ ਨਹੀਂ ਹੈ।

## ਕੰਮ ਕਰਨ ਵਾਲੇ ਮਾਡਲ id

| ਕਲਾਇੰਟ id                                      | HTTP | ਵੈਕਟਰ     | ਆਯਾਮ    | ਨੋਟਸ                                       |
| ---------------------------------------------- | ---- | --------- | ------- | ------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | ਬੈਚ 2 → 2 | 3072    | ਨੇਟਿਵ Gemini ਕੁੰਜੀ ਤੋਂ ਬਿਨਾਂ ਕੰਮ ਕਰਦਾ ਹੈ   |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ਬੈਚ 2 → 2 | 3072    | ਨਾਨ-ਪ੍ਰੀਵਿਊ id ਵਾਲਾ ਹੀ ਵੈਕਟਰ ਸਪੇਸ          |
| `openrouter/google/gemini-embedding-001`       | 200  | ਬੈਚ 2 → 2 | 3072    | `GET /v1/embeddings` ਵਿੱਚ ਸੂਚੀਬੱਧ          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ਬੈਚ 2 → 2 | 1024    | ਕੈਨੋਨਿਕਲ Jina omni id                      |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ਬੈਚ 2 → 2 | 1024    | ਉਪਨਾਮ; ਜਵਾਬ ਵਿੱਚ `model` `jina-ai/...` ਹੈ  |
| `jina-embeddings-v5-omni-small`                | 200  | ਬੈਚ 2 → 2 | 1024    | ਬਿਨਾਂ ਪ੍ਰੀਫਿਕਸ ਵਾਲਾ id ਵੀ ਰਿਜ਼ਾਲਵ ਹੁੰਦਾ ਹੈ |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | small ਤੋਂ ਵੱਖਰਾ ਵੈਕਟਰ ਸਪੇਸ                 |

`GET /v1/models` ਅਤੇ `GET /v1/embeddings` ਨੇ
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), ਅਤੇ
`openrouter/google/gemini-embedding-001` ਨੂੰ ਸੂਚੀਬੱਧ ਕੀਤਾ। ਉਨ੍ਹਾਂ ਨੇ
`openrouter/google/gemini-embedding-2` ਨੂੰ ਸੂਚੀਬੱਧ **ਨਹੀਂ** ਕੀਤਾ, ਭਾਵੇਂ ਉਹ id ਪਹਿਲਾਂ ਹੀ ਸੇਵਾ ਦੇ ਰਿਹਾ ਹੈ।

nano (768-d) ਅਤੇ small (1024-d) ਨੂੰ ਇੱਕੋ ਇੰਡੈਕਸ ਵਿੱਚ ਨਾ ਮਿਲਾਓ। ਉਹ
ਤੁਲਨਾਯੋਗ ਨਹੀਂ ਹਨ।

## ਖ਼ਰਾਬ / ਗੁੰਮਰਾਹਕੁੰਨ id

### ਨੇਟਿਵ Gemini Embedding 2

ਬੇਨਤੀ:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

ਅਸਲ ਨਤੀਜਾ (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ਵੀ ਉਹੀ 400 ਵਾਪਸ ਕਰਦਾ ਹੈ। `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` ਵਾਪਸ ਕਰਦਾ ਹੈ, ਜਦੋਂ ਤੱਕ ਕੋਈ ਕਸਟਮ
ਪ੍ਰੋਵਾਈਡਰ ਨੋਡ `google` ਪ੍ਰੀਫਿਕਸ ਦੀ ਵਰਤੋਂ ਨਾ ਕਰੇ।

ਉਮੀਦ: ਜਾਂ ਤਾਂ `gemini` ਪ੍ਰੋਵਾਈਡਰ ਉੱਤੇ Google AI Studio ਕੁੰਜੀ ਨਾਲ ਨੇਟਿਵ Gemini ਐਮਬੈਡ, ਜਾਂ ਅਜਿਹਾ 400 ਜੋ ਕੰਮ ਕਰਨ ਵਾਲੇ OpenRouter id ਦਾ ਨਾਮ ਦੱਸੇ।

ਮੁੜ ਉਤਪਾਦਨ (bearer ਨੂੰ ਲੁਕਾਓ):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

ਕੰਮ ਕਰਨ ਵਾਲਾ ਬਦਲ:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ਨੇਟਿਵ `gemini-embedding-2` ਸਿਰਫ਼ GitOps ਨਾਲ ਸਫਲ ਨਹੀਂ ਹੋ ਸਕਦਾ। Google AI
Studio ਕੁੰਜੀ ਨੂੰ `gemini` ਪ੍ਰੋਵਾਈਡਰ ਕਨੈਕਸ਼ਨ ਵਜੋਂ ਜੋੜਨਾ ਲਾਜ਼ਮੀ ਹੈ (ਡੈਸ਼ਬੋਰਡ ਜਾਂ
OmniRoute ਵਿੱਚ ਇੰਪੋਰਟ ਕੀਤਾ `GEMINI_API_KEY`)। ਉਹ ਗੁਪਤ ਕੁੰਜੀ ਇਸ repo ਵਿੱਚ ਨਹੀਂ ਹੈ।

### Jina ਮਲਟੀਮੋਡਲ ਪਾਥ

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

ਉਪਨਾਮ ਉਪਲਬਧ ਹੋਣ ਤੱਕ `POST /v1/embeddings` ਦੀ ਵਰਤੋਂ ਕਰੋ।

### Jina / Memorix ਇਮੇਜ ਆਬਜੈਕਟ

OmniRoute ਦਾ ਕੈਨੋਨਿਕਲ ਇਮੇਜ ਆਈਟਮ (28×28 PNG, 784 ਪਿਕਸਲ — Jina 1×1 ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ):

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

ਅਸਲ ਨਤੀਜਾ: HTTP **200**, 1 ਵੈਕਟਰ, 1024-d।

Memorix 1.6.0 / Jina ਦੀ ਨੇਟਿਵ ਬਣਤਰ:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

ਅਸਲ ਨਤੀਜਾ: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ਨੂੰ `{ "image": "data:..." }` ਨਾਲ ਮਿਲਾਉਣ ਉੱਤੇ ਵੀ ਉਹੀ 400 ਮਿਲਦਾ ਹੈ।

## ਕਲਾਇੰਟ ਨੋਟਸ

### Hindsight 0.9.1

Hindsight ਐਮਬੈਡਿੰਗ ਕੇਵਲ-ਟੈਕਸਟ ਹਨ (`encode(list[str])`)। ਇਹ ਇਮੇਜ ਆਬਜੈਕਟ ਨਹੀਂ ਭੇਜਦਾ।
Hindsight ਦੇ OpenAI-ਅਨੁਕੂਲ ਐਮਬੈਡਿੰਗ base URL ਨੂੰ OmniRoute `/v1` ਵੱਲ ਸੈੱਟ ਕਰੋ ਅਤੇ
ਉਪਰੋਕਤ ਟੇਬਲ ਵਿੱਚੋਂ ਕੋਈ ਕੰਮ ਕਰਨ ਵਾਲਾ id ਵਰਤੋ
(`jina-ai/jina-embeddings-v5-omni-small` ਜਾਂ
`openrouter/google/gemini-embedding-2`)। ਮਾਡਲ ਨੂੰ ਬਿਨਾਂ ਪ੍ਰੀਫਿਕਸ ਵਾਲੇ
`gemini-embedding-2` ਉੱਤੇ ਸੈੱਟ ਨਾ ਕਰੋ, ਜਦੋਂ ਤੱਕ ਗੇਟਵੇ ਉੱਤੇ `gemini` API ਕੁੰਜੀ ਮੌਜੂਦ ਨਾ ਹੋਵੇ।

### Memorix 1.6.0

Memorix ਕੇਵਲ `/jina\.ai/i` ਨਾਲ ਮੇਲ ਖਾਂਦੇ `baseUrl` ਨੂੰ ਨੇਟਿਵ ਮੀਡੀਆ ਮੰਨਦਾ ਹੈ। Jina omni ਮਾਡਲ ਹੋਣ ਦੇ ਬਾਵਜੂਦ OmniRoute URL ਕੇਵਲ-ਟੈਕਸਟ ਪਾਥ ਉੱਤੇ ਹੀ ਰਹਿੰਦਾ ਹੈ।
ਉਹ ਗੇਟ Memorix ਕਲਾਇੰਟ ਦੀ ਸਮੱਸਿਆ ਹੈ। ਇਸ ਤੋਂ ਇਲਾਵਾ, OmniRoute ਹਾਲੇ ਵੀ ਉਸ Jina
`{image: "data:..."}` ਬਾਡੀ ਨੂੰ ਅਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ਜੋ ਗੇਟ ਖੁੱਲ੍ਹਣ ਉੱਤੇ Memorix ਭੇਜਦਾ, ਇਸ ਲਈ Jina-ਅਨੁਕੂਲ ਕਲਾਇੰਟ ਕੈਨੋਨਿਕਲ `{type,source}` ਸਕੀਮਾ ਤੋਂ ਬਿਨਾਂ OmniRoute ਰਾਹੀਂ ਇਮੇਜ ਐਮਬੈਡ ਨਹੀਂ ਕਰ ਸਕਦੇ।

ਟੈਕਸਟ ਲਈ `jina-ai/jina-embeddings-v5-omni-small` ਦੀ ਵਰਤੋਂ ਕਰੋ। Memorix ਦੇ
`base_url` ਨੂੰ `https://api.jina.ai` ਵੱਲ ਨਾ ਭੇਜੋ — OmniRoute ਨੂੰ ਹੀ ਇਕਲੌਤਾ ਹੌਪ ਬਣਾਈ ਰੱਖੋ।
