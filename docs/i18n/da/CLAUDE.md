# CLAUDE.md (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Denne fil giver vejledning til Claude Code (claude.ai/code) når der arbejdes med kode i dette repository.

## Hurtig Start

```bash
npm install                    # Installer afhængigheder (auto-genererer .env fra .env.example)
npm run dev                    # Dev server på http://localhost:20128
npm run build                  # Produktionsbygning (Next.js 16 standalone)
npm run lint                   # ESLint (0 fejl forventet; advarsler er forudgående)
npm run typecheck:core         # TypeScript tjek (skal være rent)
npm run typecheck:noimplicit:core  # Streng tjek (ingen implicit any)
npm run test:coverage          # Enhedstest + dækning gate (75/75/75/70 — udsagn/linjer/funktioner/grene)
npm run check                  # lint + test kombineret
npm run check:cycles           # Registrer cirkulære afhængigheder
```

### Kørsel af Tests

```bash
# Enkelt testfil (Node.js native test runner — de fleste tests)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# Alle sæt
npm run test:all
```

For fuld testmatrix, se `CONTRIBUTING.md` → "Kørsel af Tests". For dyb arkitektur, se `AGENTS.md`.

---

## Projektet i Et Overblik

**OmniRoute** — samlet AI proxy/router. Én endpoint, 160+ LLM udbydere, auto-fallback.

| Lag            | Placering               | Formål                                                                               |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------ |
| API Ruter      | `src/app/api/v1/`       | Next.js App Router — indgangspunkt                                                   |
| Handlere       | `open-sse/handlers/`    | Anmodningsbehandling (chat, indlejring, osv.)                                        |
| Udførere       | `open-sse/executors/`   | Udbyder-specifik HTTP dispatch                                                       |
| Oversættere    | `open-sse/translator/`  | Format konvertering (OpenAI↔Claude↔Gemini)                                           |
| Transformer    | `open-sse/transformer/` | Svar API ↔ Chat Fuldførelser                                                         |
| Tjenester      | `open-sse/services/`    | Combo routing, hastighedsbegrænsninger, caching, osv.                                |
| Database       | `src/lib/db/`           | SQLite domænemoduler (45+ filer, 55 migrationer)                                     |
| Domæne/Politik | `src/domain/`           | Politisk motor, omkostningsregler, fallback logik                                    |
| MCP Server     | `open-sse/mcp-server/`  | 37 værktøjer (30 base + 3 hukommelse + 4 færdigheder), 3 transportformer, ~13 scopes |
| A2A Server     | `src/lib/a2a/`          | JSON-RPC 2.0 agentprotokol                                                           |
| Færdigheder    | `src/lib/skills/`       | Udvidelig færdighedsramme                                                            |
| Hukommelse     | `src/lib/memory/`       | Vedholdende samtalehukommelse                                                        |

Monorepo: `src/` (Next.js 16 app), `open-sse/` (streaming engine arbejdsområde), `electron/` (desktop app), `tests/`, `bin/` (CLI indgangspunkt).

---

## Anmodningspipeline

```
Klient → /v1/chat/completions (Next.js rute)
  → CORS → Zod validering → auth? → politik kontrol → prompt injektionsbeskyttelse
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache kontrol → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() pr. mål
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → respons oversættelse → SSE stream eller JSON
    → Hvis Responses API: responsesTransformer.ts TransformStream
```

API-ruter følger et konsistent mønster: `Rute → CORS preflight → Zod body validering → Valgfri auth (extractApiKey/isValidApiKey) → API-nøgle politik håndhævelse → Handler delegation (open-sse)`. Ingen global Next.js middleware — interception er rute-specifik.

