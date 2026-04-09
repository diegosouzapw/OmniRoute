# omniroute — Codebase Documentation (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CODEBASE_DOCUMENTATION.md) · 🇪🇸 [es](../../es/docs/CODEBASE_DOCUMENTATION.md) · 🇫🇷 [fr](../../fr/docs/CODEBASE_DOCUMENTATION.md) · 🇩🇪 [de](../../de/docs/CODEBASE_DOCUMENTATION.md) · 🇮🇹 [it](../../it/docs/CODEBASE_DOCUMENTATION.md) · 🇷🇺 [ru](../../ru/docs/CODEBASE_DOCUMENTATION.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CODEBASE_DOCUMENTATION.md) · 🇯🇵 [ja](../../ja/docs/CODEBASE_DOCUMENTATION.md) · 🇰🇷 [ko](../../ko/docs/CODEBASE_DOCUMENTATION.md) · 🇸🇦 [ar](../../ar/docs/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [hi](../../hi/docs/CODEBASE_DOCUMENTATION.md) · 🇮🇳 [in](../../in/docs/CODEBASE_DOCUMENTATION.md) · 🇹🇭 [th](../../th/docs/CODEBASE_DOCUMENTATION.md) · 🇻🇳 [vi](../../vi/docs/CODEBASE_DOCUMENTATION.md) · 🇮🇩 [id](../../id/docs/CODEBASE_DOCUMENTATION.md) · 🇲🇾 [ms](../../ms/docs/CODEBASE_DOCUMENTATION.md) · 🇳🇱 [nl](../../nl/docs/CODEBASE_DOCUMENTATION.md) · 🇵🇱 [pl](../../pl/docs/CODEBASE_DOCUMENTATION.md) · 🇸🇪 [sv](../../sv/docs/CODEBASE_DOCUMENTATION.md) · 🇳🇴 [no](../../no/docs/CODEBASE_DOCUMENTATION.md) · 🇩🇰 [da](../../da/docs/CODEBASE_DOCUMENTATION.md) · 🇫🇮 [fi](../../fi/docs/CODEBASE_DOCUMENTATION.md) · 🇵🇹 [pt](../../pt/docs/CODEBASE_DOCUMENTATION.md) · 🇷🇴 [ro](../../ro/docs/CODEBASE_DOCUMENTATION.md) · 🇭🇺 [hu](../../hu/docs/CODEBASE_DOCUMENTATION.md) · 🇧🇬 [bg](../../bg/docs/CODEBASE_DOCUMENTATION.md) · 🇸🇰 [sk](../../sk/docs/CODEBASE_DOCUMENTATION.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CODEBASE_DOCUMENTATION.md) · 🇮🇱 [he](../../he/docs/CODEBASE_DOCUMENTATION.md) · 🇵🇭 [phi](../../phi/docs/CODEBASE_DOCUMENTATION.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CODEBASE_DOCUMENTATION.md) · 🇨🇿 [cs](../../cs/docs/CODEBASE_DOCUMENTATION.md) · 🇹🇷 [tr](../../tr/docs/CODEBASE_DOCUMENTATION.md)

---

> En omfattende, nybegynnervennlig guide til**omniroute**multi-leverandør AI proxy-ruter.---

## 1. What Is omniroute?

omniroute er en**proxy-ruter**som sitter mellom AI-klienter (Claude CLI, Codex, Cursor IDE, etc.) og AI-leverandører (Anthropic, Google, OpenAI, AWS, GitHub, etc.). Det løser ett stort problem:

> **Ulike AI-klienter snakker forskjellige "språk" (API-formater), og forskjellige AI-leverandører forventer også forskjellige "språk".**omniroute oversetter mellom dem automatisk.

Tenk på det som en universell oversetter i FN - enhver delegat kan snakke hvilket som helst språk, og oversetteren konverterer det til en hvilken som helst annen delegat.---

## 2. Architecture Overview

```mermaid
graph LR
    subgraph Clients
        A[Claude CLI]
        B[Codex]
        C[Cursor IDE]
        D[OpenAI-compatible]
    end

    subgraph omniroute
        E[Handler Layer]
        F[Translator Layer]
        G[Executor Layer]
        H[Services Layer]
    end

    subgraph Providers
        I[Anthropic Claude]
        J[Google Gemini]
        K[OpenAI / Codex]
        L[GitHub Copilot]
        M[AWS Kiro]
        N[Antigravity]
        O[Cursor API]
    end

    A --> E
    B --> E
    C --> E
    D --> E
    E --> F
    F --> G
    G --> I
    G --> J
    G --> K
    G --> L
    G --> M
    G --> N
    G --> O
    H -.-> E
    H -.-> G
```

