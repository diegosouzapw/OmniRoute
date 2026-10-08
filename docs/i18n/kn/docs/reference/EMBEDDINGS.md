# Embeddings client runbook (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute, Hindsight 0.9.1 (ಪಠ್ಯ-ಮಾತ್ರ `encode(list[str])`) ಮತ್ತು Memorix 1.6.0 (Jina ಮೀಡಿಯಾ ಗೇಟ್) ಮುಂಭಾಗದಲ್ಲಿರುವಾಗ `POST /v1/embeddings` ಗಾಗಿ ಆಪರೇಟರ್ ಟಿಪ್ಪಣಿಗಳು. OmniRoute 3.8.49 ವಿರುದ್ಧ `https://omniroute.jaguar-fish.ts.net/v1` ನಲ್ಲಿ 2026-08-17 ರಂದು ಲೈವ್ ಆಗಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ. ಕೆಳಗೆ ಯಾವುದೇ ರಹಸ್ಯಗಳಿಲ್ಲ.

## ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಮಾಡೆಲ್ id-ಗಳು

| ಕ್ಲೈಂಟ್ id                                     | HTTP | ವೆಕ್ಟರ್ಗಳು   | ಆಯಾಮ    | ಟಿಪ್ಪಣಿಗಳು                                        |
| ---------------------------------------------- | ---- | ------------ | ------- | ------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | ಬ್ಯಾಚ್ 2 → 2 | 3072    | ಸ್ಥಳೀಯ Gemini ಕೀ ಇಲ್ಲದೆಯೇ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ     |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ಬ್ಯಾಚ್ 2 → 2 | 3072    | ಪೂರ್ವವೀಕ್ಷಣೆಯಲ್ಲದ id ಇರುವ ಅದೇ ವೆಕ್ಟರ್ ಸ್ಪೇಸ್      |
| `openrouter/google/gemini-embedding-001`       | 200  | ಬ್ಯಾಚ್ 2 → 2 | 3072    | `GET /v1/embeddings` ನಲ್ಲಿ ಪಟ್ಟಿಮಾಡಲಾಗಿದೆ         |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ಬ್ಯಾಚ್ 2 → 2 | 1024    | ಕ್ಯಾನಾನಿಕಲ್ Jina omni id                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ಬ್ಯಾಚ್ 2 → 2 | 1024    | ಅಲಿಯಾಸ್; ಪ್ರತಿಕ್ರಿಯೆಯ `model` ಎಂದರೆ `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | ಬ್ಯಾಚ್ 2 → 2 | 1024    | ಬೇರ್ id ಕೂಡ ಪರಿಹಾರಗೊಳ್ಳುತ್ತದೆ                     |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | small ಗಿಂತ ಭಿನ್ನವಾದ ವೆಕ್ಟರ್ ಸ್ಪೇಸ್                |

`GET /v1/models` ಮತ್ತು `GET /v1/embeddings` ಇವು
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) ಮತ್ತು
`openrouter/google/gemini-embedding-001` ಅನ್ನು ಪಟ್ಟಿಮಾಡಿವೆ. ಆದರೆ ಈಗಾಗಲೇ ಆ id ಸೇವೆ ಒದಗಿಸುತ್ತಿದ್ದರೂ ಅವು
`openrouter/google/gemini-embedding-2` ಅನ್ನು ಪಟ್ಟಿಮಾಡಿರಲಿಲ್ಲ.

ಒಂದೇ ಇಂಡೆಕ್ಸ್ನಲ್ಲಿ nano (768-d) ಮತ್ತು small (1024-d) ಅನ್ನು ಮಿಶ್ರಣ ಮಾಡಬೇಡಿ. ಅವುಗಳನ್ನು
ಹೋಲಿಸಲಾಗುವುದಿಲ್ಲ.

## ದೋಷಪೂರಿತ / ದಾರಿತಪ್ಪಿಸುವ id-ಗಳು

### ಸ್ಥಳೀಯ Gemini Embedding 2

ವಿನಂತಿ:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

ವಾಸ್ತವಿಕ ಫಲಿತಾಂಶ (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ಕೂಡ ಅದೇ 400 ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಕಸ್ಟಮ್
ಪ್ರೊವೈಡರ್ ನೋಡ್ `google` ಪ್ರಿಫಿಕ್ಸ್ ಬಳಸದೆ ಇದ್ದರೆ, `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.

ನಿರೀಕ್ಷಿತ ಫಲಿತಾಂಶ: `gemini` ಪ್ರೊವೈಡರ್ನಲ್ಲಿ Google AI Studio ಕೀ ಹೊಂದಿರುವ ಸ್ಥಳೀಯ Gemini ಎಂಬೆಡ್, ಅಥವಾ ಕಾರ್ಯನಿರ್ವಹಿಸುವ OpenRouter id ಅನ್ನು ಹೆಸರಿಸುವ 400.

ಮರುಸೃಷ್ಟಿ (ಬೇರರ್ ಅನ್ನು ಮರೆಮಾಡಿ):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

