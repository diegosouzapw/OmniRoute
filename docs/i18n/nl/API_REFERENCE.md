# API-referentie

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Volledige referentie voor alle OmniRoute API-eindpunten.

---

## Inhoudsopgave

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

## Chat-voltooiingen

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

### Aangepaste kopteksten

| Kop                      | Richting | Beschrijving                                      |
| ------------------------ | -------- | ------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Verzoek  | Stel in op `true` om cache te omzeilen            |
| `X-OmniRoute-Progress`   | Verzoek  | Ingesteld op `true` voor voortgangsgebeurtenissen |
| `Idempotency-Key`        | Verzoek  | Ontdubbelingssleutel (5s-venster)                 |
| `X-Request-Id`           | Verzoek  | Alternatieve ontdubbelsleutel                     |
| `X-OmniRoute-Cache`      | Reactie  | `HIT` of `MISS` (niet-streaming)                  |
| `X-OmniRoute-Idempotent` | Reactie  | `true` indien ontdubbeld                          |
| `X-OmniRoute-Progress`   | Reactie  | `enabled` als voortgangsregistratie op            |

---

## Insluitingen

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Beschikbare providers: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Beeldgeneratie

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

Beschikbare providers: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Lijstmodellen

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Compatibiliteitseindpunten

| Werkwijze | Pad                         | Formaat                    |
| --------- | --------------------------- | -------------------------- |
| POST      | `/v1/chat/completions`      | Open AI                    |
| POST      | `/v1/messages`              | Antropisch                 |
| POST      | `/v1/responses`             | OpenAI-reacties            |
| POST      | `/v1/embeddings`            | Open AI                    |
| POST      | `/v1/images/generations`    | Open AI                    |
| KRIJG     | `/v1/models`                | Open AI                    |
| POST      | `/v1/messages/count_tokens` | Antropisch                 |
| KRIJG     | `/v1beta/models`            | Tweeling                   |
| POST      | `/v1beta/models/{...path}`  | Tweelingen genererenInhoud |
| POST      | `/v1/api/chat`              | Ollama                     |

### Speciale providerroutes

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Het providervoorvoegsel wordt automatisch toegevoegd als het ontbreekt. Niet-overeenkomende modellen retourneren `400`.

---

## Semantische cache

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Voorbeeld van een antwoord:

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

## Dashboard en beheer

### Authenticatie

| Eindpunt                      | Werkwijze | Beschrijving             |
| ----------------------------- | --------- | ------------------------ |
| `/api/auth/login`             | POST      | Inloggen                 |
| `/api/auth/logout`            | POST      | Uitloggen                |
| `/api/settings/require-login` | KRIJG/ZET | Schakel inloggen vereist |

### Providerbeheer

| Eindpunt                     | Werkwijze                | Beschrijving                   |
| ---------------------------- | ------------------------ | ------------------------------ |
| `/api/providers`             | KRIJGEN/POST             | Providers weergeven / aanmaken |
| `/api/providers/[id]`        | KRIJGEN/ZET/VERWIJDEREN  | Beheer een aanbieder           |
| `/api/providers/[id]/test`   | POST                     | Providerverbinding testen      |
| `/api/providers/[id]/models` | KRIJG                    | Providermodellen weergeven     |
| `/api/providers/validate`    | POST                     | Providerconfiguratie valideren |
| `/api/provider-nodes*`       | Diverse                  | Beheer van providerknooppunten |
| `/api/provider-models`       | KRIJGEN/POST/VERWIJDEREN | Aangepaste modellen            |

### OAuth-stromen

| Eindpunt                         | Werkwijze | Beschrijving             |
| -------------------------------- | --------- | ------------------------ |
| `/api/oauth/[provider]/[action]` | Diverse   | Providerspecifieke OAuth |

### Routering en configuratie

| Eindpunt              | Werkwijze    | Beschrijving                       |
| --------------------- | ------------ | ---------------------------------- |
| `/api/models/alias`   | KRIJGEN/POST | Modelaliassen                      |
| `/api/models/catalog` | KRIJG        | Alle modellen per aanbieder + type |
| `/api/combos*`        | Diverse      | Combinatiebeheer                   |
| `/api/keys*`          | Diverse      | API-sleutelbeheer                  |
| `/api/pricing`        | KRIJG        | Modelprijzen                       |