**Combo routing** (`open-sse/services/combo.ts`): 14 strategier (prioritet, vægtet, fyld-først, round-robin, P2C, tilfældig, mindst-brugt, omkostningsoptimeret, reset-bevidst, strengt-tilfældig, auto, lkgp, kontekst-optimeret, kontekst-relais). Hvert mål kalder `handleSingleModel()`, som indkapsler `handleChatCore()` med mål-specifik fejlbehandling og circuit breaker tjek. Se `docs/routing/AUTO-COMBO.md` for de 9-faktor Auto-Combo scoring og `docs/architecture/RESILIENCE_GUIDE.md` for de 3 modstandsdygtighedslag.

---

## Modstandsdygtighed Runtime Tilstand

OmniRoute har tre relaterede, men distinkte mekanismer til midlertidige fejl. Hold deres
omfang adskilt, når du fejlfinder routing adfærd. Se
[3-lags modstandsdygtighed diagram](./docs/diagrams/exported/resilience-3layers.svg)
(kilde: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
for et hurtigt overblik.

### Udbyder Circuit Breaker

**Omfang**: hele udbyderen, f.eks. `glm`, `openai`, `anthropic`.

**Formål**: stop med at sende trafik til en udbyder, der gentagne gange fejler på
upstream/service niveau, så en usund udbyder ikke bremser hver anmodning.

**Implementering**:

- Kerneklasse: `src/shared/utils/circuitBreaker.ts`
- Chat gate/udførelses wiring: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Runtime status API: `src/app/api/monitoring/health/route.ts`
- Delte wrappers: `open-sse/services/accountFallback.ts`
- Vedholdt tilstandstabel: `domain_circuit_breakers`

**Tilstande**:

- `CLOSED`: normal trafik er tilladt.
- `OPEN`: udbyderen er midlertidigt blokeret; kaldere får et provider-circuit-open svar
  eller combo routing springer til et andet mål.
- `HALF_OPEN`: reset timeout er udløbet; tillad en probe-anmodning. Succes lukker
  breaker'en, fejl åbner den igen.

**Standarder** (`open-sse/config/constants.ts`):

- OAuth udbydere: tærskel `3`, reset timeout `60s`.
- API-nøgle udbydere: tærskel `5`, reset timeout `30s`.
- Lokale udbydere: tærskel `2`, reset timeout `15s`.

Kun udbyder-niveau fejlstatusser bør udløse udbyder breaker:

```ts
(408, 500, 502, 503, 504);
```

Udløs ikke hele-udbyder breaker for normale konto/nøgle/model fejl som de fleste
`401`, `403`, eller `429` tilfælde. Disse tilhører normalt forbindelseskøling eller model
lockout. En generisk API-nøgle udbyder `403` bør være genoprettelig, medmindre den klassificeres
som en terminal udbyder/konto fejl.

Breaker'en bruger lazy recovery, ikke en baggrundstimer. Når `OPEN` udløber, læser som
`getStatus()`, `canExecute()`, og `getRetryAfterMs()` opdaterer tilstanden til
`HALF_OPEN`, så dashboards og combo kandidatbyggere ikke fortsætter med at udelukke en
udløbet udbyder for evigt.

### Forbindelseskøling

**Omfang**: én udbyder forbindelse/konto/nøgle.

**Formål**: midlertidigt springe en dårlig nøgle/konto over, mens andre forbindelser for
den samme udbyder fortsætter med at betjene anmodninger.

**Implementering**:

- Skriv/opdateringsvej: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontoselektion/filtrering: `src/sse/services/auth.ts::getProviderCredentials...`
- Køling beregning: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Indstillinger: `src/lib/resilience/settings.ts`

Vigtige felter på udbyder forbindelser:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Under kontoselektion springes en forbindelse over, mens:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Kølinger er også lazy: når `rateLimitedUntil` er i fortiden, bliver forbindelsen
berettiget igen. Ved succesfuld brug, `clearAccountError()` rydder `testStatus`,
`rateLimitedUntil`, fejl felter, og `backoffLevel`.

Standard forbindelse køling adfærd:

- OAuth basis køling: `5s`.
- API-nøgle basis køling: `3s`.
- API-nøgle `429` bør foretrække upstream retry hints (`Retry-After`, reset headers, eller
  parseable reset text) når tilgængelig.
- Gentagne genoprettelige fejl bruger eksponentiel backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd beskyttelsen forhindrer samtidige fejl på den samme forbindelse i
gentagne gange at forlænge kølingen eller dobbelt-øge `backoffLevel`.

Terminal tilstande er ikke kølinger. `banned`, `expired`, og `credits_exhausted` er
beregnet til at forblive utilgængelige, indtil legitimationsoplysninger/indstillinger ændres eller en operatør nulstiller dem. Overskriv ikke terminal tilstande med midlertidig køling tilstand.

### Model Lockout

**Omfang**: udbyder + forbindelse + model.

**Formål**: undgå at deaktivere en hel forbindelse, når kun én model er utilgængelig eller
kvote-begrænset for den forbindelse.

Eksempler:

- Per-model kvote udbydere, der returnerer `429`.
- Lokale udbydere, der returnerer `404` for én manglende model.
- Udbyder-specifikke mode/model tilladelsesfejl som valgte Grok modes.

Model lockout lever i `open-sse/services/accountFallback.ts` og lader den samme
forbindelse fortsætte med at betjene andre modeller.

### Fejlfinding Vejledning

- Hvis alle nøgler for en udbyder springes over, inspicer både udbyder breaker tilstand og hver
  forbindelses `rateLimitedUntil`/`testStatus`.
- Hvis en udbyder ser permanent udelukket ud efter resetvinduet, skal du kontrollere, om koden
  læser rå `state` i stedet for at bruge `getStatus()`/`canExecute()`.
- Hvis én udbyder nøgle fejler, men andre bør fungere, foretræk forbindelseskøling over
  udbyder breaker.
- Hvis kun én model fejler, foretræk model lockout over forbindelseskøling.
- Hvis en tilstand skal selv-genoprette, skal den have et fremtidigt tidsstempel/reset timeout og en
  læsevej, der opdaterer udløbet tilstand. Permanente statusser kræver manuelle legitimationsoplysninger
  eller konfigurationsændringer.

## Nøglekonventioner

### Kode Stil

- **2 mellemrum**, semikolon, dobbelte citationstegn, 100 tegn bredde, es5 trailing commas (håndhævet af lint-staged via Prettier)
- **Imports**: ekstern → intern (`@/`, `@omniroute/open-sse`) → relativ
- **Navngivning**: filer=camelCase/kebab, komponenter=PascalCase, konstanter=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = fejl overalt; `no-explicit-any` = advarsel i `open-sse/` og `tests/`
- **TypeScript**: `strict: false`, mål ES2022, modul esnext, opløsning bundler. Foretræk eksplicitte typer.

### Database

- **Gå altid** gennem `src/lib/db/` domænemoduler — **skriv aldrig** rå SQL i ruter eller håndterere
- **Tilføj aldrig** logik til `src/lib/localDb.ts` (kun re-export lag)
- **Barrel-import aldrig** fra `localDb.ts` — importer specifikke `db/` moduler i stedet
- DB singleton: `getDbInstance()` fra `src/lib/db/core.ts` (WAL journaling)
- Migrationer: `src/lib/db/migrations/` — versionerede SQL-filer, idempotente, kørsel i transaktioner

### Fejlhåndtering

- try/catch med specifikke fejlkategorier, log med pino kontekst
- Svæl aldrig fejl i SSE streams — brug abort signaler til oprydning
- Returner korrekte HTTP statuskoder (4xx/5xx)

### Sikkerhed

- **Brug aldrig** `eval()`, `new Function()`, eller implicit eval
- Valider alle input med Zod skemaer
- Krypter legitimationsoplysninger i hvile (AES-256-GCM)
- Upstream header denylist: `src/shared/constants/upstreamHeaders.ts` — hold sanitere, Zod skemaer, og enhedstest i overensstemmelse når du redigerer
- **Offentlige upstream legitimationsoplysninger** (Gemini/Antigravity/Windsurf-stil OAuth client_id/secret + Firebase Web nøgler udtrukket fra offentlige CLIs): **SKAL** indlejres via `resolvePublicCred()` fra `open-sse/utils/publicCreds.ts` — **aldeles** ikke som strenglitteraler. Se `docs/security/PUBLIC_CREDS.md` for den obligatoriske skabelon.
- **Fejlrespons** (HTTP / SSE / executor / MCP håndterer): **SKAL** rutes gennem `buildErrorBody()` eller `sanitizeErrorMessage()` fra `open-sse/utils/error.ts` — **aldeles** ikke putte rå `err.stack` eller `err.message` i en responskrop. Se `docs/security/ERROR_SANITIZATION.md`.
- **Shell-kommandoer bygget fra variabler**: når du kalder `exec()`/`spawn()` med et script, der har brug for runtime værdier, send dem via `env` optionen (shell-escaped automatisk) — **aldeles** ikke string-interpolere ikke-betroede/eksterne stier ind i scriptkroppen. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Sikre-bygge-biblioteker** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): foretræk Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink over brugerdefinerede implementeringer, når du tilføjer nye sikkerhedsfølsomme overflader.

