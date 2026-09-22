# Embeddings client runbook (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Poznámky pre operátorov k `POST /v1/embeddings`, keď OmniRoute stojí pred
Hindsight 0.9.1 (iba textové `encode(list[str])`) a Memorix 1.6.0 (brána médií
Jina). Overené v produkcii 2026-08-17 voči OmniRoute 3.8.49 na adrese
`https://omniroute.jaguar-fish.ts.net/v1`. Nižšie nie sú žiadne tajné údaje.

## Funkčné ID modelov

| ID klienta                                     | HTTP | Vektory     | Rozmer  | Poznámky                                           |
| ---------------------------------------------- | ---- | ----------- | ------- | -------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | dávka 2 → 2 | 3072    | Funguje bez natívneho kľúča Gemini                 |
| `openrouter/google/gemini-embedding-2-preview` | 200  | dávka 2 → 2 | 3072    | Rovnaký priestor ako ID bez prípony preview        |
| `openrouter/google/gemini-embedding-001`       | 200  | dávka 2 → 2 | 3072    | Uvedené v `GET /v1/embeddings`                     |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | dávka 2 → 2 | 1024    | Kanonické ID Jina omni                             |
| `jina/jina-embeddings-v5-omni-small`           | 200  | dávka 2 → 2 | 1024    | Alias; hodnota `model` v odpovedi je `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | dávka 2 → 2 | 1024    | Rozpozná sa aj samotné ID                          |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Iný vektorový priestor ako small                   |

`GET /v1/models` a `GET /v1/embeddings` uvádzali
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) a
`openrouter/google/gemini-embedding-001`. Neuvádzali
`openrouter/google/gemini-embedding-2`, hoci toto ID už funguje.

Nemiešajte nano (768 rozmerov) a small (1024 rozmerov) v jednom indexe. Nie sú
porovnateľné.

## Nefunkčné / zavádzajúce ID

### Natívny Gemini Embedding 2

Požiadavka:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Skutočný výsledok (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` vracia rovnakú chybu 400.
`google/gemini-embedding-2` vracia HTTP **400**
`Unknown embedding provider: google`, pokiaľ vlastný uzol poskytovateľa
nepoužíva predponu `google`.

Očakávané: buď natívne vloženie Gemini s kľúčom Google AI Studio u
poskytovateľa `gemini`, alebo chyba 400, ktorá uvedie funkčné ID OpenRouter.

Reprodukcia (zneviditeľnite bearer token):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Funkčná náhrada:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Natívny `gemini-embedding-2` nemôže fungovať iba prostredníctvom GitOps. Kľúč
Google AI Studio musí byť pridaný ako pripojenie poskytovateľa `gemini`
(cez riadiaci panel alebo importovaním `GEMINI_API_KEY` do OmniRoute). Tento
tajný údaj sa v tomto repozitári nenachádza.

### Multimodálna cesta Jina

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

Používajte `POST /v1/embeddings`, kým nebude existovať alias.

### Obrázkový objekt Jina / Memorix

Kanonická obrázková položka OmniRoute (PNG 28×28, 784 pixelov — Jina odmieta 1×1):

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

Skutočný výsledok: HTTP **200**, 1 vektor, 1024 rozmerov.

Natívny formát Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Skutočný výsledok: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Kombinácia `{ "text": "..." }` s `{ "image": "data:..." }` vedie k rovnakej
chybe 400.

## Poznámky ku klientom

### Hindsight 0.9.1

Vkladania Hindsight sú iba textové (`encode(list[str])`). Neposiela obrázkové
objekty. Nastavte základnú adresu URL pre vkladania kompatibilné s OpenAI
v Hindsight na OmniRoute `/v1` a použite funkčné ID z tabuľky vyššie
(`jina-ai/jina-embeddings-v5-omni-small` alebo
`openrouter/google/gemini-embedding-2`). Nenastavujte ako model samotné
`gemini-embedding-2`, pokiaľ sa na bráne nenachádza API kľúč `gemini`.

### Memorix 1.6.0

Memorix považuje za natívne médiá iba `baseUrl`, ktoré zodpovedá
`/jina\.ai/i`. Adresa URL OmniRoute zostáva na iba textovej ceste, aj keď je
model Jina omni. Táto brána je problémom klienta Memorix. Nezávisle od toho
OmniRoute naďalej odmieta telo Jina `{image: "data:..."}`, ktoré by Memorix
odoslal, keby sa brána otvorila, takže klienti kompatibilní s Jina nemôžu cez
OmniRoute vkladať obrázky bez kanonickej schémy `{type,source}`.

Pre text použite `jina-ai/jina-embeddings-v5-omni-small`. Nenastavujte
`base_url` v Memorix na `https://api.jina.ai` — zachovajte OmniRoute ako jediný
medzičlánok.
