# Embeddings client runbook (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operatørnotater for `POST /v1/embeddings` når OmniRoute står foran
Hindsight 0.9.1 (kun tekst, `encode(list[str])`) og Memorix 1.6.0 (Jina-medieport).
Verifisert i produksjon 2026-08-17 mot OmniRoute 3.8.49 på
`https://omniroute.jaguar-fish.ts.net/v1`. Ingen hemmeligheter nedenfor.

## Fungerende modell-ID-er

| Klient-ID                                      | HTTP | Vektorer     | Dim     | Merknader                                      |
| ---------------------------------------------- | ---- | ------------ | ------- | ---------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | gruppe 2 → 2 | 3072    | Fungerer uten en innebygd Gemini-nøkkel        |
| `openrouter/google/gemini-embedding-2-preview` | 200  | gruppe 2 → 2 | 3072    | Samme vektorrom som ID-en uten forhåndsvisning |
| `openrouter/google/gemini-embedding-001`       | 200  | gruppe 2 → 2 | 3072    | Oppført i `GET /v1/embeddings`                 |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | gruppe 2 → 2 | 1024    | Kanonisk Jina omni-ID                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | gruppe 2 → 2 | 1024    | Alias; `model` i svaret er `jina-ai/...`       |
| `jina-embeddings-v5-omni-small`                | 200  | gruppe 2 → 2 | 1024    | ID uten prefiks blir også løst                 |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | Et annet vektorrom enn small                   |

`GET /v1/models` og `GET /v1/embeddings` oppførte
`jina-ai/jina-embeddings-v5-omni-small` (1024) og
`jina-ai/jina-embeddings-v5-omni-nano` (768) samt
`openrouter/google/gemini-embedding-001`. De oppførte **ikke**
`openrouter/google/gemini-embedding-2`, selv om denne ID-en allerede betjenes.

Ikke bland nano (768-d) og small (1024-d) i én indeks. De kan ikke
sammenlignes.

## Defekte / misvisende ID-er

### Innebygd Gemini Embedding 2

Forespørsel:

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
returnerer HTTP **400** `Unknown embedding provider: google`, med mindre en
egendefinert leverandørnode bruker prefikset `google`.

Forventet: enten en innebygd Gemini-embedding med en Google AI Studio-nøkkel
hos `gemini`-leverandøren, eller en 400-feil som oppgir den fungerende
OpenRouter-ID-en.

Reproduksjon (skjul bearer-tokenet):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Fungerende alternativ:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Innebygd `gemini-embedding-2` kan ikke fungere kun via GitOps. En Google AI
Studio-nøkkel må legges til som en `gemini`-leverandørtilkobling (kontrollpanelet
eller `GEMINI_API_KEY` importert til OmniRoute). Denne hemmeligheten finnes ikke
i dette repositoriet.

### Jinas multimodale endepunkt

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

Bruk `POST /v1/embeddings` inntil det finnes et alias.

### Jina-/Memorix-bildeobjekt

OmniRoutes kanoniske bildeelement (28×28 PNG, 784 piksler — Jina avviser 1×1):

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

Innebygd format for Memorix 1.6.0 / Jina:

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

`{ "text": "..." }` blandet med `{ "image": "data:..." }` gir samme 400.

## Klientnotater

### Hindsight 0.9.1

Hindsight-embeddings støtter bare tekst (`encode(list[str])`). Det sender ikke
bildeobjekter. Pek Hindsights OpenAI-kompatible basis-URL for embeddings mot
OmniRoute `/v1`, og bruk en fungerende ID fra tabellen ovenfor
(`jina-ai/jina-embeddings-v5-omni-small` eller
`openrouter/google/gemini-embedding-2`). Ikke sett modellen til bare
`gemini-embedding-2` med mindre det finnes en `gemini`-API-nøkkel på gatewayen.

### Memorix 1.6.0

Memorix behandler bare `baseUrl` som innebygd mediestøtte når den samsvarer med
`/jina\.ai/i`. En OmniRoute-URL forblir på banen som bare støtter tekst, selv
når modellen er Jina omni. Denne porten er et problem i Memorix-klienten.
Uavhengig av dette avviser OmniRoute fortsatt Jina-formatet
`{image: "data:..."}` som Memorix ville sendt dersom porten ble åpnet. Derfor
kan ikke Jina-kompatible klienter bygge embeddings av bilder gjennom OmniRoute
uten det kanoniske `{type,source}`-skjemaet.

Bruk `jina-ai/jina-embeddings-v5-omni-small` for tekst. Ikke pek Memorix'
`base_url` mot `https://api.jina.ai` — behold OmniRoute som eneste mellomledd.
