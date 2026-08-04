---
title: "Codex CLI — konfiguracja z OmniRoute"
version: 3.8.49
lastUpdated: 2026-07-26
---

# Codex CLI — konfiguracja z OmniRoute

Kompletny przewodnik po używaniu Codex CLI skierowanego na OmniRoute jako backend zgodny z OpenAI.

---

## Gotowy do wklejenia config.toml

Zastąp `<YOUR_HOST>` i `<YOUR_KEY>` swoimi wartościami:

```toml
# ~/.codex/config.toml
model                          = "cx/gpt-5.5"
model_provider                 = "omniroute"
model_reasoning_effort         = "xhigh"
model_context_window           = 400000
model_auto_compact_token_limit = 350000
tool_output_token_limit        = 32768    # history storage cap per tool call

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://<YOUR_HOST>:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
wire_api             = "responses"
```

```bash
# ~/.bashrc or ~/.zshrc — actual key value, never in config.toml
export OMNIROUTE_API_KEY="<YOUR_KEY>"
```

> **Typowe opcje hosta**
>
> | Dostęp       | URL                           |
> | ------------ | ----------------------------- |
> | Sieć lokalna | `http://192.168.0.1:20128/v1` |
> | Tailscale    | `http://100.x.x.x:20128/v1`   |
> | Loopback     | `http://localhost:20128/v1`   |

---

## `wire_api = "responses"` — dlaczego działa ze wszystkimi modelami

Codex CLI wycofało `wire_api = "chat"` (Chat Completions) w lutym 2026 i teraz **wymaga** `wire_api = "responses"` (OpenAI Responses API). Ustawienie `wire_api = "chat"` powoduje natychmiastowy crash przy starcie od v0.138.

DeepSeek, GLM, Kimi i inne udostępniają tylko endpoint Chat Completions — nie Responses API. Gdybyś skierował Codex bezpośrednio na nie, połączenie by się nie powiodło.

**OmniRoute rozwiązuje to w sposób przezroczysty:**

```
Codex CLI
  → wire_api = "responses"
  → POST /v1/responses (OmniRoute)
    → OmniRoute Responses ↔ Chat Completions transformer
    → POST /chat/completions (DeepSeek / Mistral / GLM / Kimi / any provider)
```

Przy OmniRoute nie potrzebujesz osobnego proxy tłumaczącego. **Wszystkie modele używają `wire_api = "responses"`** — resztę obsługuje OmniRoute.

> **`wire_api` jest domyślne** — pole domyślnie ma wartość `"responses"` i można je całkowicie pominąć w `config.toml`. Ustaw je jawnie tylko wtedy, gdy dokumentujesz intencję.

---

## Okno kontekstu i kompaktowanie

### Pola konfiguracji tokenów

