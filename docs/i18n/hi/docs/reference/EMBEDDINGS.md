# Embeddings client runbook (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute के Hindsight 0.9.1 (केवल-पाठ `encode(list[str])`) और Memorix 1.6.0 (Jina मीडिया गेट) के सामने होने पर `POST /v1/embeddings` के लिए ऑपरेटर नोट्स। OmniRoute 3.8.49 के विरुद्ध `https://omniroute.jaguar-fish.ts.net/v1` पर 2026-08-17 को लाइव सत्यापित। नीचे कोई सीक्रेट नहीं है।

## काम करने वाली मॉडल ids

| क्लाइंट id                                     | HTTP | वेक्टर    | आयाम    | नोट्स                                            |
| ---------------------------------------------- | ---- | --------- | ------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | बैच 2 → 2 | 3072    | नेटिव Gemini कुंजी के बिना काम करता है           |
| `openrouter/google/gemini-embedding-2-preview` | 200  | बैच 2 → 2 | 3072    | गैर-प्रीव्यू id के समान स्पेस                    |
| `openrouter/google/gemini-embedding-001`       | 200  | बैच 2 → 2 | 3072    | `GET /v1/embeddings` में सूचीबद्ध                |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | बैच 2 → 2 | 1024    | कैनोनिकल Jina omni id                            |
| `jina/jina-embeddings-v5-omni-small`           | 200  | बैच 2 → 2 | 1024    | उपनाम; प्रतिक्रिया में `model`, `jina-ai/...` है |
| `jina-embeddings-v5-omni-small`                | 200  | बैच 2 → 2 | 1024    | केवल id भी रिज़ॉल्व होती है                      |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | small से अलग वेक्टर स्पेस                        |

`GET /v1/models` और `GET /v1/embeddings` ने
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), और
`openrouter/google/gemini-embedding-001` को सूचीबद्ध किया। उन्होंने
`openrouter/google/gemini-embedding-2` को सूचीबद्ध **नहीं** किया, जबकि वह id पहले से सेवा दे रही है।

nano (768-d) और small (1024-d) को एक इंडेक्स में न मिलाएँ। उनकी तुलना नहीं की जा सकती।

## खराब / भ्रामक ids

### नेटिव Gemini Embedding 2

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

`gemini/gemini-embedding-2` भी वही 400 लौटाता है। जब तक कोई कस्टम प्रोवाइडर नोड `google` प्रीफ़िक्स का उपयोग न करे, `google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google` लौटाता है।

अपेक्षित: या तो `gemini` प्रोवाइडर पर Google AI Studio कुंजी के साथ नेटिव Gemini एम्बेड, या फिर काम करने वाली OpenRouter id बताने वाला 400।

पुनरुत्पादन (बेयरर को छिपाएँ):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

काम करने वाला विकल्प:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

नेटिव `gemini-embedding-2` केवल GitOps से सफल नहीं हो सकता। Google AI Studio कुंजी को `gemini` प्रोवाइडर कनेक्शन के रूप में जोड़ना आवश्यक है (डैशबोर्ड या OmniRoute में आयात किया गया `GEMINI_API_KEY`)। वह सीक्रेट इस रिपॉज़िटरी में नहीं है।

### Jina मल्टीमॉडल पथ

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

जब तक कोई उपनाम उपलब्ध न हो, `POST /v1/embeddings` का उपयोग करें।

### Jina / Memorix इमेज ऑब्जेक्ट

OmniRoute कैनोनिकल इमेज आइटम (28×28 PNG, 784 पिक्सेल — Jina 1×1 को अस्वीकार करता है):

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

वास्तविक परिणाम: HTTP **200**, 1 वेक्टर, 1024-d।

Memorix 1.6.0 / Jina नेटिव स्वरूप:

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

`{ "text": "..." }` को `{ "image": "data:..." }` के साथ मिलाने पर भी वही 400 मिलता है।

## क्लाइंट नोट्स

### Hindsight 0.9.1

Hindsight एम्बेडिंग केवल-पाठ हैं (`encode(list[str])`)। यह इमेज ऑब्जेक्ट नहीं भेजता। Hindsight के OpenAI-संगत एम्बेडिंग बेस URL को OmniRoute `/v1` पर इंगित करें और ऊपर दी गई तालिका से कोई काम करने वाली id उपयोग करें (`jina-ai/jina-embeddings-v5-omni-small` या `openrouter/google/gemini-embedding-2`)। मॉडल को केवल `gemini-embedding-2` पर तब तक सेट न करें, जब तक गेटवे पर `gemini` API कुंजी मौजूद न हो।

### Memorix 1.6.0

Memorix केवल `/jina\.ai/i` से मेल खाने वाले `baseUrl` को नेटिव मीडिया मानता है। मॉडल के Jina omni होने पर भी OmniRoute URL केवल-पाठ पथ पर रहता है। वह गेट Memorix क्लाइंट की समस्या है। स्वतंत्र रूप से, OmniRoute उस Jina `{image: "data:..."}` बॉडी को भी अस्वीकार करता है जिसे गेट खुलने पर Memorix भेजता, इसलिए Jina-संगत क्लाइंट कैनोनिकल `{type,source}` स्कीमा के बिना OmniRoute के माध्यम से इमेज एम्बेड नहीं कर सकते।

पाठ के लिए `jina-ai/jina-embeddings-v5-omni-small` का उपयोग करें। Memorix के `base_url` को `https://api.jina.ai` पर इंगित न करें — OmniRoute को ही एकमात्र हॉप बनाए रखें।
