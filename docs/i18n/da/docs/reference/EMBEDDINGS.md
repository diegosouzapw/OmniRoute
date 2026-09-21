# Embeddings client runbook (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Driftsnoter til `POST /v1/embeddings`, når OmniRoute står foran
Hindsight 0.9.1 (kun tekst, `encode(list[str])`) og Memorix 1.6.0 (Jina-medieport).
Liveverificeret 2026-08-17 mod OmniRoute 3.8.49 på
`https://omniroute.jaguar-fish.ts.net/v1`. Ingen hemmeligheder nedenfor.

## Fungerende model-id'er

| Klient-id                                      | HTTP | Vektorer    | Dim.    | Noter                                   |
| ---------------------------------------------- | ---- | ----------- | ------- | --------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Fungerer uden en indbygget Gemini-nøgle |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Samme vektorrum som id'et uden preview  |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Angivet i `GET /v1/embeddings`          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | Kanonisk Jina omni-id                   |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; svarets `model` er `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | Id'et uden præfiks fortolkes også       |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Et andet vektorrum end small            |

`GET /v1/models` og `GET /v1/embeddings` angav
`jina-ai/jina-embeddings-v5-omni-small` (1024) og
`jina-ai/jina-embeddings-v5-omni-nano` (768) samt
`openrouter/google/gemini-embedding-001`. De angav **ikke**
`openrouter/google/gemini-embedding-2`, selvom det id allerede betjenes.

Bland ikke nano (768-d) og small (1024-d) i samme indeks. De kan ikke
sammenlignes.

## Defekte / misvisende id'er

### Indbygget Gemini Embedding 2

Anmodning:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Faktisk resultat (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` returnerer samme 400. `google/gemini-embedding-2`
returnerer HTTP **400** `Unknown embedding provider: google`, medmindre en
brugerdefineret udbydernode bruger præfikset `google`.

Forventet: enten en indbygget Gemini-embedding med en Google AI Studio-nøgle
hos `gemini`-udbyderen eller en 400-fejl, der angiver det fungerende
OpenRouter-id.

Reproduktion (skjul bearer-tokenet):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Fungerende erstatning:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Den indbyggede `gemini-embedding-2` kan ikke fungere alene via GitOps. En
Google AI Studio-nøgle skal tilføjes som en `gemini`-udbyderforbindelse
(kontrolpanel eller `GEMINI_API_KEY` importeret i OmniRoute). Denne
hemmelighed findes ikke i dette repo.

### Jina-multimodalsti

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

Brug `POST /v1/embeddings`, indtil der findes et alias.

### Jina-/Memorix-billedobjekt

OmniRoutes kanoniske billedelement (28×28 PNG, 784 pixels — Jina afviser 1×1):

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

Faktisk resultat: HTTP **200**, 1 vektor, 1024-d.

Oprindeligt format for Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Faktisk resultat: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` blandet med `{ "image": "data:..." }` giver samme 400.

## Klientnoter

### Hindsight 0.9.1

Hindsight-embeddings understøtter kun tekst (`encode(list[str])`). Det sender
ikke billedobjekter. Ret Hindsights OpenAI-kompatible basis-URL for embeddings
mod OmniRoute `/v1`, og brug et fungerende id fra tabellen ovenfor
(`jina-ai/jina-embeddings-v5-omni-small` eller
`openrouter/google/gemini-embedding-2`). Angiv ikke modellen som blot
`gemini-embedding-2`, medmindre der findes en `gemini`-API-nøgle på gatewayen.

### Memorix 1.6.0

Memorix behandler kun `baseUrl`, der matcher `/jina\.ai/i`, som indbyggede
medier. En OmniRoute-URL forbliver på stien, der kun understøtter tekst,
selv når modellen er Jina omni. Denne port er et problem i Memorix-klienten.
Uafhængigt heraf afviser OmniRoute stadig Jina-formatet
`{image: "data:..."}`, som Memorix ville sende, hvis porten blev åbnet, så
Jina-kompatible klienter kan ikke indlejre billeder gennem OmniRoute uden det
kanoniske `{type,source}`-skema.

Brug `jina-ai/jina-embeddings-v5-omni-small` til tekst. Ret ikke Memorix'
`base_url` mod `https://api.jina.ai` — behold OmniRoute som det eneste hop.
