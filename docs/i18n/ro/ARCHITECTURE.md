# Arhitectura OmniRoute

🌐 **Languages:** 🇺🇸 [English](../../ARCHITECTURE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/ARCHITECTURE.md) | 🇪🇸 [Español](../es/ARCHITECTURE.md) | 🇫🇷 [Français](../fr/ARCHITECTURE.md) | 🇮🇹 [Italiano](../it/ARCHITECTURE.md) | 🇷🇺 [Русский](../ru/ARCHITECTURE.md) | 🇨🇳 [中文 (简体)](../zh-CN/ARCHITECTURE.md) | 🇩🇪 [Deutsch](../de/ARCHITECTURE.md) | 🇮🇳 [हिन्दी](../in/ARCHITECTURE.md) | 🇹🇭 [ไทย](../th/ARCHITECTURE.md) | 🇺🇦 [Українська](../uk-UA/ARCHITECTURE.md) | 🇸🇦 [العربية](../ar/ARCHITECTURE.md) | 🇯🇵 [日本語](../ja/ARCHITECTURE.md) | 🇻🇳 [Tiếng Việt](../vi/ARCHITECTURE.md) | 🇧🇬 [Български](../bg/ARCHITECTURE.md) | 🇩🇰 [Dansk](../da/ARCHITECTURE.md) | 🇫🇮 [Suomi](../fi/ARCHITECTURE.md) | 🇮🇱 [עברית](../he/ARCHITECTURE.md) | 🇭🇺 [Magyar](../hu/ARCHITECTURE.md) | 🇮🇩 [Bahasa Indonesia](../id/ARCHITECTURE.md) | 🇰🇷 [한국어](../ko/ARCHITECTURE.md) | 🇲🇾 [Bahasa Melayu](../ms/ARCHITECTURE.md) | 🇳🇱 [Nederlands](../nl/ARCHITECTURE.md) | 🇳🇴 [Norsk](../no/ARCHITECTURE.md) | 🇵🇹 [Português (Portugal)](../pt/ARCHITECTURE.md) | 🇷🇴 [Română](../ro/ARCHITECTURE.md) | 🇵🇱 [Polski](../pl/ARCHITECTURE.md) | 🇸🇰 [Slovenčina](../sk/ARCHITECTURE.md) | 🇸🇪 [Svenska](../sv/ARCHITECTURE.md) | 🇵🇭 [Filipino](../phi/ARCHITECTURE.md)

_Ultima actualizare: 2026-02-18_

## Rezumat executiv

OmniRoute este un gateway local de rutare AI și un tablou de bord construit pe Next.js.
Acesta oferă un singur punct final compatibil cu OpenAI (`/v1/*`) și direcționează traficul către mai mulți furnizori din amonte cu traducere, alternativă, reîmprospătare token și urmărire a utilizării.

Capacitățile de bază:

- Suprafață API compatibilă cu OpenAI pentru CLI/instrumente (28 de furnizori)
- Traducerea cererii/răspunsurilor între formatele furnizorilor
- Alternativ combo de model (secvență cu mai multe modele)
- Rezervă de rezervă la nivel de cont (cu mai multe conturi pentru fiecare furnizor)
- Gestionarea conexiunii furnizorului OAuth + cheie API
- Generare de încorporare prin `/v1/embeddings` (6 furnizori, 9 modele)
- Generare de imagini prin `/v1/images/generations` (4 furnizori, 9 modele)
- Gândiți-vă la analizarea etichetelor (`<think>...</think>`) pentru modele de raționament
- Sanitizarea răspunsului pentru compatibilitate strictă cu OpenAI SDK
- Normalizarea rolurilor (dezvoltator→sistem, sistem→utilizator) pentru compatibilitate între furnizori
- Conversie de ieșire structurată (json_schema → Gemini responseSchema)
- Persistență locală pentru furnizori, chei, aliasuri, combo-uri, setări, prețuri
- Urmărirea utilizării/costurilor și înregistrarea cererilor
- Sincronizare cloud opțională pentru sincronizare multi-dispozitiv/state
- Lista permisă/lista blocată IP pentru controlul accesului API
- Gândire la managementul bugetului (passthrough/auto/personalizat/adaptativ)
- Sistem global de injectare promptă
- Urmărirea sesiunii și amprentarea
- Limitare îmbunătățită a ratei per cont cu profiluri specifice furnizorului
- Model de întrerupător pentru rezistența furnizorului
- Protectie anti-tunet cu blocare mutex
- Cache de deduplicare a cererilor bazate pe semnătură
- Nivelul domeniului: disponibilitatea modelului, regulile de cost, politica de rezervă, politica de blocare
- Persistența stării domeniului (cache-ul de scriere SQLite pentru rezervări, bugete, blocări, întreruptoare de circuit)
- Motor de politici pentru evaluarea centralizată a cererilor (blocare → buget → rezervă)
- Solicitați telemetrie cu agregarea latenței p50/p95/p99
- ID de corelare (X-Request-Id) pentru urmărirea de la capăt la capăt
- Înregistrare de audit de conformitate cu renunțare pentru fiecare cheie API
- Cadrul de evaluare pentru asigurarea calității LLM
- Tabloul de bord Resilience UI cu starea întreruptorului în timp real
- Furnizori OAuth modulari (12 module individuale sub `src/lib/oauth/providers/`)

