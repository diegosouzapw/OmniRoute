# Embeddings client runbook (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Opombe za operaterje za `POST /v1/embeddings`, ko je OmniRoute postavljen pred
Hindsight 0.9.1 (samo besedilni `encode(list[str])`) in Memorix 1.6.0 (Jina media
gate). Preverjeno v živo 2026-08-17 z OmniRoute 3.8.49 na
`https://omniroute.jaguar-fish.ts.net/v1`. Spodaj ni nobenih skrivnosti.

## Delujoči ID-ji modelov

| ID odjemalca                                   | HTTP | Vektorji    | Dim.    | Opombe                                                |
| ---------------------------------------------- | ---- | ----------- | ------- | ----------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | paket 2 → 2 | 3072    | Deluje brez izvornega ključa Gemini                   |
| `openrouter/google/gemini-embedding-2-preview` | 200  | paket 2 → 2 | 3072    | Isti vektorski prostor kot ID brez predogledne oznake |
| `openrouter/google/gemini-embedding-001`       | 200  | paket 2 → 2 | 3072    | Naveden v `GET /v1/embeddings`                        |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | paket 2 → 2 | 1024    | Kanonični ID Jina omni                                |
| `jina/jina-embeddings-v5-omni-small`           | 200  | paket 2 → 2 | 1024    | Vzdevek; `model` v odzivu je `jina-ai/...`            |
| `jina-embeddings-v5-omni-small`                | 200  | paket 2 → 2 | 1024    | Razreši se tudi goli ID                               |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Drugačen vektorski prostor kot pri različici small    |

`GET /v1/models` in `GET /v1/embeddings` sta navajala
`jina-ai/jina-embeddings-v5-omni-small` (1024) in
`jina-ai/jina-embeddings-v5-omni-nano` (768) ter
`openrouter/google/gemini-embedding-001`. Nista pa navajala
`openrouter/google/gemini-embedding-2`, čeprav ta ID že deluje.

Ne mešajte različic nano (768-d) in small (1024-d) v istem indeksu. Nista
primerljivi.

## Nedelujoči/zavajajoči ID-ji

### Izvorni Gemini Embedding 2

Zahteva:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Dejansko stanje (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` vrne enak odgovor 400. `google/gemini-embedding-2`
vrne HTTP **400** `Unknown embedding provider: google`, razen če vozlišče
ponudnika po meri uporablja predpono `google`.

Pričakovano: izvorna vektorska vložitev Gemini s ključem Google AI Studio pri
ponudniku `gemini` ali odgovor 400, ki navede delujoči ID OpenRouter.

Ponovitev (zakrijte žeton bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Delujoči nadomestek:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Izvorni `gemini-embedding-2` ne more delovati zgolj prek GitOps. Ključ Google AI
Studio je treba dodati kot povezavo ponudnika `gemini` (prek nadzorne plošče ali
uvoza `GEMINI_API_KEY` v OmniRoute). Te skrivnosti ni v tem repozitoriju.

### Večmodalna pot Jina

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

Dokler vzdevek ne obstaja, uporabljajte `POST /v1/embeddings`.

### Slikovni objekt Jina/Memorix

Kanonični slikovni element OmniRoute (PNG velikosti 28 × 28, 784 slikovnih pik — Jina zavrne 1 × 1):

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

Dejansko: HTTP **200**, 1 vektor, 1024-d.

Izvorna oblika Memorix 1.6.0/Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Dejansko: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Kombinacija `{ "text": "..." }` z `{ "image": "data:..." }` prav tako vrne 400.

## Opombe za odjemalce

### Hindsight 0.9.1

Vektorske vložitve Hindsight so samo besedilne (`encode(list[str])`). Slikovnih
objektov ne pošilja. Osnovni URL Hindsight za vektorske vložitve, združljive z
OpenAI, usmerite na OmniRoute `/v1` in uporabite delujoči ID iz zgornje tabele
(`jina-ai/jina-embeddings-v5-omni-small` ali
`openrouter/google/gemini-embedding-2`). Modela ne nastavite na goli
`gemini-embedding-2`, razen če na prehodu obstaja ključ API za `gemini`.

### Memorix 1.6.0

Memorix kot izvorno večpredstavnost obravnava samo `baseUrl`, ki se ujema z
`/jina\.ai/i`. URL OmniRoute ostane na samo besedilni poti, tudi če je model
Jina omni. Ta omejitev je težava odjemalca Memorix. Neodvisno od tega OmniRoute
še vedno zavrne telo Jina `{image: "data:..."}`, ki bi ga Memorix poslal, če bi
se prehod odprl, zato odjemalci, združljivi z Jina, ne morejo vdelovati slik prek
OmniRoute brez kanonične sheme `{type,source}`.

Za besedilo uporabite `jina-ai/jina-embeddings-v5-omni-small`. Nastavitve Memorix
`base_url` ne usmerite na `https://api.jina.ai` — OmniRoute naj ostane edini
vmesni člen.
