# Embeddings client runbook (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute በHindsight 0.9.1 (ጽሑፍ-ብቻ `encode(list[str])`) እና Memorix 1.6.0 (Jina ሚዲያ ጌት) ፊት ሲቀመጥ ለ`POST /v1/embeddings` የኦፕሬተር ማስታወሻዎች። በ2026-08-17 በቀጥታ ከOmniRoute 3.8.49 ጋር በ
`https://omniroute.jaguar-fish.ts.net/v1` ተረጋግጧል። ከታች ምንም ሚስጥር የለም።

## የሚሰሩ የሞዴል መለያዎች

| የደንበኛ መለያ                                      | HTTP | ቬክተሮች    | ልኬት     | ማስታወሻዎች                                    |
| ---------------------------------------------- | ---- | -------- | ------- | ------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | ባች 2 → 2 | 3072    | ቤተኛ Gemini ቁልፍ ሳያስፈልግ ይሰራል                 |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ባች 2 → 2 | 3072    | ቅድመ-ዕይታ ካልሆነው መለያ ጋር ተመሳሳይ የቬክተር ቦታ        |
| `openrouter/google/gemini-embedding-001`       | 200  | ባች 2 → 2 | 3072    | በ`GET /v1/embeddings` ውስጥ ተዘርዝሯል           |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ባች 2 → 2 | 1024    | መደበኛው የJina omni መለያ                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ባች 2 → 2 | 1024    | ተለዋጭ ስም፤ በምላሹ ያለው `model` `jina-ai/...` ነው |
| `jina-embeddings-v5-omni-small`                | 200  | ባች 2 → 2 | 1024    | ባዶው መለያም ይፈታል                              |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1    | **768** | ከsmall የተለየ የቬክተር ቦታ                       |

`GET /v1/models` እና `GET /v1/embeddings`
`jina-ai/jina-embeddings-v5-omni-small` (1024)፣
`jina-ai/jina-embeddings-v5-omni-nano` (768) እና
`openrouter/google/gemini-embedding-001`ን ዘርዝረዋል። ምንም እንኳን ያ መለያ አስቀድሞ እያገለገለ ቢሆንም
`openrouter/google/gemini-embedding-2`ን **አልዘረዘሩም**።

nano (768-d) እና small (1024-d)ን በአንድ ኢንዴክስ ውስጥ አትቀላቅሉ። እርስ በርሳቸው
ሊነጻጸሩ አይችሉም።

## የተበላሹ / አሳሳች መለያዎች

### ቤተኛ Gemini Embedding 2

ጥያቄ፦

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

ትክክለኛው ውጤት (2026-08-17)፦ HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ተመሳሳዩን 400 ይመልሳል። ብጁ የአቅራቢ ኖድ የ`google` ቅድመ ቅጥያን ካልተጠቀመ በስተቀር፣ `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` ይመልሳል።

የሚጠበቀው፦ በ`gemini` አቅራቢ ላይ የGoogle AI Studio ቁልፍ ያለው ቤተኛ Gemini embed፣ ወይም የሚሰራውን OpenRouter መለያ የሚጠቅስ 400።

እንደገና ለማስከሰት (bearerን ደብቅ)፦

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

የሚሰራ ምትክ፦

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ቤተኛው `gemini-embedding-2` በGitOps ብቻ ሊሳካ አይችልም። የGoogle AI
Studio ቁልፍ እንደ `gemini` የአቅራቢ ግንኙነት መጨመር አለበት (ዳሽቦርድ ወይም
ወደ OmniRoute የገባ `GEMINI_API_KEY`)። ያ ሚስጥር በዚህ repo ውስጥ የለም።

### የJina መልቲሞዳል መንገድ

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

ተለዋጭ ስም እስኪኖር ድረስ `POST /v1/embeddings`ን ይጠቀሙ።

### የJina / Memorix ምስል ኦብጀክት

የOmniRoute መደበኛ የምስል ንጥል (28×28 PNG፣ 784 ፒክሰሎች — Jina 1×1ን ውድቅ ያደርጋል)፦

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

ትክክለኛው ውጤት፦ HTTP **200**፣ 1 ቬክተር፣ 1024-d።

የMemorix 1.6.0 / Jina ቤተኛ ቅርጽ፦

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

ትክክለኛው ውጤት፦ HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ከ`{ "image": "data:..." }` ጋር ሲቀላቀል ተመሳሳዩን 400 ይመልሳል።

## የደንበኛ ማስታወሻዎች

### Hindsight 0.9.1

የHindsight embeddings ጽሑፍ-ብቻ ናቸው (`encode(list[str])`)። የምስል ኦብጀክቶችን
አይልክም። የHindsightን ከOpenAI ጋር ተኳሃኝ የሆነ embeddings መሠረታዊ URL ወደ
OmniRoute `/v1` ያመልክቱ እና ከላይ ባለው ሰንጠረዥ ውስጥ የሚሰራ መለያ
(`jina-ai/jina-embeddings-v5-omni-small` ወይም
`openrouter/google/gemini-embedding-2`) ይጠቀሙ። በጌትዌዩ ላይ የ`gemini` API ቁልፍ ከሌለ በስተቀር ሞዴሉን ወደ ባዶው
`gemini-embedding-2` አያዘጋጁ።

### Memorix 1.6.0

Memorix ከ`/jina\.ai/i` ጋር የሚዛመድ `baseUrl`ን ብቻ እንደ ቤተኛ ሚዲያ ይቆጥራል።
ሞዴሉ Jina omni ቢሆንም የOmniRoute URL በጽሑፍ-ብቻ መንገድ ላይ ይቆያል።
ያ ጌት የMemorix ደንበኛ ችግር ነው። ከዚህ በተናጠል፣ ጌቱ
ቢከፈት Memorix የሚልከውን የJina `{image: "data:..."}` አካል OmniRoute አሁንም ውድቅ ያደርጋል፤ ስለዚህ ከJina ጋር ተኳሃኝ የሆኑ ደንበኞች መደበኛውን `{type,source}` ስኪማ ሳይጠቀሙ ምስሎችን በOmniRoute በኩል embed ማድረግ አይችሉም።

ለጽሑፍ `jina-ai/jina-embeddings-v5-omni-small`ን ይጠቀሙ። የMemorix
`base_url`ን ወደ `https://api.jina.ai` አያመልክቱ — OmniRouteን ብቸኛው መካከለኛ መዳረሻ አድርገው ያቆዩ።