Model de rulare principal:

- Rutele aplicației Next.js sub `src/app/api/*` implementează atât API-uri de tablou de bord, cât și API-uri de compatibilitate
- Un nucleu SSE/rutare partajat în `src/sse/*` + `open-sse/*` se ocupă de execuția furnizorului, traducerea, transmiterea în flux, alternativă și utilizare

## Domeniul de aplicare și limitele

### În domeniul de aplicare

- Timp de rulare gateway local
- API-uri de gestionare a tabloului de bord
- Autentificarea furnizorului și reîmprospătarea simbolului
- Solicitați traducere și streaming SSE
- Stare locală + persistență de utilizare
- Orchestrare opțională de sincronizare în cloud

### În afara domeniului de aplicare

- Implementarea serviciului cloud în spatele `NEXT_PUBLIC_CLOUD_URL`
- Furnizor SLA/plan de control în afara procesului local
- Binarele CLI externe în sine (Claude CLI, Codex CLI etc.)

## Context de sistem la nivel înalt

```mermaid
flowchart LR
    subgraph Clients[Developer Clients]
        C1[Claude Code]
        C2[Codex CLI]
        C3[OpenClaw / Droid / Cline / Continue / Roo]
        C4[Custom OpenAI-compatible clients]
        BROWSER[Browser Dashboard]
    end

    subgraph Router[OmniRoute Local Process]
        API[V1 Compatibility API\n/v1/*]
        DASH[Dashboard + Management API\n/api/*]
        CORE[SSE + Translation Core\nopen-sse + src/sse]
        DB[(db.json)]
        UDB[(usage.json + log.txt)]
    end

    subgraph Upstreams[Upstream Providers]
        P1[OAuth Providers\nClaude/Codex/Gemini/Qwen/iFlow/GitHub/Kiro/Cursor/Antigravity]
        P2[API Key Providers\nOpenAI/Anthropic/OpenRouter/GLM/Kimi/MiniMax\nDeepSeek/Groq/xAI/Mistral/Perplexity\nTogether/Fireworks/Cerebras/Cohere/NVIDIA]
        P3[Compatible Nodes\nOpenAI-compatible / Anthropic-compatible]
    end

    subgraph Cloud[Optional Cloud Sync]
        CLOUD[Cloud Sync Endpoint\nNEXT_PUBLIC_CLOUD_URL]
    end

    C1 --> API
    C2 --> API
    C3 --> API
    C4 --> API
    BROWSER --> DASH

    API --> CORE
    DASH --> DB
    CORE --> DB
    CORE --> UDB

    CORE --> P1
    CORE --> P2
    CORE --> P3

    DASH --> CLOUD
```

## Componente Core Runtime

## 1) API și stratul de rutare (Rute pentru aplicații Next.js)

Directoare principale:

- `src/app/api/v1/*` și `src/app/api/v1beta/*` pentru API-uri de compatibilitate
- `src/app/api/*` pentru API-uri de gestionare/configurare
- Următoarea rescrie în harta `next.config.mjs` `/v1/*` în `/api/v1/*`

Rute importante de compatibilitate:

- `src/app/api/v1/chat/completions/route.ts`
- `src/app/api/v1/messages/route.ts`
- `src/app/api/v1/responses/route.ts`
- `src/app/api/v1/models/route.ts` — include modele personalizate cu `custom: true`
- `src/app/api/v1/embeddings/route.ts` — generare de încorporare (6 furnizori)
- `src/app/api/v1/images/generations/route.ts` — generare de imagini (4+ furnizori inclusiv Antigravity/Nebius)
- `src/app/api/v1/messages/count_tokens/route.ts`
- `src/app/api/v1/providers/[provider]/chat/completions/route.ts` — chat dedicat pentru fiecare furnizor
- `src/app/api/v1/providers/[provider]/embeddings/route.ts` — încorporare dedicate pentru fiecare furnizor
- `src/app/api/v1/providers/[provider]/images/generations/route.ts` — imagini dedicate pentru fiecare furnizor
- `src/app/api/v1beta/models/route.ts`
- `src/app/api/v1beta/models/[...path]/route.ts`

Domenii de management:

- Autentificare/setări: `src/app/api/auth/*`, `src/app/api/settings/*`
- Furnizori/conexiuni: `src/app/api/providers*`
- Noduri furnizor: `src/app/api/provider-nodes*`
- Modele personalizate: `src/app/api/provider-models` (GET/POST/DELETE)
- Catalog de modele: `src/app/api/models/catalog` (GET)
- Configurare proxy: `src/app/api/settings/proxy` (GET/PUT/DELETE) + `src/app/api/settings/proxy/test` (POST)
- OAuth: `src/app/api/oauth/*`
- Chei/alias-uri/combo/preț: `src/app/api/keys*`, `src/app/api/models/alias`, `src/app/api/combos*`, `src/app/api/pricing`
- Utilizare: `src/app/api/usage/*`
- Sincronizare/cloud: `src/app/api/sync/*`, `src/app/api/cloud/*`
- Ajutor de instrumente CLI: `src/app/api/cli-tools/*`
- Filtru IP: `src/app/api/settings/ip-filter` (GET/PUT)
- Buget de gândire: `src/app/api/settings/thinking-budget` (GET/PUT)
- prompt de sistem: `src/app/api/settings/system-prompt` (GET/PUT)
- Sesiuni: `src/app/api/sessions` (GET)
- Limite de rate: `src/app/api/rate-limits` (GET)
- Reziliență: `src/app/api/resilience` (GET/PATCH) — profiluri furnizor, întrerupător, stare limită a ratei
- Resetare rezistență: `src/app/api/resilience/reset` (POST) — resetare întrerupătoare + cooldowns
- Statistici cache: `src/app/api/cache/stats` (GET/DELETE)
- Disponibilitatea modelului: `src/app/api/models/availability` (GET/POST)
- Telemetrie: `src/app/api/telemetry/summary` (GET)
- Buget: `src/app/api/usage/budget` (GET/POST)
- Lanțuri de rezervă: `src/app/api/fallback/chains` (GET/POST/DELETE)
- Audit de conformitate: `src/app/api/compliance/audit-log` (GET)
- Evaluări: `src/app/api/evals` (GET/POST), `src/app/api/evals/[suiteId]` (GET)
- Politici: `src/app/api/policies` (GET/POST)

