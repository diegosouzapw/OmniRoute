# Riferimento API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Riferimento completo per tutti gli endpoint API OmniRoute.

---

## Sommario

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

## Completamenti della chat

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

### Intestazioni personalizzate

| Intestazione             | Direzione | Descrizione                                         |
| ------------------------ | --------- | --------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Richiedi  | Imposta su `true` per ignorare la cache             |
| `X-OmniRoute-Progress`   | Richiedi  | Imposta su `true` per gli eventi di avanzamento     |
| `Idempotency-Key`        | Richiedi  | Chiave di deduplicazione (finestra 5s)              |
| `X-Request-Id`           | Richiedi  | Chiave di deduplicazione alternativa                |
| `X-OmniRoute-Cache`      | Risposta  | `HIT` o `MISS` (non streaming)                      |
| `X-OmniRoute-Idempotent` | Risposta  | `true` se deduplicato                               |
| `X-OmniRoute-Progress`   | Risposta  | `enabled` se il monitoraggio dei progressi è attivo |

---

## Incorporamenti

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Fornitori disponibili: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Generazione di immagini

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

Fornitori disponibili: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Elenco modelli

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Endpoint di compatibilità

| Metodo  | Percorso                    | Formato                 |
| ------- | --------------------------- | ----------------------- |
| POST    | `/v1/chat/completions`      | OpenAI                  |
| POST    | `/v1/messages`              | Antropico               |
| POST    | `/v1/responses`             | Risposte OpenAI         |
| POST    | `/v1/embeddings`            | OpenAI                  |
| POST    | `/v1/images/generations`    | OpenAI                  |
| OTTIENI | `/v1/models`                | OpenAI                  |
| POST    | `/v1/messages/count_tokens` | Antropico               |
| OTTIENI | `/v1beta/models`            | Gemelli                 |
| POST    | `/v1beta/models/{...path}`  | Gemini genera contenuto |
| POST    | `/v1/api/chat`              | Ollama                  |

### Percorsi di provider dedicati

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Se mancante, il prefisso del provider viene aggiunto automaticamente. I modelli non corrispondenti restituiscono `400`.

---

## Cache semantica

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Esempio di risposta:

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

## Cruscotto e gestione

### Autenticazione

| Punto finale                  | Metodo        | Descrizione                         |
| ----------------------------- | ------------- | ----------------------------------- |
| `/api/auth/login`             | POST          | Accedi                              |
| `/api/auth/logout`            | POST          | Esci                                |
| `/api/settings/require-login` | OTTIENI/METTI | Attiva/disattiva il login richiesto |

### Gestione dei fornitori

| Punto finale                 | Metodo                    | Descrizione                              |
| ---------------------------- | ------------------------- | ---------------------------------------- |
| `/api/providers`             | OTTIENI/POSTA             | Elenca/crea fornitori                    |
| `/api/providers/[id]`        | OTTIENI/INSERISCI/ELIMINA | Gestisci un fornitore                    |
| `/api/providers/[id]/test`   | POST                      | Testare la connessione al provider       |
| `/api/providers/[id]/models` | OTTIENI                   | Elenco modelli provider                  |
| `/api/providers/validate`    | POST                      | Convalida la configurazione del provider |
| `/api/provider-nodes*`       | Vari                      | Gestione nodo provider                   |
| `/api/provider-models`       | OTTIENI/INVIA/ELIMINA     | Modelli personalizzati                   |

### Flussi OAuth

| Punto finale                     | Metodo | Descrizione                  |
| -------------------------------- | ------ | ---------------------------- |
| `/api/oauth/[provider]/[action]` | Vari   | OAuth specifico del provider |

### Routing e configurazione

| Punto finale          | Metodo        | Descrizione                          |
| --------------------- | ------------- | ------------------------------------ |
| `/api/models/alias`   | OTTIENI/POSTA | Alias ​​del modello                  |
| `/api/models/catalog` | OTTIENI       | Tutti i modelli per fornitore + tipo |
| `/api/combos*`        | Vari          | Gestione combinata                   |
| `/api/keys*`          | Vari          | Gestione delle chiavi API            |
| `/api/pricing`        | OTTIENI       | Prezzo del modello                   |

