# API-Referenz

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Vollständige Referenz für alle OmniRoute-API-Endpunkte.

---

## Inhaltsverzeichnis

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

## Chat-Abschlüsse

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

### Benutzerdefinierte Header

| Kopfzeile                | Richtung | Beschreibung                                 |
| ------------------------ | -------- | -------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Anfrage  | Auf `true` setzen, um den Cache zu umgehen   |
| `X-OmniRoute-Progress`   | Anfrage  | Für Fortschrittsereignisse auf `true` setzen |
| `Idempotency-Key`        | Anfrage  | Dedup-Schlüssel (5-Sekunden-Fenster)         |
| `X-Request-Id`           | Anfrage  | Alternativer Deduplizierungsschlüssel        |
| `X-OmniRoute-Cache`      | Antwort  | `HIT` oder `MISS` (kein Streaming)           |
| `X-OmniRoute-Idempotent` | Antwort  | `true` wenn dedupliziert                     |
| `X-OmniRoute-Progress`   | Antwort  | `enabled` wenn Fortschrittsverfolgung auf    |

---

## Einbettungen

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Verfügbare Anbieter: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Bildgenerierung

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

Verfügbare Anbieter: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Modelle auflisten

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Kompatibilitätsendpunkte

| Methode | Pfad                        | Formatieren                 |
| ------- | --------------------------- | --------------------------- |
| POST    | `/v1/chat/completions`      | OpenAI                      |
| POST    | `/v1/messages`              | Anthropisch                 |
| POST    | `/v1/responses`             | OpenAI-Antworten            |
| POST    | `/v1/embeddings`            | OpenAI                      |
| POST    | `/v1/images/generations`    | OpenAI                      |
| GET     | `/v1/models`                | OpenAI                      |
| POST    | `/v1/messages/count_tokens` | Anthropisch                 |
| GET     | `/v1beta/models`            | Zwillinge                   |
| POST    | `/v1beta/models/{...path}`  | Zwillinge generierenContent |
| POST    | `/v1/api/chat`              | Ollama                      |

### Dedizierte Anbieterrouten

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Das Anbieterpräfix wird automatisch hinzugefügt, wenn es fehlt. Nicht übereinstimmende Modelle geben `400` zurück.

---

## Semantischer Cache

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Antwortbeispiel:

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

## Dashboard und Verwaltung

### Authentifizierung

| Endpunkt                      | Methode | Beschreibung                      |
| ----------------------------- | ------- | --------------------------------- |
| `/api/auth/login`             | POST    | Anmelden                          |
| `/api/auth/logout`            | POST    | Abmelden                          |
| `/api/settings/require-login` | GET/PUT | Anmeldung erforderlich umschalten |

### Anbieterverwaltung

| Endpunkt                     | Methode         | Beschreibung                     |
| ---------------------------- | --------------- | -------------------------------- |
| `/api/providers`             | GET/POST        | Anbieter auflisten/anlegen       |
| `/api/providers/[id]`        | GET/PUT/DELETE  | Einen Anbieter verwalten         |
| `/api/providers/[id]/test`   | POST            | Provider-Verbindung testen       |
| `/api/providers/[id]/models` | GET             | Anbietermodelle auflisten        |
| `/api/providers/validate`    | POST            | Anbieterkonfiguration validieren |
| `/api/provider-nodes*`       | Verschiedene    | Provider-Knotenverwaltung        |
| `/api/provider-models`       | GET/POST/DELETE | Kundenspezifische Modelle        |

### OAuth-Flows

| Endpunkt                         | Methode      | Beschreibung               |
| -------------------------------- | ------------ | -------------------------- |
| `/api/oauth/[provider]/[action]` | Verschiedene | Anbieterspezifisches OAuth |

### Routing & Konfig

| Endpunkt              | Methode      | Beschreibung                     |
| --------------------- | ------------ | -------------------------------- |
| `/api/models/alias`   | GET/POST     | Modell-Aliase                    |
| `/api/models/catalog` | GET          | Alle Modelle nach Anbieter + Typ |
| `/api/combos*`        | Verschiedene | Combo-Management                 |
| `/api/keys*`          | Verschiedene | API-Schlüsselverwaltung          |
| `/api/pricing`        | GET          | Modellpreise                     |

