# Embeddings client runbook (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute Hindsight 0.9.1 (faqat matnli `encode(list[str])`) va Memorix 1.6.0 (Jina media filtri) oldida turganida `POST /v1/embeddings` uchun operator qaydlari. 2026-08-17 kuni OmniRoute 3.8.49 bilan `https://omniroute.jaguar-fish.ts.net/v1` manzilida amalda tekshirilgan. Quyida hech qanday maxfiy maʼlumot yoʻq.

## Ishlaydigan model identifikatorlari

| Mijoz identifikatori                           | HTTP | Vektorlar         | Oʻlcham | Izohlar                                            |
| ---------------------------------------------- | ---- | ----------------- | ------- | -------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 2 talik paket → 2 | 3072    | Mahalliy Gemini kalitisiz ishlaydi                 |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 2 talik paket → 2 | 3072    | Preview boʻlmagan identifikator bilan bir xil fazo |
| `openrouter/google/gemini-embedding-001`       | 200  | 2 talik paket → 2 | 3072    | `GET /v1/embeddings` roʻyxatida mavjud             |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 2 talik paket → 2 | 1024    | Kanonik Jina omni identifikatori                   |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 2 talik paket → 2 | 1024    | Taxallus; javobdagi `model` — `jina-ai/...`        |
| `jina-embeddings-v5-omni-small`                | 200  | 2 talik paket → 2 | 1024    | Prefikssiz identifikator ham aniqlanadi            |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1             | **768** | Small modelidan farqli vektor fazosi               |

`GET /v1/models` va `GET /v1/embeddings` roʻyxatlarida
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) va
`openrouter/google/gemini-embedding-001` mavjud edi. `openrouter/google/gemini-embedding-2`
identifikatori allaqachon xizmat koʻrsatayotgan boʻlsa-da, ular uni roʻyxatda
**koʻrsatmadi**.

Nano (768 oʻlchamli) va small (1024 oʻlchamli) modellarini bitta indeksda
aralashtirmang. Ularni oʻzaro taqqoslab boʻlmaydi.

## Ishlamaydigan / chalgʻituvchi identifikatorlar

### Mahalliy Gemini Embedding 2

Soʻrov:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Amaldagi natija (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ham xuddi shu 400 javobini qaytaradi.
`google` prefiksidan foydalanadigan maxsus provayder tuguni boʻlmasa,
`google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google`
javobini qaytaradi.

Kutiladigan natija: `gemini` provayderida Google AI Studio kaliti bilan
mahalliy Gemini embedding yoki ishlaydigan OpenRouter identifikatorini
koʻrsatuvchi 400 javobi.

Qayta hosil qilish (bearer qiymatini yashiring):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Ishlaydigan muqobil:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Mahalliy `gemini-embedding-2` faqat GitOps orqali ishlay olmaydi. Google AI
Studio kaliti `gemini` provayder ulanishi sifatida qoʻshilishi kerak (boshqaruv
paneli orqali yoki `GEMINI_API_KEY` ni OmniRoute ichiga import qilish orqali).
Bu maxfiy maʼlumot ushbu repozitoriyda yoʻq.

### Jina multimodal yoʻli

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

Taxallus mavjud boʻlguncha `POST /v1/embeddings` dan foydalaning.

### Jina / Memorix rasm obyekti

OmniRoute kanonik rasm elementi (28×28 PNG, 784 piksel — Jina 1×1 oʻlchamni
rad etadi):

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

Amaldagi natija: HTTP **200**, 1 ta vektor, 1024 oʻlchamli.

Memorix 1.6.0 / Jina mahalliy shakli:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Amaldagi natija: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ni `{ "image": "data:..." }` bilan aralashtirish ham xuddi
shu 400 javobiga olib keladi.

## Mijozga oid qaydlar

### Hindsight 0.9.1

Hindsight embeddinglari faqat matn uchun moʻljallangan (`encode(list[str])`).
U rasm obyektlarini yubormaydi. Hindsight tizimidagi OpenAI bilan mos
embeddinglar asosiy URL manzilini OmniRoute `/v1` ga yoʻnaltiring va yuqoridagi
jadvaldan ishlaydigan identifikatordan
(`jina-ai/jina-embeddings-v5-omni-small` yoki
`openrouter/google/gemini-embedding-2`) foydalaning. Shlyuzda `gemini` API
kaliti mavjud boʻlmasa, modelni prefikssiz `gemini-embedding-2` qiymatiga
oʻrnatmang.

### Memorix 1.6.0

Memorix faqat `/jina\.ai/i` ga mos keladigan `baseUrl` ni mahalliy media
sifatida qabul qiladi. Model Jina omni boʻlsa ham, OmniRoute URL manzili faqat
matnli yoʻlda qoladi. Bu filtr Memorix mijozidagi muammodir. Bundan mustaqil
ravishda, OmniRoute filtr ochilganida Memorix yuboradigan Jina
`{image: "data:..."}` soʻrov tanasini hamon rad etadi. Shu sababli Jina bilan
mos mijozlar kanonik `{type,source}` sxemasisiz OmniRoute orqali rasmlar uchun
embedding yarata olmaydi.

Matn uchun `jina-ai/jina-embeddings-v5-omni-small` dan foydalaning. Memorix
`base_url` qiymatini `https://api.jina.ai` ga yoʻnaltirmang — OmniRoute yagona
oraliq boʻlib qolsin.