## 2) SSE + Translation Core

Module principale de flux:

- Intrare: `src/sse/handlers/chat.ts`
- Orchestrare de bază: `open-sse/handlers/chatCore.ts`
- Adaptoare de execuție furnizor: `open-sse/executors/*`
- Format de detectare/configurare furnizor: `open-sse/services/provider.ts`
- Analiza/rezolvarea modelului: `src/sse/services/model.ts`, `open-sse/services/model.ts`
- Logica de rezervă a contului: `open-sse/services/accountFallback.ts`
- Registrul traducerilor: `open-sse/translator/index.ts`
- Transformări de flux: `open-sse/utils/stream.ts`, `open-sse/utils/streamHandler.ts`
- Extragerea/normalizarea utilizării: `open-sse/utils/usageTracking.ts`
- Analizator de etichete de gândire: `open-sse/utils/thinkTagParser.ts`
- Manager de încorporare: `open-sse/handlers/embeddings.ts`
- Încorporarea registrului furnizorului: `open-sse/config/embeddingRegistry.ts`
- Manager de generare a imaginii: `open-sse/handlers/imageGeneration.ts`
- Registrul furnizorului de imagini: `open-sse/config/imageRegistry.ts`
- igienizare răspuns: `open-sse/handlers/responseSanitizer.ts`
- Normalizare rol: `open-sse/services/roleNormalizer.ts`

Servicii (logica de afaceri):

- Selectarea/punctarea contului: `open-sse/services/accountSelector.ts`
- Gestionarea ciclului de viață a contextului: `open-sse/services/contextManager.ts`
- Aplicarea filtrului IP: `open-sse/services/ipFilter.ts`
- Urmărirea sesiunii: `open-sse/services/sessionManager.ts`
- Solicitați deduplicarea: `open-sse/services/signatureCache.ts`
- Injectarea promptă a sistemului: `open-sse/services/systemPrompt.ts`
- Gândirea bugetului: `open-sse/services/thinkingBudget.ts`
- rutare model wildcard: `open-sse/services/wildcardRouter.ts`
- Gestionarea limitei ratei: `open-sse/services/rateLimitManager.ts`
- Întrerupător: `open-sse/services/circuitBreaker.ts`

Module de nivel de domeniu:

- Disponibilitatea modelului: `src/lib/domain/modelAvailability.ts`
- Reguli de cost/bugete: `src/lib/domain/costRules.ts`
- Politica de rezervă: `src/lib/domain/fallbackPolicy.ts`
- Soluție combinată: `src/lib/domain/comboResolver.ts`
- Politica de blocare: `src/lib/domain/lockoutPolicy.ts`
- Motor de politici: `src/domain/policyEngine.ts` — blocare centralizată → buget → evaluare alternativă
- Catalog coduri de eroare: `src/lib/domain/errorCodes.ts`
- ID cerere: `src/lib/domain/requestId.ts`
- Timeout pentru preluare: `src/lib/domain/fetchTimeout.ts`
- Solicitați telemetrie: `src/lib/domain/requestTelemetry.ts`
- Conformitate/audit: `src/lib/domain/compliance/index.ts`
- Runner de evaluare: `src/lib/domain/evalRunner.ts`
- Persistența stării domeniului: `src/lib/db/domainState.ts` — SQLite CRUD pentru lanțuri de rezervă, bugete, istoricul costurilor, starea de blocare, întrerupătoarele de circuit

Module de furnizor OAuth (12 fișiere individuale sub `src/lib/oauth/providers/`):

- Index de registru: `src/lib/oauth/providers/index.ts`
- Furnizori individuali: `claude.ts`, `codex.ts`, `gemini.ts`, `antigravity.ts`, `iflow.ts`, , , , `kimi-coding.ts`, `github.ts`, `kiro.ts`, `cursor.ts`, `kilocode.ts`, `cline.ts`
- Ambalaj subțire: `src/lib/oauth/providers.ts` — reexporturi din module individuale

## 3) Stratul de persistență

DB de stat primar:

- `src/lib/localDb.ts`
- fișier: `${DATA_DIR}/db.json` (sau `$XDG_CONFIG_HOME/omniroute/db.json` când este setat, altfel `~/.omniroute/db.json`)
- entități: providerConnections, providerNodes, modelAliases, combo-uri, apiKeys, setări, prețuri, **customModels**, **proxyConfig**, **ipFilter**, **thinkingBudget**, **systemPrompt**