### Nutzung und Analyse

| Endpunkt                    | Methode | Beschreibung                     |
| --------------------------- | ------- | -------------------------------- |
| `/api/usage/history`        | GET     | Nutzungshistorie                 |
| `/api/usage/logs`           | GET     | Nutzungsprotokolle               |
| `/api/usage/request-logs`   | GET     | Protokolle auf Anforderungsebene |
| `/api/usage/[connectionId]` | GET     | Nutzung pro Verbindung           |

### Einstellungen

| Endpunkt                        | Methode | Beschreibung                     |
| ------------------------------- | ------- | -------------------------------- |
| `/api/settings`                 | GET/PUT | Allgemeine Einstellungen         |
| `/api/settings/proxy`           | GET/PUT | Netzwerk-Proxy-Konfiguration     |
| `/api/settings/proxy/test`      | POST    | Proxy-Verbindung testen          |
| `/api/settings/ip-filter`       | GET/PUT | IP-Zulassungs-/Blockierungsliste |
| `/api/settings/thinking-budget` | GET/PUT | Begründung des Token-Budgets     |
| `/api/settings/system-prompt`   | GET/PUT | Globale Systemaufforderung       |

### Überwachung

| Endpunkt                 | Methode          | Beschreibung                |
| ------------------------ | ---------------- | --------------------------- |
| `/api/sessions`          | GET              | Aktive Sitzungsverfolgung   |
| `/api/rate-limits`       | GET              | Tariflimits pro Konto       |
| `/api/monitoring/health` | GET              | Gesundheitscheck            |
| `/api/cache`             | ERHALTEN/LÖSCHEN | Cache-Statistiken / löschen |

### Sichern und Exportieren/Importieren

| Endpunkt                    | Methode | Beschreibung                                                   |
| --------------------------- | ------- | -------------------------------------------------------------- |
| `/api/db-backups`           | GET     | Verfügbare Backups auflisten                                   |
| `/api/db-backups`           | PUT     | Erstellen Sie ein manuelles Backup                             |
| `/api/db-backups`           | POST    | Von einem bestimmten Backup wiederherstellen                   |
| `/api/db-backups/export`    | GET     | Datenbank als .sqlite-Datei herunterladen                      |
| `/api/db-backups/import`    | POST    | Laden Sie die .sqlite-Datei hoch, um die Datenbank zu ersetzen |
| `/api/db-backups/exportAll` | GET     | Vollständiges Backup als .tar.gz-Archiv herunterladen          |

### Cloud-Synchronisierung

| Endpunkt               | Methode      | Beschreibung                    |
| ---------------------- | ------------ | ------------------------------- |
| `/api/sync/cloud`      | Verschiedene | Cloud-Synchronisierungsvorgänge |
| `/api/sync/initialize` | POST         | Synchronisierung initialisieren |
| `/api/cloud/*`         | Verschiedene | Cloud-Management                |

### CLI-Tools

| Endpunkt                           | Methode | Beschreibung            |
| ---------------------------------- | ------- | ----------------------- |
| `/api/cli-tools/claude-settings`   | GET     | Claude CLI-Status       |
| `/api/cli-tools/codex-settings`    | GET     | Codex-CLI-Status        |
| `/api/cli-tools/droid-settings`    | GET     | Droid-CLI-Status        |
| `/api/cli-tools/openclaw-settings` | GET     | OpenClaw CLI-Status     |
| `/api/cli-tools/runtime/[toolId]`  | GET     | Generische CLI-Laufzeit |

Zu den CLI-Antworten gehören: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Belastbarkeit und Ratenbeschränkungen

| Endpunkt                | Methode | Beschreibung                           |
| ----------------------- | ------- | -------------------------------------- |
| `/api/resilience`       | GET/PUT | Resilienzprofile abrufen/aktualisieren |
| `/api/resilience/reset` | POST    | Leistungsschalter zurücksetzen         |
| `/api/rate-limits`      | GET     | Status der Ratenbegrenzung pro Konto   |
| `/api/rate-limit`       | GET     | Konfiguration des globalen Ratenlimits |

