# Embeddings client runbook (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Hindsight 0.9.1 (පෙළ පමණක් වන `encode(list[str])`) සහ Memorix 1.6.0 (Jina මාධ්ය
ගේට්ටුව) ඉදිරියෙන් OmniRoute පිහිටා ඇති විට `POST /v1/embeddings` සඳහා
ක්රියාකරු සටහන්. `https://omniroute.jaguar-fish.ts.net/v1` හි OmniRoute 3.8.49
සමඟ 2026-08-17 දින සජීවීව සත්යාපනය කරන ලදී. පහත කිසිදු රහසක් නොමැත.

## ක්රියා කරන ආකෘති ids

| සේවාලාභී id                                    | HTTP | දෛශික        | මානය    | සටහන්                                                 |
| ---------------------------------------------- | ---- | ------------ | ------- | ----------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | කාණ්ඩය 2 → 2 | 3072    | ස්වදේශීය Gemini යතුරක් නොමැතිව ක්රියා කරයි            |
| `openrouter/google/gemini-embedding-2-preview` | 200  | කාණ්ඩය 2 → 2 | 3072    | පෙරදසුන් නොවන id එකට සමාන අවකාශය                      |
| `openrouter/google/gemini-embedding-001`       | 200  | කාණ්ඩය 2 → 2 | 3072    | `GET /v1/embeddings` හි ලැයිස්තුගත කර ඇත              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | කාණ්ඩය 2 → 2 | 1024    | සම්මත Jina omni id                                    |
| `jina/jina-embeddings-v5-omni-small`           | 200  | කාණ්ඩය 2 → 2 | 1024    | අන්වර්ථ නාමය; ප්රතිචාරයේ `model` යනු `jina-ai/...` වේ |
| `jina-embeddings-v5-omni-small`                | 200  | කාණ්ඩය 2 → 2 | 1024    | නිරාවරණ id එකද විසඳේ                                  |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | small වෙතින් වෙනස් දෛශික අවකාශයකි                     |

`GET /v1/models` සහ `GET /v1/embeddings` තුළ
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), සහ
`openrouter/google/gemini-embedding-001` ලැයිස්තුගත කර තිබුණි. එම id එක දැනටමත්
සේවය සපයන නමුත්, ඒවා `openrouter/google/gemini-embedding-2` ලැයිස්තුගත කර
**නොතිබුණි**.

nano (768-d) සහ small (1024-d) එකම දර්ශකයක මිශ්ර නොකරන්න. ඒවා සැසඳිය
නොහැක.

## බිඳුණු / නොමඟ යවන ids

### ස්වදේශීය Gemini Embedding 2

ඉල්ලීම:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

සැබෑ ප්රතිඵලය (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` මඟින්ද එම 400 ම ලැබේ. අභිරුචි සපයන්නා නෝඩයක්
`google` උපසර්ගය භාවිත නොකරන්නේ නම්, `google/gemini-embedding-2` මඟින් HTTP
**400** `Unknown embedding provider: google` ලැබේ.

අපේක්ෂිතය: `gemini` සපයන්නා මත Google AI Studio යතුරක් සහිත ස්වදේශීය Gemini
කාවැද්දීමක්, හෝ ක්රියා කරන OpenRouter id එක සඳහන් කරන 400 ප්රතිචාරයක්.

ප්රතිනිෂ්පාදනය (bearer අගය සංස්කරණය කර සඟවන්න):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

ක්රියා කරන ආදේශකය:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ස්වදේශීය `gemini-embedding-2` GitOps මඟින් පමණක් සාර්ථක කළ නොහැක. Google AI
Studio යතුරක් `gemini` සපයන්නා සම්බන්ධතාවක් ලෙස එක් කළ යුතුය (උපකරණ පුවරුව
හෝ OmniRoute වෙත ආයාත කළ `GEMINI_API_KEY`). එම රහස මෙම repo එකෙහි නොමැත.

### Jina බහුමාධ්ය මාර්ගය

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

අන්වර්ථ නාමයක් පවතින තෙක් `POST /v1/embeddings` භාවිත කරන්න.

### Jina / Memorix රූප වස්තුව

OmniRoute සම්මත රූප අයිතමය (28×28 PNG, පික්සල 784 — Jina විසින් 1×1
ප්රතික්ෂේප කරයි):

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

සැබෑ ප්රතිඵලය: HTTP **200**, දෛශික 1ක්, 1024-d.

Memorix 1.6.0 / Jina ස්වදේශීය හැඩය:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

සැබෑ ප්රතිඵලය: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` සහ `{ "image": "data:..." }` මිශ්ර කළ විටද එම 400 ම ලැබේ.

## සේවාලාභී සටහන්

### Hindsight 0.9.1

Hindsight කාවැද්දීම් පෙළ පමණක් වේ (`encode(list[str])`). එය රූප වස්තු
නොයවයි. Hindsight හි OpenAI-අනුකූල කාවැද්දීම් මූලික URL එක OmniRoute `/v1`
වෙත යොමු කර, ඉහත වගුවෙන් ක්රියා කරන id එකක්
(`jina-ai/jina-embeddings-v5-omni-small` හෝ
`openrouter/google/gemini-embedding-2`) භාවිත කරන්න. ද්වාරයෙහි `gemini` API
යතුරක් නොමැති නම්, ආකෘතිය නිරාවරණ `gemini-embedding-2` ලෙස නොසකසන්න.

### Memorix 1.6.0

Memorix විසින් `/jina\.ai/i` සමඟ ගැළපෙන `baseUrl` පමණක් ස්වදේශීය මාධ්ය ලෙස
සලකයි. ආකෘතිය Jina omni වුවද, OmniRoute URL එකක් පෙළ-පමණක් මාර්ගයේම පවතී.
එම ගේට්ටුව Memorix සේවාලාභී ගැටලුවකි. වෙනමම, ගේට්ටුව විවෘත වුවහොත්
Memorix විසින් යවනු ලබන Jina `{image: "data:..."}` බඳ OmniRoute විසින් තවමත්
ප්රතික්ෂේප කරන බැවින්, සම්මත `{type,source}` යෝජනා ක්රමය නොමැතිව
Jina-අනුකූල සේවාලාභීන්ට OmniRoute හරහා රූප කාවැද්දිය නොහැක.

පෙළ සඳහා `jina-ai/jina-embeddings-v5-omni-small` භාවිත කරන්න. Memorix
`base_url` එක `https://api.jina.ai` වෙත යොමු නොකරන්න — එකම අතරමැදි පියවර
ලෙස OmniRoute තබා ගන්න.
