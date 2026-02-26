# API-referencia

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Teljes referencia az összes OmniRoute API-végponthoz.

---

## Tartalomjegyzék

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Csevegés befejezése

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Egyéni fejlécek

| Fejléc                   | Irány  | Leírás                                               |
| ------------------------ | ------ | ---------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Kérés  | Állítsa `true` értékre a gyorsítótár megkerüléséhez  |
| `X-OmniRoute-Progress`   | Kérés  | Állítsa `true` értékre az előrehaladási eseményekhez |
| `Idempotency-Key`        | Kérés  | Dedup kulcs (5s ablak)                               |
| `X-Request-Id`           | Kérés  | Alternatív dedup kulcs                               |
| `X-OmniRoute-Cache`      | Válasz | `HIT` vagy `MISS` (nem adatfolyam)                   |
| `X-OmniRoute-Idempotent` | Válasz | `true`, ha deduplikált                               |
| `X-OmniRoute-Progress`   | Válasz | `enabled` ha a haladás követése a                    |

---

## Beágyazások

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Elérhető szolgáltatók: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Képgenerálás

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Elérhető szolgáltatók: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Modellek listázása

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Kompatibilitási végpontok

| Módszer | Útvonal                     | Formátum                 |
| ------- | --------------------------- | ------------------------ |
| POST    | `/v1/chat/completions`      | OpenAI                   |
| POST    | `/v1/messages`              | Antropikus               |
| POST    | `/v1/responses`             | OpenAI válaszok          |
| POST    | `/v1/embeddings`            | OpenAI                   |
| POST    | `/v1/images/generations`    | OpenAI                   |
| GET     | `/v1/models`                | OpenAI                   |
| POST    | `/v1/messages/count_tokens` | Antropikus               |
| GET     | `/v1beta/models`            | Ikrek                    |
| POST    | `/v1beta/models/{...path}`  | Gemini GenerationContent |
| POST    | `/v1/api/chat`              | Ollama                   |

### Dedikált szolgáltatói útvonalak

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

A szolgáltató előtagja automatikusan hozzáadódik, ha hiányzik. A nem egyező modellek a következőt adják vissza: `400`.

---

## Szemantikus gyorsítótár

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Válasz példa:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Irányítópult és kezelés

### Hitelesítés

| Végpont                       | Módszer | Leírás                  |
| ----------------------------- | ------- | ----------------------- |
| `/api/auth/login`             | POST    | Bejelentkezés           |
| `/api/auth/logout`            | POST    | Kijelentkezés           |
| `/api/settings/require-login` | GET/PUT | Bejelentkezés szükséges |

### Szolgáltatói menedzsment

| Végpont                      | Módszer         | Leírás                                      |
| ---------------------------- | --------------- | ------------------------------------------- |
| `/api/providers`             | GET/POST        | Szolgáltatók listázása/létrehozása          |
| `/api/providers/[id]`        | GET/PUT/DELETE  | Szolgáltató kezelése                        |
| `/api/providers/[id]/test`   | POST            | Szolgáltatói kapcsolat tesztelése           |
| `/api/providers/[id]/models` | GET             | Szolgáltatói modellek listázása             |
| `/api/providers/validate`    | POST            | A szolgáltató konfigurációjának ellenőrzése |
| `/api/provider-nodes*`       | Különféle       | Szolgáltatói csomópontok kezelése           |
| `/api/provider-models`       | GET/POST/DELETE | Egyedi modellek                             |

### OAuth-folyamatok

| Végpont                          | Módszer   | Leírás                       |
| -------------------------------- | --------- | ---------------------------- |
| `/api/oauth/[provider]/[action]` | Különféle | Szolgáltató-specifikus OAuth |

### Routing & Config

| Végpont               | Módszer   | Leírás                                    |
| --------------------- | --------- | ----------------------------------------- |
| `/api/models/alias`   | GET/POST  | Modell álnevek                            |
| `/api/models/catalog` | GET       | Minden modell szolgáltató + típus szerint |
| `/api/combos*`        | Különféle | Kombinált menedzsment                     |
| `/api/keys*`          | Különféle | API-kulcskezelés                          |
| `/api/pricing`        | GET       | Modell árképzés                           |

