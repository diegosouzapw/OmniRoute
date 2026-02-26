# Dokumentacja API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Pełna dokumentacja dla wszystkich punktów końcowych API OmniRoute.

---

## Spis treści

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

## Zakończenie czatu

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

### Niestandardowe nagłówki

| Nagłówek                 | Kierunek  | Opis                                              |
| ------------------------ | --------- | ------------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Prośba    | Ustaw na `true`, aby ominąć pamięć podręczną      |
| `X-OmniRoute-Progress`   | Prośba    | Ustaw na `true` dla zdarzeń postępu               |
| `Idempotency-Key`        | Prośba    | Klucz deduplikacji (okno 5s)                      |
| `X-Request-Id`           | Prośba    | Alternatywny klucz deduplikacji                   |
| `X-OmniRoute-Cache`      | Odpowiedź | `HIT` lub `MISS` (bez przesyłania strumieniowego) |
| `X-OmniRoute-Idempotent` | Odpowiedź | `true` w przypadku deduplikacji                   |
| `X-OmniRoute-Progress`   | Odpowiedź | `enabled`, jeśli śledzenie postępu                |

---

## Osadzenia

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Dostępni dostawcy: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Generowanie obrazu

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

Dostępni dostawcy: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Lista modeli

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Punkty końcowe zgodności

| Metoda   | Ścieżka                     | Formatuj                     |
| -------- | --------------------------- | ---------------------------- |
| POST     | `/v1/chat/completions`      | OpenAI                       |
| POST     | `/v1/messages`              | Antropiczny                  |
| POST     | `/v1/responses`             | Odpowiedzi OpenAI            |
| POST     | `/v1/embeddings`            | OpenAI                       |
| POST     | `/v1/images/generations`    | OpenAI                       |
| OTRZYMAJ | `/v1/models`                | OpenAI                       |
| POST     | `/v1/messages/count_tokens` | Antropiczny                  |
| OTRZYMAJ | `/v1beta/models`            | Bliźnięta                    |
| POST     | `/v1beta/models/{...path}`  | Bliźnięta generują zawartość |
| POST     | `/v1/api/chat`              | Ollama                       |

### Dedykowane trasy dostawców

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Prefiks dostawcy jest dodawany automatycznie, jeśli go brakuje. Niedopasowane modele zwracają `400`.

---

## Pamięć podręczna semantyczna

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Przykład odpowiedzi:

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

## Panel i zarządzanie

### Uwierzytelnianie

| Punkt końcowy                 | Metoda        | Opis                        |
| ----------------------------- | ------------- | --------------------------- |
| `/api/auth/login`             | POST          | Zaloguj                     |
| `/api/auth/logout`            | POST          | Wyloguj                     |
| `/api/settings/require-login` | POBIERZ/WSTAW | Przełącz wymagane logowanie |

### Zarządzanie dostawcami

| Punkt końcowy                | Metoda            | Opis                          |
| ---------------------------- | ----------------- | ----------------------------- |
| `/api/providers`             | POBIERZ/WYŚLIJ    | Lista / tworzenie dostawców   |
| `/api/providers/[id]`        | POBIERZ/PUT/USUŃ  | Zarządzaj dostawcą            |
| `/api/providers/[id]/test`   | POST              | Połączenie z dostawcą testów  |
| `/api/providers/[id]/models` | OTRZYMAJ          | Lista modeli dostawców        |
| `/api/providers/validate`    | POST              | Sprawdź konfigurację dostawcy |
| `/api/provider-nodes*`       | Różne             | Zarządzanie węzłami dostawcy  |
| `/api/provider-models`       | POBIERZ/POST/USUŃ | Modele niestandardowe         |

### Przepływy OAuth

| Punkt końcowy                    | Metoda | Opis                           |
| -------------------------------- | ------ | ------------------------------ |
| `/api/oauth/[provider]/[action]` | Różne  | OAuth specyficzne dla dostawcy |

### Routing i konfiguracja

| Punkt końcowy         | Metoda         | Opis                                   |
| --------------------- | -------------- | -------------------------------------- |
| `/api/models/alias`   | POBIERZ/WYŚLIJ | Aliasy modeli                          |
| `/api/models/catalog` | OTRZYMAJ       | Wszystkie modele według dostawcy + typ |
| `/api/combos*`        | Różne          | Zarządzanie kombinacjami               |
| `/api/keys*`          | Różne          | Zarządzanie kluczami API               |
| `/api/pricing`        | OTRZYMAJ       | Ceny modeli                            |

