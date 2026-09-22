# Embeddings client runbook (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Operaattorin huomautukset `POST /v1/embeddings` -rajapinnasta, kun OmniRoute toimii
Hindsight 0.9.1:n (vain tekstiä käsittelevä `encode(list[str])`) ja Memorix 1.6.0:n (Jina-median
portti) edessä. Toiminta varmennettu tuotannossa 2026-08-17 OmniRoute 3.8.49:ää vasten osoitteessa
`https://omniroute.jaguar-fish.ts.net/v1`. Alla ei ole salaisuuksia.

## Toimivat mallitunnukset

| Asiakastunnus                                  | HTTP | Vektorit  | Dim     | Huomautukset                                      |
| ---------------------------------------------- | ---- | --------- | ------- | ------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | erä 2 → 2 | 3072    | Toimii ilman natiivia Gemini-avainta              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | erä 2 → 2 | 3072    | Sama vektoriavaruus kuin ei-esikatselutunnuksella |
| `openrouter/google/gemini-embedding-001`       | 200  | erä 2 → 2 | 3072    | Lueteltu `GET /v1/embeddings` -vastauksessa       |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | erä 2 → 2 | 1024    | Kanoninen Jina omni -tunnus                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | erä 2 → 2 | 1024    | Alias; vastauksen `model` on `jina-ai/...`        |
| `jina-embeddings-v5-omni-small`                | 200  | erä 2 → 2 | 1024    | Myös pelkkä tunnus selviää                        |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | Eri vektoriavaruus kuin small-mallilla            |

`GET /v1/models` ja `GET /v1/embeddings` luettelivat
`jina-ai/jina-embeddings-v5-omni-small` (1024)- ja
`jina-ai/jina-embeddings-v5-omni-nano` (768) -mallit sekä
`openrouter/google/gemini-embedding-001`-mallin. Ne **eivät** luetelleet
`openrouter/google/gemini-embedding-2`-mallia, vaikka kyseinen tunnus palvelee jo pyyntöjä.

Älä sekoita nano- (768-ulotteisia) ja small-vektoreita (1024-ulotteisia) samaan indeksiin. Ne eivät ole
vertailukelpoisia.

## Rikkinäiset / harhaanjohtavat tunnukset

### Natiivi Gemini Embedding 2

Pyyntö:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Todellinen tulos (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` palauttaa saman 400-virheen. `google/gemini-embedding-2`
palauttaa HTTP **400** `Unknown embedding provider: google`, ellei mukautettu
palveluntarjoajasolmu käytä `google`-etuliitettä.

Odotettu tulos: joko natiivi Gemini-upotus Google AI Studio -avaimella
`gemini`-palveluntarjoajassa tai 400-virhe, joka nimeää toimivan OpenRouter-tunnuksen.

Toistaminen (peitä bearer-tunniste):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Toimiva korvaava ratkaisu:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Natiivi `gemini-embedding-2` ei voi toimia pelkän GitOpsin avulla. Google AI
Studio -avain on lisättävä `gemini`-palveluntarjoajan yhteydeksi (hallintapaneelin kautta tai
tuomalla `GEMINI_API_KEY` OmniRouteen). Kyseinen salaisuus ei ole tässä repositoriossa.

### Jinan multimodaalinen polku

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

Käytä `POST /v1/embeddings` -rajapintaa, kunnes alias on olemassa.

### Jinan / Memorixin kuvaobjekti

OmniRouten kanoninen kuva-alkio (28×28 PNG, 784 pikseliä — Jina hylkää 1×1-kuvan):

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

Todellinen tulos: HTTP **200**, 1 vektori, 1024-ulotteinen.

Memorix 1.6.0:n / Jinan natiivi muoto:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Todellinen tulos: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` sekoitettuna `{ "image": "data:..." }` -objektiin tuottaa saman 400-virheen.

## Asiakassovelluksia koskevat huomautukset

### Hindsight 0.9.1

Hindsightin upotukset ovat vain tekstille (`encode(list[str])`). Se ei lähetä
kuvaobjekteja. Osoita Hindsightin OpenAI-yhteensopivien upotusten perus-URL
OmniRouten `/v1`-polkuun ja käytä yllä olevasta taulukosta toimivaa tunnusta
(`jina-ai/jina-embeddings-v5-omni-small` tai
`openrouter/google/gemini-embedding-2`). Älä aseta malliksi pelkkää
`gemini-embedding-2`-tunnusta, ellei yhdyskäytävässä ole `gemini`-API-avainta.

### Memorix 1.6.0

Memorix käsittelee natiivina mediana vain `baseUrl`-arvon, joka vastaa lauseketta `/jina\.ai/i`.
OmniRoute-URL pysyy vain tekstiä käsittelevällä polulla, vaikka mallina olisi Jina omni.
Tämä portti on Memorix-asiakassovelluksen ongelma. Tästä riippumatta OmniRoute hylkää edelleen
Jinan `{image: "data:..."}` -rungon, jonka Memorix lähettäisi, jos portti
avautuisi. Siksi Jina-yhteensopivat asiakassovellukset eivät voi upottaa kuvia OmniRouten kautta
ilman kanonista `{type,source}`-skeemaa.

Käytä tekstille `jina-ai/jina-embeddings-v5-omni-small`-mallia. Älä osoita Memorixin
`base_url`-arvoa osoitteeseen `https://api.jina.ai` — pidä OmniRoute ainoana välipisteenä.