### Core Principle: Hub-and-Spoke Translation

All formatoversettelse går gjennom**OpenAI-formatet som navet**:```
Client Format → [OpenAI Hub] → Provider Format (request)
Provider Format → [OpenAI Hub] → Client Format (response)

```

Dette betyr at du bare trenger**N oversettere**(én per format) i stedet for**N²**(hvert par).---

## 3. Project Structure

```

omniroute/
├── open-sse/ ← Core proxy library (portable, framework-agnostic)
│ ├── index.js ← Main entry point, exports everything
│ ├── config/ ← Configuration & constants
│ ├── executors/ ← Provider-specific request execution
│ ├── handlers/ ← Request handling orchestration
│ ├── services/ ← Business logic (auth, models, fallback, usage)
│ ├── translator/ ← Format translation engine
│ │ ├── request/ ← Request translators (8 files)
│ │ ├── response/ ← Response translators (7 files)
│ │ └── helpers/ ← Shared translation utilities (6 files)
│ └── utils/ ← Utility functions
├── src/ ← Application layer (Express/Worker runtime)
│ ├── app/ ← Web UI, API routes, middleware
│ ├── lib/ ← Database, auth, and shared library code
│ ├── mitm/ ← Man-in-the-middle proxy utilities
│ ├── models/ ← Database models
│ ├── shared/ ← Shared utilities (wrappers around open-sse)
│ ├── sse/ ← SSE endpoint handlers
│ └── store/ ← State management
├── data/ ← Runtime data (credentials, logs)
│ └── provider-credentials.json (external credentials override, gitignored)
└── tester/ ← Test utilities

````

---

## 4. Module-by-Module Breakdown

### 4.1 Config (`open-sse/config/`)

**enkelt kilde til sannhet**for alle leverandørkonfigurasjoner.

| Fil | Formål |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `constants.ts` | `PROVIDERS`-objekt med basis-URL-er, OAuth-legitimasjon (standard), overskrifter og standard systemforespørsler for hver leverandør. Definerer også `HTTP_STATUS`, `ERROR_TYPES`, `COOLDOWN_MS`, `BACKOFF_CONFIG` og `SKIP_PATTERNS`. |
| `credentialLoader.ts` | Laster inn ekstern legitimasjon fra `data/provider-credentials.json` og slår dem sammen over de hardkodede standardinnstillingene i `PROVIDERS`. Holder hemmeligheter utenfor kildekontroll samtidig som bakoverkompatibiliteten opprettholdes.               |
| `providerModels.ts` | Sentralt modellregister: kartleverandøraliaser → modell-ID-er. Funksjoner som `getModels()`, `getProviderByAlias()`.                                                                                                          |
| `codexInstructions.ts` | Systeminstruksjoner injisert i Codex-forespørsler (redigeringsbegrensninger, sandkasseregler, godkjenningspolicyer).                                                                                                                 |
| `defaultThinkingSignature.ts` | Standard "tenkende" signaturer for Claude og Gemini-modeller.                                                                                                                                                               |
| `ollamaModels.ts` | Skjemadefinisjon for lokale Ollama-modeller (navn, størrelse, familie, kvantisering).                                                                                                                                             |#### Credential Loading Flow

```mermaid
flowchart TD
    A["App starts"] --> B["constants.ts defines PROVIDERS\nwith hardcoded defaults"]
    B --> C{"data/provider-credentials.json\nexists?"}
    C -->|Yes| D["credentialLoader reads JSON"]
    C -->|No| E["Use hardcoded defaults"]
    D --> F{"For each provider in JSON"}
    F --> G{"Provider exists\nin PROVIDERS?"}
    G -->|No| H["Log warning, skip"]
    G -->|Yes| I{"Value is object?"}
    I -->|No| J["Log warning, skip"]
    I -->|Yes| K["Merge clientId, clientSecret,\ntokenUrl, authUrl, refreshUrl"]
    K --> F
    H --> F
    J --> F
    F -->|Done| L["PROVIDERS ready with\nmerged credentials"]
    E --> L