ಕಾರ್ಯನಿರ್ವಹಿಸುವ ಪರ್ಯಾಯ:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ಸ್ಥಳೀಯ `gemini-embedding-2` GitOps ಮಾತ್ರದಿಂದ ಯಶಸ್ವಿಯಾಗಲು ಸಾಧ್ಯವಿಲ್ಲ. Google AI
Studio ಕೀಯನ್ನು `gemini` ಪ್ರೊವೈಡರ್ ಸಂಪರ್ಕವಾಗಿ ಸೇರಿಸಬೇಕು (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅಥವಾ OmniRoute ಒಳಗೆ ಆಮದು ಮಾಡಿದ
`GEMINI_API_KEY`). ಆ ರಹಸ್ಯವು ಈ repo ಯಲ್ಲಿಲ್ಲ.

### Jina ಮಲ್ಟಿಮೋಡಲ್ ಪಥ

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

ಅಲಿಯಾಸ್ ಲಭ್ಯವಾಗುವವರೆಗೆ `POST /v1/embeddings` ಬಳಸಿ.

### Jina / Memorix ಚಿತ್ರ ಆಬ್ಜೆಕ್ಟ್

OmniRoute ಕ್ಯಾನಾನಿಕಲ್ ಚಿತ್ರ ಐಟಂ (28×28 PNG, 784 ಪಿಕ್ಸೆಲ್ಗಳು — Jina 1×1 ಅನ್ನು ತಿರಸ್ಕರಿಸುತ್ತದೆ):

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

ವಾಸ್ತವಿಕ ಫಲಿತಾಂಶ: HTTP **200**, 1 ವೆಕ್ಟರ್, 1024-d.

Memorix 1.6.0 / Jina ಸ್ಥಳೀಯ ಆಕಾರ:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

ವಾಸ್ತವಿಕ ಫಲಿತಾಂಶ: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ಅನ್ನು `{ "image": "data:..." }` ಜೊತೆಗೆ ಮಿಶ್ರಣ ಮಾಡಿದರೂ ಅದೇ 400 ಬರುತ್ತದೆ.

## ಕ್ಲೈಂಟ್ ಟಿಪ್ಪಣಿಗಳು

### Hindsight 0.9.1

Hindsight ಎಂಬೆಡಿಂಗ್ಗಳು ಪಠ್ಯ-ಮಾತ್ರ (`encode(list[str])`). ಇದು
ಚಿತ್ರ ಆಬ್ಜೆಕ್ಟ್ಗಳನ್ನು ಕಳುಹಿಸುವುದಿಲ್ಲ. Hindsight ನ OpenAI-ಹೊಂದಾಣಿಕೆಯ ಎಂಬೆಡಿಂಗ್ಗಳ ಬೇಸ್ URL ಅನ್ನು
OmniRoute `/v1` ಕಡೆಗೆ ನಿರ್ದೇಶಿಸಿ ಮತ್ತು ಮೇಲಿನ ಪಟ್ಟಿಯಿಂದ ಕಾರ್ಯನಿರ್ವಹಿಸುವ id ಅನ್ನು ಬಳಸಿ
(`jina-ai/jina-embeddings-v5-omni-small` ಅಥವಾ
`openrouter/google/gemini-embedding-2`). ಗೇಟ್ವೇಯಲ್ಲಿ `gemini` API ಕೀ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲದಿದ್ದರೆ, ಮಾಡೆಲ್ ಅನ್ನು ಬೇರ್
`gemini-embedding-2` ಗೆ ಹೊಂದಿಸಬೇಡಿ.

### Memorix 1.6.0

`baseUrl` `/jina\.ai/i` ಗೆ ಹೊಂದಿಕೆಯಾದಾಗ ಮಾತ್ರ Memorix ಅದನ್ನು ಸ್ಥಳೀಯ ಮೀಡಿಯಾ ಎಂದು ಪರಿಗಣಿಸುತ್ತದೆ. ಮಾಡೆಲ್ Jina omni ಆಗಿದ್ದರೂ
OmniRoute URL ಪಠ್ಯ-ಮಾತ್ರ ಪಥದಲ್ಲಿಯೇ ಉಳಿಯುತ್ತದೆ.
ಆ ಗೇಟ್ Memorix ಕ್ಲೈಂಟ್ನ ಸಮಸ್ಯೆಯಾಗಿದೆ. ಸ್ವತಂತ್ರವಾಗಿ, ಗೇಟ್
ತೆರೆದರೆ Memorix ಕಳುಹಿಸುವ Jina `{image: "data:..."}` ಬಾಡಿಯನ್ನು OmniRoute ಇನ್ನೂ ತಿರಸ್ಕರಿಸುತ್ತದೆ; ಆದ್ದರಿಂದ ಕ್ಯಾನಾನಿಕಲ್ `{type,source}` ಸ್ಕೀಮಾ ಇಲ್ಲದೆ Jina-ಹೊಂದಾಣಿಕೆಯ ಕ್ಲೈಂಟ್ಗಳು OmniRoute ಮೂಲಕ
ಚಿತ್ರಗಳನ್ನು ಎಂಬೆಡ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ.

ಪಠ್ಯಕ್ಕಾಗಿ `jina-ai/jina-embeddings-v5-omni-small` ಬಳಸಿ. Memorix
`base_url` ಅನ್ನು `https://api.jina.ai` ಕಡೆಗೆ ನಿರ್ದೇಶಿಸಬೇಡಿ — OmniRoute ಅನ್ನು ಏಕೈಕ ಹಾಪ್ ಆಗಿ ಇರಿಸಿ.