### Gebruik en analyse

| Eindpunt                    | Werkwijze | Beschrijving                |
| --------------------------- | --------- | --------------------------- |
| `/api/usage/history`        | KRIJG     | Gebruiksgeschiedenis        |
| `/api/usage/logs`           | KRIJG     | Gebruikslogboeken           |
| `/api/usage/request-logs`   | KRIJG     | Logboeken op aanvraagniveau |
| `/api/usage/[connectionId]` | KRIJG     | Gebruik per verbinding      |

### Instellingen

| Eindpunt                        | Werkwijze | Beschrijving                     |
| ------------------------------- | --------- | -------------------------------- |
| `/api/settings`                 | KRIJG/ZET | Algemene instellingen            |
| `/api/settings/proxy`           | KRIJG/ZET | Netwerkproxyconfiguratie         |
| `/api/settings/proxy/test`      | POST      | Proxyverbinding testen           |
| `/api/settings/ip-filter`       | KRIJG/ZET | IP-toelatingslijst/blokkeerlijst |
| `/api/settings/thinking-budget` | KRIJG/ZET | Redeneren tokenbudget            |
| `/api/settings/system-prompt`   | KRIJG/ZET | Globale systeemprompt            |

### Toezicht

| Eindpunt                 | Werkwijze           | Beschrijving               |
| ------------------------ | ------------------- | -------------------------- |
| `/api/sessions`          | KRIJG               | Actieve sessietracking     |
| `/api/rate-limits`       | KRIJG               | Tarieflimieten per account |
| `/api/monitoring/health` | KRIJG               | Gezondheidscontrole        |
| `/api/cache`             | OPHALEN/VERWIJDEREN | Cachestatistieken / wissen |

### Back-up & exporteren/importeren

| Eindpunt                    | Werkwijze | Beschrijving                                     |
| --------------------------- | --------- | ------------------------------------------------ |
| `/api/db-backups`           | KRIJG     | Beschikbare back-ups weergeven                   |
| `/api/db-backups`           | ZET       | Maak een handmatige back-up                      |
| `/api/db-backups`           | POST      | Herstellen vanaf een specifieke back-up          |
| `/api/db-backups/export`    | KRIJG     | Database downloaden als .sqlite-bestand          |
| `/api/db-backups/import`    | POST      | Upload .sqlite-bestand om database te vervangen  |
| `/api/db-backups/exportAll` | KRIJG     | Volledige back-up downloaden als .tar.gz-archief |

### Cloudsynchronisatie

| Eindpunt               | Werkwijze | Beschrijving                   |
| ---------------------- | --------- | ------------------------------ |
| `/api/sync/cloud`      | Diverse   | Cloudsynchronisatiebewerkingen |
| `/api/sync/initialize` | POST      | Synchronisatie initialiseren   |
| `/api/cloud/*`         | Diverse   | Cloudbeheer                    |

### CLI-hulpmiddelen

| Eindpunt                           | Werkwijze | Beschrijving         |
| ---------------------------------- | --------- | -------------------- |
| `/api/cli-tools/claude-settings`   | KRIJG     | Claude CLI-status    |
| `/api/cli-tools/codex-settings`    | KRIJG     | Codex CLI-status     |
| `/api/cli-tools/droid-settings`    | KRIJG     | Droid CLI-status     |
| `/api/cli-tools/openclaw-settings` | KRIJG     | OpenClaw CLI-status  |
| `/api/cli-tools/runtime/[toolId]`  | KRIJG     | Algemene CLI-runtime |

CLI-reacties omvatten: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Veerkracht en snelheidslimieten

| Eindpunt                | Werkwijze | Beschrijving                            |
| ----------------------- | --------- | --------------------------------------- |
| `/api/resilience`       | KRIJG/ZET | Veerkrachtprofielen ophalen/bijwerken   |
| `/api/resilience/reset` | POST      | Stroomonderbrekers resetten             |
| `/api/rate-limits`      | KRIJG     | Status van tarieflimiet per account     |
| `/api/rate-limit`       | KRIJG     | Configuratie van globale tarieflimieten |

