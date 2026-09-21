# Embeddings client runbook (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operatoriaus pastabos dėl `POST /v1/embeddings`, kai „OmniRoute“ yra prieš
„Hindsight“ 0.9.1 (tik tekstui skirtas `encode(list[str])`) ir „Memorix“ 1.6.0 („Jina“ medijos
patikra). Tiesiogiai patikrinta 2026-08-17 naudojant „OmniRoute“ 3.8.49 adresu
`https://omniroute.jaguar-fish.ts.net/v1`. Toliau nėra jokių paslapčių.

## Veikiantys modelių ID

| Kliento ID                                     | HTTP | Vektoriai     | Matmenys | Pastabos                                                |
| ---------------------------------------------- | ---- | ------------- | -------- | ------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 2 paketas → 2 | 3072     | Veikia be nuosavo „Gemini“ rakto                        |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 2 paketas → 2 | 3072     | Ta pati vektorių erdvė kaip ir ne peržiūros ID          |
| `openrouter/google/gemini-embedding-001`       | 200  | 2 paketas → 2 | 3072     | Nurodytas `GET /v1/embeddings`                          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 2 paketas → 2 | 1024     | Kanoninis „Jina omni“ ID                                |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 2 paketas → 2 | 1024     | Alternatyvus vardas; atsakymo `model` yra `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | 2 paketas → 2 | 1024     | ID be prefikso taip pat atpažįstamas                    |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1         | **768**  | Kita vektorių erdvė nei „small“                         |

`GET /v1/models` ir `GET /v1/embeddings` pateikė
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) ir
`openrouter/google/gemini-embedding-001`. Jie **nepateikė**
`openrouter/google/gemini-embedding-2`, nors šis ID jau aptarnaujamas.

Nemaišykite „nano“ (768 matmenų) ir „small“ (1024 matmenų) viename indekse. Jie nėra
palyginami.

## Neveikiantys / klaidinantys ID

### Savarankiškas „Gemini Embedding 2“

Užklausa:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Faktinis rezultatas (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` grąžina tą patį 400. `google/gemini-embedding-2`
grąžina HTTP **400** `Unknown embedding provider: google`, nebent pasirinktinis
teikėjo mazgas naudoja prefiksą `google`.

Tikėtinas rezultatas: savarankiškas „Gemini“ įterpinys su „Google AI Studio“ raktu,
naudojant `gemini` teikėją, arba 400 atsakymas, kuriame nurodytas veikiantis „OpenRouter“ ID.

Atkūrimas (užmaskuokite prieigos raktą):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Veikiantis pakaitalas:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Savarankiškas `gemini-embedding-2` negali veikti vien naudojant „GitOps“. „Google AI
Studio“ raktas turi būti pridėtas kaip `gemini` teikėjo ryšys (valdymo skydelyje arba
importuojant `GEMINI_API_KEY` į „OmniRoute“). Šios paslapties šioje saugykloje nėra.

### „Jina“ daugiarūšio turinio kelias

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

Naudokite `POST /v1/embeddings`, kol bus sukurtas alternatyvus kelias.

### „Jina“ / „Memorix“ vaizdo objektas

Kanoninis „OmniRoute“ vaizdo elementas (28×28 PNG, 784 pikseliai — „Jina“ atmeta 1×1):

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

Faktinis rezultatas: HTTP **200**, 1 vektorius, 1024 matmenų.

„Memorix“ 1.6.0 / savarankiška „Jina“ struktūra:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Faktinis rezultatas: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` kartu su `{ "image": "data:..." }` sukelia tą patį 400 atsakymą.

## Pastabos klientams

### Hindsight 0.9.1

„Hindsight“ įterpiniai skirti tik tekstui (`encode(list[str])`). Vaizdo objektai
nesiunčiami. Nukreipkite „Hindsight“ su „OpenAI“ suderinamą įterpinių bazinį URL į
„OmniRoute“ `/v1` ir naudokite veikiantį ID iš pirmiau pateiktos lentelės
(`jina-ai/jina-embeddings-v5-omni-small` arba
`openrouter/google/gemini-embedding-2`). Nenustatykite modelio kaip
`gemini-embedding-2` be prefikso, nebent šliuze yra `gemini` API raktas.

### Memorix 1.6.0

„Memorix“ savarankiška medija laiko tik tokį `baseUrl`, kuris atitinka `/jina\.ai/i`.
Naudojant „OmniRoute“ URL liekama tik tekstui skirtame kelyje, net jei modelis yra
„Jina omni“. Ši patikra yra „Memorix“ kliento problema. Be to, „OmniRoute“ vis tiek
atmeta „Jina“ `{image: "data:..."}` užklausos turinį, kurį „Memorix“ siųstų, jei patikra
būtų sėkminga, todėl su „Jina“ suderinami klientai negali įterpti vaizdų per
„OmniRoute“ nenaudodami kanoninės `{type,source}` schemos.

Tekstui naudokite `jina-ai/jina-embeddings-v5-omni-small`. Nenukreipkite „Memorix“
`base_url` į `https://api.jina.ai` — palikite „OmniRoute“ kaip vienintelį tarpinį mazgą.
