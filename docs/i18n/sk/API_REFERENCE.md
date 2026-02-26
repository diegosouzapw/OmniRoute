# Referencia API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Kompletná referencia pre všetky koncové body rozhrania OmniRoute API.

---

## Obsah

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

## Dokončenia četu

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

### Vlastné hlavičky

| Hlavička                 | Smer    | Popis                                                  |
| ------------------------ | ------- | ------------------------------------------------------ |
| `X-OmniRoute-No-Cache`   | Žiadosť | Ak chcete obísť vyrovnávaciu pamäť, nastavte na `true` |
| `X-OmniRoute-Progress`   | Žiadosť | Nastaviť na `true` pre udalosti postupu                |
| `Idempotency-Key`        | Žiadosť | Deup kľúč (okno 5s)                                    |
| `X-Request-Id`           | Žiadosť | Alternatívny dedup kľúč                                |
| `X-OmniRoute-Cache`      | Odpoveď | `HIT` alebo `MISS` (bez streamovania)                  |
| `X-OmniRoute-Idempotent` | Odpoveď | `true` v prípade deduplikácie                          |
| `X-OmniRoute-Progress`   | Odpoveď | `enabled` ak sledovanie pokroku na                     |

---

## Vloženie

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Dostupní poskytovatelia: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Generovanie obrázkov

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

Dostupní poskytovatelia: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Zoznam modelov

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Koncové body kompatibility

| Metóda    | Cesta                       | Formát                |
| --------- | --------------------------- | --------------------- |
| Zverejniť | `/v1/chat/completions`      | OpenAI                |
| Zverejniť | `/v1/messages`              | Antropický            |
| Zverejniť | `/v1/responses`             | Odpovede OpenAI       |
| Zverejniť | `/v1/embeddings`            | OpenAI                |
| Zverejniť | `/v1/images/generations`    | OpenAI                |
| ZÍSKAJTE  | `/v1/models`                | OpenAI                |
| Zverejniť | `/v1/messages/count_tokens` | Antropický            |
| ZÍSKAJTE  | `/v1beta/models`            | Blíženci              |
| Zverejniť | `/v1beta/models/{...path}`  | Gemini generovaťObsah |
| Zverejniť | `/v1/api/chat`              | Ollama                |

### Vyhradené trasy poskytovateľa

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Ak chýba predpona poskytovateľa, automaticky sa pridá. Nezhodné modely vrátia `400`.

---

## Sémantická vyrovnávacia pamäť

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Príklad odpovede:

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

## Dashboard & Management

### Autentifikácia

| Koncový bod                   | Metóda    | Popis                             |
| ----------------------------- | --------- | --------------------------------- |
| `/api/auth/login`             | Zverejniť | Prihlásiť sa                      |
| `/api/auth/logout`            | Zverejniť | Odhlásiť sa                       |
| `/api/settings/require-login` | GET/PUT   | Vyžaduje sa prepnutie prihlásenia |

### Správa poskytovateľa

| Koncový bod                  | Metóda                | Popis                              |
| ---------------------------- | --------------------- | ---------------------------------- |
| `/api/providers`             | ZÍSKAŤ/POSLAŤ         | Zoznam / vytvorenie poskytovateľov |
| `/api/providers/[id]`        | GET/PUT/DELETE        | Spravovať poskytovateľa            |
| `/api/providers/[id]/test`   | Zverejniť             | Test pripojenia poskytovateľa      |
| `/api/providers/[id]/models` | ZÍSKAJTE              | Zoznam modelov poskytovateľov      |
| `/api/providers/validate`    | Zverejniť             | Overiť konfiguráciu poskytovateľa  |
| `/api/provider-nodes*`       | Rôzne                 | Správa uzla poskytovateľa          |
| `/api/provider-models`       | ZÍSKAŤ/POSLAŤ/VYMAZAŤ | Vlastné modely                     |

### Toky OAuth

| Koncový bod                      | Metóda | Popis                              |
| -------------------------------- | ------ | ---------------------------------- |
| `/api/oauth/[provider]/[action]` | Rôzne  | OAuth špecifické pre poskytovateľa |

### Smerovanie a konfigurácia

