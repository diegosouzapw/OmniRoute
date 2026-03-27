# Referenční informace k API

🌐 **Jazyky:** 🇺🇸 [angličtina](API_REFERENCE.md) | 🇧🇷 [Português (Brazílie)](i18n/pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](i18n/es/API_REFERENCE.md) | 🇫🇷 [Français](i18n/fr/API_REFERENCE.md) | 🇮🇹 [Italiano](i18n/it/API_REFERENCE.md) | 🇷🇺 [Русский](i18n/ru/API_REFERENCE.md) | 🇨🇳[中文 (简体)](i18n/zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](i18n/de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](i18n/in/API_REFERENCE.md) | 🇹🇭 [ไทย](i18n/th/API_REFERENCE.md) | 🇺🇦 [Українська](i18n/uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](i18n/ar/API_REFERENCE.md) | 🇯🇵[日本語](i18n/ja/API_REFERENCE.md)| 🇻🇳 [Tiếng Việt](i18n/vi/API_REFERENCE.md) | 🇧🇬 [Български](i18n/bg/API_REFERENCE.md) | 🇩🇰 [Dánsko](i18n/da/API_REFERENCE.md) | 🇫🇮 [Suomi](i18n/fi/API_REFERENCE.md) | 🇮🇱 [עברית](i18n/he/API_REFERENCE.md) | 🇭🇺 [maďarština](i18n/hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonésie](i18n/id/API_REFERENCE.md) | 🇰🇷 [한국어](i18n/ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](i18n/ms/API_REFERENCE.md) | 🇳🇱 [Nizozemsko](i18n/nl/API_REFERENCE.md) | 🇳🇴 [Norsk](i18n/no/API_REFERENCE.md) | 🇵🇹 [Português (Portugalsko)](i18n/pt/API_REFERENCE.md) | 🇷🇴 [Română](i18n/ro/API_REFERENCE.md) | 🇵🇱 [Polski](i18n/pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](i18n/sk/API_REFERENCE.md) | 🇸🇪 [Svenska](i18n/sv/API_REFERENCE.md) | 🇵🇭 [Filipínec](i18n/phi/API_REFERENCE.md) | 🇨🇿 [Čeština](i18n/cs/API_REFERENCE.md)

Kompletní referenční příručka pro všechny koncové body rozhraní OmniRoute API.

---

## Obsah

