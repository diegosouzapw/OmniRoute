# Embeddings client runbook (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Hinweise für Betreiber zu `POST /v1/embeddings`, wenn OmniRoute vor
Hindsight 0.9.1 (nur Text, `encode(list[str])`) und Memorix 1.6.0 (Jina-Medien-
Gate) geschaltet ist. Live verifiziert am 2026-08-17 mit OmniRoute 3.8.49 unter
`https://omniroute.jaguar-fish.ts.net/v1`. Nachfolgend keine Geheimnisse.

## Funktionierende Modell-IDs

| Client-ID                                      | HTTP | Vektoren    | Dimension | Hinweise                                         |
| ---------------------------------------------- | ---- | ----------- | --------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | Batch 2 → 2 | 3072      | Funktioniert ohne nativen Gemini-Schlüssel       |
| `openrouter/google/gemini-embedding-2-preview` | 200  | Batch 2 → 2 | 3072      | Derselbe Vektorraum wie bei der Nicht-Preview-ID |
| `openrouter/google/gemini-embedding-001`       | 200  | Batch 2 → 2 | 3072      | In `GET /v1/embeddings` aufgeführt               |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | Batch 2 → 2 | 1024      | Kanonische Jina-Omni-ID                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | Batch 2 → 2 | 1024      | Alias; `model` in der Antwort ist `jina-ai/...`  |
| `jina-embeddings-v5-omni-small`                | 200  | Batch 2 → 2 | 1024      | Auch die bloße ID wird aufgelöst                 |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768**   | Anderer Vektorraum als bei small                 |

`GET /v1/models` und `GET /v1/embeddings` führten
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) und
`openrouter/google/gemini-embedding-001` auf. Sie führten
`openrouter/google/gemini-embedding-2` **nicht** auf, obwohl diese ID bereits Anfragen verarbeitet.

Nano (768-dimensional) und small (1024-dimensional) dürfen nicht in einem Index
gemischt werden. Sie sind nicht vergleichbar.

## Defekte / irreführende IDs

### Natives Gemini Embedding 2

Anfrage:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Tatsächliches Ergebnis (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` gibt denselben 400-Fehler zurück. `google/gemini-embedding-2`
gibt HTTP **400** mit `Unknown embedding provider: google` zurück, sofern kein
benutzerdefinierter Provider-Knoten das Präfix `google` verwendet.

Erwartet: entweder ein natives Gemini-Embedding mit einem Google-AI-Studio-Schlüssel beim
Provider `gemini` oder ein 400-Fehler, der die funktionierende OpenRouter-ID nennt.

Reproduktion (Bearer-Token schwärzen):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Funktionierender Ersatz:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Das native `gemini-embedding-2` kann nicht allein über GitOps zum Funktionieren gebracht werden. Ein Google-AI-
Studio-Schlüssel muss als Provider-Verbindung vom Typ `gemini` hinzugefügt werden (Dashboard oder
in OmniRoute importierter `GEMINI_API_KEY`). Dieses Geheimnis befindet sich nicht in diesem Repository.

### Multimodaler Jina-Pfad

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

Verwenden Sie `POST /v1/embeddings`, bis ein Alias vorhanden ist.

### Jina-/Memorix-Bildobjekt

Kanonisches OmniRoute-Bildelement (28×28-PNG, 784 Pixel — Jina lehnt 1×1 ab):

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

Tatsächliches Ergebnis: HTTP **200**, 1 Vektor, 1024-dimensional.

Natives Format von Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Tatsächliches Ergebnis: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` gemischt mit `{ "image": "data:..." }` führt zum selben 400-Fehler.

## Hinweise zu Clients

### Hindsight 0.9.1

Hindsight-Embeddings unterstützen nur Text (`encode(list[str])`). Hindsight sendet keine
Bildobjekte. Richten Sie die OpenAI-kompatible Embeddings-Basis-URL von Hindsight auf
OmniRoute `/v1` und verwenden Sie eine funktionierende ID aus der obigen Tabelle
(`jina-ai/jina-embeddings-v5-omni-small` oder
`openrouter/google/gemini-embedding-2`). Setzen Sie das Modell nicht auf die bloße ID
`gemini-embedding-2`, sofern auf dem Gateway kein `gemini`-API-Schlüssel vorhanden ist.

### Memorix 1.6.0

Memorix behandelt nur eine mit `/jina\.ai/i` übereinstimmende `baseUrl` als native Medienquelle. Eine
OmniRoute-URL verbleibt auf dem Nur-Text-Pfad, selbst wenn das Modell Jina omni ist.
Dieses Gate ist ein Problem des Memorix-Clients. Unabhängig davon lehnt OmniRoute weiterhin
den Jina-Body `{image: "data:..."}` ab, den Memorix senden würde, wenn sich das Gate
öffnete. Daher können Jina-kompatible Clients ohne das kanonische Schema
`{type,source}` keine Bilder über OmniRoute einbetten.

Verwenden Sie `jina-ai/jina-embeddings-v5-omni-small` für Text. Richten Sie die Memorix-
`base_url` nicht auf `https://api.jina.ai` — behalten Sie OmniRoute als einzige Zwischenstation bei.
