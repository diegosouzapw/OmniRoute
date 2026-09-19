# EMBEDDINGS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

# Priručnik za Embeddings klijent

Operativne napomene za `POST /v1/embeddings` kada se OmniRoute nalazi ispred
Hindsight 0.9.1 (samo tekst `encode(list[str])`) i Memorix 1.6.0 (Jina media
gate). Provjereno uživo 17.08.2026. na OmniRoute 3.8.49 na
`https://omniroute.jaguar-fish.ts.net/v1`. Ispod nema tajni.

## ID-ovi radnih modela

| Client id                                      | HTTP | Vektori     | Dim     | Napomene                                 |
| ---------------------------------------------- | ---- | ----------- | ------- | ---------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Radi bez izvornog Gemini ključa          |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Isti prostor kao i ID koji nije preview  |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Navedeno u `GET /v1/embeddings`          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | Kanonički Jina omni ID                   |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; response `model` je `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | I "goli" ID se razrješava                |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Drugačiji vektorski prostor od small     |

`GET /v1/models` i `GET /v1/embeddings` su naveli
`jina-ai/jina-embeddings-v5-omni-small` (1024) i
`jina-ai/jina-embeddings-v5-omni-nano` (768) i
`openrouter/google/gemini-embedding-001`. Nisu naveli
`openrouter/google/gemini-embedding-2` iako taj ID već služi.

Nemojte miješati nano (768-d) i small (1024-d) u jednom indeksu. Oni nisu
uporedivi.

## Neispravni / obmanjujući ID-ovi

### Izvorni Gemini Embedding 2

Zahtjev:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Stvarno stanje (17.08.2026.): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` vraća isti 400. `google/gemini-embedding-2`
vraća HTTP **400** `Unknown embedding provider: google` osim ako čvor
prilagođenog provajdera ne koristi prefiks `google`.

Očekivano: ili izvorni Gemini embed sa Google AI Studio ključem na
`gemini` provajderu, ili 400 koji imenuje radni OpenRouter ID.

Repro (redigujte bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Radna zamjena:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Izvorni `gemini-embedding-2` ne može uspjeti samo iz GitOps-a. Google AI
Studio ključ se mora dodati kao `gemini` konekcija provajdera (kontrolna tabla ili
`GEMINI_API_KEY` uvezen u OmniRoute). Ta tajna nije u ovom repozitoriju.

### Jina multimodalna putanja

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

Koristite `POST /v1/embeddings` dok ne postoji alias.

### Jina / Memorix objekat slike

OmniRoute kanonička stavka slike (28×28 PNG, 784 piksela — Jina odbija 1×1):

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

Stvarno stanje: HTTP **200**, 1 vektor, 1024-d.

Memorix 1.6.0 / Jina izvorni oblik:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Stvarno stanje: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` pomiješano sa `{ "image": "data:..." }` je isti 400.

## Napomene za klijenta

### Hindsight 0.9.1

Hindsight embeddings su samo tekstualni (`encode(list[str])`). Ne šalje
objekte slika. Usmjerite Hindsight-ov OpenAI-kompatibilni embeddings base URL na
OmniRoute `/v1` i koristite radni ID iz tabele iznad
(`jina-ai/jina-embeddings-v5-omni-small` ili
`openrouter/google/gemini-embedding-2`). Nemojte postavljati model na "goli"
`gemini-embedding-2` osim ako `gemini` API ključ ne postoji na gateway-u.

### Memorix 1.6.0

Memorix tretira samo `baseUrl` koji odgovara `/jina\.ai/i` kao izvorni medij.
OmniRoute URL ostaje na putanji samo za tekst čak i kada je model Jina omni.
Taj gate je problem Memorix klijenta. Nezavisno od toga, OmniRoute i dalje odbija
Jina `{image: "data:..."}` tijelo koje bi Memorix poslao da se gate otvorio,
tako da Jina-kompatibilni klijenti ne mogu ugrađivati slike kroz OmniRoute
bez kanoničke `{type,source}` šeme.

Koristite `jina-ai/jina-embeddings-v5-omni-small` za tekst. Nemojte usmjeravati
Memorix `base_url` na `https://api.jina.ai` — zadržite OmniRoute kao jedini hop.
