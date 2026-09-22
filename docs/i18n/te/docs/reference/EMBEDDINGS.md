# Embeddings client runbook (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute, Hindsight 0.9.1 (టెక్స్ట్-మాత్రమే `encode(list[str])`) మరియు Memorix 1.6.0 (Jina మీడియా
గేట్) ముందు ఉన్నప్పుడు `POST /v1/embeddings` కోసం ఆపరేటర్ గమనికలు.
`https://omniroute.jaguar-fish.ts.net/v1` వద్ద OmniRoute 3.8.49తో
2026-08-17న ప్రత్యక్షంగా ధృవీకరించబడింది. కింద ఎలాంటి రహస్యాలు లేవు.

## పనిచేసే మోడల్ idలు

| క్లయింట్ id                                    | HTTP | వెక్టర్లు    | పరిమాణం | గమనికలు                                               |
| ---------------------------------------------- | ---- | ------------ | ------- | ----------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | బ్యాచ్ 2 → 2 | 3072    | స్థానిక Gemini కీ లేకుండానే పనిచేస్తుంది              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | బ్యాచ్ 2 → 2 | 3072    | నాన్-ప్రివ్యూ idతో సమానమైన స్పేస్                     |
| `openrouter/google/gemini-embedding-001`       | 200  | బ్యాచ్ 2 → 2 | 3072    | `GET /v1/embeddings`లో జాబితా చేయబడింది               |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | బ్యాచ్ 2 → 2 | 1024    | ప్రామాణిక Jina omni id                                |
| `jina/jina-embeddings-v5-omni-small`           | 200  | బ్యాచ్ 2 → 2 | 1024    | మారుపేరు; ప్రతిస్పందనలోని `model` విలువ `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | బ్యాచ్ 2 → 2 | 1024    | ఉపసర్గలేని id కూడా పరిష్కరించబడుతుంది                 |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | smallతో పోలిస్తే భిన్నమైన వెక్టర్ స్పేస్              |

`GET /v1/models` మరియు `GET /v1/embeddings`లో
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), మరియు
`openrouter/google/gemini-embedding-001` జాబితా చేయబడ్డాయి. అయితే
`openrouter/google/gemini-embedding-2` id ఇప్పటికే సేవలు అందిస్తున్నప్పటికీ,
అవి దానిని జాబితా చేయలేదు.

ఒకే ఇండెక్స్లో nano (768-d) మరియు small (1024-d)లను కలపవద్దు. అవి
పోల్చదగినవి కావు.

## పనిచేయని / తప్పుదారి పట్టించే idలు

### స్థానిక Gemini Embedding 2

అభ్యర్థన:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

వాస్తవ ఫలితం (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` కూడా అదే 400ను అందిస్తుంది. ఒక కస్టమ్
ప్రొవైడర్ నోడ్ `google` ఉపసర్గను ఉపయోగిస్తే తప్ప, `google/gemini-embedding-2`
HTTP **400**తో `Unknown embedding provider: google`ను అందిస్తుంది.

ఆశించినది: `gemini` ప్రొవైడర్లో Google AI Studio కీతో స్థానిక Gemini
ఎంబెడ్, లేదా పనిచేసే OpenRouter idను పేర్కొనే 400.

పునరుత్పత్తి (బేరర్ను తొలగించండి):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

పనిచేసే ప్రత్యామ్నాయం:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

GitOps ద్వారానే స్థానిక `gemini-embedding-2` విజయవంతం కాలేదు. Google AI
Studio కీని `gemini` ప్రొవైడర్ కనెక్షన్గా (డాష్బోర్డ్ లేదా OmniRouteలోకి
దిగుమతి చేసిన `GEMINI_API_KEY`) జోడించాలి. ఆ రహస్యం ఈ repoలో లేదు.

### Jina మల్టీమోడల్ మార్గం

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

మారుపేరు అందుబాటులోకి వచ్చే వరకు `POST /v1/embeddings`ను ఉపయోగించండి.

### Jina / Memorix ఇమేజ్ ఆబ్జెక్ట్

OmniRoute ప్రామాణిక ఇమేజ్ ఐటెమ్ (28×28 PNG, 784 పిక్సెల్లు — Jina 1×1ను తిరస్కరిస్తుంది):

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

వాస్తవ ఫలితం: HTTP **200**, 1 వెక్టర్, 1024-d.

Memorix 1.6.0 / Jina స్థానిక ఆకృతి:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

వాస్తవ ఫలితం: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`ను `{ "image": "data:..." }`తో కలిపినా అదే 400 వస్తుంది.

## క్లయింట్ గమనికలు

### Hindsight 0.9.1

Hindsight ఎంబెడ్డింగ్లు టెక్స్ట్-మాత్రమే (`encode(list[str])`). ఇది
ఇమేజ్ ఆబ్జెక్ట్లను పంపదు. Hindsight యొక్క OpenAI-అనుకూల ఎంబెడ్డింగ్ల బేస్ URLను
OmniRoute `/v1`కు నిర్దేశించి, పై పట్టికలోని పనిచేసే idను
(`jina-ai/jina-embeddings-v5-omni-small` లేదా
`openrouter/google/gemini-embedding-2`) ఉపయోగించండి. గేట్వేలో `gemini` API
కీ ఉంటే తప్ప, మోడల్ను ఉపసర్గలేని `gemini-embedding-2`గా సెట్ చేయవద్దు.

### Memorix 1.6.0

`baseUrl` `/jina\.ai/i`తో సరిపోలినప్పుడు మాత్రమే Memorix దానిని స్థానిక
మీడియాగా పరిగణిస్తుంది. మోడల్ Jina omni అయినప్పటికీ OmniRoute URL
టెక్స్ట్-మాత్రమే మార్గంలోనే ఉంటుంది. ఆ గేట్ Memorix క్లయింట్ సమస్య. దీనికి
స్వతంత్రంగా, గేట్ తెరిచి ఉంటే Memorix పంపే Jina `{image: "data:..."}`
బాడీని OmniRoute ఇప్పటికీ తిరస్కరిస్తుంది; అందువల్ల ప్రామాణిక
`{type,source}` స్కీమా లేకుండా Jina-అనుకూల క్లయింట్లు OmniRoute ద్వారా
ఇమేజ్లను ఎంబెడ్ చేయలేవు.

టెక్స్ట్ కోసం `jina-ai/jina-embeddings-v5-omni-small`ను ఉపయోగించండి. Memorix
`base_url`ను `https://api.jina.ai`కు నిర్దేశించవద్దు — OmniRouteనే ఏకైక హాప్గా
ఉంచండి.