DB de utilizare:

- `src/lib/usageDb.ts`
- fișiere: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- urmează aceeași politică de bază de director ca `localDb` (`DATA_DIR`, apoi `XDG_CONFIG_HOME/omniroute` când este setat)
- descompus în sub-module focalizate: `migrations.ts`, `usageHistory.ts`, `costCalculator.ts`, `usageStats.ts`, `callLogs.ts`

DB Stare Domeniu (SQLite):

- `src/lib/db/domainState.ts` — Operații CRUD pentru starea domeniului
- Tabele (create în `src/lib/db/core.ts`): `domain_fallback_chains`, `domain_budgets`, `domain_cost_history`, `domain_lockout_state`, `domain_circuit_breakers`\_
- Model de cache de scriere: hărțile din memorie sunt autorizate în timpul execuției; mutațiile sunt scrise sincron cu SQLite; starea este restabilită din DB la pornirea la rece

## 4) Autentificare + Suprafețe de securitate

- Autentificare cookie pentru tabloul de bord: `src/proxy.ts`, `src/app/api/auth/login/route.ts`
- Generarea/verificarea cheii API: `src/shared/utils/apiKey.ts`
- Secretele furnizorului au persistat în intrările `providerConnections`
- Suport proxy de ieșire prin `open-sse/utils/proxyFetch.ts` (env vars) și `open-sse/utils/networkProxy.ts` (configurabil per furnizor sau global)

## 5) Cloud Sync

- Inițierea planificatorului: `src/lib/initCloudSync.ts`, `src/shared/services/initializeCloudSync.ts`
- Sarcină periodică: `src/shared/services/cloudSyncScheduler.ts`
- Rută de control: `src/app/api/sync/cloud/route.ts`

## Ciclul de viață al solicitării (`/v1/chat/completions`)

```mermaid
sequenceDiagram
    autonumber
    participant Client as CLI/SDK Client
    participant Route as /api/v1/chat/completions
    participant Chat as src/sse/handlers/chat
    participant Core as open-sse/handlers/chatCore
    participant Model as Model Resolver
    participant Auth as Credential Selector
    participant Exec as Provider Executor
    participant Prov as Upstream Provider
    participant Stream as Stream Translator
    participant Usage as usageDb

    Client->>Route: POST /v1/chat/completions
    Route->>Chat: handleChat(request)
    Chat->>Model: parse/resolve model or combo

    alt Combo model
        Chat->>Chat: iterate combo models (handleComboChat)
    end

    Chat->>Auth: getProviderCredentials(provider)
    Auth-->>Chat: active account + tokens/api key

    Chat->>Core: handleChatCore(body, modelInfo, credentials)
    Core->>Core: detect source format
    Core->>Core: translate request to target format
    Core->>Exec: execute(provider, transformedBody)
    Exec->>Prov: upstream API call
    Prov-->>Exec: SSE/JSON response
    Exec-->>Core: response + metadata

    alt 401/403
        Core->>Exec: refreshCredentials()
        Exec-->>Core: updated tokens
        Core->>Exec: retry request
    end

    Core->>Stream: translate/normalize stream to client format
    Stream-->>Client: SSE chunks / JSON response

    Stream->>Usage: extract usage + persist history/log
```

## Combo + Flux de rezervă pentru cont

```mermaid
flowchart TD
    A[Incoming model string] --> B{Is combo name?}
    B -- Yes --> C[Load combo models sequence]
    B -- No --> D[Single model path]

    C --> E[Try model N]
    E --> F[Resolve provider/model]
    D --> F

    F --> G[Select account credentials]
    G --> H{Credentials available?}
    H -- No --> I[Return provider unavailable]
    H -- Yes --> J[Execute request]

    J --> K{Success?}
    K -- Yes --> L[Return response]
    K -- No --> M{Fallback-eligible error?}

    M -- No --> N[Return error]
    M -- Yes --> O[Mark account unavailable cooldown]
    O --> P{Another account for provider?}
    P -- Yes --> G
    P -- No --> Q{In combo with next model?}
    Q -- Yes --> E
    Q -- No --> R[Return all unavailable]
```

Deciziile de rezervă sunt conduse de `open-sse/services/accountFallback.ts` folosind coduri de stare și euristică mesaj de eroare.

## Ciclul de viață OAuth Onboarding și Token Refresh

```mermaid
sequenceDiagram
    autonumber
    participant UI as Dashboard UI
    participant OAuth as /api/oauth/[provider]/[action]
    participant ProvAuth as Provider Auth Server
    participant DB as localDb
    participant Test as /api/providers/[id]/test
    participant Exec as Provider Executor

    UI->>OAuth: GET authorize or device-code
    OAuth->>ProvAuth: create auth/device flow
    ProvAuth-->>OAuth: auth URL or device code payload
    OAuth-->>UI: flow data

    UI->>OAuth: POST exchange or poll
    OAuth->>ProvAuth: token exchange/poll
    ProvAuth-->>OAuth: access/refresh tokens
    OAuth->>DB: createProviderConnection(oauth data)
    OAuth-->>UI: success + connection id

    UI->>Test: POST /api/providers/[id]/test
    Test->>Exec: validate credentials / optional refresh
    Exec-->>Test: valid or refreshed token info
    Test->>DB: update status/tokens/errors
    Test-->>UI: validation result
```