````

---

### 4.2 Executors (`open-sse/executors/`)

Eksekutører kapsler inn**leverandørspesifikk logikk**ved å bruke**strategimønsteret**. Hver eksekutør overstyrer basismetoder etter behov.```mermaid
classDiagram
class BaseExecutor {
+buildUrl(model, stream, options)
+buildHeaders(credentials, stream, body)
+transformRequest(body, model, stream, credentials)
+execute(url, options)
+shouldRetry(status, error)
+refreshCredentials(credentials, log)
}

    class DefaultExecutor {
        +refreshCredentials()
    }

    class AntigravityExecutor {
        +buildUrl()
        +buildHeaders()
        +transformRequest()
        +shouldRetry()
        +refreshCredentials()
    }

    class CursorExecutor {
        +buildUrl()
        +buildHeaders()
        +transformRequest()
        +parseResponse()
        +generateChecksum()
    }

    class KiroExecutor {
        +buildUrl()
        +buildHeaders()
        +transformRequest()
        +parseEventStream()
        +refreshCredentials()
    }

    BaseExecutor <|-- DefaultExecutor
    BaseExecutor <|-- AntigravityExecutor
    BaseExecutor <|-- CursorExecutor
    BaseExecutor <|-- KiroExecutor
    BaseExecutor <|-- CodexExecutor
    BaseExecutor <|-- GeminiCLIExecutor
    BaseExecutor <|-- GithubExecutor

````

| Utfører | Leverandør | Nøkkelspesialiseringer |
| ---------------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `base.ts` | — | Abstrakt base: URL-bygging, overskrifter, logikk på nytt, oppdatering av legitimasjon |
| `default.ts` | Claude, Gemini, OpenAI, GLM, Kimi, MiniMax | Generisk OAuth-tokenoppdatering for standardleverandører |
| `antigravity.ts` | Google Cloud Code | Prosjekt-/sesjons-ID generering, multi-URL fallback, tilpasset gjenforsøk på parsing fra feilmeldinger ("tilbakestill etter 2t7m23s") |
| `cursor.ts` | Markør IDE |**Mest kompliserte**: SHA-256 kontrollsum-authorisont, Protobuf-forespørselskoding, binær EventStream → SSE-svarparsing |
| `codex.ts` | OpenAI Codex | Injiserer systeminstruksjoner, administrerer tenkenivåer, fjerner ustøttede parametere |
| `gemini-cli.ts` | Google Gemini CLI | Egendefinert URL-bygging (`streamGenerateContent`), oppdatering av Google OAuth-token |
| `github.ts` | GitHub Copilot | Dobbelt token-system (GitHub OAuth + Copilot-token), VSCode-header-etterligning |
| `kiro.ts` | AWS CodeWhisperer | AWS EventStream binær parsing, AMZN hendelsesrammer, token estimering |
| `index.ts` | — | Fabrikk: navn på kartleverandør → eksekveringsklasse, med standard reserve |---

### 4.3 Handlers (`open-sse/handlers/`)

**Orkestreringslaget**— koordinerer oversettelse, utførelse, strømming og feilhåndtering.

| Fil | Formål |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
| `chatCore.ts` |**Sentralorkester**(~600 linjer). Håndterer hele forespørselens livssyklus: formatdeteksjon → oversettelse → eksekveringssending → streaming/ikke-streaming-svar → token-oppdatering → feilhåndtering → brukslogging. |
| `responsesHandler.ts` | Adapter for OpenAIs Responses API: konverterer svarformat → Chatfullføringer → sender til `chatCore` → konverterer SSE tilbake til svarformat.                                                                        |
| `embeddings.ts` | Innebyggingsgenereringshåndterer: løser innbyggingsmodell → leverandør, sender til leverandør API, returnerer OpenAI-kompatibel innbyggingssvar. Støtter 6+ leverandører.                                                    |
| `imageGeneration.ts` | Bildegenereringshåndterer: løser bildemodell → leverandør, støtter OpenAI-kompatibel, Gemini-image (Antigravity) og fallback (Nebius) moduser. Returnerer base64- eller URL-bilder.                                          |#### Request Lifecycle (chatCore.ts)

```mermaid
sequenceDiagram
    participant Client
    participant chatCore
    participant Translator
    participant Executor
    participant Provider

    Client->>chatCore: Request (any format)
    chatCore->>chatCore: Detect source format
    chatCore->>chatCore: Check bypass patterns
    chatCore->>chatCore: Resolve model & provider
    chatCore->>Translator: Translate request (source → OpenAI → target)
    chatCore->>Executor: Get executor for provider
    Executor->>Executor: Build URL, headers, transform request
    Executor->>Executor: Refresh credentials if needed
    Executor->>Provider: HTTP fetch (streaming or non-streaming)

    alt Streaming
        Provider-->>chatCore: SSE stream
        chatCore->>chatCore: Pipe through SSE transform stream
        Note over chatCore: Transform stream translates<br/>each chunk: target → OpenAI → source
        chatCore-->>Client: Translated SSE stream
    else Non-streaming
        Provider-->>chatCore: JSON response
        chatCore->>Translator: Translate response
        chatCore-->>Client: Translated JSON
    end

    alt Error (401, 429, 500...)
        chatCore->>Executor: Retry with credential refresh
        chatCore->>chatCore: Account fallback logic
    end