### Használat és elemzések

| Végpont                     | Módszer | Leírás                     |
| --------------------------- | ------- | -------------------------- |
| `/api/usage/history`        | GET     | Használati előzmények      |
| `/api/usage/logs`           | GET     | Használati naplók          |
| `/api/usage/request-logs`   | GET     | Kérelem szintű naplók      |
| `/api/usage/[connectionId]` | GET     | Kapcsolatonkénti használat |

### Beállítások

| Végpont                         | Módszer | Leírás                               |
| ------------------------------- | ------- | ------------------------------------ |
| `/api/settings`                 | GET/PUT | Általános beállítások                |
| `/api/settings/proxy`           | GET/PUT | Hálózati proxy konfiguráció          |
| `/api/settings/proxy/test`      | POST    | Proxy kapcsolat tesztelése           |
| `/api/settings/ip-filter`       | GET/PUT | IP engedélyezési lista/blokkolólista |
| `/api/settings/thinking-budget` | GET/PUT | Indoklási jelképes költségvetés      |
| `/api/settings/system-prompt`   | GET/PUT | Globális rendszerkérdés              |

### Monitoring

| Végpont                  | Módszer    | Leírás                           |
| ------------------------ | ---------- | -------------------------------- |
| `/api/sessions`          | GET        | Aktív munkamenet-követés         |
| `/api/rate-limits`       | GET        | Számlánkénti kamatkorlátok       |
| `/api/monitoring/health` | GET        | állapotfelmérés                  |
| `/api/cache`             | GET/DELETE | Gyorsítótár statisztika / törlés |

### Biztonsági mentés és exportálás/importálás

| Végpont                     | Módszer | Leírás                                                     |
| --------------------------- | ------- | ---------------------------------------------------------- |
| `/api/db-backups`           | GET     | Az elérhető biztonsági másolatok listája                   |
| `/api/db-backups`           | PUT     | Kézi biztonsági mentés létrehozása                         |
| `/api/db-backups`           | POST    | Visszaállítás egy adott biztonsági másolatból              |
| `/api/db-backups/export`    | GET     | Adatbázis letöltése .sqlite fájlként                       |
| `/api/db-backups/import`    | POST    | Töltse fel az .sqlite fájlt az adatbázis                   |
| `/api/db-backups/exportAll` | GET     | A teljes biztonsági másolat letöltése .tar.gz archívumként |

### Cloud Sync

| Végpont                | Módszer   | Leírás                          |
| ---------------------- | --------- | ------------------------------- |
| `/api/sync/cloud`      | Különféle | Felhő szinkronizálási műveletek |
| `/api/sync/initialize` | POST      | Szinkronizálás inicializálása   |
| `/api/cloud/*`         | Különféle | Felhőkezelés                    |

### CLI eszközök

| Végpont                            | Módszer | Leírás                   |
| ---------------------------------- | ------- | ------------------------ |
| `/api/cli-tools/claude-settings`   | GET     | Claude CLI állapota      |
| `/api/cli-tools/codex-settings`    | GET     | Codex CLI állapota       |
| `/api/cli-tools/droid-settings`    | GET     | Droid CLI állapot        |
| `/api/cli-tools/openclaw-settings` | GET     | OpenClaw CLI állapota    |
| `/api/cli-tools/runtime/[toolId]`  | GET     | Általános CLI futásidejű |

A CLI-válaszok a következők: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Rugalmassági és sebességi korlátok

| Végpont                 | Módszer | Leírás                                      |
| ----------------------- | ------- | ------------------------------------------- |
| `/api/resilience`       | GET/PUT | Rugalmassági profilok beszerzése/frissítése |
| `/api/resilience/reset` | POST    | Megszakítók visszaállítása                  |
| `/api/rate-limits`      | GET     | számlánkénti kamatláb korlát állapota       |
| `/api/rate-limit`       | GET     | Globális díjkorlát konfiguráció             |

