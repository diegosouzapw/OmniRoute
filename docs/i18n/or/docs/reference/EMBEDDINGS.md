# Embeddings client runbook (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute, Hindsight 0.9.1 (କେବଳ-ଟେକ୍ସଟ୍ `encode(list[str])`) ଏବଂ Memorix 1.6.0 (Jina ମିଡିଆ ଗେଟ୍) ସମ୍ମୁଖରେ ଥିବାବେଳେ `POST /v1/embeddings` ପାଇଁ ଅପରେଟର୍ ଟିପ୍ପଣୀ। `https://omniroute.jaguar-fish.ts.net/v1` ଠାରେ OmniRoute 3.8.49 ବିପକ୍ଷରେ 2026-08-17 ରେ ଲାଇଭ୍ ଯାଞ୍ଚ କରାଯାଇଛି। ନିମ୍ନରେ କୌଣସି ଗୁପ୍ତ ତଥ୍ୟ ନାହିଁ।

## କାର୍ଯ୍ୟକ୍ଷମ ମଡେଲ୍ id

| କ୍ଲାଏଣ୍ଟ id                                    | HTTP | ଭେକ୍ଟର୍      | Dim     | ଟିପ୍ପଣୀ                                         |
| ---------------------------------------------- | ---- | ------------ | ------- | ----------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | ବ୍ୟାଚ୍ 2 → 2 | 3072    | ଏକ ନେଟିଭ୍ Gemini କୀ ବିନା କାମ କରେ                |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ବ୍ୟାଚ୍ 2 → 2 | 3072    | ନନ୍-ପ୍ରିଭ୍ୟୁ id ସହିତ ସମାନ ସ୍ପେସ୍                |
| `openrouter/google/gemini-embedding-001`       | 200  | ବ୍ୟାଚ୍ 2 → 2 | 3072    | `GET /v1/embeddings` ରେ ତାଲିକାଭୁକ୍ତ             |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ବ୍ୟାଚ୍ 2 → 2 | 1024    | କ୍ୟାନୋନିକାଲ୍ Jina omni id                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ବ୍ୟାଚ୍ 2 → 2 | 1024    | ଉପନାମ; ପ୍ରତିକ୍ରିୟାର `model` ହେଉଛି `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | ବ୍ୟାଚ୍ 2 → 2 | 1024    | ଖାଲି id ମଧ୍ୟ ସମାଧାନ ହୁଏ                         |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | small ଠାରୁ ଭିନ୍ନ ଭେକ୍ଟର୍ ସ୍ପେସ୍                 |

`GET /v1/models` ଏବଂ `GET /v1/embeddings` ରେ
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) ଏବଂ
`openrouter/google/gemini-embedding-001` ତାଲିକାଭୁକ୍ତ ଥିଲା। ସେଗୁଡ଼ିକ
`openrouter/google/gemini-embedding-2` କୁ ତାଲିକାଭୁକ୍ତ କରିନଥିଲେ, ଯଦିଓ ସେହି id ପୂର୍ବରୁ ସେବା ପ୍ରଦାନ କରୁଛି।

ଗୋଟିଏ ଇଣ୍ଡେକ୍ସରେ nano (768-d) ଏବଂ small (1024-d) କୁ ମିଶାନ୍ତୁ ନାହିଁ। ସେଗୁଡ଼ିକ ତୁଳନୀୟ ନୁହେଁ।

## ଅକାମୀ / ବିଭ୍ରାନ୍ତିକର id

### ନେଟିଭ୍ Gemini Embedding 2

ଅନୁରୋଧ:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

ପ୍ରକୃତ ଫଳାଫଳ (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ସମାନ 400 ଫେରାଏ। ଏକ କଷ୍ଟମ୍ ପ୍ରୋଭାଇଡର୍ ନୋଡ୍ `google` ପ୍ରିଫିକ୍ସ ବ୍ୟବହାର ନକଲେ, `google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google` ଫେରାଏ।

ଆଶାକୃତ: `gemini` ପ୍ରୋଭାଇଡର୍ରେ ଏକ Google AI Studio କୀ ସହିତ ନେଟିଭ୍ Gemini embed, କିମ୍ବା କାର୍ଯ୍ୟକ୍ଷମ OpenRouter id ଉଲ୍ଲେଖ କରୁଥିବା ଏକ 400।

ପୁନଃସୃଷ୍ଟି (bearer କୁ ଗୋପନ କରନ୍ତୁ):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

କାର୍ଯ୍ୟକ୍ଷମ ବିକଳ୍ପ:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ନେଟିଭ୍ `gemini-embedding-2` କେବଳ GitOps ରୁ ସଫଳ ହୋଇପାରିବ ନାହିଁ। ଏକ Google AI Studio କୀକୁ `gemini` ପ୍ରୋଭାଇଡର୍ ସଂଯୋଗ ଭାବରେ ଯୋଡ଼ିବା ଆବଶ୍ୟକ (ଡ୍ୟାସ୍ବୋର୍ଡ କିମ୍ବା OmniRoute ଭିତରକୁ ଆମଦାନୀ ହୋଇଥିବା `GEMINI_API_KEY`)। ସେହି ଗୁପ୍ତ ତଥ୍ୟ ଏହି repo ରେ ନାହିଁ।

### Jina ମଲ୍ଟିମୋଡାଲ୍ ପଥ

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

ଏକ ଉପନାମ ଉପଲବ୍ଧ ହେବା ପର୍ଯ୍ୟନ୍ତ `POST /v1/embeddings` ବ୍ୟବହାର କରନ୍ତୁ।

### Jina / Memorix ଛବି ଅବଜେକ୍ଟ

OmniRoute କ୍ୟାନୋନିକାଲ୍ ଛବି ଆଇଟମ୍ (28×28 PNG, 784 ପିକ୍ସେଲ୍ — Jina 1×1 କୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ):

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

ପ୍ରକୃତ ଫଳାଫଳ: HTTP **200**, 1 ଭେକ୍ଟର୍, 1024-d।

Memorix 1.6.0 / Jina ନେଟିଭ୍ ଆକୃତି:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

ପ୍ରକୃତ ଫଳାଫଳ: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` କୁ `{ "image": "data:..." }` ସହିତ ମିଶାଇଲେ ସମାନ 400 ମିଳେ।