Reîmprospătarea în timpul traficului live este executată în interiorul `open-sse/handlers/chatCore.ts` prin intermediul executorului `refreshCredentials()`.

## Ciclul de viață Cloud Sync (Activare / Sincronizare / Dezactivare)

```mermaid
sequenceDiagram
    autonumber
    participant UI as Endpoint Page UI
    participant Sync as /api/sync/cloud
    participant DB as localDb
    participant Cloud as External Cloud Sync
    participant Claude as ~/.claude/settings.json

    UI->>Sync: POST action=enable
    Sync->>DB: set cloudEnabled=true
    Sync->>DB: ensure API key exists
    Sync->>Cloud: POST /sync/{machineId} (providers/aliases/combos/keys)
    Cloud-->>Sync: sync result
    Sync->>Cloud: GET /{machineId}/v1/verify
    Sync-->>UI: enabled + verification status

    UI->>Sync: POST action=sync
    Sync->>Cloud: POST /sync/{machineId}
    Cloud-->>Sync: remote data
    Sync->>DB: update newer local tokens/status
    Sync-->>UI: synced

    UI->>Sync: POST action=disable
    Sync->>DB: set cloudEnabled=false
    Sync->>Cloud: DELETE /sync/{machineId}
    Sync->>Claude: switch ANTHROPIC_BASE_URL back to local (if needed)
    Sync-->>UI: disabled
```

Sincronizarea periodică este declanșată de `CloudSyncScheduler` când cloud este activat.

## Model de date și hartă de stocare

```mermaid
erDiagram
    SETTINGS ||--o{ PROVIDER_CONNECTION : controls
    PROVIDER_NODE ||--o{ PROVIDER_CONNECTION : backs_compatible_provider
    PROVIDER_CONNECTION ||--o{ USAGE_ENTRY : emits_usage

    SETTINGS {
      boolean cloudEnabled
      number stickyRoundRobinLimit
      boolean requireLogin
      string password_hash
      string fallbackStrategy
      json rateLimitDefaults
      json providerProfiles
    }

    PROVIDER_CONNECTION {
      string id
      string provider
      string authType
      string name
      number priority
      boolean isActive
      string apiKey
      string accessToken
      string refreshToken
      string expiresAt
      string testStatus
      string lastError
      string rateLimitedUntil
      json providerSpecificData
    }

    PROVIDER_NODE {
      string id
      string type
      string name
      string prefix
      string apiType
      string baseUrl
    }

    MODEL_ALIAS {
      string alias
      string targetModel
    }

    COMBO {
      string id
      string name
      string[] models
    }

    API_KEY {
      string id
      string name
      string key
      string machineId
    }

    USAGE_ENTRY {
      string provider
      string model
      number prompt_tokens
      number completion_tokens
      string connectionId
      string timestamp
    }

    CUSTOM_MODEL {
      string id
      string name
      string providerId
    }

    PROXY_CONFIG {
      string global
      json providers
    }

    IP_FILTER {
      string mode
      string[] allowlist
      string[] blocklist
    }

    THINKING_BUDGET {
      string mode
      number customBudget
      string effortLevel
    }

    SYSTEM_PROMPT {
      boolean enabled
      string prompt
      string position
    }
```

Fișiere de stocare fizică:

- starea principală: `${DATA_DIR}/db.json` (sau `$XDG_CONFIG_HOME/omniroute/db.json` când este setat, altfel `~/.omniroute/db.json`)
- statistici de utilizare: `${DATA_DIR}/usage.json`
- linii de jurnal de solicitare: `${DATA_DIR}/log.txt`
- sesiuni opționale de traducător/cerere de depanare: `<repo>/logs/...`

## Topologie de implementare

```mermaid
flowchart LR
    subgraph LocalHost[Developer Host]
        CLI[CLI Tools]
        Browser[Dashboard Browser]
    end

    subgraph ContainerOrProcess[OmniRoute Runtime]
        Next[Next.js Server\nPORT=20128]
        Core[SSE Core + Executors]
        MainDB[(db.json)]
        UsageDB[(usage.json/log.txt)]
    end

    subgraph External[External Services]
        Providers[AI Providers]
        SyncCloud[Cloud Sync Service]
    end

    CLI --> Next
    Browser --> Next
    Next --> Core
    Next --> MainDB
    Core --> MainDB
    Core --> UsageDB
    Core --> Providers
    Next --> SyncCloud
```

## Maparea modulului (decizie critică)

### Rută și module API

