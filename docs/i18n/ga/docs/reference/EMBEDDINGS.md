# Embeddings client runbook (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Nótaí d’oibreoirí maidir le `POST /v1/embeddings` nuair atá OmniRoute os comhair
Hindsight 0.9.1 (`encode(list[str])` téacs-amháin) agus Memorix 1.6.0 (geata meán
Jina). Fíoraithe beo ar 2026-08-17 i gcoinne OmniRoute 3.8.49 ag
`https://omniroute.jaguar-fish.ts.net/v1`. Níl aon rún thíos.

## Aitheantais samhlacha a oibríonn

| Aitheantas cliaint                             | HTTP | Veicteoirí  | Toise   | Nótaí                                                |
| ---------------------------------------------- | ---- | ----------- | ------- | ---------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | baisc 2 → 2 | 3072    | Oibríonn sé gan eochair dhúchasach Gemini            |
| `openrouter/google/gemini-embedding-2-preview` | 200  | baisc 2 → 2 | 3072    | An spás céanna leis an aitheantas neamh-réamhamhairc |
| `openrouter/google/gemini-embedding-001`       | 200  | baisc 2 → 2 | 3072    | Liostaithe in `GET /v1/embeddings`                   |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | baisc 2 → 2 | 1024    | Aitheantas canónach omni Jina                        |
| `jina/jina-embeddings-v5-omni-small`           | 200  | baisc 2 → 2 | 1024    | Ailias; is é `jina-ai/...` an `model` sa fhreagra    |
| `jina-embeddings-v5-omni-small`                | 200  | baisc 2 → 2 | 1024    | Réitítear an t-aitheantas lom freisin                |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Spás veicteora difriúil ó small                      |

Liostaigh `GET /v1/models` agus `GET /v1/embeddings`
`jina-ai/jina-embeddings-v5-omni-small` (1024) agus
`jina-ai/jina-embeddings-v5-omni-nano` (768) agus
`openrouter/google/gemini-embedding-001`. **Níor** liostaigh siad
`openrouter/google/gemini-embedding-2` cé go bhfuil an t-aitheantas sin á fhreastal cheana féin.

Ná measc nano (768-d) agus small (1024-d) in aon innéacs amháin. Ní féidir
iad a chur i gcomparáid lena chéile.

## Aitheantais bhriste / mhíthreoracha

### Gemini Embedding 2 dúchasach

Iarratas:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Iarbhír (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Filleann `gemini/gemini-embedding-2` an 400 céanna. Filleann `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` mura n-úsáideann nód saincheaptha
soláthraí an réimír `google`.

Ionchas: leabú dúchasach Gemini le heochair Google AI Studio ar an
soláthraí `gemini`, nó 400 a ainmníonn an t-aitheantas OpenRouter a oibríonn.

Atáirgeadh (folaigh an t-iompróir):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Ionadach a oibríonn:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Ní féidir le `gemini-embedding-2` dúchasach oibriú ó GitOps amháin. Ní mór eochair Google AI
Studio a chur leis mar nasc soláthraí `gemini` (an painéal nó
`GEMINI_API_KEY` arna hiompórtáil isteach in OmniRoute). Níl an rún sin sa stór seo.

### Conair ilmhódach Jina

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

Úsáid `POST /v1/embeddings` go dtí go mbeidh ailias ann.

### Oibiacht íomhá Jina / Memorix

Mír íomhá chanónach OmniRoute (PNG 28×28, 784 picteilín — diúltaíonn Jina do 1×1):

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

Iarbhír: HTTP **200**, 1 veicteoir, 1024-d.

Cruth dúchasach Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Iarbhír: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Tugann `{ "text": "..." }` measctha le `{ "image": "data:..." }` an 400 céanna.

## Nótaí cliaint

### Hindsight 0.9.1

Is téacs-amháin iad leabuithe Hindsight (`encode(list[str])`). Ní sheolann sé
oibiachtaí íomhá. Socraigh bun-URL leabuithe Hindsight atá comhoiriúnach le OpenAI chuig
OmniRoute `/v1` agus úsáid aitheantas a oibríonn ón tábla thuas
(`jina-ai/jina-embeddings-v5-omni-small` nó
`openrouter/google/gemini-embedding-2`). Ná socraigh an tsamhail mar
`gemini-embedding-2` lom mura bhfuil eochair API `gemini` ann ar an ngeata.

### Memorix 1.6.0

Ní dhéileálann Memorix ach le `baseUrl` a mheaitseálann `/jina\.ai/i` mar mheáin dhúchasacha. Fanann
URL OmniRoute ar an gconair téacs-amháin fiú nuair is Jina omni an tsamhail.
Fadhb leis an gcliant Memorix is ea an geata sin. Ar leithligh uaidh sin, diúltaíonn OmniRoute fós
don chorp Jina `{image: "data:..."}` a sheolfadh Memorix dá n-osclófaí an geata,
mar sin ní féidir le cliaint atá comhoiriúnach le Jina íomhánna a leabú trí OmniRoute
gan an scéimre chanónach `{type,source}`.

Úsáid `jina-ai/jina-embeddings-v5-omni-small` le haghaidh téacs. Ná treoraigh
`base_url` Memorix chuig `https://api.jina.ai` — coinnigh OmniRoute mar an t-aon léim amháin.