---

## Almindelige Modifikationsscenarier

### Tilføjelse af en Ny Udbyder

1. Registrer i `src/shared/constants/providers.ts` (Zod-valideret ved indlæsning)
2. Tilføj executor i `open-sse/executors/` hvis brugerdefineret logik er nødvendig (udvid `BaseExecutor`)
3. Tilføj oversætter i `open-sse/translator/` hvis ikke-OpenAI format
4. Tilføj OAuth konfiguration i `src/lib/oauth/constants/oauth.ts` hvis OAuth-baseret — hvis den upstream CLI leverer en offentlig client_id/secret, indlejres via `resolvePublicCred()` (se `docs/security/PUBLIC_CREDS.md`), **aldeles** ikke som en literal
5. Registrer modeller i `open-sse/config/providerRegistry.ts`
6. Skriv tests i `tests/unit/` (inkluder publicCreds form assertion hvis du har tilføjet en ny indlejret standard)

### Tilføjelse af en Ny API Rute

1. Opret mappe under `src/app/api/v1/your-route/`
2. Opret `route.ts` med `GET`/`POST` håndterere
3. Følg mønster: CORS → Zod body validering → valgfri auth → håndterer delegation
4. Håndterer går i `open-sse/handlers/` (importer derfra, ikke inline)
5. Fejlrespons bruger `buildErrorBody()` / `errorResponse()` fra `open-sse/utils/error.ts` (auto-sanitized — sæt aldrig `err.stack` eller `err.message` rå i kroppen). Se `docs/security/ERROR_SANITIZATION.md`.
6. Tilføj tests — inklusive mindst én assertion om, at fejlrespons ikke lækker stakspor (`!body.error.message.includes("at /")`)