- `src/app/api/v1/*`, `src/app/api/v1beta/*`: API-uri de compatibilitate
- `src/app/api/v1/providers/[provider]/*`: rute dedicate pentru fiecare furnizor (chat, încorporare, imagini)
- `src/app/api/providers*`: furnizor CRUD, validare, testare
- `src/app/api/provider-nodes*`: gestionarea nodurilor compatibile personalizate
- `src/app/api/provider-models`: management personalizat model (CRUD)
- `src/app/api/models/catalog`: API de catalog de model complet (toate tipurile grupate după furnizor)
- `src/app/api/oauth/*`: fluxuri OAuth/cod dispozitiv
- `src/app/api/keys*`: ciclul de viață local al cheii API
- `src/app/api/models/alias`: gestionare alias
- `src/app/api/combos*`: gestionarea combo de rezervă
- `src/app/api/pricing`: înlocuirea prețurilor pentru calcularea costurilor
- `src/app/api/settings/proxy`: configurație proxy (GET/PUT/DELETE)
- `src/app/api/settings/proxy/test`: test de conectivitate proxy de ieșire (POST)
- `src/app/api/usage/*`: API-uri de utilizare și jurnal
- `src/app/api/sync/*` + `src/app/api/cloud/*`: sincronizare în cloud și asistență orientată către nor
- `src/app/api/cli-tools/*`: scriitori/verificatori de configurare CLI locale
- `src/app/api/settings/ip-filter`: lista IP permisă/lista blocată (GET/PUT)
- `src/app/api/settings/thinking-budget`: configurația bugetului simbolului de gândire (GET/PUT)
- `src/app/api/settings/system-prompt`: prompt de sistem global (GET/PUT)
- `src/app/api/sessions`: listarea sesiunii active (GET)
- `src/app/api/rate-limits`: starea limită a ratei per cont (GET)

### Core de rutare și execuție

- `src/sse/handlers/chat.ts`: analizarea cererii, gestionarea combinațiilor, bucla de selecție a contului
- `open-sse/handlers/chatCore.ts`: traducere, expediere executor, reîncercare/reîmprospătare manipulare, configurare flux
- `open-sse/executors/*`: comportamentul de rețea și format specific furnizorului

### Registrul de traduceri și convertoare de format

- `open-sse/translator/index.ts`: registru și orchestrare a traducătorilor
- Solicitați traducători: `open-sse/translator/request/*`
- Traducători de răspuns: `open-sse/translator/response/*`
- Formatare constante: `open-sse/translator/formats.ts`

### Persistență

- `src/lib/localDb.ts`: config/stare persistentă
- `src/lib/usageDb.ts`: istoricul utilizării și jurnalele de solicitare continuă

## Acoperire Executor Furnizor (Model de strategie)

Fiecare furnizor are un executor specializat care extinde `BaseExecutor` (în `open-sse/executors/base.ts`), care oferă crearea URL, construcția antetului, reîncercarea cu backoff exponențial, cârlige de reîmprospătare a acreditărilor și metoda de orchestrare `execute()`.

| Executant             | Furnizor(i)                                                                                                                                                  | Manipulare specială                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `DefaultExecutor`     | OpenAI, Claude, Gemini, Qwen, iFlow, OpenRouter, GLM, Kimi, MiniMax, DeepSeek, Groq, xAI, Mistral, Perplexity, Together, Fireworks, Cerebras, Cohere, NVIDIA | Configurare URL dinamică/antet per furnizor                                        |
| `AntigravityExecutor` | Google Antigravity                                                                                                                                           | ID-uri personalizate de proiect/sesiune, Reîncercați-După analizare                |
| `CodexExecutor`       | OpenAI Codex                                                                                                                                                 | Injectează instrucțiuni de sistem, forțează efortul de raționament                 |
| `CursorExecutor`      | Cursor IDE                                                                                                                                                   | Protocolul ConnectRPC, codificarea Protobuf, semnarea cererii prin suma de control |
| `GithubExecutor`      | GitHub Copilot                                                                                                                                               | Reîmprospătare jeton Copilot, anteturi care imită VSCode                           |
| `KiroExecutor`        | AWS CodeWhisperer/Kiro                                                                                                                                       | Format binar AWS EventStream → conversie SSE                                       |
| `GeminiCLIExecutor`   | Gemeni CLI                                                                                                                                                   | Ciclul de reîmprospătare a simbolului OAuth Google                                 |

Toți ceilalți furnizori (inclusiv noduri compatibile personalizate) folosesc `DefaultExecutor`.

## Matricea de compatibilitate a furnizorilor

| Furnizor         | Format           | Auth                          | Flux             | Non-Stream | Token Refresh | Utilizare API          |
| ---------------- | ---------------- | ----------------------------- | ---------------- | ---------- | ------------- | ---------------------- |
| Claude           | claude           | Cheie API / OAuth             | ✅               | ✅         | ✅            | ⚠️ Doar administrator  |
| Gemeni           | gemeni           | Cheie API / OAuth             | ✅               | ✅         | ✅            | ⚠️ Cloud Console       |
| Gemeni CLI       | gemeni-cli       | OAuth                         | ✅               | ✅         | ✅            | ⚠️ Cloud Console       |
| Antigravitație   | antigravitație   | OAuth                         | ✅               | ✅         | ✅            | ✅ Cota completă API   |
| OpenAI           | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Codex            | openai-responses | OAuth                         | ✅ forțat        | ❌         | ✅            | ✅ Limite de tarif     |
| GitHub Copilot   | deschis          | OAuth + Token Copilot         | ✅               | ✅         | ✅            | ✅ Instantanee de cotă |
| Cursor           | cursor           | Sumă de control personalizată | ✅               | ✅         | ❌            | ❌                     |
| Kiro             | kiro             | AWS SSO OIDC                  | ✅ (EventStream) | ❌         | ✅            | ✅ Limite de utilizare |
| Qwen             | deschis          | OAuth                         | ✅               | ✅         | ✅            | ⚠️ La cerere           |
| iFlow            | deschis          | OAuth (de bază)               | ✅               | ✅         | ✅            | ⚠️ La cerere           |
| OpenRouter       | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| GLM/Kimi/MiniMax | claude           | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| DeepSeek         | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Groq             | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| xAI (Grok)       | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Mistral          | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Nedumerire       | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Împreună AI      | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Artificii AI     | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Cerebre          | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| Cohere           | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |
| NVIDIA NIM       | deschis          | Cheie API                     | ✅               | ✅         | ❌            | ❌                     |

