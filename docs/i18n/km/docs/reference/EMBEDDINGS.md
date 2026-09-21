# Embeddings client runbook (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

កំណត់ចំណាំសម្រាប់អ្នកប្រតិបត្តិអំពី `POST /v1/embeddings` នៅពេល OmniRoute ស្ថិតនៅខាងមុខ
Hindsight 0.9.1 (`encode(list[str])` សម្រាប់តែអត្ថបទ) និង Memorix 1.6.0 (ច្រកត្រួតពិនិត្យមេឌៀ
Jina)។ បានផ្ទៀងផ្ទាត់ផ្ទាល់នៅថ្ងៃទី 2026-08-17 ជាមួយ OmniRoute 3.8.49 នៅ
`https://omniroute.jaguar-fish.ts.net/v1`។ មិនមានព័ត៌មានសម្ងាត់នៅខាងក្រោមទេ។

## លេខសម្គាល់ម៉ូដែលដែលដំណើរការ

| លេខសម្គាល់របស់កម្មវិធីអតិថិជន                  | HTTP | វ៉ិចទ័រ    | វិមាត្រ | កំណត់ចំណាំ                                              |
| ---------------------------------------------- | ---- | ---------- | ------- | ------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | បាច់ 2 → 2 | 3072    | ដំណើរការដោយមិនត្រូវការសោ Gemini ដើម                     |
| `openrouter/google/gemini-embedding-2-preview` | 200  | បាច់ 2 → 2 | 3072    | ប្រើលំហដូចគ្នានឹងលេខសម្គាល់ដែលមិនមែនជាកំណែសាកល្បង       |
| `openrouter/google/gemini-embedding-001`       | 200  | បាច់ 2 → 2 | 3072    | មានក្នុងបញ្ជី `GET /v1/embeddings`                      |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | បាច់ 2 → 2 | 1024    | លេខសម្គាល់ Jina omni ស្តង់ដារ                           |
| `jina/jina-embeddings-v5-omni-small`           | 200  | បាច់ 2 → 2 | 1024    | ឈ្មោះក្លែងកាត់; `model` ក្នុងការឆ្លើយតបគឺ `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | បាច់ 2 → 2 | 1024    | លេខសម្គាល់ទទេក៏អាចដោះស្រាយបាន                           |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | ប្រើលំហវ៉ិចទ័រខុសពី small                               |

`GET /v1/models` និង `GET /v1/embeddings` បានរាយបញ្ជី
`jina-ai/jina-embeddings-v5-omni-small` (1024) និង
`jina-ai/jina-embeddings-v5-omni-nano` (768) និង
`openrouter/google/gemini-embedding-001`។ ពួកវា **មិនបាន** រាយបញ្ជី
`openrouter/google/gemini-embedding-2` ទេ ទោះបីលេខសម្គាល់នោះកំពុងបម្រើសំណើរួចហើយក៏ដោយ។

កុំលាយ nano (768-d) និង small (1024-d) ក្នុងលិបិក្រមតែមួយ។ ពួកវាមិនអាច
ប្រៀបធៀបគ្នាបានទេ។

## លេខសម្គាល់ដែលខូច / បង្កឱ្យយល់ច្រឡំ

### Gemini Embedding 2 ដើម

សំណើ៖

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

លទ្ធផលជាក់ស្តែង (2026-08-17)៖ HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ត្រឡប់ 400 ដូចគ្នា។ `google/gemini-embedding-2`
ត្រឡប់ HTTP **400** `Unknown embedding provider: google` លុះត្រាតែថ្នាំង
អ្នកផ្តល់សេវាផ្ទាល់ខ្លួនប្រើបុព្វបទ `google`។

លទ្ធផលដែលរំពឹងទុក៖ ការបង្កប់ Gemini ដើមដែលប្រើសោ Google AI Studio នៅលើ
អ្នកផ្តល់សេវា `gemini` ឬ 400 ដែលបញ្ជាក់ឈ្មោះលេខសម្គាល់ OpenRouter ដែលដំណើរការ។

ការបង្កើតបញ្ហាឡើងវិញ (លាក់ bearer)៖

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

ជម្រើសជំនួសដែលដំណើរការ៖

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` ដើមមិនអាចដំណើរការជោគជ័យដោយប្រើ GitOps តែប៉ុណ្ណោះទេ។ ត្រូវតែបន្ថែមសោ Google AI
Studio ជាការតភ្ជាប់អ្នកផ្តល់សេវា `gemini` (ផ្ទាំងគ្រប់គ្រង ឬ
`GEMINI_API_KEY` ដែលបាននាំចូលទៅក្នុង OmniRoute)។ ព័ត៌មានសម្ងាត់នោះមិនស្ថិតនៅក្នុងឃ្លាំងនេះទេ។