### Wykorzystanie i analityka

| Punkt końcowy               | Metoda   | Opis                          |
| --------------------------- | -------- | ----------------------------- |
| `/api/usage/history`        | OTRZYMAJ | Historia użytkowania          |
| `/api/usage/logs`           | OTRZYMAJ | Dzienniki użytkowania         |
| `/api/usage/request-logs`   | OTRZYMAJ | Dzienniki na poziomie żądania |
| `/api/usage/[connectionId]` | OTRZYMAJ | Użycie na połączenie          |

### Ustawienia

| Punkt końcowy                   | Metoda        | Opis                                     |
| ------------------------------- | ------------- | ---------------------------------------- |
| `/api/settings`                 | POBIERZ/WSTAW | Ustawienia ogólne                        |
| `/api/settings/proxy`           | POBIERZ/WSTAW | Konfiguracja serwera proxy sieci         |
| `/api/settings/proxy/test`      | POST          | Testuj połączenie proxy                  |
| `/api/settings/ip-filter`       | POBIERZ/WSTAW | Lista dozwolonych/blokowanych adresów IP |
| `/api/settings/thinking-budget` | POBIERZ/WSTAW | Rozumowanie budżetu symbolicznego        |
| `/api/settings/system-prompt`   | POBIERZ/WSTAW | Globalny monit systemowy                 |

### Monitorowanie

| Punkt końcowy            | Metoda       | Opis                                    |
| ------------------------ | ------------ | --------------------------------------- |
| `/api/sessions`          | OTRZYMAJ     | Śledzenie aktywnej sesji                |
| `/api/rate-limits`       | OTRZYMAJ     | Limity stawek za konto                  |
| `/api/monitoring/health` | OTRZYMAJ     | Kontrola stanu zdrowia                  |
| `/api/cache`             | POBIERZ/USUŃ | Statystyki pamięci podręcznej / wyczyść |

### Kopia zapasowa i eksport/import

| Punkt końcowy               | Metoda   | Opis                                               |
| --------------------------- | -------- | -------------------------------------------------- |
| `/api/db-backups`           | OTRZYMAJ | Lista dostępnych kopii zapasowych                  |
| `/api/db-backups`           | POSTAW   | Utwórz ręczną kopię zapasową                       |
| `/api/db-backups`           | POST     | Przywróć z określonej kopii zapasowej              |
| `/api/db-backups/export`    | OTRZYMAJ | Pobierz bazę danych jako plik .sqlite              |
| `/api/db-backups/import`    | POST     | Prześlij plik .sqlite, aby zastąpić bazę danych    |
| `/api/db-backups/exportAll` | OTRZYMAJ | Pobierz pełną kopię zapasową jako archiwum .tar.gz |

### Synchronizacja z chmurą

| Punkt końcowy          | Metoda | Opis                              |
| ---------------------- | ------ | --------------------------------- |
| `/api/sync/cloud`      | Różne  | Operacje synchronizacji w chmurze |
| `/api/sync/initialize` | POST   | Zainicjuj synchronizację          |
| `/api/cloud/*`         | Różne  | Zarządzanie chmurą                |

### Narzędzia CLI

| Punkt końcowy                      | Metoda   | Opis                             |
| ---------------------------------- | -------- | -------------------------------- |
| `/api/cli-tools/claude-settings`   | OTRZYMAJ | Stan CLI Claude'a                |
| `/api/cli-tools/codex-settings`    | OTRZYMAJ | Stan CLI Kodeksu                 |
| `/api/cli-tools/droid-settings`    | OTRZYMAJ | Stan CLI droida                  |
| `/api/cli-tools/openclaw-settings` | OTRZYMAJ | Stan interfejsu CLI OpenClaw     |
| `/api/cli-tools/runtime/[toolId]`  | OTRZYMAJ | Ogólne środowisko wykonawcze CLI |

Odpowiedzi CLI obejmują: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Odporność i limity szybkości

| Punkt końcowy           | Metoda        | Opis                                     |
| ----------------------- | ------------- | ---------------------------------------- |
| `/api/resilience`       | POBIERZ/WSTAW | Pobierz/zaktualizuj profile odporności   |
| `/api/resilience/reset` | POST          | Zresetuj wyłączniki automatyczne         |
| `/api/rate-limits`      | OTRZYMAJ      | Stan limitu stawek za konto              |
| `/api/rate-limit`       | OTRZYMAJ      | Konfiguracja globalnego limitu szybkości |