### Evals

| Végpont      | Módszer  | Leírás                                       |
| ------------ | -------- | -------------------------------------------- |
| `/api/evals` | GET/POST | Eval suites listázás / kiértékelés futtatása |

### Irányelvek

| Végpont         | Módszer         | Leírás                           |
| --------------- | --------------- | -------------------------------- |
| `/api/policies` | GET/POST/DELETE | Útválasztási házirendek kezelése |

### Megfelelés

| Végpont                     | Módszer | Leírás                                     |
| --------------------------- | ------- | ------------------------------------------ |
| `/api/compliance/audit-log` | GET     | Megfelelőségi ellenőrzési napló (utolsó N) |

### v1beta (Gemini-kompatibilis)

| Végpont                    | Módszer | Leírás                              |
| -------------------------- | ------- | ----------------------------------- |
| `/v1beta/models`           | GET     | Modellek listája Gemini formátumban |
| `/v1beta/models/{...path}` | POST    | Gemini `generateContent` végpont    |

Ezek a végpontok tükrözik a Gemini API-formátumát azon ügyfelek számára, akik natív Gemini SDK-kompatibilitást várnak el.

### Belső / Rendszer API-k

| Végpont         | Módszer | Leírás                                                            |
| --------------- | ------- | ----------------------------------------------------------------- |
| `/api/init`     | GET     | Alkalmazás inicializálási ellenőrzése (első futtatáskor használt) |
| `/api/tags`     | GET     | Ollama-kompatibilis modellcímkék (Ollama ügyfelek számára)        |
| `/api/restart`  | POST    | A kiszolgáló kecses újraindításának elindítása                    |
| `/api/shutdown` | POST    | A kiszolgáló kecses leállításának elindítása                      |

> **Megjegyzés:** Ezeket a végpontokat a rendszer belsőleg vagy az Ollama kliens kompatibilitás érdekében használja. Általában nem hívják a végfelhasználók.

---

## Hang átírása

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Írja át a hangfájlokat a Deepgram vagy az AssemblyAI segítségével.

**Kérés:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Válasz:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Támogatott szolgáltatók:** `deepgram/nova-3`, `assemblyai/best`.

**Támogatott formátumok:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, \_\_\_OMNI1_2.K.

---

## Ollama kompatibilitás

Az Ollama API formátumát használó ügyfelek számára:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

A kéréseket a rendszer automatikusan lefordítja az Ollama és a belső formátumok között.

---

## Telemetria

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Válasz:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Költségvetés

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## A modell elérhetősége

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Kérelem feldolgozása

1. Az ügyfél kérelmet küld a következő címre: `/v1/*`
2. Az útvonalkezelő hívások: `handleChat`, `handleEmbedding`, `handleAudioTranscription` vagy `handleImageGeneration`
3. A modell feloldva (közvetlen szolgáltató/modell vagy álnév/kombináció)
4. A helyi adatbázisból kiválasztott hitelesítő adatok fiók elérhetőségi szűréssel
5. Csevegés esetén: `handleChatCore` — formátumészlelés, fordítás, gyorsítótár ellenőrzés, idempotencia ellenőrzés
6. A szolgáltató végrehajtója upstream kérést küld
7. A válasz visszafordítva ügyfélformátumra (csevegés) vagy visszaküldve (beágyazások/képek/audio)
8. Használat/naplózás rögzítve
9. A hibákra a tartalék a kombinált szabályok szerint érvényes

Teljes architektúra hivatkozás: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Hitelesítés

- Az irányítópult útvonalai (`/dashboard/*`) `auth_token` cookie-t használnak
- A bejelentkezés elmentett jelszókivonatot használ; vissza a `INITIAL_PASSWORD`
- `requireLogin` átkapcsolható a következőn keresztül: `/api/settings/require-login`
- A `/v1/*` útvonalak opcionálisan megkövetelik a Bearer API kulcsot, amikor `REQUIRE_API_KEY=true`
