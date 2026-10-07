# Embeddings client runbook (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Üzemeltetői megjegyzések a `POST /v1/embeddings` végponthoz, amikor az OmniRoute a
Hindsight 0.9.1 (csak szöveges `encode(list[str])`) és a Memorix 1.6.0 (Jina média-
kapu) előtt helyezkedik el. Élőben ellenőrizve 2026-08-17-én az OmniRoute 3.8.49-cel a
`https://omniroute.jaguar-fish.ts.net/v1` címen. Alább nincsenek titkos adatok.

## Működő modellazonosítók

| Kliensazonosító                                | HTTP | Vektorok       | Dimenzió | Megjegyzések                                          |
| ---------------------------------------------- | ---- | -------------- | -------- | ----------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 2-es köteg → 2 | 3072     | Natív Gemini-kulcs nélkül is működik                  |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 2-es köteg → 2 | 3072     | Ugyanaz a vektortér, mint a nem előzetes azonosítónál |
| `openrouter/google/gemini-embedding-001`       | 200  | 2-es köteg → 2 | 3072     | Szerepel a `GET /v1/embeddings` válaszában            |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 2-es köteg → 2 | 1024     | Kanonikus Jina omni azonosító                         |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 2-es köteg → 2 | 1024     | Alias; a válasz `model` mezője `jina-ai/...`          |
| `jina-embeddings-v5-omni-small`                | 200  | 2-es köteg → 2 | 1024     | A csupasz azonosító is feloldható                     |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1          | **768**  | A small változatétól eltérő vektortér                 |

A `GET /v1/models` és a `GET /v1/embeddings` felsorolta a
`jina-ai/jina-embeddings-v5-omni-small` (1024), a
`jina-ai/jina-embeddings-v5-omni-nano` (768), valamint az
`openrouter/google/gemini-embedding-001` modellt. Az
`openrouter/google/gemini-embedding-2` modellt **nem** sorolták fel, noha ez az
azonosító már kiszolgálható.

Ne keverje a nano (768 dimenziós) és a small (1024 dimenziós) változatot
ugyanabban az indexben. Nem hasonlíthatók össze.

## Hibás / félrevezető azonosítók

### Natív Gemini Embedding 2

Kérés:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Tényleges eredmény (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

A `gemini/gemini-embedding-2` ugyanazt a 400-as választ adja vissza. A
`google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google`
választ ad, kivéve, ha egy egyéni szolgáltatói csomópont a `google` előtagot
használja.

Elvárt eredmény: vagy natív Gemini-beágyazás Google AI Studio-kulccsal a
`gemini` szolgáltatónál, vagy olyan 400-as válasz, amely megnevezi a működő
OpenRouter-azonosítót.

Reprodukálás (a bearer token kitakarandó):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Működő helyettesítő:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

A natív `gemini-embedding-2` önmagában a GitOps használatával nem működhet.
Egy Google AI Studio-kulcsot kell hozzáadni `gemini` szolgáltatói kapcsolatként
az irányítópulton, vagy az OmniRoute-ba importált `GEMINI_API_KEY` formájában.
Ez a titkos adat nincs ebben a tárolóban.

### Jina multimodális útvonal

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

Használja a `POST /v1/embeddings` végpontot, amíg nem létezik alias.

### Jina / Memorix képobjektum

Az OmniRoute kanonikus képeleme (28×28-as PNG, 784 képpont — a Jina elutasítja
az 1×1-es képet):

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

Tényleges eredmény: HTTP **200**, 1 vektor, 1024 dimenzió.

A Memorix 1.6.0 / Jina natív formátuma:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Tényleges eredmény: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

A `{ "text": "..." }` és a `{ "image": "data:..." }` keverése ugyanilyen
400-as választ eredményez.

## Klienssel kapcsolatos megjegyzések

### Hindsight 0.9.1

A Hindsight beágyazásai csak szövegesek (`encode(list[str])`). Nem küld
képobjektumokat. Állítsa a Hindsight OpenAI-kompatibilis beágyazási alap-URL-jét
az OmniRoute `/v1` címére, és használjon egy működő azonosítót a fenti
táblázatból (`jina-ai/jina-embeddings-v5-omni-small` vagy
`openrouter/google/gemini-embedding-2`). Ne állítsa a modellt a csupasz
`gemini-embedding-2` értékre, kivéve, ha létezik `gemini` API-kulcs az
átjárón.

### Memorix 1.6.0

A Memorix csak a `/jina\.ai/i` mintára illeszkedő `baseUrl` értéket kezeli
natív médiaként. Az OmniRoute URL-je akkor is a csak szöveges útvonalon marad,
ha a modell Jina omni. Ez a kapu a Memorix kliens hibája. Ettől függetlenül az
OmniRoute továbbra is elutasítja azt a Jina-féle `{image: "data:..."}`
törzset, amelyet a Memorix küldene, ha a kapu megnyílna, ezért a
Jina-kompatibilis kliensek nem ágyazhatnak be képeket az OmniRoute-on keresztül
a kanonikus `{type,source}` séma nélkül.

Szöveghez használja a `jina-ai/jina-embeddings-v5-omni-small` modellt. Ne
irányítsa a Memorix `base_url` értékét a `https://api.jina.ai` címre — az
OmniRoute maradjon az egyetlen köztes állomás.