### Tilføjelse af et Nyt DB Modul

1. Opret `src/lib/db/yourModule.ts` — importer `getDbInstance` fra `./core.ts`
2. Eksporter CRUD funktioner for dine domænetabeller
3. Tilføj migration i `src/lib/db/migrations/` hvis nye tabeller er nødvendige
4. Re-export fra `src/lib/localDb.ts` (tilføj kun til re-export listen)
5. Skriv tests

### Tilføjelse af et Nyt MCP Værktøj

1. Tilføj værktøjsdefinition i `open-sse/mcp-server/tools/` med Zod input skema + asynkron håndterer
2. Registrer i værktøjssættet (forbundet af `createMcpServer()`)
3. Tildel til passende omfang(e)
4. Skriv tests (værktøjsinvokation logget til `mcp_audit` tabellen)

### Tilføjelse af en Ny A2A Færdighed

1. Opret færdighed i `src/lib/a2a/skills/` (5 eksisterer allerede: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Færdigheden modtager opgavekontekst (beskeder, metadata) → returnerer struktureret resultat
3. Registrer i `A2A_SKILL_HANDLERS` i `src/lib/a2a/taskExecution.ts`
4. Eksponer i `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Skriv tests i `tests/unit/`
6. Dokumenter i `docs/frameworks/A2A-SERVER.md` færdighedstabel

### Tilføjelse af en Ny Cloud Agent

1. Opret agentklasse i `src/lib/cloudAgent/agents/` der udvider `CloudAgentBase` (3 eksisterer allerede: codex-cloud, devin, jules)
2. Implementer `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrer i `src/lib/cloudAgent/registry.ts`
4. Tilføj OAuth/legitimationshåndtering hvis nødvendigt (`src/lib/oauth/providers/`)
5. Tests + dokumenter i `docs/frameworks/CLOUD_AGENT.md`

### Tilføjelse af en Ny Guardrail / Eval / Færdighed / Webhook begivenhed

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Eval suite: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Færdighed (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Webhook begivenhed: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Reference Dokumentation

For enhver ikke-trivial ændring, læs den matchende dybdegående først:

| Område                                                     | Dokument                                                          |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| Repo navigation                                            | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arkitektur                                                 | `docs/architecture/ARCHITECTURE.md`                               |
| Ingeniør reference                                         | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-faktor scoring, 14 strategier)               | `docs/routing/AUTO-COMBO.md`                                      |
| Resiliens (3 mekanismer)                                   | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Reasoning replay                                           | `docs/routing/REASONING_REPLAY.md`                                |
| Færdigheder rammeværk                                      | `docs/frameworks/SKILLS.md`                                       |
| Hukommelsessystem (FTS5 + Qdrant)                          | `docs/frameworks/MEMORY.md`                                       |
| Cloud agenter                                              | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Guardrails (PII / injektion / vision)                      | `docs/security/GUARDRAILS.md`                                     |
| Offentlige upstream legitimationsoplysninger (Gemini/etc.) | `docs/security/PUBLIC_CREDS.md`                                   |
| Fejlmeddelelse sanitering                                  | `docs/security/ERROR_SANITIZATION.md`                             |
| Evals                                                      | `docs/frameworks/EVALS.md`                                        |
| Overholdelse / revision                                    | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                                   | `docs/frameworks/WEBHOOKS.md`                                     |
| Autorisationspipeline                                      | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / fingeraftryk)                               | `docs/security/STEALTH_GUIDE.md`                                  |
| Agentprotokoller (A2A / ACP / Cloud)                       | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP server                                                 | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A server                                                 | `docs/frameworks/A2A-SERVER.md`                                   |
| API reference + OpenAPI                                    | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Udbyderkatalog (auto-genereret)                            | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Udgivelsesflow                                             | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Testning