## କ୍ଲାଏଣ୍ଟ ଟିପ୍ପଣୀ

### Hindsight 0.9.1

Hindsight embeddings କେବଳ-ଟେକ୍ସଟ୍ (`encode(list[str])`)। ଏହା ଛବି ଅବଜେକ୍ଟ ପଠାଏ ନାହିଁ। Hindsight ର OpenAI-ସୁସଙ୍ଗତ embeddings ବେସ୍ URL କୁ OmniRoute `/v1` ଆଡ଼କୁ ନିର୍ଦ୍ଦେଶ କରନ୍ତୁ ଏବଂ ଉପରୋକ୍ତ ସାରଣୀରୁ ଏକ କାର୍ଯ୍ୟକ୍ଷମ id (`jina-ai/jina-embeddings-v5-omni-small` କିମ୍ବା `openrouter/google/gemini-embedding-2`) ବ୍ୟବହାର କରନ୍ତୁ। ଗେଟ୍ୱେରେ ଏକ `gemini` API କୀ ନଥିଲେ ମଡେଲ୍କୁ ଖାଲି `gemini-embedding-2` ଭାବେ ସେଟ୍ କରନ୍ତୁ ନାହିଁ।

### Memorix 1.6.0

Memorix କେବଳ `/jina\.ai/i` ସହିତ ମେଳ ଖାଉଥିବା `baseUrl` କୁ ନେଟିଭ୍ ମିଡିଆ ଭାବେ ବିବେଚନା କରେ। ମଡେଲ୍ଟି Jina omni ହୋଇଥିଲେ ମଧ୍ୟ ଏକ OmniRoute URL କେବଳ-ଟେକ୍ସଟ୍ ପଥରେ ରହିଥାଏ। ସେହି ଗେଟ୍ ହେଉଛି ଏକ Memorix କ୍ଲାଏଣ୍ଟ ସମସ୍ୟା। ସ୍ୱତନ୍ତ୍ର ଭାବରେ, ଗେଟ୍ ଖୋଲିଲେ Memorix ପଠାଇବାକୁ ଥିବା Jina `{image: "data:..."}` ବଡିକୁ OmniRoute ଏବେ ମଧ୍ୟ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ, ତେଣୁ କ୍ୟାନୋନିକାଲ୍ `{type,source}` ସ୍କିମା ବିନା Jina-ସୁସଙ୍ଗତ କ୍ଲାଏଣ୍ଟଗୁଡ଼ିକ OmniRoute ମାଧ୍ୟମରେ ଛବି embed କରିପାରିବେ ନାହିଁ।

ଟେକ୍ସଟ୍ ପାଇଁ `jina-ai/jina-embeddings-v5-omni-small` ବ୍ୟବହାର କରନ୍ତୁ। Memorix `base_url` କୁ `https://api.jina.ai` ଆଡ଼କୁ ନିର୍ଦ୍ଦେଶ କରନ୍ତୁ ନାହିଁ — OmniRoute କୁ ଏକମାତ୍ର ହପ୍ ଭାବେ ରଖନ୍ତୁ।