| Koncový bod           | Metóda        | Popis                                   |
| --------------------- | ------------- | --------------------------------------- |
| `/api/models/alias`   | ZÍSKAŤ/POSLAŤ | Modelové aliasy                         |
| `/api/models/catalog` | ZÍSKAJTE      | Všetky modely podľa poskytovateľa + typ |
| `/api/combos*`        | Rôzne         | Kombinovaný manažment                   |
| `/api/keys*`          | Rôzne         | Správa kľúčov API                       |
| `/api/pricing`        | ZÍSKAJTE      | Cena modelu                             |

### Použitie a analýza

| Koncový bod                 | Metóda   | Popis                        |
| --------------------------- | -------- | ---------------------------- |
| `/api/usage/history`        | ZÍSKAJTE | História používania          |
| `/api/usage/logs`           | ZÍSKAJTE | Denníky používania           |
| `/api/usage/request-logs`   | ZÍSKAJTE | Protokoly na úrovni žiadosti |
| `/api/usage/[connectionId]` | ZÍSKAJTE | Použitie na pripojenie       |

### Nastavenia

| Koncový bod                     | Metóda    | Popis                             |
| ------------------------------- | --------- | --------------------------------- |
| `/api/settings`                 | GET/PUT   | Všeobecné nastavenia              |
| `/api/settings/proxy`           | GET/PUT   | Konfigurácia sieťového proxy      |
| `/api/settings/proxy/test`      | Zverejniť | Test pripojenia proxy             |
| `/api/settings/ip-filter`       | GET/PUT   | Zoznam povolených/blokovaných IP  |
| `/api/settings/thinking-budget` | GET/PUT   | Zdôvodnenie symbolického rozpočtu |
| `/api/settings/system-prompt`   | GET/PUT   | Výzva globálneho systému          |

### Monitorovanie

| Koncový bod              | Metóda     | Popis                                    |
| ------------------------ | ---------- | ---------------------------------------- |
| `/api/sessions`          | ZÍSKAJTE   | Sledovanie aktívnej relácie              |
| `/api/rate-limits`       | ZÍSKAJTE   | Limity sadzieb na účet                   |
| `/api/monitoring/health` | ZÍSKAJTE   | Zdravotná prehliadka                     |
| `/api/cache`             | GET/DELETE | Štatistiky vyrovnávacej pamäte / vymazať |

### Zálohovanie a export/import

| Koncový bod                 | Metóda    | Popis                                         |
| --------------------------- | --------- | --------------------------------------------- |
| `/api/db-backups`           | ZÍSKAJTE  | Zoznam dostupných záloh                       |
| `/api/db-backups`           | PUT       | Vytvorte manuálnu zálohu                      |
| `/api/db-backups`           | Zverejniť | Obnoviť z konkrétnej zálohy                   |
| `/api/db-backups/export`    | ZÍSKAJTE  | Stiahnuť databázu ako súbor .sqlite           |
| `/api/db-backups/import`    | Zverejniť | Nahrajte súbor .sqlite na nahradenie databázy |
| `/api/db-backups/exportAll` | ZÍSKAJTE  | Stiahnite si úplnú zálohu ako archív .tar.gz  |

### Cloud Sync

| Koncový bod            | Metóda    | Popis                             |
| ---------------------- | --------- | --------------------------------- |
| `/api/sync/cloud`      | Rôzne     | Operácie synchronizácie s cloudom |
| `/api/sync/initialize` | Zverejniť | Inicializovať synchronizáciu      |
| `/api/cloud/*`         | Rôzne     | Správa cloudu                     |

### Nástroje CLI

| Koncový bod                        | Metóda   | Popis               |
| ---------------------------------- | -------- | ------------------- |
| `/api/cli-tools/claude-settings`   | ZÍSKAJTE | Claude CLI status   |
| `/api/cli-tools/codex-settings`    | ZÍSKAJTE | Status Codex CLI    |
| `/api/cli-tools/droid-settings`    | ZÍSKAJTE | Stav CLI Droid      |
| `/api/cli-tools/openclaw-settings` | ZÍSKAJTE | Stav OpenClaw CLI   |
| `/api/cli-tools/runtime/[toolId]`  | ZÍSKAJTE | Generic CLI runtime |

Odpovede CLI zahŕňajú: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Odolnosť a limity rýchlosti

| Koncový bod             | Metóda    | Popis                                 |
| ----------------------- | --------- | ------------------------------------- |
| `/api/resilience`       | GET/PUT   | Získať/aktualizovať profily odolnosti |
| `/api/resilience/reset` | Zverejniť | Resetujte ističe                      |
| `/api/rate-limits`      | ZÍSKAJTE  | Stav limitu sadzby na účet            |
| `/api/rate-limit`       | ZÍSKAJTE  | Konfigurácia globálneho limitu sadzby |