| Pole                             | Opis                                                                                                                                                                               |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_context_window`           | Całkowity budżet tokenów aktywnego modelu. Ustaw na oficjalny limit modelu.                                                                                                        |
| `model_auto_compact_token_limit` | Próg uruchamiający automatyczne kompaktowanie historii. **Maksimum: 90% `model_context_window`** — wartości powyżej 90% są cicho ignorowane.                                       |
| `tool_output_token_limit`        | Limit tokenów zapisywanych w historii na wynik jednego wywołania narzędzia. Chroni przed zapełnieniem okna jedną dużą odpowiedzią. **To nie jest max output** — to limit historii. |
| `compact_prompt`                 | Wbudowane nadpisanie system promptu używanego podczas kompaktowania (v0.138+).                                                                                                     |

> **Uwaga o `model_max_output_tokens`**: To pole **nie należy do schematu konfiguracji Codex CLI** (brak w kodzie Rust Codex). Po ustawieniu jest cicho ignorowane. Nie polegaj na nim — użyj `tool_output_token_limit`, aby kontrolować, ile wyjścia narzędzi trafia do historii.

### Okna kontekstu według modelu

| Model                                | ID OmniRoute                         | Okno kontekstu           | `auto_compact` | `tool_output_limit` |
| ------------------------------------ | ------------------------------------ | ------------------------ | -------------- | ------------------- |
| GPT-5.5                              | `cx/gpt-5.5`                         | 400k wiarygodne (1M max) | 350,000        | 32,768              |
| Kimi K2.7 (thinking)                 | `kmc/kimi-k2.7`                      | 131,072                  | 112,000        | 32,768              |
| Kimi K2.6                            | `kmc/kimi-k2.6`                      | 131,072                  | 112,000        | 32,768              |
| GLM-5.2 / 5.2-max (thinking)         | `glm/glm-5.2`                        | 131,072                  | 112,000        | 32,768              |
| MiMo V2.5 Pro (thinking)             | `opencode-go/mimo-v2.5-pro`          | 131,072                  | 112,000        | 32,768              |
| Qwen 3.7 Plus (thinking)             | `opencode-go/qwen3.7-plus`           | 32,768                   | 28,000         | 16,384              |
| DeepSeek V4 Pro (OllamaCloud)        | `ollamacloud/deepseek-v4-pro`        | 131,072                  | 112,000        | 32,768              |
| DeepSeek V4 Pro                      | `ds/deepseek-v4-pro`                 | 1,000,000                | 900,000        | 65,536              |
| MiMo V2.5                            | `opencode-go/mimo-v2.5`              | 131,072                  | 112,000        | 32,768              |
| Gemma 4 31B (OllamaCloud)            | `ollamacloud/gemma4:31b`             | 32,768                   | 28,000         | 16,384              |
| Nemotron 3 Super (OllamaCloud)       | `ollamacloud/nemotron-3-super`       | 32,768                   | 28,000         | 16,384              |
| GPT-OSS 20B (OllamaCloud)            | `ollamacloud/gpt-oss:20b`            | 32,768                   | 28,000         | 16,384              |
| DeepSeek V4 Flash (OllamaCloud)      | `ollamacloud/deepseek-v4-flash`      | 65,536                   | 56,000         | 16,384              |
| Gemini 3 Flash Preview (OllamaCloud) | `ollamacloud/gemini-3-flash-preview` | 1,000,000                | 850,000        | 32,768              |
| GLM-5 Turbo                          | `glm/glm-5-turbo`                    | 131,072                  | 112,000        | 16,384              |
| GLM-4.7 Flash                        | `glm/glm-4.7-flash`                  | 131,072                  | 112,000        | 16,384              |
| Mistral Large Latest                 | `mistral/mistral-large-latest`       | 262,144                  | 220,000        | 16,384              |

> **Formuła kompaktowania:** `effective_window = model_context_window - min(tool_output_token_limit, 20000)`. Wartości powyżej 20k nie zmieniają progu kompaktowania.

> **Reguła kciuka:** ustaw `model_auto_compact_token_limit` na 85–88% `model_context_window`. Nigdy nie przekraczaj 90% — wartość zostanie cicho zignorowana.

---

## Prefiks modelu: `cx/`

Wszystkie modele Codex w OmniRoute używają prefiksu `cx/`:

| Nazwa w Codex CLI       | Model OmniRoute    |
| ----------------------- | ------------------ |
| `cx/gpt-5.5`            | GPT-5.5 standard   |
| `cx/gpt-5.4`            | GPT-5.4 standard   |
| `cx/gpt-5.4-mini`       | GPT-5.4 mini       |
| `cx/gpt-5.1-codex-mini` | GPT-5.1 Codex mini |

Inni providerzy używają własnego prefiksu (`kmc/`, `glm/`, `ds/`, `ollamacloud/`, `opencode-go/`, `mistral/`) — prefiks odpowiada aliasowi providera w OmniRoute.

---

## Reasoning Effort

Kontroluje, ile model „myśli” przed odpowiedzią.

| Wartość  | Zastosowanie                                    |
| -------- | ----------------------------------------------- |
| `none`   | Bez reasoning — bezpośrednia odpowiedź          |
| `low`    | Trywialne zadania (rename, format)              |
| `medium` | **Domyślne serwera**, gdy nie podano            |
| `high`   | Średnie zadania (refaktoryzacja, debug)         |
| `xhigh`  | Architektura, głęboka analiza, złożone problemy |

```bash
# Per invocation override
codex -c model_reasoning_effort=low "rename variable x to count"
codex -c model_reasoning_effort=xhigh "design the auth module"
```

---

## Profile — nazwane konfiguracje per model/workflow

Profile pozwalają przełączać model + okno kontekstu jedną flagą. Każdy profil to płaski
`~/.codex/<name>.config.toml`, który nakłada się na bazowy `config.toml`.

> **Reguła nazewnictwa (Codex CLI v0.137+):** plik musi być `~/.codex/<name>.config.toml` — **bez prefiksu `profile-`**.
> CLI rozwiązuje `-p kimi-k27` → `~/.codex/kimi-k27.config.toml`. Gdy pliku brak, cicho stosuje się domyślną konfigurację.

```bash
codex --profile kimi-k27 "analyze 10k lines of this codebase"
codex -p glm52 "architecture review"
codex --profile deepseek-flash "rename variable"   # fast, cheap
```

### Profile effort (ten sam model, różny effort)

```bash
codex -p low      # cx/gpt-5.5, effort=low
codex -p medium   # cx/gpt-5.5, effort=medium
codex -p high     # cx/gpt-5.5, effort=high
codex -p xhigh    # cx/gpt-5.5, effort=xhigh (default)
codex -p chat     # cx/gpt-5.5, no effort set (server default)
```

### Modele thinking (alto pensamento) — xhigh + szczegółowe podsumowanie

| Profil       | Model                       | Kontekst | Zastosowanie                     |
| ------------ | --------------------------- | -------- | -------------------------------- |
| `kimi-k27`   | `kmc/kimi-k2.7`             | 128k     | Najlepsza jakość thinking (Kimi) |
| `glm52`      | `glm/glm-5.2`               | 128k     | GLM thinking                     |
| `glm52max`   | `glm/glm-5.2-max`           | 128k     | GLM thinking max                 |
| `mimo-pro`   | `opencode-go/mimo-v2.5-pro` | 128k     | MiMo thinking                    |
| `qwen37plus` | `opencode-go/qwen3.7-plus`  | 32k      | Qwen thinking                    |

### Dobre modele (bons) — high effort

| Profil         | Model                         | Kontekst | Zastosowanie                             |
| -------------- | ----------------------------- | -------- | ---------------------------------------- |
| `kimi-k26`     | `kmc/kimi-k2.6`               | 128k     | Uniwersalne (Kimi)                       |
| `deepseek-pro` | `ollamacloud/deepseek-v4-pro` | 128k     | DeepSeek Pro przez OllamaCloud           |
| `deepseek`     | `ds/deepseek-v4-pro`          | 1M       | DeepSeek Pro bezpośrednio, duży kontekst |
| `mimo`         | `opencode-go/mimo-v2.5`       | 128k     | MiMo ogólny                              |

### Proste modele (simples) — bez reasoning effort

| Profil     | Model                          | Kontekst | Zastosowanie    |
| ---------- | ------------------------------ | -------- | --------------- |
| `gemma4`   | `ollamacloud/gemma4:31b`       | 32k      | Tani i zdolny   |
| `nemotron` | `ollamacloud/nemotron-3-super` | 32k      | NVIDIA Nemotron |
| `gptoss`   | `ollamacloud/gpt-oss:20b`      | 32k      | Open-source GPT |

### Szybkie modele — low effort

| Profil           | Model                                | Kontekst | Zastosowanie                 |
| ---------------- | ------------------------------------ | -------- | ---------------------------- |
| `deepseek-flash` | `ollamacloud/deepseek-v4-flash`      | 64k      | Szybkie zadania              |
| `gemini-flash`   | `ollamacloud/gemini-3-flash-preview` | 1M       | Bardzo szybki, duży kontekst |
| `glm5turbo`      | `glm/glm-5-turbo`                    | 128k     | GLM Turbo                    |
| `glm47flash`     | `glm/glm-4.7-flash`                  | 128k     | GLM Flash                    |
| `mistral`        | `mistral/mistral-large-latest`       | 256k     | Mistral Large                |

### Szybka tabela decyzyjna

| Zadanie                          | Zalecany profil                                   |
| -------------------------------- | ------------------------------------------------- |
| Rename, format, boilerplate      | `--profile deepseek-flash` lub `-p low`           |
| Wyjaśnienie, lekki review        | `-p chat` lub `-p gemini-flash`                   |
| Debug, umiarkowany refactor      | `-p medium` lub `-p kimi-k26`                     |
| Nowa funkcja, złożone testy      | `-p high` lub `-p mimo`                           |
| Architektura, głęboka analiza    | `-p kimi-k27` lub `-p glm52` lub `-p xhigh`       |
| Analiza codebase (wymaga 1M ctx) | `--profile deepseek` lub `--profile gemini-flash` |
| Maksymalna jakość thinking       | `-p glm52max` lub `-p mimo-pro`                   |
| Oszczędność kosztów              | `-p gemma4` lub `-p gptoss`                       |

---

## Automatyczne generowanie profili przez `omniroute setup-codex`

Gdy OmniRoute działa na VPS, możesz automatycznie wygenerować pliki profili z żywego katalogu modeli:

```bash
# From a VPS (uses local OmniRoute on port 20128)
omniroute setup-codex

