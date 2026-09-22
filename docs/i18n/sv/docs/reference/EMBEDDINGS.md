# Embeddings client runbook (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operatörsanteckningar för `POST /v1/embeddings` när OmniRoute står framför
Hindsight 0.9.1 (endast text, `encode(list[str])`) och Memorix 1.6.0 (Jina-mediegrind).
Verifierat i drift 2026-08-17 mot OmniRoute 3.8.49 på
`https://omniroute.jaguar-fish.ts.net/v1`. Inga hemligheter nedan.

## Fungerande modell-id:n

| Klient-id                                      | HTTP | Vektorer    | Dim     | Anteckningar                                  |
| ---------------------------------------------- | ---- | ----------- | ------- | --------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Fungerar utan en separat Gemini-nyckel        |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Samma vektorrum som id:t utan förhandsversion |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Listas i `GET /v1/embeddings`                 |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | Kanoniskt Jina omni-id                        |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; svarets `model` är `jina-ai/...`       |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | Id utan prefix kan också matchas              |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Annat vektorrum än small                      |

`GET /v1/models` och `GET /v1/embeddings` listade
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) och
`openrouter/google/gemini-embedding-001`. De listade **inte**
`openrouter/google/gemini-embedding-2`, trots att detta id redan kan användas.

Blanda inte nano (768-d) och small (1024-d) i ett och samma index. De är inte
jämförbara.

## Trasiga/vilseledande id:n

### Inbyggda Gemini Embedding 2

Begäran:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Faktiskt resultat (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` returnerar samma 400. `google/gemini-embedding-2`
returnerar HTTP **400** `Unknown embedding provider: google`, såvida inte en
anpassad providernod använder prefixet `google`.

Förväntat: antingen en inbyggd Gemini-inbäddning med en Google AI
Studio-nyckel hos providern `gemini`, eller ett 400-svar som anger det
fungerande OpenRouter-id:t.

Reproduktion (maskera bearer-token):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Fungerande ersättning:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Inbyggda `gemini-embedding-2` kan inte fungera enbart via GitOps. En Google AI
Studio-nyckel måste läggas till som en provideranslutning för `gemini` (via
instrumentpanelen eller genom att importera `GEMINI_API_KEY` till OmniRoute).
Den hemligheten finns inte i detta repo.

### Multimodal sökväg för Jina

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

Använd `POST /v1/embeddings` tills ett alias finns.

### Jina-/Memorix-bildobjekt

OmniRoutes kanoniska bildobjekt (28×28 PNG, 784 pixlar – Jina avvisar 1×1):

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

Faktiskt resultat: HTTP **200**, 1 vektor, 1024-d.

Memorix 1.6.0/Jinas inbyggda format:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Faktiskt resultat: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` blandat med `{ "image": "data:..." }` ger samma 400-svar.

## Klientanteckningar

### Hindsight 0.9.1

Hindsight-inbäddningar är endast för text (`encode(list[str])`). Det skickar
inte bildobjekt. Rikta Hindsights OpenAI-kompatibla bas-URL för inbäddningar
mot OmniRoute `/v1` och använd ett fungerande id från tabellen ovan
(`jina-ai/jina-embeddings-v5-omni-small` eller
`openrouter/google/gemini-embedding-2`). Ställ inte in modellen på enbart
`gemini-embedding-2` om det inte finns en API-nyckel för `gemini` på gatewayen.

### Memorix 1.6.0

Memorix behandlar endast en `baseUrl` som matchar `/jina\.ai/i` som inbyggt
mediestöd. En OmniRoute-URL fortsätter använda sökvägen för enbart text, även
när modellen är Jina omni. Den grinden är ett klientproblem i Memorix. Oberoende
av detta avvisar OmniRoute fortfarande Jina-kroppen `{image: "data:..."}`
som Memorix skulle skicka om grinden öppnades. Därför kan Jina-kompatibla
klienter inte bädda in bilder via OmniRoute utan det kanoniska schemat
`{type,source}`.

Använd `jina-ai/jina-embeddings-v5-omni-small` för text. Rikta inte Memorix
`base_url` mot `https://api.jina.ai` – behåll OmniRoute som enda mellanled.