### ផ្លូវពហុមេឌៀរបស់ Jina

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

ប្រើ `POST /v1/embeddings` រហូតដល់មានឈ្មោះក្លែងកាត់។

### វត្ថុរូបភាព Jina / Memorix

ធាតុរូបភាពស្តង់ដាររបស់ OmniRoute (PNG ទំហំ 28×28, 784 ភីកសែល — Jina បដិសេធ 1×1)៖

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

លទ្ធផលជាក់ស្តែង៖ HTTP **200**, វ៉ិចទ័រ 1, 1024-d។

ទម្រង់ដើមរបស់ Memorix 1.6.0 / Jina៖

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

លទ្ធផលជាក់ស្តែង៖ HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ដែលលាយជាមួយ `{ "image": "data:..." }` ក៏ផ្តល់ 400 ដូចគ្នា។

## កំណត់ចំណាំសម្រាប់កម្មវិធីអតិថិជន

### Hindsight 0.9.1

ការបង្កប់របស់ Hindsight គាំទ្រតែអត្ថបទ (`encode(list[str])`)។ វាមិនផ្ញើ
វត្ថុរូបភាពទេ។ កំណត់ URL មូលដ្ឋានសម្រាប់ការបង្កប់ដែលឆបគ្នាជាមួយ OpenAI របស់ Hindsight ទៅ
OmniRoute `/v1` ហើយប្រើលេខសម្គាល់ដែលដំណើរការពីតារាងខាងលើ
(`jina-ai/jina-embeddings-v5-omni-small` ឬ
`openrouter/google/gemini-embedding-2`)។ កុំកំណត់ម៉ូដែលទៅជា
`gemini-embedding-2` ទទេ លុះត្រាតែមានសោ API `gemini` នៅលើ gateway។

### Memorix 1.6.0

Memorix ចាត់ទុកតែ `baseUrl` ដែលផ្គូផ្គងនឹង `/jina\.ai/i` ប៉ុណ្ណោះថាជាមេឌៀដើម។ URL របស់
OmniRoute នៅតែស្ថិតលើផ្លូវសម្រាប់តែអត្ថបទ ទោះបីម៉ូដែលជា Jina omni ក៏ដោយ។
ច្រកត្រួតពិនិត្យនោះគឺជាបញ្ហារបស់កម្មវិធីអតិថិជន Memorix។ ដោយឡែក OmniRoute នៅតែបដិសេធ
តួសំណើ Jina `{image: "data:..."}` ដែល Memorix នឹងផ្ញើ ប្រសិនបើច្រកត្រួតពិនិត្យ
បើក ដូច្នេះកម្មវិធីអតិថិជនដែលឆបគ្នាជាមួយ Jina មិនអាចបង្កប់រូបភាពតាមរយៈ OmniRoute
ដោយគ្មានគ្រោងការណ៍ស្តង់ដារ `{type,source}` បានទេ។

ប្រើ `jina-ai/jina-embeddings-v5-omni-small` សម្រាប់អត្ថបទ។ កុំកំណត់ Memorix
`base_url` ទៅ `https://api.jina.ai` — រក្សា OmniRoute ជាចំណុចឆ្លងកាត់តែមួយគត់។
