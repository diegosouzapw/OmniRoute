# Embeddings client runbook (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Àwọn àkọsílẹ̀ fún olùṣiṣẹ́ lórí `POST /v1/embeddings` nígbà tí OmniRoute bá wà níwájú
Hindsight 0.9.1 (`encode(list[str])` fún ọ̀rọ̀ nìkan) àti Memorix 1.6.0 (ẹnu-ọ̀nà mídíà
Jina). A ṣàyẹ̀wò rẹ̀ lórí ètò tó ń ṣiṣẹ́ ní 2026-08-17 pẹ̀lú OmniRoute 3.8.49 ní
`https://omniroute.jaguar-fish.ts.net/v1`. Kò sí àṣírí kankan ní ìsàlẹ̀.

## Àwọn ID awoṣe tó ń ṣiṣẹ́

| ID oníbàárà                                    | HTTP | Àwọn fekito | Ìwọ̀n    | Àwọn àkọsílẹ̀                                   |
| ---------------------------------------------- | ---- | ----------- | ------- | ---------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | ìdìpọ̀ 2 → 2 | 3072    | Ó ń ṣiṣẹ́ láìsí kọ́kọ́rọ́ Gemini abinibi           |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ìdìpọ̀ 2 → 2 | 3072    | Ààyè kan náà pẹ̀lú ID tí kì í ṣe àyẹ̀wò-àkọ́kọ́    |
| `openrouter/google/gemini-embedding-001`       | 200  | ìdìpọ̀ 2 → 2 | 3072    | A tò ó sínú `GET /v1/embeddings`               |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ìdìpọ̀ 2 → 2 | 1024    | ID Jina omni àṣẹ̀dá                             |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ìdìpọ̀ 2 → 2 | 1024    | Orúkọ míì; `model` inú ìdáhùn jẹ́ `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | ìdìpọ̀ 2 → 2 | 1024    | ID lásán náà tún ń yanjú                       |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Ààyè fekito rẹ̀ yàtọ̀ sí ti small                |

`GET /v1/models` àti `GET /v1/embeddings` ṣe àtòjọ
`jina-ai/jina-embeddings-v5-omni-small` (1024) àti
`jina-ai/jina-embeddings-v5-omni-nano` (768) àti
`openrouter/google/gemini-embedding-001`. Wọn **kò** ṣe àtòjọ
`openrouter/google/gemini-embedding-2` bó tilẹ̀ jẹ́ pé ID yẹn ti ń ṣiṣẹ́ tẹ́lẹ̀.

Má ṣe da nano (768-d) àti small (1024-d) pọ̀ sínú atọ́ka kan. Wọn kò ṣeé
fi wé ara wọn.

## Àwọn ID tó bàjẹ́ / tó ń ṣini lọ́nà

### Gemini Embedding 2 abinibi

Ìbéèrè:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Ohun tó ṣẹlẹ̀ gan-an (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` dá 400 kan náà padà. `google/gemini-embedding-2`
dá HTTP **400** `Unknown embedding provider: google` padà àyàfi tí node
olùpèsè àkànṣe kan bá lo ìpele-àkọ́kọ́ `google`.

Ohun tí a retí: bóyá ìfibọ̀ Gemini abinibi pẹ̀lú kọ́kọ́rọ́ Google AI Studio lórí
olùpèsè `gemini`, tàbí 400 kan tó dárúkọ ID OpenRouter tó ń ṣiṣẹ́.

Àtúnṣe ìṣòro (fi ohun ìdánimọ̀ bearer pamọ́):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Àfidípò tó ń ṣiṣẹ́:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` abinibi kò lè ṣàṣeyọrí láti inú GitOps nìkan. A gbọ́dọ̀ fi
kọ́kọ́rọ́ Google AI Studio kún un gẹ́gẹ́ bí ìsopọ̀ olùpèsè `gemini` (dashboard tàbí
`GEMINI_API_KEY` tí a gbé wọ OmniRoute). Àṣírí yẹn kò sí nínú repo yìí.

### Ọ̀nà multimodal Jina

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

Lo `POST /v1/embeddings` títí orúkọ míì yóò fi wà.

### Ohun àwòrán Jina / Memorix

Ohun àwòrán àṣẹ̀dá OmniRoute (PNG 28×28, àwọn píkíṣẹ́lì 784 — Jina kọ 1×1):

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

Ohun tó ṣẹlẹ̀ gan-an: HTTP **200**, fekito 1, 1024-d.

Ìrísí abinibi Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Ohun tó ṣẹlẹ̀ gan-an: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` tí a dà pọ̀ mọ́ `{ "image": "data:..." }` ń fúnni ní 400 kan náà.

## Àwọn àkọsílẹ̀ oníbàárà

### Hindsight 0.9.1

Àwọn embeddings Hindsight jẹ́ ti ọ̀rọ̀ nìkan (`encode(list[str])`). Kò fi
àwọn ohun àwòrán ránṣẹ́. Tọ URL ìpìlẹ̀ embeddings tó bá OpenAI mu ti Hindsight
sí OmniRoute `/v1`, kí o sì lo ID tó ń ṣiṣẹ́ láti inú tábìlì òkè
(`jina-ai/jina-embeddings-v5-omni-small` tàbí
`openrouter/google/gemini-embedding-2`). Má ṣe ṣètò awoṣe sí
`gemini-embedding-2` lásán àyàfi tí kọ́kọ́rọ́ API `gemini` bá wà lórí ẹnu-ọ̀nà náà.

### Memorix 1.6.0

Memorix máa ń ka `baseUrl` tó bá `/jina\.ai/i` mu nìkan sí mídíà abinibi. URL
OmniRoute yóò dúró lórí ọ̀nà ọ̀rọ̀-nìkan kódà bí awoṣe náà bá jẹ́ Jina omni.
Ẹnu-ọ̀nà yẹn jẹ́ ìṣòro oníbàárà Memorix. Láìka èyí sí, OmniRoute ṣì ń kọ
ara Jina `{image: "data:..."}` tí Memorix ìbá fi ránṣẹ́ bí ẹnu-ọ̀nà náà bá
ṣí, nítorí náà àwọn oníbàárà tó bá Jina mu kò lè fi àwọn àwòrán sínú embeddings nípasẹ̀ OmniRoute
láìlo schema àṣẹ̀dá `{type,source}`.

Lo `jina-ai/jina-embeddings-v5-omni-small` fún ọ̀rọ̀. Má ṣe tọ Memorix
`base_url` sí `https://api.jina.ai` — jẹ́ kí OmniRoute nìkan ni ìpele àárín.