````

---

### 4.4 Services (`open-sse/services/`)

| Forretningslogikk som støtter behandlerne og utførerne. | File                                                                                                                                                                                                                                                                                                                                   | Purpose |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `provider.ts`                                           | **Format detection** (`detectFormat`): analyzes request body structure to identify Claude/OpenAI/Gemini/Antigravity/Responses formats (includes `max_tokens` heuristic for Claude). Also: URL building, header building, thinking config normalization. Supports `openai-compatible-*` and `anthropic-compatible-*` dynamic providers. |
| `model.ts`                                              | Model string parsing (`claude/model-name` → `{provider: "claude", model: "model-name"}`), alias resolution with collision detection, input sanitization (rejects path traversal/control chars), and model info resolution with async alias getter support.                                                                             |
| `accountFallback.ts`                                    | Rate-limit handling: exponential backoff (1s → 2s → 4s → max 2min), account cooldown management, error classification (which errors trigger fallback vs. not).                                                                                                                                                                         |
| `tokenRefresh.ts`                                       | OAuth token refresh for **every provider**: Google (Gemini, Antigravity), Claude, Codex, Qwen, Qoder, GitHub (OAuth + Copilot dual-token), Kiro (AWS SSO OIDC + Social Auth). Includes in-flight promise deduplication cache and retry with exponential backoff.                                                                       |
| `combo.ts`                                              | **Combo models**: chains of fallback models. If model A fails with a fallback-eligible error, try model B, then C, etc. Returns actual upstream status codes.                                                                                                                                                                          |
| `usage.ts`                                              | Fetches quota/usage data from provider APIs (GitHub Copilot quotas, Antigravity model quotas, Codex rate limits, Kiro usage breakdowns, Claude settings).                                                                                                                                                                              |
| `accountSelector.ts`                                    | Smart account selection with scoring algorithm: considers priority, health status, round-robin position, and cooldown state to pick the optimal account for each request.                                                                                                                                                              |
| `contextManager.ts`                                     | Request context lifecycle management: creates and tracks per-request context objects with metadata (request ID, timestamps, provider info) for debugging and logging.                                                                                                                                                                  |
| `ipFilter.ts`                                           | IP-based access control: supports allowlist and blocklist modes. Validates client IP against configured rules before processing API requests.                                                                                                                                                                                          |
| `sessionManager.ts`                                     | Session tracking with client fingerprinting: tracks active sessions using hashed client identifiers, monitors request counts, and provides session metrics.                                                                                                                                                                            |
| `signatureCache.ts`                                     | Request signature-based deduplication cache: prevents duplicate requests by caching recent request signatures and returning cached responses for identical requests within a time window.                                                                                                                                              |
| `systemPrompt.ts`                                       | Global system prompt injection: prepends or appends a configurable system prompt to all requests, with per-provider compatibility handling.                                                                                                                                                                                            |
| `thinkingBudget.ts`                                     | Reasoning token budget management: supports passthrough, auto (strip thinking config), custom (fixed budget), and adaptive (complexity-scaled) modes for controlling thinking/reasoning tokens.                                                                                                                                        |
| `wildcardRouter.ts`                                     | Wildcard model pattern routing: resolves wildcard patterns (e.g., `*/claude-*`) to concrete provider/model pairs based on availability and priority.                                                                                                                                                                                   |

