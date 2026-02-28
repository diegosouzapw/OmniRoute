# Referință API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Referință completă pentru toate punctele finale API OmniRoute.

---

## Cuprins

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

## Finalizări de chat

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

### Anteturi personalizate

| Antet                    | Direcție | Descriere                                       |
| ------------------------ | -------- | ----------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Cerere   | Setați la `true` pentru a ocoli memoria cache   |
| `X-OmniRoute-Progress`   | Cerere   | Setați la `true` pentru evenimentele de progres |
| `Idempotency-Key`        | Cerere   | Tasta Dedup (fereastră 5s)                      |
| `X-Request-Id`           | Cerere   | Cheie alternativă de deducție                   |
| `X-OmniRoute-Cache`      | Răspuns  | `HIT` sau `MISS` (non-streaming)                |
| `X-OmniRoute-Idempotent` | Răspuns  | `true` dacă este deduplicat                     |
| `X-OmniRoute-Progress`   | Răspuns  | `enabled` dacă urmărirea progresului pe         |

---

## Înglobări

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Furnizori disponibili: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Generare de imagini

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

Furnizori disponibili: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Listează modele

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Puncte finale de compatibilitate

| Metoda | Calea                       | Format                   |
| ------ | --------------------------- | ------------------------ |
| POST   | `/v1/chat/completions`      | OpenAI                   |
| POST   | `/v1/messages`              | antropic                 |
| POST   | `/v1/responses`             | Răspunsuri OpenAI        |
| POST   | `/v1/embeddings`            | OpenAI                   |
| POST   | `/v1/images/generations`    | OpenAI                   |
| GET    | `/v1/models`                | OpenAI                   |
| POST   | `/v1/messages/count_tokens` | antropic                 |
| GET    | `/v1beta/models`            | Gemeni                   |
| POST   | `/v1beta/models/{...path}`  | Gemeni genereazăConținut |
| POST   | `/v1/api/chat`              | Ollama                   |

### Rute de furnizori dedicate

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Prefixul furnizorului este adăugat automat dacă lipsește. Modelele nepotrivite revin `400`.

---

## Cache semantic

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Exemplu de răspuns:

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

## Tabloul de bord și managementul

### Autentificare

| Punct final                   | Metoda  | Descriere                       |
| ----------------------------- | ------- | ------------------------------- |
| `/api/auth/login`             | POST    | Autentificare                   |
| `/api/auth/logout`            | POST    | Deconectare                     |
| `/api/settings/require-login` | GET/PUT | Comutare autentificare necesară |

### Managementul furnizorilor

| Punct final                  | Metoda          | Descriere                          |
| ---------------------------- | --------------- | ---------------------------------- |
| `/api/providers`             | GET/POST        | Listează / creează furnizori       |
| `/api/providers/[id]`        | GET/PUT/DELETE  | Gestionați un furnizor             |
| `/api/providers/[id]/test`   | POST            | Testează conexiunea furnizorului   |
| `/api/providers/[id]/models` | GET             | Listați modele de furnizori        |
| `/api/providers/validate`    | POST            | Validați configurația furnizorului |
| `/api/provider-nodes*`       | Diverse         | Gestionarea nodurilor furnizorului |
| `/api/provider-models`       | GET/POST/DELETE | Modele personalizate               |

### Fluxuri OAuth

| Punct final                      | Metoda  | Descriere                   |
| -------------------------------- | ------- | --------------------------- |
| `/api/oauth/[provider]/[action]` | Diverse | OAuth specific furnizorului |

### Rutare și configurare

| Punct final           | Metoda   | Descriere                          |
| --------------------- | -------- | ---------------------------------- |
| `/api/models/alias`   | GET/POST | Aliasuri de model                  |
| `/api/models/catalog` | GET      | Toate modelele după furnizor + tip |
| `/api/combos*`        | Diverse  | Combo management                   |
| `/api/keys*`          | Diverse  | Gestionarea cheilor API            |
| `/api/pricing`        | GET      | Prețul modelului                   |

### Utilizare și analiză

| Punct final                 | Metoda | Descriere                    |
| --------------------------- | ------ | ---------------------------- |
| `/api/usage/history`        | GET    | Istoricul utilizării         |
| `/api/usage/logs`           | GET    | Jurnalele de utilizare       |
| `/api/usage/request-logs`   | GET    | Jurnalele la nivel de cerere |
| `/api/usage/[connectionId]` | GET    | Utilizare per conexiune      |

### Setări

| Punct final                     | Metoda  | Descriere                      |
| ------------------------------- | ------- | ------------------------------ |
| `/api/settings`                 | GET/PUT | Setări generale                |
| `/api/settings/proxy`           | GET/PUT | Configurare proxy de rețea     |
| `/api/settings/proxy/test`      | POST    | Testați conexiunea proxy       |
| `/api/settings/ip-filter`       | GET/PUT | Lista IP permisă/lista blocată |
| `/api/settings/thinking-budget` | GET/PUT | Bugetul simbol de raționament  |
| `/api/settings/system-prompt`   | GET/PUT | Sistem global prompt           |

### Monitorizare

| Punct final              | Metoda     | Descriere                  |
| ------------------------ | ---------- | -------------------------- |
| `/api/sessions`          | GET        | Urmărire activă a sesiunii |
| `/api/rate-limits`       | GET        | Limitele ratei per cont    |
| `/api/monitoring/health` | GET        | Verificarea sănătății      |
| `/api/cache`             | GET/DELETE | Cache stats / clear        |

### Backup & Export/Import

