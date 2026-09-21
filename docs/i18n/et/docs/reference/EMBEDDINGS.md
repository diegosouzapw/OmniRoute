# Embeddings client runbook (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operaatori märkmed `POST /v1/embeddings` kohta, kui OmniRoute asub
Hindsight 0.9.1 (ainult tekstiga `encode(list[str])`) ja Memorix 1.6.0 (Jina meedia
värav) ees. Reaalajas kontrollitud 2026-08-17 OmniRoute 3.8.49 vastu aadressil
`https://omniroute.jaguar-fish.ts.net/v1`. Allpool pole saladusi.

## Töötavad mudeli-ID-d

| Kliendi-ID                                     | HTTP | Vektorid     | Mõõtmed | Märkused                                        |
| ---------------------------------------------- | ---- | ------------ | ------- | ----------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | partii 2 → 2 | 3072    | Töötab ilma Gemini oma võtmeta                  |
| `openrouter/google/gemini-embedding-2-preview` | 200  | partii 2 → 2 | 3072    | Sama vektorruum mis eelvaateta ID-l             |
| `openrouter/google/gemini-embedding-001`       | 200  | partii 2 → 2 | 3072    | Loetletud päringu `GET /v1/embeddings` vastuses |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | partii 2 → 2 | 1024    | Jina omni kanooniline ID                        |
| `jina/jina-embeddings-v5-omni-small`           | 200  | partii 2 → 2 | 1024    | Alias; vastuse `model` on `jina-ai/...`         |
| `jina-embeddings-v5-omni-small`                | 200  | partii 2 → 2 | 1024    | Lahendatakse ka ilma prefiksita ID              |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | Small-mudelist erinev vektorruum                |

`GET /v1/models` ja `GET /v1/embeddings` loetlesid mudelid
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) ja
`openrouter/google/gemini-embedding-001`. Need **ei** loetlenud mudelit
`openrouter/google/gemini-embedding-2`, kuigi see ID juba töötab.

Ärge segage nano- (768-mõõtmelisi) ja small-vektoreid (1024-mõõtmelisi) ühes indeksis. Need pole
võrreldavad.

## Katkised / eksitavad ID-d

### Gemini Embedding 2 omaühendus

Päring:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Tegelik tulemus (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` tagastab sama veakoodi 400. `google/gemini-embedding-2`
tagastab HTTP **400** `Unknown embedding provider: google`, kui just kohandatud
teenusepakkuja sõlm ei kasuta prefiksit `google`.

Oodatav tulemus: kas Gemini oma manustamine Google AI Studio võtmega
teenusepakkuja `gemini` kaudu või veakood 400, mis nimetab töötava OpenRouteri ID.

Taasesitamine (peitke pääsutõend):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Töötav asendus:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Omaühendusega `gemini-embedding-2` ei saa ainult GitOpsi abil töötada. Google AI
Studio võti tuleb lisada teenusepakkuja `gemini` ühendusena (juhtpaneelil või
importides `GEMINI_API_KEY` OmniRoute'i). Seda saladust selles hoidlas pole.

### Jina multimodaalne marsruut

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

Kasutage `POST /v1/embeddings`, kuni alias on olemas.

### Jina / Memorixi pildiobjekt

OmniRoute'i kanooniline pildielement (28×28 PNG, 784 pikslit — Jina lükkab 1×1 tagasi):

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

Tegelik tulemus: HTTP **200**, 1 vektor, 1024-mõõtmeline.

Memorix 1.6.0 / Jina oma vorming:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Tegelik tulemus: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Koos kasutatud `{ "text": "..." }` ja `{ "image": "data:..." }` annavad sama veakoodi 400.

## Kliendi märkmed

### Hindsight 0.9.1

Hindsighti manustamised on ainult tekstipõhised (`encode(list[str])`). See ei saada
pildiobjekte. Suunake Hindsighti OpenAI-ga ühilduvate manustamiste baas-URL
OmniRoute'i marsruudile `/v1` ja kasutage ülaltoodud tabelist töötavat ID-d
(`jina-ai/jina-embeddings-v5-omni-small` või
`openrouter/google/gemini-embedding-2`). Ärge määrake mudeliks prefiksita
`gemini-embedding-2`, kui lüüsis pole `gemini` API võtit.

### Memorix 1.6.0

Memorix käsitleb omameediana ainult sellist `baseUrl` väärtust, mis vastab mustrile `/jina\.ai/i`. Kui
URL viitab OmniRoute'ile, jääb kasutusele ainult teksti toetav marsruut isegi siis, kui mudel on Jina omni.
See värav on Memorixi kliendi probleem. Sellest sõltumatult lükkab OmniRoute endiselt tagasi
Jina `{image: "data:..."}` päringukeha, mille Memorix värava avanemisel saadaks,
seega ei saa Jina-ga ühilduvad kliendid OmniRoute'i kaudu pilte manustada
ilma kanoonilise `{type,source}` skeemita.

Kasutage teksti jaoks mudelit `jina-ai/jina-embeddings-v5-omni-small`. Ärge suunake Memorixi
`base_url` aadressile `https://api.jina.ai` — jätke OmniRoute ainsaks vahesammuks.
