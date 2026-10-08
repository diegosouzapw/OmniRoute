# Embeddings client runbook (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Ndetu ndị ọrụ maka `POST /v1/embeddings` mgbe OmniRoute nọ n'ihu
Hindsight 0.9.1 (`encode(list[str])` nke bụ naanị ederede) na Memorix 1.6.0 (ọnụ ụzọ mgbasa-ozi
Jina). E nyochara ya ozugbo na 2026-08-17 megide OmniRoute 3.8.49 na
`https://omniroute.jaguar-fish.ts.net/v1`. Enweghị ihe nzuzo n'okpuru.

## NJ ndị model na-arụ ọrụ

| NJ onye ahịa                                   | HTTP | Vektọ      | Akụkụ   | Ndetu                                             |
| ---------------------------------------------- | ---- | ---------- | ------- | ------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | ogbe 2 → 2 | 3072    | Ọ na-arụ ọrụ na-enweghị igodo Gemini nke ya       |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ogbe 2 → 2 | 3072    | Otu oghere ahụ dị ka NJ na-abụghị preview         |
| `openrouter/google/gemini-embedding-001`       | 200  | ogbe 2 → 2 | 3072    | E depụtara ya na `GET /v1/embeddings`             |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ogbe 2 → 2 | 1024    | NJ omni Jina nke iwu kwadoro                      |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ogbe 2 → 2 | 1024    | Aha ọzọ; `model` dị na nzaghachi bụ `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | ogbe 2 → 2 | 1024    | NJ na-enweghị prefix na-arụkwa ọrụ                |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | Oghere vektọ ya dị iche na nke small              |

`GET /v1/models` na `GET /v1/embeddings` depụtara
`jina-ai/jina-embeddings-v5-omni-small` (1024) na
`jina-ai/jina-embeddings-v5-omni-nano` (768), yana
`openrouter/google/gemini-embedding-001`. Ha **edepụtaghị**
`openrouter/google/gemini-embedding-2` n'agbanyeghị na NJ ahụ na-enye ọrụ ugbua.

Agwakọtala nano (768-d) na small (1024-d) n'otu index. A pụghị
iji ha tụnyere ibe ha.

## NJ ndị mebiri emebi / na-eduhie eduhie

### Gemini Embedding 2 nke ya

Arịrịọ:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Ihe e nwetara n'ezie (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` na-eweghachikwa otu 400 ahụ. `google/gemini-embedding-2`
na-eweghachi HTTP **400** `Unknown embedding provider: google` ma ọ bụrụ na node
provider ahaziri iche anaghị eji prefix `google`.

Ihe a tụrụ anya ya: ma ọ bụ embedding Gemini nke ya nwere igodo Google AI Studio na
provider `gemini`, ma ọ bụ 400 nke kpọrọ NJ OpenRouter na-arụ ọrụ aha.

Ụzọ imepụtaghachi ya (zochie bearer ahụ):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Ihe nnọchi na-arụ ọrụ:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` nke ya enweghị ike ịrụ ọrụ site naanị na GitOps. A ga-etinyerịrị igodo Google AI
Studio dịka njikọ provider `gemini` (dashboard ma ọ bụ
`GEMINI_API_KEY` e tinyere n'ime OmniRoute). Ihe nzuzo ahụ adịghị na repo a.

### Ụzọ multimodal Jina

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

Jiri `POST /v1/embeddings` ruo mgbe e nwere aha ọzọ.

### Ihe onyonyo Jina / Memorix

Ihe onyonyo iwu kwadoro nke OmniRoute (PNG 28×28, pikselụ 784 — Jina anaghị anabata 1×1):

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

Ihe e nwetara n'ezie: HTTP **200**, vektọ 1, 1024-d.

Ọdịdị nke Memorix 1.6.0 / Jina nke ya:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Ihe e nwetara n'ezie: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` agwakọtara ya na `{ "image": "data:..." }` na-eweghachikwa otu 400 ahụ.

## Ndetu ndị ahịa

### Hindsight 0.9.1

Embedding Hindsight bụ naanị maka ederede (`encode(list[str])`). Ọ naghị eziga
ihe onyonyo. Tụnye URL ntọala embedding dakọtara na OpenAI nke Hindsight gaa na
OmniRoute `/v1`, ma jiri NJ na-arụ ọrụ sitere na tebụl dị n'elu
(`jina-ai/jina-embeddings-v5-omni-small` ma ọ bụ
`openrouter/google/gemini-embedding-2`). Atọpụla model ka ọ bụrụ naanị
`gemini-embedding-2` ma ọ bụrụ na igodo API `gemini` adịghị na gateway ahụ.

### Memorix 1.6.0

Memorix na-ewere naanị `baseUrl` dakọtara na `/jina\.ai/i` dịka mgbasa-ozi nke ya. URL
OmniRoute na-anọgide n'ụzọ naanị ederede ọbụna mgbe model ahụ bụ Jina omni.
Ọnụ ụzọ ahụ bụ nsogbu dị na onye ahịa Memorix. N'adabereghị na nke ahụ, OmniRoute ka na-ajụ
body Jina `{image: "data:..."}` nke Memorix ga-eziga ma ọ bụrụ na ọnụ ụzọ ahụ
meghere; ya mere, ndị ahịa dakọtara na Jina enweghị ike ime embedding onyonyo site na OmniRoute
ma ọ bụrụ na ha ejighị schema iwu kwadoro `{type,source}`.

Jiri `jina-ai/jina-embeddings-v5-omni-small` maka ederede. Atụnyela Memorix
`base_url` na `https://api.jina.ai` — debe OmniRoute dịka naanị ụzọ njikọ.
