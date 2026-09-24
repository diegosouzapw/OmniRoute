# Embeddings client runbook (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute हे Hindsight 0.9.1 (केवळ-मजकूर `encode(list[str])`) आणि Memorix 1.6.0 (Jina मीडिया गेट) यांच्या पुढे असताना `POST /v1/embeddings` साठी ऑपरेटर नोंदी. OmniRoute 3.8.49 विरुद्ध `https://omniroute.jaguar-fish.ts.net/v1` येथे 2026-08-17 रोजी प्रत्यक्ष पडताळले. खाली कोणतीही गुपिते नाहीत.

## कार्यरत मॉडेल आयडी

| क्लायंट आयडी                                   | HTTP | व्हेक्टर  | परिमाण  | नोंदी                                            |
| ---------------------------------------------- | ---- | --------- | ------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | बॅच 2 → 2 | 3072    | मूळ Gemini कीशिवाय कार्य करते                    |
| `openrouter/google/gemini-embedding-2-preview` | 200  | बॅच 2 → 2 | 3072    | नॉन-प्रीव्ह्यू आयडीसारखीच व्हेक्टर स्पेस         |
| `openrouter/google/gemini-embedding-001`       | 200  | बॅच 2 → 2 | 3072    | `GET /v1/embeddings` मध्ये सूचीबद्ध              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | बॅच 2 → 2 | 1024    | प्रमाणित Jina omni आयडी                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | बॅच 2 → 2 | 1024    | उपनाव; प्रतिसादातील `model` हे `jina-ai/...` आहे |
| `jina-embeddings-v5-omni-small`                | 200  | बॅच 2 → 2 | 1024    | साधा आयडीही रिझॉल्व्ह होतो                       |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | small पेक्षा वेगळी व्हेक्टर स्पेस                |

`GET /v1/models` आणि `GET /v1/embeddings` यांनी
`jina-ai/jina-embeddings-v5-omni-small` (1024) आणि
`jina-ai/jina-embeddings-v5-omni-nano` (768) तसेच
`openrouter/google/gemini-embedding-001` सूचीबद्ध केले. `openrouter/google/gemini-embedding-2`
हा आयडी आधीपासून सेवा देत असला, तरी त्यांनी तो सूचीबद्ध **केला नाही**.

nano (768-d) आणि small (1024-d) एकाच इंडेक्समध्ये मिसळू नका. ते
परस्पर तुलना करण्यायोग्य नाहीत.

## सदोष / दिशाभूल करणारे आयडी

### मूळ Gemini Embedding 2

विनंती:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

प्रत्यक्ष (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` हाच 400 प्रतिसाद देते. एखादा सानुकूल
प्रोव्हायडर नोड `google` उपसर्ग वापरत नसल्यास `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` परत करते.

अपेक्षित: `gemini` प्रोव्हायडरवरील Google AI Studio कीसह मूळ Gemini
एम्बेड किंवा कार्यरत OpenRouter आयडी नमूद करणारा 400 प्रतिसाद.

पुनरुत्पादन (बेअरर लपवा):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

कार्यरत पर्याय:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

मूळ `gemini-embedding-2` केवळ GitOps मधून यशस्वी होऊ शकत नाही. Google AI
Studio की ही `gemini` प्रोव्हायडर कनेक्शन म्हणून जोडली पाहिजे (डॅशबोर्ड किंवा
OmniRoute मध्ये इम्पोर्ट केलेली `GEMINI_API_KEY`). हे गुपित या रेपोमध्ये नाही.

### Jina मल्टिमोडल मार्ग

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

उपनाव उपलब्ध होईपर्यंत `POST /v1/embeddings` वापरा.

### Jina / Memorix प्रतिमा ऑब्जेक्ट

OmniRoute चे प्रमाणित प्रतिमा आयटम (28×28 PNG, 784 पिक्सेल — Jina 1×1 नाकारते):

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

प्रत्यक्ष: HTTP **200**, 1 व्हेक्टर, 1024-d.

Memorix 1.6.0 / Jina मूळ रचना:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

प्रत्यक्ष: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` हे `{ "image": "data:..." }` सोबत मिसळल्यास तोच 400 प्रतिसाद मिळतो.

## क्लायंट नोंदी

### Hindsight 0.9.1

Hindsight एम्बेडिंग्ज केवळ-मजकूर (`encode(list[str])`) आहेत. ते प्रतिमा
ऑब्जेक्ट पाठवत नाही. Hindsight च्या OpenAI-सुसंगत एम्बेडिंग्ज बेस URL ला
OmniRoute `/v1` कडे निर्देशित करा आणि वरील तक्त्यातील कार्यरत आयडी वापरा
(`jina-ai/jina-embeddings-v5-omni-small` किंवा
`openrouter/google/gemini-embedding-2`). गेटवेवर `gemini` API की उपलब्ध
नसेल, तर मॉडेल साध्या `gemini-embedding-2` वर सेट करू नका.

### Memorix 1.6.0

Memorix केवळ `/jina\.ai/i` शी जुळणाऱ्या `baseUrl` ला मूळ मीडिया म्हणून
हाताळते. मॉडेल Jina omni असले तरी OmniRoute URL केवळ-मजकूर मार्गावरच
राहतो. हा गेट Memorix क्लायंटमधील समस्या आहे. स्वतंत्रपणे, गेट उघडल्यास
Memorix पाठवेल असा Jina `{image: "data:..."}` बॉडी OmniRoute अजूनही
नाकारते, त्यामुळे प्रमाणित `{type,source}` स्कीमाशिवाय Jina-सुसंगत क्लायंट
OmniRoute द्वारे प्रतिमा एम्बेड करू शकत नाहीत.

मजकुरासाठी `jina-ai/jina-embeddings-v5-omni-small` वापरा. Memorix चा
`base_url` `https://api.jina.ai` कडे निर्देशित करू नका — OmniRoute हाच
एकमेव हॉप ठेवा.
