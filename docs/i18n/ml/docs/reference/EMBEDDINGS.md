# Embeddings client runbook (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute, Hindsight 0.9.1-ന്റെ (ടെക്സ്റ്റ് മാത്രം പിന്തുണയ്ക്കുന്ന `encode(list[str])`) മുൻവശത്തും Memorix 1.6.0-ന്റെ (Jina മീഡിയ ഗേറ്റ്) മുൻവശത്തും പ്രവർത്തിക്കുമ്പോൾ `POST /v1/embeddings`-നുള്ള ഓപ്പറേറ്റർ കുറിപ്പുകൾ. OmniRoute 3.8.49-നെതിരെ `https://omniroute.jaguar-fish.ts.net/v1` എന്ന വിലാസത്തിൽ 2026-08-17-ന് തത്സമയം പരിശോധിച്ചുറപ്പിച്ചത്. താഴെ രഹസ്യങ്ങളൊന്നുമില്ല.

## പ്രവർത്തിക്കുന്ന മോഡൽ ഐഡികൾ

| ക്ലയന്റ് ഐഡി                                   | HTTP | വെക്റ്ററുകൾ  | അളവ്    | കുറിപ്പുകൾ                                               |
| ---------------------------------------------- | ---- | ------------ | ------- | -------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | ബാച്ച് 2 → 2 | 3072    | നേറ്റീവ് Gemini കീ ഇല്ലാതെയും പ്രവർത്തിക്കുന്നു          |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ബാച്ച് 2 → 2 | 3072    | പ്രിവ്യൂ അല്ലാത്ത ഐഡിയുടെ അതേ വെക്റ്റർ സ്പേസ്            |
| `openrouter/google/gemini-embedding-001`       | 200  | ബാച്ച് 2 → 2 | 3072    | `GET /v1/embeddings`-ൽ പട്ടികപ്പെടുത്തിയിരിക്കുന്നു      |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ബാച്ച് 2 → 2 | 1024    | കാനോനിക്കൽ Jina omni ഐഡി                                 |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ബാച്ച് 2 → 2 | 1024    | അപരനാമം; പ്രതികരണത്തിലെ `model` എന്നത് `jina-ai/...` ആണ് |
| `jina-embeddings-v5-omni-small`                | 200  | ബാച്ച് 2 → 2 | 1024    | പ്രിഫിക്സ് ഇല്ലാത്ത ഐഡിയും പരിഹരിക്കപ്പെടുന്നു           |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768** | small-ൽ നിന്ന് വ്യത്യസ്തമായ വെക്റ്റർ സ്പേസ്              |

`GET /v1/models`, `GET /v1/embeddings` എന്നിവ
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), കൂടാതെ
`openrouter/google/gemini-embedding-001` എന്നിവ പട്ടികപ്പെടുത്തി. എന്നാൽ
`openrouter/google/gemini-embedding-2` എന്ന ഐഡി ഇതിനകം സേവനം നൽകുന്നുണ്ടെങ്കിലും
അവ അത് പട്ടികപ്പെടുത്തിയില്ല.

nano (768-d), small (1024-d) എന്നിവ ഒരേ ഇൻഡക്സിൽ കലർത്തരുത്. അവ
താരതമ്യപ്പെടുത്താവുന്നവയല്ല.

## തകരാറുള്ള / തെറ്റിദ്ധരിപ്പിക്കുന്ന ഐഡികൾ

### നേറ്റീവ് Gemini Embedding 2

അഭ്യർത്ഥന:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