### Obliczenia

| Punkt końcowy | Metoda         | Opis                                                  |
| ------------- | -------------- | ----------------------------------------------------- |
| `/api/evals`  | POBIERZ/WYŚLIJ | Lista zestawów ewaluacyjnych / uruchomienie ewaluacji |

### Zasady

| Punkt końcowy   | Metoda            | Opis                        |
| --------------- | ----------------- | --------------------------- |
| `/api/policies` | POBIERZ/POST/USUŃ | Zarządzaj zasadami routingu |

### Zgodność

| Punkt końcowy               | Metoda   | Opis                                   |
| --------------------------- | -------- | -------------------------------------- |
| `/api/compliance/audit-log` | OTRZYMAJ | Dziennik audytu zgodności (ostatnie N) |

### v1beta (kompatybilny z Gemini)

| Punkt końcowy              | Metoda   | Opis                                      |
| -------------------------- | -------- | ----------------------------------------- |
| `/v1beta/models`           | OTRZYMAJ | Lista modeli w formacie Gemini            |
| `/v1beta/models/{...path}` | POST     | Bliźnięta `generateContent` punkt końcowy |

Te punkty końcowe odzwierciedlają format API Gemini dla klientów, którzy oczekują natywnej zgodności Gemini SDK.

### Wewnętrzne/systemowe interfejsy API

| Punkt końcowy   | Metoda   | Opis                                                                   |
| --------------- | -------- | ---------------------------------------------------------------------- |
| `/api/init`     | OTRZYMAJ | Kontrola inicjalizacji aplikacji (używana przy pierwszym uruchomieniu) |
| `/api/tags`     | OTRZYMAJ | Tagi modeli zgodnych z Ollama (dla klientów Ollama)                    |
| `/api/restart`  | POST     | Wywołaj łagodny restart serwera                                        |
| `/api/shutdown` | POST     | Wywołaj łagodne zamknięcie serwera                                     |

> **Uwaga:** Te punkty końcowe są używane wewnętrznie przez system lub w celu zapewnienia zgodności z klientem Ollama. Zwykle nie są one wywoływane przez użytkowników końcowych.

---

## Transkrypcja audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkrypuj pliki audio za pomocą Deepgram lub AssemblyAI.

**Prośba:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Odpowiedź:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Obsługiwani dostawcy:** `deepgram/nova-3`, `assemblyai/best`.

**Obsługiwane formaty:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Zgodność z Ollamą

Dla klientów korzystających z formatu API Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Żądania są automatycznie tłumaczone pomiędzy formatami Ollama i formatami wewnętrznymi.

---

## Telemetria

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Odpowiedź:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Budżet

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

## Dostępność modelu

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

## Przetwarzanie żądania

1. Klient wysyła żądanie do `/v1/*`
2. Wywołania obsługi tras `handleChat`, `handleEmbedding`, `handleAudioTranscription` lub `handleImageGeneration`
3. Model został rozwiązany (bezpośredni dostawca/model lub alias/kombinacja)
4. Poświadczenia wybrane z lokalnej bazy danych z filtrowaniem dostępności kont
5. Dla czatu: `handleChatCore` — wykrywanie formatu, tłumaczenie, sprawdzanie pamięci podręcznej, sprawdzanie idempotencji
6. Wykonawca dostawcy wysyła żądanie upstream
7. Odpowiedź przetłumaczona z powrotem na format klienta (czat) lub zwrócona w niezmienionej postaci (osadzone elementy/obrazy/audio)
8. Zarejestrowano użycie/rejestrowanie
9. Rezerwa ma zastosowanie w przypadku błędów zgodnie z zasadami kombinacji

Pełne odniesienie do architektury: [link](ARCHITECTURE.md)

---

## Uwierzytelnianie

- Trasy panelu kontrolnego (`/dashboard/*`) korzystają z pliku cookie `auth_token`
- Logowanie wykorzystuje zapisany skrót hasła; powrót do `INITIAL_PASSWORD`
- `requireLogin` przełączane poprzez `/api/settings/require-login`
- `/v1/*` trasy opcjonalnie wymagają klucza API nośnika, gdy `REQUIRE_API_KEY=true`