## Format Acoperire traducere

Formatele sursă detectate includ:

- `openai`
- `openai-responses`
- `claude`
- `gemini`

Formatele țintă includ:

- Chat/Răspunsuri OpenAI
- Claude
- Plic Gemeni/Gemeni-CLI/Antigravity
- Kiro
- Cursor

Traducerile folosesc **OpenAI ca format hub** — toate conversiile trec prin OpenAI ca intermediar:

```
Source Format → OpenAI (hub) → Target Format
```

Traducerile sunt selectate dinamic pe baza formei încărcăturii sursei și a formatului țintă al furnizorului.

Straturi de procesare suplimentare în conducta de traducere:

- **Sanitizarea răspunsurilor** — Elimina câmpurile nestandard din răspunsurile în format OpenAI (atât în flux, cât și în non-streaming) pentru a asigura conformitatea strictă cu SDK
- **Normalizarea rolurilor** — Convertește `developer` → `system` pentru ținte non-OpenAI; îmbină `system` → `user` pentru modelele care resping rolul de sistem (GLM, ERNIE)
- **Think tag extraction** — Analizează blocurile `<think>...</think>` din conținut în câmpul `reasoning_content`
- **Ieșire structurată** — Convertește OpenAI `response_format.json_schema` în `responseMimeType` al lui Gemini + `responseSchema`

## Puncte finale API acceptate

| Punct final                                        | Format                 | Manipulator                                                    |
| -------------------------------------------------- | ---------------------- | -------------------------------------------------------------- |
| `POST /v1/chat/completions`                        | OpenAI Chat            | `src/sse/handlers/chat.ts`                                     |
| `POST /v1/messages`                                | Claude Mesaje          | Același handler (detectat automat)                             |
| `POST /v1/responses`                               | Răspunsuri OpenAI      | `open-sse/handlers/responsesHandler.ts`                        |
| `POST /v1/embeddings`                              | Încorporare OpenAI     | `open-sse/handlers/embeddings.ts`                              |
| `GET /v1/embeddings`                               | Lista de modele        | Rută API                                                       |
| `POST /v1/images/generations`                      | Imagini OpenAI         | `open-sse/handlers/imageGeneration.ts`                         |
| `GET /v1/images/generations`                       | Lista de modele        | Rută API                                                       |
| `POST /v1/providers/{provider}/chat/completions`   | OpenAI Chat            | Dedicat pentru fiecare furnizor cu validare a modelului        |
| `POST /v1/providers/{provider}/embeddings`         | Încorporare OpenAI     | Dedicat pentru fiecare furnizor cu validare a modelului        |
| `POST /v1/providers/{provider}/images/generations` | Imagini OpenAI         | Dedicat pentru fiecare furnizor cu validare a modelului        |
| `POST /v1/messages/count_tokens`                   | Claude Token Count     | Rută API                                                       |
| `GET /v1/models`                                   | Lista de modele OpenAI | Rută API (chat + încorporare + imagine + modele personalizate) |
| `GET /api/models/catalog`                          | Catalog                | Toate modelele grupate după furnizor + tip                     |
| `POST /v1beta/models/*:streamGenerateContent`      | nativ Gemeni           | Rută API                                                       |
| `GET/PUT/DELETE /api/settings/proxy`               | Configurare proxy      | Configurare proxy de rețea                                     |
| `POST /api/settings/proxy/test`                    | Conectivitate proxy    | Punct final de testare de sănătate/conectivitate proxy         |
| `GET/POST/DELETE /api/provider-models`             | Modele personalizate   | Gestionare model personalizat per furnizor                     |

## Handler de ocolire

Managerul de ocolire (`open-sse/utils/bypassHandler.ts`) interceptează cererile cunoscute „de aruncat” de la Claude CLI — ping-uri de încălzire, extrageri de titluri și numărătoare de jetonuri — și returnează un **răspuns fals** fără a consuma jetoane de furnizor în amonte. Aceasta este declanșată numai atunci când `User-Agent` conține `claude-cli`.

## Solicitați Conducta Logger

Loggerul de solicitare (`open-sse/utils/requestLogger.ts`) oferă o conductă de înregistrare a depanării în 7 etape, dezactivată implicit, activată prin `ENABLE_REQUEST_LOGS=true`:

```
1_req_client.json → 2_req_source.json → 3_req_openai.json → 4_req_target.json
→ 5_res_provider.txt → 6_res_openai.txt → 7_res_client.txt
```

Fișierele sunt scrise în `<repo>/logs/<session>/` pentru fiecare sesiune de solicitare.

## Moduri de eșec și rezistență

## 1) Disponibilitatea contului/furnizorului

- cooldown contului furnizorului pentru erori tranzitorii/rate/auth
- rezervă de cont înainte de cererea eșuată
- alternativă model combo atunci când modelul curent/calea furnizorului este epuizată

## 2) Expirarea simbolului

- preverificare și reîmprospătare cu reîncercare pentru furnizorii care pot fi reîmprospătați
- 401/403 reîncercați după încercarea de reîmprospătare în calea de bază