# From any machine — point at your VPS
omniroute setup-codex --remote http://100.x.x.x:20128 --api-key sk-xxx

# Preview without writing files
omniroute setup-codex --remote http://100.x.x.x:20128 --dry-run

# Only generate GLM and Kimi profiles
omniroute setup-codex --only glm,kimi

# Write to a custom directory
omniroute setup-codex --codex-home /path/to/.codex
```

Polecenie pobiera `/v1/models`, używa dopasowanych profili dla znanych modeli, a dla pozostałych zgodnych modeli tekstowych sięga po metadane katalogu i zapisuje `~/.codex/<name>.config.toml` dla każdego. Idempotentne — bezpieczne do ponownego uruchomienia.

OmniRoute może też **automatycznie synchronizować** te same pliki profili po udanym discovery/import modeli providera, gdy zmienia się żywy katalog. To opcja **opt-in, domyślnie wyłączona**: włącz ją w **dashboardzie CLI Code** („CLI profile auto-sync” → Codex) albo ustaw `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES=true` (uwzględnia też `CLI_ALLOW_CONFIG_WRITES`, domyślnie włączone). Po włączeniu zapisuje tylko osobne pliki profili `~/.codex/*.config.toml`; nigdy nie zmienia aktywnego/domyślnego `~/.codex/config.toml`, ustawień Codex-lb, auth ani wyboru providera.

---

## Uruchamianie Codex przez `omniroute launch-codex`

Sprawdza health instancji OmniRoute przed uruchomieniem Codex:

```bash
# Launch against local OmniRoute (default port 20128)
omniroute launch-codex

# Launch with a specific profile
omniroute launch-codex --profile kimi-k27

# Launch against a remote VPS
omniroute launch-codex --remote http://100.x.x.x:20128/v1 --api-key sk-xxx

# Pass extra args to codex
omniroute launch-codex --profile glm52 -- --yolo "fix this bug"
```

---

## Nowe funkcje Codex CLI (v0.138–v0.141)

| Wersja | Funkcja                                                                                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v0.138 | Handoff do aplikacji desktop (`/app`), personal access tokens v2, `--profile` jako wyłączny selektor profilu (legacy tabele `[profiles]` w pliku crashują przy starcie) |
| v0.139 | `web_search = "live"` — natywne wyszukiwanie WWW z trybu code; `oneOf`/`allOf` w schematach narzędzi MCP; diagnostyka env `codex doctor`                                |
| v0.140 | Widok tokenów `/usage` w sesji; `/import` z sesji Claude Code; podkomenda `codex delete <SESSION_ID>`; auth Amazon Bedrock przez obiekt `aws` w konfiguracji providera  |
| v0.141 | Szyfrowany E2E Noise relay dla zdalnych executorów; poprawka SQLite WAL; wsparcie TLS P-521                                                                             |

### Nowe pola `config.toml` (po v0.137)

```toml
# Native web search (v0.139)
web_search = "live"   # "disabled" | "cached" | "live"

# Separate developer system prompt (v0.138)
developer_instructions = "Always prefer functional style."

# Custom compaction prompt
compact_prompt = "Summarise the above as bullet points."

# Route /review to a cheaper model
review_model = "glm/glm-5-turbo"

# OpenAI service tier
service_tier = "fast"   # "fast" | "flex"
```

### Nowe pola `[model_providers.<id>]`

```toml
[model_providers.omniroute]
base_url             = "http://100.x.x.x:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false

# Static extra headers on every request
[model_providers.omniroute.http_headers]
"X-Custom-Header" = "value"

# Headers read from env vars
[model_providers.omniroute.env_http_headers]
"X-Trace-Id" = "TRACE_ID"

# Extra URL query params (useful for Azure api-version)
[model_providers.omniroute.query_params]
"api-version" = "2024-12-01-preview"
```

### Auth Amazon Bedrock (v0.140)

```toml
[model_providers.bedrock]
base_url = "https://bedrock-runtime.us-east-1.amazonaws.com"

[model_providers.bedrock.aws]
profile = "default"   # ~/.aws/credentials profile
region  = "us-east-1"
```

---

## Wiele serwerów

```toml
[model_providers.omniroute-main]
base_url = "http://192.168.0.1:20128/v1"
env_key  = "OMNIROUTE_API_KEY"

[model_providers.omniroute-tailscale]
base_url = "http://100.x.x.x:20128/v1"
env_key  = "OMNIROUTE_API_KEY"
```

---

## Claude Code — równoważna konfiguracja

| Codex CLI (`config.toml`)         | Claude Code (zmienna env)             | Efekt                    |
| --------------------------------- | ------------------------------------- | ------------------------ |
| `tool_output_token_limit = 32768` | _(niedostępne bezpośrednio)_          | Limit historii per tool  |
| `model_context_window = 400000`   | _(określane przez model)_             | Okno kontekstu           |
| —                                 | `CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536` | Max tokenów na odpowiedź |

```bash
# ~/.bashrc — Claude Code token cap
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536
```

---

## Szybka ściągawka — flagi CLI

| Flaga                 | Krótka | Efekt                                            |
| --------------------- | ------ | ------------------------------------------------ |
| `--model <id>`        | `-m`   | Nadpisuje `model` dla tego wywołania             |
| `--profile <name>`    | `-p`   | Ładuje `~/.codex/<name>.config.toml`             |
| `--config key=value`  | `-c`   | Nadpisuje dowolne pole config.toml (powtarzalne) |
| `--enable <feature>`  | —      | Wymusza włączenie flagi funkcji                  |
| `--disable <feature>` | —      | Wymusza wyłączenie flagi funkcji                 |
| `--search`            | —      | Włącza live web search dla tego wywołania        |

Nowość w v0.140:

```bash
codex delete <SESSION_ID>          # delete a session
codex delete <SESSION_ID> --force  # skip confirmation
codex debug models --bundled       # list bundled model catalog as JSON
```

W sesji interaktywnej:

| Komenda   | Efekt                                     |
| --------- | ----------------------------------------- |
| `/model`  | Otwiera wybór modelu                      |
| `/usage`  | Pokazuje zużycie tokenów w sesji (v0.140) |
| `/app`    | Przekazuje do aplikacji desktop (v0.138)  |
| `/import` | Import sesji Claude Code (v0.140)         |
| `/help`   | Lista wszystkich komend slash             |

---

## Zadania długotrwałe

Dwa domyślne ustawienia OmniRoute mogą cicho psuć wielogodzinne sesje Codex CLI. Żadne nie jest ustawieniem Codex CLI — oba leżą po stronie OmniRoute. Użytkownicy migrujący konfigurację z upstreamowych proxy, które pinują konta i wyłączają idle cutoff, często trafiają na oba i wnioskują, że OmniRoute „nie utrzyma długiej sesji”.

| Objaw                                                                 | Prawdopodobna przyczyna                                         | Pokrętło                 |
| --------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------ |
| Sesja przełącza konta / ciągłość prompt-cache ginie między turami     | TTL session affinity to `0` (wyłączone)                         | `sessionAffinityTtlMs`   |
| Połączenie pada w trakcie reasoning bez komunikatu po stronie klienta | Watchdog idle streama odciął po 10 minutach bez chunka upstream | `STREAM_IDLE_TIMEOUT_MS` |

Powiązane dyskusje: [#7126](https://github.com/diegosouzapw/OmniRoute/discussions/7126) (zrywanie długich zadań), [#5718](https://github.com/diegosouzapw/OmniRoute/discussions/5718) (dlaczego affinity jest domyślnie wyłączone). Tracking: [#7287](https://github.com/diegosouzapw/OmniRoute/issues/7287).

### 1. Session affinity — przypnij jedną rozmowę do jednego konta

**Domyślnie:** `sessionAffinityTtlMs = 0` (wyłączone).

**Gdzie ustawić**

- Dashboard → **Settings → Routing** → **Session affinity** → **Affinity TTL (seconds)** (`ComboDefaultsTab`)
- Albo PATCH settings z `sessionAffinityTtlMs` w **milisekundach** (zakres Zod `0`–`86_400_000`, czyli do 24 godzin)

> Zmienione w #7274 z Codex-only `codexSessionAffinityTtlMs`. Legacy klucz jest nadal akceptowany jako alias tylko do odczytu; nowe konfiguracje powinny używać `sessionAffinityTtlMs`. Affinity dotyczy teraz **dowolnego** providera, gdy TTL jest powyżej `0`, nie tylko Codex — zobacz [`docs/architecture/RESILIENCE_GUIDE.md`](../architecture/RESILIENCE_GUIDE.md) → Session affinity.

**Co się psuje, gdy zostaje 0**

Każda tura wieloturownej rozmowy Codex jest routowana niezależnie przez aktywną strategię combo i może trafić na **inne konto w każdej turze**. To psuje ciągłość sesji upstream / prompt-cache. OmniRoute konsultuje nagłówki sesji Codex (`x-codex-session-id` / `x-session-id` / `x-omniroute-session`) oraz pola body takie jak `prompt_cache_key` / `session_id` tylko wtedy, gdy TTL jest większe niż `0` (`extractSessionAffinityKey` w `src/sse/services/auth.ts`).

**Zalecane dla wielogodzinnego pojedynczego zadania**

Ustaw TTL **powyżej spodziewanego czasu wall-clock zadania** (maks. w UI to **86400 sekund** = 24 godziny):

| Spodziewana długość zadania | Affinity TTL (UI, sekundy) | `sessionAffinityTtlMs` |
| --------------------------- | -------------------------- | ---------------------- |
| Kilka godzin                | `14400` (4h)               | `14400000`             |
| Noc / ~12h                  | `43200` (12h)              | `43200000`             |
| Cały dzień                  | `86400` (24h, maksimum)    | `86400000`             |

Opt-in jest celowe: wyłączenie affinity faworyzuje load-balancing między kontami; włączenie faworyzuje ciągłość jednej długiej sesji agenta. Ten przewodnik **nie** zmienia domyślnej wartości — operatorzy uruchamiający długie zadania Codex muszą włączyć to świadomie.

### 2. Stream idle timeout — nie odcinaj cichego reasoning

**Domyślnie:** `STREAM_IDLE_TIMEOUT_MS = 600000` (10 minut). Dziedziczy z `REQUEST_TIMEOUT_MS`, gdy nieustawione; wspólna baza to też 600000. Zobacz [`docs/guides/SETUP_GUIDE.md`](SETUP_GUIDE.md) → Timeouts.

**Co się psuje przy domyślnej wartości**

Tura reasoning / tool w Codex, która milczy dłużej niż 10 minut **bez prawdziwego chunka upstream**, jest siłowo zamykana przez SSE idle watchdog (`open-sse/utils/stream.ts`). Klient często widzi gołe zerwanie połączenia — zgodnie z „zatrzymało się automatycznie bez żadnego powiadomienia”.

Krytyczny szczegół: syntetyczny SSE **heartbeat OmniRoute nie resetuje** zegara idle. Tylko prawdziwy chunk body z upstream aktualizuje `lastChunkTime`. Cichy model, który nadal „myśli”, wygląda dla watchdogu tak samo jak zawieszony upstream.

Powiązana nieaktywność body Undici: `FETCH_BODY_TIMEOUT_MS` (też domyślnie ta sama 10-minutowa baza; `0` wyłącza). Przy streamingu `FETCH_TIMEOUT_MS` obejmuje tylko setup połączenia / pierwsze nagłówki — gdy stream jest aktywny, zawieszenia rządzą `STREAM_IDLE_TIMEOUT_MS` i `FETCH_BODY_TIMEOUT_MS`.

**Zalecane dla wielogodzinnego pojedynczego zadania**

W środowisku procesu OmniRoute (`.env` / compose / systemd):

```bash
# Disable stream idle + body inactivity cutoffs for long reasoning turns
STREAM_IDLE_TIMEOUT_MS=0
FETCH_BODY_TIMEOUT_MS=0
```

Albo podnieś je powyżej najdłuższej spodziewanej ciszy (wartości w milisekundach):

```bash
# Example: allow up to 2 hours of silence between upstream chunks
STREAM_IDLE_TIMEOUT_MS=7200000
FETCH_BODY_TIMEOUT_MS=7200000
```

Zrestartuj OmniRoute po zmianie tych zmiennych env.

### Konkretna recepta — wielogodzinne zadanie Codex

1. **Przypnij konto:** Dashboard → Settings → Routing → Session affinity → Affinity TTL = `43200` (12h) lub `86400` (max 24h).
2. **Podnieś / wyłącz idle cutoff** w środowisku OmniRoute:

```bash
STREAM_IDLE_TIMEOUT_MS=0
FETCH_BODY_TIMEOUT_MS=0
```

3. Zostaw zwykły Codex `config.toml` (`wire_api = "responses"`, poprawny `base_url`, `OMNIROUTE_API_KEY`) — po stronie Codex nie ma pokręteł affinity/idle dla tych dwóch zachowań.
4. Zrestartuj OmniRoute, potem uruchom długie zadanie Codex.

### Decyzja o domyślnych (#7287)

| Pokrętło                 | Domyślne przy shipie | Zmiana w tym przewodniku?                                                                         |
| ------------------------ | -------------------- | ------------------------------------------------------------------------------------------------- |
| `sessionAffinityTtlMs`   | `0` (wył.)           | **Nie** — pozostaje opt-in (load-balancing vs ciągłość; zob. Discussion #5718)                    |
| `STREAM_IDLE_TIMEOUT_MS` | `600000` (10 min)    | **Nie** — pozostaje 10 minut dla ogólnego ruchu; operatorzy długiego Codex podnoszą lub wyłączają |

Globalne przełączenie któregokolwiek domyślnego zmieniłoby zachowanie dla każdego klienta instancji, nie tylko Codex. Udokumentuj pokrętła; zostaw domyślne w spokoju, dopóki jawna decyzja operatora nie powie inaczej.

### Diagnozowanie odcięć idle

Gdy odpala się idle watchdog, OmniRoute loguje linię w stylu:

```text
[STREAM] Idle timeout: no data from codex for 600000ms (model: cx/gpt-5.5)
```

Grepuj `Idle timeout: no data from` (albo kod `stream_idle_timeout` / nazwę błędu `StreamIdleTimeoutError`). Segment providera to to, czego OmniRoute użyło dla tego requestu (`codex`, inny id providera albo `provider`, gdy nieznany) — nie zawsze jest to dosłowny string `codex`.

---

## Rozwiązywanie problemów

**`Error: wire_api = "chat" is no longer supported`**
Usuń `wire_api = "chat"` z konfiguracji. Ustaw `wire_api = "responses"` albo pomiń pole (domyślnie `"responses"` od v0.138).

**`Error: model not found`**
Sprawdź, czy model istnieje w OmniRoute z poprawnym prefiksem. Użyj `omniroute models list` albo otwórz `/dashboard/providers/<provider>`.

**`Authentication error`**
Potwierdź, że `OMNIROUTE_API_KEY` jest wyeksportowany: `echo $OMNIROUTE_API_KEY`.

**`Connection refused`**
Sprawdź, czy OmniRoute działa i że host/port w `base_url` jest poprawny dla Twojej sieci (lokalnie vs Tailscale vs VPS).

**Sesja crashuje blisko limitu kontekstu**
Ustaw jawnie `model_context_window` i `model_auto_compact_token_limit`. Zobacz tabelę okien kontekstu powyżej.

**Kompaktowanie odpala się za późno**
Obniż `model_auto_compact_token_limit` do 80–85% okna. Nigdy nie ustawiaj powyżej 90%.

**Profil się nie ładuje (`-p <name>` cicho ignorowane)**
Potwierdź, że plik istnieje pod `~/.codex/<name>.config.toml` (bez prefiksu `profile-`). Uruchom `ls ~/.codex/*.config.toml`.

**Długie zadanie Codex urywa się w trakcie / przełącza konta między turami**
Zobacz [Zadania długotrwałe](#zadania-długotrwałe). Włącz session affinity (TTL powyżej długości zadania) i podnieś lub wyłącz `STREAM_IDLE_TIMEOUT_MS` / `FETCH_BODY_TIMEOUT_MS`. Grepuj logi OmniRoute pod kątem `Idle timeout: no data from`.
