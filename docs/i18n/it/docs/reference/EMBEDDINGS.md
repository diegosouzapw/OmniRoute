# Embeddings client runbook (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Note operative per `POST /v1/embeddings` quando OmniRoute si trova davanti a
Hindsight 0.9.1 (`encode(list[str])` solo testo) e Memorix 1.6.0 (controllo dei
contenuti multimediali Jina). Verificato dal vivo il 2026-08-17 con OmniRoute 3.8.49 su
`https://omniroute.jaguar-fish.ts.net/v1`. Nessun segreto riportato di seguito.

## ID modello funzionanti

| ID client                                      | HTTP | Vettori     | Dim     | Note                                                   |
| ---------------------------------------------- | ---- | ----------- | ------- | ------------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Funziona senza una chiave Gemini nativa                |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Stesso spazio dell'ID non preview                      |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Elencato in `GET /v1/embeddings`                       |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | ID omni Jina canonico                                  |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; il campo `model` della risposta è `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | Anche l'ID senza prefisso viene risolto                |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Spazio vettoriale diverso da small                     |

`GET /v1/models` e `GET /v1/embeddings` elencavano
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) e
`openrouter/google/gemini-embedding-001`. **Non** elencavano
`openrouter/google/gemini-embedding-2`, anche se tale ID è già utilizzabile.

Non mescolare nano (768 dimensioni) e small (1024 dimensioni) nello stesso indice. Non sono
confrontabili.

## ID non funzionanti / fuorvianti

### Gemini Embedding 2 nativo

Richiesta:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Risultato effettivo (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` restituisce lo stesso errore 400. `google/gemini-embedding-2`
restituisce HTTP **400** `Unknown embedding provider: google`, a meno che un nodo provider
personalizzato non utilizzi il prefisso `google`.

Risultato atteso: un embedding Gemini nativo con una chiave Google AI Studio sul
provider `gemini`, oppure un errore 400 che indichi l'ID OpenRouter funzionante.

Riproduzione (oscurare il bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Alternativa funzionante:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Il modello nativo `gemini-embedding-2` non può funzionare esclusivamente tramite GitOps. È necessario
aggiungere una chiave Google AI Studio come connessione al provider `gemini` (tramite dashboard oppure
importando `GEMINI_API_KEY` in OmniRoute). Tale segreto non è presente in questo repository.

### Percorso multimodale Jina

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

Utilizzare `POST /v1/embeddings` finché non sarà disponibile un alias.

### Oggetto immagine Jina / Memorix

Elemento immagine canonico di OmniRoute (PNG 28×28, 784 pixel — Jina rifiuta le immagini 1×1):

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

Risultato effettivo: HTTP **200**, 1 vettore, 1024 dimensioni.

Formato nativo di Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Risultato effettivo: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Anche `{ "text": "..." }` combinato con `{ "image": "data:..." }` restituisce lo stesso errore 400.

## Note sui client

### Hindsight 0.9.1

Gli embedding di Hindsight supportano solo testo (`encode(list[str])`). Non invia
oggetti immagine. Impostare l'URL di base degli embedding compatibile con OpenAI di Hindsight su
OmniRoute `/v1` e utilizzare un ID funzionante della tabella precedente
(`jina-ai/jina-embeddings-v5-omni-small` oppure
`openrouter/google/gemini-embedding-2`). Non impostare il modello semplicemente su
`gemini-embedding-2`, a meno che sul gateway non sia presente una chiave API `gemini`.

### Memorix 1.6.0

Memorix tratta come contenuti multimediali nativi solo i `baseUrl` che corrispondono a `/jina\.ai/i`. Un
URL OmniRoute rimane sul percorso di solo testo anche quando il modello è Jina omni.
Tale controllo è un problema del client Memorix. Indipendentemente da ciò, OmniRoute rifiuta comunque
il corpo Jina `{image: "data:..."}` che Memorix invierebbe se il controllo
desse esito positivo; pertanto, i client compatibili con Jina non possono incorporare immagini tramite OmniRoute
senza lo schema canonico `{type,source}`.

Utilizzare `jina-ai/jina-embeddings-v5-omni-small` per il testo. Non impostare il
`base_url` di Memorix su `https://api.jina.ai`: mantenere OmniRoute come unico passaggio.
