# Embeddings client runbook (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operatora piezīmes par `POST /v1/embeddings`, kad OmniRoute atrodas priekšā
Hindsight 0.9.1 (tikai teksta `encode(list[str])`) un Memorix 1.6.0 (Jina multivides
vārteja). Reālajā vidē pārbaudīts 2026-08-17 ar OmniRoute 3.8.49 adresē
`https://omniroute.jaguar-fish.ts.net/v1`. Tālāk nav nekādu noslēpumu.

## Darbojošies modeļu ID

| Klienta ID                                     | HTTP | Vektori      | Dimensija | Piezīmes                                          |
| ---------------------------------------------- | ---- | ------------ | --------- | ------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | pakete 2 → 2 | 3072      | Darbojas bez vietējās Gemini atslēgas             |
| `openrouter/google/gemini-embedding-2-preview` | 200  | pakete 2 → 2 | 3072      | Tāda pati vektoru telpa kā ID bez priekšskatījuma |
| `openrouter/google/gemini-embedding-001`       | 200  | pakete 2 → 2 | 3072      | Norādīts `GET /v1/embeddings` sarakstā            |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | pakete 2 → 2 | 1024      | Kanoniskais Jina omni ID                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | pakete 2 → 2 | 1024      | Aizstājvārds; atbildes `model` ir `jina-ai/...`   |
| `jina-embeddings-v5-omni-small`                | 200  | pakete 2 → 2 | 1024      | Tiek atrisināts arī ID bez prefiksa               |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768**   | Cita vektoru telpa nekā small                     |

`GET /v1/models` un `GET /v1/embeddings` sarakstā bija
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) un
`openrouter/google/gemini-embedding-001`. Tajos **nebija** norādīts
`openrouter/google/gemini-embedding-2`, lai gan šis ID jau darbojas.

Nejauciet nano (768 dimensijas) un small (1024 dimensijas) vienā indeksā. Tie nav
salīdzināmi.

## Nedarbojošies / maldinoši ID

### Vietējais Gemini Embedding 2

Pieprasījums:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Faktiskais rezultāts (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` atgriež tādu pašu 400. `google/gemini-embedding-2`
atgriež HTTP **400** `Unknown embedding provider: google`, ja vien pielāgots
nodrošinātāja mezgls neizmanto prefiksu `google`.

Paredzamais rezultāts: vai nu vietējais Gemini iegulšanas modelis ar Google AI Studio atslēgu
`gemini` nodrošinātājam, vai arī 400 kļūda, kurā norādīts darbojošais OpenRouter ID.

Reproducēšana (aizklājiet nesēja marķieri):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Darbojošs aizstājējs:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Vietējais `gemini-embedding-2` nevar darboties, izmantojot tikai GitOps. Google AI
Studio atslēga jāpievieno kā `gemini` nodrošinātāja savienojums (informācijas panelī vai
importējot `GEMINI_API_KEY` OmniRoute). Šī slepenā vērtība nav šajā repozitorijā.

### Jina multimodālais ceļš

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

Izmantojiet `POST /v1/embeddings`, līdz ir pieejams aizstājvārds.

### Jina / Memorix attēla objekts

OmniRoute kanoniskais attēla elements (28×28 PNG, 784 pikseļi — Jina noraida 1×1):

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

Faktiskais rezultāts: HTTP **200**, 1 vektors, 1024 dimensijas.

Memorix 1.6.0 / Jina vietējā struktūra:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Faktiskais rezultāts: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` kombinācijā ar `{ "image": "data:..." }` rada tādu pašu 400 kļūdu.

## Piezīmes klientiem

### Hindsight 0.9.1

Hindsight iegulšanas ir paredzētas tikai tekstam (`encode(list[str])`). Tas nesūta
attēlu objektus. Norādiet Hindsight ar OpenAI saderīgo iegulšanu bāzes URL uz
OmniRoute `/v1` un izmantojiet darbojošos ID no iepriekšējās tabulas
(`jina-ai/jina-embeddings-v5-omni-small` vai
`openrouter/google/gemini-embedding-2`). Neiestatiet modeli tikai kā
`gemini-embedding-2`, ja vien vārtejā nav `gemini` API atslēgas.

### Memorix 1.6.0

Memorix tikai tādu `baseUrl`, kas atbilst `/jina\.ai/i`, uzskata par vietējo multivides
URL. OmniRoute URL paliek tikai teksta ceļā pat tad, ja modelis ir Jina omni.
Šī vārteja ir Memorix klienta problēma. Neatkarīgi no tā OmniRoute joprojām noraida
Jina `{image: "data:..."}` pieprasījuma pamattekstu, ko Memorix nosūtītu, ja vārteja
tiktu atvērta, tādēļ ar Jina saderīgi klienti nevar iegult attēlus, izmantojot OmniRoute,
bez kanoniskās `{type,source}` shēmas.

Tekstam izmantojiet `jina-ai/jina-embeddings-v5-omni-small`. Nenorādiet Memorix
`base_url` uz `https://api.jina.ai` — saglabājiet OmniRoute kā vienīgo starpnieku.