### Evaluaties

| Eindpunt     | Werkwijze    | Beschrijving                                    |
| ------------ | ------------ | ----------------------------------------------- |
| `/api/evals` | KRIJGEN/POST | Evaluatiesuites weergeven / evaluatie uitvoeren |

### Beleid

| Eindpunt        | Werkwijze                | Beschrijving          |
| --------------- | ------------------------ | --------------------- |
| `/api/policies` | KRIJGEN/POST/VERWIJDEREN | Routingbeleid beheren |

### Naleving

| Eindpunt                    | Werkwijze | Beschrijving                      |
| --------------------------- | --------- | --------------------------------- |
| `/api/compliance/audit-log` | KRIJG     | Nalevingsauditlogboek (laatste N) |

### v1beta (Gemini-compatibel)

| Eindpunt                   | Werkwijze | Beschrijving                      |
| -------------------------- | --------- | --------------------------------- |
| `/v1beta/models`           | KRIJG     | Lijstmodellen in Gemini-formaat   |
| `/v1beta/models/{...path}` | POST      | Gemini `generateContent` eindpunt |

Deze eindpunten weerspiegelen het API-formaat van Gemini voor klanten die native Gemini SDK-compatibiliteit verwachten.

### Interne/systeem-API's

| Eindpunt        | Werkwijze | Beschrijving                                                   |
| --------------- | --------- | -------------------------------------------------------------- |
| `/api/init`     | KRIJG     | Initialisatiecontrole van applicatie (gebruikt bij eerste run) |
| `/api/tags`     | KRIJG     | Ollama-compatibele modeltags (voor Ollama-klanten)             |
| `/api/restart`  | POST      | Trigger een sierlijke herstart van de server                   |
| `/api/shutdown` | POST      | Trigger een elegante serveruitschakeling                       |

> **Opmerking:** Deze eindpunten worden intern gebruikt door het systeem of voor Ollama-clientcompatibiliteit. Ze worden doorgaans niet door eindgebruikers gebeld.

---

## Audiotranscriptie

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transcribeer audiobestanden met Deepgram of AssemblyAI.

**Verzoek:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Reactie:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Ondersteunde providers:** `deepgram/nova-3`, `assemblyai/best`.

**Ondersteunde formaten:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Ollama-compatibiliteit

Voor klanten die het API-formaat van Ollama gebruiken:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Verzoeken worden automatisch vertaald tussen Ollama en interne formaten.

---

## Telemetrie

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Reactie:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Begroting

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

## Beschikbaarheid van modellen

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

## Verzoekverwerking

1. Klant stuurt verzoek naar `/v1/*`
2. Route-handleraanroepen `handleChat`, `handleEmbedding`, `handleAudioTranscription` of `handleImageGeneration`
3. Model is opgelost (directe provider/model of alias/combo)
4. Inloggegevens geselecteerd uit lokale DB met filtering van accountbeschikbaarheid
5. Voor chat: `handleChatCore` — formaatdetectie, vertaling, cachecontrole, idempotentiecontrole
6. Provider-uitvoerder verzendt een upstream-verzoek
7. Antwoord terugvertaald naar clientformaat (chat) of geretourneerd zoals het is (insluitingen/afbeeldingen/audio)
8. Verbruik/logboekregistratie
9. Fallback is van toepassing op fouten volgens comboregels

Volledige architectuurreferentie: [link](ARCHITECTURE.md)

---

## Authenticatie

- Dashboardroutes (`/dashboard/*`) gebruiken `auth_token` cookie
- Inloggen maakt gebruik van opgeslagen wachtwoord-hash; terugval naar `INITIAL_PASSWORD`
- `requireLogin` schakelbaar via `/api/settings/require-login`
- Voor `/v1/*` routes is optioneel een Bearer API-sleutel vereist wanneer `REQUIRE_API_KEY=true`
