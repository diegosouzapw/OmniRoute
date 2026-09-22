# Embeddings client runbook (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operationele notities voor `POST /v1/embeddings` wanneer OmniRoute vóór
Hindsight 0.9.1 (alleen tekst, `encode(list[str])`) en Memorix 1.6.0 (Jina-mediapoort)
staat. Live geverifieerd op 2026-08-17 met OmniRoute 3.8.49 op
`https://omniroute.jaguar-fish.ts.net/v1`. Hieronder staan geen geheimen.

## Werkende model-id's

| Client-id                                      | HTTP | Vectoren    | Dim     | Opmerkingen                                     |
| ---------------------------------------------- | ---- | ----------- | ------- | ----------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Werkt zonder een native Gemini-sleutel          |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Dezelfde vectorruimte als de id zonder preview  |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Vermeld in `GET /v1/embeddings`                 |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | Canonieke Jina omni-id                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; `model` in het antwoord is `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | De kale id wordt ook omgezet                    |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Andere vectorruimte dan small                   |

`GET /v1/models` en `GET /v1/embeddings` vermeldden
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) en
`openrouter/google/gemini-embedding-001`. Ze vermeldden
`openrouter/google/gemini-embedding-2` **niet**, hoewel die id al beschikbaar is.

Meng nano (768-d) en small (1024-d) niet in één index. Ze zijn niet
vergelijkbaar.

## Defecte / misleidende id's

### Native Gemini Embedding 2

Verzoek:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Feitelijk resultaat (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` retourneert dezelfde 400. `google/gemini-embedding-2`
retourneert HTTP **400** `Unknown embedding provider: google`, tenzij een aangepast
providerknooppunt het voorvoegsel `google` gebruikt.

Verwacht: ofwel een native Gemini-embedding met een Google AI Studio-sleutel voor
de `gemini`-provider, ofwel een 400 die de werkende OpenRouter-id vermeldt.

Reproductie (maskeer de bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Werkend alternatief:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Native `gemini-embedding-2` kan niet alleen via GitOps werkend worden gemaakt. Een
Google AI Studio-sleutel moet als een `gemini`-providerverbinding worden toegevoegd
(via het dashboard of door `GEMINI_API_KEY` in OmniRoute te importeren). Dat geheim
staat niet in deze repo.

### Multimodaal pad van Jina

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

Gebruik `POST /v1/embeddings` totdat er een alias bestaat.

### Jina-/Memorix-afbeeldingsobject

Canoniek OmniRoute-afbeeldingsitem (28×28 PNG, 784 pixels — Jina weigert 1×1):

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

Feitelijk resultaat: HTTP **200**, 1 vector, 1024-d.

Native indeling van Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Feitelijk resultaat: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` gemengd met `{ "image": "data:..." }` levert dezelfde 400 op.

## Clientnotities

### Hindsight 0.9.1

Hindsight-embeddings zijn alleen voor tekst (`encode(list[str])`). Het verzendt
geen afbeeldingsobjecten. Richt de OpenAI-compatibele basis-URL voor embeddings
van Hindsight op OmniRoute `/v1` en gebruik een werkende id uit de bovenstaande
tabel (`jina-ai/jina-embeddings-v5-omni-small` of
`openrouter/google/gemini-embedding-2`). Stel het model niet in op de kale
`gemini-embedding-2`, tenzij er op de gateway een `gemini`-API-sleutel aanwezig is.

### Memorix 1.6.0

Memorix behandelt alleen een `baseUrl` die overeenkomt met `/jina\.ai/i` als
native media. Een OmniRoute-URL blijft het pad voor alleen tekst gebruiken, zelfs
wanneer het model Jina omni is. Die poort is een probleem in de Memorix-client.
Los daarvan weigert OmniRoute nog steeds de Jina-body `{image: "data:..."}`
die Memorix zou verzenden als de poort werd geopend. Jina-compatibele clients
kunnen daarom geen afbeeldingen via OmniRoute embedden zonder het canonieke
`{type,source}`-schema.

Gebruik `jina-ai/jina-embeddings-v5-omni-small` voor tekst. Richt `base_url` van
Memorix niet op `https://api.jina.ai` — behoud OmniRoute als de enige tussenstap.
