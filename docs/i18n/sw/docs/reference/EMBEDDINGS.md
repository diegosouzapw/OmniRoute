# Embeddings client runbook (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Maelezo ya waendeshaji kuhusu `POST /v1/embeddings` wakati OmniRoute iko mbele ya
Hindsight 0.9.1 (`encode(list[str])` ya maandishi pekee) na Memorix 1.6.0 (kizuizi cha media cha
Jina). Imethibitishwa moja kwa moja tarehe 2026-08-17 dhidi ya OmniRoute 3.8.49 kwenye
`https://omniroute.jaguar-fish.ts.net/v1`. Hakuna siri hapa chini.

## Vitambulisho vya modeli vinavyofanya kazi

| Kitambulisho cha mteja                         | HTTP | Vekta          | Vipimo  | Maelezo                                                  |
| ---------------------------------------------- | ---- | -------------- | ------- | -------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | kundi la 2 → 2 | 3072    | Hufanya kazi bila ufunguo asilia wa Gemini               |
| `openrouter/google/gemini-embedding-2-preview` | 200  | kundi la 2 → 2 | 3072    | Nafasi sawa na kitambulisho kisicho cha onyesho la awali |
| `openrouter/google/gemini-embedding-001`       | 200  | kundi la 2 → 2 | 3072    | Imeorodheshwa katika `GET /v1/embeddings`                |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | kundi la 2 → 2 | 1024    | Kitambulisho rasmi cha Jina omni                         |
| `jina/jina-embeddings-v5-omni-small`           | 200  | kundi la 2 → 2 | 1024    | Jina mbadala; `model` ya jibu ni `jina-ai/...`           |
| `jina-embeddings-v5-omni-small`                | 200  | kundi la 2 → 2 | 1024    | Kitambulisho kisicho na kiambishi pia hutambuliwa        |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1          | **768** | Nafasi ya vekta ni tofauti na small                      |

`GET /v1/models` na `GET /v1/embeddings` ziliorodhesha
`jina-ai/jina-embeddings-v5-omni-small` (1024) na
`jina-ai/jina-embeddings-v5-omni-nano` (768) na
`openrouter/google/gemini-embedding-001`. **Hazikuorodhesha**
`openrouter/google/gemini-embedding-2` ingawa kitambulisho hicho tayari kinahudumiwa.

Usichanganye nano (vipimo 768) na small (vipimo 1024) katika faharasa moja. Haziwezi
kulinganishwa.

## Vitambulisho visivyofanya kazi / vinavyopotosha

### Gemini Embedding 2 asilia

Ombi:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Hali halisi (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` hurejesha 400 hiyo hiyo. `google/gemini-embedding-2`
hurejesha HTTP **400** `Unknown embedding provider: google` isipokuwa nodi maalum ya
mtoa huduma itumie kiambishi awali cha `google`.

Kinachotarajiwa: ama embedding asilia ya Gemini yenye ufunguo wa Google AI Studio kwenye
mtoa huduma wa `gemini`, au 400 inayotaja kitambulisho cha OpenRouter kinachofanya kazi.

Hatua za kurudia tatizo (ficha bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Kibadala kinachofanya kazi:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` asilia haiwezi kufanikiwa kupitia GitOps pekee. Ufunguo wa Google AI
Studio lazima uongezwe kama muunganisho wa mtoa huduma wa `gemini` (dashibodi au
`GEMINI_API_KEY` iliyoingizwa katika OmniRoute). Siri hiyo haipo katika repo hii.

### Njia ya Jina ya hali anuwai

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

Tumia `POST /v1/embeddings` hadi jina mbadala liwepo.

### Kipengee cha picha cha Jina / Memorix

Kipengee rasmi cha picha cha OmniRoute (PNG ya 28×28, pikseli 784 — Jina hukataa 1×1):

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

Hali halisi: HTTP **200**, vekta 1, vipimo 1024.

Muundo asilia wa Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Hali halisi: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ikichanganywa na `{ "image": "data:..." }` husababisha 400 hiyo hiyo.

## Maelezo ya mteja

### Hindsight 0.9.1

Embedding za Hindsight ni za maandishi pekee (`encode(list[str])`). Haitumi
vipengee vya picha. Elekeza URL msingi ya embedding zinazooana na OpenAI ya Hindsight kwenye
OmniRoute `/v1` na utumie kitambulisho kinachofanya kazi kutoka kwenye jedwali lililo hapo juu
(`jina-ai/jina-embeddings-v5-omni-small` au
`openrouter/google/gemini-embedding-2`). Usiweke modeli kuwa
`gemini-embedding-2` isiyo na kiambishi isipokuwa ufunguo wa API wa `gemini` upo kwenye lango.

### Memorix 1.6.0

Memorix huchukulia tu `baseUrl` inayolingana na `/jina\.ai/i` kama media asilia. URL ya
OmniRoute hubaki kwenye njia ya maandishi pekee hata wakati modeli ni Jina omni.
Kizuizi hicho ni tatizo la mteja wa Memorix. Kwa kujitegemea, OmniRoute bado hukataa
mwili wa Jina wa `{image: "data:..."}` ambao Memorix ingetuma ikiwa kizuizi
kingefunguka, kwa hiyo wateja wanaooana na Jina hawawezi kuunda embedding za picha kupitia OmniRoute
bila skimu rasmi ya `{type,source}`.

Tumia `jina-ai/jina-embeddings-v5-omni-small` kwa maandishi. Usielekeze Memorix
`base_url` kwenye `https://api.jina.ai` — dumisha OmniRoute kama hatua pekee.