| Punct final                 | Metoda | Descriere                                                |
| --------------------------- | ------ | -------------------------------------------------------- |
| `/api/db-backups`           | GET    | Listează copiile de rezervă disponibile                  |
| `/api/db-backups`           | PUNE   | Creați o copie de rezervă manuală                        |
| `/api/db-backups`           | POST   | Restaurare dintr-o anumită copie de rezervă              |
| `/api/db-backups/export`    | GET    | Descărcați baza de date ca fișier .sqlite                |
| `/api/db-backups/import`    | POST   | Încărcați fișierul .sqlite pentru a înlocui baza de date |
| `/api/db-backups/exportAll` | GET    | Descărcați backup complet ca arhivă .tar.gz              |

### Cloud Sync

| Punct final            | Metoda  | Descriere                           |
| ---------------------- | ------- | ----------------------------------- |
| `/api/sync/cloud`      | Diverse | Operațiuni de sincronizare în cloud |
| `/api/sync/initialize` | POST    | Inițializați sincronizarea          |
| `/api/cloud/*`         | Diverse | Management cloud                    |

### Instrumente CLI

| Punct final                        | Metoda | Descriere                  |
| ---------------------------------- | ------ | -------------------------- |
| `/api/cli-tools/claude-settings`   | GET    | Starea Claude CLI          |
| `/api/cli-tools/codex-settings`    | GET    | Status CLI Codex           |
| `/api/cli-tools/droid-settings`    | GET    | Stare CLI Droid            |
| `/api/cli-tools/openclaw-settings` | GET    | Stare CLI OpenClaw         |
| `/api/cli-tools/runtime/[toolId]`  | GET    | Timp de rulare CLI generic |

Răspunsurile CLI includ: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Reziliență și limite de rată

| Punct final             | Metoda  | Descriere                                   |
| ----------------------- | ------- | ------------------------------------------- |
| `/api/resilience`       | GET/PUT | Obține/actualizează profiluri de rezistență |
| `/api/resilience/reset` | POST    | Resetați întrerupătoarele                   |
| `/api/rate-limits`      | GET     | Starea limitei ratei per cont               |
| `/api/rate-limit`       | GET     | Configurație globală a limitei ratei        |

### Evaluări

| Punct final  | Metoda   | Descriere                                      |
| ------------ | -------- | ---------------------------------------------- |
| `/api/evals` | GET/POST | Lista suitelor de evaluare / evaluarea rulării |

### Politici

| Punct final     | Metoda          | Descriere                       |
| --------------- | --------------- | ------------------------------- |
| `/api/policies` | GET/POST/DELETE | Gestionați politicile de rutare |

### Conformitate

| Punct final                 | Metoda | Descriere                                   |
| --------------------------- | ------ | ------------------------------------------- |
| `/api/compliance/audit-log` | GET    | Jurnal de audit de conformitate (ultimul N) |

### v1beta (compatibil cu Gemini)

| Punct final                | Metoda | Descriere                            |
| -------------------------- | ------ | ------------------------------------ |
| `/v1beta/models`           | GET    | Listează modele în format Gemeni     |
| `/v1beta/models/{...path}` | POST   | Punct final Gemeni `generateContent` |

Aceste puncte finale reflectă formatul API al Gemini pentru clienții care se așteaptă la compatibilitate nativă cu SDK Gemini.

### API-uri interne/de sistem

| Punct final     | Metoda | Descriere                                                        |
| --------------- | ------ | ---------------------------------------------------------------- |
| `/api/init`     | GET    | Verificarea inițializării aplicației (utilizată la prima rulare) |
| `/api/tags`     | GET    | Etichete de model compatibile cu Ollama (pentru clienții Ollama) |
| `/api/restart`  | POST   | Declanșează repornirea grațioasă a serverului                    |
| `/api/shutdown` | POST   | Declanșează închiderea grațioasă a serverului                    |

> **Notă:** Aceste puncte finale sunt utilizate intern de sistem sau pentru compatibilitatea clientului Ollama. De obicei, acestea nu sunt apelate de utilizatorii finali.

---

## Transcriere audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transcrie fișiere audio folosind Deepgram sau AssemblyAI.

**Solicitare:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Răspuns:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Furnizori acceptați:** `deepgram/nova-3`, `assemblyai/best`.

**Formate acceptate:** `mp3`, `wav`, `m4a`, `flac`, `ogg`,

---

## Compatibilitate Ollama

Pentru clienții care folosesc formatul API al Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Cererile sunt traduse automat între Ollama și formatele interne.

---

## Telemetrie

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Răspuns:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Buget

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

## Disponibilitatea modelului

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

## Procesarea cererii

1. Clientul trimite cererea către `/v1/*`
2. Apelurile de gestionare a rutei `handleChat`, `handleEmbedding`, `handleAudioTranscription` sau `handleImageGeneration`
3. Modelul este rezolvat (furnizor direct/model sau alias/combo)
4. Acreditări selectate din DB local cu filtrarea disponibilității contului
5. Pentru chat: `handleChatCore` — detectarea formatului, traducerea, verificarea memoriei cache, verificarea idempotității
6. Executorul furnizorului trimite cererea în amonte
7. Răspunsul tradus înapoi în formatul client (chat) sau returnat așa cum este (încorporare/imagini/audio)
8. Utilizare/înregistrare înregistrată
9. Fallback se aplică erorilor conform regulilor combinate

Referință completă a arhitecturii: [link](ARCHITECTURE.md)

---

## Autentificare

- Rutele tabloului de bord (`/dashboard/*`) folosesc `auth_token` cookie
- Conectarea folosește hash-ul parolei salvate; alternativă la `INITIAL_PASSWORD`
- `requireLogin` comutabil prin `/api/settings/require-login`
- Rutele `/v1/*` necesită opțional cheia API Bearer când `REQUIRE_API_KEY=true`