### Bewertungen

| Endpunkt     | Methode  | Beschreibung                                         |
| ------------ | -------- | ---------------------------------------------------- |
| `/api/evals` | GET/POST | Evaluierungssuiten auflisten / Evaluierung ausführen |

### Richtlinien

| Endpunkt        | Methode         | Beschreibung                  |
| --------------- | --------------- | ----------------------------- |
| `/api/policies` | GET/POST/DELETE | Routing-Richtlinien verwalten |

### Compliance

| Endpunkt                    | Methode | Beschreibung                           |
| --------------------------- | ------- | -------------------------------------- |
| `/api/compliance/audit-log` | GET     | Compliance-Audit-Protokoll (letztes N) |

### v1beta (Gemini-kompatibel)

| Endpunkt                   | Methode | Beschreibung                       |
| -------------------------- | ------- | ---------------------------------- |
| `/v1beta/models`           | GET     | Modelle im Gemini-Format auflisten |
| `/v1beta/models/{...path}` | POST    | Gemini `generateContent` Endpunkt  |

Diese Endpunkte spiegeln das API-Format von Gemini für Kunden wider, die native Gemini SDK-Kompatibilität erwarten.

### Interne/System-APIs

| Endpunkt        | Methode | Beschreibung                                                                 |
| --------------- | ------- | ---------------------------------------------------------------------------- |
| `/api/init`     | GET     | Überprüfung der Anwendungsinitialisierung (wird beim ersten Start verwendet) |
| `/api/tags`     | GET     | Ollama-kompatible Modell-Tags (für Ollama-Clients)                           |
| `/api/restart`  | POST    | Ordentlichen Serverneustart auslösen                                         |
| `/api/shutdown` | POST    | Ordentliches Herunterfahren des Servers auslösen                             |

> **Hinweis:** Diese Endpunkte werden intern vom System oder für die Ollama-Client-Kompatibilität verwendet. Sie werden normalerweise nicht von Endbenutzern aufgerufen.

---

## Audiotranskription

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkribieren Sie Audiodateien mit Deepgram oder AssemblyAI.

**Anfrage:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Antwort:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Unterstützte Anbieter:** `deepgram/nova-3`, `assemblyai/best`.

**Unterstützte Formate:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Ollama-Kompatibilität

Für Kunden, die das API-Format von Ollama verwenden:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Anfragen werden automatisch zwischen Ollama und internen Formaten übersetzt.

---

## Telemetrie

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Antwort:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Budget

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

## Modellverfügbarkeit

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

## Bearbeitung der Anfrage

1. Client sendet Anfrage an `/v1/*`
2. Route-Handler-Aufrufe `handleChat`, `handleEmbedding`, `handleAudioTranscription` oder `handleImageGeneration`
3. Modell wird aufgelöst (direkter Anbieter/Modell oder Alias/Kombination)
4. Aus der lokalen Datenbank ausgewählte Anmeldeinformationen mit Kontoverfügbarkeitsfilterung
5. Für Chat: `handleChatCore` – Formaterkennung, Übersetzung, Cache-Prüfung, Idempotenzprüfung
6. Der Executor des Anbieters sendet eine Upstream-Anfrage
7. Antwort zurück ins Client-Format übersetzt (Chat) oder unverändert zurückgegeben (Einbettungen/Bilder/Audio)
8. Nutzung/Protokollierung aufgezeichnet
9. Bei Fehlern gilt ein Fallback gemäß den Combo-Regeln

Vollständige Architekturreferenz: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Authentifizierung

– Dashboard-Routen (`/dashboard/*`) verwenden das Cookie `auth_token`

- Bei der Anmeldung wird der gespeicherte Passwort-Hash verwendet. Fallback auf `INITIAL_PASSWORD`
- `requireLogin` umschaltbar über `/api/settings/require-login`
  – `/v1/*` Routen erfordern optional einen Bearer-API-Schlüssel, wenn `REQUIRE_API_KEY=true`