യഥാർത്ഥ ഫലം (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` ഇതേ 400 തിരികെ നൽകുന്നു. ഒരു കസ്റ്റം
പ്രൊവൈഡർ നോഡ് `google` പ്രിഫിക്സ് ഉപയോഗിക്കുന്നില്ലെങ്കിൽ
`google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google`
തിരികെ നൽകുന്നു.

പ്രതീക്ഷിക്കുന്നത്: `gemini` പ്രൊവൈഡറിൽ Google AI Studio കീ ഉപയോഗിച്ചുള്ള ഒരു
നേറ്റീവ് Gemini എംബെഡ്ഡിംഗ്, അല്ലെങ്കിൽ പ്രവർത്തിക്കുന്ന OpenRouter ഐഡിയുടെ പേര്
സൂചിപ്പിക്കുന്ന ഒരു 400.

പുനരാവർത്തിക്കൽ (ബെയറർ മറയ്ക്കുക):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

പ്രവർത്തിക്കുന്ന പകരം:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

നേറ്റീവ് `gemini-embedding-2`-ന് GitOps വഴി മാത്രം വിജയിക്കാനാവില്ല. ഒരു Google AI
Studio കീ `gemini` പ്രൊവൈഡർ കണക്ഷനായി ചേർക്കണം (ഡാഷ്ബോർഡ് വഴി അല്ലെങ്കിൽ
OmniRoute-ലേക്ക് ഇംപോർട്ട് ചെയ്ത `GEMINI_API_KEY` വഴി). ആ രഹസ്യം ഈ repo-യിൽ ഇല്ല.

### Jina മൾട്ടിമോഡൽ പാത

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

ഒരു അപരനാമം ലഭ്യമാകുന്നതുവരെ `POST /v1/embeddings` ഉപയോഗിക്കുക.

### Jina / Memorix ഇമേജ് ഒബ്ജക്റ്റ്

OmniRoute-ന്റെ കാനോനിക്കൽ ഇമേജ് ഇനം (28×28 PNG, 784 പിക്സലുകൾ — Jina 1×1
നിരസിക്കുന്നു):

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

യഥാർത്ഥ ഫലം: HTTP **200**, 1 വെക്റ്റർ, 1024-d.

Memorix 1.6.0 / Jina നേറ്റീവ് ഘടന:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

യഥാർത്ഥ ഫലം: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` എന്നത് `{ "image": "data:..." }` എന്നതിനൊപ്പം കലർത്തിയാലും
ഇതേ 400 ലഭിക്കും.

## ക്ലയന്റ് കുറിപ്പുകൾ

### Hindsight 0.9.1

Hindsight എംബെഡ്ഡിംഗുകൾ ടെക്സ്റ്റ് മാത്രം പിന്തുണയ്ക്കുന്നവയാണ്
(`encode(list[str])`). ഇത് ഇമേജ് ഒബ്ജക്റ്റുകൾ അയയ്ക്കുന്നില്ല. Hindsight-ന്റെ
OpenAI-അനുയോജ്യമായ എംബെഡ്ഡിംഗുകളുടെ ബേസ് URL, OmniRoute `/v1`-ലേക്ക്
സജ്ജീകരിച്ച് മുകളിലുള്ള പട്ടികയിൽനിന്ന് പ്രവർത്തിക്കുന്ന ഒരു ഐഡി
(`jina-ai/jina-embeddings-v5-omni-small` അല്ലെങ്കിൽ
`openrouter/google/gemini-embedding-2`) ഉപയോഗിക്കുക. ഗേറ്റ്വേയിൽ ഒരു `gemini`
API കീ ഇല്ലെങ്കിൽ മോഡൽ പ്രിഫിക്സ് ഇല്ലാത്ത `gemini-embedding-2` ആയി
സജ്ജീകരിക്കരുത്.

### Memorix 1.6.0

`baseUrl`, `/jina\.ai/i`-യുമായി പൊരുത്തപ്പെടുമ്പോൾ മാത്രമാണ് Memorix അതിനെ നേറ്റീവ്
മീഡിയയായി പരിഗണിക്കുന്നത്. മോഡൽ Jina omni ആണെങ്കിലും OmniRoute URL ടെക്സ്റ്റ്
മാത്രമുള്ള പാതയിൽ തന്നെ തുടരും. ആ ഗേറ്റ് ഒരു Memorix ക്ലയന്റ് പ്രശ്നമാണ്.
ഇതിൽനിന്ന് സ്വതന്ത്രമായി, ഗേറ്റ് തുറന്നാൽ Memorix അയയ്ക്കുമായിരുന്ന Jina
`{image: "data:..."}` ബോഡി OmniRoute ഇപ്പോഴും നിരസിക്കുന്നു. അതിനാൽ കാനോനിക്കൽ
`{type,source}` സ്കീമ ഇല്ലാതെ Jina-അനുയോജ്യമായ ക്ലയന്റുകൾക്ക് OmniRoute വഴി
ഇമേജുകൾ എംബെഡ് ചെയ്യാനാവില്ല.

ടെക്സ്റ്റിനായി `jina-ai/jina-embeddings-v5-omni-small` ഉപയോഗിക്കുക. Memorix-ന്റെ
`base_url`, `https://api.jina.ai`-ലേക്ക് സജ്ജീകരിക്കരുത് — OmniRoute-നെ മാത്രം
ഇടനില ഹോപ്പായി നിലനിർത്തുക.