#### Token Refresh Deduplication

```mermaid
sequenceDiagram
    participant R1 as Request 1
    participant R2 as Request 2
    participant Cache as refreshPromiseCache
    participant OAuth as OAuth Provider

    R1->>Cache: getAccessToken("gemini", token)
    Cache->>Cache: No in-flight promise
    Cache->>OAuth: Start refresh
    R2->>Cache: getAccessToken("gemini", token)
    Cache->>Cache: Found in-flight promise
    Cache-->>R2: Return existing promise
    OAuth-->>Cache: New access token
    Cache-->>R1: New access token
    Cache-->>R2: Same access token (shared)
    Cache->>Cache: Delete cache entry
```

#### Account Fallback State Machine

```mermaid
stateDiagram-v2
    [*] --> Active
    Active --> Error: Request fails (401/429/500)
    Error --> Cooldown: Apply backoff
    Cooldown --> Active: Cooldown expires
    Active --> Active: Request succeeds (reset backoff)

    state Error {
        [*] --> ClassifyError
        ClassifyError --> ShouldFallback: Rate limit / Auth / Transient
        ClassifyError --> NoFallback: 400 Bad Request
    }

    state Cooldown {
        [*] --> ExponentialBackoff
        ExponentialBackoff: Level 0 = 1s
        ExponentialBackoff: Level 1 = 2s
        ExponentialBackoff: Level 2 = 4s
        ExponentialBackoff: Max = 2min
    }
```

#### Combo Model Chain

```mermaid
flowchart LR
    A["Request with\ncombo model"] --> B["Model A"]
    B -->|"2xx Success"| C["Return response"]
    B -->|"429/401/500"| D{"Fallback\neligible?"}
    D -->|Yes| E["Model B"]
    D -->|No| F["Return error"]
    E -->|"2xx Success"| C
    E -->|"429/401/500"| G{"Fallback\neligible?"}
    G -->|Yes| H["Model C"]
    G -->|No| F
    H -->|"2xx Success"| C
    H -->|"Fail"| I["All failed →\nReturn last status"]
```

---

### 4.5 Translator (`open-sse/translator/`)

**formatoversettelsesmotoren**bruker et selvregistrerende plugin-system.#### Arkitektur

```mermaid
graph TD
    subgraph "Request Translation"
        A["Claude → OpenAI"]
        B["Gemini → OpenAI"]
        C["Antigravity → OpenAI"]
        D["OpenAI Responses → OpenAI"]
        E["OpenAI → Claude"]
        F["OpenAI → Gemini"]
        G["OpenAI → Kiro"]
        H["OpenAI → Cursor"]
    end

    subgraph "Response Translation"
        I["Claude → OpenAI"]
        J["Gemini → OpenAI"]
        K["Kiro → OpenAI"]
        L["Cursor → OpenAI"]
        M["OpenAI → Claude"]
        N["OpenAI → Antigravity"]
        O["OpenAI → Responses"]
    end
```

| Katalog        | Filer         | Beskrivelse                                                                                                                                                                                                                                                    |
| -------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `forespørsel/` | 8 oversettere | Konverter forespørselstekster mellom formater. Hver fil registreres selv via `register(fra, til, fn)` ved import.                                                                                                                                              |
| `respons/`     | 7 oversettere | Konverter strømmeresponsbiter mellom formater. Håndterer SSE-hendelsestyper, tenkeblokker, verktøykall.                                                                                                                                                        |
| `hjelpere/`    | 6 hjelpere    | Delte verktøy: `claudeHelper` (uttrekking av systemprompt, tenkekonfig), `geminiHelper` (deler/innholdskartlegging), `openaiHelper` (formatfiltrering), `toolCallHelper` (ID-generering, manglende responsinjeksjon), `maxTokensHelper`, `responsesApiHelper`. |
| `index.ts`     | —             | Oversettelsesmotor: `translateRequest()`, `translateResponse()`, statsadministrasjon, register.                                                                                                                                                                |
| `formats.ts`   | —             | Formatkonstanter: `OPENAI`, `CLAUDE`, `GEMINI`, `ANTIGRAVITY`, `KIRO`, `CURSOR`, `OPENAI_RESPONSES`.                                                                                                                                                           | #### Key Design: Self-Registering Plugins |