| Hvad                    | Kommando                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| Enhedstest              | `npm run test:unit`                                                    |
| Enkeltfil               | `node --import tsx/esm --test tests/unit/file.test.ts`                 |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                  |
| E2E (Playwright)        | `npm run test:e2e`                                                     |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                           |
| Økosystem               | `npm run test:ecosystem`                                               |
| Dækningsgrænse          | `npm run test:coverage` (75/75/75/70 — udsagn/linjer/funktioner/grene) |
| Dækningsrapport         | `npm run coverage:report`                                              |

**PR-regel**: Hvis du ændrer produktionskode i `src/`, `open-sse/`, `electron/` eller `bin/`, skal du inkludere eller opdatere tests i den samme PR.

**Testlag præference**: enhed først → integration (multi-modul eller DB-tilstand) → e2e (UI/arbejdsgang kun). Kod bug-reproduktioner som automatiserede tests før eller sammen med rettelsen.

**Copilot dækningspolitik**: Når en PR ændrer produktionskode, og dækningen er under 75% (udsagn/linjer/funktioner) eller 70% (grene), rapporter ikke bare — tilføj eller opdater tests, kør dækningsgrænsen igen, og bed om bekræftelse. Inkluder kørte kommandoer, ændrede testfiler og det endelige dækningsresultat i PR-rapporten.

---

## Git Workflow

