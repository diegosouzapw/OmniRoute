# Embeddings client runbook (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute लाई Hindsight 0.9.1 (पाठ-मात्र `encode(list[str])`) र Memorix 1.6.0 (Jina मिडिया
गेट) को अगाडि राख्दा `POST /v1/embeddings` का लागि अपरेटर टिप्पणीहरू।
`https://omniroute.jaguar-fish.ts.net/v1` मा OmniRoute 3.8.49 विरुद्ध
2026-08-17 मा प्रत्यक्ष प्रमाणीकरण गरिएको। तल कुनै गोप्य जानकारी छैन।

## काम गर्ने मोडेल ID हरू

| क्लाइन्ट ID                                    | HTTP | भेक्टरहरू   | आयाम    | टिप्पणीहरू                                    |
| ---------------------------------------------- | ---- | ----------- | ------- | --------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | ब्याच 2 → 2 | 3072    | नेटिभ Gemini कुञ्जीबिना काम गर्छ              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ब्याच 2 → 2 | 3072    | गैर-प्रिभ्यु ID कै समान स्पेस                 |
| `openrouter/google/gemini-embedding-001`       | 200  | ब्याच 2 → 2 | 3072    | `GET /v1/embeddings` मा सूचीबद्ध              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ब्याच 2 → 2 | 1024    | क्यानोनिकल Jina omni ID                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ब्याच 2 → 2 | 1024    | उपनाम; प्रतिक्रियाको `model` `jina-ai/...` हो |
| `jina-embeddings-v5-omni-small`                | 200  | ब्याच 2 → 2 | 1024    | खाली ID पनि रिजल्भ हुन्छ                      |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | small भन्दा फरक भेक्टर स्पेस                  |

`GET /v1/models` र `GET /v1/embeddings` ले
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), र
`openrouter/google/gemini-embedding-001` लाई सूचीबद्ध गरे। उक्त ID ले पहिले नै सेवा दिइरहेको भए पनि तिनले
`openrouter/google/gemini-embedding-2` लाई सूचीबद्ध **गरेनन्**।

nano (768-d) र small (1024-d) लाई एउटै इन्डेक्समा नमिसाउनुहोस्। तिनीहरू
तुलना गर्न मिल्ने छैनन्।

## बिग्रिएका / भ्रामक ID हरू

### नेटिभ Gemini Embedding 2

अनुरोध:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

वास्तविक परिणाम (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ले उही 400 फर्काउँछ। कुनै कस्टम
प्रोभाइडर नोडले `google` प्रिफिक्स प्रयोग नगरेसम्म `google/gemini-embedding-2`
ले HTTP **400** `Unknown embedding provider: google` फर्काउँछ।

अपेक्षित: `gemini` प्रोभाइडरमा Google AI Studio कुञ्जीसहितको नेटिभ Gemini
एम्बेड, वा काम गर्ने OpenRouter ID उल्लेख गर्ने 400।

पुनरुत्पादन (bearer लाई लुकाउनुहोस्):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

काम गर्ने विकल्प:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

नेटिभ `gemini-embedding-2` GitOps मात्रबाट सफल हुन सक्दैन। Google AI
Studio कुञ्जीलाई `gemini` प्रोभाइडर कनेक्सनको रूपमा थप्नुपर्छ (ड्यासबोर्ड वा
OmniRoute मा आयात गरिएको `GEMINI_API_KEY`)। त्यो गोप्य जानकारी यो repo मा छैन।

### Jina मल्टिमोडल पाथ

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

उपनाम उपलब्ध नभएसम्म `POST /v1/embeddings` प्रयोग गर्नुहोस्।

### Jina / Memorix इमेज अब्जेक्ट

OmniRoute को क्यानोनिकल इमेज आइटम (28×28 PNG, 784 पिक्सेल — Jina ले 1×1 अस्वीकार गर्छ):

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

वास्तविक परिणाम: HTTP **200**, 1 भेक्टर, 1024-d।

Memorix 1.6.0 / Jina को नेटिभ संरचना:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

वास्तविक परिणाम: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` लाई `{ "image": "data:..." }` सँग मिसाउँदा पनि उही 400 आउँछ।

## क्लाइन्ट टिप्पणीहरू

### Hindsight 0.9.1

Hindsight एम्बेडिङहरू पाठ-मात्र हुन् (`encode(list[str])`)। यसले
इमेज अब्जेक्टहरू पठाउँदैन। Hindsight को OpenAI-संगत एम्बेडिङ्स बेस URL लाई
OmniRoute `/v1` मा देखाउनुहोस् र माथिको तालिकाबाट काम गर्ने ID प्रयोग गर्नुहोस्
(`jina-ai/jina-embeddings-v5-omni-small` वा
`openrouter/google/gemini-embedding-2`)। गेटवेमा `gemini` API कुञ्जी नभएसम्म मोडेललाई खाली
`gemini-embedding-2` मा सेट नगर्नुहोस्।

### Memorix 1.6.0

Memorix ले `/jina\.ai/i` सँग मेल खाने `baseUrl` लाई मात्र नेटिभ मिडियाका रूपमा व्यवहार गर्छ।
मोडेल Jina omni भए पनि OmniRoute URL पाठ-मात्र पाथमै रहन्छ।
त्यो गेट Memorix क्लाइन्टको समस्या हो। अलग रूपमा, गेट
खुलेमा Memorix ले पठाउने Jina `{image: "data:..."}` बडीलाई पनि OmniRoute ले अस्वीकार गर्छ,
त्यसैले Jina-संगत क्लाइन्टहरूले क्यानोनिकल `{type,source}` स्किमाबिना OmniRoute मार्फत
इमेजहरू एम्बेड गर्न सक्दैनन्।

पाठका लागि `jina-ai/jina-embeddings-v5-omni-small` प्रयोग गर्नुहोस्। Memorix को
`base_url` लाई `https://api.jina.ai` मा नदेखाउनुहोस् — OmniRoute लाई मात्र एकल हपका रूपमा राख्नुहोस्।
