# Embeddings client runbook (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Noti għall-operaturi dwar `POST /v1/embeddings` meta OmniRoute jkun quddiem
Hindsight 0.9.1 (`encode(list[str])` għal test biss) u Memorix 1.6.0 (il-gate
tal-midja ta’ Jina). Ivverifikat live fl-2026-08-17 ma’ OmniRoute 3.8.49 fuq
`https://omniroute.jaguar-fish.ts.net/v1`. M’hemm l-ebda sigriet hawn taħt.

## IDs tal-mudelli li jaħdmu

| ID tal-klijent                                 | HTTP | Vetturi     | Dim     | Noti                                             |
| ---------------------------------------------- | ---- | ----------- | ------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Jaħdem mingħajr ċavetta nattiva ta’ Gemini       |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | L-istess spazju bħal tal-ID mhux preview         |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Elenkat f’`GET /v1/embeddings`                   |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | L-ID omni kanoniku ta’ Jina                      |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; il-`model` fit-tweġiba huwa `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | L-ID waħdu jiġi riżolt ukoll                     |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Spazju vettorjali differenti minn small          |

`GET /v1/models` u `GET /v1/embeddings` elenkaw
`jina-ai/jina-embeddings-v5-omni-small` (1024) u
`jina-ai/jina-embeddings-v5-omni-nano` (768) u
`openrouter/google/gemini-embedding-001`. Huma **ma** elenkawx
`openrouter/google/gemini-embedding-2` minkejja li dak l-ID diġà qed jaqdi t-talbiet.

Tħallatx nano (768-d) u small (1024-d) f’indiċi wieħed. Ma jistgħux jiġu
mqabbla.

## IDs bil-ħsara / qarrieqa

### Gemini Embedding 2 nattiv

Talba:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Riżultat attwali (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` jirritorna l-istess 400. `google/gemini-embedding-2`
jirritorna HTTP **400** `Unknown embedding provider: google` sakemm node
personalizzat tal-fornitur ma jużax il-prefiss `google`.

Mistenni: jew embedding nattiv ta’ Gemini b’ċavetta ta’ Google AI Studio fuq
il-fornitur `gemini`, jew 400 li jsemmi l-ID ta’ OpenRouter li jaħdem.

Riproduzzjoni (aħbi l-bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Sostitut li jaħdem:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Il-`gemini-embedding-2` nattiv ma jistax jirnexxi permezz ta’ GitOps biss.
Ċavetta ta’ Google AI Studio trid tiġi miżjuda bħala konnessjoni mal-fornitur
`gemini` (mid-dashboard jew billi `GEMINI_API_KEY` tiġi importata f’OmniRoute).
Dak is-sigriet mhuwiex f’dan ir-repo.

### Rotta multimodali ta’ Jina

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

Uża `POST /v1/embeddings` sakemm ikun jeżisti alias.

### Oġġett tal-immaġni ta’ Jina / Memorix

Element kanoniku tal-immaġni ta’ OmniRoute (PNG ta’ 28×28, 784 pixel — Jina
tirrifjuta 1×1):

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

Riżultat attwali: HTTP **200**, vettur 1, 1024-d.

Format nattiv ta’ Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Riżultat attwali: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` imħallat ma’ `{ "image": "data:..." }` jagħti l-istess 400.

## Noti dwar il-klijenti

### Hindsight 0.9.1

L-embeddings ta’ Hindsight huma għal test biss (`encode(list[str])`). Ma
jibgħatx oġġetti tal-immaġni. Ipponta l-URL bażi tal-embeddings kompatibbli
ma’ OpenAI ta’ Hindsight lejn OmniRoute `/v1` u uża ID li jaħdem mit-tabella
ta’ hawn fuq (`jina-ai/jina-embeddings-v5-omni-small` jew
`openrouter/google/gemini-embedding-2`). Tissettjax il-mudell għal
`gemini-embedding-2` waħdu sakemm ma tkunx teżisti ċavetta tal-API `gemini`
fuq il-gateway.

### Memorix 1.6.0

Memorix jittratta bħala midja nattiva biss `baseUrl` li jaqbel ma’
`/jina\.ai/i`. URL ta’ OmniRoute jibqa’ fuq ir-rotta għal test biss anki meta
l-mudell ikun Jina omni. Dak il-gate huwa problema tal-klijent Memorix.
Indipendentement minn dan, OmniRoute xorta jirrifjuta l-body ta’ Jina
`{image: "data:..."}` li Memorix kien jibgħat kieku l-gate nfetaħ, għalhekk
klijenti kompatibbli ma’ Jina ma jistgħux joħolqu embeddings tal-immaġnijiet
permezz ta’ OmniRoute mingħajr l-iskema kanonika `{type,source}`.

Uża `jina-ai/jina-embeddings-v5-omni-small` għat-test. Tippontax il-`base_url`
ta’ Memorix lejn `https://api.jina.ai` — żomm OmniRoute bħala l-uniku hop.
