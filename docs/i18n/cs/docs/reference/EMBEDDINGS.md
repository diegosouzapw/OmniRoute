# Embeddings client runbook (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Poznámky pro operátory k `POST /v1/embeddings`, když OmniRoute stojí před
Hindsight 0.9.1 (pouze textové `encode(list[str])`) a Memorix 1.6.0 (brána médií
Jina). Ověřeno v živém provozu 2026-08-17 proti OmniRoute 3.8.49 na adrese
`https://omniroute.jaguar-fish.ts.net/v1`. Níže nejsou žádné tajné údaje.

## Funkční ID modelů

| ID klienta                                     | HTTP | Vektory     | Rozměr  | Poznámky                                             |
| ---------------------------------------------- | ---- | ----------- | ------- | ---------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | dávka 2 → 2 | 3072    | Funguje bez nativního klíče Gemini                   |
| `openrouter/google/gemini-embedding-2-preview` | 200  | dávka 2 → 2 | 3072    | Stejný vektorový prostor jako ID bez přípony preview |
| `openrouter/google/gemini-embedding-001`       | 200  | dávka 2 → 2 | 3072    | Uvedeno v `GET /v1/embeddings`                       |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | dávka 2 → 2 | 1024    | Kanonické omni ID Jina                               |
| `jina/jina-embeddings-v5-omni-small`           | 200  | dávka 2 → 2 | 1024    | Alias; hodnota `model` v odpovědi je `jina-ai/...`   |
| `jina-embeddings-v5-omni-small`                | 200  | dávka 2 → 2 | 1024    | Funguje také samotné ID                              |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Jiný vektorový prostor než small                     |

`GET /v1/models` a `GET /v1/embeddings` uváděly
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) a
`openrouter/google/gemini-embedding-001`. Neuváděly
`openrouter/google/gemini-embedding-2`, přestože toto ID již požadavky obsluhuje.

Nekombinujte nano (768 rozměrů) a small (1024 rozměrů) v jednom indexu. Nejsou
vzájemně porovnatelné.

## Nefunkční / zavádějící ID

### Nativní Gemini Embedding 2

Požadavek:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Skutečný výsledek (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` vrací stejnou chybu 400.
`google/gemini-embedding-2` vrací HTTP **400** `Unknown embedding provider: google`,
pokud vlastní uzel poskytovatele nepoužívá prefix `google`.

Očekávané chování: buď nativní Gemini embedding s klíčem Google AI Studio
u poskytovatele `gemini`, nebo chyba 400 uvádějící funkční ID OpenRouter.

Reprodukce (údaj bearer redigujte):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Funkční náhrada:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Nativní `gemini-embedding-2` nemůže fungovat pouze prostřednictvím GitOps. Klíč
Google AI Studio musí být přidán jako připojení poskytovatele `gemini` (na řídicím
panelu nebo importem `GEMINI_API_KEY` do OmniRoute). Tento tajný údaj není
v tomto repozitáři.

### Multimodální cesta Jina

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

Dokud nebude existovat alias, používejte `POST /v1/embeddings`.

### Objekt obrázku Jina / Memorix

Kanonická položka obrázku OmniRoute (PNG 28×28, 784 pixelů — Jina odmítá 1×1):

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

Skutečný výsledek: HTTP **200**, 1 vektor, 1024 rozměrů.

Nativní formát Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Skutečný výsledek: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Kombinace `{ "text": "..." }` s `{ "image": "data:..." }` vede ke stejné chybě 400.

## Poznámky ke klientům

### Hindsight 0.9.1

Embeddingy Hindsight jsou pouze textové (`encode(list[str])`). Hindsight
neodesílá objekty obrázků. Nastavte základní URL pro embeddingy kompatibilní
s OpenAI v Hindsight na `/v1` služby OmniRoute a použijte funkční ID z tabulky
výše (`jina-ai/jina-embeddings-v5-omni-small` nebo
`openrouter/google/gemini-embedding-2`). Nenastavujte model na samotné
`gemini-embedding-2`, pokud na bráně neexistuje API klíč pro `gemini`.

### Memorix 1.6.0

Memorix považuje za nativní média pouze `baseUrl` odpovídající
`/jina\.ai/i`. URL služby OmniRoute zůstává na cestě určené pouze pro text,
i když je modelem Jina omni. Tato brána je problémem klienta Memorix. Nezávisle
na tom OmniRoute stále odmítá tělo Jina `{image: "data:..."}`, které by Memorix
odeslal, pokud by se brána otevřela. Klienti kompatibilní s Jina proto nemohou
prostřednictvím OmniRoute vytvářet embeddingy obrázků bez kanonického schématu
`{type,source}`.

Pro text používejte `jina-ai/jina-embeddings-v5-omni-small`. Nenastavujte
`base_url` klienta Memorix na `https://api.jina.ai` — ponechte OmniRoute jako
jediný mezilehlý bod.
