# Embeddings client runbook (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Mga tala para sa operator tungkol sa `POST /v1/embeddings` kapag nasa harap ang OmniRoute ng
Hindsight 0.9.1 (text-only na `encode(list[str])`) at Memorix 1.6.0 (Jina media
gate). Live na napatunayan noong 2026-08-17 gamit ang OmniRoute 3.8.49 sa
`https://omniroute.jaguar-fish.ts.net/v1`. Walang mga secret sa ibaba.

## Mga gumaganang model id

| Client id                                      | HTTP | Mga vector  | Dim     | Mga tala                                     |
| ---------------------------------------------- | ---- | ----------- | ------- | -------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Gumagana nang walang native na Gemini key    |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Parehong vector space sa non-preview na id   |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Nakalista sa `GET /v1/embeddings`            |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | Canonical na Jina omni id                    |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; ang `model` sa tugon ay `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | Nare-resolve din ang bare id                 |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Ibang vector space kaysa sa small            |

Inilista ng `GET /v1/models` at `GET /v1/embeddings` ang
`jina-ai/jina-embeddings-v5-omni-small` (1024) at
`jina-ai/jina-embeddings-v5-omni-nano` (768) at
`openrouter/google/gemini-embedding-001`. **Hindi** nila inilista ang
`openrouter/google/gemini-embedding-2` kahit gumagana na ang id na iyon.

Huwag pagsamahin ang nano (768-d) at small (1024-d) sa iisang index. Hindi
maihahambing ang mga ito.

## Mga sirang / mapanlinlang na id

### Native na Gemini Embedding 2

Kahilingan:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Aktuwal (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Ibinabalik din ng `gemini/gemini-embedding-2` ang parehong 400. Ibinabalik ng `google/gemini-embedding-2`
ang HTTP **400** `Unknown embedding provider: google` maliban kung gumagamit ang isang custom
provider node ng prefix na `google`.

Inaasahan: alinman sa native na Gemini embed na may Google AI Studio key sa
provider na `gemini`, o isang 400 na tumutukoy sa gumaganang OpenRouter id.

Repro (i-redact ang bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Gumaganang pamalit:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Hindi gagana ang native na `gemini-embedding-2` mula sa GitOps lamang. Dapat
magdagdag ng Google AI Studio key bilang isang `gemini` provider connection (dashboard o
`GEMINI_API_KEY` na in-import sa OmniRoute). Wala sa repo na ito ang secret na iyon.

### Jina multimodal path

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

Gamitin ang `POST /v1/embeddings` hanggang magkaroon ng alias.

### Jina / Memorix image object

Canonical na image item ng OmniRoute (28×28 PNG, 784 pixel — tinatanggihan ng Jina ang 1×1):

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

Aktuwal: HTTP **200**, 1 vector, 1024-d.

Native na format ng Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Aktuwal: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Ang `{ "text": "..." }` na hinaluan ng `{ "image": "data:..." }` ay nagreresulta rin sa parehong 400.

## Mga tala para sa client

### Hindsight 0.9.1

Text-only ang mga embedding ng Hindsight (`encode(list[str])`). Hindi ito nagpapadala ng
mga image object. Ituro ang OpenAI-compatible embeddings base URL ng Hindsight sa
OmniRoute `/v1` at gumamit ng gumaganang id mula sa talahanayan sa itaas
(`jina-ai/jina-embeddings-v5-omni-small` o
`openrouter/google/gemini-embedding-2`). Huwag itakda ang model sa bare na
`gemini-embedding-2` maliban kung may `gemini` API key sa gateway.

### Memorix 1.6.0

Itinuturing lamang ng Memorix bilang native media ang `baseUrl` na tumutugma sa `/jina\.ai/i`. Ang
isang OmniRoute URL ay nananatili sa text-only na path kahit Jina omni ang model.
Isyu sa Memorix client ang gate na iyon. Bukod pa rito, tinatanggihan pa rin ng OmniRoute
ang Jina body na `{image: "data:..."}` na ipapadala sana ng Memorix kung
bukas ang gate, kaya hindi makakapag-embed ng mga image ang mga Jina-compatible na client sa pamamagitan ng OmniRoute
nang hindi ginagamit ang canonical na `{type,source}` schema.

Gamitin ang `jina-ai/jina-embeddings-v5-omni-small` para sa text. Huwag ituro ang
`base_url` ng Memorix sa `https://api.jina.ai` — panatilihin ang OmniRoute bilang nag-iisang hop.
