# Embeddings client runbook (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Note pentru operatori privind `POST /v1/embeddings` atunci când OmniRoute se află în fața
Hindsight 0.9.1 (`encode(list[str])` doar pentru text) și Memorix 1.6.0 (filtrul media
Jina). Verificat în mediul live la 2026-08-17 cu OmniRoute 3.8.49 la
`https://omniroute.jaguar-fish.ts.net/v1`. Nu există secrete mai jos.

## ID-uri de modele funcționale

| ID client                                      | HTTP | Vectori   | Dim     | Note                                                 |
| ---------------------------------------------- | ---- | --------- | ------- | ---------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | lot 2 → 2 | 3072    | Funcționează fără o cheie Gemini nativă              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | lot 2 → 2 | 3072    | Același spațiu ca ID-ul fără preview                 |
| `openrouter/google/gemini-embedding-001`       | 200  | lot 2 → 2 | 3072    | Listat în `GET /v1/embeddings`                       |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | lot 2 → 2 | 1024    | ID-ul omni Jina canonic                              |
| `jina/jina-embeddings-v5-omni-small`           | 200  | lot 2 → 2 | 1024    | Alias; câmpul `model` din răspuns este `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | lot 2 → 2 | 1024    | Și ID-ul simplu este rezolvat                        |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | Spațiu vectorial diferit față de small               |

`GET /v1/models` și `GET /v1/embeddings` au listat
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) și
`openrouter/google/gemini-embedding-001`. Acestea **nu** au listat
`openrouter/google/gemini-embedding-2`, chiar dacă acel ID este deja deservit.

Nu combinați nano (768-d) și small (1024-d) în același index. Acestea nu sunt
comparabile.

## ID-uri nefuncționale / înșelătoare

### Gemini Embedding 2 nativ

Cerere:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Rezultat efectiv (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` returnează același 400. `google/gemini-embedding-2`
returnează HTTP **400** `Unknown embedding provider: google`, cu excepția cazului
în care un nod de furnizor personalizat utilizează prefixul `google`.

Rezultat așteptat: fie un embedding Gemini nativ, cu o cheie Google AI Studio pentru
furnizorul `gemini`, fie un răspuns 400 care indică ID-ul OpenRouter funcțional.

Reproducere (eliminați tokenul bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Alternativă funcțională:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Modelul nativ `gemini-embedding-2` nu poate funcționa doar prin GitOps. O cheie Google AI
Studio trebuie adăugată drept conexiune pentru furnizorul `gemini` (din panoul de control sau
prin importarea `GEMINI_API_KEY` în OmniRoute). Secretul respectiv nu se află în acest depozit.

### Calea multimodală Jina

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

Utilizați `POST /v1/embeddings` până când va exista un alias.

### Obiectul imagine Jina / Memorix

Elementul imagine canonic pentru OmniRoute (PNG 28×28, 784 de pixeli — Jina respinge imaginile 1×1):

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

Rezultat efectiv: HTTP **200**, 1 vector, 1024-d.

Formatul nativ Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Rezultat efectiv: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` combinat cu `{ "image": "data:..." }` produce același 400.

## Note pentru clienți

### Hindsight 0.9.1

Embeddingurile Hindsight sunt doar pentru text (`encode(list[str])`). Acesta nu trimite
obiecte imagine. Configurați URL-ul de bază pentru embeddinguri compatibile cu OpenAI din Hindsight
către OmniRoute `/v1` și utilizați un ID funcțional din tabelul de mai sus
(`jina-ai/jina-embeddings-v5-omni-small` sau
`openrouter/google/gemini-embedding-2`). Nu setați modelul la ID-ul simplu
`gemini-embedding-2` decât dacă există o cheie API `gemini` în gateway.

### Memorix 1.6.0

Memorix tratează drept media nativă numai un `baseUrl` care corespunde expresiei `/jina\.ai/i`. Un
URL OmniRoute rămâne pe calea exclusiv pentru text, chiar și atunci când modelul este Jina omni.
Acest filtru este o problemă a clientului Memorix. Independent de aceasta, OmniRoute respinge în continuare
corpul Jina `{image: "data:..."}` pe care Memorix l-ar trimite dacă filtrul
ar permite acest lucru, astfel încât clienții compatibili cu Jina nu pot genera embeddinguri pentru imagini prin OmniRoute
fără schema canonică `{type,source}`.

Utilizați `jina-ai/jina-embeddings-v5-omni-small` pentru text. Nu configurați
`base_url` din Memorix către `https://api.jina.ai` — păstrați OmniRoute drept singurul intermediar.
