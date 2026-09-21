# Embeddings client runbook (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Bayanan mai gudanarwa na `POST /v1/embeddings` lokacin da OmniRoute yake a gaban
Hindsight 0.9.1 (`encode(list[str])` na rubutu kawai) da Memorix 1.6.0 (ƙofar kafofin
watsa labarai ta Jina). An tabbatar kai tsaye a 2026-08-17 da OmniRoute 3.8.49 a
`https://omniroute.jaguar-fish.ts.net/v1`. Babu sirri a ƙasa.

## ID ɗin samfura masu aiki

| ID na abokin hulɗa                             | HTTP | Vectors      | Dim     | Bayanan kula                                              |
| ---------------------------------------------- | ---- | ------------ | ------- | --------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | rukuni 2 → 2 | 3072    | Yana aiki ba tare da maɓallin Gemini na asali ba          |
| `openrouter/google/gemini-embedding-2-preview` | 200  | rukuni 2 → 2 | 3072    | Sararin vector iri ɗaya ne da ID ɗin da ba na samfotin ba |
| `openrouter/google/gemini-embedding-001`       | 200  | rukuni 2 → 2 | 3072    | An jera shi a cikin `GET /v1/embeddings`                  |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | rukuni 2 → 2 | 1024    | ID na Jina omni na ƙa'ida                                 |
| `jina/jina-embeddings-v5-omni-small`           | 200  | rukuni 2 → 2 | 1024    | Laƙabi; `model` na amsa shi ne `jina-ai/...`              |
| `jina-embeddings-v5-omni-small`                | 200  | rukuni 2 → 2 | 1024    | ID marar prefix ma yana warwarewa                         |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | Sararin vector ya bambanta da small                       |

`GET /v1/models` da `GET /v1/embeddings` sun jera
`jina-ai/jina-embeddings-v5-omni-small` (1024) da
`jina-ai/jina-embeddings-v5-omni-nano` (768) da
`openrouter/google/gemini-embedding-001`. Ba su jera
`openrouter/google/gemini-embedding-2` ba duk da cewa wannan ID ɗin yana riga yana ba da sabis.

Kada a haɗa nano (768-d) da small (1024-d) a cikin index guda. Ba za a iya
kwatanta su ba.

## ID marasa aiki / masu ruɗarwa

### Gemini Embedding 2 na asali

Buƙata:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Ainihin sakamako (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` yana mayar da 400 iri ɗaya. `google/gemini-embedding-2`
yana mayar da HTTP **400** `Unknown embedding provider: google` sai dai idan node
na mai samarwa na musamman yana amfani da prefix ɗin `google`.

Abin da ake tsammani: ko dai embedding na Gemini na asali tare da maɓallin Google AI Studio a
mai samarwar `gemini`, ko kuma 400 da ke ambaton ID na OpenRouter mai aiki.

Yadda za a sake gwadawa (a ɓoye bearer ɗin):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Madadin da ke aiki:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` na asali ba zai iya yin nasara ta GitOps kaɗai ba. Dole ne a
ƙara maɓallin Google AI Studio a matsayin haɗin mai samarwar `gemini` (dashboard ko
`GEMINI_API_KEY` da aka shigo da shi cikin OmniRoute). Wannan sirrin ba ya cikin wannan repo.

### Hanyar multimodal ta Jina

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

Yi amfani da `POST /v1/embeddings` har sai an samar da wani laƙabi.

### Object na hoto na Jina / Memorix

Item ɗin hoto na ƙa'idar OmniRoute (28×28 PNG, pixels 784 — Jina tana ƙin 1×1):

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

Ainihin sakamako: HTTP **200**, vector 1, 1024-d.

Tsarin asali na Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Ainihin sakamako: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Haɗa `{ "text": "..." }` da `{ "image": "data:..." }` yana haifar da 400 iri ɗaya.

## Bayanan abokan hulɗa

### Hindsight 0.9.1

Embeddings na Hindsight na rubutu kawai ne (`encode(list[str])`). Ba ya aika
objects na hoto. Saita URL na tushe na embeddings masu dacewa da OpenAI na Hindsight zuwa
OmniRoute `/v1`, sannan a yi amfani da ID mai aiki daga teburin da ke sama
(`jina-ai/jina-embeddings-v5-omni-small` ko
`openrouter/google/gemini-embedding-2`). Kada a saita samfurin zuwa
`gemini-embedding-2` marar prefix sai idan akwai maɓallin API na `gemini` a gateway.

### Memorix 1.6.0

Memorix yana ɗaukar `baseUrl` da ya dace da `/jina\.ai/i` kawai a matsayin kafofin
watsa labarai na asali. URL na OmniRoute zai ci gaba da amfani da hanyar rubutu kawai ko da
samfurin Jina omni ne. Wannan ƙofar matsala ce ta abokin hulɗar Memorix. Ba tare da la'akari
da haka ba, OmniRoute har yanzu yana ƙin body na Jina mai `{image: "data:..."}` wanda
Memorix zai aika idan ƙofar ta buɗe, saboda haka abokan hulɗa masu dacewa da Jina ba za su
iya yin embedding na hotuna ta OmniRoute ba sai da schema na ƙa'ida
`{type,source}`.

Yi amfani da `jina-ai/jina-embeddings-v5-omni-small` don rubutu. Kada a karkatar da
`base_url` na Memorix zuwa `https://api.jina.ai` — a bar OmniRoute a matsayin hop guda tilo.