```javascript
// Each translator file calls register() on import:
import { register } from "../index.js";
register("claude", "openai", translateClaudeToOpenAI);

// The index.js imports all translator files, triggering registration:
import "./request/claude-to-openai.js"; // ← self-registers
```

---

### 4.6 Utils (`open-sse/utils/`)

| Fil                | Formål                                                                                                                                                                                                                                                                               |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `error.ts`         | Bygging av feilrespons (OpenAI-kompatibelt format), oppstrøms feilparsing, Antigravity-utvinning på nytt fra feilmeldinger, SSE-feilstrømming.                                                                                                                                       |
| `stream.ts`        | **SSE Transform Stream**— kjernestrømmingsrørledningen. To moduser: 'OVERSET' (oversettelse i fullformat) og 'PASSTHROUGH' (normaliser + ekstrak bruk). Håndterer chunk-buffring, bruksestimat, sporing av innholdslengde. Per-stream koder/dekoderforekomster unngår delt tilstand. |
| `streamHelpers.ts` | SSE-verktøy på lavt nivå: `parseSSELine` (whitespace-tolerant), `hasValuableContent` (filtrerer tomme biter for OpenAI/Claude/Gemini), `fixInvalidId`, `formatSSE` (formatbevisst SSE-serialisering med `perf_metrics`-opprydding).                                                  |
| `usageTracking.ts` | Uttrekk av tokenbruk fra ethvert format (Claude/OpenAI/Gemini/Responses), estimering med separate verktøy/melding-char-per-token-forhold, buffertillegg (sikkerhetsmargin for 2000 tokens), formatspesifikk feltfiltrering, konsolllogging med ANSI-farger.                          |
| `requestLogger.ts` | Legacy file-based request logging helper kept for compatibility. Current deployments should prefer `APP_LOG_TO_FILE` for application logs and the call log pipeline for persisted request artifacts.                                                                                 |
| `bypassHandler.ts` | Avskjærer spesifikke mønstre fra Claude CLI (tittelutvinning, oppvarming, telling) og returnerer falske svar uten å ringe noen leverandør. Støtter både streaming og ikke-streaming. Med vilje begrenset til Claude CLI-omfang.                                                      |
| `networkProxy.ts`  | Løser utgående proxy-URL for en gitt leverandør med prioritet: leverandørspesifikk konfig → global konfig → miljøvariabler (`HTTPS_PROXY`/`HTTP_PROXY`/`ALL_PROXY`). Støtter "NO_PROXY"-ekskluderinger. Cacher konfigurasjon for 30s.                                                | #### SSE Streaming Pipeline |

```mermaid
flowchart TD
    A["Provider SSE stream"] --> B["TextDecoder\n(per-stream instance)"]
    B --> C["Buffer lines\n(split on newline)"]
    C --> D["parseSSELine()\n(trim whitespace, parse JSON)"]
    D --> E{"Mode?"}
    E -->|TRANSLATE| F["translateResponse()\ntarget → OpenAI → source"]
    E -->|PASSTHROUGH| G["fixInvalidId()\nnormalize chunk"]
    F --> H["hasValuableContent()\nfilter empty chunks"]
    G --> H
    H -->|"Has content"| I["extractUsage()\ntrack token counts"]
    H -->|"Empty"| J["Skip chunk"]
    I --> K["formatSSE()\nserialize + clean perf_metrics"]
    K --> L["TextEncoder\n(per-stream instance)"]
    L --> M["Enqueue to\nclient stream"]

    style A fill:#f9f,stroke:#333
    style M fill:#9f9,stroke:#333
```

#### Request Logger Session Structure

```
logs/
└── claude_gemini_claude-sonnet_20260208_143045/
    ├── 1_req_client.json      ← Raw client request
    ├── 2_req_source.json      ← After initial conversion
    ├── 3_req_openai.json      ← OpenAI intermediate format
    ├── 4_req_target.json      ← Final target format
    ├── 5_res_provider.txt     ← Provider SSE chunks (streaming)
    ├── 5_res_provider.json    ← Provider response (non-streaming)
    ├── 6_res_openai.txt       ← OpenAI intermediate chunks
    ├── 7_res_client.txt       ← Client-facing SSE chunks
    └── 6_error.json           ← Error details (if any)
```