### Utilizzo e analisi

| Punto finale                | Metodo  | Descrizione                     |
| --------------------------- | ------- | ------------------------------- |
| `/api/usage/history`        | OTTIENI | Cronologia utilizzo             |
| `/api/usage/logs`           | OTTIENI | Registri di utilizzo            |
| `/api/usage/request-logs`   | OTTIENI | Registri a livello di richiesta |
| `/api/usage/[connectionId]` | OTTIENI | Utilizzo per connessione        |

### Impostazioni

| Punto finale                    | Metodo        | Descrizione                        |
| ------------------------------- | ------------- | ---------------------------------- |
| `/api/settings`                 | OTTIENI/METTI | Impostazioni generali              |
| `/api/settings/proxy`           | OTTIENI/METTI | Configurazione proxy di rete       |
| `/api/settings/proxy/test`      | POST          | Testare la connessione proxy       |
| `/api/settings/ip-filter`       | OTTIENI/METTI | Lista consentita/lista bloccata IP |
| `/api/settings/thinking-budget` | OTTIENI/METTI | Ragionamento gettone bilancio      |
| `/api/settings/system-prompt`   | OTTIENI/METTI | Prompt del sistema globale         |

### Monitoraggio

| Punto finale             | Metodo          | Descrizione                        |
| ------------------------ | --------------- | ---------------------------------- |
| `/api/sessions`          | OTTIENI         | Monitoraggio della sessione attiva |
| `/api/rate-limits`       | OTTIENI         | Limiti di tasso per conto          |
| `/api/monitoring/health` | OTTIENI         | Controllo sanitario                |
| `/api/cache`             | OTTIENI/ELIMINA | Statistiche cache / cancella       |

### Backup ed esportazione/importazione

| Punto finale                | Metodo  | Descrizione                                       |
| --------------------------- | ------- | ------------------------------------------------- |
| `/api/db-backups`           | OTTIENI | Elenca i backup disponibili                       |
| `/api/db-backups`           | METTERE | Crea un backup manuale                            |
| `/api/db-backups`           | POST    | Ripristina da un backup specifico                 |
| `/api/db-backups/export`    | OTTIENI | Scarica il database come file .sqlite             |
| `/api/db-backups/import`    | POST    | Carica il file .sqlite per sostituire il database |
| `/api/db-backups/exportAll` | OTTIENI | Scarica il backup completo come archivio .tar.gz  |

### Sincronizzazione nel cloud

| Punto finale           | Metodo | Descrizione                              |
| ---------------------- | ------ | ---------------------------------------- |
| `/api/sync/cloud`      | Vari   | Operazioni di sincronizzazione nel cloud |
| `/api/sync/initialize` | POST   | Inizializza sincronizzazione             |
| `/api/cloud/*`         | Vari   | Gestione del cloud                       |

### Strumenti CLI

| Punto finale                       | Metodo  | Descrizione                 |
| ---------------------------------- | ------- | --------------------------- |
| `/api/cli-tools/claude-settings`   | OTTIENI | Stato CLI di Claude         |
| `/api/cli-tools/codex-settings`    | OTTIENI | Stato CLI del Codice        |
| `/api/cli-tools/droid-settings`    | OTTIENI | Stato CLI Droid             |
| `/api/cli-tools/openclaw-settings` | OTTIENI | Stato della CLI di OpenClaw |
| `/api/cli-tools/runtime/[toolId]`  | OTTIENI | Runtime CLI generico        |

Le risposte della CLI includono: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Resilienza e limiti di velocità