### Evals

| Koncový bod  | Metóda        | Popis                                              |
| ------------ | ------------- | -------------------------------------------------- |
| `/api/evals` | ZÍSKAŤ/POSLAŤ | Vypísať vyhodnocovacie sady / spustiť vyhodnotenie |

### Zásady

| Koncový bod     | Metóda                | Popis                         |
| --------------- | --------------------- | ----------------------------- |
| `/api/policies` | ZÍSKAŤ/POSLAŤ/VYMAZAŤ | Spravovať pravidlá smerovania |

### Súlad

| Koncový bod                 | Metóda   | Popis                               |
| --------------------------- | -------- | ----------------------------------- |
| `/api/compliance/audit-log` | ZÍSKAJTE | Protokol auditu súladu (posledné N) |

### v1beta (kompatibilné s Gemini)

| Koncový bod                | Metóda    | Popis                                  |
| -------------------------- | --------- | -------------------------------------- |
| `/v1beta/models`           | ZÍSKAJTE  | Zoznam modelov vo formáte Gemini       |
| `/v1beta/models/{...path}` | Zverejniť | Blíženci `generateContent` koncový bod |

Tieto koncové body odzrkadľujú formát API Gemini pre klientov, ktorí očakávajú natívnu kompatibilitu Gemini SDK.

### Interné / systémové rozhrania API

| Koncový bod     | Metóda    | Popis                                                            |
| --------------- | --------- | ---------------------------------------------------------------- |
| `/api/init`     | ZÍSKAJTE  | Kontrola inicializácie aplikácie (používa sa pri prvom spustení) |
| `/api/tags`     | ZÍSKAJTE  | Modelové štítky kompatibilné s Ollamou (pre klientov Ollamy)     |
| `/api/restart`  | Zverejniť | Spustenie elegantného reštartu servera                           |
| `/api/shutdown` | Zverejniť | Spustiť elegantné vypnutie servera                               |

> **Poznámka:** Tieto koncové body sú používané interne systémom alebo kvôli kompatibilite klienta Ollama. Koncoví používatelia ich zvyčajne nevolajú.

---

## Prepis zvuku

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Prepisujte zvukové súbory pomocou Deepgram alebo AssemblyAI.

**Žiadosť:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Odpoveď:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Podporovaní poskytovatelia:** `deepgram/nova-3`, `assemblyai/best`.

**Podporované formáty:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, \_\_12_TOKEN_1_TO

---

## Kompatibilita s Ollamou

Pre klientov, ktorí používajú formát Ollama's API:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Žiadosti sa automaticky prekladajú medzi Ollama a internými formátmi.

---

## Telemetria

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Odpoveď:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Rozpočet

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

## Dostupnosť modelu

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

## Spracovanie žiadosti

1. Klient odošle požiadavku na `/v1/*`
2. Volania obslužného programu trasy `handleChat`, `handleEmbedding`, `handleAudioTranscription` alebo `handleImageGeneration`
3. Model je vyriešený (priamy poskytovateľ/model alebo alias/kombo)
4. Prihlasovacie údaje vybrané z lokálnej databázy s filtrovaním dostupnosti účtu
5. Pre chat: `handleChatCore` — detekcia formátu, preklad, kontrola vyrovnávacej pamäte, kontrola idempotencie
6. Exekútor poskytovateľa odošle upstream požiadavku
7. Odpoveď preložená späť do formátu klienta (chat) alebo vrátená tak, ako je (vložené/obrázky/audio)
8. Používanie/protokolovanie zaznamenané
9. Záložný postup sa vzťahuje na chyby podľa pravidiel komba

Odkaz na úplnú architektúru: [**OMNI_TOKEN_119**](ARCHITECTURE.md)

---

## Autentifikácia

- Trasy hlavného panela (`/dashboard/*`) používajú súbor cookie `auth_token`
- Prihlásenie používa uložený hash hesla; návrat k `INITIAL_PASSWORD`
- `requireLogin` prepínateľné cez `/api/settings/require-login`
- trasy `/v1/*` voliteľne vyžadujú kľúč API nosiča, keď `REQUIRE_API_KEY=true`
