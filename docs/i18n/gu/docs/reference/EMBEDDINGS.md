# Embeddings client runbook (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

જ્યારે OmniRoute, Hindsight 0.9.1 (માત્ર-ટેક્સ્ટ `encode(list[str])`) અને Memorix 1.6.0 (Jina મીડિયા ગેટ)ની આગળ હોય ત્યારે `POST /v1/embeddings` માટે ઑપરેટર નોંધો. `https://omniroute.jaguar-fish.ts.net/v1` પર OmniRoute 3.8.49 સામે 2026-08-17ના રોજ લાઇવ ચકાસાયેલ. નીચે કોઈ સિક્રેટ્સ નથી.

## કાર્યરત મોડેલ ids

| ક્લાયન્ટ id                                    | HTTP | વેક્ટર્સ  | પરિમાણ  | નોંધો                                         |
| ---------------------------------------------- | ---- | --------- | ------- | --------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | બૅચ 2 → 2 | 3072    | મૂળ Gemini કી વિના કાર્ય કરે છે               |
| `openrouter/google/gemini-embedding-2-preview` | 200  | બૅચ 2 → 2 | 3072    | નોન-પ્રિવ્યૂ id જેટલો જ સ્પેસ                 |
| `openrouter/google/gemini-embedding-001`       | 200  | બૅચ 2 → 2 | 3072    | `GET /v1/embeddings`માં સૂચિબદ્ધ              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | બૅચ 2 → 2 | 1024    | પ્રમાણભૂત Jina omni id                        |
| `jina/jina-embeddings-v5-omni-small`           | 200  | બૅચ 2 → 2 | 1024    | ઉપનામ; પ્રતિસાદમાં `model` એ `jina-ai/...` છે |
| `jina-embeddings-v5-omni-small`                | 200  | બૅચ 2 → 2 | 1024    | પ્રિફિક્સ વિનાનું id પણ રિઝોલ્વ થાય છે        |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | small કરતાં અલગ વેક્ટર સ્પેસ                  |

`GET /v1/models` અને `GET /v1/embeddings`માં
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) અને
`openrouter/google/gemini-embedding-001` સૂચિબદ્ધ હતા. `openrouter/google/gemini-embedding-2`
id પહેલેથી સેવા આપતું હોવા છતાં તેમણે તેને સૂચિબદ્ધ કર્યું **નહોતું**.

nano (768-d) અને small (1024-d)ને એક જ ઇન્ડેક્સમાં મિશ્રિત કરશો નહીં. તેમની
તુલના કરી શકાતી નથી.

## ખામીયુક્ત / ભ્રામક ids

### મૂળ Gemini Embedding 2

વિનંતી:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

વાસ્તવિક પરિણામ (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` એ જ 400 પરત કરે છે. જ્યાં સુધી કોઈ કસ્ટમ
પ્રોવાઇડર નોડ `google` પ્રિફિક્સનો ઉપયોગ ન કરે ત્યાં સુધી
`google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google`
પરત કરે છે.

અપેક્ષિત: `gemini` પ્રોવાઇડર પર Google AI Studio કી સાથે મૂળ Gemini
એમ્બેડ, અથવા કાર્યરત OpenRouter id જણાવતો 400 પ્રતિસાદ.

પુનરુત્પાદન (બેરર છુપાવો):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

કાર્યરત વિકલ્પ:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

માત્ર GitOps વડે મૂળ `gemini-embedding-2` સફળ થઈ શકતું નથી. Google AI
Studio કીને `gemini` પ્રોવાઇડર કનેક્શન તરીકે ઉમેરવી આવશ્યક છે (ડૅશબોર્ડ
અથવા OmniRouteમાં આયાત કરાયેલ `GEMINI_API_KEY`). તે સિક્રેટ આ repoમાં નથી.

### Jina મલ્ટિમોડલ પાથ

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

ઉપનામ ઉપલબ્ધ ન થાય ત્યાં સુધી `POST /v1/embeddings`નો ઉપયોગ કરો.

### Jina / Memorix ઇમેજ ઑબ્જેક્ટ

OmniRouteનું પ્રમાણભૂત ઇમેજ આઇટમ (28×28 PNG, 784 પિક્સેલ — Jina 1×1ને
નકારે છે):

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

વાસ્તવિક પરિણામ: HTTP **200**, 1 વેક્ટર, 1024-d.

Memorix 1.6.0 / Jina મૂળ ફોર્મેટ:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

વાસ્તવિક પરિણામ: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`ને `{ "image": "data:..." }` સાથે મિશ્રિત કરવાથી પણ એ જ
400 મળે છે.

## ક્લાયન્ટ નોંધો

### Hindsight 0.9.1

Hindsight એમ્બેડિંગ્સ માત્ર ટેક્સ્ટ માટે છે (`encode(list[str])`). તે ઇમેજ
ઑબ્જેક્ટ્સ મોકલતું નથી. Hindsightના OpenAI-સુસંગત એમ્બેડિંગ્સ બેઝ URLને
OmniRoute `/v1` તરફ નિર્દેશિત કરો અને ઉપરના કોષ્ટકમાંથી કોઈ કાર્યરત id
(`jina-ai/jina-embeddings-v5-omni-small` અથવા
`openrouter/google/gemini-embedding-2`)નો ઉપયોગ કરો. ગેટવે પર `gemini` API
કી ઉપલબ્ધ ન હોય ત્યાં સુધી મોડેલને પ્રિફિક્સ વિનાના `gemini-embedding-2`
પર સેટ કરશો નહીં.

### Memorix 1.6.0

Memorix માત્ર `/jina\.ai/i` સાથે મેળ ખાતા `baseUrl`ને મૂળ મીડિયા તરીકે
ગણે છે. મોડેલ Jina omni હોય ત્યારે પણ OmniRoute URL માત્ર-ટેક્સ્ટ પાથ પર
રહે છે. તે ગેટ Memorix ક્લાયન્ટની સમસ્યા છે. તેનાથી સ્વતંત્ર રીતે,
જો ગેટ ખૂલે તો Memorix જે Jina `{image: "data:..."}` બોડી મોકલશે તેને
OmniRoute હજી પણ નકારે છે; તેથી પ્રમાણભૂત `{type,source}` સ્કીમા વિના
Jina-સુસંગત ક્લાયન્ટ્સ OmniRoute મારફતે ઇમેજ એમ્બેડ કરી શકતા નથી.

ટેક્સ્ટ માટે `jina-ai/jina-embeddings-v5-omni-small`નો ઉપયોગ કરો. Memorixના
`base_url`ને `https://api.jina.ai` તરફ નિર્દેશિત કરશો નહીં — OmniRouteને
એકમાત્ર હોપ તરીકે રાખો.