```bash
# Forpligt dig aldrig direkte til main
git checkout -b feat/your-feature
git commit -m "feat: beskriv din ændring"
git push -u origin feat/your-feature
```

**Branch præfikser**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit format** (Conventional Commits): `feat(db): tilføj circuit breaker` — scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Miljø

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES-moduler
- **TypeScript**: 5.9+, mål ES2022, modul esnext, opløsning bundler
- **Sti aliaser**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Standardport**: 20128 (API + dashboard på samme port)
- **Data katalog**: `DATA_DIR` miljøvariabel, standard til `~/.omniroute/`
- **Nøgle miljøvariabler**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Opsætning: `cp .env.example .env` og generer derefter `JWT_SECRET` (`openssl rand -base64 48`) og `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Hårde regler

1. Forpligt dig aldrig til hemmeligheder eller legitimationsoplysninger
2. Tilføj aldrig logik til `localDb.ts`
3. Brug aldrig `eval()` / `new Function()` / implicit eval
4. Forpligt dig aldrig direkte til `main`
5. Skriv aldrig rå SQL i ruter — brug `src/lib/db/` moduler
6. Sluk aldrig stille fejl i SSE-strømme
7. Valider altid input med Zod-skemaer
8. Inkluder altid tests, når du ændrer produktionskode
9. Dækningen skal forblive ≥75% (udsagn, linjer, funktioner) / ≥70% (grene). Nuværende målt: ~82%.
10. Omgå aldrig Husky hooks (`--no-verify`, `--no-gpg-sign`) uden eksplicit godkendelse fra operatøren.
11. Indsæt aldrig offentlige upstream OAuth client_id/secret eller Firebase Web-nøgler som strenglitteraler — gå altid gennem `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Se `docs/security/PUBLIC_CREDS.md`.
12. Returner aldrig rå `err.stack` / `err.message` i HTTP / SSE / executor svar — rute altid gennem `buildErrorBody()` eller `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Se `docs/security/ERROR_SANITIZATION.md`.
13. Indsæt aldrig string-interpolerede eksterne stier eller runtime-værdier i shell-scripts, der sendes til `exec()`/`spawn()` — send i stedet via `env`-muligheden. Reference: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Afvis aldrig en CodeQL / Secret-Scanning advarsel uden (a) først at tjekke mønsterdokumentationen ovenfor for at se, om hjælperen gælder, og (b) optage den tekniske begrundelse i afvisningskommentaren. Præcedens: `js/stack-trace-exposure` rejst på callsites, der allerede ruter gennem `sanitizeErrorMessage()` er en kendt CodeQL begrænsning (tilpassede saniteringsmetoder ikke genkendt) — afvis som `false positive` med reference til `docs/security/ERROR_SANITIZATION.md`.
15. Udsæt aldrig ruter, der starter børneprocesser (`/api/mcp/`, `/api/cli-tools/runtime/`) uden `isLocalOnlyPath()` klassifikation i `src/server/authz/routeGuard.ts`. Loopback håndhævelse sker ubetinget før enhver godkendelseskontrol — lækket JWT via tunnel kan ikke udløse processtart. Se `docs/security/ROUTE_GUARD_TIERS.md`.
16. Inkluder aldrig `Co-Authored-By` trailers, der krediterer en AI-assistent, LLM eller automatiseringskonto (f.eks. navne, der indeholder "Claude", "GPT", "Copilot", "Bot"; e-mails på `anthropic.com` / `openai.com` / bot-ejede `noreply.github.com` adresser). Sådanne trailers dirigerer commit-attribution til bot-kontoen på GitHub, hvilket skjuler den rigtige forfatter (`diegosouzapw`) i PR-historikken. Menneskelige bidragydere — herunder upstream PR-forfattere og issue-rapportører, der bliver porteret til OmniRoute — KAN og BØR krediteres med standard `Co-authored-by: Name <email>` trailers; upstream-port workflows (`/port-upstream-features`, `/port-upstream-issues`) afhænger af dette.