## 3) Siguranța fluxului

- controler de flux conștient de deconectare
- flux de traducere cu spălare la sfârșitul fluxului și gestionarea `[DONE]`
- estimarea utilizării de rezervă atunci când metadatele de utilizare ale furnizorului lipsesc

## 4) Degradarea Cloud Sync

- apar erori de sincronizare, dar timpul de execuție local continuă
- planificatorul are o logică capabilă să reîncerce, dar execuția periodică apelează în mod implicit sincronizarea cu o singură încercare

## 5) Integritatea datelor

- Migrare/reparare forme DB pentru cheile lipsă
- garanții de resetare JSON corupte pentru localDb și usageDb

## Observabilitate și semnale operaționale

Surse de vizibilitate la runtime:

- jurnalele consolei de la `src/sse/utils/logger.ts`
- agregate de utilizare la cerere în `usage.json`
- autentificarea stării cererii textuale `log.txt`
- jurnalele opționale de solicitare profundă/traducere sub `logs/` când `ENABLE_REQUEST_LOGS=true`
- puncte finale de utilizare a tabloului de bord (`/api/usage/*`) pentru consumul UI

## Limite sensibile la securitate

- Secretul JWT (`JWT_SECRET`) securizează verificarea/semnarea cookie-urilor sesiunii de bord
- Parola de rezervă inițială (`INITIAL_PASSWORD`, implicit `123456`) trebuie să fie înlocuită în implementările reale
- Secretul HMAC cheie API (`API_KEY_SECRET`) securizează formatul cheii API locale generate
- Secretele furnizorului (chei/token-uri API) sunt păstrate în DB local și ar trebui protejate la nivel de sistem de fișiere
- Punctele finale de sincronizare în cloud se bazează pe semantica de autentificare a cheii API + ID-ul mașinii

## Mediu și matrice de rulare

Variabilele de mediu utilizate în mod activ de cod:

- Aplicație/autentificare: `JWT_SECRET`, `INITIAL_PASSWORD`
- Stocare: `DATA_DIR`
- Comportamentul nodului compatibil: `ALLOW_MULTI_CONNECTIONS_PER_COMPAT_NODE`
- Suprascriere opțională a bazei de stocare (Linux/macOS când `DATA_DIR` dezactivat): `XDG_CONFIG_HOME`
- Hashing de securitate: `API_KEY_SECRET`, `MACHINE_ID_SALT`
- Înregistrare: `ENABLE_REQUEST_LOGS`
- URL sincronizare/cloud: `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_CLOUD_URL`
- Proxy de ieșire: `HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` și variante cu litere mici
- Indicatori de caracteristică SOCKS5: `ENABLE_SOCKS5_PROXY`, `NEXT_PUBLIC_ENABLE_SOCKS5_PROXY`
- Ajutor platformă/execuție (configurație nu specifică aplicației): `APPDATA`, `NODE_ENV`, `PORT`, `HOSTNAME`

## Note arhitecturale cunoscute

1. `usageDb` și `localDb` au acum aceeași politică de bază de director (`DATA_DIR` -> `XDG_CONFIG_HOME/omniroute` -> `~/.omniroute`) cu migrarea fișierelor moștenite.
2. `/api/v1/route.ts` returnează o listă de modele statice și nu este sursa principală de modele utilizată de `/v1/models`.
3. Loggerul solicitărilor scrie anteturi/corp complet atunci când este activat; tratați directorul de jurnal ca fiind sensibil.
4. Comportamentul în cloud depinde de `NEXT_PUBLIC_BASE_URL` corect și de accesibilitatea punctului final din cloud.
5. Directorul `open-sse/` este publicat ca pachetul `@omniroute/open-sse` **npm workspace**. Codul sursă îl importă prin `@omniroute/open-sse/...` (rezolvat de Next.js `transpilePackages`). Căile fișierelor din acest document folosesc în continuare numele directorului `open-sse/` pentru consecvență.
6. Diagramele din tabloul de bord utilizează **Recharts** (bazate pe SVG) pentru vizualizări analitice accesibile, interactive (diagrame cu bare de utilizare a modelelor, tabele de defalcare a furnizorilor cu rate de succes).
7. Testele E2E folosesc **Playwright** (`tests/e2e/`), rulat prin `npm run test:e2e`. Testele unitare folosesc **Node.js test runner** (`tests/unit/`), rulează prin `npm run test:plan3`. Codul sursă sub `src/` este **TypeScript** (`.ts`/`.tsx`); spațiul de lucru `open-sse/` rămâne JavaScript (`.js`).
8. Pagina Setări este organizată în 5 file: Securitate, Rutare (6 strategii globale: fill-first, round-robin, p2c, aleatoriu, cel mai puțin utilizat, optimizat pentru cost), Reziliență (limite ale ratei editabile, întrerupător de circuit, politici), AI (buget de gândire, prompt de sistem, cache prompt), Avansat (proxy).

## Lista de verificare a verificării operaționale

- Construire din sursă: `npm run build`
- Creați imaginea Docker: `docker build -t omniroute .`
- Porniți serviciul și verificați:
- `GET /api/settings`
- `GET /api/v1/models`
- Adresa URL de bază țintă CLI ar trebui să fie `http://<host>:20128/v1` când `PORT=20128`