| Punto finale            | Metodo        | Descrizione                                  |
| ----------------------- | ------------- | -------------------------------------------- |
| `/api/resilience`       | OTTIENI/METTI | Ottieni/aggiorna profili di resilienza       |
| `/api/resilience/reset` | POST          | Ripristinare gli interruttori automatici     |
| `/api/rate-limits`      | OTTIENI       | Stato limite tariffa per account             |
| `/api/rate-limit`       | OTTIENI       | Configurazione del limite tariffario globale |

### Valutazioni

| Punto finale | Metodo        | Descrizione                                            |
| ------------ | ------------- | ------------------------------------------------------ |
| `/api/evals` | OTTIENI/POSTA | Elenca le suite di valutazione / esegui la valutazione |

### Politiche

| Punto finale    | Metodo                | Descrizione                     |
| --------------- | --------------------- | ------------------------------- |
| `/api/policies` | OTTIENI/INVIA/ELIMINA | Gestire le politiche di routing |

### Conformità

| Punto finale                | Metodo  | Descrizione                                       |
| --------------------------- | ------- | ------------------------------------------------- |
| `/api/compliance/audit-log` | OTTIENI | Registro di controllo della conformità (ultimi N) |

### v1beta (compatibile con Gemini)

| Punto finale               | Metodo  | Descrizione                            |
| -------------------------- | ------- | -------------------------------------- |
| `/v1beta/models`           | OTTIENI | Elenco modelli in formato Gemini       |
| `/v1beta/models/{...path}` | POST    | Gemelli `generateContent` punto finale |

Questi endpoint rispecchiano il formato API di Gemini per i client che prevedono la compatibilità nativa dell'SDK Gemini.

### API interne/di sistema

| Punto finale    | Metodo  | Descrizione                                                                          |
| --------------- | ------- | ------------------------------------------------------------------------------------ |
| `/api/init`     | OTTIENI | Controllo dell'inizializzazione dell'applicazione (utilizzato alla prima esecuzione) |
| `/api/tags`     | OTTIENI | Tag modello compatibili con Ollama (per client Ollama)                               |
| `/api/restart`  | POST    | Attiva il riavvio corretto del server                                                |
| `/api/shutdown` | POST    | Attiva l'arresto regolare del server                                                 |

> **Nota:** questi endpoint vengono utilizzati internamente dal sistema o per la compatibilità del client Ollama. In genere non vengono chiamati dagli utenti finali.

---

## Trascrizione audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Trascrivi file audio utilizzando Deepgram o AssemblyAI.

**Richiesta:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Risposta:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Fornitori supportati:** `deepgram/nova-3`, `assemblyai/best`.

**Formati supportati:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Compatibilità con Ollama

Per i clienti che utilizzano il formato API di Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Le richieste vengono tradotte automaticamente tra Ollama e formati interni.

---

## Telemetria

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Risposta:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Bilancio

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

## Disponibilità del modello

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

## Elaborazione della richiesta

1. Il cliente invia la richiesta a `/v1/*`
2. Chiamate del gestore del percorso `handleChat`, `handleEmbedding`, `handleAudioTranscription` o `handleImageGeneration`
3. Il modello è risolto (provider/modello diretto o alias/combo)
4. Credenziali selezionate dal DB locale con filtro sulla disponibilità dell'account
5. Per chat: `handleChatCore`: rilevamento del formato, traduzione, controllo della cache, controllo dell'idempotenza
6. L'esecutore del provider invia una richiesta upstream
7. Risposta ricondotta nel formato client (chat) o restituita così com'è (incorporamenti/immagini/audio)
8. Utilizzo/registrazione registrati
9. Il fallback si applica agli errori secondo le regole della combo

Riferimento completo all'architettura: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Autenticazione

- I percorsi della dashboard (`/dashboard/*`) utilizzano il cookie `auth_token`
- L'accesso utilizza l'hash della password salvata; fallback su `INITIAL_PASSWORD`
- `requireLogin` attivabile tramite `/api/settings/require-login`
- Le rotte `/v1/*` richiedono facoltativamente la chiave API Bearer quando `REQUIRE_API_KEY=true`