---

### 4.7 Application Layer (`src/`)

| Katalog       | Formål                                                                    |
| ------------- | ------------------------------------------------------------------------- | ----------------------- |
| `src/app/`    | Web-UI, API-ruter, Express-mellomvare, OAuth-tilbakeringsbehandlere       |
| `src/lib/`    | Databasetilgang (`localDb.ts`, `usageDb.ts`), autentisering, delt         |
| `src/mitm/`   | Man-in-the-midten proxy-verktøy for å avskjære leverandørtrafikk          |
| `src/models/` | Databasemodelldefinisjoner                                                |
| `src/shared/` | Omslag rundt åpne-sse-funksjoner (leverandør, strøm, feil osv.)           |
| `src/sse/`    | SSE-endepunktbehandlere som kobler open-sse-biblioteket til Express-ruter |
| `src/store/`  | Søknadstilstandsadministrasjon                                            | #### Notable API Routes |

| Rute                                                | Metoder        | Formål                                                                                            |
| --------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------- | --- |
| `/api/leverandør-modeller`                          | GET/POST/SLETT | CRUD for tilpassede modeller per leverandør                                                       |
| `/api/modeller/katalog`                             | FÅ             | Samlet katalog over alle modeller (chat, innebygging, bilde, tilpasset) gruppert etter leverandør |
| `/api/settings/proxy`                               | GET/SETT/SLETT | Hierarkisk utgående proxy-konfigurasjon (`global/leverandører/kombinasjoner/nøkler`)              |
| `/api/settings/proxy/test`                          | INNLEGG        | Validerer proxy-tilkobling og returnerer offentlig IP/latency                                     |
| `/v1/providers/[provider]/chat/completions`         | INNLEGG        | Dedikerte chatfullføringer per leverandør med modellvalidering                                    |
| `/v1/providers/[provider]/embeddings`               | INNLEGG        | Dedikerte innbygginger per leverandør med modellvalidering                                        |
| `/v1/leverandører/[leverandør]/bilder/generasjoner` | INNLEGG        | Dedikert bildegenerering per leverandør med modellvalidering                                      |
| `/api/settings/ip-filter`                           | GET/SETT       | IP-godkjenningsliste/blokkeringslisteadministrasjon                                               |
| `/api/settings/tenkebudsjett`                       | GET/SETT       | Begrunnelse token budsjettkonfigurasjon (passthrough/auto/custom/adaptive)                        |
| `/api/settings/system-prompt`                       | GET/SETT       | Global systemprompt injeksjon for alle forespørsler                                               |
| `/api/sessions`                                     | FÅ             | Aktiv øktsporing og beregninger                                                                   |
| `/api/rate-limits`                                  | FÅ             | Satsgrensestatus per konto                                                                        | --- |

## 5. Key Design Patterns

### 5.1 Hub-and-Spoke Translation

Alle formater oversettes gjennom**OpenAI-formatet som navet**. Å legge til en ny leverandør krever bare å skrive**ett par**med oversettere (til/fra OpenAI), ikke N par.### 5.2 Executor Strategy Pattern

Hver leverandør har en dedikert eksekveringsklasse som arver fra `BaseExecutor`. Fabrikken i `executors/index.ts` velger den riktige ved kjøring.### 5.3 Self-Registering Plugin System

Oversettermoduler registrerer seg ved import via `register()`. Å legge til en ny oversetter er bare å lage en fil og importere den.### 5.4 Account Fallback with Exponential Backoff

Når en leverandør returnerer 429/401/500, kan systemet bytte til neste konto ved å bruke eksponentielle nedkjølinger (1s → 2s → 4s → maks 2min).### 5.5 Combo Model Chains

En "combo" grupperer flere `leverandør/modell`-strenger. Hvis den første mislykkes, fall tilbake til den neste automatisk.### 5.6 Stateful Streaming Translation

Responsoversettelse opprettholder tilstanden på tvers av SSE-biter (tenkeblokksporing, akkumulering av verktøykall, indeksering av innholdsblokker) via `initState()`-mekanismen.### 5.7 Usage Safety Buffer

En buffer på 2000 tokener legges til rapportert bruk for å hindre klienter i å nå grenser for kontekstvindu på grunn av overhead fra systemforespørsler og formatoversettelse.---