- [Dokončení chatu](#chat-completions)
- [Vložení](#embeddings)
- [Generování obrázků](#image-generation)
- [Seznam modelů](#list-models)
- [Koncové body kompatibility](#compatibility-endpoints)
- [Sémantická mezipaměť](#semantic-cache)
- [Řídicí panel a správa](#dashboard--management)
- [Zpracování žádosti](#request-processing)
- [Ověřování](#authentication)

---

## Dokončení chatu

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

### Vlastní záhlaví

| Záhlaví                  | Směr    | Popis                                             |
| ------------------------ | ------- | ------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Žádost  | Nastavením na `true` se vynechá mezipaměť         |
| `X-OmniRoute-Progress`   | Žádost  | Nastaveno na `true` pro události průběhu          |
| `Idempotency-Key`        | Žádost  | Klíč pro deduplikaci (okno 5 s)                   |
| `X-Request-Id`           | Žádost  | Alternativní klíč pro odstranění duplicitních dat |
| `X-OmniRoute-Cache`      | Odpověď | `HIT` or `MISS` (nestreamované)                   |
| `X-OmniRoute-Idempotent` | Odpověď | `true` , pokud je odstraněna duplikace            |
| `X-OmniRoute-Progress`   | Odpověď | `enabled` pokud je zapnuto sledování průběhu      |

> Poznámka Nginx: pokud spoléháte na hlavičky s podtržítkem (například `x_session_id`), povolte `underscores_in_headers on;`.

---

## Vložení

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Dostupní poskytovatelé: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Generování obrázků

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

Dostupní poskytovatelé: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Seznam modelů

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Koncové body kompatibility

| Metoda | Cesta                       | Formát                |
| ------ | --------------------------- | --------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                |
| POST   | `/v1/messages`              | Anthropic             |
| POST   | `/v1/responses`             | Reakce OpenAI         |
| POST   | `/v1/embeddings`            | OpenAI                |
| POST   | `/v1/images/generations`    | OpenAI                |
| GET    | `/v1/models`                | OpenAI                |
| POST   | `/v1/messages/count_tokens` | Anthropic             |
| GET    | `/v1beta/models`            | Blíženci              |
| POST   | `/v1beta/models/{...path}`  | Gemini generuje obsah |
| POST   | `/v1/api/chat`              | Ollama                |

### Vyhrazené trasy poskytovatelů

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Pokud chybí prefix poskytovatele, automaticky se přidá. Neshodné modely vrátí chybu `400` .

---

## Sémantická mezipaměť

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Příklad odpovědi:

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

## Řídicí panel a správa

### Ověřování

| Koncový bod                   | Metoda  | Popis                           |
| ----------------------------- | ------- | ------------------------------- |
| `/api/auth/login`             | POST    | Přihlášení                      |
| `/api/auth/logout`            | POST    | Odhlásit se                     |
| `/api/settings/require-login` | GET/PUT | Vyžaduje se přepnutí přihlášení |

### Správa poskytovatelů

| Koncový bod                  | Metoda          | Popis                             |
| ---------------------------- | --------------- | --------------------------------- |
| `/api/providers`             | GET/POST        | Seznam / vytvoření poskytovatelů  |
| `/api/providers/[id]`        | GET/PUT/DELETE  | Správa poskytovatele              |
| `/api/providers/[id]/test`   | POST            | Testovací připojení poskytovatele |
| `/api/providers/[id]/models` | GET             | Seznam modelů poskytovatelů       |
| `/api/providers/validate`    | POST            | Ověření konfigurace poskytovatele |
| `/api/provider-nodes*`       | Různé           | Správa uzlů poskytovatelů         |
| `/api/provider-models`       | GET/POST/DELETE | Vlastní modely                    |

### Toky OAuth

| Koncový bod                      | Metoda | Popis                              |
| -------------------------------- | ------ | ---------------------------------- |
| `/api/oauth/[provider]/[action]` | Různé  | OAuth specifický pro poskytovatele |

### Směrování a konfigurace

| Koncový bod           | Metoda   | Popis                                     |
| --------------------- | -------- | ----------------------------------------- |
| `/api/models/alias`   | GET/POST | Aliasy modelů                             |
| `/api/models/catalog` | GET      | Všechny modely podle poskytovatele + typu |
| `/api/combos*`        | Různé    | Správa kombinací                          |
| `/api/keys*`          | Různé    | Správa klíčů API                          |
| `/api/pricing`        | GET      | Cena modelu                               |

### Využití a analýzy

| Koncový bod                 | Metoda | Popis                         |
| --------------------------- | ------ | ----------------------------- |
| `/api/usage/history`        | GET    | Historie používání            |
| `/api/usage/logs`           | GET    | Protokoly používání           |
| `/api/usage/request-logs`   | GET    | Protokoly na úrovni požadavků |
| `/api/usage/[connectionId]` | GET    | Využití na připojení          |

### Nastavení

| Koncový bod                     | Metoda  | Popis                                  |
| ------------------------------- | ------- | -------------------------------------- |
| `/api/settings`                 | GET/PUT | Obecná nastavení                       |
| `/api/settings/proxy`           | GET/PUT | Konfigurace síťového proxy serveru     |
| `/api/settings/proxy/test`      | POST    | Testovací připojení k proxy serveru    |
| `/api/settings/ip-filter`       | GET/PUT | Seznam povolených/blokovaných IP adres |
| `/api/settings/thinking-budget` | GET/PUT | Zdůvodnění rozpočtu tokenů             |
| `/api/settings/system-prompt`   | GET/PUT | Globální systémový výzva               |

### Monitorování

| Koncový bod              | Metoda     | Popis                           |
| ------------------------ | ---------- | ------------------------------- |
| `/api/sessions`          | GET        | Sledování aktivních relací      |
| `/api/rate-limits`       | GET        | Limity sazeb na účet            |
| `/api/monitoring/health` | GET        | Kontrola stavu                  |
| `/api/cache`             | GET/DELETE | Statistiky mezipaměti / vymazat |

### Zálohování a export/import

| Koncový bod                 | Metoda | Popis                                          |
| --------------------------- | ------ | ---------------------------------------------- |
| `/api/db-backups`           | GET    | Seznam dostupných záloh                        |
| `/api/db-backups`           | DÁT    | Vytvořte ruční zálohu                          |
| `/api/db-backups`           | POST   | Obnovení z konkrétní zálohy                    |
| `/api/db-backups/export`    | GET    | Stáhnout databázi jako soubor .sqlite          |
| `/api/db-backups/import`    | POST   | Nahrajte soubor .sqlite pro nahrazení databáze |
| `/api/db-backups/exportAll` | GET    | Stáhnout plnou zálohu jako archiv .tar.gz      |

### Synchronizace s cloudem

| Koncový bod            | Metoda | Popis                           |
| ---------------------- | ------ | ------------------------------- |
| `/api/sync/cloud`      | Různé  | Operace synchronizace s cloudem |
| `/api/sync/initialize` | POST   | Inicializovat synchronizaci     |
| `/api/cloud/*`         | Různé  | Správa cloudu                   |

### Nástroje CLI

| Koncový bod                        | Metoda | Popis                                    |
| ---------------------------------- | ------ | ---------------------------------------- |
| `/api/cli-tools/claude-settings`   | GET    | Stav Clauda CLI                          |
| `/api/cli-tools/codex-settings`    | GET    | Stav příkazového řádku Codexu            |
| `/api/cli-tools/droid-settings`    | GET    | Stav příkazového řádku Droidu            |
| `/api/cli-tools/openclaw-settings` | GET    | Stav rozhraní příkazového řádku OpenClaw |
| `/api/cli-tools/runtime/[toolId]`  | GET    | Generické běhové prostředí CLI           |

Mezi odpovědi CLI patří: `installed` , `runnable` , `command` , `commandPath` , `runtimeMode` , `reason` .

### Agenti ACP

| Koncový bod       | Metoda  | Popis                                                                         |
| ----------------- | ------- | ----------------------------------------------------------------------------- |
| `/api/acp/agents` | GET     | Zobrazit seznam všech detekovaných agentů (vestavěných + vlastních) se stavem |
| `/api/acp/agents` | POST    | Přidat vlastního agenta nebo obnovit mezipaměť detekce                        |
| `/api/acp/agents` | VYMAZAT | Odebrání vlastního agenta podle parametru dotazu `id`                         |

Odpověď GET obsahuje `agents[]` (id, name, binary, version, installed, protocol, isCustom) a `summary` (total, installed, notFound, builtIn, custom).

### Odolnost a limity rychlosti

| Koncový bod             | Metoda  | Popis                                   |
| ----------------------- | ------- | --------------------------------------- |
| `/api/resilience`       | GET/PUT | Získání/aktualizace profilů odolnosti   |
| `/api/resilience/reset` | POST    | Resetujte jističe                       |
| `/api/rate-limits`      | GET     | Stav limitu sazby na účet               |
| `/api/rate-limit`       | GET     | Konfigurace globálního limitu rychlosti |

### Evals

| Koncový bod  | Metoda   | Popis                                  |
| ------------ | -------- | -------------------------------------- |
| `/api/evals` | GET/POST | Vypsat eval sady / spustit vyhodnocení |

### Zásady

| Koncový bod     | Metoda          | Popis                    |
| --------------- | --------------- | ------------------------ |
| `/api/policies` | GET/POST/DELETE | Správa směrovacích zásad |

### Dodržování

| Koncový bod                 | Metoda | Popis                              |
| --------------------------- | ------ | ---------------------------------- |
| `/api/compliance/audit-log` | GET    | Protokol auditu shody (poslední N) |

### v1beta (kompatibilní s Gemini)

| Koncový bod                | Metoda | Popis                                |
| -------------------------- | ------ | ------------------------------------ |
| `/v1beta/models`           | GET    | Seznam modelů ve formátu Gemini      |
| `/v1beta/models/{...path}` | POST   | Koncový bod Gemini `generateContent` |

Tyto koncové body zrcadlí formát API Gemini pro klienty, kteří očekávají nativní kompatibilitu sady Gemini SDK.

### Interní / systémová API

| Koncový bod     | Metoda | Popis                                                           |
| --------------- | ------ | --------------------------------------------------------------- |
| `/api/init`     | GET    | Kontrola inicializace aplikace (používá se při prvním spuštění) |
| `/api/tags`     | GET    | Tagy modelů kompatibilní s Ollamou (pro klienty Ollamy)         |
| `/api/restart`  | POST   | Spustit řádný restart serveru                                   |
| `/api/shutdown` | POST   | Spustit řádné vypnutí serveru                                   |

> **Poznámka:** Tyto koncové body používá interně systém nebo pro kompatibilitu s klienty Ollama. Koncoví uživatelé je obvykle nevolají.

---

## Přepis zvuku

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Přepisujte zvukové soubory pomocí Deepgramu nebo AssemblyAI.

**Žádost:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Odpověď:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Podporovaní poskytovatelé:** `deepgram/nova-3` , `assemblyai/best` .

**Podporované formáty:** `mp3` , `wav` , `m4a` , `flac` , `ogg` , `webm` .

---

## Kompatibilita s Ollamou

Pro klienty, kteří používají formát API od Ollamy:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Požadavky jsou automaticky překládány mezi formátem Ollama a interním formátem.

---

## Telemetrie

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Odpověď:**

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

## Dostupnost modelu

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

## Zpracování žádosti

1. Klient odesílá požadavek na `/v1/*`
2. Obslužná rutina trasy volá `handleChat` , `handleEmbedding` , `handleAudioTranscription` nebo `handleImageGeneration`
3. Model je vyřešen (přímý poskytovatel/model nebo alias/kombinace)
4. Přihlašovací údaje vybrané z lokální databáze s filtrováním dostupnosti účtů
5. Pro chat: `handleChatCore` — detekce formátu, překlad, kontrola mezipaměti, kontrola idempotence
6. Prováděcí program poskytovatele odesílá požadavek nadřazenému serveru
7. Odpověď přeložena zpět do klientského formátu (chat) nebo vrácena tak, jak je (vložené prvky/obrázky/zvuk)
8. Zaznamenáno použití/protokolování
9. Záložní metoda se použije na chyby podle pravidel kombinace.

Úplný referenční popis architektury: [`ARCHITECTURE.md`](ARCHITECTURE.md)

---

## Ověřování

- Trasy dashboardu ( `/dashboard/*` ) používají soubor cookie `auth_token`
- Přihlášení používá uložený hash hesla; záložní nastavení je `INITIAL_PASSWORD`
- `requireLogin` lze přepínat přes `/api/settings/require-login`
- Trasy `/v1/*` volitelně vyžadují klíč API nosiče, pokud `REQUIRE_API_KEY=true`