## 6. Supported Formats

| Format                   | Retning     | Identifikator     |
| ------------------------ | ----------- | ----------------- | --- |
| OpenAI Chat-fullføringer | kilde + mål | `openai`          |
| OpenAI Responses API     | kilde + mål | `openai-svar`     |
| Antropiske Claude        | kilde + mål | `claude`          |
| Google Gemini            | kilde + mål | `tvilling`        |
| Google Gemini CLI        | kun mål     | `gemini-cli`      |
| Antigravitasjon          | kilde + mål | `antigravitasjon` |
| AWS Kiro                 | kun mål     | `kiro`            |
| Markør                   | kun mål     | `markør`          | --- |

## 7. Supported Providers

| Leverandør               | Auth metode               | Utfører         | Nøkkelnotater                                                                |
| ------------------------ | ------------------------- | --------------- | ---------------------------------------------------------------------------- | --- |
| Antropiske Claude        | API-nøkkel eller OAuth    | Standard        | Bruker "x-api-key" header                                                    |
| Google Gemini            | API-nøkkel eller OAuth    | Standard        | Bruker "x-goog-api-key" header                                               |
| Google Gemini CLI        | OAuth                     | GeminiCLI       | Bruker `streamGenerateContent`-endepunkt                                     |
| Antigravitasjon          | OAuth                     | Antigravitasjon | Tilbakestilling av flere nettadresser, egendefinert prøv å analysere på nytt |
| OpenAI                   | API-nøkkel                | Standard        | Standard bærer auth                                                          |
| Codex                    | OAuth                     | Codex           | Injiserer systeminstruksjoner, styrer tenkning                               |
| GitHub Copilot           | OAuth + Copilot-token     | Github          | Dobbelt token, VSCode header-etterligning                                    |
| Kiro (AWS)               | AWS SSO OIDC eller Social | Kiro            | Binær EventStream-parsing                                                    |
| Markør IDE               | Sjekksum auth             | Markør          | Protobuf-koding, SHA-256 kontrollsummer                                      |
| Qwen                     | OAuth                     | Standard        | Standard auth                                                                |
| Qoder                    | OAuth (Basic + Bearer)    | Standard        | Dobbel autentiseringshode                                                    |
| OpenRouter               | API-nøkkel                | Standard        | Standard bærer auth                                                          |
| GLM, Kimi, MiniMax       | API-nøkkel                | Standard        | Claude-kompatibel, bruk `x-api-key`                                          |
| `openai-kompatibel-*`    | API-nøkkel                | Standard        | Dynamisk: ethvert OpenAI-kompatibelt endepunkt                               |
| `antropisk-kompatibel-*` | API-nøkkel                | Standard        | Dynamisk: ethvert Claude-kompatibelt endepunkt                               | --- |

## 8. Data Flow Summary

### Streaming Request

```mermaid
flowchart LR
    A["Client"] --> B["detectFormat()"]
    B --> C["translateRequest()\nsource → OpenAI → target"]
    C --> D["Executor\nbuildUrl + buildHeaders"]
    D --> E["fetch(providerURL)"]
    E --> F["createSSEStream()\nTRANSLATE mode"]
    F --> G["parseSSELine()"]
    G --> H["translateResponse()\ntarget → OpenAI → source"]
    H --> I["extractUsage()\n+ addBuffer"]
    I --> J["formatSSE()"]
    J --> K["Client receives\ntranslated SSE"]
    K --> L["logUsage()\nsaveRequestUsage()"]
```

### Non-Streaming Request

```mermaid
flowchart LR
    A["Client"] --> B["detectFormat()"]
    B --> C["translateRequest()\nsource → OpenAI → target"]
    C --> D["Executor.execute()"]
    D --> E["translateResponse()\ntarget → OpenAI → source"]
    E --> F["Return JSON\nresponse"]
```

### Bypass Flow (Claude CLI)

```mermaid
flowchart LR
    A["Claude CLI request"] --> B{"Match bypass\npattern?"}
    B -->|"Title/Warmup/Count"| C["Generate fake\nOpenAI response"]
    B -->|"No match"| D["Normal flow"]
    C --> E["Translate to\nsource format"]
    E --> F["Return without\ncalling provider"]
```
